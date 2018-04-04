package com.cwa.client.dto;

import java.math.BigDecimal;

public class CustomerWalletFlow extends BaseDto{
	private Integer ID;
	private BigDecimal AMOUNT; 
	private String CUSTOMER_ID; 
	private String OPEN_DATE;
	private Integer FLOW_TYPE;
	private String serial_number;
	
	private String beginDate;
	private String endDate;
	
	private String cardCode;
	private String mobile;
	private String tranNo;
	private String smsCode;
	
	
	public String getSmsCode() {
		return smsCode;
	}
	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}
	public String getCardCode() {
		return cardCode;
	}
	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getTranNo() {
		return tranNo;
	}
	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}
	public String getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getSerial_number() {
		return serial_number;
	}
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	
	private String pay_type;
	
	private Integer userId; 
	
	public Integer getUserId() {
		return userId;
	}
	
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getPay_type() {
		return pay_type;
	}
	public void setPay_type(String pay_type) {
		this.pay_type = pay_type;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public BigDecimal getAMOUNT() {
		return AMOUNT;
	}
	public void setAMOUNT(BigDecimal aMOUNT) {
		AMOUNT = aMOUNT;
	}
	public String getCUSTOMER_ID() {
		return CUSTOMER_ID;
	}
	public void setCUSTOMER_ID(String cUSTOMER_ID) {
		CUSTOMER_ID = cUSTOMER_ID;
	}
	public String getOPEN_DATE() {
		return OPEN_DATE;
	}
	public void setOPEN_DATE(String oPEN_DATE) {
		OPEN_DATE = oPEN_DATE;
	}
	public Integer getFLOW_TYPE() {
		return FLOW_TYPE;
	}
	public void setFLOW_TYPE(Integer fLOW_TYPE) {
		FLOW_TYPE = fLOW_TYPE;
	}
	@Override
	public String toString() {
		return "Tb_Customer_Wallet_Flow [ID=" + ID + ", AMOUNT=" + AMOUNT + ", CUSTOMER_ID=" + CUSTOMER_ID
				+ ", OPEN_DATE=" + OPEN_DATE + ", FLOW_TYPE=" + FLOW_TYPE + "]";
	}
	
	

}
