package com.cwa.client.dto;

import java.math.BigDecimal;

public class CustomerCommissionDto extends BaseDto{

	private Integer id;
	private String customer_id;// 对应tb_customer里的ACCOUNT_ID字段
	private BigDecimal total_comm;// 总佣金
	private BigDecimal available_comm;// 可出佣金
	private String settlement_date;// 结算日
	private BigDecimal ad_comm; //广告佣金
	private BigDecimal m_comm; //推荐或屏主佣金.
	
	
	
	public BigDecimal getAd_comm() {
		return ad_comm;
	}
	public void setAd_comm(BigDecimal ad_comm) {
		this.ad_comm = ad_comm;
	}
	public BigDecimal getM_comm() {
		return m_comm;
	}
	public void setM_comm(BigDecimal m_comm) {
		this.m_comm = m_comm;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}
	public BigDecimal getTotal_comm() {
		return total_comm;
	}
	public void setTotal_comm(BigDecimal total_comm) {
		this.total_comm = total_comm;
	}
	public BigDecimal getAvailable_comm() {
		return available_comm;
	}
	public void setAvailable_comm(BigDecimal available_comm) {
		this.available_comm = available_comm;
	}
	public String getSettlement_date() {
		return settlement_date;
	}
	public void setSettlement_date(String settlement_date) {
		this.settlement_date = settlement_date;
	}
}
