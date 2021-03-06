package com.cwa.client.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.redis.UserRedis;
import com.cwa.client.service.UserService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.HttpUtil;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.UniqId;
import com.cwa.client.utils.WeChatUtil;
import com.cwa.client.web.nettytcpsocket.PayUtil;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/*/exclude/weChat")
public class WeChatController extends BaseController<GobalRespParameter> implements Constant {


	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource// 普通用户service层
	private UserService userService;
	
	@Resource
	private UserRedis userRedis;
	
	@RequestMapping("/openIdCallBack.do")
	public void openIdCallBack(HttpServletRequest req,HttpServletResponse res) throws Exception{
		// 获取CODE
		String code = ServletRequestUtils.getStringParameter(req, "code","");
		/*// 获取需要跳转的URL
		String url = ServletRequestUtils.getStringParameter(req, "url","");*/
		// openId获取
		String openIdUrl = API_OPENID.replace("APPID", APPID).replace("AppSecret", APPSECRET).replace("CODE", code);
		String resText = HttpUtil.sendGet(openIdUrl);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Get openId return "+resText, LOGLEVEL_INFO, WeChatController.class);
		JSONObject jsonTexts = JSONObject.fromObject(resText);
		// openId
		Object obj = jsonTexts.get("openid");
		if(obj!=null){
			String openId=obj.toString();
			if(!RegUtil.getUtil().isNull(openId)){
				// sessionUser
				CustomerDto sessionUserCustomerDto = (CustomerDto) req.getSession().getAttribute(SESSION_USER);
				String accountId=sessionUserCustomerDto.getAccount_id();
				// 记录session
				req.getSession().setAttribute(SESSION_USER_TYPE, sessionUserCustomerDto.getT_type());
				String userName = accountId+"("+"id="+sessionUserCustomerDto.getId()+",type="+sessionUserCustomerDto.getT_type()+")";
				req.getSession().setAttribute(SESSION_USER_NAME, userName);
				req.getSession().setAttribute(LOGINTYPE,FOUR);
				req.getSession().setAttribute(SESSION_USER_ACCOUNTID, accountId);//用户accountId
				req.getSession().setAttribute(PAGE_LOGIN_TYPE,ONE);
				String loginId =accountId;
				//登录用户编号
				if(sessionUserCustomerDto.getT_type()!=ONE){
					loginId = userService.queryLoginIdByAccountId(accountId,sessionUserCustomerDto.getT_type().toString());
				}
				sessionUserCustomerDto.setLogin_id(loginId);
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "loginId:"+loginId+"======"+sessionUserCustomerDto.getLogin_id(), LOGLEVEL_INFO, UserController.class);
				
				// continue TODO
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "openId"+openId, LOGLEVEL_INFO, WeChatController.class);
				sessionUserCustomerDto.setOpenid(openId);
				userService.updateOpenId(sessionUserCustomerDto.getAccount_id(),openId);
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "customer:"+sessionUserCustomerDto, LOGLEVEL_INFO, WeChatController.class);
				req.getSession().setAttribute(SESSION_OPENID,openId);
				req.getSession().setAttribute(SESSION_USER,sessionUserCustomerDto);
			}
		}
		res.sendRedirect("/chinese/mobile/html/index.html");
	}
	
	@RequestMapping("/autoLoginOpenIdCallBack.do")
	public void autoLoginOpenIdCallBack(HttpServletRequest req,HttpServletResponse res) throws Exception{
		// 获取CODE
		String code = ServletRequestUtils.getStringParameter(req, "code","");
		/*// 获取需要跳转的URL
		String url = ServletRequestUtils.getStringParameter(req, "url","");*/
		// openId获取
		String openIdUrl = API_OPENID.replace("APPID", APPID).replace("AppSecret", APPSECRET).replace("CODE", code);
		String resText = HttpUtil.sendGet(openIdUrl);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Get openId return "+resText, LOGLEVEL_INFO, WeChatController.class);
		JSONObject jsonTexts = JSONObject.fromObject(resText);
		// openId
		Object obj = jsonTexts.get("openid");
		if(obj!=null){
			String openId=obj.toString();
			if(!RegUtil.getUtil().isNull(openId)){
				CustomerDto sessionUserCustomerDto = userService.queryCustomerByOpenid(openId);
				if(sessionUserCustomerDto!=null&&sessionUserCustomerDto.getUser_status()==TWO){
					String accountId=sessionUserCustomerDto.getAccount_id();
					// 记录session
					req.getSession().setAttribute(SESSION_USER_TYPE, sessionUserCustomerDto.getT_type());
					String userName = accountId+"("+"id="+sessionUserCustomerDto.getId()+",type="+sessionUserCustomerDto.getT_type()+")";
					req.getSession().setAttribute(SESSION_USER_NAME, userName);
					req.getSession().setAttribute(LOGINTYPE,FOUR);
					req.getSession().setAttribute(SESSION_USER_ACCOUNTID, accountId);//用户accountId
					req.getSession().setAttribute(PAGE_LOGIN_TYPE,ONE);
					String loginId =accountId;
					//登录用户编号
					if(sessionUserCustomerDto.getT_type()!=ONE){
						loginId = userService.queryLoginIdByAccountId(accountId,sessionUserCustomerDto.getT_type().toString());
					}
					sessionUserCustomerDto.setLogin_id(loginId);
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "loginId:"+loginId+"======"+sessionUserCustomerDto.getLogin_id(), LOGLEVEL_INFO, UserController.class);
					
					// continue TODO
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "openId"+openId, LOGLEVEL_INFO, WeChatController.class);
					sessionUserCustomerDto.setOpenid(openId);
					userService.updateOpenId(sessionUserCustomerDto.getAccount_id(),openId);
					logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "customer:"+sessionUserCustomerDto, LOGLEVEL_INFO, WeChatController.class);
					req.getSession().setAttribute(SESSION_OPENID,openId);
					req.getSession().setAttribute(SESSION_USER,sessionUserCustomerDto);
				}
			}
		}
		res.sendRedirect("/chinese/mobile/html/index.html");
	}
	
	@RequestMapping("/getShareInfo.do")
	public void chatShareInfo(HttpServletRequest req,HttpServletResponse res)throws Exception {
		// 返回消息的dto
		 RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		try {
			PayUtil payUtil=new PayUtil(null);
			Map<String, String> shareMap=new HashMap<String, String>();
			shareMap.put("noncestr", UniqId.getRandomStr(30));
			shareMap.put("jsapi_ticket", WeChatUtil.getJsapiTicket(userRedis));
			shareMap.put("timestamp", String.valueOf(System.currentTimeMillis()/1000));
			shareMap.put("url", req.getParameter("curryUrl"));
			System.out.println(" jsapi_ticket "+shareMap.get("jsapi_ticket")+"  url  "+shareMap.get("url"));
			String str=payUtil.getSignStr(shareMap,null);
			shareMap.put("signature", payUtil.getShar1Str(str));
			 
			shareMap.put("appid", APPID);
			
			shareMap.remove("jsapi_ticket");
			shareMap.remove("url");
			ruturnMessageDto.setSuccess(true);
			ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());
			ruturnMessageDto.setData(GsonUtil.dtoToJson(shareMap));
		} catch (Exception e) {
			ruturnMessageDto.setSuccess(false);
			ruturnMessageDto.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		this.writeJSON(res, ruturnMessageDto);
	}
	
	/**
	 * 第三方登录授权
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/thirdPartLogin.do")
	public void thirdPartLogin(HttpServletRequest req,HttpServletResponse res)throws Exception {
		try {
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "request url: thirdPartLogin.do ===redictUrl:"+req.getParameter("redictUrl"), LOGLEVEL_INFO, WeChatController.class);
			res.sendRedirect(WeChatUtil.getThirdLoginUrl(req.getParameter("redictUrl")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
