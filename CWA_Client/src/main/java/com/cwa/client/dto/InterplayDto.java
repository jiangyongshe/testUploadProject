package com.cwa.client.dto;

public class InterplayDto {

	private String uuid;
	private String deviceId;
	private String orderId;
	private String type;
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	@Override
	public String toString() {
		return "InterplayDto [uuid=" + uuid + ", deviceId=" + deviceId+ ", orderId=" + orderId
				+ ", type=" + type + "]";
	}
	
	
}
