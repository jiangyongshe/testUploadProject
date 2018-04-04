package com.cwa.client.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.cwa.client.dto.WecahtXmlMessageDto;
import com.thoughtworks.xstream.XStream;

public class XmlMapUtil {
     
	private static XStream xstream;
	static{
		
		xstream=new XStream();
		
	}
	/**
	 * 把xml的各式 文件转换成map
	 * 
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws DocumentException
	 */
	public static Map<String, String> XmlToMap(HttpServletRequest request) throws IOException, DocumentException{
		
		Map<String, String> map=new HashMap<String,String>();
		
		SAXReader reader=new SAXReader();
		//获取文件的流
		InputStream ins=request.getInputStream();
		//读取xml的文件
		Document doc=reader.read(ins);
		Element root=doc.getRootElement();
		List<Element> list=root.elements();
		for (Element element : list) {
			map.put(element.getName(), element.getText());
		}
         ins.close();		
		return map;
	}
	
	/**
	 * 把对象转换成xml的文本
	 * @param requiredType
	 * @param type 把什么类型转换如果是图文类型 则type的值是 img
	 * @return
	 */
	public static <T> String ObjToXml(Class<T> requiredType){
		 
		 xstream=new XStream();
		xstream.alias("xml",requiredType.getClass());
		return xstream.toXML(requiredType);
	}
	
	public static String ObjToXml(Object obj){
		    xstream.autodetectAnnotations(true);  
	        return xstream.toXML(obj);
	}
	/**
	 * 把对象转换成xml的文本
	 * @param requiredType
	 * @param  则Img的值是 img
	 * @return
	 */
	public static <T> String ObjToXml(Class<T> requiredType,Class<T> Img){
		 
		 xstream=new XStream();
		xstream.alias("xml",requiredType.getClass());
		xstream.alias("item",Img.getClass());
		return xstream.toXML(requiredType);
	}
	
	
   public static  Object xmlToObj(String xml){
		return xstream.fromXML(xml);
   } 
   
   
   //将文本消息对像转换成xml	
   public static String textMessage(WecahtXmlMessageDto textMessage){
 	   XStream xstream=new XStream();
 	   xstream.alias("xml", textMessage.getClass());
 	   return xstream.toXML(textMessage);
   }
	
	
	public static void main(String[] args) {
		//XmlMapUtil.ObjToXml(WechatToken., "12");
		
	}
	
	
	
	
}
