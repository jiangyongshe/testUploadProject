package com.cwa.client.web;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateEditor;
import com.cwa.client.utils.FileUtil;
import com.cwa.client.utils.config.Configurations;
import com.cwa.client.utils.config.IoUtil;
import com.cwa.client.utils.config.Range;
import com.cwa.client.utils.config.StreamException;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;



@Controller
@RequestMapping("/vedioupload/upload/")
public class StreamController extends BaseController<GobalRespParameter>  implements Constant{

	/** when the has increased to 10kb, then flush it to the hard-disk. */
	
	
	/**
	 * Lookup where's the position of this file?
	 */
	@RequestMapping(value="getupload",method={RequestMethod.GET,RequestMethod.POST})
	public void getupload(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		 PrintWriter writer=null;
		 OutputStream out = null;
		InputStream content = null;
		JSONObject json = new JSONObject();
		long start = 0;
		boolean success = true;
		String message = null;
		Range range =null;
		 String basePath=Configurations.getFileRepository();
		 String token = req.getParameter(TOKEN_FIELD);
		 String size = req.getParameter(FILE_SIZE_FIELD);
		 String fileName = req.getParameter(FILE_NAME_FIELD);
		 
		 String filepath=null;
		 File f = null;
		 
		 doOptions(req, resp);
		 
		try {
			 filepath=req.getParameter(MESSAGE)==null?DateEditor.getSingleDateEdite().getCurrentDateTimeAsString(DateEditor.FORMAT_yyyyMMdd):req.getParameter(MESSAGE);
				
			 basePath=basePath+File.separator+filepath;
			 range = IoUtil.parseRange(req);
			 f = IoUtil.getTokenedFile(basePath,token);
			 
			if(range==null){
				
				start = f.length();
				/** file size is 0 bytes. */
				if (token.endsWith("_0") && "0".equals(size) && 0 == start)
					f.renameTo(IoUtil.getFile(basePath,fileName));
			}else{
				if (f.length() != range.getFrom()) {
					throw new StreamException(StreamException.ERROR_FILE_RANGE_START);
				}
				
				out = new FileOutputStream(f, true);
				content = req.getInputStream();
				int read = 0;
				final byte[] bytes = new byte[BUFFER_LENGTH];
				while ((read = content.read(bytes)) != -1){
					out.write(bytes, 0, read);
					
				}
				
				start = f.length();
				 
			}
			
			
		} catch (Exception fne) {
			message = "Error: " + fne.getMessage();
			success = false;
		} finally {
			IoUtil.close(out);
			IoUtil.close(content);
			 
			if (range!=null&&range.getSize() == start) {
				/** fix the `renameTo` bug */
                try {
					// 先删除
					IoUtil.getFile(fileName,basePath).delete();
					//MD5Util.getMD5(basePath+"/"+fileName)
					String newfileName=token+fileName.substring(fileName.lastIndexOf("."));
					
					writeLog("", "TK: `" + token + "`, NE: `" + newfileName + "`", LOGLEVEL_INFO, StreamController.class);
					
					if(!FileUtil.getFileUtil().judeFileExists(basePath+"/"+newfileName)){
						Files.move(f.toPath(), f.toPath().resolveSibling(newfileName));
					    
					}else{
						FileUtil.getFileUtil().deleteFile(f.getPath());
					}
					
					json.put(FILE_NAME_FIELD, newfileName);
					message=filepath;
					
				} catch (Exception e) {
					success = false;
					message = "Rename file error: " + e.getMessage();
				}
				
			}
			
			try {
				if (success)
					json.put(START_FIELD, start);
				json.put(SUCCESS, success);
				json.put(MESSAGE, message);
			} catch (JSONException e) {}
			writer= resp.getWriter();
			writer.write(json.toString());
			json=null;
			IoUtil.close(writer);
		}
	}
	
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json;charset=utf-8");
		resp.setHeader("Access-Control-Allow-Headers", "Content-Range,Content-Type");
		resp.setHeader("Access-Control-Allow-Origin", Configurations.getCrossOrigins());
		resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
	}

	

}
