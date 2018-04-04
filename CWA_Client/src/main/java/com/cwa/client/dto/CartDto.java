package com.cwa.client.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import com.cwa.client.utils.RegUtil;

public class CartDto extends BaseDto{

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
	
	//设备属性
	private String ad_length;
	private String play_number;
	
	private String mailing_address;
	
	private String pics;
	private String cycleType;//周期类型
	private String playCycle;//周期间隔
	private BigDecimal disCount;//折扣
	private String file_type;
	
	private BigDecimal inter_cut_price; //插播广告价格
    private String inter_cut_length;//插播广告时长	
    private String inter_cut_number;//插播广告可买条数
    private BigDecimal html_price;//html模板价格
    private String html_length;//html模板播放时长
    private BigDecimal pic_price;//图片模板价格
    private String pic_length;//图片模板播放时长
    private BigDecimal inter_cut_html_price;//插播html模板价格
    private String inter_cut_html_length;//插播html模板播放时长
    private BigDecimal inter_cut_pic_price;//插播图片模板价格
    private String inter_cut_pic_length;//插播图片模板播放时长
	
    private String device_code;
    
    private Integer buyCount;
    
    private Integer currPlayCount;//当前设备播放广告条数
	
	
    private Integer toDaySell;//当天可卖
	
    
    
	
	public Integer getToDaySell() {
		return toDaySell;
	}
	public void setToDaySell(Integer toDaySell) {
		this.toDaySell = toDaySell;
	}
	public Integer getCurrPlayCount() {
		return currPlayCount;
	}
	public void setCurrPlayCount(Integer currPlayCount) {
		this.currPlayCount = currPlayCount;
	}
	public Integer getBuyCount() {
		return buyCount;
	}
	public void setBuyCount(Integer buyCount) {
		this.buyCount = buyCount;
	}
	
	
	public String getDevice_code() {
		return device_code;
	}
	public void setDevice_code(String device_code) {
		this.device_code = device_code;
	}
	public BigDecimal getInter_cut_price() {
		return inter_cut_price;
	}
	public void setInter_cut_price(BigDecimal inter_cut_price) {
		this.inter_cut_price = inter_cut_price;
	}
	public String getInter_cut_length() {
		return inter_cut_length;
	}
	public void setInter_cut_length(String inter_cut_length) {
		this.inter_cut_length = inter_cut_length;
	}
	public String getInter_cut_number() {
		return inter_cut_number;
	}
	public void setInter_cut_number(String inter_cut_number) {
		this.inter_cut_number = inter_cut_number;
	}
	public BigDecimal getHtml_price() {
		return html_price;
	}
	public void setHtml_price(BigDecimal html_price) {
		this.html_price = html_price;
	}
	public String getHtml_length() {
		return html_length;
	}
	public void setHtml_length(String html_length) {
		this.html_length = html_length;
	}
	public BigDecimal getPic_price() {
		return pic_price;
	}
	public void setPic_price(BigDecimal pic_price) {
		this.pic_price = pic_price;
	}
	public String getPic_length() {
		return pic_length;
	}
	public void setPic_length(String pic_length) {
		this.pic_length = pic_length;
	}
	public BigDecimal getInter_cut_html_price() {
		return inter_cut_html_price;
	}
	public void setInter_cut_html_price(BigDecimal inter_cut_html_price) {
		this.inter_cut_html_price = inter_cut_html_price;
	}
	public String getInter_cut_html_length() {
		return inter_cut_html_length;
	}
	public void setInter_cut_html_length(String inter_cut_html_length) {
		this.inter_cut_html_length = inter_cut_html_length;
	}
	public BigDecimal getInter_cut_pic_price() {
		return inter_cut_pic_price;
	}
	public void setInter_cut_pic_price(BigDecimal inter_cut_pic_price) {
		this.inter_cut_pic_price = inter_cut_pic_price;
	}
	public String getInter_cut_pic_length() {
		return inter_cut_pic_length;
	}
	public void setInter_cut_pic_length(String inter_cut_pic_length) {
		this.inter_cut_pic_length = inter_cut_pic_length;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public BigDecimal getDisCount() {
		return disCount;
	}
	public void setDisCount(BigDecimal disCount) {
		this.disCount = disCount;
	}
	

	public String getCycleType() {
		return cycleType;
	}
	public void setCycleType(String cycleType) {
		this.cycleType = cycleType;
	}
	public String getPlayCycle() {
		return playCycle;
	}
	public void setPlayCycle(String playCycle) {
		this.playCycle = playCycle;
	}
	public String getMailing_address() {
		return mailing_address;
	}

	public void setMailing_address(String mailing_address) {
		this.mailing_address = mailing_address;
	}

	public String getPics() {
		return pics;
	}

	public void setPics(String pics) {
		this.pics = pics;
	}

	public String getAd_length() {
		return ad_length;
	}

	public void setAd_length(String ad_length) {
		this.ad_length = ad_length;
	}

	public String getPlay_number() {
		return play_number;
	}

	public void setPlay_number(String play_number) {
		this.play_number = play_number;
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

}
