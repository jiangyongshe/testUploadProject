package com.cwa.client.thread;

import com.cwa.client.dto.InterplayDto;
import com.cwa.client.model.Tb_Order;
import com.cwa.client.redis.JedisOptionUtil;
import com.cwa.client.service.OrderService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

import net.sf.json.JSONObject;



public class PushVedioThread extends Thread {
	
	private String orderId;
	
	private OrderService orderService;
	
	public PushVedioThread(String orderId,OrderService orderService){
	   this.orderId=orderId;
	   this.orderService=orderService;
	}
	
	@Override
	public void run() {
		LogWriteUtil.getSingleton().writeLog("", " Serial_number "+orderId+" pushVedio Thread start", Constant.LOGLEVEL_INFO, PushVedioThread.class);
		try {
			   
			
				Tb_Order order=orderService.queryOrderBySerialNum(orderId);
				LogWriteUtil.getSingleton().writeLog("", " order info "+(order==null?"unknow ordernfo":order.toString()), Constant.LOGLEVEL_INFO, PushVedioThread.class);
				
			if(order!=null){
					 InterplayDto playdto=new InterplayDto();
					 playdto.setDeviceId(order.getDevice_id());
					 playdto.setOrderId(order.getSerial_number());
					 playdto.setType(Constant.REALTIME_PUSHVEDIO_TYPE);
					 playdto.setUuid(playdto.getDeviceId());
					
				  JedisOptionUtil optionUtil=new JedisOptionUtil(null);	 
				  String vedioJson= JSONObject.fromObject(playdto).toString(); 
				  optionUtil.pubChanel(Constant.REALTIME_APPUPDATE_PUSH,vedioJson);
				  LogWriteUtil.getSingleton().writeLog("", " Serial_number "+orderId+" getDeviceId "+playdto.getDeviceId()+" pushVedio  redis success  ", Constant.LOGLEVEL_INFO, PushVedioThread.class);
					
				  optionUtil.returnResource();
				  optionUtil=null;
				  vedioJson=null;
				  playdto=null;
				  
			}
			
			  LogWriteUtil.getSingleton().writeLog("", " Serial_number "+(order==null?"unknow orderid":order.getSerial_number())+" pushVedio Thread end  ", Constant.LOGLEVEL_INFO, PushVedioThread.class);
							 
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
