package com.cwa.client.dto;

import java.sql.Timestamp;

public class BuyInformationDto extends BaseDto{

	private Integer id;
	private String company_name;// 公司名称
	private String budget;// 预算
	private String contacts;// 联系人
	private String contact_information;// 联系方式
	private String information_desc;// 需求简述
	private Timestamp open_date;// 交易时间

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getBudget() {
		return budget;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getContact_information() {
		return contact_information;
	}

	public void setContact_information(String contact_information) {
		this.contact_information = contact_information;
	}

	public String getInformation_desc() {
		return information_desc;
	}

	public void setInformation_desc(String information_desc) {
		this.information_desc = information_desc;
	}

	public Timestamp getOpen_date() {
		return open_date;
	}

	public void setOpen_date(Timestamp open_date) {
		this.open_date = open_date;
	}

}
