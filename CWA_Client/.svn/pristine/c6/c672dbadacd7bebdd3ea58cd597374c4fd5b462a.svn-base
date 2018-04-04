package com.cwa.client.utils;

import com.cwa.client.dto.LogCommonDto;
import com.cwa.client.thread.LogWriteThread;


/**
 * 写日志工具类
 * @author javateam
 *
 */
public class LogWriteUtil {

	   public static LogWriteUtil logUtil;
		
		public static LogWriteUtil getSingleton(){
			if(logUtil==null){
				logUtil=new LogWriteUtil();
		    }
			return logUtil;
		}  
		
	  /**
	   * 统一写日志方法	
	   * @param logType
	   * @param content
	   * @param logLevel
	   * @param entityClass
	   */
	  public void writeLog(String logType,String content,String logLevel,Class<?> entityClass){
		  try {
			    LogCommonDto logDto=new LogCommonDto();
				logDto.setLogType(logType);
				logDto.setLogContent(content);
				logDto.setLogLevel(logLevel);
				LogWriteThread logthread=new LogWriteThread(logDto,entityClass);
				logthread.run();
				logDto=null;
		} catch (Exception e) {
			e.printStackTrace();
		}
	  }
}
