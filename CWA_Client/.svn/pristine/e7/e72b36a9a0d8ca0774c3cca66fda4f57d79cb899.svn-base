package com.cwa.client.web.app;


import java.io.File;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.ADCommissionDao;
import com.cwa.client.dao.AdvertiseInfoDao;
import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dao.CustomerCommReportDao;
import com.cwa.client.dao.CustomerCommissionDao;
import com.cwa.client.dao.CustomerDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.BankCardInfoDto;
import com.cwa.client.dto.CartDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.CustomerWalletFlow;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.dto.VideoDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.model.Tb_Customer;
import com.cwa.client.model.Tb_Order;
import com.cwa.client.model.Tb_Vedio_Audit;
import com.cwa.client.model.Tb_customer_comm_report;
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
import com.cwa.client.utils.DateUtils;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.ipUtil;
import com.cwa.client.web.AdVideoController;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;




@Controller//无需拦截
@RequestMapping("/app/operateData")
public class AppOperateDataController extends BaseController<GobalRespParameter> implements Constant{
	
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
	
	@Resource
	private CustomerCommReportDao customerCommReportDao;
	
	@Resource
	private ADCommissionDao adCommissionDao;
	
	
	/**
	 * 用户下单
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/userPlaceAnOrder.do",method=RequestMethod.POST)
	public void userPlaceAnOrder(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameterForApp(req,"userPlaceAnOrder.do","checkAdvertiseId","deviceId","fileType","checkTimes");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				Long bgTime=System.currentTimeMillis();//下单执行开始时间
				String shoppIds=getParameter(req, "shoppIds");//购物车购买 购物车id
				List<AdvertiseInfoDto> list = getOrderList(req,map,shoppIds,true);
				if(list.size()>0){
 					writeLog("", "query advertise info success! time consuming:"+(System.currentTimeMillis()-bgTime)+"====list:"+GsonUtil.dtoToJson(list), LOGLEVEL_INFO, AppOperateDataController.class);
					Map<String, String> notOrderMap=isPlayTimeInterval(list,null);//无法下单的广告记录
					if(getParameter(req, "isSub")!=null){
						notOrderMap.put("isSub",getParameter(req, "isSub"));//是否分单
						notOrderMap.put("forCount",getParameter(req, "buyCount")==null?"0":getParameter(req, "buyCount").split(",")[0]);//购买数量
					}
					Double disCount = queryUserDiscount(req,list.size());//当前用户折扣
					writeLog("", "query no order time success! time consuming:"+(System.currentTimeMillis()-bgTime)+"====disCount:"+disCount+" =====map:"+GsonUtil.dtoToJson(notOrderMap), LOGLEVEL_INFO, AppOperateDataController.class);
					CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
					writeLog("", "customer T_TYPE:"+customerDto.getT_type(), LOGLEVEL_INFO, AppOperateDataController.class);
					if(customerDto.getT_type()==9){//零元下单用户
						writeLog("", "customer is Free single accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, AppOperateDataController.class);
						disCount=0.0;
					}
					String strResult = orderService.createOrder(list,notOrderMap,shoppIds,disCount);//生成订单
					writeLog("", "placeAnOrder success end! time consuming:"+(System.currentTimeMillis()-bgTime), LOGLEVEL_INFO, AppOperateDataController.class);
					if(strResult.equals(RespCodeEnum.order_playCycle_error.getCode())){//播放日期有误
						parameter.setData(reqCt.getMessage("pay.common.order.playCycleError"));
					}else{//返回不可下单的广告
						parameter.setData(notOrderMap);
					}
					parameter.setMsg(strResult);
				}else{
					parameter.setMsg(RespCodeEnum.order_adexpire_error.getCode());
					parameter.setData(reqCt.getMessage("pay.common.order.advertiseTimeOut"));
				}
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setData(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"userPlaceAnOrder.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 订单支付
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/userPayOrder.do",method=RequestMethod.POST)
	public void userPayOrder(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameterForApp(req,"userPayOrder.do","orderNo","payWay");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String orderNo=map.get("orderNo")[0];//订单编号
				String payWay=map.get("payWay")[0];//支付方式
				List<Tb_Order> orderList = orderService.findOrderByOrderNo(orderNo);//查询订单
				writeLog("", "query orderList success! data:"+GsonUtil.dtoToJson(orderList), LOGLEVEL_INFO, AppOperateDataController.class);
				if(orderList.size()>0){
					CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
					BigDecimal total=new BigDecimal(0);
					for (Tb_Order order : orderList) {//得到订单总额
						total=total.add(order.getTotal_price());
					}
					CustomerWalletFlow dto =new CustomerWalletFlow();//分装参数
					dto.setAMOUNT(total);
					dto.setCUSTOMER_ID(customerDto.getAccount_id());
					dto.setFLOW_TYPE(3);
					dto.setUserId(customerDto.getId());
					writeLog("", "accountId:"+customerDto.getAccount_id()+"===dto:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AppOperateDataController.class);
					parameter = orderService.batchUpdate(orderList,payWay,dto,req);//订单支付
					if(parameter.getMsg().equals(RespCodeEnum.SUCCESS.getCode())){
						parameter.setSuccess(true);
					}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error.getCode())){//金额不足
						parameter.setData(reqCt.getMessage("pay.common.money.notEnough"));
					}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error1.getCode())){//钱包账户被冻结
						parameter.setData(reqCt.getMessage("pay.common.wallet.freeze"));
					}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error2.getCode())){//钱包账户不存在
						parameter.setData(reqCt.getMessage("pay.common.wallet.notExist"));
					}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error4.getCode())){//卡号错误
						parameter.setData(reqCt.getMessage("pay.common.union.cardCodeError")+parameter.getData()==null?"":parameter.getData());
					}else if(parameter.getMsg().equals(RespCodeEnum.order_payMoreBig_error.getCode())){//银联支付金额不超过3000
						parameter.setData(reqCt.getMessage("pay.common.amount.moreBig"));
					}else if(parameter.getMsg().equals("51009")){//银联支付验证码错误
						parameter.setData(reqCt.getMessage("updateMobile.tip.verificationMistake"));
					}
				}else{//订单失效
					parameter.setMsg(RespCodeEnum.order_orderExpire_error.getCode());
					parameter.setData(reqCt.getMessage("pay.common.order.orderTimeOut"));
				}
				
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setData(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"userPayOrder.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	
	/**
	 * 加入购物车
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/joinUserShoppCart.do",method=RequestMethod.POST)
	public void joinUserShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameterForApp(req,"joinUserShoppCart.do","checkAdvertiseId","deviceId");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				//查询加入购物车广告信息
				List<AdvertiseInfoDto> list = getOrderList(req,map,null,false);
				List<Object []> objListInsert=new ArrayList<>();//插入购物车数据集合
				for (AdvertiseInfoDto dto : list) {
					CartDto cartDto = null;//shoppCartService.findCartExistsAdByAccountId(dto.getAccount_id(),dto.getId(),dto.getDevice_id(),dto.getIdle_time());
					if(cartDto==null){
						BigDecimal price=new BigDecimal(0);
						if("2".equals(dto.getFile_type())){//html模板
							price=dto.getHtml_price();
						}else if("3".equals(dto.getFile_type())){//图片
							price=dto.getPic_price();
						}
						Object [] objs={
								dto.getDevice_id(),
								dto.getAccount_id(),
								dto.getAccount_IP(),
								new Timestamp(System.currentTimeMillis()),
								dto.getShop_name(),
								dto.getId(),
								dto.getSumPrice(),
								price,
								dto.getIdle_time().split("-")[0].length()==5?dto.getIdle_time().split("-")[0]+":00":dto.getIdle_time().split("-")[0],
								dto.getIdle_time().split("-")[1].length()==5?dto.getIdle_time().split("-")[1]+":00":dto.getIdle_time().split("-")[1],
								dto.getFile_type(),
								dto.getStartDate(),
								dto.getEndDate(),
								dto.getBuyCount()
						};
						objListInsert.add(objs);//加入集合待插入数据库
					}
				}
				writeLog("","batch join cart insertData:"+GsonUtil.dtoToJson(objListInsert), LOGLEVEL_INFO, AppOperateDataController.class);
				shoppCartService.batchJoinCart(objListInsert);//插入
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"joinUserShoppCart.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 删除购物车广告
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/reJectUserShoppCart.do",method=RequestMethod.POST)
	public void reJectShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameterForApp(req,"reJectUserShoppCart.do","cartId");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String cartId=map.get("cartId")[0];//购物车id  可多个,用,分割
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				shoppCartService.deleteByAccountId(customerDto.getAccount_id(),cartId);//删除
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(RespCodeEnum.global_parameter_isnull.getMessage());
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"reJectUserShoppCart.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 修改用户资料
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/updUserData.do",method=RequestMethod.POST)
	public void updUserData(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		Map<String,String[]> map = getAllParameterForApp(req,"updUserData.do","accountId","userName","email");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String accountId=map.get("accountId")[0];//用户账号
				String userName=map.get("userName")[0];//用户姓名
				String email=map.get("email")[0];//用户邮箱
				/*String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();//用户类型 预留
				writeLog("", "update customer type is: "+userType, LOGLEVEL_INFO, appOperateDataController.class);*/
				if(!util.isEmail(email)){//判断email格式是否合法
					parameter.setRespCode(RespCodeEnum.update_customerInfo_emailError.getCode());
					parameter.setRespMessge(reqCt.getMessage("customerData_text_emailError"));
					this.writeJSONForApp(res,"updUserData.do", parameter);//返回json数据并且打印返回数据日志
					parameter=null;
					return;
				}
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);
				if(customerDto.getAccount_id().equals(accountId)){//判断修改账户和当前登录账户是否一致
					//if(USERTYPE_CUSTOMER.equals(userType.toString())){
					Tb_Customer entity = userService.findById(customerDto.getId()+"");
					entity.setUser_name(userName);
					entity.setEmail(email);
					userService.update(entity);//更新数据库
					customerDto.setUser_name(userName);
					customerDto.setEmail(email);
					// 记录session
					req.getSession().setAttribute(SESSION_USER, customerDto);//更新session
					parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
					parameter.setRespMessge(reqCt.getMessage("customerData.update.success"));
					writeLog("", "update customer info success end", LOGLEVEL_INFO, AppOperateDataController.class);
						
					Tb_customer_comm_report repEntity = clientInOutMoneyDao.queryInOutInfo(customerDto.getAccount_id());
					if(repEntity!=null){//更新报表中username字段
						repEntity.setCustomer_name(userName);
						customerCommReportDao.update(repEntity);
						writeLog("", "update customer info Tb_customer_comm_report success", LOGLEVEL_INFO, AppOperateDataController.class);
					}
				}else{
					parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
					parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
				}
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"updUserData.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	
	/**
	 * 修改登录密码(根据原密码修改)
	 */
	@RequestMapping(value="/updateUserLoginPwd.do",method=RequestMethod.POST)
	public void updateUserLoginPwd(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		Map<String,String[]> map = getAllParameterForApp(req,"updateUserLoginPwd.do","oldPwd","newPwd","confirmPwd");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String oldPwd=map.get("oldPwd")[0];//旧密码
				String newPwd=map.get("newPwd")[0];//新密码
				String confirmPwd=map.get("confirmPwd")[0];//确认新密码
				if(!newPwd.equals(confirmPwd)){//两次密码不一致
					parameter.setRespCode(RespCodeEnum.register_passWord_invaliderror.getCode());
					parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.twoNewPwdNotMatch"));
					this.writeJSONForApp(res,"updateUserLoginPwd.do", parameter);//返回json数据并且打印返回数据日志
					parameter=null;
					return;
				}
				CustomerDto sessionObj = (CustomerDto)req.getSession().getAttribute(SESSION_USER);//获取session中用户信息
				String accountId=sessionObj.getAccount_id();//得到当前登录账号
				CustomerDto userObj = (CustomerDto)userService.queryUserObjByAccountIdAndUserType(accountId, USERTYPE_CUSTOMER);//数据查询用户信息
				String userPwd = Encypter.getDecryptValue(userObj.getPassword());//用户数据库中密码(原密码)
				if(!userPwd.equals(oldPwd)){// 旧密码输入错误
					parameter.setRespCode(RespCodeEnum.update_password_oldPasswordError.getCode());
					parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.oldPwdMistake"));
					this.writeJSONForApp(res,"updateUserLoginPwd.do", parameter);//返回json数据并且打印返回数据日志
					parameter=null;
					return;
				}
				// 修改密码
				boolean statusCustomer = userService.updatePwdByAccountIdAndUserType(accountId, newPwd, USERTYPE_CUSTOMER);
				//boolean statusAD = userService.updatePwdByAccountIdAndUserType(accountId, newPwd, USERTYPE_CUSTOMER_ADVERTISER);
				if(statusCustomer){//修改成功返回
					parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
					parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.updatePwdSuccess"));
				}else{//修改失败返回
					parameter.setRespCode(RespCodeEnum.FAILD.getCode());
					parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.updatePwdFail"));
				}
			}else{//参数错误
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {//未知异常
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"updateUserLoginPwd.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 修改提现密码(有原密码根据原密码修改)
	 */
	@RequestMapping(value="/updateUserWithDrawPwd.do",method=RequestMethod.POST)
	public void updateUserWithDrawPwd(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		Map<String,String[]> map = getAllParameterForApp(req,"updateUserWithDrawPwd.do","newPwd","confirmPwd");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String newPwd=map.get("newPwd")[0];//新密码
				String confirmPwd=map.get("confirmPwd")[0];//确认新密码
				if(!newPwd.equals(confirmPwd)){//两次密码不一致
					parameter.setRespCode(RespCodeEnum.register_passWord_invaliderror.getCode());
					parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.twoNewPwdNotMatch"));
					this.writeJSONForApp(res,"updateUserWithDrawPwd.do", parameter);//返回json数据并且打印返回数据日志
					parameter=null;
					return;
				}
				CustomerDto sessionObj = (CustomerDto)req.getSession().getAttribute(SESSION_USER);//获取session中用户信息
				String accountId=sessionObj.getAccount_id();//得到当前登录账号
				CustomerDto userObj = userService.queryCustomerByAccountId(accountId);
				if(!util.isNull(userObj.getW_pwd())){//判断是否有旧密码 如果有则修改 无则直接设置
					String oldPwd = getParameter(req, "oldPwd");//获得输入旧密码
					if(util.isNull(oldPwd)){//输入旧密码是否为空
						writeLog(LOGTYPE_CONTROLLER, "update Withdraw oldpassword is null .", LOGLEVEL_INFO, AppOperateDataController.class);
						parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
						parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.oldPwdEmpty"));
						this.writeJSONForApp(res,"updateUserWithDrawPwd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
					if(!oldPwd.equals(Encypter.getDecryptValue(userObj.getW_pwd()))){//判断旧密码是否正确
						writeLog(LOGTYPE_CONTROLLER, "update Withdraw oldpassword is error .oldpwd:"+userObj.getW_pwd(), LOGLEVEL_INFO, AppOperateDataController.class);
						parameter.setRespCode(RespCodeEnum.update_password_oldPasswordError.getCode());
						parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.oldPwdMistake"));
						this.writeJSONForApp(res,"updateUserWithDrawPwd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
				}
				// 修改密码
				userService.updateWPWD(accountId,Encypter.getEncryptValue(newPwd));
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
				parameter.setRespMessge(reqCt.getMessage("updatePwd.tip.setPwdSuccess"));
			}else{//参数错误
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {//未知异常
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"updateUserWithDrawPwd.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 翔云余额充值
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/userWalletRecharge.do",method=RequestMethod.POST)
	public void userWwalletRecharge(HttpServletRequest req, HttpServletResponse res,CustomerWalletFlow dto) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		getAllParameterForApp(req,"userWalletRecharge.do");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(util.isNull(dto.getPay_type())||dto.getAMOUNT()==null||dto.getAMOUNT().doubleValue()<=0){//参数不合法
				writeLog(LOGTYPE_SERVICE, "pay_type："+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, AppOperateDataController.class);
				parameter.setData(reqCt.getMessage("common.exception.parameter"));
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
				this.writeJSONForApp(res,"userWalletRecharge.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			if(UNPAY_TYPE.equals(dto.getPay_type())&&dto.getAMOUNT().doubleValue()>3000){//银联充值金额过大
				writeLog(LOGTYPE_SERVICE, "amount more big "+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, AppOperateDataController.class);
				parameter.setMsg(RespCodeEnum.order_payMoreBig_error.getCode());
				parameter.setData(reqCt.getMessage("pay.common.amount.moreBig"));
				this.writeJSONForApp(res,"userWalletRecharge.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			if(!Pattern.matches(REG_POSITIVE_REALNUMBER, dto.getAMOUNT().toString())){//非法金额
				writeLog(LOGTYPE_SERVICE, "Recharge('"+dto.getAMOUNT().toString()+"') money format mistake", LOGLEVEL_INFO, AppOperateDataController.class);
				parameter.setMsg(RespCodeEnum.pay_amount_error.getCode());
				parameter.setData(reqCt.getMessage("pay.common.money.illegal"));
				this.writeJSONForApp(res,"userWalletRecharge.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
			dto.setCUSTOMER_ID(customerDto.getAccount_id());
			dto.setUserId(customerDto.getId());
			writeLog("", "accountId:"+customerDto.getAccount_id()+"===dto:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AppOperateDataController.class);
			parameter = customerWalletService.walletRecharge(dto,req);//充值翔云余额
			writeLog("", "end pay!!!  result:"+parameter.getMsg(), LOGLEVEL_INFO, AppOperateDataController.class);
			if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error1.getCode())){//用户钱包已冻结
				parameter.setData(reqCt.getMessage("pay.common.wallet.freeze"));
			}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error2.getCode())){//用户钱包不存在
				parameter.setData(reqCt.getMessage("pay.common.wallet.notExist"));
			}else if(!UNPAY_TYPE.equals(dto.getPay_type())&&parameter.getMsg().equals(RespCodeEnum.FAILD.getCode())){//充值失败
				parameter.setData(reqCt.getMessage("pay.common.recharge.faild"));
			}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error3.getCode())){//不在入金范围
				parameter.setData(reqCt.getMessage("pay.common.notSection")+parameter.getData());
			}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error4.getCode())){//卡号错误
				parameter.setData(reqCt.getMessage("pay.common.union.cardCodeError")+parameter.getData()==null?"":parameter.getData());
			}else if(parameter.getMsg().equals("51009")){//银联支付手机验证码错误
				parameter.setData(reqCt.getMessage("updateMobile.tip.verificationMistake"));
			}
			writeLog("", "userWalletRecharge success!", LOGLEVEL_INFO, AppOperateDataController.class);
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"userWalletRecharge.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 提现绑卡
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/userWithDrawBankCard.do",method=RequestMethod.POST)
	public void userWithDrawBankCard(HttpServletRequest req, HttpServletResponse res,@RequestBody BankCardInfoDto dto) throws Exception{
		// 返回消息的dto
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"userWithDrawBankCard.do");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			writeLog("", " requestParmaData:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AppOperateDataController.class);
			if(!util.isNull(dto.getBank_card_code(),dto.getBank_card_name(),dto.getBank_code(),dto.getMobile(),dto.getOpen_account_bank_name(),dto.getPapers_code(),dto.getPapers_type()+"")){
				CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
				String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
				if(util.isBankCard(dto.getBank_card_code())){//校验卡号是否合法
					String cardCode=dto.getBank_card_code();
					//根据卡号和绑卡类型查询卡信息 判断是否该卡是否能被绑定   3:查询的为提现绑定卡信息 4:查询的为入金绑定卡信息
					List<Tb_Bank_Card_Info> list1 = adCommissionDao.queryBankCardInfo(null,cardCode,THREE,ZERO);
					for (Tb_Bank_Card_Info cardInfo : list1) {
						if(cardInfo.getStatus()==ONE){//如果该卡片已存在并且启用状态,则不能再次绑定
							parameter.setRespCode(RespCodeEnum.wallet_withOut_error6.getCode());
							parameter.setRespMessge(reqCt.getMessage("withdraw.banka.cardBanded"));
							this.writeJSONForApp(res,"userWithDrawBankCard.do", parameter);//返回json数据并且打印返回数据日志
							parameter=null;
							return;
						}
					}
					//根据账号和绑卡类型查询卡信息，如果存在绑卡信息,则修改，否则增加 3:查询的为提现绑定卡信息 4:查询的为入金绑定卡信息
					List<Tb_Bank_Card_Info> list = adCommissionDao.queryBankCardInfo(sessionUser.getAccount_id(),null,THREE,changeUserType(userType));
					//一个账号绑定一张卡
					Tb_Bank_Card_Info cardDto = list.size()>0?list.get(0):null;
					if(cardDto==null){//没有绑定卡
						Tb_Bank_Card_Info entity = new Tb_Bank_Card_Info();//封装卡数据
						entity.setAccount_id(sessionUser.getAccount_id());
						entity.setAccount_type(changeUserType(userType));//用户类型
						entity.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
						entity.setAudit_id("");
						entity.setBank_card_code(cardCode);
						entity.setBank_card_name(dto.getBank_card_name());
						entity.setBank_code(dto.getBank_code());
						entity.setBranch_name(dto.getBranch_name());
						entity.setCard_type(THREE);//卡类型 0：默认 1：微信 2：支付宝 3：银盛
						entity.setCommit_account_id(sessionUser.getAccount_id());
						entity.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
						entity.setIp(ipUtil.getIpAddress(req));
						entity.setMobile(dto.getMobile());
						entity.setOpen_account_bank_name(dto.getOpen_account_bank_name());
						entity.setPapers_code(dto.getPapers_code());
						entity.setPapers_type(dto.getPapers_type());
						entity.setStatus(ONE);
						entity.setBank_account_type(ONE);
						entity.setBank_card_type(ONE);
						withdrawService.commissionBankCardInfo(entity);
					}else{//存在则修改
						if(cardDto.getStatus()!=ONE){//卡是否启用
							cardDto.setAccount_type(changeUserType(userType));//用户类型
							cardDto.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
							cardDto.setAudit_id("");
							cardDto.setStatus(ONE);
							cardDto.setCommit_account_id(sessionUser.getAccount_id());
							cardDto.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
							cardDto.setBank_card_code(cardCode);
							cardDto.setBank_card_name(dto.getBank_card_name());
							cardDto.setBranch_name(dto.getBranch_name());
							cardDto.setCard_type(dto.getCard_type()==null?cardDto.getCard_type():dto.getCard_type());
							cardDto.setOpen_account_bank_name(dto.getOpen_account_bank_name());
							cardDto.setPapers_code(dto.getPapers_code());
							cardDto.setPapers_type(dto.getPapers_type());
							cardDto.setIp(ipUtil.getIpAddress(req));
							cardDto.setMobile(dto.getMobile());
							withdrawService.commissionBankCardInfoUpdate(cardDto);//更新卡信息
							parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
							parameter.setRespMessge(RespCodeEnum.SUCCESS.getMessage());
						}else{//用户已绑卡
							parameter.setRespCode(RespCodeEnum.bank_card_existCard.getCode());
							parameter.setRespMessge(reqCt.getMessage("withdraw.banka.existsCard"));
						}
					}
				}else{//卡号格式错误
					parameter.setRespCode(RespCodeEnum.wallet_withOut_error4.getCode());
					parameter.setRespMessge(reqCt.getMessage("withdraw.banka.cardError"));
					this.writeJSONForApp(res,"userWithDrawBankCard.do", parameter);//返回json数据并且打印返回数据日志
					parameter=null;
					return;
				}
			}else{
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {//未知异常
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"updateUserWithDrawPwd.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	/**
	 * 保存上传广告内容接口
	 * @param req
	 * @param res
	 * @param dto
	 * @param file
	 * @throws Exception
	 */
	@RequestMapping(value="/operateUserUploadAd.do",method=RequestMethod.POST)
	public void operateUserUploadAd(HttpServletRequest req, HttpServletResponse res, VideoDto dto) throws Exception{
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"operateUserUploadAd.do");
		// 返回消息的dto
		GobalRespParameter parameter=new GobalRespParameter();
		RequestContext reqCt= new RequestContext(req);// 语言包
		//获取请求参数并判断是否为空getPageModel
		try {
			writeLog(LOGTYPE_CONTROLLER, "requestParmaData:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AppOperateDataController.class);
			if(!util.isNull(dto.getSerial_number(),dto.getVedio_type()+"",dto.getFile_name(),dto.getFile_path(),dto.getFile_type())){
				AdVideoController controll=new AdVideoController();//创建视频controller对象，用于调用生成html方法
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				List<VideoDto> listDto1 = advertiseVideoService.findByOrderNo(dto.getSerial_number());//查询该订单是否已上传  已上传则修改  否则新增
				
				writeLog(LOGTYPE_CONTROLLER," ==== findById Tb_Vedio_Audit  entity:"+(listDto1.size()==0?"":JSONObject.fromObject(dto)), LOGLEVEL_INFO, AppOperateDataController.class);
				Map<String, String> map=new HashMap<String, String>();
				//String [] oldNames=dto.getOld_file_name().split(",");
				if(listDto1.size()==0){
					if(util.isNull(dto.getSerial_number())){//判断单号是否为空
						parameter.setRespMessge(reqCt.getMessage("upload.video.order.notExists"));//RespCodeEnum.SUCCESS.getCode()
						parameter.setRespCode(RespCodeEnum.orderNo_empty_error.getCode());
						this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
					List<Tb_Order> listOrder = orderService.queryOrderListBySerialNum(dto.getSerial_number());//根据单号查询当前订单
					if(!dto.getFile_type().equals(listOrder.get(0).getFile_type())){//上传文件类型和订单下单选的类型不一致
						parameter.setRespMessge(reqCt.getMessage("upload.video.fileType.error"));
						parameter.setRespCode(RespCodeEnum.upload_fileType_error.getCode());
						this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
					if(listOrder.get(0).getOrder_status()==1){//订单未支付
						parameter.setRespMessge(reqCt.getMessage("upload.video.order.noPay"));
						parameter.setRespCode(RespCodeEnum.upload_orderNoPay_error.getCode());
						this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
					List<Object[]> batch = new ArrayList<Object[]>();//插入视频
					for (Tb_Order order : listOrder) {
						String fileName="",oldName="";
						//设置生成html名称
						if("2".equals(dto.getFile_type())||"3".equals(dto.getFile_type())){ 
							if("3".equals(dto.getFile_type())){//图片  多张
								if(order.getUpload_file_num()!=dto.getImgUrl().split(",").length){
									parameter.setRespMessge(reqCt.getMessage("upload.imgList.not.enough").replace("*", listOrder.size()+"").replace("#", dto.getImgUrl().split(",").length+""));
									parameter.setRespCode(RespCodeEnum.updImgCount_difference_error.getCode());
									this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
									parameter=null;
									return;
								}
								for (int i = 0; i < order.getUpload_file_num(); i++) {//根据图片数量进行编号
									fileName=dto.getFile_name()+AdVideoController.FTL_NAME_INDEX+(i+1)+AdVideoController.FTL_NAME+dto.getModel()+".html";
									//oldName=oldNames[i];
									if(!map.containsKey(fileName+","+order.getDevice_id())){//如果当前名称编号没有被使用 则跳出循环
										map.put(fileName+","+order.getDevice_id(),fileName);
										break;
									}
								}
							}else{//html模板
								fileName=dto.getFile_name()+AdVideoController.FTL_NAME+dto.getModel()+".html";
							}
						}else{//视频
							fileName=dto.getFile_name();
						}
						Object[] values = new Object[] {//封装订单数据
							dto.getName(),
							fileName,
							dto.getFile_path()+File.separator+fileName,
							"",
							dto.getIntroduction(),
							customerDto.getAccount_id(),
							new Timestamp(System.currentTimeMillis()),
							"",
							new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()),
							ONE,
							dto.getVedio_type(),
							order.getSerial_number(),
							oldName,
							order.getFile_type(),
							order.getORDER_TYPE(),
							order.getIf_sub(),
							order.getUnified_serial_number()==null?"":order.getUnified_serial_number()
			   			};
						batch.add(values);//加入集合待插入数据库
					}
					advertiseVideoService.saveVedioAndUpdateOrder(batch,dto.getSerial_number());//保存上传数据并更新订单状态
					if("2".equals(dto.getFile_type())||"3".equals(dto.getFile_type())){
						writeLog(LOGTYPE_CONTROLLER, "insert create html file begin!!!!", LOGLEVEL_INFO, AppOperateDataController.class);
						controll.createHtmlByImg(req,dto,null);//生成html文件
					}
					writeLog(LOGTYPE_CONTROLLER, dto.getSerial_number()+" ==== insert success entity:"+JSONArray.fromObject(batch), LOGLEVEL_INFO, AppOperateDataController.class);
				}else{
					if(!listDto1.get(0).getFile_type().equals(dto.getFile_type())){//上传类型错误
						parameter.setRespMessge(reqCt.getMessage("upload.video.fileType.error"));
						parameter.setRespCode(RespCodeEnum.upload_fileType_error.getCode());
						this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
						parameter=null;
						return;
					}
					for (int i = 0; i < listDto1.size(); i++) {
						Tb_Vedio_Audit entity=new Tb_Vedio_Audit();
						VideoDto dto1=listDto1.get(i);
						BeanUtils.copyProperties(entity,dto1);//复制保存在数据中属性值
						//修改实体属性值
						entity.setIntroduction(util.isNull(dto.getIntroduction())?entity.getIntroduction():dto.getIntroduction());
						entity.setName(util.isNull(dto.getName())?entity.getName():dto.getName());
						entity.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
						entity.setAudit_id("");
						entity.setAudit_status(ONE);
						entity.setVedio_type(util.isNull(dto.getVedio_type()+"")?entity.getVedio_type():dto.getVedio_type());
						String fileName="",oldName="";
						if("2".equals(dto.getFile_type())||"3".equals(dto.getFile_type())){
							if(dto.getFile_name().indexOf(".html")<0){//如果是新名称则重新生成文件
								if("3".equals(dto.getFile_type())){
									if(dto1.getUpFileNum()!=dto.getImgUrl().split(",").length){//上传图片数量不够
										parameter.setRespMessge(reqCt.getMessage("upload.imgList.not.enough").replace("*", listDto1.size()+"").replace("#", dto.getImgUrl().split(",").length+""));
										parameter.setRespCode(RespCodeEnum.updImgCount_difference_error.getCode());
										this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
										parameter=null;
										return;
									}
									for (int j = 0; j < dto1.getUpFileNum(); j++) {//给多张图片名称进行编号
										fileName=dto.getFile_name()+AdVideoController.FTL_NAME_INDEX+(j+1)+AdVideoController.FTL_NAME+dto.getModel()+".html";
										//oldName=oldNames[j];
										if(!map.containsKey(fileName+","+dto1.getDevice_id())){
											map.put(fileName+","+dto1.getDevice_id(),oldName);
											break;
										}
									}
								}else{//html模板
									fileName=dto.getFile_name()+AdVideoController.FTL_NAME+dto.getModel()+".html";
								}
								entity.setFile_name(fileName);
								entity.setFile_path(dto.getFile_path()+File.separator+entity.getFile_name());
							}
						}else{//视频
							entity.setFile_name(util.isNull(dto.getFile_name())?entity.getFile_name():dto.getFile_name());
							entity.setFile_path(util.isNull(dto.getFile_path())?entity.getFile_path():dto.getFile_path()+File.separator+entity.getFile_name());
						}
						entity.setOld_file_name(oldName);
						entity.setPlay_path("");//留空
						advertiseVideoService.updateForSub(entity);
					}
					//map=null;
					if("2".equals(dto.getFile_type())||"3".equals(dto.getFile_type())){
						if(dto.getFile_name().indexOf(".html")<0){//如果是新名称则重新生成文件
							writeLog(LOGTYPE_CONTROLLER, "update create html file begin!!!!", LOGLEVEL_INFO, AppOperateDataController.class);
							controll.createHtmlByImg(req,dto,null);
						}
					}
				}
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
				parameter.setRespMessge(RespCodeEnum.SUCCESS.getMessage());//RespCodeEnum.SUCCESS.getCode()
				writeLog(LOGTYPE_CONTROLLER, "query advertise info success! ", LOGLEVEL_INFO, AppOperateDataController.class);
			}else{//参数有误
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"operateUserUploadAd.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	
	/**
	 * 收益提现
	 * @param req res
	 */
	@RequestMapping(value="/userProfitWithDraw.do",method=RequestMethod.POST)
	public void userProfitWithDraw(HttpServletRequest req, HttpServletResponse res) throws Exception{
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"userProfitWithDraw.do");
		withdrawService.withdraw(req, res,req.getSession().getAttribute(SESSION_USER_TYPE).toString());
	}
	
	
	/**
	 * 退出系统
	 * @param req res
	 */
	@RequestMapping(value="/userExitSystem.do",method={RequestMethod.POST,RequestMethod.GET})
	public void userExitSystem(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"userExitSystem.do");
		// 清除session
		req.getSession().invalidate();
		parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
		parameter.setRespMessge(RespCodeEnum.SUCCESS.getMessage());
		this.writeJSONForApp(res,"userExitSystem.do", parameter);//返回json数据并且打印返回数据日志
		parameter=null;
	}
	
	
	/**
	 * 
	 * @param userType 2：店主3：合作商 4：代理 5：业务员 6 销售员
	 * @return 5：店主7：合作商 4：代理 3：业务员 8 销售员
	 */
	public int changeUserType(String userType){
		int iUsertype=SIX;
		switch (userType) {
		case "2":
			iUsertype=FIVE;
			break;
		case "3":
			iUsertype=SEVEN;
			break;
		case "4":
			iUsertype=FOUR;
			break;
		case "5":
			iUsertype=THREE;
			break;
		case "6":
			iUsertype=EIGHT;
			break;
		default:
			iUsertype=SIX;
			break;
		}
		return iUsertype;
	}
}
