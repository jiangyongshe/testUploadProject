package com.cwa.client.dto;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class VideoDto {
	private Integer id;
	private String name;
	private String file_name;
	private String file_path;
	private String play_path;
	private String introduction;
	private String commit_id;
	private Timestamp commit_time;
	private String audit_id;
	private Integer vedio_type;
	private String serial_number;
	private Timestamp audit_datetime;
	private Integer audit_status;
	private String old_file_name;
	private String file_type;
	private Integer order_type;
	private Integer if_sub;
	private String unified_serial_number;
	
	private Integer upFileNum;//订单可上传文件数量
	private String device_id;
	
	
	
	
	
	public String getDevice_id() {
		return device_id;
	}
	public void setDevice_id(String device_id) {
		this.device_id = device_id;
	}
	public Integer getUpFileNum() {
		return upFileNum;
	}
	public void setUpFileNum(Integer upFileNum) {
		this.upFileNum = upFileNum;
	}
	
	public String getUnified_serial_number() {
		return unified_serial_number;
	}
	public void setUnified_serial_number(String unified_serial_number) {
		this.unified_serial_number = unified_serial_number;
	}
	
	private List<String> imgList=new ArrayList<String>();
	
	
	
	public Integer getIf_sub() {
		return if_sub;
	}
	public void setIf_sub(Integer if_sub) {
		this.if_sub = if_sub;
	}
	public List<String> getImgList() {
		return imgList;
	}
	public void setImgList(List<String> imgList) {
		this.imgList = imgList;
	}
	public Integer getOrder_type() {
		return order_type;
	}
	public void setOrder_type(Integer order_type) {
		this.order_type = order_type;
	}
	
	//上传图片
	private String title;
	private String context;
	private String img;
	private String imgUrl;
	private String model;
	
	
	
	
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContext() {
		return context;
	}
	public void setContext(String context) {
		this.context = context;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public Integer getAudit_status() {
		return audit_status;
	}
	public void setAudit_status(Integer audit_status) {
		this.audit_status = audit_status;
	}
	public String getOld_file_name() {
		return old_file_name;
	}
	public void setOld_file_name(String old_file_name) {
		this.old_file_name = old_file_name;
	}
	
	
	public Timestamp getAudit_datetime() {
		return audit_datetime;
	}
	public void setAudit_datetime(Timestamp audit_datetime) {
		this.audit_datetime = audit_datetime;
	}
	public String getAudit_id() {
		return audit_id;
	}
	public void setAudit_id(String audit_id) {
		this.audit_id = audit_id;
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

}
