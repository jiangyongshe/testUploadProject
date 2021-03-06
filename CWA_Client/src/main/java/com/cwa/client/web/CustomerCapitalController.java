package com.cwa.client.web;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.dao.CustomerCommissionDao;
import com.cwa.client.dto.ADCommissionDetailDto;
import com.cwa.client.dto.CustomerCommissionDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.InOutMoneyParamDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.service.CustomerCapitalService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

/**
 * 用户资金相关
 * @author HZK
 */
@Controller
@RequestMapping("/*/customer/")
public class CustomerCapitalController extends BaseController<GobalRespParameter> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private CustomerCommissionDao customerCommissionDao;
	
	@Resource
	private CustomerCapitalService customerCapitalService;
	
	/**
	 * 佣金查询
	 */
	@RequestMapping("/query/commission.do")
	public void commissionQuery(HttpServletRequest req, HttpServletResponse res) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query commission .", LOGLEVEL_INFO, CustomerCapitalController.class);
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		RuturnMessageDto rt = new RuturnMessageDto();
		CustomerCommissionDto data = customerCommissionDao.queryCustomerCommission((Integer.parseInt(userType)==TWO?sessionUser.getAccount_id():sessionUser.getLogin_id()),userType);
		rt.setSuccess(true);
		rt.setData(data);
		writeJSON(res, rt);
	}

	/**
	 * 佣金明细查询
	 */
	@RequestMapping("/query/commissionDetail.do")
	public void commissionDetailQuery(HttpServletRequest req, HttpServletResponse res,ADCommissionDetailDto param) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+"accountId:"+sessionUser.getAccount_id()+" query commission detail.", LOGLEVEL_INFO, ADCapitalController.class);
		param.setAccount_id(sessionUser.getT_type()==TWO?sessionUser.getAccount_id():sessionUser.getLogin_id());
		param.setUserType(sessionUser.getT_type());
		writeJSON(res, customerCapitalService.getPageModelCommission(param));
	}
	
	/**
	 * 出金查询
	 */
	@RequestMapping("/query/withdrawDetail.do")
	public void withdrawDetailQuery(HttpServletRequest req, HttpServletResponse res,InOutMoneyParamDto param) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+"accountId:"+sessionUser.getAccount_id()+" query withdraw detail.", LOGLEVEL_INFO, ADCapitalController.class);
		param.setAccount_id(sessionUser.getAccount_id());
		writeJSON(res, customerCapitalService.getPageModelWithdraw(param));
	}
}
