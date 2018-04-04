package com.cwa.client.utils.config;

import com.cwa.client.utils.GobalProperties;

/**
 * read the configurations from file `config.properties`.
 */
public class Configurations {
	 

	public static String getFileRepository() {
		String val =null;
		try {
			val=GobalProperties.getGobalConfig().getValueByKey("STREAM_FILE_REPOSITORY");
			if (val == null || val.isEmpty())
				val = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return val;
	}

	public static String getCrossServer() {
		String val =GobalProperties.getGobalConfig().getValueByKey("STREAM_CROSS_SERVER");
		if (val == null || val.isEmpty())
			val = null;
		return val;
	}
	
	public static String getCrossOrigins() {
		String val =GobalProperties.getGobalConfig().getValueByKey("STREAM_CROSS_ORIGIN");
		if (val == null || val.isEmpty())
			val = null;
		return val;
	 	 
	}
	
	public static boolean getBoolean(String key) {
		return Boolean.parseBoolean(GobalProperties.getGobalConfig().getValueByKey(key));
	}
	
	public static boolean isDeleteFinished() {
		return getBoolean("STREAM_DELETE_FINISH");
	}
	
	public static boolean isCrossed() {
		return getBoolean("STREAM_IS_CROSS");
	}
}
