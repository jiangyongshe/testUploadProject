package com.cwa.client.web;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.CartDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.redis.JedisOptionUtil;
import com.cwa.client.service.ShoppCartService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.RespCodeEnum;

@Controller
@RequestMapping("/*/shoppCart")
public class ShoppCartController extends BaseController<GobalRespParameter> implements Constant{
	
	@Resource
	private ShoppCartService shoppCartService;
	
	//查询购物车
	@RequestMapping("/queryShoppCart.do")
	public void queryShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		//获取请求参数并判断是否为空getPageModel
		String pageSize= getParameter(req, "pageSize");
		String pageNo= getParameter(req, "pageNo");
		JedisOptionUtil jedisUtil=new JedisOptionUtil(DEVICE_ADVERISTER_TYPE);
		try {
			if(pageSize==null){//每页大写为空则默认5条
				pageSize=NINE+"";
			}
			if(pageNo==null){//当前页为空则默认首页
				pageNo=ONE+"";
			}
			if(util.isNumber(pageSize)&&util.isNumber(pageNo)){//判断参数是否正确
				Double discount = queryUserDiscount(req, 0);
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				CartDto dto=new CartDto();
				dto.setPageNo(Integer.parseInt(pageNo));
				dto.setPageSize(Integer.parseInt(pageSize));
				dto.setAccount_id(customerDto.getAccount_id());//查询用户
				writeLog("", "==== accountId:"+customerDto.getAccount_id(), LOGLEVEL_INFO, ShoppCartController.class);
				PageModel<CartDto> pageModel = shoppCartService.getPageModel(dto);
				for (CartDto pdto : pageModel.getList()) {//播放中
					pdto.setCurrPlayCount((Integer)jedisUtil.getObjectByKey(DEVICE_ADVERISTER_TYPE+"_"+pdto.getDevice_id()));
				}
				parameter.setData(pageModel);
				parameter.setMsg(discount+"");
				parameter.setSuccess(true);
				writeLog("", "query shoppCart info success! data:"+GsonUtil.dtoToJson(pageModel), LOGLEVEL_INFO, ShoppCartController.class);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			jedisUtil.returnResource();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	//加入购物车
	@RequestMapping("/joinShoppCart.do")
	public void joinShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameter(req,"joinShoppCart.do","checkTimes","checkAdvertiseId","deviceId","timeInterval","fileType");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				//获得广告信息
				List<AdvertiseInfoDto> list = getOrderList(req,map,null,false);
				List<Object []> objListInsert=new ArrayList<>();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//日期格式化
				for (AdvertiseInfoDto dto : list) {
					CartDto cartDto = null;//shoppCartService.findCartExistsAdByAccountId(dto.getAccount_id(),dto.getId(),dto.getDevice_id(),dto.getIdle_time());
					if(cartDto==null){
						BigDecimal price=new BigDecimal(0);
						if("2".equals(dto.getFile_type())){
							price=dto.getHtml_price();
						}else if("3".equals(dto.getFile_type())){
							price=dto.getPic_price();
						}
						Object [] objs={
								dto.getDevice_id(),
								dto.getAccount_id(),
								dto.getAccount_IP(),
								new Timestamp(System.currentTimeMillis()),
								dto.getShop_name(),
								dto.getId(),
								dto.getSumPrice(),
								price,
								dto.getIdle_time().split("-")[0].length()==5?dto.getIdle_time().split("-")[0]+":00":dto.getIdle_time().split("-")[0],
								dto.getIdle_time().split("-")[1].length()==5?dto.getIdle_time().split("-")[1]+":00":dto.getIdle_time().split("-")[1],
								dto.getFile_type(),
								dto.getStartDate(),
								dto.getEndDate(),
								dto.getBuyCount()
						};
						objListInsert.add(objs);
					}
				}
				writeLog("","batch join cart insertData:"+GsonUtil.dtoToJson(objListInsert), LOGLEVEL_INFO, AdQueryController.class);
				shoppCartService.batchJoinCart(objListInsert);
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
			}else{//请求参数无效
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	//剔除购物车
	@RequestMapping("/reJectShoppCart.do")
	public void reJectShoppCart(HttpServletRequest req, HttpServletResponse res) throws Exception{
		GobalRespParameter parameter=new GobalRespParameter();
		//获取请求参数并判断是否为空getPageModel
		Map<String,String[]> map = getAllParameter(req,"reJectShoppCart.do");
		RequestContext reqCt= new RequestContext(req);// 语言包
		try {
			if(map!=null){
				String cartId=getParameter(req, "cartId");
				CustomerDto customerDto=(CustomerDto)req.getSession().getAttribute(SESSION_USER);//session得到user信息
				shoppCartService.deleteByAccountId(customerDto.getAccount_id(), cartId==null?"":cartId);
				parameter.setRespCode(RespCodeEnum.SUCCESS.getCode());
				writeLog("","reJect cart success! cartId："+cartId, LOGLEVEL_INFO, AdQueryController.class);
			}else{//请求参数无效
				parameter.setRespCode(RespCodeEnum.global_parameter_isnull.getCode());
			}
		} catch (Exception e) {
			parameter.setRespCode(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setRespMessge(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
}
