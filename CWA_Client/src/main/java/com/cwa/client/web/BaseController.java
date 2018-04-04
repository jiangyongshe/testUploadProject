package com.cwa.client.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.cwa.client.dao.DeviceVedioCountDao;
import com.cwa.client.dao.SystemSetDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.DeviceVedioCountDto;
import com.cwa.client.dto.SystemSetDto;
import com.cwa.client.redis.RegPhoneRandomNumDto;
import com.cwa.client.redis.UserRedis;
import com.cwa.client.sendSMS.AliYunSMSBaseDto;
import com.cwa.client.service.AdvertiseInfoService;
import com.cwa.client.service.OrderService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.GobalProperties;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.MD5Util;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.ipUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class BaseController<E extends GobalRespParameter> implements Constant {

	 
	protected static final String CMD_EDIT = "edit";
	protected static final String CMD_UPDATE = "update";
	protected static final String CMD_NEW = "new";
	protected static final String CMD_EDIT_STATUS = "status";
	protected static final String MODEL = "model";
	protected static final String CMD_ADD="add";
	protected static final String SESSION_SYS_USER = "SESSION_SYS_USER";
	protected static final String DEFAULT_TIME="2001-01-01 00:00:00";
	
	
	protected static ObjectMapper mapper = new ObjectMapper();

	protected static JsonFactory factory = mapper.getJsonFactory();
	
	protected static RegUtil util=RegUtil.getUtil();
	
	@Resource
	private DeviceVedioCountDao deviceVedioCountDao;
	
	@Resource// 普通用户service层
	private AdvertiseInfoService advertiseInfoService;
	
	@Resource// 普通用户service层
	private SystemSetDao systemSetDao;
	
	@Resource //阿里大于短信基本信息配置
	private AliYunSMSBaseDto aliyunPhone;
	/**
	 * 通用写json数据
	 * 
	 * @param response
	 * @param json
	 * @throws IOException
	 */
	protected void writeJSON(HttpServletResponse response, String json)
			throws IOException {
		PrintWriter out = null;
		response.setContentType("text/html;charset=utf-8");
		try {
			out = response.getWriter();
			out.write(json);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}

	/**
	 * 通用写json数据
	 * 
	 * @param response
	 * @param obj
	 * @throws IOException
	 */
	protected void writeJSON(HttpServletResponse response, Object obj)
			throws IOException {
		response.setContentType("application/json;charset=utf-8");
		JsonGenerator responseJsonGenerator = null;
		try {
			responseJsonGenerator = factory.createJsonGenerator(
					response.getOutputStream(), JsonEncoding.UTF8);
			responseJsonGenerator.writeObject(obj);
			///logger.info(" writeJSON obj responseResult:" + obj.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (responseJsonGenerator != null
					&& !responseJsonGenerator.isClosed()) {
				responseJsonGenerator.close();
				obj = null;
			}
		}

	}
	
	/**
	 * app通用写json数据
	 * 
	 * @param response
	 * @param obj
	 * @throws IOException
	 */
	protected void writeJSONForApp(HttpServletResponse response,String logTitle, Object obj)
			throws IOException {
		writeLog(LOGTYPE_CONTROLLER,"++++++ end "+logTitle+"  respData:"+GsonUtil.dtoToJson(obj), LOGLEVEL_INFO, BaseController.class);
		response.setContentType("application/json;charset=utf-8");
		JsonGenerator responseJsonGenerator = null;
		try {
			responseJsonGenerator = factory.createJsonGenerator(
					response.getOutputStream(), JsonEncoding.UTF8);
			responseJsonGenerator.writeObject(obj);
			///logger.info(" writeJSON obj responseResult:" + obj.toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (responseJsonGenerator != null
					&& !responseJsonGenerator.isClosed()) {
				responseJsonGenerator.close();
				obj = null;
			}
		}

	}
	
	protected void sendMessageToRedis(String userType,String accountId,String sid,UserRedis userRedis){
		  try {
			    JSONObject object=new JSONObject();
				object.put("userType", userType);
				object.put("accountId", accountId==null?"":accountId);
				object.put("sid", sid==null?"":sid);
				userRedis.sendMessage("notticeMessageId",object.toString());
				object=null;
		} catch (Exception e) {
			e.printStackTrace();
		}
	 }
	
	/**
	 * 公用写日志方法
	 * @param logType
	 * @param content
	 * @param logLevel
	 * @param entityClass
	 */
	public void writeLog(String logType,String content,String logLevel,Class<?> entityClass){
		try {
			 LogWriteUtil.getSingleton().writeLog(logType, content, logLevel, entityClass);
		} catch (Exception e) {
			 e.printStackTrace();
		}
	}
	
	/**
	 * 获取所有requestParameter并判断指定参数是否为空
	 * @param request
	 * @param paramName
	 */
	public Map<String, String[]> getAllParameter(HttpServletRequest request,String fromMethod,String ... paramName){
		Map<String, String[]> parameterMap = request.getParameterMap();
		RegUtil util = RegUtil.getUtil();
		StringBuilder log=new StringBuilder("======parameterAll======fromMethod:"+fromMethod+"===");
		try {
			for (int i = 0; i < paramName.length; i++) {
				if(util.isNull(parameterMap.get(paramName[i]))){
					writeLog("","======="+paramName[i]+" is null",LOGLEVEL_INFO,BaseController.class);
					return null;
				}
				log.append(paramName[i]+":"+parameterMap.get(paramName[i])[0]+"===");
			}
		} catch (Exception e) {
			 e.printStackTrace();
		}
		writeLog("",log.toString(),LOGLEVEL_INFO,BaseController.class);
		return parameterMap;
	}
	
	/**
	 * 获取所有requestParameter并判断指定参数是否为空
	 * @param request
	 * @param paramName
	 */
	public Map<String, String[]> getAllParameterForApp(HttpServletRequest request,String fromMethod,String ... paramName){
		Map<String, String[]> parameterMap = request.getParameterMap();//获取所有请求参数
		//Map<String, String> returnMap =new HashMap<>();//返回map
		RegUtil util = RegUtil.getUtil();
		writeLog(LOGTYPE_CONTROLLER,"++++++app request start ====fromMethod:"+fromMethod+"=== sessionId"+request.getSession().getId()+"=== userIp:"+ipUtil.getIpAddress(request),LOGLEVEL_INFO,BaseController.class);
		StringBuilder log=new StringBuilder("");
		try {
			if(paramName.length>0){//存在必传参数判断
				for (int i = 0; i < paramName.length; i++) {
					if(util.isNull(parameterMap.get(paramName[i]))){//判断必传参数是否为空,为空则返回null来判断参数错误
						writeLog("","======="+paramName[i]+" is null",LOGLEVEL_INFO,BaseController.class);
						return null;
					}
					log.append(paramName[i]+":"+parameterMap.get(paramName[i])[0]+"===");
				}
				/*Set<String> keys = parameterMap.keySet();//得到所有参数名称
				for (String key : keys) {
					returnMap.put(key, parameterMap.get(key)[0]);//转字符放进返回map
					log.append(key+":"+parameterMap.get(key)[0]+"===");//拼接打印日志
				}*/
			}
		} catch (Exception e) {
			 e.printStackTrace();
		}
		writeLog("",log.toString(),LOGLEVEL_INFO,BaseController.class);
		return parameterMap;
	}
	/**
	 * 获取Parameter并判断是否为空
	 * @param request
	 * @param paramName
	 */
	public String getParameter(HttpServletRequest request,String paramName){
		String paramValue = request.getParameter(paramName);
		if(RegUtil.getUtil().isNull(paramValue)){
			writeLog("",paramName+" is null",LOGLEVEL_INFO,BaseController.class);
			return null;
		}
		writeLog("",paramName+":"+paramValue,LOGLEVEL_INFO,BaseController.class);
		return paramValue;
	}
	/**
	 * 封装订单
	 * @param request
	 * @param paramName
	 * return String 订单集合
	 */
	public List<AdvertiseInfoDto> getOrderList(HttpServletRequest req,Map<String,String[]> map,String shoppId,boolean isFor) throws Exception{
		CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
		String [] checkAdvertiseId=map.get("checkAdvertiseId")[0].split(",");//店主id
		String [] deviceId=map.get("deviceId")[0].split(",");//设备编号
		//String [] timeInterval=map.get("timeInterval")[0].split(",");//购买广告时段
		String [] checkTimes=util.isNull(map.get("checkTimes"))?null:map.get("checkTimes")[0].split(",");//投放日期
		//String [] playCycles=util.isNull(map.get("playCycles"))?null:map.get("playCycles")[0].split(",");//购买广告时段
		String [] shoppIds=shoppId==null?null:shoppId.split(",");//购物车id
		String [] fileType=util.isNull(map.get("fileType"))?null:map.get("fileType")[0].split(",");//投放类型
		String [] buyCounts=util.isNull(map.get("buyCount"))?null:map.get("buyCount")[0].split(",");//投放数量
		writeLog("","==shoppIds:"+shoppIds,LOGLEVEL_INFO,BaseController.class);
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
		//根据购买广告id查询广告信息
		List<AdvertiseInfoDto> list = advertiseInfoService.findAdvertiseInfoByAdvertiserId(map,isFor);
		//List<AdvertiseInfoDto> list1=new ArrayList<>();//最终广告集合
		for (int i = 0; i < checkAdvertiseId.length; i++) {
			for (AdvertiseInfoDto dto : list) {
				if(dto.getId()==Integer.parseInt(checkAdvertiseId[i])&&dto.getDevice_id().equals(deviceId[i])/*&&dto.getIdle_time().equals(timeInterval[i])*/){//把对应周期和小计放入dto
					if(util.isNull(dto.getStartDate())&&util.isNull(dto.getEndDate())){
						dto.setAccount_id(customerDto.getAccount_id());
						dto.setAccount_IP(ipUtil.getIpAddress(req));
						dto.setUserId(customerDto.getId());
						dto.setFile_type("3");//默认投放类型
						if(shoppIds!=null){ //购物车id
							if(util.isNull(dto.getShoppId())){
								dto.setShoppId(shoppIds[i]);
							}
						}
						if(fileType!=null){
							dto.setFile_type(fileType[i]);
						}
						if(buyCounts!=null){//投放数量
							dto.setBuyCount(Integer.parseInt(buyCounts[i]));
						}
						//插播
						/*if(map.get("isInterCut")!=null&&!"".equals(map.get("isInterCut")[0])&&"2".equals(map.get("isInterCut")[0])){
							writeLog("","==isInterCut:"+customerDto.getAccount_id(),LOGLEVEL_INFO,BaseController.class);
							dto.setStartDate(sdf.format(new Date()));
							dto.setEndDate(dto.getStartDate());
							if("1".equals(dto.getFile_type())){//费用
								dto.setSumPrice(dto.getAd_price().toString());
							}else if("2".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getInter_cut_html_price().toString());
							}else if("3".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getInter_cut_pic_price().toString());
							}
							continue;
						}*/
						if(checkTimes!=null){
							dto.setStartDate(checkTimes[i].split("@")[0]);
							dto.setEndDate(checkTimes[i].split("@")[1]);
							Long time =(sdf.parse(dto.getEndDate()).getTime()-sdf.parse(dto.getStartDate()).getTime())/(3600 * 24 * 1000L);
							if("1".equals(dto.getFile_type())){//费用
								dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(time+1)).toString());
							}else if("2".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getHtml_price().multiply(new BigDecimal(time+1)).toString());
							}else if("3".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getPic_price().multiply(new BigDecimal(time+1)).toString());
							}else{
								dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(time+1)).toString());
							}
						}else{
							dto.setStartDate(sdf.format(new Date(System.currentTimeMillis()+1000*24*3600)));//默认播放开始时间
							dto.setEndDate(sdf.format(new Date(System.currentTimeMillis()+1000*24*3600*8)));//默认播放结束时间
							if("1".equals(dto.getFile_type())){//费用
								dto.setSumPrice(dto.getAd_price().toString());
							}else if("2".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getHtml_price().toString());
							}else if("3".equals(dto.getFile_type())){
								dto.setSumPrice(dto.getPic_price().toString());
							}else{
								dto.setSumPrice(dto.getAd_price().toString());
							}
							dto.setSumPrice(Double.parseDouble(dto.getSumPrice())*8+"");//总费用
						}
						
						/*if(playCycles!=null){
							dto.setCycleType(playCycles[i].split("-")[1]);//播放
							dto.setPlayCycle(playCycles[i].split("-")[0]);
							setStartDateAndEndDateAndDisForDto(dto.getPlayCycle(),dto.getCycleType(),dto);//计算具体播放日期和折扣
						}*/
						writeLog("","==customer:"+customerDto.getAccount_id()+"==dto:"+JSONObject.fromObject(dto),LOGLEVEL_INFO,BaseController.class);
					}
				}
			}
		}
		return list;
	}
	
	/**
	 * 封装订单
	 * @param request
	 * @param paramName
	 * return String 订单集合
	 */
	/*public List<AdvertiseInfoDto> getOrderList(HttpServletRequest req,Map<String,String[]> map,String shoppId) throws Exception{
		CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
		String [] checkTimes=map.get("checkTimes")[0].split(",");//播放周期
		String [] checkAdvertiseId=map.get("checkAdvertiseId")[0].split(",");//确认购买广告id
		String [] deviceId=map.get("deviceId")[0].split(",");//购买广告设备id
		String [] timeInterval=map.get("timeInterval")[0].split(",");//购买广告时段
		String [] shoppIds=shoppId==null?null:shoppId.split(",");//购物车id
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
		//根据购买广告id查询广告信息
		List<AdvertiseInfoDto> list = advertiseInfoService.findAdvertiseInfoByAdvertiserId(map);
		//List<AdvertiseInfoDto> list1=new ArrayList<>();//最终广告集合
		for (int i = 0; i < checkAdvertiseId.length; i++) {
			for (AdvertiseInfoDto dto : list) {
				if(dto.getId()==Integer.parseInt(checkAdvertiseId[i])&&dto.getDevice_id().equals(deviceId[i])&&dto.getIdle_time().equals(timeInterval[i])){//把对应周期和小计放入dto
					if(util.isNull(dto.getStartDate())&&util.isNull(dto.getEndDate())){
						if(shoppIds!=null){
							if(util.isNull(dto.getShoppId())){
								dto.setShoppId(shoppIds[i]);
							}
						}
						dto.setStartDate(checkTimes[i].split("@")[0]);
						dto.setEndDate(checkTimes[i].split("@")[1]);
						//得到播放天数
						Long time =(sdf.parse(dto.getEndDate()).getTime()-sdf.parse(dto.getStartDate()).getTime())/(3600 * 24 * 1000L);
						dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(time+1)).toString());
						dto.setAccount_id(customerDto.getAccount_id());
						dto.setAccount_IP(ipUtil.getIpAddress(req));
						break;
					}
					//list1.add(dto);
				}
			}
		}
		return list;
	}*/
	
	
	
	
	
	/**
	 * 根据填写播放周期计算具体播放日期
	 * @param request
	 * @param paramName
	 */
	public void setStartDateAndEndDateAndDisForDto(String playCycle,String cycleType,AdvertiseInfoDto dto){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
		Calendar instance = Calendar.getInstance();
		if(!RegUtil.getUtil().isNumber(playCycle)||Integer.parseInt(playCycle)<=0||playCycle.length()>3){
			dto.setStartDate(sdf.format(instance.getTime()));
			dto.setEndDate(sdf.format(instance.getTime()));
			return;
		}
		instance.add(Calendar.DAY_OF_YEAR, 1);
		dto.setStartDate(sdf.format(instance.getTime()));
		if("w".equals(cycleType)){//周
			instance.add(Calendar.DAY_OF_YEAR, 7*Integer.parseInt(playCycle)-1);
			dto.setEndDate(sdf.format(instance.getTime()));
			dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(7*Integer.parseInt(playCycle))).toString());
		}else if("m".equals(cycleType)){//月
			instance.add(Calendar.DAY_OF_YEAR, 30*Integer.parseInt(playCycle)-1);
			dto.setEndDate(sdf.format(instance.getTime()));
			dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(30*Integer.parseInt(playCycle))).toString());
		}else{//年
			instance.add(Calendar.DAY_OF_YEAR, 365*Integer.parseInt(playCycle)-1);
			dto.setEndDate(sdf.format(instance.getTime()));
			dto.setSumPrice(dto.getAd_price().multiply(new BigDecimal(365*Integer.parseInt(playCycle))).toString());
		}
		writeLog("", "+++set AdvertiseInfoDto success! disCount:"+dto.getDisCount()+"====beginDate:"+dto.getStartDate()+"====endDate:"+dto.getEndDate(), LOGLEVEL_INFO, BaseController.class);
	}
	
	/**
	 * 判断是否那些时段可以播放
	 * @param request
	 * @param paramName
	 * return String 不能播放的时间列表
	 */
	public Map<String,String> isPlayTimeInterval(List<AdvertiseInfoDto> list,String isInterCut) throws Exception{
		Long bgTime=System.currentTimeMillis();
		Map<String, String> map=new HashMap<>();
		StringBuilder result=new StringBuilder("");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		for (AdvertiseInfoDto dto : list) {
			result.setLength(0);
			String key=dto.getDevice_id()+"-"+dto.getIdle_time()+"-"+dto.getShop_name();//设备id+时段+店铺名
			Object[] values = new Object[] {//封装订单详情数据
				 dto.getDevice_id(),
				 dto.getIdle_time().split("-")[0].length()==5?dto.getIdle_time().split("-")[0]+":00":dto.getIdle_time().split("-")[0],
				 dto.getIdle_time().split("-")[1].length()==5?dto.getIdle_time().split("-")[1]+":00":dto.getIdle_time().split("-")[1],
				 dto.getStartDate(),
				 dto.getEndDate()//,dto.getPlay_number()
			};
			List<DeviceVedioCountDto> notList = deviceVedioCountDao.findNoOrderTime(values,isInterCut);
			writeLog("", "===query DeviceVedioCountDto success end !  time consuming:"+(System.currentTimeMillis()-bgTime), LOGLEVEL_INFO, OrderService.class);
			int notcanPayNumber = 0,oldPayNum=0;//加当前订单已购买条数/不加当前订单购买条数
			for (DeviceVedioCountDto countDto : notList) {
				String date=sdf.format(countDto.getPlay_date());
				notcanPayNumber=countDto.getPlay_number();
				oldPayNum=countDto.getPlay_number();
				for (AdvertiseInfoDto adDto : list) {
					if(dto.getId()==adDto.getId()&&dto.getDevice_id().equals(adDto.getDevice_id())&&dto.getIdle_time().equals(adDto.getIdle_time())&&date.compareTo(adDto.getEndDate())<=0){//把对应周期和小计放入dto
						notcanPayNumber+=1;
					}
				}
  				//writeLog("",dto.getDevice_id()+"-"+dto.getIdle_time()+"-"+dto.getShop_name()+"==data:"+date+"--- notcanPayNumber:"+notcanPayNumber,LOGLEVEL_INFO,BaseController.class);
				if(notcanPayNumber>dto.getPlay_number()){//可卖播放次数已满
					result.append(date+"可购买: <em class=\"red\">"+(dto.getPlay_number()-oldPayNum)+"</em>条,");
					map.put("canBuy-"+date+"-"+key, (dto.getPlay_number()-oldPayNum)+"");//购买广告可卖条数
				}
				//writeLog("","++++appendStr result:"+result,LOGLEVEL_INFO,BaseController.class);
				if(result!=null&&!util.isNull(result.toString())){
					if(!map.containsKey(key)){
						map.put("body"+key+"-"+dto.getDevice_code(), result.toString().substring(0,result.length()-1));//
						map.put("time"+key+"-"+dto.getDevice_code(), dto.getStartDate()+"=="+dto.getEndDate());//购买广告时间周期
					}
				}else{
					//result=null;
				}
			}
		}
		writeLog("", "===query isPlayTimeInterval success end !  time consuming:"+(System.currentTimeMillis()-bgTime), LOGLEVEL_INFO, OrderService.class);
		return map;
	}
	
	/**
	 * 查询当前广告那些天已卖完
	 * @param request
	 * @param paramName
	 * return String 不能播放的时间列表
	 */
	public List<DeviceVedioCountDto> findAdvertiseDateForSellOut(Map<String,String[]> map) throws Exception{
		Object[] values = new Object[] {//封装订单详情数据
				map.get("deviceId")[0],
				map.get("idleTime")[0].split("-")[0],
				map.get("idleTime")[0].split("-")[1],
				map.get("playNum")[0]
			};
		writeLog("","paramer values:"+JSONArray.fromObject(values),LOGLEVEL_INFO,BaseController.class);
		List<DeviceVedioCountDto> notList = deviceVedioCountDao.findNoOrderTime(values);
		return notList;
	}
	
	/**
	 * 获取用户折扣优惠
	 * @param request
	 * @param orderCount 订单条数
	 * return String 用户折扣
	 */
	public double queryUserDiscount(HttpServletRequest req,int orderCount){
		//String count = systemSetDao.getSystemValueByKey(AD_COUNT_DISCOUNT);
		String disCount="100";
		CustomerDto user=(CustomerDto)req.getSession().getAttribute(SESSION_USER);
		
		if(user.getT_type()==FOUR||user.getT_type()==SIX){//代理
			disCount=systemSetDao.getSystemValueByKey(OPERATION_CENTER_AD_PRICE_DISCOUNT);
		}
		
		/*if(orderCount<(util.isNull(count)?Integer.MAX_VALUE:Integer.parseInt(count))){
			if(user.getReferrals_type()==1){//直客
				disCount=systemSetDao.getSystemValueByKey(CLIENT_AD_PRICE_DISCOUNT);
			}else if(user.getReferrals_type()==2){//推荐人
				disCount=systemSetDao.getSystemValueByKey(REFERRALS_AD_PRICE_DISCOUNT);
			}else if(user.getReferrals_type()==4){//运营中心
				disCount=systemSetDao.getSystemValueByKey(OPERATION_CENTER_AD_PRICE_DISCOUNT);
			}
		}else{
			disCount=systemSetDao.getSystemValueByKey(AD_PRICE_DISCOUNT);
		}*/
		writeLog("","disCount:"+disCount+"====referralsType:"+user.getT_type(),LOGLEVEL_INFO,BaseController.class);
		return util.isNumber(disCount)?Double.parseDouble(disCount)/100:1;
		//return 1;
	}

	
	/**
	 * 阿里云短信发送接口
	 * reg=0,updatepwd=1
	 * @param aliyunPhone
	 * @return
	 */
	 public boolean sendMessage(int templateIndex,Object obj){
		   boolean sendFlag=false;
		   String moblie=null;
			try {
				
				//如果不启用阿里云短信接口，则直接返回发送成功.0=不启用，1=启用
				if(aliyunPhone.getIsSend()==ZERO){
					sendFlag=true;
					return sendFlag;
				}
				
				if(templateIndex>=aliyunPhone.getTemplateCodelist().size()||templateIndex<ZERO){
					writeLog("", templateIndex+" is not match getTemplateCodelist size "+aliyunPhone.getTemplateCodelist().size(), LOGLEVEL_INFO, BaseController.class);
					return sendFlag;
				}
				
				
				//设置超时时间
				System.setProperty("sun.net.client.defaultConnectTimeout", String.valueOf(aliyunPhone.getConnectTimeOut()));
				System.setProperty("sun.net.client.defaultReadTimeout",String.valueOf(aliyunPhone.getReadTimeOut()));
				//初始化ascClient,暂时不支持多region（请勿修改）
				IClientProfile profile = DefaultProfile.getProfile(aliyunPhone.getAscClientRegion(), aliyunPhone.getAccessKeyId(),
						aliyunPhone.getAccessKeySecret());
				DefaultProfile.addEndpoint(aliyunPhone.getAscClientRegion(), aliyunPhone.getAscClientRegion(), aliyunPhone.getApiProduct(), aliyunPhone.getApiDomain());
				IAcsClient acsClient = new DefaultAcsClient(profile);
				 
				 //组装请求对象
				 SendSmsRequest request = new SendSmsRequest();
				 request.setMethod(MethodType.POST);
			
				switch (templateIndex) {
				case 0://注册
					RegPhoneRandomNumDto reg=(RegPhoneRandomNumDto)obj;
					moblie=reg.getMovePhone();
					request.setTemplateParam("{\"code\":\""+reg.getVaildCode()+"\"}");
					//可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
					request.setOutId(moblie);
					break;
				case 1:
					RegPhoneRandomNumDto upatePwd=(RegPhoneRandomNumDto)obj;
					moblie=upatePwd.getMovePhone();
					request.setTemplateParam("{\"code\":\""+upatePwd.getVaildCode()+"\"}");
					//可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
					request.setOutId(moblie);
					//req.setSmsParamString("{\"user_id\":\""+aliyunPhone.getLoginName()+"\",\"money\":\""+aliyunPhone.getPassWord()+"\"}");
					break;
				case 2:
					RegPhoneRandomNumDto upateWithDrawPwd=(RegPhoneRandomNumDto)obj;
					moblie=upateWithDrawPwd.getMovePhone();
					request.setTemplateParam("{\"code\":\""+upateWithDrawPwd.getVaildCode()+"\"}");
					//可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
					request.setOutId(moblie);
					//req.setSmsParamString("{\"user_id\":\""+aliyunPhone.getLoginName()+"\",\"money\":\""+aliyunPhone.getPassWord()+"\"}");
					break;
				default:
					break;
				}
				request.setTemplateCode(aliyunPhone.getTemplateCodelist().get(templateIndex));
				request.setSignName(aliyunPhone.getSignName());
				 
				if(moblie!=null&&RegUtil.getUtil().isMobileNum(moblie)){
					request.setPhoneNumbers(moblie);
					 //可选-上行短信扩展码(扩展码字段控制在7位或以下，无特殊需求用户请忽略此字段)
					 //request.setSmsUpExtendCode("90997");
					 
					//请求失败这里会抛ClientException异常
					SendSmsResponse sendSmsResponse = null;
					try {
						writeLog("",moblie+" send sms to aliyun start ",LOGLEVEL_INFO,BaseController.class);
						sendSmsResponse=acsClient.getAcsResponse(request);
					} catch (Exception e) {
						sendFlag=false;
						e.printStackTrace();
						writeLog("",moblie+" send sms to aliyun Exception: "+e.getMessage(),LOGLEVEL_ERROR,BaseController.class);
						
					}
					
					
					if(sendSmsResponse!=null&&!RegUtil.getUtil().isNull(sendSmsResponse.getCode()) && ALIYUN_SMS_CODE_OK.equals(sendSmsResponse.getCode())) {
						sendFlag=true;
						writeLog("",moblie+" RequestId "+sendSmsResponse.getRequestId()+" BizId  "+sendSmsResponse.getBizId(),LOGLEVEL_INFO,BaseController.class);
					}
					
					writeLog("",moblie+" send sms to aliyun end ,sendFlag: "+sendFlag,LOGLEVEL_INFO,BaseController.class);
				}
				
				
				
			} catch (Exception e) {
				sendFlag=false;
				e.printStackTrace();
			}
			
			writeLog("",moblie+" sendFlag: "+sendFlag,LOGLEVEL_INFO,BaseController.class);
			return sendFlag;
	   }

	/**
	 * 获取广告年月周折扣优惠
	 * @param request
	 */
	public Map<String, String> queryUserYMWDiscount() throws Exception{
		List<SystemSetDto> allSysDate = systemSetDao.queryAllData();
		Map<String, String> map=new HashMap<>();
		for (SystemSetDto dto : allSysDate) {
			boolean blDisCount=dto.getSystem_key().equals(YEAR_AD_PRICE_DISCOUNT)||dto.getSystem_key().equals(MONTH_AD_PRICE_DISCOUNT)||dto.getSystem_key().equals(WEEK_AD_PRICE_DISCOUNT);//折扣多少
			boolean blNum=dto.getSystem_key().equals(YEAR_AD_NUM)||dto.getSystem_key().equals(MONTH_AD_NUM)||dto.getSystem_key().equals(WEEK_AD_NUM);//周期多少才有折扣
			if(blDisCount||blNum){
				map.put(dto.getSystem_key(), dto.getSystem_value());
			}
		}
		writeLog("","====query discount and num success ! map:"+JSONObject.fromObject(map),LOGLEVEL_INFO,BaseController.class);
		return map;
	}
	
	/**
	 * 
	 * readPicByfilePathOrAccountId: 通过图片路径来展示图片 <br/>
	 * 
	 * @author javateam
	 * @param request
	 * @param response
	 * @since JDK 1.7
	 */
	public String showIdPic(String filepath) throws Exception{
		FileInputStream hFile = null;
		byte[] data = null;
		File file = null;
		try {
			if (!util.isNull(filepath)) {
				try {
					String basePath = GobalProperties.getGobalConfig().getValueByKey("baseUploadPath");
					writeLog("", "filepath ：" + basePath + filepath , LOGLEVEL_INFO, BaseController.class);
					file = new File(basePath + filepath);
					boolean isexists = file.exists();
					if (isexists) {
						hFile = new FileInputStream(basePath
								+ filepath); // 以byte流的方式打开文件
						int i = hFile.available(); // 得到文件大小
						data = new byte[i];
						hFile.read(data); // 读数据
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				writeLog("", "filepath " + filepath + " is not find", LOGLEVEL_INFO, BaseController.class);
				return "";
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (hFile != null) {
					hFile.close();
				}
			} catch (IOException ioex) {
				ioex.printStackTrace();
			}
		}
		return "data:image/jpeg;base64,"+new String(MD5Util.base64Encode(data));
	}
	
	
	/**
	 * 
	 * @param request
	 */
	public String removeNoOrderMapToDay(Map<String, String> map) throws Exception{
		Set<String> keys = map.keySet();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		for (String str : keys) {
			if(str.indexOf("body")>=0){
				String val = map.get(str);
				writeLog("", "removeNoOrderMapToDay  val：" + val, LOGLEVEL_INFO, BaseController.class);
				if(sdf.parse(val.substring(0,10)).getTime()<=new Date().getTime()){
					if(val.indexOf(",")<0){
						map.remove(str);
						return "0";
					}else{
						map.put(str, val.substring(val.indexOf(",")+1));
					}
					writeLog("", "removeNoOrderMapToDay! map:"+GsonUtil.dtoToJson(map), LOGLEVEL_INFO, AdOrderController.class);
				}
			}
		}
		return "1";
	}
	
	/**
	 * 返回JSON数据
	 * @param response
	 * @param obj
	 */
	protected void responseJSON (HttpServletResponse response, Object obj){
	    response.setContentType("application/json; charset=utf-8"); 
	    PrintWriter pw = null;
	    try {
	    	pw = response.getWriter();
	    	if(pw.getClass().isArray()|| pw instanceof Collection){
	    		pw.println(JSONArray.fromObject(obj));
	    	}else{
	    		pw.println(JSONObject.fromObject(obj));
	    	}
			pw.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(pw!=null){
				pw.close();
			}
		}
	}
	
	
	
}
