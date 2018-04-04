package com.cwa.client.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * java cookie工具类
 * @author javateam
 *
 */
public class CookieUtil extends HttpServlet{
	
	
	private static final long serialVersionUID = 8938927968456651925L;
	
	private final static CookieUtil cookieUtil=new CookieUtil();
	
	public static CookieUtil getCookieUtil(){
		return  cookieUtil;
	}
	
	 	
	
	public String readCookieByKey(HttpServletRequest request,HttpServletResponse response,String cookieKey){
		Cookie[] cookies = request.getCookies();     
		String cookieValue = null;     
		if(cookies!=null)     
		{     

		    for (int i = 0; i < cookies.length; i++)      
		    {     
		       Cookie c = cookies[i];          
		       if(cookieKey!=null&&cookieKey.equalsIgnoreCase(c.getName())){     
		    	   cookieValue = c.getValue();    
		    	   break;
		        }          
		    }      
		  } 

		return cookieValue;
	}
	/*
	public void readCookie(HttpServletRequest request,HttpServletResponse response){

		Cookie[]   cookies = request.getCookies();     
		//cookies不为空，则清除        
		if(cookies!=null)        
		{      
			for(Cookie cookieTemp : cookies){  
				String   cookieIdentity = cookieTemp.getName();        
				//查找身份串        
				if(cookieIdentity.equals(AppConstants.COOKIE_IDENTITY))        
				{        
					 
					 * setMaxAge(参数)：参数为负数代表关闭浏览器时清除cookie，参数为0时代表删除cookie，参数为正数时代表cookie存在多少秒。 
					   
					cookieTemp.setMaxAge(0);        
					response.addCookie(cookieTemp);      
				}    
			}  
		}
	}
	*/
}
