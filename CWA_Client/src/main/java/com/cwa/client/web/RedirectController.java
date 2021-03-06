package com.cwa.client.web;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.dto.CustomerDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.service.WithdrawService;
import com.cwa.client.utils.Constant;


/**
 * 重定向
 */
@Controller
@RequestMapping("/*/redirect/")
public class RedirectController implements Constant{ 
	
	@Resource
	private WithdrawService withdrawService;
	//店主出金
	@RequestMapping("/ADWithDraw.do")
	public void ADWithDraw(HttpServletRequest req,HttpServletResponse res) throws Exception{
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
		List<Tb_Bank_Card_Info> list = withdrawService.queryBankCardInfo(sessionUser.getAccount_id(),THREE,ADWithdrawController.changeUserType(userType));
		for (Tb_Bank_Card_Info cardDto : list) {
			if(cardDto.getStatus()==1){
				res.sendRedirect("/chinese/mobile/html/chuj.html");
				return;
			}
		}
		res.sendRedirect("/chinese/mobile/html/banka.html");
	}
	
	@RequestMapping("/mobile/index.do")
	public void indexGo(HttpServletRequest req,HttpServletResponse res) throws Exception{
		System.out.println("~~~~~~~~~~~~~~~"+req.getParameter("code")+"======"+req.getParameter("state"));
		res.sendRedirect("/chinese/mobile/html/index.html");
	}
}
