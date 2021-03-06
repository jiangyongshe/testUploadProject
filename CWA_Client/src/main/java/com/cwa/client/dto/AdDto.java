package com.cwa.client.dto;

import com.cwa.client.utils.RegUtil;

/**
 * 广告查询
 * @author HZK
 */
public class AdDto extends BaseDto{

	private Integer advertiser_id;// 店铺编号
	private String device_id;// 设备编号
	private String serial_number;// 广告编号
	private String name;// 广告名称
	private String addr;// 广告地址
	private String ad_length;// 广告时长
	private String allPlayNumber;// 总共播放条数
	private String begin_time;// 播放开始时间(hh:mm:ss)
	private String end_time;// 播放结束时间(hh:mm:ss)
	private String price;// 单价(元/条)
	private String play_begin_time;// 开始日期(yyyy-MM-dd)
	private String play_end_time;// 结束日期(yyyy-MM-dd)
	private String order_status;// 订单状态
	private Integer recommed;//1-热门 2-非热门 
	private String pics;// 图片
	private String passVideoName;// 审核通过后的视频名称
	private String notPassVideoName;// 审核不通过的视频名称
	private String passVideoPath;// 审核通过后的视频路径
	private String notPassVideoPath;// 审核不通过的视频路径
	private String device_code;
	private Integer file_type;
	
	// 查询参数
	private String lessPrice;// 小价格
	private String greaterPrice;// 大价格
	private String device_industry; //设备分类
	private String adName;
	
	
	public String getAdName() {
		return adName;
	}
	public void setAdName(String adName) {
		this.adName = adName;
	}
	public String getDevice_industry() {
		return device_industry;
	}
	public void setDevice_industry(String device_industry) {
		this.device_industry = device_industry;
	}
	public Integer getFile_type() {
		return file_type;
	}
	public void setFile_type(Integer file_type) {
		this.file_type = file_type;
	}
	public String getDevice_code() {
		return device_code;
	}
	public void setDevice_code(String device_code) {
		this.device_code = device_code;
	}
	public Integer getAdvertiser_id() {
		return advertiser_id;
	}
	public void setAdvertiser_id(Integer advertiser_id) {
		this.advertiser_id = advertiser_id;
	}
	public String getDevice_id() {
		return device_id;
	}
	public void setDevice_id(String device_id) {
		this.device_id = device_id;
	}
	public String getSerial_number() {
		return serial_number;
	}
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getAd_length() {
		return ad_length;
	}
	public void setAd_length(String ad_length) {
		this.ad_length = ad_length;
	}
	public String getAllPlayNumber() {
		return allPlayNumber;
	}
	public void setAllPlayNumber(String allPlayNumber) {
		this.allPlayNumber = allPlayNumber;
	}
	public String getBegin_time() {
		return begin_time;
	}
	public void setBegin_time(String begin_time) {
		if(!RegUtil.getUtil().isNull(begin_time)&&begin_time.length()>5){
			this.begin_time = begin_time.substring(0,5);
		}else{
			this.begin_time = begin_time;
		}
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		if(!RegUtil.getUtil().isNull(end_time)&&end_time.length()>5){
			this.end_time = end_time.substring(0,5); 
		}else{
			this.end_time = end_time;
		}
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
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
	public String getOrder_status() {
		return order_status;
	}
	public void setOrder_status(String order_status) {
		this.order_status = order_status;
	}
	public Integer getRecommed() {
		return recommed;
	}
	public void setRecommed(Integer recommed) {
		this.recommed = recommed;
	}
	public String getPics() {
		return pics;
	}
	public void setPics(String pics) {
		this.pics = pics;
	}
	public String getPassVideoName() {
		return passVideoName;
	}
	public void setPassVideoName(String passVideoName) {
		this.passVideoName = passVideoName;
	}
	public String getNotPassVideoName() {
		return notPassVideoName;
	}
	public void setNotPassVideoName(String notPassVideoName) {
		this.notPassVideoName = notPassVideoName;
	}
	public String getPassVideoPath() {
		return passVideoPath;
	}
	public void setPassVideoPath(String passVideoPath) {
		this.passVideoPath = passVideoPath;
	}
	public String getNotPassVideoPath() {
		return notPassVideoPath;
	}
	public void setNotPassVideoPath(String notPassVideoPath) {
		this.notPassVideoPath = notPassVideoPath;
	}
	public String getLessPrice() {
		return lessPrice;
	}
	public void setLessPrice(String lessPrice) {
		this.lessPrice = lessPrice;
	}
	public String getGreaterPrice() {
		return greaterPrice;
	}
	public void setGreaterPrice(String greaterPrice) {
		this.greaterPrice = greaterPrice;
	}
}
