package com.cwa.client.model;

import java.math.BigDecimal;

public class Tb_advertiser_comm_report {
	
	private Integer id;
	private String advertiser_id;// 广告商编号
	private BigDecimal today_comm;// 当日可出佣金
	private String settlement_date;// 结算日
	private BigDecimal today_available_comm;// 当日可出佣金
	private String shop_name;// 店铺名称
	private BigDecimal yesterday_comm;// 上日佣金余额
	private BigDecimal yesterday_available_comm;// 上日可出佣金
	private BigDecimal yesterday_comm_income;// 上日佣金收入
	private BigDecimal yesterday_add_available_comm;// 上日新增可出佣金
	private BigDecimal withdraw;// 出金
	private BigDecimal feeding;// 补入
	private BigDecimal fill_out;// 补出
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAdvertiser_id() {
		return advertiser_id;
	}
	public void setAdvertiser_id(String advertiser_id) {
		this.advertiser_id = advertiser_id;
	}
	public BigDecimal getToday_comm() {
		return today_comm;
	}
	public void setToday_comm(BigDecimal today_comm) {
		this.today_comm = today_comm;
	}
	public String getSettlement_date() {
		return settlement_date;
	}
	public void setSettlement_date(String settlement_date) {
		this.settlement_date = settlement_date;
	}
	public BigDecimal getToday_available_comm() {
		return today_available_comm;
	}
	public void setToday_available_comm(BigDecimal today_available_comm) {
		this.today_available_comm = today_available_comm;
	}
	public String getShop_name() {
		return shop_name;
	}
	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}
	public BigDecimal getYesterday_comm() {
		return yesterday_comm;
	}
	public void setYesterday_comm(BigDecimal yesterday_comm) {
		this.yesterday_comm = yesterday_comm;
	}
	public BigDecimal getYesterday_available_comm() {
		return yesterday_available_comm;
	}
	public void setYesterday_available_comm(BigDecimal yesterday_available_comm) {
		this.yesterday_available_comm = yesterday_available_comm;
	}
	public BigDecimal getYesterday_comm_income() {
		return yesterday_comm_income;
	}
	public void setYesterday_comm_income(BigDecimal yesterday_comm_income) {
		this.yesterday_comm_income = yesterday_comm_income;
	}
	public BigDecimal getYesterday_add_available_comm() {
		return yesterday_add_available_comm;
	}
	public void setYesterday_add_available_comm(BigDecimal yesterday_add_available_comm) {
		this.yesterday_add_available_comm = yesterday_add_available_comm;
	}
	public BigDecimal getWithdraw() {
		return withdraw;
	}
	public void setWithdraw(BigDecimal withdraw) {
		this.withdraw = withdraw;
	}
	public BigDecimal getFeeding() {
		return feeding;
	}
	public void setFeeding(BigDecimal feeding) {
		this.feeding = feeding;
	}
	public BigDecimal getFill_out() {
		return fill_out;
	}
	public void setFill_out(BigDecimal fill_out) {
		this.fill_out = fill_out;
	}
	
	
}
