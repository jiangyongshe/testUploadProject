package com.cwa.client.web.nettytcpsocket;

public class RequestMsgDto {

	private String uuid;//唯一标识
	private String webType;//网站类型，根据域名区分，以此来区分序列号
	private int inOutType;//支付类型 1=出金，2=入金,3=验证签名,4=在线充值
	private String payType;//支付方式：0000=测试，前两位代表支付方式大类，后两位代表支付方式小类，例如0101=微信直连,0201=支付宝直连,,0301=支付宝直连
	
	private String orderNo;//订单号
	private String orderAmount;//订单金额，如是验证签名，此参数写入签名数据
	
	private String content;//类容，如是验证签名，此参数写入待签名串
	private String chartSet;//编码方式，如果为null或者传递， 默认用utf-8
	private String loginType;//登录类型，根据类型区分支付接口，1=pc，2=手机浏览,3=公众号，4=安卓，5=ios
	
	public String getChartSet() {
		return chartSet;
	}
	public void setChartSet(String chartSet) {
		this.chartSet = chartSet;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public int getInOutType() {
		return inOutType;
	}
	public void setInOutType(int inOutType) {
		this.inOutType = inOutType;
	}
	 
	public String getWebType() {
		return webType;
	}
	public void setWebType(String webType) {
		this.webType = webType;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(String orderAmount) {
		this.orderAmount = orderAmount;
	}
	
	
	public String getLoginType() {
		return loginType;
	}
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}
	@Override
	public String toString() {
		return "RequestMsgDto [uuid=" + uuid + ", webType=" + webType
				+ ", inOutType=" + inOutType + ", payType=" + payType
				+ ", orderNo=" + orderNo + ", orderAmount=" + orderAmount
				+ ", content=" + content + ", chartSet=" + chartSet +", loginType=" + loginType +"]";
	}
	 
	
}
