package com.cwa.client.web;

 

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;


@Controller

@RequestMapping("/*/test")
public class TestController extends BaseController<GobalRespParameter> {

	 
	
	  @RequestMapping("view")
	   public ModelAndView view(HttpServletRequest request, HttpServletResponse response){ //spring翻译使用req.getmessage()方法
	          RequestContext req = new RequestContext(request);
	          ModelAndView model = new ModelAndView("view");
	          model.addObject("welcome", req.getMessage("welcome"));
	          
	          return model;
	      }
	  
	 public static void main(String[] args) {
		BigDecimal b=new BigDecimal("1");
		BigDecimal b1=new BigDecimal(100);
		BigDecimal b2=new BigDecimal(200);
		BigDecimal b3=new BigDecimal(300);
		
		b=b.add(b1);
		System.out.println(b);
	}
}
