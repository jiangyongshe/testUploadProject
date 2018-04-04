package com.cwa.client.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class ADCommissionDetailDto extends BaseDto{

	private Integer advertiser_id;// 广告商ID
	private String account_id; //用户id
	private BigDecimal advertiser_comm;// 广告商佣金
	private String type;// 佣金类型 ad-广告 ref-推荐
	private Timestamp balance_datetime; // 结算时间
	private String startTime;// 开始时间
	private String endTime;// 结束时间
	private Integer userType; //用户类型
	
	
	
	public Integer getUserType() {
		return userType;
	}
	public void setUserType(Integer userType) {
		this.userType = userType;
	}
	public String getAccount_id() {
		return account_id;
	}
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	public Integer getAdvertiser_id() {
		return advertiser_id;
	}
	public void setAdvertiser_id(Integer advertiser_id) {
		this.advertiser_id = advertiser_id;
	}
	public BigDecimal getAdvertiser_comm() {
		return advertiser_comm;
	}
	public void setAdvertiser_comm(BigDecimal advertiser_comm) {
		this.advertiser_comm = advertiser_comm;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Timestamp getBalance_datetime() {
		return balance_datetime;
	}
	public void setBalance_datetime(Timestamp balance_datetime) {
		this.balance_datetime = balance_datetime;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
}
