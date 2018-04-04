package com.cwa.client.web;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cwa.client.service.FileService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.Tools;

@Controller
@RequestMapping("/*/common")
public class CommonController extends BaseController<GobalRespParameter> implements Constant{

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 图片大小限制
	 */
	private static final Long MAX_VIDEO_SIZE = 20971520l;

	/**
	 * 视频目录
	 */
	private static final String AD_VIDEO_DIR = "";
	
	@Resource
	private FileService fileService;
	
	/**
	 * 上传图片
	 * @param req
	 * @param res
	 * @param file
	 */
	@RequestMapping("/uploadIMG.do")
	public void uploadIMG(HttpServletRequest req,HttpServletResponse res,MultipartFile file){
		try {
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, req.getSession().getAttribute(SESSION_USER_NAME)+" upload img.", LOGLEVEL_INFO, CommonController.class);
			writeJSON(res,fileService.uploadPicFile(req, file, Encypter.getValueByKey("adPicDir")));
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, CommonController.class);
			try {
				writeJSON(res, Tools.returnObj(RespCodeEnum.FAILD.getCode(), RespCodeEnum.FAILD.getMessage()));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * 加载图片
	 * @param req
	 * @param res
	 */
	@RequestMapping("/loadIMG.do")
	public void loadIMG(HttpServletRequest req,HttpServletResponse res){
		try {
			String filePath = ServletRequestUtils.getStringParameter(req, "filePath","");
			fileService.loadPicFile(res, filePath);
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, CommonController.class);
			try {
				writeJSON(res, Tools.returnObj(RespCodeEnum.FAILD.getCode(), RespCodeEnum.FAILD.getMessage()));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * 上传视频
	 * @param req
	 * @param res
	 * @param file
	 */
	@RequestMapping("/uploadVideo.do")
	public void uploadVideo(HttpServletRequest req,HttpServletResponse res,MultipartFile file){
		try {
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, req.getSession().getAttribute(SESSION_USER_NAME)+" upload img.", LOGLEVEL_INFO, CommonController.class);
			writeJSON(res,fileService.uploadFile(req, file, AD_VIDEO_DIR,MAX_VIDEO_SIZE));
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, CommonController.class);
			try {
				writeJSON(res, Tools.returnObj(RespCodeEnum.FAILD.getCode(), RespCodeEnum.FAILD.getMessage()));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * 加载文件
	 * @param req
	 * @param res
	 */
	@RequestMapping("/loadFile.do")
	public void loadFile(HttpServletRequest req,HttpServletResponse res){
		try {
			String filePath = ServletRequestUtils.getStringParameter(req, "filePath","");
			fileService.loadFile(res, filePath,"video/mpeg4");
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_CONTROLLER, "Exception "+e.getMessage(), LOGLEVEL_ERROR, CommonController.class);
			try {
				writeJSON(res, Tools.returnObj(RespCodeEnum.FAILD.getCode(), RespCodeEnum.FAILD.getMessage()));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
}
