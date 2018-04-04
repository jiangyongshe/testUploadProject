package com.cwa.client.dto;


public class IpDto {

	private String endip;	
	private String country;	
	private String local;
	private String sourcestartip;
	private String sourceendip;	
	private String startip;
	
	private String prefixstartip;
	
	
	public String getSourcestartip() {
		return sourcestartip;
	}
	public void setSourcestartip(String sourcestartip) {
		this.sourcestartip = sourcestartip;
	}
	public String getSourceendip() {
		return sourceendip;
	}
	public void setSourceendip(String sourceendip) {
		this.sourceendip = sourceendip;
	}
	public String getPrefixstartip() {
		return prefixstartip;
	}
	public void setPrefixstartip(String prefixstartip) {
		this.prefixstartip = prefixstartip;
	}

	public String getStartip() {
		return startip;
	}
	public void setStartip(String startip) {
		this.startip = startip;
	}
	public String getEndip() {
		return endip;
	}
	public void setEndip(String endip) {
		this.endip = endip;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getLocal() {
		return local;
	}
	public void setLocal(String local) {
		this.local = local;
	}
	
	
}
