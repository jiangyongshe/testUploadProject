package com.cwa.client.model;

import java.math.BigDecimal;
import java.sql.Timestamp;


public class Tb_Cart{

	private Integer id;
	private String device_id;
	private String account_id;
	private String account_ip;
	private Timestamp commit_time;
	private String play_begin_time;
	private String play_end_time;
	private String shop_name;
	private Integer advertiser_id;
	private BigDecimal total_price;
	private BigDecimal price;
	private String begin_time;
	private String end_time;
	private Integer time_type;
	private Integer time_number;

	
	public Integer getTime_type() {
		return time_type;
	}

	public void setTime_type(Integer time_type) {
		this.time_type = time_type;
	}

	public Integer getTime_number() {
		return time_number;
	}

	public void setTime_number(Integer time_number) {
		this.time_number = time_number;
	}

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

	public Integer getAdvertiser_id() {
		return advertiser_id;
	}

	public void setAdvertiser_id(Integer advertiser_id) {
		this.advertiser_id = advertiser_id;
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

	public String getBegin_time() {
		return begin_time;
	}

	public void setBegin_time(String begin_time) {
		this.begin_time = begin_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

}
