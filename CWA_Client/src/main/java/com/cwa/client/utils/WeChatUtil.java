package com.cwa.client.utils;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;

import com.cwa.client.redis.UserRedis;

import net.sf.json.JSONObject;

/**
 * 微信相关
 */
public class WeChatUtil implements Constant{

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	private static final String ACCESS_TOKEN = "accessToken";
	
	private static final String THIRDLOGIN_ACCESS_TOKEN = "thirdAccessToken";
	
	private static final String JSAPI_TICKET = "jsapiTicket";
	
	/**
	 * 获取ACCESS_TOKEN URL
	 */
	private static final String API_ACCESS_TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
	
	/**
	 * 获取JSAPI_TICKET URL
	 */
	private static final String API_JSAPI_TICKET = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
	
	/**
	 * 第三方登录授权（获取code）pc
	 */
	private static final String THIRD_PART_LOGIN = "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
	
	/**
	 * 第三方登录授权（获取code）微信
	 */
	private static final String THIRD_PART_MOBILE_LOGIN = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
	
	
	/**
	 * 第三方登录授权（获取access_token）
	 */
	private static final String THIRD_PART_LOGIN_ACCESSTOKEN = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
	
	/**
	 * 5400秒，90分钟
	 */
	private static final int SECONDS_5400 = 5400;
	
	/**
	 * 获取openId的code的URL
	 * @param req
	 * @throws Exception
	 */
	public static String getOpenIdCodeUrl(HttpServletRequest req) throws Exception{
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Getting openId code url...", LOGLEVEL_INFO, WeChatUtil.class);
		
		// 接收用于获取openId的code的URL
		String receiveCodeUrl = req.getScheme()+"://"+req.getServerName()+"/chinese/exclude/weChat/openIdCallBack.do";
		
		// 获取openId的code的URL
		String getOpenIdCodeUrl = API_OPENID_CODE.replace("APPID", APPID).replace("REDIRECT_URI", URLEncoder.encode(receiveCodeUrl, "UTF-8"));

		logWriteUtil.writeLog(LOGTYPE_UTIL, "openId code url is"+getOpenIdCodeUrl, LOGLEVEL_INFO, WeChatUtil.class);
		
		return getOpenIdCodeUrl;
	}
	
	/**
	 * 获取openId的code的URL
	 * @param req
	 * @throws Exception
	 */
	public static String getAutoLoginOpenIdCodeUrl(HttpServletRequest req) throws Exception{
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Getting openId code url...", LOGLEVEL_INFO, WeChatUtil.class);
		
		// 接收用于获取openId的code的URL
		String receiveCodeUrl = req.getScheme()+"://"+req.getServerName()+"/chinese/exclude/weChat/autoLoginOpenIdCallBack.do";
		
		// 获取openId的code的URL
		String getOpenIdCodeUrl = API_OPENID_CODE.replace("APPID", APPID).replace("REDIRECT_URI", URLEncoder.encode(receiveCodeUrl, "UTF-8"));

		logWriteUtil.writeLog(LOGTYPE_UTIL, "openId code url is"+getOpenIdCodeUrl, LOGLEVEL_INFO, WeChatUtil.class);
		
		return getOpenIdCodeUrl;
	}
	
	/**
	 * 获取jsapi_ticket
	 * jsapi_ticket是公众号用于调用微信JS接口的临时票据
	 * @param userRedis
	 * @return
	 */
	public static synchronized String getJsapiTicket(UserRedis userRedis){
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Getting jsapi ticket...", LOGLEVEL_INFO, WeChatUtil.class);
		
		// 判断REDIS是否存在
		Object  jsapiTicket = userRedis.getObj(JSAPI_TICKET);
		
		// 如果不存在则调用API获取
		if(jsapiTicket == null || jsapiTicket.toString().equals("")){

			logWriteUtil.writeLog(LOGTYPE_UTIL, "Jsapi ticket lose efficacy", LOGLEVEL_INFO, WeChatUtil.class);
			
			String resText = HttpUtil.sendGet(API_JSAPI_TICKET.replace("ACCESS_TOKEN", WeChatUtil.getAccessToken(userRedis)));
			
			logWriteUtil.writeLog(LOGTYPE_UTIL, "Response text is "+resText, LOGLEVEL_INFO, WeChatUtil.class);
			
			JSONObject json = JSONObject.fromObject(resText);
			
			jsapiTicket = json.getString("ticket");
			
			// 刷新REDIS的JSAPI TICKET
			userRedis.set(JSAPI_TICKET, jsapiTicket, SECONDS_5400);

			logWriteUtil.writeLog(LOGTYPE_UTIL, "Refresh redis jsapi ticket success", LOGLEVEL_INFO, WeChatUtil.class);
		}
		
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Jsapi ticket is "+jsapiTicket, LOGLEVEL_INFO, WeChatUtil.class);
		
		return jsapiTicket.toString();
	}
	
