package com.cwa.client.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class AdvertiserDto extends BaseDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5101527670692589618L;
	private Integer id;
	private String shop_name;
	private String mobile;
	private String scope;
	private String mailing_address;
	private Integer user_status;
	private Timestamp open_date;
	private String email;
	private String real_name;
	private String account_id;
	private String agent_id;
	private String audit_id;
	private Timestamp audit_datetime;
	private Integer audit_status;
	private String remark;
	private String company_id;
	private String password;
	private String referrals_id;
	private Integer referrals_type;// 1.直客 、2.代理推荐、3.业务员推荐
	private Integer device_use_type;//0:未定 1：购买设备 2：设备租用3：设备直营
	private Integer superior;// 所属上级（1：运营中心 2：代理）
	private Integer notice_id;// 消息ID
	private Integer reg_status;// 注册状态(1=已注册没有店铺信息、2=有店铺信息)
	private Integer shoppCount;
	private String partner_id;
	private String salesman_id;
	private String salesperson_id;
	private BigDecimal comm_rate;
	
	
	
	public String getPartner_id() {
		return partner_id;
	}
	public void setPartner_id(String partner_id) {
		this.partner_id = partner_id;
	}
	public String getSalesman_id() {
		return salesman_id;
	}
	public void setSalesman_id(String salesman_id) {
		this.salesman_id = salesman_id;
	}
	public String getSalesperson_id() {
		return salesperson_id;
	}
	public void setSalesperson_id(String salesperson_id) {
		this.salesperson_id = salesperson_id;
	}
	public BigDecimal getComm_rate() {
		return comm_rate;
	}
	public void setComm_rate(BigDecimal comm_rate) {
		this.comm_rate = comm_rate;
	}
	
	public Integer getShoppCount() {
		return shoppCount;
	}
	public void setShoppCount(Integer shoppCount) {
		this.shoppCount = shoppCount;
	}
	
	public String getReferrals_id() {
		return referrals_id;
	}

	public void setReferrals_id(String referrals_id) {
		this.referrals_id = referrals_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getShop_name() {
		return shop_name;
	}

	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getMailing_address() {
		return mailing_address;
	}

	public void setMailing_address(String mailing_address) {
		this.mailing_address = mailing_address;
	}

	public Integer getUser_status() {
		return user_status;
	}

	public void setUser_status(Integer user_status) {
		this.user_status = user_status;
	}

	public Timestamp getOpen_date() {
		return open_date;
	}

	public void setOpen_date(Timestamp open_date) {
		this.open_date = open_date;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getReal_name() {
		return real_name;
	}

	public void setReal_name(String real_name) {
		this.real_name = real_name;
	}

	public String getAccount_id() {
		return account_id;
	}

	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}

	public String getAgent_id() {
		return agent_id;
	}

	public void setAgent_id(String agent_id) {
		this.agent_id = agent_id;
	}

	public String getAudit_id() {
		return audit_id;
	}

	public void setAudit_id(String audit_id) {
		this.audit_id = audit_id;
	}

	public Timestamp getAudit_datetime() {
		return audit_datetime;
	}

	public void setAudit_datetime(Timestamp audit_datetime) {
		this.audit_datetime = audit_datetime;
	}

	public Integer getAudit_status() {
		return audit_status;
	}

	public void setAudit_status(Integer audit_status) {
		this.audit_status = audit_status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCompany_id() {
		return company_id;
	}

	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getReferrals_type() {
		return referrals_type;
	}

	public void setReferrals_type(Integer referrals_type) {
		this.referrals_type = referrals_type;
	}

	public Integer getDevice_use_type() {
		return device_use_type;
	}

	public void setDevice_use_type(Integer device_use_type) {
		this.device_use_type = device_use_type;
	}

	public Integer getSuperior() {
		return superior;
	}

	public void setSuperior(Integer superior) {
		this.superior = superior;
	}

	public Integer getNotice_id() {
		return notice_id;
	}

	public void setNotice_id(Integer notice_id) {
		this.notice_id = notice_id;
	}

	public Integer getReg_status() {
		return reg_status;
	}

	public void setReg_status(Integer reg_status) {
		this.reg_status = reg_status;
	}

}
