package com.cwa.client.dto;

import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateUtils;

public class UnPayOpenAndConsumeDto {

	private String orderId;//
	private String txnAmt;//
	private String txnTime;//YYYYMMDDhhmmss	商户发送交易时间
	private String accNo;//银行卡号
	private String accType;//卡类型
	private String backUrl;//后台通知地址
	private String frontUrl;//如果开通失败的“返回商户”按钮也是触发frontUrl地址，点击时是按照get方法返回的，没有通知数据返回商户
	private String phoneNo;//短信接收电话
	private String smsCode;//短信验证码
	private String isFirst;//是否首次支付，true=是，false=不是

	private String orderDesc;//订单描述，可以为空
	
	public  UnPayOpenAndConsumeDto(Tb_Bank_Card_Info cardIfo,int isFirst,String smsCode,String frontUrl)throws Exception{
		this.txnTime=DateUtils.getNowDay(DateUtils.DATE_FORMAT_YYYYMMDDHHMMSS);
		this.accNo=cardIfo.getBank_card_code();
		this.phoneNo=cardIfo.getMobile();
		this.smsCode=smsCode;
		 if(Constant.ONE==isFirst){//如果是第一次
			  this.frontUrl=frontUrl;
			  this.setIsFirst("true");
		 }else{
			 this.setIsFirst("false");
		 }
	}
	
	public String getTxnTime() {
		return txnTime;
	}
	public void setTxnTime(String txnTime) {
		this.txnTime = txnTime;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getBackUrl() {
		return backUrl;
	}
	public void setBackUrl(String backUrl) {
		this.backUrl = backUrl;
	}
	public String getFrontUrl() {
		return frontUrl;
	}
	public void setFrontUrl(String frontUrl) {
		this.frontUrl = frontUrl;
	}
	
	public String getAccType() {
		return accType;
	}
	public void setAccType(String accType) {
		this.accType = accType;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getTxnAmt() {
		return txnAmt;
	}
	public void setTxnAmt(String txnAmt) {
		this.txnAmt = txnAmt;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getIsFirst() {
		return isFirst;
	}
	public void setIsFirst(String isFirst) {
		this.isFirst = isFirst;
	}
	public String getOrderDesc() {
		return orderDesc;
	}
	public void setOrderDesc(String orderDesc) {
		this.orderDesc = orderDesc;
	}
	public String getSmsCode() {
		return smsCode;
	}
	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}
	
	
}
