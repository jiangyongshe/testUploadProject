package com.cwa.client.dto;

/**
 * 二期日志系统预留
 * @author javateam
 *
 */
public class LogCommonDto {
	
	private String logfileName;//日志输出文件名称，默认为当前class

	private String serverName;//服务器名称或者ip

	private String logType;//日志类型，示例：登录日志，注册日志，入金日志
	
	private String logLevel;//日志输出级别，级别代码： TRACE   DEBUG   INFO（默认）   WARN   ERROR
	
	private String logContent;//日志类容

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

	public String getLogLevel() {
		return logLevel;
	}

	public void setLogLevel(String logLevel) {
		this.logLevel = logLevel;
	}

	public String getLogContent() {
		return logContent;
	}

	public void setLogContent(String logContent) {
		this.logContent = logContent;
	}

	public String getLogfileName() {
		return logfileName;
	}

	public void setLogfileName(String logfileName) {
		this.logfileName = logfileName;
	}
	
	
}
