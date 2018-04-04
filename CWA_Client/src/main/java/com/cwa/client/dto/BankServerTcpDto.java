package com.cwa.client.dto;

import java.util.List;

public class BankServerTcpDto {

	private String serverIp;
	private int serverPort;
	private String charSet;
	private String webType;
	private String baseUrl;
	
	private int initByteBufferSize;//单位 byte
	private int soTimeout;//单位毫秒
	private boolean blocking; 
	
	private List<String> whiteIpList;
	
	public String getServerIp() {
		return serverIp;
	}
	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
	public int getServerPort() {
		return serverPort;
	}
	public void setServerPort(int serverPort) {
		this.serverPort = serverPort;
	}
	public String getCharSet() {
		return charSet;
	}
	public void setCharSet(String charSet) {
		this.charSet = charSet;
	}
	public String getWebType() {
		return webType;
	}
	public void setWebType(String webType) {
		this.webType = webType;
	}
	public String getBaseUrl() {
		return baseUrl;
	}
	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}
	public int getInitByteBufferSize() {
		return initByteBufferSize;
	}
	public void setInitByteBufferSize(int initByteBufferSize) {
		this.initByteBufferSize = initByteBufferSize;
	}
	public int getSoTimeout() {
		return soTimeout;
	}
	public void setSoTimeout(int soTimeout) {
		this.soTimeout = soTimeout;
	}
	public boolean isBlocking() {
		return blocking;
	}
	public void setBlocking(boolean blocking) {
		this.blocking = blocking;
	}
	public List<String> getWhiteIpList() {
		return whiteIpList;
	}
	public void setWhiteIpList(List<String> whiteIpList) {
		this.whiteIpList = whiteIpList;
	}
	
	
}
