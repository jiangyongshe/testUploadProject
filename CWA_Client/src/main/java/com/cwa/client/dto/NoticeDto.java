package com.cwa.client.dto;

import java.sql.Timestamp;


public class NoticeDto{

	private Integer id;
	private String notice_title;
	private Timestamp commit_time;
	private String commit_id;
	private Integer state;
	private Timestamp audit_time;
	private String audit_id;
	private Integer user_type;
	private Timestamp send_date;
	private Timestamp failure_date;
	private String notice_content;
	private Timestamp send_date_start;
	
	
	public Timestamp getSend_date_start() {
		return send_date_start;
	}
	public void setSend_date_start(Timestamp send_date_start) {
		this.send_date_start = send_date_start;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public Timestamp getCommit_time() {
		return commit_time;
	}
	public void setCommit_time(Timestamp commit_time) {
		this.commit_time = commit_time;
	}
	public String getCommit_id() {
		return commit_id;
	}
	public void setCommit_id(String commit_id) {
		this.commit_id = commit_id;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public Timestamp getAudit_time() {
		return audit_time;
	}
	public void setAudit_time(Timestamp audit_time) {
		this.audit_time = audit_time;
	}
	public String getAudit_id() {
		return audit_id;
	}
	public void setAudit_id(String audit_id) {
		this.audit_id = audit_id;
	}
	public Integer getUser_type() {
		return user_type;
	}
	public void setUser_type(Integer user_type) {
		this.user_type = user_type;
	}
	public Timestamp getSend_date() {
		return send_date;
	}
	public void setSend_date(Timestamp send_date) {
		this.send_date = send_date;
	}
	public Timestamp getFailure_date() {
		return failure_date;
	}
	public void setFailure_date(Timestamp failure_date) {
		this.failure_date = failure_date;
	}
	public String getNotice_content() {
		return notice_content;
	}
	public void setNotice_content(String notice_content) {
		this.notice_content = notice_content;
	}


}
