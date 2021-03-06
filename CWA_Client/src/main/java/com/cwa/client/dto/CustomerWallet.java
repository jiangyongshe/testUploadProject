package com.cwa.client.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class CustomerWallet {
	private Integer ID;
	private BigDecimal AMOUNT; 
	private String CUSTOMER_ID; 
	private Integer STATE;
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
	public Integer getSTATE() {
		return STATE;
	}
	public void setSTATE(Integer sTATE) {
		STATE = sTATE;
	}
	@Override
	public String toString() {
		return "Tb_Customer_Wallet [ID=" + ID + ", AMOUNT=" + AMOUNT + ", CUSTOMER_ID=" + CUSTOMER_ID + ", STATE="
				+ STATE + "]";
	} 

	

}
