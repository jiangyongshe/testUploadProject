package com.cwa.client.web;


import java.io.File;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cwa.client.model.Tb_Vedio_Audit;
import com.cwa.client.service.AdvertiseVideoService;
import com.cwa.client.utils.DateEditor;
import com.cwa.client.utils.FileUtil;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.config.Configurations;
import com.cwa.client.utils.config.IoUtil;
import com.cwa.client.utils.config.TokenUtil;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;



/**
 * According the file name and its size, generate a unique token. And this
 * token will be refer to user's file.
 */
@Controller
@RequestMapping(value="/vedioupload/tk/")
public class TokenController extends BaseController<GobalRespParameter>{
	
	@Resource
	private AdvertiseVideoService  vedioAuditService;

	@RequestMapping(value="token")
	public void getToken(HttpServletRequest req,HttpServletResponse resp)throws Exception {
		JSONObject json= new JSONObject();
		PrintWriter writer = resp.getWriter();
		try {
			writeLog("", req.getServletContext().getRealPath("/video"), LOGLEVEL_INFO, TokenController.class);
			 String token = req.getParameter(TOKEN_FIELD);
			 String message=DateEditor.getSingleDateEdite().getCurrentDateTimeAsString(DateEditor.FORMAT_yyyyMMdd);
			 String basePath=Configurations.getFileRepository()+File.separator+message;
			 writeLog("", "  TokenController start ,token "+token, LOGLEVEL_INFO, TokenController.class);
			 if(RegUtil.getUtil().isNull(token)){
				 json.put(SUCCESS,false);
				 json.put(MESSAGE,RespCodeEnum.global_parameter_isnull.getCode());
				 return;
			 }
			 Tb_Vedio_Audit vedio=vedioAuditService.queryVedioByMd5FileName(token);
			 writeLog("", " file token 【"+token+" 】 db vedio is"+(vedio==null?"unknown token":vedio.getFile_path()), LOGLEVEL_INFO, TokenController.class);
			 if(vedio==null){
				 token = TokenUtil.generateToken(basePath,token);
				 FileUtil.getFileUtil().deleteFile(basePath+token);
				 json.put(TOKEN_FIELD, token);
				 //json.put(MESSAGE, RespCodeEnum.SUCCESS.getCode());
			 }else{
				 json.put(MESSAGE,RespCodeEnum.order_uploadVideo_error.getCode());
				 json.put(FILE_NAME_FIELD, vedio.getFile_name());
				 json.put(TOKEN_FIELD, vedio.getFile_path().substring(0,8));
				 json.put(FILE_NAME_OLD, vedio.getOld_file_name());
			 }
			 
			   if (Configurations.isCrossed()){
				   json.put(SERVER_FIELD, Configurations.getCrossServer());
			   }
					
				
		    json.put(SUCCESS,true);
			 req.getSession().setAttribute(TOKEN_FIELD, token);
		} catch (JSONException e) {
			 json.put(SUCCESS,false);
		    json.put(MESSAGE, RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
			writeLog("", "  TokenServlet Exception" +e.getMessage(), LOGLEVEL_ERROR, TokenController.class);
		}finally{
			writer.write(json.toString());
			json=null;
			if(writer!=null){
				IoUtil.close(writer);
			}
		}
		
	
	}


}
