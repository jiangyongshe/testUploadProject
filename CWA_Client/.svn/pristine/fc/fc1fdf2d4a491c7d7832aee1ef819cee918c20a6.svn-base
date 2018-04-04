package com.cwa.client.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;

public class AppGlobalInterceptor extends BaseController<GobalRespParameter> implements HandlerInterceptor, Constant {

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		// 获取URI路径
		//String uri = request.getRequestURI().toString();
		// session user对象
		Object sessionUserObj = request.getSession().getAttribute(SESSION_USER);
		// 如果SESSION_USER为空就返回false 已拦截 跳转到登录页
		if (sessionUserObj == null  || "".equals(sessionUserObj)) {
			// 拦截后的处理
			interceptDispose(request,response);
			return false;
		}
		CustomerDto dto=(CustomerDto)sessionUserObj;
		writeLog(LOGTYPE_INTERCEPTOR, " request accountId:" + dto.getAccount_id() + "====sessionId:"+request.getSession().getId(), LOGLEVEL_INFO, AppGlobalInterceptor.class);
		return true;
	}

	/**
	 * 拦截后的处理
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void interceptDispose(HttpServletRequest request,HttpServletResponse response) throws Exception{
		// 获取当前请求路径
		String requsetUrl = request.getRequestURL().toString();
		writeLog(LOGTYPE_INTERCEPTOR, " into app intercepted  requsetUrl：" + requsetUrl + "====sessionId:"+request.getSession().getId(), LOGLEVEL_INFO, AppGlobalInterceptor.class);
		// 返回消息的dto
		RuturnMessageDto ruturnMessageDto = new RuturnMessageDto();
		ruturnMessageDto.setSuccess(false);
		ruturnMessageDto.setData(RespCodeEnum.global_session_expiration.getMessage());
		ruturnMessageDto.setMsg(RespCodeEnum.global_session_expiration.getCode());
		writeJSON(response, ruturnMessageDto);
	}
}
