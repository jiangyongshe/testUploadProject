package com.cwa.client.utils;


import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateEditor extends PropertyEditorSupport {
	
	//别名
	public static final String FORMAT_yyyyMMdd = "yyyyMMdd";
	public static final String FORMAT_yyyy_MM_dd = "yyyy-MM-dd";
	public static final String FORMAT_yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
	
	
	private static final String DATETIME_NULL = "2001-01-01 00:00:00.0";
	public static final String DEFAULT_DATE_FORMAT = FORMAT_yyyy_MM_dd;
	public static final String DEFAULT_DATETIME_FORMAT = FORMAT_yyyy_MM_dd_HH_mm_ss;
	
	public static final DateFormat[] ACCEPT_DATE_FORMATS = { new SimpleDateFormat(DEFAULT_DATETIME_FORMAT), new SimpleDateFormat(DEFAULT_DATE_FORMAT) };
	public static DateEditor dateEdit;
	public static DateEditor getSingleDateEdite(){
		if(dateEdit==null){
			synchronized (DateEditor.class) {
				dateEdit=new DateEditor();
			}
		}
		return dateEdit;
	}
	/**
	 * Parse the Date from the given text, using the specified DateFormat.
	 * 
	 */
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text == null || text.trim().equals(""))
			setValue(null);
		for (DateFormat format : ACCEPT_DATE_FORMATS) {
			try {
				setValue(format.parse(text));
				return;
			} catch (ParseException e) {
				continue;
			} catch (RuntimeException e) {
				continue;
			}
		}
	}
	
	public String date2String(Date dt,String format){
		String timeStr=null;
		try {
			if(dt==null){
				dt=new Date();
			}
			
			SimpleDateFormat sdf=new SimpleDateFormat(format);
			timeStr=sdf.format(dt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return timeStr; 
	}

	/**
	 * Format the Date as String, using the specified DateFormat.
	 */
	@Override
	public String getAsText() {
		return (String) getValue();
	}

	
	/**
	 * 
	 * timestamp: date string 转换为 timestamp
	 */
	public  Timestamp timestamp(String date)throws Exception{
			Timestamp  expired_date=new Timestamp(System.currentTimeMillis());
			try {
				if(date!=null){
					expired_date=Timestamp.valueOf(date);
				}
				
			} catch (Exception e) {
				throw e;
			}
			return expired_date;
		}
	
	/**
	 * 根据格式获取当前时间，如果传入null为返回格式为"yyyy-MM-dd HH:mm:ss"的时间
	 * @return 返回 String 格式的时间
	 * @throws Exception
	 */
	public String getCurrentDateTimeAsString(String formatsmp) throws Exception{
		String dateTime_temp=null;
		try {
			formatsmp=formatsmp==null?DEFAULT_DATETIME_FORMAT:formatsmp;
			  
			 dateTime_temp = date2String(null, formatsmp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dateTime_temp;
	}
	/**
	 * 获取当前时间，格式为"yyyy-MM-dd HH:mm:ss"
	 * @return 返回 String 格式的时间
	 * @throws Exception
	 */
	public String getCurrentDateTimeAsString() throws Exception{
		String dateTime_temp = date2String(null, FORMAT_yyyy_MM_dd_HH_mm_ss);
		return dateTime_temp;
	}
	/**
	 * 获取当前时间
	 * @return 返回 Timestamp 格式的时间
	 * @throws Exception
	 */
	public  Timestamp getCurrentTimeAsTimestamp() throws Exception{
		Timestamp  expired_date=timestamp(null);
		return expired_date;
	}
	/**
	 * 获取约定为空时间的时间戳
	 * @return Timestamp : "2001-01-01 00:00:00.0"
	 * @throws Exception
	 */
	public  Timestamp getNullAsTimestamp() throws Exception{
		Timestamp  timestamp_temp=timestamp(DATETIME_NULL);
		return timestamp_temp;
	}
	
	public static void main(String [] arg){
		System.out.println(System.currentTimeMillis());
		
	}
}
