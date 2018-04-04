package com.cwa.client.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.ADCommissionDao;
import com.cwa.client.dao.AdvertiseInfoDao;
import com.cwa.client.dao.AdvertiseOrderDao;
import com.cwa.client.dao.AdvertiseOrderDetailDao;
import com.cwa.client.dao.AdvertiseVideoDao;
import com.cwa.client.dao.AdvertiserDeviceDao;
import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dao.CustomerCommReportDao;
import com.cwa.client.dao.CustomerWalletDao;
import com.cwa.client.dao.CustomerWalletFlowDao;
import com.cwa.client.dao.DeviceVedioCountDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.AdvertiserDeviceDto;
import com.cwa.client.dto.BankServerTcpDto;
import com.cwa.client.dto.CustomerWalletFlow;
import com.cwa.client.dto.DeviceVedioCountDto;
import com.cwa.client.dto.OrderDetailDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.dto.UnPayOpenAndConsumeDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.model.Tb_Customer_Wallet;
import com.cwa.client.model.Tb_Customer_Wallet_Flow;
import com.cwa.client.model.Tb_Order;
import com.cwa.client.model.Tb_Order_Detail;
import com.cwa.client.model.Tb_Order_Number;
import com.cwa.client.model.Tb_client_in_out_money;
import com.cwa.client.model.Tb_customer_comm_report;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateUtils;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.PageVars;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.UniqId;
import com.cwa.client.utils.ipUtil;
import com.cwa.client.web.CustomerWalletController;
import com.cwa.client.web.nettytcpsocket.AliPayDirDto;
import com.cwa.client.web.nettytcpsocket.PayUtil;
import com.cwa.client.web.nettytcpsocket.RespMsgDto;
import com.cwa.client.web.nettytcpsocket.WebChatDirPayDto;

import net.sf.json.JSONObject;