	/**
	 * 获取access_token 
	 * access_token是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用access_token
	 * @param userRedis
	 * @return
	 */
	public static synchronized String getAccessToken(UserRedis userRedis){
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Getting access token...", LOGLEVEL_INFO, WeChatUtil.class);
		
		// 判断REDIS是否存在
		Object  accessToken = userRedis.getObj(ACCESS_TOKEN);
		
		// 如果不存在则调用API获取
		if(accessToken == null || accessToken.toString().equals("")){

			logWriteUtil.writeLog(LOGTYPE_UTIL, "Access token lose efficacy", LOGLEVEL_INFO, WeChatUtil.class);
			
			String resText = HttpUtil.sendGet(API_ACCESS_TOKEN.replace("APPID", APPID).replace("APPSECRET", APPSECRET));
			
			logWriteUtil.writeLog(LOGTYPE_UTIL, "Response text is "+resText, LOGLEVEL_INFO, WeChatUtil.class);
			
			JSONObject json = JSONObject.fromObject(resText);
			
			accessToken = json.getString("access_token");
			
			// 刷新REDIS的Access token
			userRedis.set(ACCESS_TOKEN, accessToken, SECONDS_5400);

			logWriteUtil.writeLog(LOGTYPE_UTIL, "Refresh redis access token success", LOGLEVEL_INFO, WeChatUtil.class);
		}
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Access token is "+accessToken, LOGLEVEL_INFO, WeChatUtil.class);
		
		return accessToken.toString();
	}
	
	public static String getThirdLoginUrl(String redirectUrl) throws Exception{
		redirectUrl=URLEncoder.encode("https://www.luckicloud.com/chinese/exclude/payMobile/alipayReturnUrl.do","utf-8");
		//String redirectUrl="/chinese/mobile/html/index.html";
		//获取登录授权url
		String url="weixin://"+THIRD_PART_MOBILE_LOGIN.replace("APPID", LOGINAPPID).replace("REDIRECT_URI", redirectUrl).replace("STATE", UniqId.getallSymbolArrayStr(16));
		logWriteUtil.writeLog(LOGTYPE_UTIL, "getThirdLoginUrl url: "+url, LOGLEVEL_INFO, WeChatUtil.class);
		return url;
	}
	
	public static String getThirdLoginAccessToken(UserRedis userRedis,String code) throws Exception{
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Getting third login access token...", LOGLEVEL_INFO, WeChatUtil.class);
		
		// 判断REDIS是否存在   //THIRDLOGIN_ACCESS_TOKEN redis key
		//Object  accessToken = userRedis.getObj(THIRDLOGIN_ACCESS_TOKEN);
		
		// 如果不存在则调用API获取

		String url=THIRD_PART_LOGIN_ACCESSTOKEN.replace("APPID", LOGINAPPID).replace("SECRET", LOGINAPPSECRET).replace("CODE",code);
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "getThirdLoginUrl url: "+url, LOGLEVEL_INFO, WeChatUtil.class);
		
		String resText = HttpUtil.sendGet(url);
		
		logWriteUtil.writeLog(LOGTYPE_UTIL, "Response text is "+resText, LOGLEVEL_INFO, WeChatUtil.class);
		
		return resText;
		
	}
}
