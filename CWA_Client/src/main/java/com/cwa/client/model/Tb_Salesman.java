package com.cwa.client.model;


import java.sql.Timestamp;


public class Tb_Salesman{
	private Integer id ;	 //ID	
	private String salesman_id ;	 //业务员编号
	private String salesman_name ;	 //业务员名称
	private String salesman_pass_word ;	 //登陆密码
	private Integer certificate_type ;	 //证件类型(1=身份证、2=驾驶证、3=护照、4=其它)
	private String id_number ;	 //证件号码
	private Timestamp open_date ;	 //开户日期
	private String mobile ;	 //移动电话
	private String telephone ;	 //联系电话
	private String e_mail ;	 //电子邮箱地址
	private Integer commit_id ;	 //提交人
	private Timestamp commit_time ;	 //创建时间
	private String company_id ;	 //公司编号
	private Integer status ;	 //状态(1=停用、2=启用)
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSalesman_id() {
		return salesman_id;
	}
	public void setSalesman_id(String salesman_id) {
		this.salesman_id = salesman_id;
	}
	public String getSalesman_name() {
		return salesman_name;
	}
	public void setSalesman_name(String salesman_name) {
		this.salesman_name = salesman_name;
	}
	public String getSalesman_pass_word() {
		return salesman_pass_word;
	}
	public void setSalesman_pass_word(String salesman_pass_word) {
		this.salesman_pass_word = salesman_pass_word;
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
	public Timestamp getOpen_date() {
		return open_date;
	}
	public void setOpen_date(Timestamp open_date) {
		this.open_date = open_date;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getE_mail() {
		return e_mail;
	}
	public void setE_mail(String e_mail) {
		this.e_mail = e_mail;
	}
	public Integer getCommit_id() {
		return commit_id;
	}
	public void setCommit_id(Integer commit_id) {
		this.commit_id = commit_id;
	}
	public Timestamp getCommit_time() {
		return commit_time;
	}
	public void setCommit_time(Timestamp commit_time) {
		this.commit_time = commit_time;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Tb_Salesman [id=" + id + ", salesman_id=" + salesman_id + ", salesman_name=" + salesman_name
				+ ", salesman_pass_word=" + salesman_pass_word + ", certificate_type=" + certificate_type
				+ ", id_number=" + id_number + ", open_date=" + open_date + ", mobile=" + mobile + ", telephone="
				+ telephone + ", e_mail=" + e_mail + ", commit_id=" + commit_id + ", commit_time=" + commit_time
				+ ", company_id=" + company_id + ", status=" + status + "]";
	}
	
	
	
	
}