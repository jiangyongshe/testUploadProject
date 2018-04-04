package com.cwa.client.sendSMS;  

import java.util.List;

/**
 * 
 * @author java team
 *
 */
public class AliYunSMSBaseDto {

	private String apiProduct;
	private String apiDomain;
	private String accessKeyId;
	private String accessKeySecret;
	private String signName;
    private String ascClientRegion;
 
	private List<String> 	templateCodelist;
	
	private int connectTimeOut;
	private int readTimeOut;
	
	private int isSend;
	
	public String getApiProduct() {
		return apiProduct;
	}

	public void setApiProduct(String apiProduct) {
		this.apiProduct = apiProduct;
	}

	public String getApiDomain() {
		return apiDomain;
	}

	public void setApiDomain(String apiDomain) {
		this.apiDomain = apiDomain;
	}

	public String getAccessKeyId() {
		return accessKeyId;
	}

	public void setAccessKeyId(String accessKeyId) {
		this.accessKeyId = accessKeyId;
	}

	public String getAccessKeySecret() {
		return accessKeySecret;
	}

	public void setAccessKeySecret(String accessKeySecret) {
		this.accessKeySecret = accessKeySecret;
	}

	public String getSignName() {
		return signName;
	}

	public void setSignName(String signName) {
		this.signName = signName;
	}

	public String getAscClientRegion() {
		return ascClientRegion;
	}

	public void setAscClientRegion(String ascClientRegion) {
		this.ascClientRegion = ascClientRegion;
	}

	public List<String> getTemplateCodelist() {
		return templateCodelist;
	}
	
	public void setTemplateCodelist(List<String> templateCodelist) {
		this.templateCodelist = templateCodelist;
	}
	
 
	public int getConnectTimeOut() {
		return connectTimeOut;
	}
	public void setConnectTimeOut(int connectTimeOut) {
		this.connectTimeOut = connectTimeOut;
	}
	public int getReadTimeOut() {
		return readTimeOut;
	}
	public void setReadTimeOut(int readTimeOut) {
		this.readTimeOut = readTimeOut;
	}

	public int getIsSend() {
		return isSend;
	}

	public void setIsSend(int isSend) {
		this.isSend = isSend;
	}

	
	
}
  
