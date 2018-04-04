package com.cwa.client.web.app;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.AdvertiseInfoDao;
import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dao.CustomerCommissionDao;
import com.cwa.client.dao.CustomerDao;
import com.cwa.client.dto.ADCommissionDetailDto;
import com.cwa.client.dto.AdDto;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.CartDto;
import com.cwa.client.dto.ClientInOutMoneyDto;
import com.cwa.client.dto.CommissionDetailDto;
import com.cwa.client.dto.CustomerCommissionDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.CustomerWalletFlow;
import com.cwa.client.dto.InOutMoneyParamDto;
import com.cwa.client.dto.NoticeDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.dto.VideoDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.model.Tb_Customer_Wallet;
import com.cwa.client.redis.JedisOptionUtil;
import com.cwa.client.redis.UserRedis;
import com.cwa.client.service.AdvertiseInfoService;
import com.cwa.client.service.AdvertiseVideoService;
import com.cwa.client.service.AdvertiserService;
import com.cwa.client.service.CustomerCapitalService;
import com.cwa.client.service.CustomerWalletService;
import com.cwa.client.service.OrderService;
import com.cwa.client.service.ShoppCartService;
import com.cwa.client.service.UserService;
import com.cwa.client.service.WithdrawService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.web.ADCapitalController;
import com.cwa.client.web.ADWithdrawController;
import com.cwa.client.web.AdQueryController;
import com.cwa.client.web.AdVideoController;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;
import com.cwa.client.web.ShoppCartController;

import net.sf.json.JSONObject;



@Controller//无需拦截
@RequestMapping("/app/data")
public class AppDataController extends BaseController<GobalRespParameter> implements Constant{
	
	
	@Resource
	private UserRedis userRedis;
	
	@Resource// 普通用户service层
	private UserService userService;
	
	@Resource// 广告商service层
	private AdvertiserService advertiserService;
	
	@Resource// 广告商数据层
	private AdvertiserDao advertiserDao;
	
	@Resource// 普通用户数据层
	private CustomerDao customerDao;
	
	@Resource// 购物车
	private ShoppCartService shoppCartService;
	
	@Resource//店主dao
	private AdvertiseInfoDao advertiseInfoDao;
	
	@Resource// 普通用户service层
	private AdvertiseInfoService advertiseInfoService;
	
	@Resource// 订单service层
	private OrderService orderService;
	
	@Resource// 普通用户service层
	private AdvertiseVideoService advertiseVideoService;
	
	@Resource// 订单详情service层
	private CustomerWalletService customerWalletService;
	
	@Resource //用户收益Dao
	private CustomerCommissionDao customerCommissionDao;
	
	@Resource //用户出金类service
	private CustomerCapitalService customerCapitalService;
	
	@Resource //出入金流水Dao
	private ClientInOutMoneyDao clientInOutMoneyDao;
	
	@Resource //提现service
	private WithdrawService withdrawService;
	
