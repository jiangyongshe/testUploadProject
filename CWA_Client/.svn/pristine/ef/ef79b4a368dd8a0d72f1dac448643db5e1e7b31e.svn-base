package com.cwa.client.constant;

/**
 * 1开头：全局通用
 * 2开头：账户内容
 */
public enum AppRetunCode {
	
	SUCCESS("10000","操作成功"),
	FAILD("100001","操作失败"),
	
	LOGIN_PARAMS_ERROR_FORMAT("20001","登录参数格式不正确"),
	LOGIN_TYPE_ILLEGAL("20002","登录类型异常，非IOS和Andriod"),
	LOGIN_NOT_ENTER_ACCOUNT_ID("20003","未输入登录账号"),
	ACCOUNT_ID_NOT_EXIST("20004","账户不存在"),
	ACCOUNT_ID_WAS_DISABLED("20005","账户被禁用"),
	LOGIN_NOT_ENTER_PWD("20006","未输入登录密码"),
	ACCOUNT_OR_PWD_MISTAKE("20007","账户或者密码错误"),
	NOT_ENTER_MOBILE("20008","未输入手机号"),
	MOBILE_ERROR_FORMAT("20009","手机号格式错误"),
	PHONE_NUMBER_HAS_BEEN_REGISTERED("20010","手机号已经被注册"),
	PHONE_NUMBER_IS_NOT_REGISTERED("20011","该手机号未注册"),
	REGISTER_VERIFICATION_CODE_NOT_EXPIRED("20012","该手机号注册时获取的验证码未过期"),
	FORGET_PWD_VERIFICATION_CODE_NOT_EXPIRED("20013","该手机号忘记密码时获取的验证码未过期"),
	FORGET_PWD_PARAMS_ERROR_FORMAT("20014","忘记密码操作时传入的参数格式不正确"),
	NOT_ENTER_VERIFICATION_CODE("20015","未输入验证码"),
	NOT_ENTER_NEW_PASSWORD("20016","未输入新密码"),
	PASSWORD_ERROR_FORMAT("20017","密码格式不正确"),
	VERIFICATION_CODE_INVAILD("20018","验证码已经失效"),
	VERIFICATION_CODE_ERROR("20019","验证码输入错误"),
	REGISTER_PARAMS_ERROR_FORMAT("20020","注册操作时传入的参数格式不正确"),
	NOT_ENTER_REGISTER_PASSWORD_ONE("20021","未输入注册密码1"),
	NOT_ENTER_REGISTER_PASSWORD_TWO("20022","未输入注册密码2"),
	REGISTER_TWO_PWD_ARE_INCONSISTENT("20023","注册操作时传入的两次密码不一致"),
	SESSION_ID_INCONSISTENT("20024","sessionId异常");
	
	private String code;
	
	private String describe;
	
	AppRetunCode(String code,String describe){
		this.code = code;
		this.describe = describe;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}
	
	
}
