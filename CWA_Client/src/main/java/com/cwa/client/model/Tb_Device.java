package com.cwa.client.model;

import java.sql.Timestamp;

public class Tb_Device {

	private Integer id;
	private String device_id;
	private Integer devic_type;
	private Integer is_marketable;
	private String commit_id;
	private Timestamp commit_time;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDevice_id() {
		return device_id;
	}
	public void setDevice_id(String device_id) {
		this.device_id = device_id;
	}
	public Integer getDevic_type() {
		return devic_type;
	}
	public void setDevic_type(Integer devic_type) {
		this.devic_type = devic_type;
	}
	public Integer getIs_marketable() {
		return is_marketable;
	}
	public void setIs_marketable(Integer is_marketable) {
		this.is_marketable = is_marketable;
	}
	public String getCommit_id() {
		return commit_id;
	}
	public void setCommit_id(String commit_id) {
		this.commit_id = commit_id;
	}
	public Timestamp getCommit_time() {
		return commit_time;
	}
	public void setCommit_time(Timestamp commit_time) {
		this.commit_time = commit_time;
	}
	
	
}
