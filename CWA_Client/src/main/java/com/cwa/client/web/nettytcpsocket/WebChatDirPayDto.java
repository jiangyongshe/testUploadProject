package com.cwa.client.web.nettytcpsocket;


public class WebChatDirPayDto {

	private String nonce_str;//随机字符串
	private String body;//商品简单描述
	private String attach;//附加数据,如果是支付，取资金账号，如果是付款，取用户的真实姓名
	private String spbill_create_ip;//提交用户端ip
	private String time_start;//订单生成时间 格式为yyyyMMddHHmmss
	private String time_expire;//订单失效时间yyyyMMddHHmmss
	private String timestamp;//第三方浏览器支付时候使用
	private String notify_url;//异步通知地址
	private String openid;//trade_type =JSAPI，此参数必传，用户在商户appid下的唯一标识。
	public String getNonce_str() {
		return nonce_str;
	}
	public void setNonce_str(String nonce_str) {
		this.nonce_str = nonce_str;
	}
	 
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getAttach() {
		return attach;
	}
	public void setAttach(String attach) {
		this.attach = attach;
	}
	 
	public String getSpbill_create_ip() {
		return spbill_create_ip;
	}
	public void setSpbill_create_ip(String spbill_create_ip) {
		this.spbill_create_ip = spbill_create_ip;
	}
	public String getTime_start() {
		return time_start;
	}
	public void setTime_start(String time_start) {
		this.time_start = time_start;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getNotify_url() {
		return notify_url;
	}
	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	 
	public String getTime_expire() {
		return time_expire;
	}
	public void setTime_expire(String time_expire) {
		this.time_expire = time_expire;
	}
	@Override
	public String toString() {
		return "WebChatDirPayDto [nonce_str=" + nonce_str + ", body=" + body
				+ ", attach=" + attach + ", spbill_create_ip="
				+ spbill_create_ip + ", time_start=" + time_start
				+ ", time_expire=" + time_expire + ", timestamp=" + timestamp
				+ ", notify_url=" + notify_url + ", openid=" + openid + "]";
	}
	 
	
	
}
