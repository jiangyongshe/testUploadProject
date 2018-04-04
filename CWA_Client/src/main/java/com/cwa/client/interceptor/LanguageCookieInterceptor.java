package com.cwa.client.interceptor;

import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class LanguageCookieInterceptor implements HandlerInterceptor{

	 @Resource
	 private CookieLocaleResolver cookieLocal;
	
	  
	
	 @Override  
	    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)  
	            throws Exception {  
	        String url = request.getRequestURI();
	       /// String language=CookieUtil.getCookieUtil().readCookieByKey(request, response, "language");
	       // System.out.println(" url "+url);
	        
	        LogWriteUtil.getSingleton().writeLog("", " url "+url, Constant.LOGLEVEL_INFO, LanguageCookieInterceptor.class);
	        Locale locale =null;
	        if (url != null&&url.indexOf(Constant.LANGUAGE_TRADITIONAL)>-1) {  
	             locale = Locale.TAIWAN;
	           
	           } else if (url != null&&url.indexOf(Constant.LANGUAGE_ENGLISH)>-1) {  
	             locale = Locale.US; 
	          } else {  
	        	  locale = Locale.CHINA;
	               
	        }  
	         
	       /// request.getSession()    .setAttribute(   SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME,   locale);  
	       /// System.out.println(" locale.getLanguage() "+locale.getLanguage());
	       // request.setAttribute("language", locale.getLanguage()); 
	        
	       cookieLocal.setCookieName("language");
	       cookieLocal.setLocale(request, response, locale);
            
	        return true;  
	    }  
	  
	    @Override  
	    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,  
	            ModelAndView modelAndView) throws Exception {  
	          
	    }  
	  
	    @Override  
	    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)  
	            throws Exception {  
	          
	    }  
}
