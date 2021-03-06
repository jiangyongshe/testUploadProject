package com.cwa.client.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.cwa.client.dto.SendEmailDto;
import com.cwa.client.web.SendEmailController;

public class SendEmailUtil {
	private static GobalProperties config;
	static{
		config=new GobalProperties();
		config.loadPropertiesFromPath(SendEmailController.class.getClassLoader().getResource("sendEmail.properties").getPath());
	}
	private static JavaMailSenderImpl sender=createMailSender();
	private static String sendTo;
	private static String emailName;
	
	private static String logFileName="emailLog.txt";
	
	public static GobalProperties getGobalPropertiesObj(){//获取配置文件对象
		if(config==null){
			config=new GobalProperties();
		}
		return config;
	}
    /**
     * 邮件发送器
     *
     * @return 配置好的工具
     */
    private static JavaMailSenderImpl createMailSender() {
    	String host=config.getValueByKey("mail.smtp.host");
		String port=config.getValueByKey("mail.smtp.port");
		String password=config.getValueByKey("mail.password");
		String auth=config.getValueByKey("mail.smtp.auth");
		sendTo=config.getValueByKey("mail.sendTo");
		emailName=config.getValueByKey("mail.from.user");
		System.out.println("post:"+host+"===port:"+port+"===userName:"+emailName+"===pwd:"+password);
		JavaMailSenderImpl sender = new JavaMailSenderImpl();
		sender.setHost(host);
		sender.setPort(Integer.parseInt(port));
		sender.setUsername(emailName);
		//sender.setPassword(Encypter.getDecryptValue(password));
		sender.setPassword(password);
		sender.setDefaultEncoding("Utf-8");
        Properties p = new Properties();
        p.setProperty("mail.smtp.timeout", "25000");
        p.setProperty("mail.smtp.auth", auth);
        sender.setJavaMailProperties(p);
        return sender;
    }

    /**
     * 发送邮件
     *
     * @param to 接受人
     * @param subject 主题
     * @param html 发送内容
     * @throws Exception 异常
     */
    public static void sendMail(SendEmailDto dto) throws Exception{
    	if(!RegUtil.getUtil().isNull(dto.getUserName(),dto.getEmailName(),dto.getTitle(),dto.getContent())){
    		if(RegUtil.getUtil().isEmail(dto.getEmailName())){//邮箱正确
    			MimeMessage mimeMessage = sender.createMimeMessage();
                // 设置utf-8或GBK编码，否则邮件会有乱码
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                String[] strs = sendTo.split(",");
                messageHelper.setFrom(emailName, dto.getUserName());
                messageHelper.setSubject(dto.getTitle());
                messageHelper.setText("邮箱:"+dto.getEmailName()+"</br>"+dto.getContent(), true);
                for (int i = 0; i < strs.length; i++) {//循环发送多个邮箱
                	messageHelper.setTo(strs[i]);
                	sender.send(mimeMessage);
        		}
    		}else{
    			throw new Exception("email format error !") ;
    		}
    	}else{
			throw new Exception("exists paramter is null !") ;
		}
    }
    
    /**
     * 写发送邮件日志
     *
     * @param content 日志内容
     */
    public synchronized static void writeEmailLog(SendEmailDto dto){
    	String path = config.getValueByKey("mail.log.path");
        File logFile=new File(path);
        if(!logFile.exists()){
        	logFile.mkdirs();
        }
        logFile=new File(path+logFileName);
        BufferedWriter bw=null;
        try {
        	 bw=new BufferedWriter(new OutputStreamWriter(new FileOutputStream(logFile,true)));
        	 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
         	 String strDt = sdf.format(new Date());
         	 String logStr="";//写日志
             if(RegUtil.getUtil().isNull(dto.getRespMessge())){//如果发送成功则把发送信息写入日志 否则把错误信息写入日志
            	 logStr=strDt+"    sendMsg log >>>>>> send success!! "+"sendUserName："+dto.getUserName()+"-----sendEmailName："+dto.getEmailName()+"-----sendTitle："+dto.getTitle()+"-----sendContent："+dto.getContent();
             }else{
            	 logStr=strDt+"    sendMsg log >>>>>> send fail!! "+dto.getRespMessge(); 
             }
             System.out.println("+++++sendMsgLog:"+logStr);
             bw.write(logStr);
             bw.newLine(); 
             bw.flush();
             bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
    /**
     * 发送邮件并写日志
     *
     * @param content 日志内容
     * return resCode 返回发送结果
     */
    public synchronized static String sendEmailAndWriteLog(SendEmailDto dto){
    	String resCode="10000";
    	try {
    		SendEmailUtil.sendMail(dto);//发送邮件
    	} catch (Exception e) {
    		e.printStackTrace();
    		resCode="10002";
    		dto.setRespMessge(e.getMessage());
    	}
    	SendEmailUtil.writeEmailLog(dto);//写日志
    	return resCode;
    }
}
