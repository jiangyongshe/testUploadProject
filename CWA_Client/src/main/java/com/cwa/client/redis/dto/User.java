package com.cwa.client.redis.dto;

import java.io.Serializable;
import java.sql.Timestamp;

public class User implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8231662156616565562L;

	 
	private String username;
	 
	
	private String openId;
	
	
	private String sessionId;
	
	private String accountId;
	 
	
	private int loginType; //登录类型，0=pc，1=安卓客户端，2=微信客户端


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getOpenId() {
		return openId;
	}


	public void setOpenId(String openId) {
		this.openId = openId;
	}


	public String getSessionId() {
		return sessionId;
	}


	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}


	public int getLoginType() {
		return loginType;
	}


	public void setLoginType(int loginType) {
		this.loginType = loginType;
	}


	public String getAccountId() {
		return accountId;
	}


	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	
 

	 
}
