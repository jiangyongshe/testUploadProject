package com.cwa.client.dto;

import com.cwa.client.web.GobalRespParameter;

public class SendEmailDto extends GobalRespParameter{
	private String userName;
	private String emailName;
	private String title;
	private String content;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmailName() {
		return emailName;
	}
	public void setEmailName(String emailName) {
		this.emailName = emailName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
}
