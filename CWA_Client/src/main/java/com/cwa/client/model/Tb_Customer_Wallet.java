package com.cwa.client.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Tb_Customer_Wallet {
	private Integer id;
	private BigDecimal AMOUNT; 
	private String CUSTOMER_ID; 
	private Integer STATE;
	public Integer getID() {
		return id;
	}
	public void setID(Integer iD) {
		id = iD;
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
	public Integer getSTATE() {
		return STATE;
	}
	public void setSTATE(Integer sTATE) {
		STATE = sTATE;
	}
	@Override
	public String toString() {
		return "Tb_Customer_Wallet [ID=" + id + ", AMOUNT=" + AMOUNT + ", CUSTOMER_ID=" + CUSTOMER_ID + ", STATE="
				+ STATE + "]";
	} 

	

}
