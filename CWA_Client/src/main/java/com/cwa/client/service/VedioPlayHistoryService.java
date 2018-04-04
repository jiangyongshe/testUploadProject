package com.cwa.client.service;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.AdvertiseInfoDao;
import com.cwa.client.dao.VedioPlayHistoryDao;
import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.dto.VedioPlayHistoryDto;
import com.cwa.client.model.Tb_Vedio_Play_History;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.GsonUtil;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.PageVars;
import com.cwa.client.utils.RegUtil;

@Service
public class VedioPlayHistoryService implements Constant{
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private VedioPlayHistoryDao vedioPlayHistoryDao;
	
	@Resource
	private AdvertiseInfoDao advertiseInfoDao;
	
	public Tb_Vedio_Play_History findById(Integer id){
		return vedioPlayHistoryDao.findById(id);
	}
	
	public void save(Tb_Vedio_Play_History entity) throws Exception{
		vedioPlayHistoryDao.save(entity);
	}
	
	
	public void update(Tb_Vedio_Play_History entity) throws Exception {
		vedioPlayHistoryDao.update(entity);
	}
	
	public void delete(Tb_Vedio_Play_History entity) throws Exception {
		vedioPlayHistoryDao.delete(entity);
	}
	
	public PageModel<VedioPlayHistoryDto> getPageModel(VedioPlayHistoryDto dto){
    	PageVars pvNm=this.getVars(dto,1);
		PageVars pvlist=this.getVars(dto,0);
		PageModel<VedioPlayHistoryDto> pm=vedioPlayHistoryDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvNm.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    }
    
    
    private PageVars getVars(VedioPlayHistoryDto dto,int type){
    	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
    	 if(type==1){
    		 sbStr.append("select count(1) as cnum  from tb_vedio_play_history h,tb_vedio a where h.vedio_id=a.id and h.play_status<>3 and h.play_status<>1 ");
    	 } else {
    		 sbStr.append("select * from (select h.ID,h.device_id,a.name vedio_name"+
							",h.begin_time beginTime,h.end_time endTime,a.SERIAL_NUMBER,"+
							"h.play_status ,ad.DEVICE_AD_NAME shopName,get_pic(h.device_id) pics "+
							"from tb_vedio_play_history h,tb_vedio a ,tb_advertiser_device ad where "+ 
							" h.vedio_id=a.id and h.device_id=ad.DEVICE_ID "+
							"and h.play_status<>3 and h.play_status<>1 ");
    	 }
    	 if(!RegUtil.getUtil().isNull(dto.getAccountId())){
    		 sbStr.append(" and a.COMMIT_ID=:accountId");
    		 params.put("accountId", dto.getAccountId());
    	 }
    	 if(dto.getBegin_time()!=null){
    		 sbStr.append(" and h.begin_time>=:begin_time");
    		 params.put("begin_time", dto.getBegin_time());
    	 }
    	 if(dto.getEnd_time()!=null){
    		 sbStr.append(" and date_format(h.end_time,'%Y-%m-%d')<=:end_time");
    		 params.put("end_time", dto.getEnd_time());
    	 }    
    	  if (type!=1) {
				sbStr.append(" ) as df  ORDER BY beginTime desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize()+"");
		  }
    	  System.out.println("sql:"+sbStr.toString());
    	  
    	  pv.setSbstr(sbStr);
	      pv.setParams(params);
	      logWriteUtil.writeLog("", "sql:"+sbStr+"===param:"+GsonUtil.dtoToJson(params), LOGLEVEL_INFO, VedioPlayHistoryService.class);
		 return pv;
    }	
    
    
   /* public PageModel<AdvertiseInfoDto> getPageModel(VedioPlayHistoryDto dto){
    	PageVars pvNm=this.getVars(dto,1);
		PageVars pvlist=this.getVars(dto,0);
		PageModel<AdvertiseInfoDto> pm=advertiseInfoDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvNm.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    }
    
    
    private PageVars getVars(VedioPlayHistoryDto dto,int type){
    	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
    	 if(type==1){
    		 sbStr.append("select count(1) as cnum  from tb_vedio_play_history h,tb_order o,tb_vedio_audit a where h.vedio_id=a.vedio_id and a.serial_number=o.serial_number and h.play_status<>3 ");
    	 } else {
    		 sbStr.append("select h.ID,h.device_id,a.name adName,o.shop_name ,o.ad_length,h.begin_time startDate,h.end_time endDate,h.serial_number,h.play_status order_status,o.total_price sumPrice,o.price ad_price,CONCAT(d.BEGIN_TIME,\"-\",d.END_TIME) idle_time, "
    				 +"(SELECT Group_concat(PIC ) FROM tb_advertiser_pic WHERE device_id=o.device_id) pics "
    		 		+ " from tb_vedio_play_history h,tb_order o,tb_order_detail d,tb_vedio a where h.vedio_id=a.id and a.serial_number=o.serial_number and o.serial_number=d.serial_number and h.play_status<>3 and h.play_status<>1 ");
    	 }
    	 if(!RegUtil.getUtil().isNull(dto.getAccountId())){
    		 sbStr.append(" and o.account_id=:accountId");
    		 params.put("accountId", dto.getAccountId());
    	 }
    	 if(dto.getBegin_time()!=null){
    		 sbStr.append(" and h.begin_time>=:begin_time");
    		 params.put("begin_time", dto.getBegin_time());
    	 }
    	 if(dto.getEnd_time()!=null){
    		 sbStr.append(" and date_format(h.end_time,'%Y-%m-%d')<=:end_time");
    		 params.put("end_time", dto.getEnd_time());
    	 }    
    	  if (type!=1) {
				sbStr.append(" ORDER BY h.id desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize());
		  }
    	  System.out.println("sql:"+sbStr.toString());
    	  
    	  pv.setSbstr(sbStr);
	      pv.setParams(params);
	      logWriteUtil.writeLog("", "sql:"+sbStr+"===param:"+GsonUtil.dtoToJson(params), LOGLEVEL_INFO, VedioPlayHistoryService.class);
		 return pv;
    }*/
    
}
