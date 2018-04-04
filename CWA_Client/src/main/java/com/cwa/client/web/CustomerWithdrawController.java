package com.cwa.client.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.service.WithdrawService;
import com.cwa.client.utils.Constant;

/**
 * 用户出金
 * @author HZK
 */
@Controller
@RequestMapping("/*/customer/")
public class CustomerWithdrawController implements Constant{
	
	@Resource
	private WithdrawService withdrawService;
	
	/**
	 * 出金
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/withdraw.do")
	public void withdraw(HttpServletRequest req, HttpServletResponse res) throws Exception{
		withdrawService.withdraw(req, res,req.getSession().getAttribute(SESSION_USER_TYPE).toString());
	}
}