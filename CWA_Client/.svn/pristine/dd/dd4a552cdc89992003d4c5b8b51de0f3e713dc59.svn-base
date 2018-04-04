package com.cwa.client.web.app;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cwa.client.constant.AppConatnt;
import com.cwa.client.constant.AppRetunCode;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.GobalProperties;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.Tools;
import com.cwa.client.utils.ipUtil;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;

@Controller
@RequestMapping("/app/cfg")
public class ConfigController  extends BaseController<GobalRespParameter> implements Constant,AppConatnt {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 获取版本号
	 */
	@RequestMapping(value="/versionNumber/cm.do")
	public void versionNumber(HttpServletRequest req,HttpServletResponse res){
		try {
			// 获取IP
			String ip = ipUtil.getIpAddress(req);
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Ip "+ip+" get version number.", LOGLEVEL_INFO, ConfigController.class);
			// 获取登录类型
			String strType = ServletRequestUtils.getStringParameter(req, "type","");
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login type is "+strType+".", LOGLEVEL_INFO, AccountController.class);
			int intType = 0;
			try {
				intType = Integer.parseInt(strType);
			} catch (Exception e) {
				intType = 0;
			}
			if(intType!=LOGIN_TYPE_IOS&&intType!=LOGIN_TYPE_ANDROID){
				// 未知异常
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login type illegal.", LOGLEVEL_INFO, AccountController.class);
				responseJSON(res,Tools.returnObj(AppRetunCode.LOGIN_TYPE_ILLEGAL.getCode(), AppRetunCode.LOGIN_TYPE_ILLEGAL.getDescribe()));
				return;
			}
			if(intType == LOGIN_TYPE_IOS){
				responseJSON(res,Tools.returnObj(AppRetunCode.SUCCESS.getCode(), "{\"version\":\""+GobalProperties.getGobalConfig().getValueByKey("ios_version")+"\",\"appId\":\""+GobalProperties.getGobalConfig().getValueByKey("appId")+"\"}"));
			}else if(intType == LOGIN_TYPE_ANDROID){
				responseJSON(res,Tools.returnObj(AppRetunCode.SUCCESS.getCode(), "{\"version\":\""+GobalProperties.getGobalConfig().getValueByKey("android_version")+"\"}"));
			}
		} catch (Exception e) {
			// 未知异常
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, AccountController.class);
			e.printStackTrace();
			responseJSON(res,Tools.returnObj(AppRetunCode.FAILD.getCode(), AppRetunCode.FAILD.getDescribe()));
		}
	}
}
