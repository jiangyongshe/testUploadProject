package com.cwa.client.model;

import java.sql.Timestamp;

public class Tb_Vedio_Audit {
	private Integer id;
	private String name;
	private String file_name;
	private String file_path;
	private String play_path;
	private String introduction;
	private String commit_id;
	private Timestamp commit_time;
	private Integer vedio_type;
	private String serial_number;
	private String audit_id;
	private int audit_status;
	private Timestamp audit_datetime;
	private String old_file_name;
	private String file_type;
	private Integer order_type;
	private Integer if_sub;//是否分单
	private String unified_serial_number;
	
	
	
	public String getUnified_serial_number() {
		return unified_serial_number;
	}
	public void setUnified_serial_number(String unified_serial_number) {
		this.unified_serial_number = unified_serial_number;
	}
	public Integer getIf_sub() {
		return if_sub;
	}
	public void setIf_sub(Integer if_sub) {
		this.if_sub = if_sub;
	}
	public Integer getOrder_type() {
		return order_type;
	}
	public void setOrder_type(Integer order_type) {
		this.order_type = order_type;
	}
	
	
	
	
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public String getOld_file_name() {
		return old_file_name;
	}
	public void setOld_file_name(String old_file_name) {
		this.old_file_name = old_file_name;
	}
	public String getAudit_id() {
		return audit_id;
	}
	public void setAudit_id(String audit_id) {
		this.audit_id = audit_id;
	}
	public int getAudit_status() {
		return audit_status;
	}
	public void setAudit_status(int audit_status) {
		this.audit_status = audit_status;
	}
	public Timestamp getAudit_datetime() {
		return audit_datetime;
	}
	public void setAudit_datetime(Timestamp audit_datetime) {
		this.audit_datetime = audit_datetime;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getPlay_path() {
		return play_path;
	}
	public void setPlay_path(String play_path) {
		this.play_path = play_path;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
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
	public Integer getVedio_type() {
		return vedio_type;
	}
	public void setVedio_type(Integer vedio_type) {
		this.vedio_type = vedio_type;
	}
	public String getSerial_number() {
		return serial_number;
	}
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	@Override
	public String toString() {
		return "Tb_Vedio_Audit [id=" + id + ", name=" + name + ", file_name="
				+ file_name + ", file_path=" + file_path + ", play_path="
				+ play_path + ", introduction=" + introduction + ", commit_id="
				+ commit_id + ", commit_time=" + commit_time + ", vedio_type="
				+ vedio_type + ", serial_number=" + serial_number
				+ ", audit_id=" + audit_id + ", audit_status=" + audit_status
				+ ", audit_datetime=" + audit_datetime + "]";
	}

	
}
