package com.cwa.client.dto;

import java.io.Serializable;
import java.sql.Timestamp;

public class CustomerDto extends BaseDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5101527670692289619L;
	
	private Integer id;
	private String user_name;
	private String mobile;
	private Integer user_status;// 状态(1=停用、2=启用)
	private Timestamp open_date;
	private String openid;
	private String email;
	private String referrals_id;
	private String password;
	private String account_id;
	private Integer certificate_type;
	private String id_number;
	private String agent_id;
	private String company_id;
	private Integer referrals_type;//1.直客 、2.客户推荐、3.代理推荐、4.业务员推荐、5.广告商推荐
	private Integer shoppCount;
	private String loginType;
	private Integer t_type;//免单用户
	private Integer superior;// 所属上级（1：运营中心 2：代理）
	
	private String fullMb;
	private String partner_id;
	private String salesman_id;
	private String salesperson_id;
	
	
	private String login_id;//登录编号
	private boolean havaWPWD;//是否有提现密码
	private String w_pwd;//提现密码
	private String union_id;//第三方登录联合id
	private Integer noticeId;//noticeId
	
	
	
	public Integer getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}
	public String getUnion_id() {
		return union_id;
	}
	public void setUnion_id(String union_id) {
		this.union_id = union_id;
	}
	public String getW_pwd() {
		return w_pwd;
	}
	public void setW_pwd(String w_pwd) {
		this.w_pwd = w_pwd;
	}
	public boolean getHavaWPWD() {
		return havaWPWD;
	}
	public void setHavaWPWD(boolean havaWPWD) {
		this.havaWPWD = havaWPWD;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public Integer getSuperior() {
		return superior;
	}
	public void setSuperior(Integer superior) {
		this.superior = superior;
	}
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Integer getT_type() {
		return t_type;
	}
	public void setT_type(Integer t_type) {
		this.t_type = t_type;
	}
	public String getLoginType() {
		return loginType;
	}
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}
	public String getFullMb() {
		return fullMb;
	}
	public void setFullMb(String fullMb) {
		this.fullMb = fullMb;
	}
	public Integer getShoppCount() {
		return shoppCount;
	}
	public void setShoppCount(Integer shoppCount) {
		this.shoppCount = shoppCount;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
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
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getReferrals_id() {
		return referrals_id;
	}
	public void setReferrals_id(String referrals_id) {
		this.referrals_id = referrals_id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAccount_id() {
		return account_id;
	}
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	public Integer getCertificate_type() {
		return certificate_type;
	}
	public void setCertificate_type(Integer certificate_type) {
		this.certificate_type = certificate_type;
	}
	public String getId_number() {
		return id_number;
	}
	public void setId_number(String id_number) {
		this.id_number = id_number;
	}
	public String getAgent_id() {
		return agent_id;
	}
	public void setAgent_id(String agent_id) {
		this.agent_id = agent_id;
	}
	public Integer getReferrals_type() {
		return referrals_type;
	}
	public void setReferrals_type(Integer referrals_type) {
		this.referrals_type = referrals_type;
	}
	
	
}
