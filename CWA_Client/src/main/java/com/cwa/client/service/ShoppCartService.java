package com.cwa.client.service;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.ShoppCartDao;
import com.cwa.client.dto.CartDto;
import com.cwa.client.model.Tb_Cart;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.PageVars;
import com.cwa.client.utils.RegUtil;

@Service
public class ShoppCartService implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private ShoppCartDao shoppCartDao;
	
	public Tb_Cart findById(Integer id){
		return shoppCartDao.findById(id);
	}
	
	public void save(Tb_Cart entity) throws Exception{
		shoppCartDao.save(entity);
	}
	
	
	public void update(Tb_Cart entity) throws Exception {
		shoppCartDao.update(entity);
	}
	
	public void delete(Tb_Cart entity) throws Exception {
		shoppCartDao.delete(entity);
	}
	
	public PageModel<CartDto> getPageModel(CartDto dto){
    	PageVars pvNm=this.getVars(dto,1);
		PageVars pvlist=this.getVars(dto,0);
		PageModel<CartDto> pm=shoppCartDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvNm.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    }
    
    
    private PageVars getVars(CartDto dto,int type){
    	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
    	 if(type==1){
    		 sbStr.append("select count(1) as cnum  "
    				 + "from tb_cart c left join tb_advertiser A on c.ADVERTISER_ID=A.id and A.AUDIT_STATUS=2 "
     				+ "left join tb_device_vedio_plan p on c.device_id=p.device_id and p.begin_time=c.begin_time and p.end_time=c.end_time and p.ad_sell_status=1 "
     				+ "left join tb_advertiser_device B on c.id=B.ADVERTISER_ID and c.device_id=B.device_id and trim(B.device_id)<>'' where 1=1 ");
    	 } else {
    		 sbStr.append("select c.ID,c.DEVICE_ID,B.device_code,c.ORDER_NUMBER buyCount,c.file_type,ifnull(B.DEVICE_ADDRESS,'') MAILING_ADDRESS,c.play_begin_time,c.play_end_time,c.SHOP_NAME,c.ADVERTISER_ID,c.TOTAL_PRICE,IFNULL(p.ad_PRICE,0) PRICE,c.BEGIN_TIME,c.END_TIME,IFNULL(p.ad_length,0) ad_length,IFNULL(p.play_number,0) play_number, "
    				 +"p.inter_cut_price,p.inter_cut_length,p.inter_cut_number,p.html_price,p.html_length,p.pic_price,p.pic_length,p.inter_cut_html_price,p.inter_cut_html_length,p.inter_cut_pic_price,p.inter_cut_pic_length,"
    				 +"p.play_number-ifnull(D.play_number,0) toDaySell,"
    				 +"(SELECT Group_concat(PIC ) FROM tb_advertiser_pic WHERE device_id=c.device_id) pics "
    				+ "from tb_cart c left join tb_advertiser A on c.ADVERTISER_ID=A.id and A.AUDIT_STATUS=2 "
    				+ "left join tb_device_vedio_plan p on c.device_id=p.device_id and p.ad_sell_status=1 "
    				+" left join tb_device_vedio_count D on D.device_id=p.device_id and D.begin_time=p.begin_time and D.end_time=p.end_time and date_format(D.play_date,'%Y-%m-%d')=date_format(now(),'%Y-%m-%d') "
    				+ "left join tb_advertiser_device B on c.ADVERTISER_ID=B.ADVERTISER_ID and c.device_id=B.device_id and trim(B.device_id)<>'' where 1=1 ");
    	 }
    	 if(!RegUtil.getUtil().isNull(dto.getAccount_id())){
    		 sbStr.append(" and c.ACCOUNT_ID=:ACCOUNT_ID");
    		 params.put("ACCOUNT_ID", dto.getAccount_id());
    	 }     
    	  if (type!=1) {
				sbStr.append(" ORDER BY c.id desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize());
		  }
    	  System.out.println("sql:"+sbStr.toString());
    	  pv.setSbstr(sbStr);
	      pv.setParams(params);
		 
		 return pv;
    }	
    
    public void batchJoinCart(List<Object []> insertObjs) throws Exception{
    	if(insertObjs.size()>0){
    		int[] result = shoppCartDao.batchInsertCart(insertObjs);
        	logWriteUtil.writeLog("", "join cart count:"+result.length, LOGLEVEL_INFO, ShoppCartService.class);
    	}
    }
    
    //查询用户是否已加入改广告
    public CartDto findCartExistsAdByAccountId(String accountId,Integer adId,String deviceId,String timeInterval){
    	return shoppCartDao.findShoppCartByAccountId(accountId,adId,deviceId,timeInterval);
    }
    
    //删除购物车广告
    public void deleteByAccountId(String accountId,String ids){
    	shoppCartDao.deleteByAccountId(accountId, ids);
    }
    
    //查询购物车数量
    public Integer findShopCartCountByAccountId(String accountId) throws Exception{
    	return shoppCartDao.findShopCartCountByAccountId(accountId);
    }
}
