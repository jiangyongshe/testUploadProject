package com.cwa.client.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

//import it.sauronsoftware.jave.Encoder;
//import it.sauronsoftware.jave.MultimediaInfo;

public class FileUtil {
   
	
	private  static FileUtil fileUtil;
	
	public static FileUtil getFileUtil(){
		if(fileUtil==null){
			fileUtil=new FileUtil();
		}
		return  fileUtil;
	}
	
	/**
	 * 上传单个文件
	 * @param in 文件流
	 * @param fileName 文件名
	 * @param path 文件的根目录
	 * @return 返回文件的名字
	 */
	@SuppressWarnings("finally")
	public  String UploadFile(InputStream in,String fileName,String path){
		BufferedInputStream bios=null;
		FileOutputStream fout=null;
		FileOutputStream fos=null;
	    System.out.println("保存的路径-------------> " + path+"/"+fileName );
		File file=new File(path);
		if(!file.exists()){
			file.mkdirs();
		}
		
		File f=new File(path+"/"+fileName);
		try {
			
			bios=new BufferedInputStream(in);
			fos = new FileOutputStream(f);	
			int length = 0;
			byte[] b = new byte[1024];
			while((length = bios.read(b)) != -1)
			{
				fos.write(b, 0, length);
			}
		} catch (IOException e) {
			e.printStackTrace();
			fileName="";
		}finally{
			try {
				if(bios!=null)
				 bios.close();
				if(fout!=null)
				 fout.close();
				if(fos!=null)
					fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return fileName;
		}
		
		
	}
	/**
	 * 读取文件
	 * @param contentPath
	 * @return
	 * @throws Exception
	 */
	public   String fileReader(String contentPath) throws Exception {
		String content = "";
		String str = null;
		BufferedReader br = null;
		try {
			File file=new File(contentPath);
			if(!file.exists()){
				return "";
			}
			FileInputStream fis = new FileInputStream(contentPath);
			InputStreamReader isr = new InputStreamReader(fis,"utf-8");
			br = new BufferedReader(isr);
           while ((str = br.readLine()) != null) {
				content = content + str + "\n";	
			}
			
		} catch(Exception e){
			throw e;
		}finally {
			if(br!=null)
			br.close();
		}
		return content;

	}
	
	public String fileWrite(String content,String filePath) throws IOException{
		   File file = new File(filePath);
		   if (!file.exists()) {
		    file.createNewFile();
		   }
		   FileWriter fw = new FileWriter(file.getAbsoluteFile());
		   BufferedWriter bw = new BufferedWriter(fw);
		   bw.write(content);
		   bw.close();
		   return filePath;
		  
	}
	


	public  String writeImg(MultipartFile mfile,String baseUploadPath) throws IOException{
		//获取文件的后缀名
		  String fileType=mfile.getOriginalFilename().substring(mfile.getOriginalFilename().lastIndexOf("."));
		  String fileName=System.nanoTime()+fileType;
		  SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
	      String date=sdf.format(new Date());
		  return this.UploadFile(mfile.getInputStream(), fileName, baseUploadPath+date).equals("")?"":date+"/"+fileName;
		
	}
	
	
	public boolean judeFileExists(String filePath)throws Exception{
		boolean isexits=false;
		try {
			File file = new File(filePath);
			isexits=file.exists();
			file=null;
		} catch (Exception e) {
			throw e;
		}
		return isexits;
	}
	
	public boolean deleteFile(String filePath)throws Exception{
		boolean isexits=false;
		try {
			File file = new File(filePath);
			isexits=file==null?false:file.exists();
			if(isexits){
				isexits=file.delete();
			}
			file=null;
		} catch (Exception e) {
			throw e;
		}
		return isexits;
	}
	
//	/**
//	 * 获取视频的时长
//	 * @param path
//	 * @return
//	 */
//	public long getVedioTime(String path){
//		System.out.println(path);
//		
//		try {
//			File file=new File(path);
//			if(!file.exists()){
//				return 0;
//			}
//			Encoder encoder = new Encoder();
//			MultimediaInfo minfo= encoder.getInfo(file);
//			return minfo.getDuration();
//		} catch (Exception e) {
//            e.printStackTrace();
//		}
//    	return 0;
//	}
//	
//	public static void main(String[] args) {
//		long time=FileUtil.getFileUtil().getVedioTime("D:/home/data/site/viedo/438309788507299.mp4");	
//	 System.out.println(time);
//	}
////
	
}
