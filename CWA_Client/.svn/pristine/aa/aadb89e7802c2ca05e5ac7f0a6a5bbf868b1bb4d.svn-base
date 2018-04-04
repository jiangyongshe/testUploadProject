package com.cwa.client.thread;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cwa.client.dto.LogCommonDto;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.RespCodeEnum;



public class LogWriteThread extends Thread {

	private  LogCommonDto logDto;
	
	private   Logger logger;
	
	private   Class<?> entityClass;
	
	private   Logger  threadlogger=LoggerFactory.getLogger(LogWriteThread.class);
	
	public  LogWriteThread(LogCommonDto logDto,Class<?> entityClass){
		if(entityClass!=null){
			logger=LoggerFactory.getLogger(entityClass);
		}else{
			logger=LoggerFactory.getLogger(RespCodeEnum.log_common_fileName.getCode());
		}
		this.entityClass=entityClass;
		this.logDto=logDto;
	}
	
	
	@Override
	public void run() {
		 try {
			 if(logDto!=null){
				 if(null==logDto.getLogLevel()||"".equals(logDto.getLogLevel())){
					 logDto.setLogLevel(Constant.LOGLEVEL_INFO);
				 }
				 switch (logDto.getLogLevel().toUpperCase()) {
					case Constant.LOGLEVEL_DEBUG:
						logger.debug(logDto.getLogContent());
						break;
					case Constant.LOGLEVEL_WARN:
						logger.warn(logDto.getLogContent());
						break;
					case Constant.LOGLEVEL_ERROR:
						logger.error(logDto.getLogContent());
						break;
					default:
						logger.info(logDto.getLogContent());
						break;
					}
			 }else{
				 threadlogger.error((this.entityClass==null?" unknow class name":this.entityClass)+" logDto is null ，wrire log fail ");
			 }
		} catch (Exception e) {
			 threadlogger.error((this.entityClass==null?" unknow class name":this.entityClass)+" LogWriteThread Exception:  "+e.getMessage());
		}
	}

}
