package com.cwa.client.redis;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cwa.client.utils.Constant;

import redis.clients.jedis.Jedis;

public class JedisOptionUtil {

	
	public static  Logger logger = LoggerFactory.getLogger(JedisOptionUtil.class);
	
	
	private  Jedis jedis;
	
	public JedisOptionUtil(String redisServerType){
		logger.info("redisServerType  "+redisServerType);
		if(redisServerType==null){
			this.jedis=JedisUtil.getJedis();
		}else if(Constant.DEVICE_ADVERISTER_TYPE.equalsIgnoreCase(redisServerType)){
			this.jedis=JedisUtilCWAServer.getJedis();
		}
	}
	
	
	public void setKeyObj(String key,Object obj){
		try {
			jedis.del(key.getBytes());
			jedis.set(key.getBytes(), objToByte(obj));
		} catch (Exception e) {
			logger.info("setKeyObj exception "+e.getMessage());
			 e.printStackTrace();
		}
	}
	
	
	public Object getObjectByKey(String key){
		Object obj=null;
		try {
			obj=byteToObj(jedis.get(key.getBytes()));
		} catch (Exception e) {
			logger.info("getObjectByKey exception "+e.getMessage());
			 e.printStackTrace();
		}
		return obj;
	}
	
	
	 /** 
     * 设置 list 
     * @param <T> 
     * @param key 
     * @param value 
     */  
    public <T> void  setList(String key ,List<T> list){  
        try {  
        	jedis.del(key.getBytes());
        	jedis.set(key.getBytes(),objToByte(list));  
        } catch (Exception e) {  
            logger.info("Set key Exception : "+e.getMessage());  
        }  
    }  
    /** 
     * 获取list 
     * @param <T> 
     * @param key 
     * @return list 
     */  
    public <T> List<T> getList(String key){  
        List<T> list = null;
        try {
        	list=(List<T>) byteToObj(jedis.get(key.getBytes())); 
		} catch (Exception e) {
			logger.info(" get list key exception : "+e.getMessage());  
		}
        return list;  
    }
	
	/**
	 * 存储map
	 * @param key
	 * @param map
	 */
	public void setMapBykey(String key,Map<String, String> map){
		try {
			jedis.del(key);//每次更新之前先删除
			jedis.hmset(key, map);
		} catch (Exception e) {
			logger.info(key+" setMapBykey exception "+e.getMessage());
		}
	}
	
	/**
	 * 根据key 获取所有值
	 * @param key
	 * @return
	 */
	public Map<String, String> getValueFromMap(String key){
		Map<String, String> map=null;
		try {
			
			map=jedis.hgetAll(key);
			logger.info(key+" get from redis map size is "+(map==null?0:map.size()));
		} catch (Exception e) {
			logger.info(key+" get from redis exception "+e.getMessage());
		}
		return map;
	}
	 
	/**
     * 释放jedis资源
     * @param jedis
     */
    public  void returnResource() {
	       try {
	    	   if (this.jedis != null) {
	    		   this.jedis.close();
	    		   logger.info(" returnResource jedis close success");
	            }
		} catch (Exception e) {
			logger.info("returnResource exception "+e.getMessage());
			e.printStackTrace();
		}
    }
	
    /**
     * 序列化转为obj
     * @param bytes
     * @return
     */
  	public Object byteToObj(byte[] bt){
  		Object obj=null;
  		if(bt==null) return null;
  		ByteArrayInputStream bis=null;
  		ObjectInputStream ois=null;
  		try {
  			 bis=new ByteArrayInputStream(bt);
  			 ois=new ObjectInputStream(bis);
  			
  			 obj=ois.readObject();
  			
  		} catch (Exception e) {
  			logger.info(" byteToObj exception "+e.getMessage());
  		}finally{
  			try {
	  			if(bis!=null){
	  				bis.close();
	  			}
	  			if(ois!=null){
	  				ois.close();
  			    }
  			} catch (IOException e) {
  				 logger.info(" byteToObj exception "+e.getMessage());
			}
  		}
  		return obj;
  	}
    
   /**
    * obj 序列化
    * @param obj
    * @return
    */
  	public byte[] objToByte(Object obj){
  		if(obj==null) return null;
  		byte [] bt=null;
  		ByteArrayOutputStream bos=null;
  		ObjectOutputStream oos=null;
  		try {
  			 bos=new ByteArrayOutputStream();
  			 oos=new ObjectOutputStream(bos);
  			oos.writeObject(obj);
  			oos.flush();
  			bt=bos.toByteArray();
  			
  		} catch (Exception e) {
  			e.printStackTrace();
  			logger.info(" objToByte exception "+e.getMessage());
  		}finally{
  			try {
	  			if(bos!=null){
						bos.close();
	  			}
	  			if(oos!=null){
	  				oos.close();
  			    }
  			} catch (IOException e) {
  				logger.info(" objToByte exception "+e.getMessage());
			}
  		}
  		return bt;
  	}
  	
     
     public void pubChanel(String chanelId,String message){  
         try {
        	 jedis.publish(chanelId, message);
 		} catch (Exception e) {
 			logger.info("pubChanel exception "+e.getMessage());
 			e.printStackTrace();
 		}
     }
  	
     public static void main(String [] args){
    	 try {
    		for(int i=0;i<1;i++){
    			 System.out.println(i+" start ");
    			 JedisOptionUtil jedisUtil=new JedisOptionUtil(null);
        		 jedisUtil.pubChanel("pushVideo", "appUpdate-3");
        		 jedisUtil.returnResource();
        		 jedisUtil=null;
    		}
		} catch (Exception e) {
			e.printStackTrace();
		}
     }
}
