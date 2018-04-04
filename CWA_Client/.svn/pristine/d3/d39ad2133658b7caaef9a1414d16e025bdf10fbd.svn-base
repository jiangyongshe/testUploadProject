/**  
 * Project Name:trade_weixin  
 * File Name:ipUtil.java  
 * Package Name:com.goldwin.trade.weixin.utils  
 * Date:2016-9-1上午10:36:31  
 * Copyright (c) 2016, javateam All Rights Reserved.  
 *  
*/  
  
package com.cwa.client.utils;  

import javax.servlet.http.HttpServletRequest;

/**  
 * ClassName:ipUtil <br/>  
 * Function: TODO ADD FUNCTION. <br/>  
 * Reason:   TODO ADD REASON. <br/>  
 * Date:     2016-9-1 上午10:36:31 <br/>  
 * @author   javateam  
 * @version    
 * @since    JDK 1.7  
 * @see        
 */
public class ipUtil {

	
	/** 
	   * 获取用户真实IP地址，不使用request.getRemoteAddr();的原因是有可能用户使用了代理软件方式避免真实IP地址, 
	   * 
	   * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值，究竟哪个才是真正的用户端的真实IP呢？ 
	   * 答案是取X-Forwarded-For中第一个非unknown的有效IP字符串。 
	   * 
	   * 如：X-Forwarded-For：192.168.1.110, 192.168.1.120, 192.168.1.130, 
	   * 192.168.1.100 
	   * 
	   * 用户真实IP为： 192.168.1.110 
	   * 
	   * @param request 
	   * @return 
	   */
	  public static String getIpAddress(HttpServletRequest request) { 
	    String ip = request.getHeader("x-forwarded-for"); 
	    
	    if(ip!=null&&!"unknown".equalsIgnoreCase(ip)&&ip.indexOf(",")>=0){
	    	ip=ip.split(",")[0];
	    }
	    
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("WL-Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_CLIENT_IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getRemoteAddr(); 
	    } 
	    return ip; 
	  } 
	  
	  /**
	   * 
	   * ipIsValid:验证ip是否被禁止登录<br/>  
	   * @author javateam  
	   * @param ipSection
	   * @param ip
	   * @return  BOOLEAN
	   */
	  public static boolean ipIsValid(String ipSection, String ip) {     
	        if (ipSection == null)     
	            throw new NullPointerException("IP段不能为空！");     
	        if (ip == null)     
	            throw new NullPointerException("IP不能为空！");     
	        ipSection = ipSection.trim();     
	        ip = ip.trim();     
	        final String REGX_IP = "((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)";     
	        final String REGX_IPB = REGX_IP + "\\-" + REGX_IP;     
	        if (!ipSection.matches(REGX_IPB) || !ip.matches(REGX_IP))     
	            return false;     
	        int idx = ipSection.indexOf('-');     
	        String[] sips = ipSection.substring(0, idx).split("\\.");     
	        String[] sipe = ipSection.substring(idx + 1).split("\\.");     
	        String[] sipt = ip.split("\\.");     
	        long ips = 0L, ipe = 0L, ipt = 0L;     
	        for (int i = 0; i < 4; ++i) {     
	            ips = ips << 8 | Integer.parseInt(sips[i]);     
	            ipe = ipe << 8 | Integer.parseInt(sipe[i]);     
	            ipt = ipt << 8 | Integer.parseInt(sipt[i]);     
	        }     
	        if (ips > ipe) {     
	            long t = ips;     
	            ips = ipe;     
	            ipe = t;     
	        }     
	        return ips <= ipt && ipt <= ipe;     
	    }     
	  
	  
	   /** public static void main(String[] args) {     
	        if (ipIsValid("192.168.1.1-192.168.1.10", "192.168.3.54")) {     
	            logger.info("ip属于该网段");     
	        } else    
	            logger.info("ip不属于该网段");     
	    }   **/
}
  
