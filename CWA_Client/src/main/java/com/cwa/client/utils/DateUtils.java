package com.cwa.client.utils;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 时间工具类
 * @author javateam
 *
 */

public class DateUtils {
	
	public final static String DATE_FORMAT_YYYY_MM_dd = "yyyy-MM-dd";
	
	public final static  String DATE_FORMAT_DEFAULT = "yyyy-MM-dd HH:mm:ss";
	
	public final static  String DATE_FORMAT_YYYYMMDDHHMMSS = "yyyyMMddHHmmss";
	
	public final static  String DATE_FORMAT_YYYYMMDD = "yyyyMMdd";
	
	public final static  String DATE_FORMAT_YYYYMMDDHHMMSSSSS = "yyyyMMddHHmmssSSS";
	
	public final static  String DATE_FORMAT_T = "yyyyMMdd'T'HHmmssSSS";

	/**
	 * 获取星期
	 * @return
	 */
	 public static int getWeekDay(){  
		   Date today = new Date();
	        Calendar c=Calendar.getInstance();
	        c.setTime(today);
	        int weekday=c.get(Calendar.DAY_OF_WEEK); 
	       return weekday;     
	    } 
	/**
	 * 日期从字符串转为时间戳	
	 * @param dateString
	 * @param dateformat
	 * @return
	 * @throws java.text.ParseException
	 */
	public  static Timestamp string2Time(String dateString,String dateformat) 
			  throws Exception { 
					Timestamp dateTime=null;
			    try {
			    	dateformat=dateformat==null?DATE_FORMAT_DEFAULT:dateformat;
				    DateFormat  dateFormat = new SimpleDateFormat(dateformat);//设定格式 
				    java.util.Date timeDate = dateFormat.parse(dateString);//util类型 
				    dateTime = new java.sql.Timestamp(timeDate.getTime());//Timestamp类型,timeDate.getTime()返回一个long型 
				} catch (Exception e) {
					throw e;
				}
			  return dateTime; 
			} 
	
	/**
	 * 日期从字符串转为date
	 * @param dateString
	 * @param dateformat
	 * @return
	 * @throws java.text.ParseException
	 */
	public  static Date string2UtilTime(String dateString,String dateformat) 
			  throws Exception { 
			Date timeDate=null;
				try {
					dateformat=dateformat==null?DATE_FORMAT_DEFAULT:dateformat;
					   DateFormat  dateFormat = new SimpleDateFormat(dateformat);//设定格式 
					  dateFormat.setLenient(false); 
					   timeDate = dateFormat.parse(dateString);//util类型 
				} catch (Exception e) {
					throw e;
				}
			    return timeDate; 
			} 
    /**
     * 时间戳转为字符串日期
     * @param timestamp
     * @param dateformat
     * @return
     * @throws Exception
     */
	  public static String TimestamptoString(Timestamp timestamp,String dateformat)throws Exception {  
			  String datestr=null;
			  try {
				  dateformat=dateformat==null?DATE_FORMAT_DEFAULT:dateformat;
				   SimpleDateFormat simp =  new  SimpleDateFormat(dateformat);
				    datestr=simp.format(timestamp);
			} catch (Exception e) {
				throw e;
			}
		  return datestr;
	   }  
	  
	  /**
		 * 获取当天时间
		 * @param dateformat
		 * @return
		 * @throws Exception
		 */	 
	public static String getNowDay(String dateformat)throws Exception {  
		String returnStr = null;  
		try {
			dateformat=dateformat==null?DATE_FORMAT_DEFAULT:dateformat;
			Date dNow = new Date();   //当前时间
			Calendar calendar = Calendar.getInstance(); //得到日历
			calendar.setTime(dNow);//把当前时间赋给日历
			SimpleDateFormat sdf=new SimpleDateFormat(dateformat); //设置时间格式
			returnStr= sdf.format(dNow); //格式化当前时间
		} catch (Exception e) {
			throw e;
		}
        return returnStr;  
    }
	
	/**
	 * 获取昨天时间
	 * @param dateformat
	 * @return
	 * @throws Exception
	 */
	public static String getBeforeDay(String dateformat)throws Exception {  
		String returnStr = null;  
		try {
			dateformat=dateformat==null?DATE_FORMAT_DEFAULT:dateformat;
			Date dNow = new Date();   //当前时间
			Date dBefore = new Date();
			Calendar calendar = Calendar.getInstance(); //得到日历
			calendar.setTime(dNow);//把当前时间赋给日历
			calendar.add(Calendar.DAY_OF_MONTH, -1);  //设置为前一天
			dBefore = calendar.getTime();   //得到前一天的时间
			SimpleDateFormat sdf=new SimpleDateFormat(dateformat); //设置时间格式
			returnStr = sdf.format(dBefore);    //格式化前一天
		} catch (Exception e) {
			throw e;
		}
        return returnStr;  
    }
	
	   
		   
	  public static void main(String [] arg){
		   try {
			  
		} catch (Exception e) {
			// TODO: handle exception
		}
	   }  
	   
	  
}
