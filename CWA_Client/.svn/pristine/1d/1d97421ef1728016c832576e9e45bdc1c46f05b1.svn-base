package com.cwa.client.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.dao.AdvertiserDeviceDao;
import com.cwa.client.dto.AdvertiserDeviceDto;
import com.cwa.client.dto.AdvertiserDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.DeviceMonitorDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.service.UserService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

@Controller
@RequestMapping("/*/AD/")
public class ADDeviceController extends BaseController<GobalRespParameter> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private AdvertiserDeviceDao advertiserDeviceDao;
	
	@Resource
	private UserService userService;
	
	/**
	 * 查询设备监控
	 */
	@RequestMapping("/query/deviceMonitor.do")
	public void queryDeviceMonitor(HttpServletRequest req,HttpServletResponse res) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query device monitor .", LOGLEVEL_INFO, ADDeviceController.class);
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		AdvertiserDto adUser = (AdvertiserDto)userService.queryUserObjByAccountIdAndUserType(sessionUser.getAccount_id(), USERTYPE_CUSTOMER_ADVERTISER);
		RuturnMessageDto rt = new RuturnMessageDto();
		List<DeviceMonitorDto> list = advertiserDeviceDao.queryDeviceMonitor(adUser.getId());
		rt.setData(list);
		writeJSON(res, rt);
	}
	
	/**
	 * 查询设备详情
	 */
	@RequestMapping("/query/deviceDetail.do")
	public void queryDeviceDetail(HttpServletRequest req,HttpServletResponse res) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query device detail .", LOGLEVEL_INFO, ADDeviceController.class);
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		AdvertiserDto adUser = (AdvertiserDto)userService.queryUserObjByAccountIdAndUserType(sessionUser.getAccount_id(), USERTYPE_CUSTOMER_ADVERTISER);
		RuturnMessageDto rt = new RuturnMessageDto();
		List<AdvertiserDeviceDto> list = advertiserDeviceDao.queryByAdvertiserId(adUser.getId());
		rt.setData(list);
		writeJSON(res, rt);
	}
}
