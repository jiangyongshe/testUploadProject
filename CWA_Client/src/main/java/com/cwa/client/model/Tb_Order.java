package com.cwa.client.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Tb_Order {
	private Integer id;
	private String serial_number;
	private String device_id;
	private Integer order_status;//1 待支付 2 已支付 3 已上传视频 4 已审核 5：审核不通过 6：已取消 7： 已关闭
	private String account_id;
	private String account_ip;
	private Timestamp commit_time;
	private String pay_type;
	private String play_begin_time;
	private String play_end_time;
	private String shop_name;
	private BigDecimal total_price;
	private BigDecimal price;
	private String result;
	private Integer advertiser_id;
	private Integer vedio_id;
	private BigDecimal old_total_price;
	private Integer total_day_number;
	private Integer ORDER_TYPE;
	private String file_type;
	
	private Integer if_sub;
	private String unified_serial_number;
	
	private Integer upload_file_num;
	
	
	public Integer getUpload_file_num() {
		return upload_file_num;
	}
	public void setUpload_file_num(Integer upload_file_num) {
		this.upload_file_num = upload_file_num;
	}
	public Integer getIf_sub() {
		return if_sub;
	}
	public void setIf_sub(Integer if_sub) {
		this.if_sub = if_sub;
	}
	public String getUnified_serial_number() {
		return unified_serial_number;
	}
	public void setUnified_serial_number(String unified_serial_number) {
		this.unified_serial_number = unified_serial_number;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public Integer getORDER_TYPE() {
		return ORDER_TYPE;
	}
	public void setORDER_TYPE(Integer oRDER_TYPE) {
		ORDER_TYPE = oRDER_TYPE;
	}
	public Integer getTotal_day_number() {
		return total_day_number;
	}
	public void setTotal_day_number(Integer total_day_number) {
		this.total_day_number = total_day_number;
	}
	public BigDecimal getOld_total_price() {
		return old_total_price;
	}
	public void setOld_total_price(BigDecimal old_total_price) {
		this.old_total_price = old_total_price;
	}
	public Integer getVedio_id() {
		return vedio_id;
	}
	public void setVedio_id(Integer vedio_id) {
		this.vedio_id = vedio_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSerial_number() {
		return serial_number;
	}
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	public String getDevice_id() {
		return device_id;
	}
	public void setDevice_id(String device_id) {
		this.device_id = device_id;
	}
	public Integer getOrder_status() {
		return order_status;
	}
	public void setOrder_status(Integer order_status) {
		this.order_status = order_status;
	}
	public String getAccount_id() {
		return account_id;
	}
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	public String getAccount_ip() {
		return account_ip;
	}
	public void setAccount_ip(String account_ip) {
		this.account_ip = account_ip;
	}
	public Timestamp getCommit_time() {
		return commit_time;
	}
	public void setCommit_time(Timestamp commit_time) {
		this.commit_time = commit_time;
	}
	public String getPay_type() {
		return pay_type;
	}
	public void setPay_type(String pay_type) {
		this.pay_type = pay_type;
	}
	public String getPlay_begin_time() {
		return play_begin_time;
	}
	public void setPlay_begin_time(String play_begin_time) {
		this.play_begin_time = play_begin_time;
	}
	public String getPlay_end_time() {
		return play_end_time;
	}
	public void setPlay_end_time(String play_end_time) {
		this.play_end_time = play_end_time;
	}
	public String getShop_name() {
		return shop_name;
	}
	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}
	public BigDecimal getTotal_price() {
		return total_price;
	}
	public void setTotal_price(BigDecimal total_price) {
		this.total_price = total_price;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Integer getAdvertiser_id() {
		return advertiser_id;
	}
	public void setAdvertiser_id(Integer advertiser_id) {
		this.advertiser_id = advertiser_id;
	}

}
