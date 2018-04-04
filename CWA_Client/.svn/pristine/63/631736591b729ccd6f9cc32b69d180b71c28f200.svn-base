package com.cwa.client.service;


import java.io.File;
import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.AdvertiserCommReportDao;
import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.AdvertiserPicDao;
import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dao.FileManagerDao;
import com.cwa.client.dto.AdvertiserDto;
import com.cwa.client.dto.AdvertiserPicDto;
import com.cwa.client.dto.FileManagerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.model.Tb_Advertiser;
import com.cwa.client.model.Tb_advertiser_comm_report;
import com.cwa.client.model.Tb_advertiser_pic;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateUtils;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.Tools;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;

@Service
public class AdvertiserService extends BaseController<GobalRespParameter> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 基础路径
	 */
	private static final String BASE_UPLOAD_PATH = "baseUploadPath";
	@Resource
	private AdvertiserDao advertiserDao;
	
	@Resource
	private AdvertiserPicDao advertiserPicDao;
	
	@Resource
	private FileManagerDao fileManagerDao;
	
	@Resource
	private ClientInOutMoneyDao clientInOutMoneyDao;
	
	@Resource
	private AdvertiserCommReportDao advertiserCommReportDao;
  
	public Tb_Advertiser findById(Integer id){
		return advertiserDao.findById(id);
	}
	
	public void save(Tb_Advertiser entity) throws Exception{
		advertiserDao.save(entity);
	}
	
	
	public void update(Tb_Advertiser entity) throws Exception {
		advertiserDao.update(entity);
	}
	
	public void saveUserAndInit(Tb_Advertiser entity) throws Exception{
		advertiserDao.insert(entity);
		Tb_advertiser_comm_report entity1=new Tb_advertiser_comm_report();
		entity1.setAdvertiser_id(entity.getAccount_id());
		entity1.setSettlement_date(DateUtils.getNowDay(DateUtils.DATE_FORMAT_YYYY_MM_dd));
		entity1.setShop_name("");
		advertiserCommReportDao.insert(entity1);
		logWriteUtil.writeLog("", "register ad success advertiserId:"+entity.getAccount_id(), LOGLEVEL_INFO, AdvertiserService.class);
	}
	
	public void applyAD(HttpServletRequest req,HttpServletResponse res) throws Exception{
		String userName = req.getSession().getAttribute(SESSION_USER_NAME).toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" apply advertiser .", LOGLEVEL_INFO, AdvertiserService.class);
		// 返回的消息对象
		RuturnMessageDto rt = new RuturnMessageDto();
		// 语言包
		RequestContext reqCt= new RequestContext(req);
		Object sessionUser = req.getSession().getAttribute(SESSION_USER);
		Field accountIdField = sessionUser.getClass().getDeclaredField("account_id");
		accountIdField.setAccessible(true);
		String accountId = accountIdField.get(sessionUser).toString();
		// 获取用户信息，判断是否审核通过，审核通过将不能修改
		AdvertiserDto advertiserDto = new AdvertiserDto();
		advertiserDto.setAccount_id(accountId);
		if(advertiserDao.queryAdvertiser(advertiserDto).get(0).getAudit_status()==TWO){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User have audit pass.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.audit.pass"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-店铺经营范围
		String managerScope = ServletRequestUtils.getStringParameter(req,"managerScope","").trim();
		// 判断是否输入店铺经营范围
		if("".equals(managerScope)){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store manager scope param is empty.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.managerScope.empty"));
			writeJSON(res, rt);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store manager scope param is "+managerScope+".", LOGLEVEL_INFO, AdvertiserService.class);
		// 判断店铺经营范围字符是否过长
		if(managerScope.length()>20){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store manager scope too long.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.managerScope.tooLong"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-设备使用方式
		String deviceWay = ServletRequestUtils.getStringParameter(req,"deviceWay","").trim();
		// 判断是否输入设备使用方式
		if("".equals(deviceWay)){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Device way param is empty.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.device.way.nochoose"));
			writeJSON(res, rt);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Device way param is "+deviceWay+".", LOGLEVEL_INFO, AdvertiserService.class);
		// 判断设备使用方式参数是否合法
		Integer deviceWayInt = 0;
		try {
			deviceWayInt = Integer.parseInt(deviceWay);
			if(deviceWayInt!=ZERO&&deviceWayInt!=ONE&&deviceWayInt!=TWO&&deviceWayInt!=THREE){
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Device way param is illegality.", LOGLEVEL_INFO, AdvertiserService.class);
				rt.setMsg(reqCt.getMessage("apply.advertiser.tip.device.way.param.illegality"));
				writeJSON(res, rt);
				return;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.device.way.param.illegality"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-店铺名称
		String storeName = ServletRequestUtils.getStringParameter(req,"storeName","").trim();
		// 判断是否输入店铺名称
		if("".equals(storeName)){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store name param is empty.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.name.epmty"));
			writeJSON(res, rt);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store name param is "+storeName+".", LOGLEVEL_INFO, AdvertiserService.class);
		// 判断店铺名称字符是否过长
		if(storeName.length()>40){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store name too long.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.name.tooLong"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-店铺详细地址
		String storeDetailAddr = ServletRequestUtils.getStringParameter(req,"storeDetailAddr","").trim();
		// 判断是否选择了省市区
		String[] pcas = storeDetailAddr.split("&")[0].split("\\*");
		for(int i=0;i<pcas.length;++i){
			if(pcas[i].indexOf("请选择")!=-1){
				switch(i){
				case 0:
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Not choose province.", LOGLEVEL_INFO, AdvertiserService.class);
					rt.setMsg(reqCt.getMessage("apply.advertiser.tip.notChooseProvince"));
					break;
				case 1:
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Not choose city.", LOGLEVEL_INFO, AdvertiserService.class);
					rt.setMsg(reqCt.getMessage("apply.advertiser.tip.notChooseCity"));
					break;
				case 2:
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Not choose area.", LOGLEVEL_INFO, AdvertiserService.class);
					rt.setMsg(reqCt.getMessage("apply.advertiser.tip.notChooseArea"));
					break;
				case 3:
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Not choose town.", LOGLEVEL_INFO, AdvertiserService.class);
					rt.setMsg(reqCt.getMessage("apply.advertiser.tip.notChooseTown"));
					break;
				}
				writeJSON(res, rt);
				return;
			}
		}
		// 判断是否输入店铺详细地址
		if("".equals(storeDetailAddr)||storeDetailAddr.split("&").length!=TWO||storeDetailAddr.split("&")[ONE].trim().equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store detail addr param is empty.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.detailAddr.empty"));
			writeJSON(res, rt);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store detail addr is "+storeName+".", LOGLEVEL_INFO, AdvertiserService.class);
		// 判断店铺详细地址字符是否过长
		if(storeDetailAddr.length()>80){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Store detail addr too long.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.store.detailAddr.tooLong"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-是否同意协议
		String agreement = ServletRequestUtils.getStringParameter(req,"agreement","").trim();
		if("".equals(agreement)||"false".equals(agreement)){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User no agree protocol.", LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("noAgreeProtocol"));
			writeJSON(res, rt);
			return;
		}
		// 获取前台参数-店铺图片路径
		String filePaths =  ServletRequestUtils.getStringParameter(req,"filePaths","").trim();
		String[] filePathArray = filePaths.split(",");
		// 判断是否上传了五张以上的图片
		if(filePathArray.length>FIVE){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Upload picture mount is "+filePathArray.length, LOGLEVEL_INFO, AdvertiserService.class);
			rt.setMsg(reqCt.getMessage("apply.advertiser.tip.piture.tooMore"));
			writeJSON(res, rt);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Upload picture path is "+filePaths, LOGLEVEL_INFO, AdvertiserService.class);
		// 判断所上传的图片是否存在
		for(String filePath : filePathArray){
			if(filePath==null|filePath.trim().equals("")) continue;
			File file = new File(Encypter.getValueByKey(BASE_UPLOAD_PATH)+filePath);
			if(!file.exists()){
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Upload picture is not exist.",LOGLEVEL_INFO, AdvertiserService.class);
				rt.setMsg(reqCt.getMessage("apply.advertiser.tip.piture.notExist")+"-fileLose");
				writeJSON(res, rt);
				return;
			}
		}
		// 根据登录账号和用户类型修改用户数据
		Tb_Advertiser tb_Advertiser = new Tb_Advertiser();
		tb_Advertiser.setAccount_id(accountId);
		tb_Advertiser.setScope(managerScope);
		tb_Advertiser.setDevice_use_type(deviceWayInt);
		tb_Advertiser.setShop_name(storeName);
		tb_Advertiser.setMailing_address(storeDetailAddr);
		tb_Advertiser.setAudit_status(ONE);
		tb_Advertiser.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
		tb_Advertiser.setReg_status(TWO);
		advertiserDao.updateAdvertiserInfoForApply(tb_Advertiser);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Update tb_Advertiser success", LOGLEVEL_INFO, AdvertiserService.class);
		Tb_advertiser_comm_report repEntity = clientInOutMoneyDao.queryAdvertiserInOutInfo(accountId);
		if(repEntity!=null){
			repEntity.setShop_name(storeName);
			advertiserCommReportDao.update(repEntity);
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Update Tb_advertiser_comm_report success", LOGLEVEL_INFO, AdvertiserService.class);
		}
		// 查询已经上传的图片
		List<AdvertiserPicDto> list = advertiserPicDao.queryByAccountId(accountId);
		// 重复上传的图片路径
		StringBuffer repetitionPicPath = new StringBuffer("");
		// 需要添加的图片对象		
		for(String filePath : filePathArray){
			boolean exist = false;
			for(AdvertiserPicDto tap : list){
				if(filePath.equals(tap.getPic())){
					exist = true;
					break;
				}
			}
			if(exist){
				repetitionPicPath.append(filePath);
			}else{
				if(filePath.trim().equals("")) continue;
				// 插入图片数据
				Tb_advertiser_pic param = new Tb_advertiser_pic();
				param.setAdvertiser_id(accountId);
				param.setPic(filePath);
				param.setCreate_time(new Timestamp(new Date().getTime()));
				advertiserPicDao.save(param);
				// 修改文件管理表的数据
				FileManagerDto fileManagerDto = new FileManagerDto();
				fileManagerDto.setStatus(TWO);
				fileManagerDto.setFilePath(filePath);
				fileManagerDao.upadteFileStatus(fileManagerDto);
				
				
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Insert pic data and update tb_file_manager success", LOGLEVEL_INFO, AdvertiserService.class);
			}
		}
		// 重复上传的路径保留，不存在的路径删除
		for(AdvertiserPicDto tap : list){
			if(repetitionPicPath.toString().indexOf(tap.getPic())==-1){
				advertiserPicDao.deleteById(tap.getId());
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Delete tb_advertiser_pic id="+tap.getId()+" success", LOGLEVEL_INFO, AdvertiserService.class);
				// 修改文件管理表的数据并且删除文件
				String path = tap.getPic();
				FileManagerDto fileManagerDto = new FileManagerDto();
				fileManagerDto.setStatus(THREE);
				fileManagerDto.setFilePath(path);
				fileManagerDao.upadteFileStatus(fileManagerDto);
				// 删除文件
				File file = new File(Encypter.getValueByKey(BASE_UPLOAD_PATH)+path);
				if(file.exists()){
					file.delete();
				}
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Update tb_file_manager and delete file(path="+path+") success", LOGLEVEL_INFO, AdvertiserService.class);
			}
		}
		
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Apply success.",LOGLEVEL_INFO, AdvertiserService.class);
		rt.setMsg(reqCt.getMessage("apply.advertiser.tip.success"));
		rt.setSuccess(true);
		writeJSON(res, rt);
	}
	
	
}
