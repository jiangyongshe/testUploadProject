package com.cwa.client.web;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cwa.client.dto.SendEmailDto;
import com.cwa.client.utils.SendEmailUtil;

@Controller
@RequestMapping("/index/sendEmail")
public class SendEmailController extends BaseController<GobalRespParameter>{
	@RequestMapping(value="/sendEmailForComp/cm.do",method={RequestMethod.POST,RequestMethod.GET})
	public void sendEmailForComp(HttpServletRequest req,HttpServletResponse res,SendEmailDto dto) throws Exception{
		res.getWriter().println(SendEmailUtil.sendEmailAndWriteLog(dto));
	}
}
