package com.cwa.client.dto;

import java.sql.Timestamp;

public class BankCardInfoDto {
	private Integer id;
	private String account_id;
	private Integer account_type;
	private Integer papers_type;
	private String papers_code;
	private String bank_card_code;
	private String bank_card_name;
	private String open_account_bank_name;
	private String bank_code;
	private String mobile;
	private Integer status;
	private String ip;
	private Integer card_type;
	private String commit_account_id;
	private Timestamp commit_datetime;
	private String audit_id;
	private Timestamp audit_datetime;
	private String branch_name;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAccount_id() {
		return account_id;
	}
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	public Integer getAccount_type() {
		return account_type;
	}
	public void setAccount_type(Integer account_type) {
		this.account_type = account_type;
	}
	public Integer getPapers_type() {
		return papers_type;
	}
	public void setPapers_type(Integer papers_type) {
		this.papers_type = papers_type;
	}
	public String getPapers_code() {
		return papers_code;
	}
	public void setPapers_code(String papers_code) {
		this.papers_code = papers_code;
	}
	public String getBank_card_code() {
		return bank_card_code;
	}
	public void setBank_card_code(String bank_card_code) {
		this.bank_card_code = bank_card_code;
	}
	public String getBank_card_name() {
		return bank_card_name;
	}
	public void setBank_card_name(String bank_card_name) {
		this.bank_card_name = bank_card_name;
	}
	public String getOpen_account_bank_name() {
		return open_account_bank_name;
	}
	public void setOpen_account_bank_name(String open_account_bank_name) {
		this.open_account_bank_name = open_account_bank_name;
	}
	public String getBank_code() {
		return bank_code;
	}
	public void setBank_code(String bank_code) {
		this.bank_code = bank_code;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Integer getCard_type() {
		return card_type;
	}
	public void setCard_type(Integer card_type) {
		this.card_type = card_type;
	}
	public String getCommit_account_id() {
		return commit_account_id;
	}
	public void setCommit_account_id(String commit_account_id) {
		this.commit_account_id = commit_account_id;
	}
	public Timestamp getCommit_datetime() {
		return commit_datetime;
	}
	public void setCommit_datetime(Timestamp commit_datetime) {
		this.commit_datetime = commit_datetime;
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
	public String getBranch_name() {
		return branch_name;
	}
	public void setBranch_name(String branch_name) {
		this.branch_name = branch_name;
	}
}
