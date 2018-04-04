package com.cwa.client.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.SystemSetDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.dto.VedioPlayHistoryDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.redis.JedisOptionUtil;
import com.cwa.client.service.AdvertiseInfoService;
import com.cwa.client.service.VedioPlayHistoryService;
import com.cwa.client.service.WithdrawService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateUtils;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/*/customer")
public class AdQueryController extends BaseController<GobalRespParameter> implements Constant{

	@Resource// 普通用户service层
	private AdvertiseInfoService advertiseInfoService;
	
	@Resource
	private AdvertiserDao advertiserDao;
	
	@Resource
	private VedioPlayHistoryService vedioPlayHistoryService;
	
	@Resource
	private WithdrawService withdrawService;
	
	@Resource// 普通用户service层
	private SystemSetDao systemSetDao;
	
	@RequestMapping("/queryAdvertiseInfo.do")
	public void queryAdvertiseInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=FIVE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				Double discount = queryUserDiscount(req, 0);
				AdvertiseInfoDto dto=new AdvertiseInfoDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setAccount_id(customerDto.getAccount_id());
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setMailing_address(getParameter(req, "mailingAddress"));//查询地址
				dto.setAdName(getParameter(req, "adName"));
				dto.setDevice_industry(getParameter(req, "deviceIndustry"));
				writeLog("", "==== mailingAddress:"+getParameter(req, "mailingAddress"), LOGLEVEL_INFO, AdQueryController.class);
				PageModel<AdvertiseInfoDto> pageModel = advertiseInfoService.getPageModel(dto);
				for (AdvertiseInfoDto infoDto : pageModel.getList()) {
					infoDto.setCurrPlayCount((Integer)jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+infoDto.getDevice_id()));
				}
				parameter.setMsg(discount+"");
				parameter.setData(pageModel);
				parameter.setSuccess(true);
				writeLog("", "query advertise info success! data:"+JSONObject.fromObject(pageModel), LOGLEVEL_INFO, AdQueryController.class);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}finally{
			jedisUtil.returnResource();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	@RequestMapping("/queryConfimBuyAdvertiseInfo.do")
	public void queryConfimBuyAdvertiseInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameter(req,"queryConfimBuyAdvertiseInfo.do","checkAdvertiseId","deviceId","timeInterval","fileType");
		RequestContext reqCt= new RequestContext(req);// 语言包
		JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(map!=null){
				/*String isInterCut=getParameter(req, "isInterCut");
				if(isInterCut!=null){
					map.put("isInterCut", new String[] {isInterCut});//是否插播
				}*/
				List<AdvertiseInfoDto> list = getOrderList(req,map,null,false);
				if(list.size()>0){
					Double discount = queryUserDiscount(req, list.size());
					writeLog("","===disCount:"+discount, LOGLEVEL_INFO, AdQueryController.class);
					for (AdvertiseInfoDto infoDto : list) {
						infoDto.setCurrPlayCount((Integer)jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+infoDto.getDevice_id()));
					}
					parameter.setData(list);
					parameter.setSuccess(true);
					parameter.setMsg(discount+"");
					writeLog("","query advertise info success! data:"+GsonUtil.dtoToJson(list), LOGLEVEL_INFO, AdQueryController.class);
				}
				
			}else{//请求参数无效
				parameter.setData(RespCodeEnum.global_parameter_isnull.getCode());
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}finally{
			jedisUtil.returnResource();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	@RequestMapping("/queryVedioPlayHistory.do")
	public void queryVedioPlayHistory(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=FIVE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				VedioPlayHistoryDto dto=new VedioPlayHistoryDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				if(getParameter(req, "beginTime")!=null){
					dto.setBegin_time(DateUtils.string2Time(getParameter(req, "beginTime"),DateUtils.DATE_FORMAT_YYYY_MM_dd));
				}
				if(getParameter(req, "endTime")!=null){
					dto.setEnd_time(DateUtils.string2Time(getParameter(req, "endTime"),DateUtils.DATE_FORMAT_YYYY_MM_dd));
				}
				dto.setAccountId(customerDto.getAccount_id());
				writeLog("", "==== beginTime:"+dto.getBegin_time()+"====endTime:"+dto.getEnd_time(), LOGLEVEL_INFO, AdQueryController.class);
				PageModel<VedioPlayHistoryDto> pageModel = vedioPlayHistoryService.getPageModel(dto);
				parameter.setData(pageModel);
				parameter.setSuccess(true);
				writeLog("", "query advertise info success! data:"+pageModel, LOGLEVEL_INFO, AdQueryController.class);
			}
		} catch (Exception e) {
			parameter.setData(new PageModel<>());
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	
	/**
	 * 获取广告年月周折扣优惠
	 * @param request
	 */
	@RequestMapping(value="/queryUserYMWDiscount.do")
	public void queryUserYMWDiscountController(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String, String> map=queryUserYMWDiscount();//获取所有折扣
		parameter.setSuccess(true);
		parameter.setData(map);
		writeLog("","====query discount and num success ! map:"+JSONObject.fromObject(map),LOGLEVEL_INFO,AdQueryController.class);
		writeJSON(res, parameter);
		parameter=null;
	}
	/**
	 * 获取用户卡信息
	 * @param request
	 */
	@RequestMapping(value="/queryUserCardInfo.do")
	public void queryUserCardInfo(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
		int cardType=getParameter(req, "cardType")==null?FOUR:Integer.parseInt(getParameter(req, "cardType"));
		List<Tb_Bank_Card_Info> list1 = withdrawService.queryBankCardInfo(cardType==THREE&&!"2".equals(userType)?sessionUser.getLogin_id():sessionUser.getAccount_id(),cardType,cardType==FOUR?ZERO:ADWithdrawController.changeUserType(userType));
		List<Tb_Bank_Card_Info> list=new ArrayList<>();
		parameter.setSuccess(true);
		for (Tb_Bank_Card_Info cardDto : list1) {
			if(cardDto.getStatus()==1){
				cardDto.setBank_card_code(RegUtil.getUtil().replaceNumToX(cardDto.getBank_card_code(), THREE));
				cardDto.setMobile(RegUtil.getUtil().replaceNumToX(cardDto.getMobile(), FOUR));
				list.add(cardDto);
			}
		}
		parameter.setData(list);
		writeLog("","====query queryUserCardInfo success ! list:"+GsonUtil.dtoToJson(list),LOGLEVEL_INFO,AdQueryController.class);
		writeJSON(res, parameter);
		parameter=null;
	}
}
