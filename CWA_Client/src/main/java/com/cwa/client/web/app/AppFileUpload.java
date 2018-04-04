package com.cwa.client.web.app;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cwa.client.constant.AppConatnt;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.service.FileService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateEditor;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.UniqId;
import com.cwa.client.utils.config.Configurations;
import com.cwa.client.utils.config.IoUtil;
import com.cwa.client.web.AdVideoController;
import com.cwa.client.web.BaseController;
import com.cwa.client.web.GobalRespParameter;

import net.sf.json.JSONObject;


@Controller
@RequestMapping("/app/fileUpload")
public class AppFileUpload extends BaseController<GobalRespParameter> implements Constant,AppConatnt {
	
	private final String fileTypeMOV="mov";
	private final String fileTypeMp4="mp4";
	
	@Resource//文件上传
	private FileService fileService;
	
	@RequestMapping("/videoUpload.do")//网页包的ios使用
	private void appRegister(HttpServletRequest req,HttpServletResponse res,@RequestParam("fileName") MultipartFile file) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		try {
			// 判断是否上传了文件
			if (file==null||file.isEmpty()) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "Not upload file", LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespMessge(RespCodeEnum.upload_file_error1.getCode());
				writeJSON(res, parameter);
				return;
			}
			String basePath=Configurations.getFileRepository();
			String fileName=file.getOriginalFilename();
			String filepath=req.getParameter(MESSAGE)==null?DateEditor.getSingleDateEdite().getCurrentDateTimeAsString(DateEditor.FORMAT_yyyyMMdd):req.getParameter(MESSAGE);
			basePath=basePath+File.separator+filepath;
			LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "fileName:"+fileName+"=====filePath:"+basePath, LOGLEVEL_INFO, AppFileUpload.class);
			// 判断是否上传了文件
			if (!fileTypeMOV.equalsIgnoreCase(fileName.substring(fileName.lastIndexOf(".")+1))&&!fileTypeMp4.equalsIgnoreCase(fileName.substring(fileName.lastIndexOf(".")+1))) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "upload file type is not mp4 or mov", LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespMessge(RespCodeEnum.upload_file_error2.getCode());
				writeJSON(res, parameter);
				return;
			}
			// 判断文件是否太大
			byte[] bytes = file.getBytes();
			LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "File size is "+bytes.length+"===maxLeng:"+Long.parseLong(Encypter.getValueByKey("maxPicSize"))*10, LOGLEVEL_INFO, AppFileUpload.class);
			if (bytes.length > Long.parseLong(Encypter.getValueByKey("maxPicSize"))*10) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "File too big size is "+bytes.length+",max size is "+Long.parseLong(Encypter.getValueByKey("maxPicSize")), LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespMessge(RespCodeEnum.upload_file_error.getCode());
				writeJSON(res, parameter);
				return;
			}
			String newFileName=UniqId.getallSymbolArrayStr(32)+fileName.substring(fileName.lastIndexOf("."));
			file.transferTo(IoUtil.getFile(newFileName, basePath));
			
			parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			parameter.setRespMessge(filepath);
			parameter.setUserName(newFileName);
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			e.printStackTrace();
		}
		res.setContentType("application/json;charset=utf-8");
		res.getWriter().write(JSONObject.fromObject(parameter).toString());
	}
	
	@RequestMapping(value = "/appUploadADPic.do", method = { RequestMethod.POST })
	public void appUploadADPic(HttpServletRequest req,HttpServletResponse res) throws Exception{
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"appUploadADPic.do");
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) req;
		Iterator<String> fileNames = multipartRequest.getFileNames();
		String fileName1 = fileNames.hasNext() ? fileNames.next() : ""; // 得到文件名（注意。是content-type
														// 中的name="file1"，而不是真正的文件名）
		List<MultipartFile> files = multipartRequest.getFiles(fileName1);
		StringBuilder urls=new StringBuilder(""),msgs=new StringBuilder("");
		Map<String, String> map=new HashMap<>();
		for (MultipartFile mFile : files) {
			RuturnMessageDto rmt = fileService.uploadPicFile(req, mFile, "");//上传文件
			if(rmt.getData()!=null){
				urls.append(rmt.getData()+",");
			}
			msgs.append(rmt.getMsg()+",");
		}
		map.put("urls", urls.length()>0?urls.toString().substring(0,urls.length()-1):"");
		map.put("msgs", msgs.length()>0?msgs.toString().substring(0,msgs.length()-1):"");
		writeLog(LOGTYPE_CONTROLLER,"fileName:"+fileName1+"====files:"+files.size()+ map.get("urls")+"==="+map.get("msgs"), LOGLEVEL_INFO, AdVideoController.class);
		this.writeJSONForApp(res,"appUploadADPic.do", map);//返回json数据并且打印返回数据日志
	} 
	
	@RequestMapping("/appUploadVideo.do")//原生app使用
	private void appUploadVideo(HttpServletRequest req,HttpServletResponse res,@RequestParam("file") MultipartFile file) throws Exception{
		//获取请求参数并判断是否为空
		getAllParameterForApp(req,"appUploadADPic.do");
		GobalRespParameter parameter=new GobalRespParameter();
		try {
			// 判断是否上传了文件
			if (file==null||file.isEmpty()) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "Not upload file", LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespCode(RespCodeEnum.upload_file_error1.getCode());
				parameter.setRespMessge(RespCodeEnum.upload_file_error1.getMessage());
				this.writeJSONForApp(res,"appUploadADPic.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			String basePath=Configurations.getFileRepository();
			String fileName=file.getOriginalFilename();
			String filepath=req.getParameter(MESSAGE)==null?DateEditor.getSingleDateEdite().getCurrentDateTimeAsString(DateEditor.FORMAT_yyyyMMdd):req.getParameter(MESSAGE);
			basePath=basePath+File.separator+filepath;
			LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "fileName:"+fileName+"=====filePath:"+basePath, LOGLEVEL_INFO, AppFileUpload.class);
			// 判断是否上传了文件
			if (!fileTypeMOV.equalsIgnoreCase(fileName.substring(fileName.lastIndexOf(".")+1))&&!fileTypeMp4.equalsIgnoreCase(fileName.substring(fileName.lastIndexOf(".")+1))) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "upload file type is not mp4 or mov", LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespCode(RespCodeEnum.upload_file_error2.getCode());
				parameter.setRespMessge(RespCodeEnum.upload_file_error2.getMessage());
				this.writeJSONForApp(res,"appUploadADPic.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			// 判断文件是否太大
			byte[] bytes = file.getBytes();
			LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "File size is "+bytes.length+"===maxLeng:"+Long.parseLong(Encypter.getValueByKey("maxPicSize"))*10, LOGLEVEL_INFO, AppFileUpload.class);
			if (bytes.length > Long.parseLong(Encypter.getValueByKey("maxPicSize"))*10) {
				LogWriteUtil.getSingleton().writeLog(LOGTYPE_CONTROLLER, "File too big size is "+bytes.length+",max size is "+Long.parseLong(Encypter.getValueByKey("maxPicSize")), LOGLEVEL_INFO, AppFileUpload.class);
				parameter.setRespCode(RespCodeEnum.upload_file_error.getCode());
				parameter.setRespMessge(RespCodeEnum.upload_file_error.getMessage());
				this.writeJSONForApp(res,"appUploadADPic.do", parameter);//返回json数据并且打印返回数据日志
				return;
			}
			String newFileName=UniqId.getallSymbolArrayStr(32)+fileName.substring(fileName.lastIndexOf("."));
			file.transferTo(IoUtil.getFile(newFileName, basePath));
			
			parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			parameter.setRespMessge(filepath);
			parameter.setUserName(newFileName);
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(RespCodeEnum.global_unknow_expiration.getMessage());
			e.printStackTrace();
		}
		this.writeJSONForApp(res,"appUploadADPic.do", parameter);//返回json数据并且打印返回数据日志
	}
}
