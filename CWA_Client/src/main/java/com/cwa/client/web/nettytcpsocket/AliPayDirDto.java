package com.cwa.client.web.nettytcpsocket;

public final class AliPayDirDto {

	 
	private String subject;//订单标题
	private String body;//订单描述
	
	private String goods_detail;//订单包含的商品列表信息，Json格式，详见商品明细说明
	private String passback_params;//公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数。支付宝只会在异步通知时将该参数原样返回。本参数必须进行UrlEncode之后才可以发送给支付宝
	private String timeout_express;//该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。该参数在请求到支付宝时开始计时。
	
	private String qr_pay_mode;//跳转模式下，用户的扫码界面是由支付宝生成的，不在商户的域名下。2：订单码-跳转模式
	 
	private String timestamp;//发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"
	private String return_url;//同步返回地址，HTTP/HTTPS开头字符串
	private String notify_url;//支付宝服务器主动通知商户服务器里指定的页面http/https路径。
	
	 
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getGoods_detail() {
		return goods_detail;
	}
	public void setGoods_detail(String goods_detail) {
		this.goods_detail = goods_detail;
	}
	public String getPassback_params() {
		return passback_params;
	}
	public void setPassback_params(String passback_params) {
		this.passback_params = passback_params;
	}
	 
	public String getTimeout_express() {
		return timeout_express;
	}
	public void setTimeout_express(String timeout_express) {
		this.timeout_express = timeout_express;
	}
	 
	public String getQr_pay_mode() {
		return qr_pay_mode;
	}
	public void setQr_pay_mode(String qr_pay_mode) {
		this.qr_pay_mode = qr_pay_mode;
	}
	 
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getReturn_url() {
		return return_url;
	}
	public void setReturn_url(String return_url) {
		this.return_url = return_url;
	}
	public String getNotify_url() {
		return notify_url;
	}
	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}
	@Override
	public String toString() {
		return "AliPayDto [subject=" + subject + ", body=" + body
				+ ", goods_detail=" + goods_detail + ", passback_params="
				+ passback_params + ", timeout_express=" + timeout_express
				+ ", qr_pay_mode=" + qr_pay_mode + ", timestamp=" + timestamp
				+ ", return_url=" + return_url + ", notify_url=" + notify_url
				+ "]";
	}
	 
	
	
}
