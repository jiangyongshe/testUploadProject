package com.cwa.client.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Tb_Customer_Wallet_Flow {
	private Integer ID;
	private BigDecimal AMOUNT; 
	private String CUSTOMER_ID; 
	private Timestamp OPEN_DATE;
	private Integer FLOW_TYPE;
	private String serial_number;
	
	
	
	public String getSerial_number() {
		return serial_number;
	}
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
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
	public Timestamp getOPEN_DATE() {
		return OPEN_DATE;
	}
	public void setOPEN_DATE(Timestamp oPEN_DATE) {
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
