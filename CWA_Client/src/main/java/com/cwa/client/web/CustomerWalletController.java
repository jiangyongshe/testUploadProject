package com.cwa.client.web;

import java.lang.reflect.Field;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.CustomerWalletFlowDao;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.CustomerWalletFlow;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.model.Tb_Customer_Wallet;
import com.cwa.client.service.CustomerWalletService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.Tools;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/*/customerWallet")
public class CustomerWalletController extends BaseController<GobalRespParameter> implements Constant{

	/**
	 * 流水类型-充值
	 */
	private static final int FLOW_TYPE_RECHARGE = 1;
	
	@Resource// 订单详情service层
	private CustomerWalletService customerWalletService;
	
	//查询钱包流水
	@RequestMapping("/queryWalletFlow.do")
	public void queryWalletFlow(HttpServletRequest req, HttpServletResponse res) throws Exception{
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
				dto.setFLOW_TYPE(getParameter(req, "type")==null?null:Integer.parseInt(getParameter(req, "type")));
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setCUSTOMER_ID(customerDto.getAccount_id());//查询用户
				dto.setBeginDate(getParameter(req, "beginDate"));
				dto.setEndDate(getParameter(req, "endDate"));
				
				writeLog("", "==== accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, CustomerWalletController.class);
				PageModel<CustomerWalletFlow> pageModel = customerWalletService.getPageModel(dto);
				parameter.setData(pageModel);
				parameter.setSuccess(true);
				writeLog("", "query walletFlow info success! data:"+pageModel, LOGLEVEL_INFO, CustomerWalletController.class);
			}
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	@Resource
	private CustomerWalletFlowDao customerWalletFlowDao;
	
	/**
	 * 查询充值流水
	 * @param req
	 * @param res
	 * @param customerWalletFlow
	 */
	@RequestMapping(value="chargeFlow.do")
	public void chargeFlow(HttpServletRequest req,HttpServletResponse res,
			CustomerWalletFlow customerWalletFlow){
		try {
			writeLog(LOGTYPE_CONTROLLER,req.getSession().getAttribute(SESSION_USER_NAME)+" query the flow table information.",LOGLEVEL_INFO,CustomerWalletController.class);
			// 除了流水类型其它参数全设为null
			for(Field field : customerWalletFlow.getClass().getDeclaredFields()){
				String name = field.getName();
				if(name.equalsIgnoreCase("FLOW_TYPE")){
					continue;
				}
				field.setAccessible(true);
				field.set(customerWalletFlow, null);
			}
			// 查询两年内的数据
			Calendar calendar = Calendar.getInstance();
			customerWalletFlow.setEndTime(NORMAL_YMDHMS.format(calendar.getTime()));
			calendar.add(Calendar.YEAR, -2);
			customerWalletFlow.setStartTime(NORMAL_YMDHMS.format(calendar.getTime()));
			// 关联订单表查询支付类型
			customerWalletFlow.setRelevanceCondition("LEFT JOIN tb_client_in_out_money B ON A.SERIAL_NUMBER = B.SERIAL_NUMBER ");
			customerWalletFlow.setSelectField("B.PAY_TYPE pay_type");
			customerWalletFlow.setTimeField("OPEN_DATE");
			customerWalletFlow.setWhereCondition("B.IN_OUT_TYPE = "+IN_OUT_TYPE_RECHARGE);
			List<CustomerWalletFlow> list = customerWalletFlowDao.query(customerWalletFlow, CustomerWalletFlowDao.class);
			int count = customerWalletFlowDao.queryCount(customerWalletFlow, CustomerWalletFlowDao.class);
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("list",list);
			map.put("count",count);
			responseJSON(res,map);
		} catch (Exception e) {
			writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, CustomerWalletController.class);
			e.printStackTrace();
			responseJSON(res, Tools.returnObj(RespCodeEnum.FAILD.getCode(), RespCodeEnum.FAILD.getMessage()));
		}
	}
	
	//钱包流水删除
	@RequestMapping("/deleteWalletFlow.do")
	public void deleteWalletFlow(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String,String[]> map = getAllParameter(req,"deleteWalletFlow.do","ids");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				customerWalletService.deleteFlow(customerDto.getAccount_id(), map.get("ids")[0]);
				parameter.setSuccess(true);
				writeLog("", "delete success! accountId:"+customerDto.getAccount_id()+"===ids:"+map.get("ids")[0], LOGLEVEL_INFO, CustomerWalletController.class);
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
			}
				
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	@RequestMapping("/findWallet.do")
	public void findWallet(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
			Tb_Customer_Wallet entity = customerWalletService.findByAccountId(customerDto.getAccount_id());
			parameter.setSuccess(true);
			parameter.setData(entity);
			writeLog("", "query wallet success! accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, CustomerWalletController.class);
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	//钱包充值
	@RequestMapping(value ="/walletRecharge.do", consumes = "application/json",method=RequestMethod.POST)
	public void walletRecharge(HttpServletRequest req, HttpServletResponse res,@RequestBody CustomerWalletFlow dto) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String,String[]> map = getAllParameter(req,"walletRecharge.do");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				if(util.isNull(dto.getPay_type())||dto.getAMOUNT()==null||dto.getAMOUNT().doubleValue()<=0){//参数不合法
					writeLog(LOGTYPE_SERVICE, "pay_type："+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("common.exception.parameter"));
					parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
					writeJSON(res, parameter);
					return;
				}
				if(UNPAY_TYPE.equals(dto.getPay_type())&&dto.getAMOUNT().doubleValue()>3000){//银联充值金额过大
					writeLog(LOGTYPE_SERVICE, "amount more big "+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("pay.common.amount.moreBig"));
					writeJSON(res, parameter);
					return;
				}
				if(!Pattern.matches(REG_POSITIVE_REALNUMBER, dto.getAMOUNT().toString())){
					writeLog(LOGTYPE_SERVICE, "Recharge('"+dto.getAMOUNT().toString()+"') money format mistake", LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("pay.common.money.illegal"));
					writeJSON(res, parameter);
					return;
				}
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				dto.setCUSTOMER_ID(customerDto.getAccount_id());
				dto.setUserId(customerDto.getId());
				writeLog("", "accountId:"+customerDto.getAccount_id()+"===dto:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, CustomerWalletController.class);
				parameter = customerWalletService.walletRecharge(dto,req);
				writeLog("", "end pay!!!  result:"+parameter.getMsg(), LOGLEVEL_INFO, CustomerWalletController.class);
				if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error1.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.wallet.freeze"));
				}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error2.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.wallet.notExist"));
				}else if(!UNPAY_TYPE.equals(dto.getPay_type())&&parameter.getMsg().equals(RespCodeEnum.FAILD.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.recharge.faild"));
				}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error3.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.notSection")+parameter.getData());
				}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error4.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.union.cardCodeError")+parameter.getData()==null?"":parameter.getData());
				}else if(parameter.getMsg().equals("51009")){
					parameter.setData(reqCt.getMessage("updateMobile.tip.verificationMistake"));
				}
				writeLog("", "walletRecharge success!", LOGLEVEL_INFO, CustomerWalletController.class);
			}else{//请求参数无效
				parameter.setData(reqCt.getMessage("common.exception.parameter"));
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
			}
				
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	//钱包提现
	@RequestMapping(value="/walletWithout.do", consumes = "application/json")
	public void walletWithout(HttpServletRequest req, HttpServletResponse res,@RequestBody CustomerWalletFlow dto) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String,String[]> map = getAllParameter(req,"walletWithout.do");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				if(util.isNull(dto.getPay_type())||dto.getAMOUNT()==null||dto.getAMOUNT().doubleValue()<=0){//参数不合法
					writeLog(LOGTYPE_SERVICE, "pay_type："+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("common.exception.parameter"));
					parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
					writeJSON(res, parameter);
					return;
				}
				if(!Pattern.matches(REG_POSITIVE_REALNUMBER, dto.getAMOUNT().toString())){
					writeLog(LOGTYPE_SERVICE, "Without('"+dto.getAMOUNT().toString()+"') money format mistake", LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("pay.common.money.illegal"));
					writeJSON(res, parameter);
					return;
				}
				
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				dto.setCUSTOMER_ID(customerDto.getAccount_id());
				dto.setUserId(customerDto.getId());
				writeLog("", "accountId:"+customerDto.getAccount_id()+"===dto:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, CustomerWalletController.class);
				//parameter = customerWalletService.walletRechargeOrWithout(dto,req);
				if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.money.notEnough"));
				}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error1.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.wallet.notExist"));
				}else if(parameter.getMsg().equals(RespCodeEnum.wallet_withOut_error2.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.wallet.freeze"));
				}else if(parameter.getMsg().equals(RespCodeEnum.FAILD.getCode())){
					parameter.setData(reqCt.getMessage("pay.common.withDraw.faild"));
				}
				writeLog("", "walletWithout success!", LOGLEVEL_INFO, CustomerWalletController.class);
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
			}
				
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	/*//银联支付发送短信验证码
	@RequestMapping(value="/unionPaySendPhoneVCode.do", consumes = "application/json")
	public void unionPaySendPhoneVCode(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		Map<String,String[]> map = getAllParameter(req,"unionPaySendPhoneVCode.do","cardCode","mobile","amount");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				if(!Pattern.matches(REG_POSITIVE_REALNUMBER, map.get("amount")[0])){
					writeLog(LOGTYPE_SERVICE, "Without('"+map.get("amount")[0]+"') money format mistake", LOGLEVEL_INFO, CustomerWalletController.class);
					parameter.setData(reqCt.getMessage("pay.common.money.illegal"));
					writeJSON(res, parameter);
					return;
				}
				
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				dto.setCUSTOMER_ID(customerDto.getAccount_id());
				dto.setUserId(customerDto.getId());
				writeLog("", "accountId:"+customerDto.getAccount_id()+"===dto:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, CustomerWalletController.class);
				
				
				
				writeLog("", "walletWithout success!", LOGLEVEL_INFO, CustomerWalletController.class);
			}else{//请求参数无效
				parameter.setMsg(RespCodeEnum.global_parameter_isnull.getCode());
			}
				
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}*/
}