	/**
	 * 加载用户信息
	 * @throws Exception
	 */
	@RequestMapping("/getUserInfo.do")
	public void getUserInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"getUserInfo.do");//校验参数是否合法并且打印日志
		// 返回消息的DTO
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		ruturnMessageDto.setSuccess(false);
		// 返回用户信息
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			// 判断用户是否登录
			HttpSession session = req.getSession();
			Object sessionObj = session.getAttribute(SESSION_USER);//从session中拿出当前用户对象
			CustomerDto sessionUser = (CustomerDto)sessionObj;
			String accountId = sessionUser.getAccount_id();
			//根据accountId去数据库查询用户信息
			CustomerDto userDto = (CustomerDto)userService.queryUserObjByAccountIdAndUserType(accountId, USERTYPE_CUSTOMER);
			
			userDto.setShoppCount(shoppCartService.findShopCartCountByAccountId(accountId));//登录用户购物车数量
			
			String loginType= req.getSession().getAttribute(LOGINTYPE).toString();//从session中获取用户登录类型（方式）
			userDto.setLogin_id(sessionUser.getLogin_id());//登录用户id
			userDto.setFullMb(userDto.getMobile());//完整手机号
			userDto.setLoginType(loginType);//用户登录类型（方式）
			//t_type
			String userType = userDto.getT_type().toString();//用户类型
			userDto.setMobile(userDto.getMobile().substring(userDto.getMobile().toString().length()-FOUR));//手机号后四位
			req.getSession().setAttribute(SESSION_USER, userDto);//最新用户对象信息放入session
			req.getSession().setAttribute(SESSION_USER_TYPE, userType);//用户类型放入session
			ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());//成功返回代码
			ruturnMessageDto.setSuccess(true);
			map.put("userData", userDto);
			map.put("sessionId", req.getSession().getId());//当前用户请求sessonID
			ruturnMessageDto.setData(map);
		} catch (Exception e) {
			ruturnMessageDto.setMsg(RespCodeEnum.global_unknow_expiration.getCode());//异常代码
			ruturnMessageDto.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		
		this.writeJSONForApp(res,"getUserInfo.do", ruturnMessageDto);//返回json数据并且打印返回数据日志
		ruturnMessageDto=null;
	}
	/**
	 * 查询用户未查看公告
	 */
	@RequestMapping("/getNoticeInfo.do")
	public void queryNoticeList (HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"getNoticeInfo.do");//校验参数是否合法并且打印日志
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		ruturnMessageDto.setSuccess(false);
		try {
			CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
			String userType=req.getSession().getAttribute(SESSION_USER_TYPE).toString();
			List<NoticeDto> list = userService.findLookNotice(sessionUser.getNoticeId(), userType);//查询公告
			ruturnMessageDto.setSuccess(true);
			ruturnMessageDto.setData(list);
			ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());
		} catch (Exception e) {
			ruturnMessageDto.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			ruturnMessageDto.setData(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"getNoticeInfo.do", ruturnMessageDto);//返回json数据并且打印返回数据日志
		ruturnMessageDto=null;
	}
	
	/**
	 * 分页查询首页推荐广告
	 * @param request
	 */
	@RequestMapping(value="/queryIndexData/cm.do")
	public void queryIndexData(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryIndexData.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String, Object> map=new HashMap<>();
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		String addr=getParameter(req, "mailingAddress");
		String deviceIndustry=getParameter(req, "deviceIndustry");
		String adName=getParameter(req, "adName");
		try {
			if(pageSize==null){//每页大小为空则默认9条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				AdDto adDto = new AdDto();
				adDto.setAdName(adName);
				adDto.setPageNo(Integer.parseInt(pageNo));
				adDto.setPageSize(Integer.parseInt(pageSize));
				adDto.setRecommed(ONE);
				adDto.setAddr(addr);
				adDto.setDevice_industry(deviceIndustry);
				map.put("data",advertiserDao.queryADForBuy(adDto));
				map.put("count",advertiserDao.queryADForBuyCount(adDto));
				parameter.setSuccess(true);
				parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
				parameter.setData(map);
			}
		}catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryIndexData.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	/**
	 * 单个店铺广告详情查询
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/querySingAdvertiseDetailInfo.do")
	public void querySingAdvertiseDetailInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//校验参数是否合法并且打印日志
		Map<String,String[]> map = getAllParameterForApp(req,"querySingAdvertiseDetailInfo.do","checkAdvertiseId","deviceId");
		RequestContext reqCt= new RequestContext(req);// 语言包
		//JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(map!=null){
				AdvertiseInfoDto dto = advertiseInfoDao.querySingAdvertiseInfo(map.get("checkAdvertiseId")[0], map.get("deviceId")[0]);//查询单个广告店铺信息
				Double discount = queryUserDiscount(req, 1);//获得当前用户享用的折扣
				writeLog("","===disCount:"+discount, LOGLEVEL_INFO, AppDataController.class);
				//dto.setCurrPlayCount((Integer)//jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+dto.getDevice_id()));//redies中获取当前广告屏广告播放条数
				parameter.setData(dto);
				parameter.setSuccess(true);
				parameter.setMsg(discount+"");
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setData(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}finally{
			//jedisUtil.returnResource();
		}
		this.writeJSONForApp(res,"querySingAdvertiseDetailInfo.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询批量投放所有投放信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryBatchAllAdvertiseInfo.do")
	public void queryBatchAllAdvertiseInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryBatchAllAdvertiseInfo.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		//JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=FIVE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				Double discount = queryUserDiscount(req, 0);//获取折扣
				AdvertiseInfoDto dto=new AdvertiseInfoDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setAccount_id(customerDto.getAccount_id());
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setMailing_address(getParameter(req, "mailingAddress"));//查询地址
				dto.setAdName(getParameter(req, "adName"));
				dto.setDevice_industry(getParameter(req, "deviceIndustry"));
				PageModel<AdvertiseInfoDto> pageModel = advertiseInfoService.getPageModel(dto);
				/*for (AdvertiseInfoDto infoDto : pageModel.getList()) {
					infoDto.setCurrPlayCount((Integer)//jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+infoDto.getDevice_id()));
				}*/
				parameter.setMsg(discount+"");
				parameter.setData(pageModel);
				parameter.setSuccess(true);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}finally{
			//jedisUtil.returnResource();
		}
		this.writeJSONForApp(res,"queryBatchAllAdvertiseInfo.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询用户购物车数据
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserShoppCart.do")
	public void queryUserShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserShoppCart.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		//JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				Double discount = queryUserDiscount(req, 0);//得到用户折扣
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				CartDto dto=new CartDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setAccount_id(customerDto.getAccount_id());//查询用户
				writeLog("", "==== accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, ShoppCartController.class);
				PageModel<CartDto> pageModel = shoppCartService.getPageModel(dto);
				/*for (CartDto pdto : pageModel.getList()) {//播放中
					pdto.setCurrPlayCount((Integer)//jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+pdto.getDevice_id()));
				}*/
				parameter.setData(pageModel);
				parameter.setMsg(discount+"");
				parameter.setSuccess(true);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}finally{
			//jedisUtil.returnResource();
		}
		this.writeJSONForApp(res,"queryUserShoppCart.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询用户订单信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserOrder.do")
	public void queryUserOrder(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserOrder.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				AdvertiseInfoDto dto=new AdvertiseInfoDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setAccount_id(customerDto.getAccount_id());//查询用户
				dto.setShoppId(getParameter(req, "orderStatus"));//订单状态
				dto.setUnified_serial_number(getParameter(req, "unifiedOrderNo"));//总单号
				writeLog("", "==== accountId:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AdQueryController.class);
				PageModel<AdvertiseInfoDto> pageModel = orderService.getPageModel(dto);
				parameter.setData(pageModel);
				parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
				parameter.setSuccess(true);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserOrder.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询用户上传文件信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUploadFileInfo.do")
	public void queryUploadFileInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		Map<String, String[]> map = getAllParameterForApp(req,"queryUploadFileInfo.do","adNo");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		try {
			if(map!=null){
				String adNo=map.get("adNo")[0];
				AdVideoController controll=new AdVideoController();//创建视频controller对象，用于调用解析html方法
				List<VideoDto> listDto = advertiseVideoService.findByOrderNo(adNo);
				if(listDto.size()>0){
					if("2".equals(listDto.get(0).getFile_type())||"3".equals(listDto.get(0).getFile_type())){//html模板或图片 解析html内容
						controll.findHtmlContext(listDto.get(0));//获取html内容
					}
					parameter.setData(listDto.get(0));
					parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
					parameter.setSuccess(true);
				}
			}else{//参数错误
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setData(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUploadFileInfo.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询用户翔云余额信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	
	@RequestMapping("/findUserWalletInfo.do")
	public void findUserWalletInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"findUserWalletInfo.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
			Tb_Customer_Wallet entity = customerWalletService.findByAccountId(customerDto.getAccount_id());
			parameter.setSuccess(true);
			parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
			parameter.setData(entity);
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"findUserWalletInfo.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 查询用户翔云余额流水信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserWalletFlow.do")
	public void queryUserWalletFlow(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserWalletFlow.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				CustomerWalletFlow dto=new CustomerWalletFlow();
				//流水类型
				dto.setFLOW_TYPE(getParameter(req, "type")==null?null:Integer.parseInt(getParameter(req, "type")));
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setCUSTOMER_ID(customerDto.getAccount_id());//查询用户
				dto.setBeginDate(getParameter(req, "beginDate"));
				dto.setEndDate(getParameter(req, "endDate"));
				writeLog("", "==== accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, AppDataController.class);
				PageModel<CustomerWalletFlow> pageModel = customerWalletService.getPageModel(dto);
				parameter.setData(pageModel);
				parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
				parameter.setSuccess(true);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserWalletFlow.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 用户收益信息查询
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserCommission.do")
	public void queryUserCommission(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserCommission.do");//校验参数是否合法并且打印日志
		RuturnMessageDto rt = new RuturnMessageDto();
		rt.setSuccess(false);
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();//用户类型
		writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query commission .", LOGLEVEL_INFO, AppDataController.class);
		try {
			CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
			//根据用户类型查询佣金  店主用accountId 其他的用loginId
			CustomerCommissionDto data = customerCommissionDao.queryCustomerCommission((Integer.parseInt(userType)==TWO?sessionUser.getAccount_id():sessionUser.getLogin_id()),userType);
			rt.setSuccess(true);
			rt.setData(data);
			rt.setMsg(RespCodeEnum.SUCCESS.getCode());
		} catch (Exception e) {
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserCommission.do", rt);//返回json数据并且打印返回数据日志
	}
	
	
	/**
	 * 用户收益明细查询
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserCommissionDetail.do")
	public void queryUserCommissionDetail(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserCommissionDetail.do");//校验参数是否合法并且打印日志
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		RuturnMessageDto rt = new RuturnMessageDto();
		rt.setSuccess(false);
		writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query commission detail.", LOGLEVEL_INFO, AppDataController.class);
		
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
				ADCommissionDetailDto param=new ADCommissionDetailDto();//查询条件对象
				param.setStartTime(getParameter(req, "startTime"));
				param.setEndTime(getParameter(req, "endTime"));
				param.setType(getParameter(req, "type"));
				param.setPageNo(Integer.parseInt(pageNo));
				param.setPageSize(Integer.parseInt(pageSize));
				//根据用户类型查询佣金明细  店主用accountId 其他的用loginId
				param.setAccount_id(sessionUser.getT_type()==TWO?sessionUser.getAccount_id():sessionUser.getLogin_id());
				param.setUserType(sessionUser.getT_type());
				PageModel<CommissionDetailDto> commissions = customerCapitalService.getPageModelCommission(param);
				rt.setSuccess(true);
				rt.setMsg(RespCodeEnum.SUCCESS.getCode());
				rt.setData(commissions);
			}
		} catch (Exception e) {
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserCommissionDetail.do",rt);//返回json数据并且打印返回数据日志
	}
	
	/**
	 * 提现明细查询
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryUserWithdrawDetail.do")
	public void queryUserWithdrawDetail(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserWithdrawDetail.do");//校验参数是否合法并且打印日志
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		RuturnMessageDto rt = new RuturnMessageDto();
		rt.setSuccess(false);
		writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query withdraw detail.", LOGLEVEL_INFO, ADCapitalController.class);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
				InOutMoneyParamDto param = new InOutMoneyParamDto();//查询条件对象
				param.setAccount_id(sessionUser.getAccount_id());
				param.setAccount_type(sessionUser.getT_type());
				param.setStartTime(getParameter(req, "startTime"));
				param.setEndTime(getParameter(req, "endTime"));
				param.setPageNo(Integer.parseInt(pageNo));
				param.setPageSize(Integer.parseInt(pageSize));
				Map<String,Object> map = new HashMap<String,Object>();
				//查询数据
				List<ClientInOutMoneyDto> list = clientInOutMoneyDao.queryDetail(param);
				//查询数据总条数
				int totalRecords = clientInOutMoneyDao.queryDetailCount(param);
				map.put("list",list );
				map.put("totalRecords",totalRecords);
				map.put("totalPages", Math.ceil(totalRecords/Integer.parseInt(pageSize)));//总页数
				rt.setSuccess(true);
				rt.setMsg(RespCodeEnum.SUCCESS.getCode());
				rt.setData(map);
			}
		} catch (Exception e) {
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			rt.setMsg(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserWithdrawDetail.do",rt);//返回json数据并且打印返回数据日志
	}
	
	/**
	 * 获取用户卡信息
	 * @param request
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/queryUserWithDrawCardInfo.do")
	public void queryUserWithDrawCardInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		getAllParameterForApp(req,"queryUserWithDrawCardInfo.do");//校验参数是否合法并且打印日志
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		try {
			CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
			String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
			int cardType=getParameter(req, "cardType")==null?FOUR:Integer.parseInt(getParameter(req, "cardType"));
			List<Tb_Bank_Card_Info> list=new ArrayList<>();
			List<Tb_Bank_Card_Info> list1 = withdrawService.queryBankCardInfo(cardType==THREE&&!"2".equals(userType)?sessionUser.getLogin_id():sessionUser.getAccount_id(),cardType,cardType==FOUR?ZERO:ADWithdrawController.changeUserType(userType));
			parameter.setSuccess(true);
			for (Tb_Bank_Card_Info cardDto : list1) {
				if(cardDto.getStatus()==1){//卡片为激活状态
					cardDto.setBank_card_code(RegUtil.getUtil().replaceNumToX(cardDto.getBank_card_code(), THREE));//加密卡号
					cardDto.setMobile(RegUtil.getUtil().replaceNumToX(cardDto.getMobile(), FOUR));//加密手机号
					list.add(cardDto);
				}
			}
			parameter.setSuccess(true);;
			parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
			parameter.setData(list);
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"queryUserWithDrawCardInfo.do",parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
}
