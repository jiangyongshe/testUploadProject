package com.cwa.client.web;

import java.util.List;

/**
 * 全局list返回
 * @author javateam
 *
 * @param <E>
 */
public class GoblaRespList<E> {

	 private String respCode;
	
	 private List<E> data;
	
	 private String userName;// 备用

	public String getRespCode() {
		return respCode;
	}

	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	public List<E> getData() {
		return data;
	}

	public void setData(List<E> data) {
		this.data = data;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
 


}
