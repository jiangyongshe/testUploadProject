package com.cwa.client.web.nettytcpsocket;


public class  RespMsgDto{

	private String uuid;//跟request的uuid一致
	private String respCode;//10000=响应成功,其他代表失败
	private String message;//错误描述，如果为10000，返回success
	private String orderNo;//订单号
	private String bankflow;//银行流水
	private String responseTime;//响应时间 yyyy-MM-dd HH:mm:ss
	private String noticeTime;//第三方响应时间 yyyy-MM-dd HH:mm:ss
	private String respContent;//订单提交完成，有的接口需要返回二维码url，有的接口返回html类容
	private String remark;//备注，可能为空
	
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getRespCode() {
		return respCode;
	}
	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getResponseTime() {
		return responseTime;
	}
	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime;
	}
	public String getNoticeTime() {
		return noticeTime;
	}
	public void setNoticeTime(String noticeTime) {
		this.noticeTime = noticeTime;
	}
	public String getRespContent() {
		return respContent;
	}
	public void setRespContent(String respContent) {
		this.respContent = respContent;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getBankflow() {
		return bankflow;
	}
	public void setBankflow(String bankflow) {
		this.bankflow = bankflow;
	}
	
}
