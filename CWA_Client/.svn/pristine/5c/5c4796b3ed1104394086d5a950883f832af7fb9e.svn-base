package com.cwa.client.web;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.AdvertiserPicDao;
import com.cwa.client.dao.FileManagerDao;
import com.cwa.client.dto.AdDto;
import com.cwa.client.dto.AdvertiserDto;
import com.cwa.client.dto.AdvertiserPicDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.service.AdvertiserService;
import com.cwa.client.service.FileService;
import com.cwa.client.service.UserService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.LogWriteUtil;

@Controller
@RequestMapping("/*/AD/")
public class ADController extends BaseController<GobalRespParameter> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	
	@Resource
	private AdvertiserDao advertiserDao;

	@Resource
	private AdvertiserPicDao advertiserPicDao;
	
	@Resource// 普通用户service层
	private UserService userService;
	
	@Resource
	private FileService fileService;
	
	@Resource
	private FileManagerDao fileManagerDao;
	
	@Resource// 广告商service层
	private AdvertiserService advertiserService;
	
	
	/**
	 * 查询广告
	 */
	@RequestMapping("/query.do")
	public void query(HttpServletRequest req, HttpServletResponse res,AdDto param) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" query AD .", LOGLEVEL_INFO, ADController.class);
		CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
		AdvertiserDto adUser = (AdvertiserDto)userService.queryUserObjByAccountIdAndUserType(sessionUser.getAccount_id(), USERTYPE_CUSTOMER_ADVERTISER);
		param.setAdvertiser_id(adUser.getId());
		// 查询并返回数据
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("data", advertiserDao.queryAD(param));
		map.put("count", advertiserDao.queryADCount(param));// 数据总量
		writeJSON(res, map);
	}
	
	
	
	
	/**
	 * 更新用户信息
	 */
	@RequestMapping("/updUserInfo.do")
	public void updateUserInfo(HttpServletRequest req, HttpServletResponse res,AdDto param) throws Exception{
		userService.updUserInfo(req, res);
	}
	
	
	/**
	 * 上传图片(用于“成为广告商”)
	 * @param req
	 * @param res
	 * @param file
	 * @throws Exception
	 */
	@RequestMapping("/uploadADPic.do")
	public void uploadPicForChangeAD(HttpServletRequest req,HttpServletResponse res,MultipartFile file) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" upload pic .", LOGLEVEL_INFO, ADController.class);
		RuturnMessageDto rmt = fileService.uploadPicFile(req, file, Encypter.getValueByKey("adPicDir"));
		writeJSON(res, rmt);
	}
	
	
	
	
	
	/**
	 * 成为广告商
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/applyAD.do")
	public void applyAD(HttpServletRequest req,HttpServletResponse res) throws Exception{
		advertiserService.applyAD(req, res);
	}
	
	
	/**
	 * 加载广告商用户信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/loadAdvertiserInfo.do")
	public void loadAdvertiserInfo(HttpServletRequest req,HttpServletResponse res) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" load advertiser info .", LOGLEVEL_INFO, ADController.class);
		// 返回的消息对象
		Map<String,Object> map = new HashMap<String,Object>();
		// 获取用户信息
		Object sessionUser = req.getSession().getAttribute(SESSION_USER);
		Field accountIdField = sessionUser.getClass().getDeclaredField("account_id");
		accountIdField.setAccessible(true);
		String accountId = accountIdField.get(sessionUser).toString();
		AdvertiserDto advertiserDto = new AdvertiserDto();
		advertiserDto.setAccount_id(accountId);
		map.put("data",advertiserDao.queryAdvertiser(advertiserDto).get(0));
		// 获取图片
		List<AdvertiserPicDto> list = advertiserPicDao.queryByAccountId(accountId);
		String[] pics = new String[list.size()];
		for(int i=0;i<pics.length;++i){
			pics[i] = list.get(i).getPic();
		}
		map.put("pic",pics);
		this.writeJSON(res, map);
	}
}
