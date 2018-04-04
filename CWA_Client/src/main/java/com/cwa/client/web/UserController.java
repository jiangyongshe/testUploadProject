package com.cwa.client.web;

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.AdvertiseOrderDao;
import com.cwa.client.dao.AdvertiserDao;
import com.cwa.client.dao.BuyInformationDao;
import com.cwa.client.dao.CustomerDao;
import com.cwa.client.dto.AdvertiserDto;
import com.cwa.client.dto.AgentDto;
import com.cwa.client.dto.BranchDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.OrderDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.dto.SalesPersonDto;
import com.cwa.client.dto.SalesmanDto;
import com.cwa.client.model.Tb_Advertiser;
import com.cwa.client.model.Tb_Customer;
import com.cwa.client.model.Tb_Order;
import com.cwa.client.model.Tb_Partner;
import com.cwa.client.model.Tb_buy_information;
import com.cwa.client.redis.RegPhoneRandomNumDto;
import com.cwa.client.redis.UserRedis;
import com.cwa.client.service.AdvertiserService;
import com.cwa.client.service.AgentService;
import com.cwa.client.service.PartnerService;
import com.cwa.client.service.SalesmanService;
import com.cwa.client.service.ShoppCartService;
import com.cwa.client.service.UserService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.GobalProperties;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.HttpUtil;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.Tools;
import com.cwa.client.utils.UniqId;
import com.cwa.client.utils.WeChatUtil;
import com.cwa.client.utils.ipUtil;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/*/user/")
public class UserController extends BaseController<GobalRespParameter> implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private UserRedis userRedis;
	
	@Resource// 普通用户service层
	private UserService userService;
	
	@Resource//代理service层
	private AgentService agentService;
	
	@Resource//合伙人service层
	private PartnerService partnerService;
	
	@Resource//销售员service层
	private SalesmanService salesmanService;
	
	@Resource// 广告商service层
	private AdvertiserService advertiserService;
	
	@Resource// 广告商数据层
	private AdvertiserDao advertiserDao;
	
	@Resource// 普通用户数据层
	private CustomerDao customerDao;
	
	@Resource// 广告求购信息
	private BuyInformationDao buyInformationDao;
	
	@Resource// 购物车
	private ShoppCartService shoppCartService;
	
	@Resource
	private AdvertiseOrderDao advertiseOrderDao;
	
	/**
	 * 加载用户信息
	 * @throws Exception
	 */
	@RequestMapping("/loadUser.do")
	public void loadUserMsg(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的DTO
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		// 返回用户信息
		Map<String,Object> map = new HashMap<String,Object>();
		// 系统时间
		map.put("nowTime", new Date().getTime());
		// 加载图片的地址
		map.put("imagePath", GobalProperties.getGobalConfig().getValueByKey("imagePath"));
		// 加载视频的地址
		map.put("videoUrl", GobalProperties.getGobalConfig().getValueByKey("videoUrl"));
		// 加载消息公告web socket的地址
		map.put("noticeWSAddress", GobalProperties.getGobalConfig().getValueByKey("noticeWSAddress"));
		// 判断用户是否登录
		HttpSession session = req.getSession();
		Object sessionObj = session.getAttribute(SESSION_USER);
		if(session.getAttribute(SESSION_USER_TYPE)==null||sessionObj==null){
			ruturnMessageDto.setMsg(RespCodeEnum.global_session_expiration.getCode());
			ruturnMessageDto.setData(map);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		CustomerDto sessionUser = (CustomerDto)sessionObj;
		String accountId = sessionUser.getAccount_id();
		Object userObj = userService.queryUserObjByAccountIdAndUserType(accountId, USERTYPE_CUSTOMER);
		
		Field loginIdField = userObj.getClass().getDeclaredField("login_id");//用户编号
		loginIdField.setAccessible(true);
		loginIdField.set(userObj, sessionUser.getLogin_id());
		
		Field shoppCount = userObj.getClass().getDeclaredField("shoppCount");//购物车数量
		shoppCount.setAccessible(true);
		shoppCount.set(userObj, shoppCartService.findShopCartCountByAccountId(accountId));
		
		//t_type
		Field TTypeField = userObj.getClass().getDeclaredField("t_type");
		TTypeField.setAccessible(true);
		String userType = TTypeField.get(userObj).toString();
		
		Field mobileField = userObj.getClass().getDeclaredField("mobile");
		mobileField.setAccessible(true);
		Field fullMbField = userObj.getClass().getDeclaredField("fullMb");
		fullMbField.setAccessible(true);
		fullMbField.set(userObj, mobileField.get(userObj).toString());
		
		String loginType= req.getSession().getAttribute(LOGINTYPE).toString();
		Field loginTypeField = userObj.getClass().getDeclaredField("loginType");
		loginTypeField.setAccessible(true);
		loginTypeField.set(userObj, loginType);
		
		mobileField.set(userObj, mobileField.get(userObj).toString().substring(mobileField.get(userObj).toString().length()-FOUR));
		req.getSession().setAttribute(SESSION_USER, userObj);
		req.getSession().setAttribute(SESSION_USER_TYPE, userType);
		ruturnMessageDto.setMsg(userType);
		map.put("userData", userObj);
		map.put("sessionId", req.getSession().getId());
		ruturnMessageDto.setData(map);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "get user info success "+GsonUtil.dtoToJson(userObj), LOGLEVEL_INFO, UserController.class);
		this.writeJSON(res, ruturnMessageDto);
	}
	
	/**
	 * 登录
	 * @throws Exception
	 */
	@RequestMapping("/login.do")
	public void login(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的DTO
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		// 获取请求参数
		String accountId = ServletRequestUtils.getStringParameter(req, "accountId","").trim();
		String pwd = ServletRequestUtils.getStringParameter(req, "pwd","").trim();
		// 返回消息语言包
		RequestContext reqCt= new RequestContext(req);
		// 验证登录号是否为空
		if(accountId.equals("")){
			String accountIdEmpty = reqCt.getMessage("login.tip.accountIdEmpty");
			ruturnMessageDto.setMsg(accountIdEmpty);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login accountId is "+accountId, LOGLEVEL_INFO, UserController.class);
		// 验证密码是否为空
		if(pwd.equals("")){
			String passwordEmpty = reqCt.getMessage("login.tip.passwordEmpty");
			ruturnMessageDto.setMsg(passwordEmpty);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login password is "+Encypter.getEncryptValue(pwd), LOGLEVEL_INFO, UserController.class);
		// 根据用户登录账号和用户类型查询用户
		Object userObj = userService.queryUserObjByAccountIdAndUserType(accountId, USERTYPE_CUSTOMER);
		if(userObj==null){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login accountId not exist.", LOGLEVEL_INFO, UserController.class);
			// 账号错误
			String accountIdOrPwdMistake = reqCt.getMessage("login.tip.accountIdOrPwdMistake");
			ruturnMessageDto.setMsg(accountIdOrPwdMistake);
			// 返回
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断该用户是否禁用
		Field userStatusField = userObj.getClass().getDeclaredField("user_status");
		userStatusField.setAccessible(true);
		Integer userStatus = Integer.parseInt(userStatusField.get(userObj).toString());
		if(userStatus==ONE){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Login accountId forbidden.", LOGLEVEL_INFO, UserController.class);
			// 账号被禁用
			String accountIdForbidden = reqCt.getMessage("login.tip.accountIdForbidden");
			ruturnMessageDto.setMsg(accountIdForbidden);
			// 返回
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 解密查询出来的密码
		Field pwdField = userObj.getClass().getDeclaredField("password");
		pwdField.setAccessible(true);
		String queryPwd = Encypter.getDecryptValue(pwdField.get(userObj).toString());
		// 判断密码是否一致
		if(pwd.equals(queryPwd)){// 密码正确
			// ID field
			Field idField = userObj.getClass().getDeclaredField("id");
			idField.setAccessible(true);
			
			//t_type
			Field TTypeField = userObj.getClass().getDeclaredField("t_type");
			TTypeField.setAccessible(true);
			String loginId =accountId;
			//登录用户编号
			if(Integer.parseInt(TTypeField.get(userObj).toString())!=ONE){
				loginId = userService.queryLoginIdByAccountId(accountId,TTypeField.get(userObj).toString());
			}
			Field loginIdField = userObj.getClass().getDeclaredField("login_id");//用户编号
			loginIdField.setAccessible(true);
			loginIdField.set(userObj, loginId);
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "loginId:"+loginId+"======"+loginIdField.get(userObj).toString(), LOGLEVEL_INFO, UserController.class);
			// 记录session
			req.getSession().setAttribute(SESSION_USER, userObj);
			req.getSession().setAttribute(SESSION_USER_ACCOUNTID, accountId);//用户accountId
			req.getSession().setAttribute(SESSION_USER_TYPE, TTypeField.get(userObj));
			ruturnMessageDto.setMsg(TTypeField.get(userObj).toString());
			/*// 判断该用户是否激活为店主
			String userTypeName = null;
			if(userService.queryUserObjByAccountIdAndUserType(accountId, USERTYPE_CUSTOMER_ADVERTISER)==null){
				// 如果没有激活则用户类型为广告主
				req.getSession().setAttribute(SESSION_USER_TYPE, USERTYPE_CUSTOMER);
				ruturnMessageDto.setMsg(USERTYPE_CUSTOMER);
				userTypeName = "customer";
			}else{
				// 如果激活则用户类型为店主+广告主
				ruturnMessageDto.setMsg(USERTYPE_CUSTOMER_ADVERTISER);
				req.getSession().setAttribute(SESSION_USER_TYPE, USERTYPE_CUSTOMER_ADVERTISER);
				userTypeName = "customer && advertiser";
			}*/
			// user name
			String userName = accountId+"("+"id="+idField.get(userObj)+",type="+TTypeField.get(userObj)+")";
			req.getSession().setAttribute(SESSION_USER_NAME, userName);
			req.getSession().setAttribute(LOGINTYPE,Tools.checkLoginType(req, req.getParameter("loginType")));
			if(req.getParameter("mobileLoginPage")!=null){
				req.getSession().setAttribute(PAGE_LOGIN_TYPE,req.getParameter("mobileLoginPage"));
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobileLoginPage:"+req.getParameter("mobileLoginPage"), LOGLEVEL_INFO, UserController.class);
			}
			if("4".equals(req.getSession().getAttribute(LOGINTYPE).toString())){
				Field openIdField = userObj.getClass().getDeclaredField("openid");
				openIdField.setAccessible(true);
				String url=WeChatUtil.getOpenIdCodeUrl(req);
				ruturnMessageDto.setSuccess(true);
				ruturnMessageDto.setData(url);
				this.writeJSON(res, ruturnMessageDto);
				return;
				/*if(util.isNull(openIdField.get(userObj).toString())){
					String url=WeChatUtil.getOpenIdCodeUrl(req);
					ruturnMessageDto.setSuccess(true);
					ruturnMessageDto.setData(url);
					this.writeJSON(res, ruturnMessageDto);
					return;
				}else{
					req.getSession().setAttribute(SESSION_OPENID,openIdField.get(userObj).toString());
				}*/
			}
			// 返回
			ruturnMessageDto.setSuccess(true);
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" login success.", LOGLEVEL_INFO, UserController.class);
			this.writeJSON(res, ruturnMessageDto);
		}else{
			// 密码错误
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Password mistake.", LOGLEVEL_INFO, UserController.class);
			String accountIdOrPwdMistake = reqCt.getMessage("login.tip.accountIdOrPwdMistake");
			ruturnMessageDto.setMsg(accountIdOrPwdMistake);
		}
		// 返回
		this.writeJSON(res, ruturnMessageDto);
	}
	
	
	
	/**
	 * 微信公众号自动登录
	 * @throws Exception
	 */
	@RequestMapping("/wechatAutoLogin.do")
	public void wechatAutoLogin(HttpServletRequest req, HttpServletResponse res) throws Exception{
		String url=WeChatUtil.getAutoLoginOpenIdCodeUrl(req);
		res.sendRedirect(url);
	}
	
	/**
	 * 退出登录
	 * @throws Exception
	 */
	@RequestMapping("/exit.do")
	public void exit(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		Object objUserName = req.getSession().getAttribute(SESSION_USER_NAME);
		String accountId=req.getSession().getAttribute(SESSION_USER_ACCOUNTID).toString();//用户accountId
		if("4".equals(req.getSession().getAttribute(LOGINTYPE).toString())){//如果在微信中解绑当前openId
			userService.updateOpenId(accountId,"");
		}
		if(objUserName==null){
			parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			writeJSON(res, parameter);
			parameter=null;
			return;
		}
		String userName = objUserName.toString();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "User "+userName+" exit .", LOGLEVEL_INFO, UserController.class);
		// 清除session
		req.getSession().invalidate();
		parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
		writeJSON(res, parameter);
		parameter=null;
	}
	
	/**
	 * 获取手机验证码(忘记密码时调用的方法)
	 * @throws Exception
	 */
	@RequestMapping("/getMobileVerification.do")
	public void getMobileVerificationForForget (HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		// 获取手机号码
		String mobile = ServletRequestUtils.getStringParameter(req, "mobile","").trim();
		// 返回消息
		RequestContext reqCt= new RequestContext(req);// 语言包
		// 验证手机号是否为空
		if(mobile.equals("")){
			String mobileEmpty = reqCt.getMessage("forgetPwd.tip.mobileEmpty");
			ruturnMessageDto.setMsg(mobileEmpty);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 验证手机号是否合法
		if(!Pattern.matches(REG_POSITIVE_MOBILE, mobile)){
			String mobileWrong = reqCt.getMessage("forgetPwd.tip.mobileWrong");
			ruturnMessageDto.setMsg(mobileWrong);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" query data.", LOGLEVEL_INFO, UserController.class);
		// 根据用户手机号和角色类型查询改用户是否存在
		Object obj = userService.getUser(mobile, USERTYPE_CUSTOMER);
		// 手机号不存在
		if(obj==null){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" is not exist.", LOGLEVEL_INFO, UserController.class);
			String mobileNotExist = reqCt.getMessage("forgetPwd.tip.mobileNotExist");
			ruturnMessageDto.setMsg(mobileNotExist);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断该手机是否发送过验证码
		String redisKey = FORGET_PWD+mobile;
		Object phoneVerificationObj = userRedis.getObj(redisKey);
		if(
		   // 未发送验证码
		   phoneVerificationObj==null
				||
		   // 已经过期
		   (System.currentTimeMillis()-((RegPhoneRandomNumDto)phoneVerificationObj).getTimeStamp())/1000>VERIFICATION_VALID_TIME
			){
			RegPhoneRandomNumDto regdto=new RegPhoneRandomNumDto();
			regdto.setVaildCode(UniqId.getRandomPwd(6));//生成验证码
			regdto.setMovePhone(mobile);
			regdto.setTimeStamp(new Date().getTime());
			if(sendMessage(ONE, regdto)){
				//把验证码对象放入redis
				userRedis.set(redisKey, regdto,VERIFICATION_REDIS_TIME);
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" get verification "+regdto.getVaildCode()+".", LOGLEVEL_INFO, UserController.class);
				// 将验证码对象返回
				String verificationSendSuccess = reqCt.getMessage("forgetPwd.tip.verificationSendSuccess");
				ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());
				ruturnMessageDto.setData(verificationSendSuccess+'-'+VERIFICATION_VALID_TIME);
				this.writeJSON(res, ruturnMessageDto);
				return;
			}else{
				ruturnMessageDto.setMsg(RespCodeEnum.register_mobile_invalidcode.getCode());
				ruturnMessageDto.setData(reqCt.getMessage("register.text.SendSMSFail"));
				this.writeJSON(res, ruturnMessageDto);
				return;
			}
			
		}
		// 验证码未过期
		String verificationValid = reqCt.getMessage("forgetPwd.tip.verificationValid");
		RegPhoneRandomNumDto regdto = (RegPhoneRandomNumDto)phoneVerificationObj;
		Long time = VERIFICATION_VALID_TIME - (System.currentTimeMillis()-regdto.getTimeStamp())/1000;
		ruturnMessageDto.setMsg(RespCodeEnum.update_password_verificationValid.getCode());
		ruturnMessageDto.setData(verificationValid+'-'+time);
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" repetition get verification,need wait "+time+" s.", LOGLEVEL_INFO, UserController.class);
		this.writeJSON(res, ruturnMessageDto);
		return;
	}
	
	/**
	 * 查询最新订单
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/queryNewestOrder.do")
	public void queryNewestOrder(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 获取分页参数
		String pageNo = ServletRequestUtils.getStringParameter(req, "pageNo","");
		String pageSize = ServletRequestUtils.getStringParameter(req, "pageSize","");
		Integer pageNoI = 0;
		try {
			pageNoI = Integer.parseInt(pageNo);
		} catch (Exception e) {
			pageNoI = 0;
		}
		Integer pageSizeI = 0;
		try {
			pageSizeI = Integer.parseInt(pageSize);
		} catch (Exception e) {
			pageSizeI = 0;
		}
		OrderDto orderDto = new OrderDto();
		if(pageNoI>0&&pageSizeI>0){
			orderDto.setPageNo(pageNoI);
			orderDto.setPageSize(pageSizeI);
		}
		List<Tb_Order> list = advertiseOrderDao.queryAllOrder(orderDto);
		// 隐藏accountId中间四位
		for(Tb_Order tbOrder : list){
			tbOrder.setAccount_id(tbOrder.getAccount_id().substring(ZERO,THREE)+"****"+tbOrder.getAccount_id().substring(SEVEN));
		}
		// 返回数据
		this.writeJSON(res, list);
	}
	
	/**
	 * 修改密码(忘记密码时调用的方法)
	 */
	@RequestMapping("/forgetPwdToUpdate.do")
	public void forgetPwdToUpdate(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		// 获取手机号码
		String mobile = ServletRequestUtils.getStringParameter(req, "mobile","").trim();
		// 获取修改类型
		String pwdType = ServletRequestUtils.getStringParameter(req, "type","").trim();
		// 获取验证码
		String verification = ServletRequestUtils.getStringParameter(req, "verification","").trim();
		// 获取新密码
		String pwd = ServletRequestUtils.getStringParameter(req, "pwd","").trim();
		// 返回消息
		RequestContext reqCt= new RequestContext(req);// 语言包
		// 验证手机号是否为空
		if(mobile.equals("")){
			String mobileEmpty = reqCt.getMessage("forgetPwd.tip.mobileEmpty");
			ruturnMessageDto.setMsg(mobileEmpty);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 验证手机号是否合法
		if(!Pattern.matches(REG_POSITIVE_MOBILE, mobile)){
			String mobileWrong = reqCt.getMessage("forgetPwd.tip.mobileWrong");
			ruturnMessageDto.setMsg(mobileWrong);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断验证码是否为空
		if(verification.equals("")){
			ruturnMessageDto.setMsg(reqCt.getMessage("forgetPwd.tip.verificationEmpty"));
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断新密码是否为空
		if(pwd.equals("")){
			ruturnMessageDto.setMsg(reqCt.getMessage("forgetPwd.tip.pwdEmpty"));
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile"+mobile+" update password by verification.", LOGLEVEL_INFO, UserController.class);
		// 根据用户手机号和角色类型查询改用户是否存在
		Object obj = userService.getUser(mobile, USERTYPE_CUSTOMER);
		// 手机号不存在
		if(obj==null){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" is not exist.", LOGLEVEL_INFO, UserController.class);
			String mobileNotExist = reqCt.getMessage("forgetPwd.tip.mobileNotExist");
			ruturnMessageDto.setMsg(mobileNotExist);
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断验证码是否正确
		String redisKey = FORGET_PWD+mobile;
		if("1".equals(pwdType)){
			redisKey=FORGET_WITHDRAW_PWD+mobile;
		}
		Object phoneVerificationObj = userRedis.getObj(redisKey);
		if(
		   // 未发送验证码
		   phoneVerificationObj==null
			  ||
		   // 验证码不一致
		   !verification.equals(((RegPhoneRandomNumDto)phoneVerificationObj).getVaildCode())
		){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" input verification("+verification+") in vain.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("forgetPwd.tip.verificationMistake"));
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		if( // 已经过期
			(System.currentTimeMillis()-((RegPhoneRandomNumDto)phoneVerificationObj).getTimeStamp())/1000>VERIFICATION_VALID_TIME
			){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" input verification("+verification+") in vain.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("register.text.invalidcode"));
			this.writeJSON(res, ruturnMessageDto);
			return;
		}
		// 获取accountId
		Field accountIdField = obj.getClass().getDeclaredField("account_id");
		accountIdField.setAccessible(true);
		if("1".equals(pwdType)){
			CustomerDto cDto = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
			if(!cDto.getAccount_id().equals(accountIdField.get(obj).toString())){
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "currAccountId:"+cDto.getAccount_id()+"===upAccountId:"+accountIdField.get(obj).toString(), LOGLEVEL_INFO, UserController.class);
				ruturnMessageDto.setMsg(reqCt.getMessage("withdraw.updpwd.different.mobileAndAccount"));
				this.writeJSON(res, ruturnMessageDto);
				return;
			}
			// 修改密码
			userService.updateWPWD(accountIdField.get(obj).toString(),Encypter.getEncryptValue(pwd));
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" update password success.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());
			ruturnMessageDto.setData(reqCt.getMessage("forgetPwd.tip.updatePwdSuccess"));
			this.writeJSON(res, ruturnMessageDto);
		}else{
			// 修改密码(用户表和广告表同时修改)
			boolean status_C = userService.updatePwdByAccountIdAndUserType(accountIdField.get(obj).toString(), pwd, USERTYPE_CUSTOMER);
			boolean status_C_AD = userService.updatePwdByAccountIdAndUserType(accountIdField.get(obj).toString(), pwd, USERTYPE_CUSTOMER_ADVERTISER);
			if(status_C&&status_C_AD){
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" update password success.", LOGLEVEL_INFO, UserController.class);
				ruturnMessageDto.setMsg(RespCodeEnum.SUCCESS.getCode());
				ruturnMessageDto.setData(reqCt.getMessage("forgetPwd.tip.updatePwdSuccess"));
				this.writeJSON(res, ruturnMessageDto);
			}else{
				logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobile "+mobile+" update password fail.", LOGLEVEL_INFO, UserController.class);
				ruturnMessageDto.setMsg(reqCt.getMessage("forgetPwd.tip.updatePwdFail"));
				this.writeJSON(res, ruturnMessageDto);
			}
		}
	}
	
	
	
	/**
	 * 发布求购信息
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/issueMsg.do")
	public void issueMsg(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 语言包
		RequestContext reqCt= new RequestContext(req);
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();	
		// 获取页面参数
		String company = ServletRequestUtils.getStringParameter(req,"company","").trim();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "company:"+company, LOGLEVEL_INFO, UserController.class);
		if(company==null||company.equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "company is empty.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.company.empty"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断长度是否过长
		if(company.length()>40){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "company too long.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.company.tooLong"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		String budget = ServletRequestUtils.getStringParameter(req,"budget","").trim();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "budget:"+budget, LOGLEVEL_INFO, UserController.class);
		if(budget==null||budget.equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "budget is empty", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.budget.empty"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断长度是否过长
		if(budget.length()>10){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "budget too long.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.budget.tooLong"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		String contacts = ServletRequestUtils.getStringParameter(req,"contacts","").trim();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contacts:"+contacts, LOGLEVEL_INFO, UserController.class);
		if(contacts==null||contacts.equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contacts is empty", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.contacts.empty"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断长度是否过长
		if(contacts.length()>20){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contacts too long.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.contacts.tooLong"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		String contactWay = ServletRequestUtils.getStringParameter(req,"contactWay","").trim();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contactWay:"+contactWay, LOGLEVEL_INFO, UserController.class);
		if(contactWay==null||contactWay.equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contactWay is empty", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.contactWay.empty"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断长度是否过长
		if(contactWay.length()<8||contactWay.length()>20){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "contactWay too long or short.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.contactWay.tooLong"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		String describe = ServletRequestUtils.getStringParameter(req,"describe","").trim();
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "describe:"+describe, LOGLEVEL_INFO, UserController.class);
		if(describe==null||describe.equals("")){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "describe is empty", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.describe.empty"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 判断长度是否过长
		if(describe.length()>40){
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "describe too long.", LOGLEVEL_INFO, UserController.class);
			ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.describe.tooLong"));
			writeJSON(res, ruturnMessageDto);
			return;
		}
		// 插入数据库
		Tb_buy_information entity = new Tb_buy_information();
		entity.setCompany_name(company);
		entity.setBudget(budget);
		entity.setContacts(contacts);
		entity.setContact_information(contactWay);
		entity.setInformation_desc(describe);
		entity.setOpen_date(new Timestamp(new Date().getTime()));
		buyInformationDao.insert(entity);
		// 返回
		logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "issue success.", LOGLEVEL_INFO, UserController.class);
		ruturnMessageDto.setMsg(reqCt.getMessage("askToBuy.tip.success"));
		ruturnMessageDto.setSuccess(true);
		writeJSON(res, ruturnMessageDto);
	}
	
	/**
	 * 注册
	 * @throws Exception
	 * 四种情况(1.无参数、2.referrals_id、3.agent_id、4.salesman_id)
	 */
	@RequestMapping("/registerUser.do")
	public void registerUser(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		Map<String,String[]> map = getAllParameter(req,"registerUser.do","mobile","validCode","passWord","passWord1","registerType");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String mobile=map.get("mobile")[0];//手机号
				if(util.isMobileNum(mobile)){
					Object userObj = userService.queryUserObjByAccountIdAndMobile(mobile);//查询手机是否已注册
					if(userObj==null){
						Object obj = userRedis.getObj(mobile);//redies 获取手机验证码
						RegPhoneRandomNumDto randomDto=null;
						if(obj!=null){
							randomDto=(RegPhoneRandomNumDto)obj;
							writeLog("", randomDto.toString(), LOGLEVEL_INFO, UserController.class);
						}
						if(randomDto==null||!map.get("validCode")[0].equals(randomDto.getVaildCode())){//判断验证码是是否正确
							parameter.setRespCode(RespCodeEnum.register_mobile_invaliderror.getCode());
							parameter.setRespMessge(reqCt.getMessage("register.text.invaliderror"));
							writeJSON(res, parameter);
							parameter=null;
							return;
						}
						if(System.currentTimeMillis()-randomDto.getTimeStamp()>(2*60*1000)){//判断验证码是否超过2分钟失效，如失效需要重新获取
							parameter.setRespCode(RespCodeEnum.register_mobile_invalidcode.getCode());
							parameter.setRespMessge(reqCt.getMessage("register.text.invalidcode"));
							writeJSON(res, parameter);
							parameter=null;
							return;
						}
						if(!map.get("passWord")[0].equals(map.get("passWord1")[0])){//判断两次密码是否一致
							parameter.setRespCode(RespCodeEnum.register_passWord_invaliderror.getCode());
							parameter.setRespMessge(reqCt.getMessage("register.text.passWordError"));
							writeJSON(res, parameter);
							parameter=null;
							return;
						}
						if("2".equals(map.get("registerType")[0])){//合伙人注册
							/*int count = partnerService.findAdminByAccountId(mobile);
							if(count>0){//判断手机号是否已注册
								parameter.setRespCode(RespCodeEnum.register_mobile_existed.getCode());
								parameter.setRespMessge(reqCt.getMessage("register.text.existed"));
								writeJSON(res, parameter);
								parameter=null;
								return;
							}
							String inviteCode=getParameter(req,"inviteCode");//邀请码
							writeLog("", "find admin by mobile listSize:"+count+"====inviteCode:"+inviteCode, LOGLEVEL_INFO, UserController.class);
							Tb_Partner entity=new Tb_Partner();
							entity.setAccount_id(mobile);
							entity.setPartner_name("");
							entity.setCertificate_type(1);
							entity.setId_number("");
							entity.setEmail("");
							entity.setUser_status(2);
							entity.setMobile(mobile);
							entity.setAudit_status(1);
							entity.setCommit_id("");
							entity.setCommit_time(new Timestamp(System.currentTimeMillis()));
							entity.setAudit_id("");
							entity.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
							entity.setSalesman_id(DEFALT_SALELMAN);//需要默认的
							entity.setP_id(0);
							entity.setPassword(Encypter.getEncryptValue(map.get("passWord")[0]));
							if(inviteCode!=null){
								if(inviteCode.length()==8){//合伙人链接注册
									Tb_Partner pEntity = partnerService.findById(Integer.parseInt(inviteCode));
									if(pEntity!=null){
										entity.setP_id(pEntity.getId());
										entity.setSalesman_id(pEntity.getSalesman_id());
									}
								}else if(inviteCode.length()==5){//业务员链接注册
									SalesmanDto sEntity = salesmanService.findBySalesmanid(inviteCode);
									if(sEntity!=null){
										entity.setSalesman_id(sEntity.getSalesman_id());
									}
								}
							}
							partnerService.registerPartner(entity);*/
						}else if("1".equals(map.get("registerType")[0])){
							Map<String,Object> paramMap = new HashMap<String,Object>();
							paramMap.put("mobile", map.get("mobile")[0]);
							paramMap.put("password", map.get("passWord")[0]);
							paramMap.put("inviteCode", getParameter(req,"inviteCode"));
							// 保存用户表信息
							saveCustomerInfo(paramMap);
						}
						parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
					}else{
						parameter.setRespCode(RespCodeEnum.register_mobile_existed.getCode());
						parameter.setRespMessge(reqCt.getMessage("register.text.existed"));
					}
				}else{//手机格式错误
					parameter.setRespCode(RespCodeEnum.register_mobile_formaterror.getCode());
					parameter.setRespMessge(reqCt.getMessage("register.text.formaterror"));
				}
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	//用户注册数据入库
	public void saveCustomerInfo(Map<String,Object> map) throws Exception {
		
		String mobile=map.get("mobile").toString();
		Tb_Customer entity=new Tb_Customer();
		entity.setAccount_id(mobile);
		entity.setCertificate_type(1);
		entity.setMobile(mobile);
		entity.setUser_status(TWO);
		entity.setOpen_date(new Timestamp(System.currentTimeMillis()));
		entity.setPassword(Encypter.getEncryptValue(map.get("password").toString()));
		entity.setAgent_id("");
		entity.setReferrals_id(DEFALT_SALELMAN);
		entity.setCompany_id("1");
		entity.setReferrals_type(7);
		entity.setPartner_id(""); 
		entity.setSalesman_id(DEFALT_SALELMAN);
		entity.setSalesperson_id("");
		entity.setSuperior(4);
		entity.setT_type(ONE);
		//邀请码
		Object inviteCodeObj = map.get("inviteCode");
		String inviteCode = "";
		if(inviteCodeObj!=null){
			inviteCode = inviteCodeObj.toString();
		}
		writeLog("", "reigster domestic consumer start!  inviteCode:"+inviteCode, LOGLEVEL_INFO, UserController.class);
		if(inviteCode!=null){
			if(inviteCode.indexOf("T")>=0||inviteCode.indexOf("C")>=0||inviteCode.length()==11){
				if(inviteCode.indexOf("T")>=0){//店主推荐
					Tb_Advertiser adEntity = advertiserService.findById(Integer.parseInt(inviteCode.replace("T", "")));
					if(adEntity!=null){
						entity.setReferrals_id(adEntity.getAccount_id()+"");
						entity.setSalesman_id(adEntity.getSalesman_id());
						entity.setCompany_id(adEntity.getCompany_id());
						entity.setAgent_id(adEntity.getAgent_id());
						entity.setPartner_id(adEntity.getPartner_id());
						entity.setSalesperson_id(adEntity.getSalesperson_id());
						entity.setSuperior(adEntity.getSuperior());
						entity.setReferrals_type(5);
					}
				}else if(inviteCode.indexOf("C")>=0){//广告主推荐
					Tb_Customer custEntity = userService.findById(inviteCode.replace("C", ""));
					if(custEntity!=null){
						entity.setReferrals_id(custEntity.getAccount_id()+"");
						entity.setSalesman_id(custEntity.getSalesman_id());
						entity.setCompany_id(custEntity.getCompany_id());
						entity.setAgent_id(custEntity.getAgent_id());
						entity.setPartner_id(custEntity.getPartner_id());
						entity.setSalesperson_id(custEntity.getSalesperson_id());
						entity.setSuperior(custEntity.getSuperior());
						entity.setReferrals_type(2);
					}
				}else{
					AdvertiserDto adDto = (AdvertiserDto)userService.queryUserObjByAccountIdAndUserType(inviteCode,USERTYPE_CUSTOMER_ADVERTISER);
					if(adDto==null){//不是店主
						CustomerDto custDto=(CustomerDto)userService.queryUserObjByAccountIdAndUserType(inviteCode,USERTYPE_CUSTOMER);
						if(custDto!=null){
							entity.setReferrals_id(custDto.getId()+"");
							entity.setSalesman_id(custDto.getSalesman_id());
							entity.setCompany_id(custDto.getCompany_id());
							entity.setAgent_id(custDto.getAgent_id());
							entity.setPartner_id(custDto.getPartner_id());
							entity.setSalesperson_id(custDto.getSalesperson_id());
							entity.setSuperior(custDto.getSuperior());
							entity.setReferrals_type(2);
						}
					}else{
						entity.setReferrals_id(adDto.getId()+"");
						entity.setSalesman_id(adDto.getSalesman_id());
						entity.setCompany_id(adDto.getCompany_id());
						entity.setAgent_id(adDto.getAgent_id());
						entity.setPartner_id(adDto.getPartner_id());
						entity.setSalesperson_id(adDto.getSalesperson_id());
						entity.setSuperior(adDto.getSuperior());
						entity.setReferrals_type(5);
					}
				}
			}else{
				if(inviteCode.length()==5){//业务员链接注册
					SalesmanDto sEntity = salesmanService.findBySalesmanid(inviteCode);
					if(sEntity!=null){
						entity.setReferrals_id(sEntity.getSalesman_id());
						entity.setCompany_id(sEntity.getCompany_id());
						entity.setSalesman_id(sEntity.getSalesman_id());
						entity.setSuperior(4);
						entity.setReferrals_type(7);
					}
				}else if(inviteCode.length()==7){//代理链接注册
					AgentDto aEntity = agentService.findAgentByAgentId(inviteCode);
					if(aEntity!=null){
						BranchDto sEntity = salesmanService.findBranchByCmpId(aEntity.getCOMPANY_ID());
						if(sEntity!=null){
							entity.setSalesman_id(sEntity.getSalesman_id());
						}
						entity.setAgent_id(aEntity.getAGENT_ID());
						entity.setReferrals_id(aEntity.getAGENT_ID());
						entity.setCompany_id(aEntity.getCOMPANY_ID());
						entity.setSuperior(2);
						entity.setReferrals_type(3);
					}
				}/*else if(inviteCode.length()<=4){//运营中心链接注册
					BranchDto sEntity = salesmanService.findBranchByCmpId(inviteCode);
					if(sEntity!=null){
						entity.setCompany_id(sEntity.getCompany_id());
						entity.setReferrals_id(sEntity.getCompany_id());
						entity.setSalesman_id(sEntity.getSalesman_id());
						entity.setSuperior(1);
						entity.setReferrals_type(4);
					}
				}*/else if(inviteCode.length()==6){//销售员链接注册
					SalesPersonDto pEntity = salesmanService.findBySalesPersonid(inviteCode);
					if(pEntity!=null){
						entity.setReferrals_id(pEntity.getSalesperson_id());
						entity.setSalesperson_id(pEntity.getSalesperson_id());
						entity.setCompany_id(pEntity.getCompany_id());
						entity.setSalesman_id(pEntity.getSalesman_id());
						entity.setSuperior(5);
						entity.setReferrals_type(8);
					}
				}else if(inviteCode.length()==8){
					Tb_Partner pEntity = partnerService.findById(Integer.parseInt(inviteCode));
					if(pEntity!=null){
						entity.setReferrals_id(pEntity.getId()+"");
						entity.setPartner_id(pEntity.getAccount_id());
						entity.setSalesman_id(pEntity.getSalesman_id());
						entity.setSuperior(3);
						entity.setReferrals_type(6);
					}
				}
			}
		}
		//没有用到的属性不能为空  给默认值
		entity.setEmail("");
		entity.setId_number("");
		entity.setOpenid("");
		entity.setUser_name("");
		writeLog("", "reigster domestic consumer end! entity:"+JSONObject.fromObject(entity), LOGLEVEL_INFO, UserController.class);
		userService.registerAndInit(entity);
	}
	/**
	 * 短信验证码
	 * @throws Exception
	 */
	@RequestMapping("/phoneVildate.do")
	public void phoneVildate(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空
		Map<String,String[]> map = getAllParameter(req,"phoneVildate.do","mobile");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String mobile = map.get("mobile")[0];//手机号
				if(util.isMobileNum(mobile)){
					Object userObj = userService.queryUserObjByAccountIdAndMobile(mobile);//查询手机是否已注册
					if(userObj==null){
						RegPhoneRandomNumDto regdto=new RegPhoneRandomNumDto();
						
						if(userRedis.getObj(mobile)!=null){
							regdto=(RegPhoneRandomNumDto)userRedis.getObj(mobile);//redis获取验证码对象
							Long currTime=System.currentTimeMillis();
							if(regdto!=null&&(currTime-regdto.getTimeStamp())/1000<=VERIFICATION_VALID_TIME){
								parameter.setRespCode(RespCodeEnum.register_mobile_invalidcode.getCode());
								parameter.setRespMessge(reqCt.getMessage("register.text.invalidTime"));
								writeJSON(res, parameter);
								parameter=null;
								return;
							}
						}
						regdto.setVaildCode(UniqId.getRandomPwd(6));//生成验证码
						regdto.setTimeStamp(System.currentTimeMillis());
						regdto.setMovePhone(mobile);
						writeLog("", "++++mobile:"+mobile+"---viladateCode:"+regdto.getVaildCode(), LOGLEVEL_INFO, UserController.class);
						
						if(sendMessage(ZERO, regdto)){
							userRedis.set(mobile, regdto,VERIFICATION_REDIS_TIME);
							//parameter.setUserName(regdto.getVaildCode());
							parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
							//parameter.setRespMessge(regdto.getVaildCode());
						}else{
							parameter.setRespCode(RespCodeEnum.register_mobile_invalidcode.getCode());
							parameter.setRespMessge(reqCt.getMessage("register.text.SendSMSFail"));
						}
						
						
					}else{//手机号已注册
						parameter.setRespCode(RespCodeEnum.register_mobile_existed.getCode());
						parameter.setRespMessge(reqCt.getMessage("register.text.existed"));
					}
				}else{//手机号格式错误
					parameter.setRespCode(RespCodeEnum.register_mobile_formaterror.getCode());
					parameter.setRespMessge(reqCt.getMessage("register.text.formaterror"));
				}
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
				parameter.setRespMessge(reqCt.getMessage("common.exception.parameter"));
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	/**
	 * 第三方登录回调
	 * @throws Exception 
	 */
	/*@RequestMapping("/thirdLoginCallBack.do")
	public void thirdLoginCallBack(HttpServletRequest req, HttpServletResponse res){
		writeLog("", "++++thirdLoginCallBack.do", LOGLEVEL_INFO, UserController.class);
		String code = getParameter(req, "code");//授权凭证
		String state = getParameter(req, "state");//同下
		try {
			String loginState = req.getSession().getAttribute("loginState").toString();//登录随机串 ，用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
			if(code!=null&&state.equals(loginState)){
				String resText = WeChatUtil.getThirdLoginAccessToken(userRedis, code);//获取access_token
				JSONObject json = JSONObject.fromObject(resText);//转json对象
				String errcode = json.getString("errcode");//错误代码
				if(util.isNull(errcode)){
					//String access_token = json.getString("access_token");//access_token 接口调用凭证
					String openid = json.getString("openid");//openid 授权用户唯一标识
					String unionid = json.getString("unionid");// 当且仅当该网站应用已获得该用户的userinfo授权时，才会出现该字段。
					CustomerDto dto = userService.queryCustomerByUnionId(unionid);
					if(dto==null){//未绑定过系统账号
						req.getSession().setAttribute(SESSION_OPENID,openid);
						res.sendRedirect("/chinese/mobile/html/bandmobile.html");//绑定账号页
						return;
					}else{
						writeLog("", "++++accountId:"+dto.getAccount_id()+"====unionId:"+dto.getUnion_id()+"====userStatus:"+dto.getUser_status(), LOGLEVEL_INFO, UserController.class);
						if(dto.getUser_status()==TWO){
							String accountId=dto.getAccount_id();
							// 记录session
							req.getSession().setAttribute(SESSION_USER_TYPE, dto.getT_type());
							String userName = accountId+"("+"id="+dto.getId()+",type="+dto.getT_type()+")";
							req.getSession().setAttribute(SESSION_USER_NAME, userName);
							req.getSession().setAttribute(LOGINTYPE,Tools.checkLoginType(req, req.getParameter("loginType")));
							req.getSession().setAttribute(SESSION_USER_ACCOUNTID, accountId);//用户accountId
							req.getSession().setAttribute(PAGE_LOGIN_TYPE,ONE);
							if(req.getParameter("mobileLoginPage")!=null){
								req.getSession().setAttribute(PAGE_LOGIN_TYPE,req.getParameter("mobileLoginPage"));
								logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "mobileLoginPage:"+req.getParameter("mobileLoginPage"), LOGLEVEL_INFO, UserController.class);
							}
							String loginId =accountId;
							//登录用户编号
							if(dto.getT_type()!=ONE){
								loginId = userService.queryLoginIdByAccountId(accountId,dto.getT_type().toString());
							}
							dto.setLogin_id(loginId);
							logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "customer:"+dto, LOGLEVEL_INFO, WeChatController.class);
							req.getSession().setAttribute(SESSION_OPENID,openid);
							req.getSession().setAttribute(SESSION_USER,dto);
						}
					}
				}else{
					if("40029".equals(errcode)){//code失效
						
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
	
	/**
	 * 当前用户ip所在城市
	 * @throws Exception
	 */
	@RequestMapping("/getUserIpForLocation.do")
	public void getUserIpForLocation(HttpServletRequest req, HttpServletResponse res) throws Exception{
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();	
		ruturnMessageDto.setSuccess(false);
		try {
			String ip = ipUtil.getIpAddress(req);
			String respStr = HttpUtil.sendGet("http://api.map.baidu.com/location/ip?ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI&ip="+ip);
			ruturnMessageDto.setSuccess(true);
			ruturnMessageDto.setData(respStr);
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "======respStr:"+respStr, LOGLEVEL_INFO, UserController.class);
		} catch (Exception e) {
			ruturnMessageDto.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		writeJSON(res, ruturnMessageDto);
		ruturnMessageDto=null;
	}
	
}