@Service
public class OrderService implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private AdvertiseOrderDao advertiseOrderDao;
	
	@Resource
	private AdvertiseOrderDetailDao advertiseOrderDetailDao;
	
	@Resource
	private DeviceVedioCountDao deviceVedioCountDao;
	
	@Resource
	private AdvertiseVideoDao advertiseVideoDao;
	
	@Resource
	private AdvertiserDeviceDao advertiserDeviceDao;
	
	@Resource
	private AdvertiseInfoDao advertiseInfoDao;
	@Resource
	private ShoppCartService shoppCartService;
	
	@Resource
	private CustomerWalletDao customerWalletDao;
	
	@Resource
	private CustomerWalletFlowDao customerWalletFlowDao;
	
	@Resource
	private CustomerCommReportDao customerCommReportDao;
	
	@Resource
	private ClientInOutMoneyDao clientInOutMoneyDao;
	
	@Resource
	private BankServerTcpDto bankApiServer;
	
	@Resource
	private WithdrawService withdrawService;
	
	@Resource
	private ADCommissionDao adCommissionDao;
  
	public Tb_Order findById(Integer id){
		return advertiseOrderDao.findById(id);
	}
	
	public void save(Tb_Order entity) throws Exception{
		advertiseOrderDao.save(entity);
	}
	public void update(Tb_Order entity) throws Exception{
		advertiseOrderDao.update(entity);
	}
	
	
	public RuturnMessageDto batchUpdate(List<Tb_Order> orderList,String payType,CustomerWalletFlow dto,HttpServletRequest req) throws Exception {
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		List<Object []> listObj=new ArrayList<>();
		List<Object []> listObjNUmber=new ArrayList<>();
		String accountId=dto.getCUSTOMER_ID();
		String loginType=req.getSession().getAttribute(LOGINTYPE).toString();//登录类型
		String currDate=DateUtils.TimestamptoString(new Timestamp(System.currentTimeMillis()),DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
		String serialNumber=currDate.substring(2)+dto.getUserId()+ORDER_PAY+payType+UniqId.getallSymbolArrayStr(2); //订单号
		String tranNo=req.getParameter("tranNo");
		if(UNPAY_TYPE.equals(payType)&&!RegUtil.getUtil().isNull(tranNo)){
			serialNumber=tranNo;
		}
		for (Tb_Order order : orderList) {
			Object [] obj={
				payType,
				order.getSerial_number()
			};
			listObj.add(obj);//封装更新订单状态数据
			Object [] objNumber={
				serialNumber,
				order.getSerial_number()
			};
			listObjNUmber.add(objNumber);//封装支付订单号和购买广告订单号关系
		}
		if(WALLET_PAY.equals(payType)){//翔云余额支付
			Tb_Customer_Wallet walletDto = customerWalletDao.findByAccountId(accountId);
			if(walletDto==null){
				parameter.setMsg(RespCodeEnum.wallet_withOut_error2.getCode());
				return parameter;
			}else{
				if(walletDto.getSTATE()==2){
					parameter.setMsg(RespCodeEnum.wallet_withOut_error1.getCode());
					return parameter;
				}
				if(dto.getFLOW_TYPE()==1){
					walletDto.setAMOUNT(walletDto.getAMOUNT().add(dto.getAMOUNT()));
				}else{
					if(walletDto.getAMOUNT().compareTo(dto.getAMOUNT())==-1){
						parameter.setMsg(RespCodeEnum.wallet_withOut_error.getCode());
						return parameter;
					}
					walletDto.setAMOUNT(walletDto.getAMOUNT().subtract(dto.getAMOUNT()));
				}
				customerWalletDao.update(walletDto);
			}
			
			Tb_Customer_Wallet_Flow entity =new Tb_Customer_Wallet_Flow();//钱包流水
			entity.setAMOUNT(dto.getAMOUNT());
			entity.setCUSTOMER_ID(dto.getCUSTOMER_ID());
			entity.setFLOW_TYPE(dto.getFLOW_TYPE());
			entity.setOPEN_DATE(new Timestamp(new Date().getTime()));
			entity.setSerial_number(serialNumber);
			customerWalletFlowDao.save(entity);
			logWriteUtil.writeLog("", "update Tb_Customer_Wallet_Flow success flowEntity:"+JSONObject.fromObject(entity), LOGLEVEL_INFO, OrderService.class);
			Tb_customer_comm_report repEntity = clientInOutMoneyDao.queryInOutInfo(accountId);
			if(repEntity!=null){//更新报表
				repEntity.setDeposit(repEntity.getDeposit().add(dto.getAMOUNT()));
				customerCommReportDao.update(repEntity);
			}
			advertiseOrderDao.batchUpdate(listObj);
			logWriteUtil.writeLog("", "update Tb_customer_comm_report success repEntity:"+JSONObject.fromObject(repEntity), LOGLEVEL_INFO, OrderService.class);
			parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
		}else{
			Tb_client_in_out_money tb_client_in_out_money = new Tb_client_in_out_money();//出金流水
			tb_client_in_out_money.setSerial_number(serialNumber);
			tb_client_in_out_money.setAccount_id(accountId);
			tb_client_in_out_money.setIn_out_type(IN_OUT_TYPE_RECHARGE);
			tb_client_in_out_money.setAmount(dto.getAMOUNT());
			tb_client_in_out_money.setOpen_date(new Timestamp(new Date().getTime()));
			tb_client_in_out_money.setCommit_account_id(accountId);
			tb_client_in_out_money.setPay_type(payType);
			tb_client_in_out_money.setAccount_type(SIX);
			tb_client_in_out_money.setStatus(ONE);
			tb_client_in_out_money.setPay_ip(ipUtil.getIpAddress(req));
			if(RegUtil.getUtil().isNull(req.getParameter("sendMsg"))){
				clientInOutMoneyDao.insert(tb_client_in_out_money);
				advertiseOrderDao.batchInsertNumber(listObjNUmber);
			}
			
			if(ALIPAY_TYPE1.equals(payType)){
				AliPayDirDto aliPayDto=new AliPayDirDto();
				aliPayDto.setTimestamp(DateUtils.getNowDay(DateUtils.DATE_FORMAT_DEFAULT));
				aliPayDto.setSubject("广告订单支付");
				if(req.getSession().getAttribute(PAGE_LOGIN_TYPE)!=null){
					if("1".equals(req.getSession().getAttribute(PAGE_LOGIN_TYPE).toString())){//判断是否手机版
						aliPayDto.setReturn_url(MOBILE_ORDER_ALIPAY_RETURN_URL+"?tNo="+tb_client_in_out_money.getSerial_number());
					}
				}else{
					aliPayDto.setReturn_url(ORDER_ALIPAY_RETURN_URL);
				}
				
				aliPayDto.setNotify_url(ORDER_ALIPAY_NOTIFY_UTL);
				
				RespMsgDto aliPayDir = new PayUtil(bankApiServer).aliPayDir(tb_client_in_out_money, aliPayDto, loginType);
				
				logWriteUtil.writeLog("", "alipay end!!!! payType:"+payType+" RespMsgDto:"+JSONObject.fromObject(aliPayDir), LOGLEVEL_INFO, CustomerWalletService.class);
				//检查数据是否存在
				Tb_client_in_out_money dbinOutMoney=clientInOutMoneyDao.queryClientInOutInfo(tb_client_in_out_money.getSerial_number());
				
				if(RespCodeEnum.SUCCESS.getCode().equals(aliPayDir.getRespCode())){
					parameter.setSuccess(true);
					parameter.setData(aliPayDir.getRespContent());
					parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
				}else{
					dbinOutMoney.setRemark("支付宝支付广告订单失败");
					parameter.setMsg(RespCodeEnum.FAILD.getCode());
					parameter.setData(aliPayDir.getMessage());
				}
				clientInOutMoneyDao.update(dbinOutMoney);
			}else if(WECHATTPAY1_TYPE.equals(payType)){
				WebChatDirPayDto chatpayDto=new WebChatDirPayDto();
				chatpayDto.setNonce_str(UniqId.getallSymbolArrayStr(32));
				chatpayDto.setSpbill_create_ip(ipUtil.getIpAddress(req));
				chatpayDto.setNotify_url(ORDER_WECHATPAY_NOTIFY_UTL);
				chatpayDto.setBody("广告订单支付");
				if(req.getSession().getAttribute(SESSION_OPENID)!=null){
					chatpayDto.setOpenid(req.getSession().getAttribute(SESSION_OPENID).toString());
				}
				chatpayDto.setAttach(accountId);
				chatpayDto.setTime_start(DateUtils.getNowDay(DateUtils.DATE_FORMAT_YYYYMMDDHHMMSS));
				
				RespMsgDto wechatPayDir = new PayUtil(bankApiServer).chatpayDir(tb_client_in_out_money, chatpayDto, loginType);
				
				logWriteUtil.writeLog("", "wechat end!!!! payType:"+payType+" RespMsgDto:"+JSONObject.fromObject(wechatPayDir), LOGLEVEL_INFO, CustomerWalletService.class);
				//检查数据是否存在
				Tb_client_in_out_money dbinOutMoney=clientInOutMoneyDao.queryClientInOutInfo(tb_client_in_out_money.getSerial_number());
				
				if(RespCodeEnum.SUCCESS.getCode().equals(wechatPayDir.getRespCode())){
					parameter.setSuccess(true);
					parameter.setData(wechatPayDir.getRespContent());
					parameter.setMsg(serialNumber);
				}else{
					dbinOutMoney.setRemark("微信支付广告订单失败");
					parameter.setMsg(RespCodeEnum.FAILD.getCode());
					parameter.setData(wechatPayDir.getMessage());
				}
				clientInOutMoneyDao.update(dbinOutMoney);
			}else if(UNPAY_TYPE.equals(payType)){
				String cardCode=req.getParameter("cardCode");
				String mobile= req.getParameter("mobile");
				if(dto.getAMOUNT().doubleValue()>3000){//银联充值金额过大
					logWriteUtil.writeLog(LOGTYPE_SERVICE, "amount more big "+dto.getPay_type()+"====amount:"+dto.getAMOUNT(), LOGLEVEL_INFO, CustomerWalletService.class);
					parameter.setMsg(RespCodeEnum.order_payMoreBig_error.getCode());
					return parameter;
				}
				logWriteUtil.writeLog("", "union pay request param!  cardCode:"+cardCode+"==mobile:"+mobile+"==tranNo:"+tranNo, LOGLEVEL_INFO, CustomerWalletService.class);
				if(RegUtil.getUtil().isNull(cardCode)||(!RegUtil.getUtil().isBankCard(cardCode)&&cardCode.indexOf("*")<0)){
					parameter.setMsg(RespCodeEnum.wallet_withOut_error4.getCode());
					return parameter;
				}
				if(!RegUtil.getUtil().isNull(tranNo)){
					tb_client_in_out_money.setSerial_number(tranNo);
				}
				int isFirst=ONE;
				Tb_Bank_Card_Info bankCardInfo=null;
				if(cardCode.indexOf("*")>=0){
					List<Tb_Bank_Card_Info> list = adCommissionDao.queryBankCardInfo(accountId,null,FOUR,ZERO);
					for (Tb_Bank_Card_Info tb_Bank_Card_Info : list) {
						String enCardCode=RegUtil.getUtil().replaceNumToX(tb_Bank_Card_Info.getBank_card_code(), THREE);
						if(enCardCode.equals(cardCode)){
							bankCardInfo=tb_Bank_Card_Info;
							isFirst=TWO;
							break;
						}
					}
				}else{
					List<Tb_Bank_Card_Info> list = adCommissionDao.queryBankCardInfo(accountId,cardCode,FOUR,ZERO);
					bankCardInfo = list.size()>0?list.get(0):null;
				}
				if(bankCardInfo==null){
					bankCardInfo=new Tb_Bank_Card_Info();
					bankCardInfo.setAccount_id(accountId);
					bankCardInfo.setAccount_type(FIVE);
					bankCardInfo.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
					bankCardInfo.setAudit_id("");
					bankCardInfo.setBank_card_code(cardCode);
					bankCardInfo.setBank_card_name("");
					bankCardInfo.setBank_code("");
					bankCardInfo.setBranch_name("");
					bankCardInfo.setCard_type(FOUR);
					bankCardInfo.setCommit_account_id(accountId);
					bankCardInfo.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
					bankCardInfo.setIp(ipUtil.getIpAddress(req));
					bankCardInfo.setMobile(mobile);
					bankCardInfo.setOpen_account_bank_name("");
					bankCardInfo.setPapers_code("");
					bankCardInfo.setPapers_type(ONE);
					bankCardInfo.setStatus(ZERO);
					bankCardInfo.setBank_account_type(ONE);
					bankCardInfo.setBank_card_type(ONE);
					withdrawService.commissionBankCardInfo(bankCardInfo);
				}
				String basePath = req.getScheme()+"://"+req.getServerName();
				logWriteUtil.writeLog("", "union pay cardInfoEntity:"+JSONObject.fromObject(bankCardInfo), LOGLEVEL_INFO, CustomerWalletService.class);
				UnPayOpenAndConsumeDto unionPayDto=new UnPayOpenAndConsumeDto(bankCardInfo,isFirst,req.getParameter("smsCode"),basePath+"/"+MOBILE_ORDER_ALIPAY_RETURN_URL+"?tNo="+tb_client_in_out_money.getSerial_number());
				
				unionPayDto.setBackUrl(basePath+"/"+UNION_ORDERPAY_NOTIFY_UTL);
				RespMsgDto unionPayDir = new PayUtil(bankApiServer).unPayNoJumpDesposite(tb_client_in_out_money, unionPayDto, loginType);
				//检查数据是否存在
				Tb_client_in_out_money dbinOutMoney=clientInOutMoneyDao.queryClientInOutInfo(tb_client_in_out_money.getSerial_number());
				
				if(RespCodeEnum.SUCCESS.getCode().equals(unionPayDir.getRespCode())){
					parameter.setSuccess(true);
					parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
					if(isFirst==ONE){
						parameter.setData(unionPayDir.getRespContent());
					}else{
						if(RegUtil.getUtil().isNull(req.getParameter("smsCode"))){//发送短信
							parameter.setData(tb_client_in_out_money.getSerial_number());
							return parameter;
						}
					}
					dbinOutMoney.setStatus(FIVE);
				}else{
					if("51009".equals(unionPayDir.getRespCode())){
						parameter.setMsg("51009");
						return parameter;
					}else{
						parameter.setMsg(RespCodeEnum.FAILD.getCode());
						parameter.setData(unionPayDir.getMessage());
					}
					dbinOutMoney.setRemark("银联支付 订单支付失败");
				}
				clientInOutMoneyDao.update(dbinOutMoney);
			}
			logWriteUtil.writeLog("", "insert Tb_client_in_out_money success inOutEntity:"+JSONObject.fromObject(tb_client_in_out_money), LOGLEVEL_INFO, OrderService.class);
		}
		return parameter;
	}
	
	public void payOrder(List<Tb_Order_Number> list,Tb_client_in_out_money entity) throws Exception {
		List<Object []> listObj=new ArrayList<>();
		for (Tb_Order_Number ou : list) {
			Object [] obj={
				entity.getPay_type(),
				ou.getSERIAL_NUMBER()
			};
			listObj.add(obj);//封装更新订单状态数据
		}
		entity.setStatus(TWO);
		clientInOutMoneyDao.update(entity);//更新出入金流水状态
		logWriteUtil.writeLog("", "update Tb_client_in_out_money success entity:"+JSONObject.fromObject(entity), LOGLEVEL_INFO, OrderService.class);
		Tb_customer_comm_report repEntity = clientInOutMoneyDao.queryInOutInfo(entity.getAccount_id());
		if(repEntity!=null){//更新报表
			repEntity.setDeposit(repEntity.getDeposit().add(entity.getAmount()));
			customerCommReportDao.update(repEntity);
		}
		advertiseOrderDao.batchUpdate(listObj);
		advertiseOrderDao.batchUpdateCancel(listObj);
		logWriteUtil.writeLog("", "update Tb_customer_comm_report success repEntity:"+JSONObject.fromObject(repEntity), LOGLEVEL_INFO, OrderService.class);
		
	}
	
	public PageModel<AdvertiseInfoDto> getPageModel(AdvertiseInfoDto dto){
		PageVars pvNm=this.getVars(dto,1);
		PageVars pvlist=this.getVars(dto,0);
		PageModel<AdvertiseInfoDto> pm=advertiseInfoDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvlist.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    	
    }
    
    
    private PageVars getVars(AdvertiseInfoDto dto,int type){
    	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
    	 if(type==1){
    		 sbStr.append("select count(1) as cnum from tb_order o"
    				 //+" left join (select min(id) id from tb_order where account_id=:account_id and unified_serial_number<>'' group by unified_serial_number,device_id) inma on inma.id=o.id "
    				 +" left join (select min(id) id from tb_order where account_id=:account_id and unified_serial_number<>'' group by unified_serial_number) ma on ma.id=o.id "
    		 		+ " where o.if_show <> 1 and o.account_id=:account_id and (o.unified_serial_number='' or ma.id is not null) ");
    	 } else {
    		 sbStr.append("select A.id,o.vedio_id,o.if_sub,o.unified_serial_number,o.order_type,"
    		 		 + "o.price ad_price,o.file_type,o.serial_number,o.result,B.DEVICE_ADDRESS MAILING_ADDRESS,o.DEVICE_ID,B.device_code,o.SHOP_NAME,"
    		 		 + "CONCAT(dd.BEGIN_TIME,\"-\",dd.END_TIME) idle_time,ifnull(ma.mprice,o.TOTAL_PRICE) sumPrice,datediff(PLAY_END_TIME,PLAY_BEGIN_TIME)+1 days,"
    		 		 + "o.ORDER_STATUS,o.PLAY_BEGIN_TIME startDate,o.PLAY_END_TIME endDate,ifnull(ma.ct,1) buyCount,o.upload_file_num upFileNum, "
    		 		 +"(SELECT Group_concat(PIC) FROM tb_advertiser_pic WHERE device_id=o.device_id) pics "
    				 + "from tb_order o "
    				 + " left join (select min(id) id from tb_order where account_id=:account_id and unified_serial_number<>'' group by unified_serial_number,device_id) inma on inma.id=o.id "
    				 + " left join tb_advertiser A on o.ADVERTISER_ID=A.id  "
    				 + " left join tb_vedio_audit v on v.SERIAL_NUMBER=o.SERIAL_NUMBER or v.SERIAL_NUMBER=o.unified_serial_number "
    				 + " left join tb_advertiser_device B on A.id=B.ADVERTISER_ID and o.device_id=B.device_id and trim(B.device_id)<>'' "
    				 + " left join (select min(id) id,count(1) ct,sum(TOTAL_PRICE) mprice from tb_order where account_id=:account_id and unified_serial_number<>'' group by unified_serial_number) ma on ma.id=o.id "
    				 + " left join (select d.SERIAL_NUMBER,d.account_id,d.BEGIN_TIME,d.END_TIME from tb_order_detail d where d.account_id=:account_id group by d.SERIAL_NUMBER,d.account_id,d.BEGIN_TIME,d.END_TIME) dd ON o.ACCOUNT_ID = dd.account_id "
    				 + " and o.SERIAL_NUMBER = dd.SERIAL_NUMBER where o.if_show<>1 and o.account_id=:account_id ");
    	 }
    	 params.put("account_id", dto.getAccount_id());
    	 if(!RegUtil.getUtil().isNull(dto.getAdName())){
    		 sbStr.append(" and v.name=:adName ");
    		 params.put("adName", dto.getAdName());
    	 }
    	 if(!RegUtil.getUtil().isNull(dto.getShoppId())){//订单状态查询
    		 if("1".equals(dto.getShoppId().substring(0,1))){//未支付
    			 sbStr.append(" and o.order_status=1 ");
    		 }else if("4".compareTo(dto.getShoppId().substring(0,1))>0){//申请中
    			 sbStr.append(" and o.order_status<4 and o.order_status>1  ");
    		 }else if("4".compareTo(dto.getShoppId().substring(0,1))==0){//申请通过
    			 if("1".compareTo(dto.getShoppId().substring(2))==0){//等待播放
    				 sbStr.append(" and o.order_status=4 and o.order_type<>4 and o.PLAY_BEGIN_TIME>date_format(now(),'%Y-%m-%d') ");
    			 }else if("2".compareTo(dto.getShoppId().substring(2))==0){//播放中
    				 sbStr.append(" and o.order_status=4 and o.order_type<>4 and o.PLAY_BEGIN_TIME<=date_format(now(),'%Y-%m-%d') and o.PLAY_END_TIME>=date_format(now(),'%Y-%m-%d') ");
    			 }
    		 }else if("4".compareTo(dto.getShoppId().substring(0,1))<0){
    			 if("6".compareTo(dto.getShoppId().substring(0,1))==0){
    				 sbStr.append(" and ((o.order_status>=5 and o.order_status<9) or (o.order_status=4 and o.order_type<>4 and o.PLAY_END_TIME<date_format(now(),'%Y-%m-%d')) or (o.order_status=4 and o.order_type=4))");
    			 }else if("9".equals(dto.getShoppId().substring(0,1))){
        			 sbStr.append(" and o.order_status=9 ");
        		 }
    		 }
    	 }
    	 if(!RegUtil.getUtil().isNull(dto.getIdle_time())){//时段查询
    		 sbStr.append(" and d.BEGIN_TIME<=:beginTime and d.END_TIME>=:endTime ");
    		 params.put("beginTime", dto.getIdle_time().split("-")[0]);
    		 params.put("endTime", dto.getIdle_time().split("-")[1]);
    	 }
    	  if (type!=1) {
    		//总单号
	    	 if(!RegUtil.getUtil().isNull(dto.getUnified_serial_number())){//时段查询
	    		 sbStr.append(" and o.unified_serial_number=:unified_serial_number and ma.id is null and inma.id is not null ");
	    		 params.put("unified_serial_number", dto.getUnified_serial_number());
	    	 }else{
	    		 sbStr.append(" and (o.unified_serial_number='' or ma.id is not null) ");
	    	 }
    		 sbStr.append(" ORDER BY o.id desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize());
    		 logWriteUtil.writeLog("", "===param:"+JSONObject.fromObject(params)+"==sql:"+sbStr, LOGLEVEL_INFO, OrderService.class);
		  }else{
			  if(!RegUtil.getUtil().isNull(dto.getUnified_serial_number())){//时段查询
		    		 sbStr=new StringBuffer("select 1");
		    		 params = new HashMap<String,Object>();
	    	  }   
		  }
    	  
    	  System.out.println("sql:"+sbStr.toString());
    	  pv.setSbstr(sbStr);
	      pv.setParams(params);
		 
		 return pv;
    }	
    /**
	 * 根据填写播放周期计算具体播放日期
	 * @param request
	 * @param paramName
	 */
	public void setDisForDto(String playCycle,String cycleType,Map<String, String> map,AdvertiseInfoDto dto){
		if(map.get("week_num")==null){//如果插播则没有折扣
			dto.setDisCount(new BigDecimal(1));
			return;
		}
		if("w".equals(cycleType)){//周
			if(Integer.parseInt(playCycle)>=Integer.parseInt(map.get("week_num"))){
				dto.setDisCount(new BigDecimal(Double.parseDouble(map.get("week_price_discount"))/100));
			}
		}else if("m".equals(cycleType)){//月
			if(Integer.parseInt(playCycle)>=Integer.parseInt(map.get("month_num"))){
				dto.setDisCount(new BigDecimal(Double.parseDouble(map.get("month_price_discount"))/100));
			}
		}else{//年
			if(Integer.parseInt(playCycle)>=Integer.parseInt(map.get("year_num"))){
				dto.setDisCount(new BigDecimal(Double.parseDouble(map.get("year_price_discount"))/100));
			}
		}
		logWriteUtil.writeLog("", "+++set AdvertiseInfoDto disCount success! disCount:"+dto.getDisCount(), LOGLEVEL_INFO, OrderService.class);
		if(dto.getDisCount()==null){
			dto.setDisCount(new BigDecimal(1));
		}
	}
	
	public BigDecimal setOrderPrice(AdvertiseInfoDto dto,String isInterCut){
		if(dto==null){
			return new BigDecimal(0);
		}
		if("1".equals(dto.getFile_type())){//视频
			if(!RegUtil.getUtil().isNull(isInterCut)&&"2".equals(isInterCut)){
				return dto.getInter_cut_price();
			}else{
				return dto.getAd_price();
			}
		}else if("2".equals(dto.getFile_type())){//html
			if(!RegUtil.getUtil().isNull(isInterCut)&&"2".equals(isInterCut)){
				return dto.getInter_cut_html_price();
			}else{
				return dto.getHtml_price();
			}
		}else if("3".equals(dto.getFile_type())){//图片
			if(!RegUtil.getUtil().isNull(isInterCut)&&"2".equals(isInterCut)){
				return dto.getInter_cut_pic_price();
			}else{
				return dto.getPic_price();
			}
		}
		return new BigDecimal(0);
	}
	//生成订单
	public String createOrder(List<AdvertiseInfoDto> list,Map<String, String> map,String shoppIds,Double disCount) throws Exception{
		Long bgTime=System.currentTimeMillis();//下单执行开始时间
		List<Tb_Order> orderList=new ArrayList<>();
		List<Tb_Order_Detail> orderDetailList=new ArrayList<>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
		StringBuilder orders=new StringBuilder();
		BigDecimal total=new BigDecimal(0);
		BigDecimal disTotal=new BigDecimal(0);
		StringBuilder fileType=new StringBuilder();
		int orderNo=1,var=-1;
		if(!RegUtil.getUtil().isNull(map.get("isInterCut"))&&"2".equals(map.get("isInterCut"))){
			var=0;
			if(disCount!=0.0){
				logWriteUtil.writeLog("", "==customer is not 0 yuan order customer disCount:"+disCount, LOGLEVEL_INFO, OrderService.class);
				disCount=1.0;
			}
		}
		String currDate=DateUtils.TimestamptoString(new Timestamp(System.currentTimeMillis()),DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
		//判断是否分单 调整集合的顺序
		if(!RegUtil.getUtil().isNull(map.get("isSub"))&&"2".equals(map.get("isSub"))){
			list=orderByUnifiedSerialNumber(list,Integer.parseInt(map.get("forCount")));
		}
		for (AdvertiseInfoDto dto : list) {
			var=-1;
			/*AdvertiserDeviceDto advertiserDeviceDto = advertiserDeviceDao.queryDeviceRunStatus(dto.getDevice_id());
			if(advertiserDeviceDto==null||advertiserDeviceDto.getDevice_status()==11){
				logWriteUtil.writeLog("", "===device currStatus offLine deviceId:"+dto.getDevice_id()+"deviceCode:"+advertiserDeviceDto.getDevice_detail(), LOGLEVEL_INFO, OrderService.class);
				return RespCodeEnum.order_device_error.getCode()+"-"+advertiserDeviceDto.getDevice_detail()+","+list.size();
			}*/
			//setDisForDto(dto.getPlayCycle(),dto.getCycleType(),map,dto);//设置折扣
			List<Tb_Order_Detail> temOrderDetailList=new ArrayList<>();
			String key=dto.getDevice_id()+"-"+dto.getIdle_time()+"-"+dto.getShop_name();//设备id+时段+店铺名
			String str = map.get("body"+key+"-"+dto.getDevice_code());
			Tb_Order orderEntity =new Tb_Order();//生成订单
			orderEntity.setAccount_id(dto.getAccount_id());
			orderEntity.setAccount_ip(dto.getAccount_IP());
			orderEntity.setAdvertiser_id(dto.getId());
//			orderEntity.setAudit_datetime(DateUtils.string2Time(TIMEISNULL, DateUtils.DATE_FORMAT_DEFAULT));
//			orderEntity.setAudit_id(ZERO);
			orderEntity.setCommit_time(new Timestamp(System.currentTimeMillis()));
			orderEntity.setDevice_id(dto.getDevice_id());
			orderEntity.setFile_type(dto.getFile_type());
			orderEntity.setOrder_status(ONE);
			orderEntity.setPay_type(DEFUALT_PAYTYPE);
			orderEntity.setPlay_begin_time(dto.getStartDate());
			orderEntity.setPlay_end_time(dto.getEndDate());
			orderEntity.setPrice(setOrderPrice(dto,map.get("isInterCut")));
			orderEntity.setVedio_id(ZERO);
			orderEntity.setResult("");
			orderEntity.setORDER_TYPE(RegUtil.getUtil().isNull(map.get("isInterCut"))?ONE:TWO);
			String serialNumber=currDate+orderNo+UniqId.getRandomPwd(2); 
			orders.append(serialNumber.substring(2)+",");
			fileType.append(dto.getFile_type()+",");
			orderEntity.setSerial_number(serialNumber.substring(2));
			orderEntity.setShop_name(dto.getShop_name());
			orderEntity.setOld_total_price(new BigDecimal(dto.getSumPrice()));
			orderEntity.setUpload_file_num(dto.getBuyCount());
			//判断是否分单
			if(!RegUtil.getUtil().isNull(map.get("isSub"))&&"2".equals(map.get("isSub"))){
				orderEntity.setIf_sub(2);
				if("3".equals(dto.getFile_type())){//图片
					if(dto.getBuyCount()>1){//多设备多文件上传
						orderEntity.setUnified_serial_number("MF"+currDate.substring(2)+dto.getAccount_id().substring(dto.getAccount_id().length()-2));
					}else{//多设备单文件上传
						orderEntity.setUnified_serial_number("00"+currDate.substring(2)+dto.getAccount_id().substring(dto.getAccount_id().length()-2));
					}
				}else{
					orderEntity.setUnified_serial_number(dto.getUnified_serial_number()+currDate.substring(2)+dto.getAccount_id().substring(dto.getAccount_id().length()-2));
				}
			}else{
				orderEntity.setIf_sub(1);
				if("3".equals(dto.getFile_type())){//图片
					if(dto.getBuyCount()>1){//单设备多文件
						orderEntity.setUnified_serial_number("MF"+currDate.substring(2)+dto.getAccount_id().substring(dto.getAccount_id().length()-2));
						orderEntity.setIf_sub(3);
					}else{//单设备单文件
						orderEntity.setUnified_serial_number("");
					}
				}else{
					orderEntity.setUnified_serial_number("");
				}
			}
			orderNo++;//订单序号
			//得到播放天数
			Long time =(sdf.parse(dto.getEndDate()).getTime()-sdf.parse(dto.getStartDate()).getTime())/(3600 * 24 * 1000L);
			//logWriteUtil.writeLog("", "===time:"+(time+1)+"====disCount:"+disCount, LOGLEVEL_INFO, OrderService.class);
			if((RegUtil.getUtil().isNull(map.get("isInterCut")))&&(time<0||sdf.parse(dto.getStartDate()).getTime()<=new Date().getTime())){
				return RespCodeEnum.order_playCycle_error.getCode();
			}
			if(!sdf.format(new Date()).equals(sdf.format(new Date(sdf.parse(dto.getStartDate()).getTime()-(3600 * 24 * 1000L))))||(!RegUtil.getUtil().isNull(map.get("ifBuyToDay"))&&"true".equals(map.get("ifBuyToDay")))){
				var=0;
			}
			if(var==-1){
				orderEntity.setPlay_begin_time(sdf.format(new Date()));
			}
			for (int i = var; i < time+1; i++) {
				
				boolean bl=true;//标识不能下单的时间
				Date date=new Date((sdf.parse(dto.getStartDate()).getTime()+(3600 * 24 * 1000L)*i));//播放时间
				if(!RegUtil.getUtil().isNull(str)){
					String[] strs = str.split(",");
					String keyCount="canBuy-"+sdf.format(date)+"-"+key;//获取当天该广告可购买条数key
					String valueStr = map.get(keyCount);
					//logWriteUtil.writeLog("", "+++mapValues  str:"+str+"===keyCount:"+keyCount+"====keyCountValue:"+valueStr, LOGLEVEL_INFO, OrderService.class);
					//剔除不能下单时段
					for (int j = 0; j < strs.length; j++) {
						if(RegUtil.getUtil().isNull(valueStr)) {break;}
						if(strs[j].substring(0,10).equals(sdf.format(date))){
							int count=Integer.parseInt(valueStr);//可购买条数
							//logWriteUtil.writeLog("", "+++keyCount"+keyCount+"====count:"+count, LOGLEVEL_INFO, OrderService.class);
							if(count<=0){//如果可买条数为0 则当天该广告不能下单
								if(i!=-1){
									orderEntity.setOld_total_price(orderEntity.getOld_total_price().subtract(orderEntity.getPrice()));//减去不能购买天数的价格
								}/*else{
									orderEntity.setPlay_begin_time(dto.getStartDate());
								}*/
								bl=false;
								break;
							}else{
								map.put(keyCount, (count-1)+"");
							}
						}
					}
				}
				if(bl){
					Tb_Order_Detail detailEntity=new Tb_Order_Detail();//生成订单详情
					detailEntity.setAccount_id(dto.getAccount_id());
					detailEntity.setBegin_time(dto.getIdle_time().split("-")[0].length()==5?dto.getIdle_time().split("-")[0]+":00":dto.getIdle_time().split("-")[0]);
					detailEntity.setCommit_time(new Timestamp(System.currentTimeMillis()));
					detailEntity.setDevice_id(dto.getDevice_id());
					detailEntity.setEnd_time(dto.getIdle_time().split("-")[1].length()==5?dto.getIdle_time().split("-")[1]+":00":dto.getIdle_time().split("-")[1]);
					detailEntity.setPlay_date(date);
					detailEntity.setSerial_number(orderEntity.getSerial_number());
					if(i==-1){
						detailEntity.setPrice(new BigDecimal(0));//订单每天价格
					}else{
						detailEntity.setPrice(orderEntity.getPrice().multiply(new BigDecimal(disCount)));//订单每天价格
					}
					temOrderDetailList.add(detailEntity);//加入集合
				}
			}
			//new BigDecimal(.doubleValue()*time)
			//new BigDecimal(Math.round(setOrderPrice(dto,map.get("isInterCut")).doubleValue()*disCount))
			//logWriteUtil.writeLog("", "+++temOrderDetailListSize:"+temOrderDetailList.size()+"====", LOGLEVEL_INFO, OrderService.class);
			//orderEntity.setTotal_price(orderEntity.getOld_total_price().multiply(new BigDecimal(disCount)).setScale(2,BigDecimal.ROUND_HALF_UP));
			//logWriteUtil.writeLog("", "+++order Total_price:"+orderEntity.getTotal_price()+"====", LOGLEVEL_INFO, OrderService.class);
			orderEntity.setTotal_day_number(orderEntity.getOld_total_price().divide(orderEntity.getPrice()).intValue());
			orderEntity.setPrice(new BigDecimal(Math.round(orderEntity.getPrice().doubleValue()*disCount)));
			orderEntity.setTotal_price(orderEntity.getPrice().multiply(new BigDecimal(orderEntity.getTotal_day_number())));
			if(temOrderDetailList.size()>0){
				if(temOrderDetailList.size()==1&&sdf.format(temOrderDetailList.get(0).getPlay_date()).equals(sdf.format(new Date()))){
					continue;//如果只有当天赠送的不产生订单
				}
				total=total.add(orderEntity.getOld_total_price());
				disTotal=disTotal.add(orderEntity.getTotal_price());
				orderList.add(orderEntity);//加入集合
				orderDetailList.addAll(temOrderDetailList);
			}else{
				if(RegUtil.getUtil().isNull(shoppIds)){
					if(orderList.size()==0){
						//return RespCodeEnum.order_create_notTimeInterval.getCode();
					}
				}else{
					if(shoppIds.indexOf(dto.getShoppId())==0){
						if(shoppIds.indexOf(",")>0){
							shoppIds=shoppIds.replace(dto.getShoppId()+",", "");//第一位替换
						}else{
							shoppIds=shoppIds.replace(dto.getShoppId(), "0");//只剩一个替换规则
						}
					}else{
						shoppIds=shoppIds.replace(","+dto.getShoppId(), "");
					}
					//logWriteUtil.writeLog("", "replaceId:"+dto.getShoppId()+"===shoppIds:"+shoppIds, LOGLEVEL_INFO, OrderService.class);
				}
			}
		}
		
		//logWriteUtil.writeLog("", "++++++result:"+total+"-"+disTotal+"-"+orders.substring(0,orders.length()-1), LOGLEVEL_INFO, OrderService.class);
		
		//logWriteUtil.writeLog("", "===package data end !  time consuming:"+(System.currentTimeMillis()-bgTime)+"====orderListSize:"+orderList.size()+"---orderDetailListSize:"+orderDetailList.size(), LOGLEVEL_INFO, OrderService.class);
		
		batchCreateOrderAndOrderDetail(orderList,orderDetailList);//生成订单和订单详情
		//logWriteUtil.writeLog("", "===insert order and orderDetail end !  time consuming:"+(System.currentTimeMillis()-bgTime), LOGLEVEL_INFO, OrderService.class);
		final List<Tb_Order_Detail> threadCountList=orderDetailList;
		final String isInterCut=map.get("isInterCut");
		Thread t=new Thread(new Runnable() {
			@Override
			public void run() {
				Long bgTime1=System.currentTimeMillis();
				try {
					updateOrInsertVideoCount(threadCountList,isInterCut);
				} catch (Exception e) {
					e.printStackTrace();
				}//插入或更新设备视频播放数量
				//logWriteUtil.writeLog("", "===update video count end !   longTime:"+(System.currentTimeMillis()-bgTime1), LOGLEVEL_INFO, OrderService.class);
				
			}
		});
		t.start();
		if(shoppIds!=null){
			shoppCartService.deleteByAccountId(list.get(0).getAccount_id(), shoppIds);
		}
		return RespCodeEnum.SUCCESS.getCode()+"-"+total+"-"+disTotal+"-"+orders.substring(0,orders.length()-1)+"-"+fileType.substring(0,fileType.length()-1);
	}
	
	
	//生成订单和订单详情
	public int batchCreateOrderAndOrderDetail(List<Tb_Order> orderList,List<Tb_Order_Detail> orderDetailList) throws Exception{
   		 Long bgTime=System.currentTimeMillis();
   		 List<Object[]> batch = new ArrayList<Object[]>();
   		 for (Tb_Order order : orderList) {
   			 Object[] values = new Object[] {//封装订单数据
   				 order.getSerial_number(),
   				 order.getDevice_id(),
   				 order.getOrder_status(),
   				 order.getVedio_id(),
   				 order.getAccount_id(),
   				 order.getAccount_ip(),
   				 order.getCommit_time(),
   				 order.getPay_type(),
   				 order.getPlay_begin_time(),
   				 order.getPlay_end_time(),
   				 order.getShop_name(),
   				 order.getTotal_price(),
   				 order.getPrice(),
   				 order.getResult(),
   				 order.getAdvertiser_id(),
   				 order.getOld_total_price(),
   				 order.getTotal_day_number(),
   				 order.getORDER_TYPE(),
   				 order.getFile_type(),
   				 order.getIf_sub(),
   				 order.getUnified_serial_number(),
   				 order.getUpload_file_num()
   			 };
   			 batch.add(values);
   		 }
   		 int[] orderCount = advertiseOrderDao.batchInsertOrder(batch);//批量生成订单
   		 logWriteUtil.writeLog("", "insert order end!    time consuming:"+(System.currentTimeMillis()-bgTime)+"====orderCount:"+orderCount.length, LOGLEVEL_INFO, OrderService.class);
   		 batch.clear();
   		 for (Tb_Order_Detail orderDetail : orderDetailList) {
   			 Object[] values = new Object[] {//封装订单详情数据
				orderDetail.getSerial_number(),
				orderDetail.getDevice_id(),
				orderDetail.getBegin_time(),
				orderDetail.getEnd_time(),
				orderDetail.getCommit_time(),
				orderDetail.getPlay_date(),
				orderDetail.getAccount_id(),
				orderDetail.getPrice()
   			 };
   			 batch.add(values);
   		 }
   		 int[] detailCount = advertiseOrderDetailDao.batchInsertOrderDetail(batch);//批量生成订单详情
   		 logWriteUtil.writeLog("", "insert orderDetail end!    time consuming:"+(System.currentTimeMillis()-bgTime)+"====detailCount:"+detailCount.length, LOGLEVEL_INFO, OrderService.class);
   		return orderCount.length+detailCount.length;
	}
	
	//修改和插入设备视频播放统计
	public int updateOrInsertVideoCount(List<Tb_Order_Detail> orderDetailList,String isInterCut) throws Exception{ 
		List<Object[]> insertBatch = new ArrayList<Object[]>();
		List<Object[]> updateBatch = new ArrayList<Object[]>();
		for (Tb_Order_Detail orderDetail : orderDetailList) {
  			 Object[] values = new Object[] {//封装订单详情数据
				orderDetail.getDevice_id(),
				orderDetail.getBegin_time(),
				orderDetail.getEnd_time(),
				orderDetail.getPlay_date()
  			 };
  			 DeviceVedioCountDto dto = deviceVedioCountDao.findByAll(values);
  			 //DeviceVedioCountDto dto =null;
  			 if(dto==null){
  				 boolean bl=true;
  				Object[] insertValues = new Object[] {//封装插入数据
  					orderDetail.getDevice_id(),
  					orderDetail.getBegin_time(),
					orderDetail.getEnd_time(),
  					isInterCut!=null&&!"".equals(isInterCut)?0:1,
  					orderDetail.getPlay_date(),
  					isInterCut!=null&&!"".equals(isInterCut)?1:0
  	  			 };
  				for (Object[] objs : insertBatch) {//判断是否相同广告
					if(objs[0].equals(orderDetail.getDevice_id())&&objs[1].equals(orderDetail.getBegin_time())&&objs[2].equals(orderDetail.getEnd_time())&&objs[4].equals(orderDetail.getPlay_date())){
						objs[3]=Integer.parseInt(objs[3].toString())+1;
						bl=false;//如果包含则不加入集合
					}
				}
  				if(bl){
  					insertBatch.add(insertValues);
  				}
  			 }else{
  				Object[] updateValues = new Object[] {//封装更新数据
					dto.getId()
  	  			 };
  				updateBatch.add(updateValues);
  			 }
  		 }
		int[] insertCount = deviceVedioCountDao.batchInsertCount(insertBatch);//批量插入
		int[] updateCount = deviceVedioCountDao.batchUpdateCount(updateBatch,isInterCut);//批量修改
		logWriteUtil.writeLog("", "====insertBatch:"+insertBatch.size()+"--updateBatch:"+updateBatch.size()+"--insertCount:"+insertCount.length+"--updateCount:"+updateCount.length, LOGLEVEL_INFO, OrderService.class);
		return insertCount.length+updateCount.length;
	}
	
	public List<Tb_Order> findOrderByOrderNo(String orderNo){
		return advertiseOrderDao.queryOrderByOrderNo(orderNo);
	}
	
	public static void main(String[] args) {
		String str="123sdfsdfsdfd";
		System.out.println(str.substring(0, 5));
		/*SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
		try {
			String format = sdf.format(new Date(sdf.parse("2017-10-30").getTime()+(3600 * 24 * 1000 * 26L)));
			System.out.println(format+"====");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Calendar instance = Calendar.getInstance();
		System.out.println(instance.get(Calendar.DAY_OF_YEAR));
		String format = sdf.format(instance.getTime());
		instance.add(Calendar.DAY_OF_YEAR, 365);
		System.out.println(format);
		String format1 = sdf.format(instance.getTime());
		System.out.println(format1+"=="+format);*/
		Map<String, String> map=new HashMap<>();
		System.out.println(map.get("11"));
	}

	public List<OrderDetailDto> queryEffectualTimeByOrderNo(String orderNo,String account_id, String beginTime,
			String endTime) throws Exception{
		return advertiseOrderDetailDao.queryEffectualTimeByOrderNo(orderNo,account_id,beginTime,endTime);
	}
 
	
	public Tb_Order queryOrderBySerialNum(String orderId)throws Exception{
		 Tb_Order order=null;
		 try {
			 order=advertiseOrderDao.queryOrderBySerialNum(orderId);
		 } catch (Exception e) {
				order=null;
				throw e;
		 }
		return order;
	}
 
	public List<Tb_Order> queryOrderListBySerialNum(String orderId)throws Exception{
		return advertiseOrderDao.queryOrderListBySerialNum(orderId);
	}
	
	public void updateOrderType(String orderNo) throws Exception{
		advertiseOrderDao.updateOrderType(orderNo);
		advertiseVideoDao.updateVideoType(orderNo);
		OrderDetailDto dto = advertiseOrderDetailDao.queryOrderDetailBySerialNum(orderNo);
		deviceVedioCountDao.updateOrderType(dto);
	}
	
	public List<AdvertiseInfoDto> orderByUnifiedSerialNumber(List<AdvertiseInfoDto> list,int forCount){
		List<AdvertiseInfoDto> list1=new ArrayList<>();
		for (int j = 0; j < forCount; j++) {
			for (int i = 0; i < list.size(); i++) {
				if(((j<10?"0":"")+j).equals(list.get(i).getUnified_serial_number())){
					list1.add(list.get(i));
				}
			}
		}
		return list1;
	}
	public void deleteOrderByOrderNo(String orderNo,String accountId){
		advertiseOrderDao.deleteOrderByOrderNo(orderNo,accountId);
	}
}
