package com.cwa.client.dao;

import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.cwa.client.dto.AdvertiseInfoDto;
import com.cwa.client.model.Tb_client_in_out_money;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;
import net.sf.json.JSONArray;

/**
 * 查询广告信息数据层
 */
public class AdvertiseInfoDao extends BaseDao<AdvertiseInfoDto, AdvertiseInfoDto> implements Constant{

private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 查询广告用户
	 * @param advertiserDto 查询条件
	 * @return
	 */
	public List<AdvertiseInfoDto> queryAdvertiseInfo(String ids,String deviceIds,String isInterCut){
		// 返回结果
		List<AdvertiseInfoDto> tbAdvertiserList = null;// and (B.device_status=1 or B.device_status=4)
		StringBuffer sql = new StringBuffer("select A.id,B.DEVICE_AD_NAME SHOP_NAME,B.DEVICE_ADDRESS MAILING_ADDRESS,B.DEVICE_ID,B.device_code,C.AD_PRICE ,C.AD_LENGTH,C.PLAY_NUMBER,CONCAT(C.BEGIN_TIME,\"-\",C.END_TIME) as idle_time, "
				+"C.inter_cut_price,C.inter_cut_length,C.inter_cut_number,C.html_price,C.html_length,C.pic_price,C.pic_length,C.inter_cut_html_price,C.inter_cut_html_length,C.inter_cut_pic_price,C.inter_cut_pic_length,"
				+"(SELECT Group_concat(PIC ) FROM tb_advertiser_pic WHERE device_id=B.device_id) pics, "
				+"C.play_number-ifnull(D.play_number,0) toDaySell "
				+"from tb_advertiser A "
				+"inner join tb_advertiser_device B on A.id=B.ADVERTISER_ID "
				+"inner join tb_device_vedio_plan C on B.DEVICE_ID=C.DEVICE_ID "
				+"left join tb_device_vedio_count D on D.device_id=C.device_id and D.begin_time=C.begin_time and D.end_time=C.end_time and date_format(D.play_date,'%Y-%m-%d')=date_format(now(),'%Y-%m-%d') "
				+"where A.AUDIT_STATUS=2 and trim(B.device_id)<>'' and C.ad_sell_status=1 ");
		 
		String[] sp = ids.split(",");
		String[] spDe = deviceIds.split(",");
		/*if(sp.length<2){
			sql.append("and A.id =?");
		}else{
			
		}*/
		for (int i = 0; i < sp.length; i++) {
			if(i==0){
				ids=" and A.id in(?";
				deviceIds=" and B.device_id in(?";
			}else{
				ids+=",?";
				deviceIds+=",?";
			}
			if(i==sp.length-1){
				ids+=")";
				deviceIds+=")";
			}
		}
		sql.append(ids+deviceIds);
		String strSql=sql.toString();
		String[] params= new String[sp.length+spDe.length];  
		System.arraycopy(sp, 0, params, 0, sp.length);  
		System.arraycopy(spDe, 0, params, sp.length, spDe.length);  
		if(isInterCut!=null&&isInterCut!=""){
			strSql=strSql.replace("C.AD_PRICE ,C.AD_LENGTH,C.PLAY_NUMBER", "C.INTER_CUT_PRICE AD_PRICE ,C.INTER_CUT_LENGTH AD_LENGTH,C.INTER_CUT_NUMBER PLAY_NUMBER");
		}
		BeanPropertyRowMapper<AdvertiseInfoDto> rowmapper = BeanPropertyRowMapper.newInstance(AdvertiseInfoDto.class);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"sql:"+strSql,LOGLEVEL_INFO,AdvertiseInfoDao.class);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"param is adIds:"+JSONArray.fromObject(sp)+"----deviceIds:"+JSONArray.fromObject(spDe),LOGLEVEL_INFO,AdvertiseInfoDao.class);
		tbAdvertiserList = this.getJdbcTemplate().query(strSql, rowmapper,params);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryAdvertiser query size "+tbAdvertiserList.size()+", result " + JSONArray.fromObject(tbAdvertiserList),LOGLEVEL_INFO,AdvertiseInfoDao.class);
		return tbAdvertiserList;
	}
	
	/**
	 * 查询广告用户
	 * @param advertiserDto 查询条件
	 * @return
	 */
	public List<AdvertiseInfoDto> queryAdvertiseLength(String orderNo) throws Exception{
		// 返回结果
		String sql = "select C.AD_PRICE ,C.AD_LENGTH,C.PLAY_NUMBER,CONCAT(C.BEGIN_TIME,\"-\",C.END_TIME) as idle_time,o.order_type,o.file_type, "
				+"C.inter_cut_price,C.inter_cut_length,C.inter_cut_number,C.html_price,C.html_length,C.pic_price,C.pic_length,C.inter_cut_html_price,C.inter_cut_html_length,C.inter_cut_pic_price,C.inter_cut_pic_length"
				+" from tb_order o,tb_order_detail d,tb_device_vedio_plan C "
				+"where o.serial_number=d.serial_number and  o.DEVICE_ID=C.DEVICE_ID and C.begin_time=d.begin_time and C.end_time=d.end_time and C.ad_sell_status=1 and o.serial_number=?";
		 
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"sql:"+sql,LOGLEVEL_INFO,AdvertiseInfoDao.class);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"param is orderNo:"+orderNo,LOGLEVEL_INFO,AdvertiseInfoDao.class);
		List<AdvertiseInfoDto> tbAdvertiserList = this.getJdbcTemplate().query(sql, BeanPropertyRowMapper.newInstance(AdvertiseInfoDto.class), orderNo);
		
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryAdvertiser query size "+tbAdvertiserList.size()+", result " + JSONArray.fromObject(tbAdvertiserList),LOGLEVEL_INFO,AdvertiseInfoDao.class);
		return tbAdvertiserList;
	}
	
	/**
	 * 查询单个店铺广告信息
	 * @param advertiserDto 查询条件
	 * @return
	 */
	public AdvertiseInfoDto querySingAdvertiseInfo(String ids,String deviceId) throws Exception{
		// 返回结果
		String sql = "select A.id,B.DEVICE_AD_NAME SHOP_NAME,B.DEVICE_ADDRESS MAILING_ADDRESS,B.DEVICE_ID,B.device_code,C.AD_PRICE ,C.AD_LENGTH,C.PLAY_NUMBER,CONCAT(C.BEGIN_TIME,\"-\",C.END_TIME) as idle_time, "
				+"C.inter_cut_price,C.inter_cut_length,C.inter_cut_number,C.html_price,C.html_length,C.pic_price,C.pic_length,C.inter_cut_html_price,C.inter_cut_html_length,C.inter_cut_pic_price,C.inter_cut_pic_length,"
				+"C.play_number-ifnull(D.play_number,0) toDaySell,"
				+"(SELECT Group_concat(PIC ) FROM tb_advertiser_pic WHERE device_id=B.device_id) pics "
				+"from tb_advertiser A "
				+"inner join tb_advertiser_device B on A.id=B.ADVERTISER_ID "
				+"inner join tb_device_vedio_plan C on B.DEVICE_ID=C.DEVICE_ID "
				+"left join tb_device_vedio_count D on D.device_id=C.device_id and D.begin_time=C.begin_time and D.end_time=C.end_time and date_format(D.play_date,'%Y-%m-%d')=date_format(now(),'%Y-%m-%d') "
				+"where A.AUDIT_STATUS=2 and trim(B.device_id)<>'' and C.ad_sell_status=1 "
				+"and A.id=? and B.device_id=?";
		 
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"sql:"+sql,LOGLEVEL_INFO,AdvertiseInfoDao.class);
		AdvertiseInfoDto tbAdvertiserdto = null;
		List<AdvertiseInfoDto> query = this.getJdbcTemplate().query(sql, BeanPropertyRowMapper.newInstance(AdvertiseInfoDto.class), ids,deviceId);
		tbAdvertiserdto=query.size()>0?query.get(0):null;
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryAdvertiser success result " + JSONArray.fromObject(tbAdvertiserdto==null?"":tbAdvertiserdto),LOGLEVEL_INFO,AdvertiseInfoDao.class);
		return tbAdvertiserdto;
	}
}