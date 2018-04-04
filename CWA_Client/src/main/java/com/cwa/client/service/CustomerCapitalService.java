package com.cwa.client.service;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dao.CommissionDetailDao;
import com.cwa.client.dto.ADCommissionDetailDto;
import com.cwa.client.dto.ClientInOutMoneyDto;
import com.cwa.client.dto.CommissionDetailDto;
import com.cwa.client.dto.InOutMoneyParamDto;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.PageModel;
import com.cwa.client.utils.PageVars;

@Service
public class CustomerCapitalService  implements Constant {
	
	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	@Resource
	private CommissionDetailDao commissionDetailDao;
	
	@Resource
	private ClientInOutMoneyDao clientInOutMoneyDao;
	
	public PageModel<ClientInOutMoneyDto> getPageModelWithdraw(InOutMoneyParamDto dto){
    	PageVars pvNm=this.getVarsWithdraw(dto,1);
		PageVars pvlist=this.getVarsWithdraw(dto,0);
		PageModel<ClientInOutMoneyDto> pm=clientInOutMoneyDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvNm.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    	
    }
	
	public PageModel<CommissionDetailDto> getPageModelCommission(ADCommissionDetailDto dto){
    	PageVars pvNm=this.getVarsCommission(dto,1);
		PageVars pvlist=this.getVarsCommission(dto,0);
		PageModel<CommissionDetailDto> pm=commissionDetailDao.getPageModel(pvlist.getSbstr().toString(), pvNm.getSbstr().toString(),pvNm.getParams(),dto.getPageNo(),dto.getPageSize());
		return pm;
    	
    }
    
    
    private PageVars getVarsWithdraw(InOutMoneyParamDto dto,int type){
    	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
		 params.put("accountId", dto.getAccount_id());
    	 if(type==1){
    		 sbStr.append("select count(1) as cnum  from tb_client_in_out_money A "
    	 			   +"WHERE A.ACCOUNT_TYPE=6 AND A.IN_OUT_TYPE='1' AND A.ACCOUNT_ID = :accountId ");
    	 } else {
    		 sbStr.append("SELECT A.AMOUNT,A.STATUS,A.OPEN_DATE,2 account_type FROM tb_client_in_out_money A "
    	 			   +"WHERE A.ACCOUNT_TYPE=6 AND A.IN_OUT_TYPE='1' AND A.ACCOUNT_ID = :accountId " );
    	 }
 		// 判断是否根据开始时间查询
 		if(dto.getStartTime()!=null&&!"".equals(dto.getStartTime())){
 			sbStr.append(" AND DATE_FORMAT(A.OPEN_DATE,'"+MYSQL_DATE_FORMAT_YMD+"')>=DATE_FORMAT(:startDate,'"+MYSQL_DATE_FORMAT_YMD+"') ");
 			params.put("startDate",dto.getStartTime());
 		}
 		// 判断是否根据结束时间查询
 		if(dto.getEndTime()!=null&&!"".equals(dto.getEndTime())){
 			sbStr.append(" AND DATE_FORMAT(A.OPEN_DATE,'"+MYSQL_DATE_FORMAT_YMD+"')<=DATE_FORMAT(:endDate,'"+MYSQL_DATE_FORMAT_YMD+"') ");
 			params.put("endDate",dto.getEndTime());
 		}
    	 
    	  if (type!=1) {
				sbStr.append(" ORDER BY DATE_FORMAT(A.OPEN_DATE,'"+MYSQL_DATE_FORMAT_YCDHMS+"') desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize());
		  }
    	  logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sbStr.toString()+";"+"params:"+params, LOGLEVEL_INFO, CustomerCapitalService.class);
    	  pv.setSbstr(sbStr);
	      pv.setParams(params);
		 
		 return pv;
    }	
    
    private PageVars getVarsCommission(ADCommissionDetailDto dto,int type){
   	 	 PageVars pv=new PageVars();
		 StringBuffer sbStr=new StringBuffer(); 
		 HashMap<String,Object> params = new HashMap<String,Object>();
		 params.put("refId", dto.getAccount_id());//用户id
		 if(type==1){
    		 sbStr.append("select count(1) as cnum  from ( ");
    	 } else {
    		 sbStr.append("SELECT a.REFERRALS_COMM,a.BALANCE_DATETIME,a.type FROM (");
    	 }
		 
		if(dto.getUserType()==TWO){//店主收益
			sbStr.append("SELECT SETTLEMENT_DATE BALANCE_DATETIME,ADVERTISER_COMM REFERRALS_COMM,'广告收益' type from  tb_comm_flow where ADVERTISER_ID=:refId and ADVERTISER_COMM>0 union all ");//广告收益
			sbStr.append("SELECT SETTLEMENT_DATE BALANCE_DATETIME,REFERRALS_COMM REFERRALS_COMM,'推荐收益' type from  tb_comm_flow where REFERRALS_TYPE=1 and REFERRALS_COMM>0 and REFERRALS_ID=:refId ");//推荐收益
 		}/*else if(dto.getUserType()==THREE){
 			sbStr.append("SELECT SETTLEMENT_DATE BALANCE_DATETIME,ADVERTISER_COMM REFERRALS_COMM,'广告收益' type from  tb_comm_flow where ADVERTISER_ID=:refId and ADVERTISER_COMM>0 union all ");//广告收益
			sbStr.append("SELECT SETTLEMENT_DATE BALANCE_DATETIME,REFERRALS_COMM REFERRALS_COMM,'推荐收益' type from  tb_comm_flow where REFERRALS_TYPE=1 and REFERRALS_COMM>0 and REFERRALS_ID=:refId ");//推荐收益
 			strSql=strSql.replace("adComm", "PARTNER_COMM").replace("adUserId", "PARTNER_ID")
 					.replace("mComm", "MANAGER_COMM").replace("profitType", "'屏主收益'").replace("mUserId", "MASTER_ID");
 		}*/else if(dto.getUserType()==FOUR){//代理
 			sbStr.append("SELECT BALANCE_DATETIME,AGENT_COMM REFERRALS_COMM,'广告收益' type from tb_commission_detail where AGENT_ID=:refId and AGENT_COMM>0 union all ");//广告收益
			sbStr.append("SELECT BALANCE_DATETIME,MASTER_COMM REFERRALS_COMM,'屏主收益' type from tb_commission_detail where MASTER_TYPE=2 and MASTER_ID=:refId and MASTER_COMM>0 ");//推荐收益
 		}else if(dto.getUserType()==FIVE){//业务员
 			sbStr.append("SELECT BALANCE_DATETIME,SALESMAN_COMM REFERRALS_COMM,'广告收益' type from tb_commission_detail where SALESMAN_ID=:refId and SALESMAN_COMM>0 union all ");//广告收益
			sbStr.append("SELECT BALANCE_DATETIME,MASTER_COMM REFERRALS_COMM,'屏主收益' type from tb_commission_detail where MASTER_TYPE=4 and MASTER_ID=:refId and MASTER_COMM>0 ");//推荐收益
 		}else if(dto.getUserType()==SIX){//销售员
 			sbStr.append("SELECT BALANCE_DATETIME,SALESPERSON_COMM REFERRALS_COMM,'广告收益' type from tb_commission_detail where SALESPERSON_ID=:refId and SALESPERSON_COMM>0 union all ");//广告收益
			sbStr.append("SELECT BALANCE_DATETIME,MASTER_COMM REFERRALS_COMM,'屏主收益' type from tb_commission_detail where MASTER_TYPE=5 and MASTER_ID=:refId and  MASTER_COMM>0 ");//推荐收益
 		}
		 
		 sbStr.append(") a where 1=1 ");
		 // 判断是否根据开始时间查询
 		if(dto.getStartTime()!=null&&!"".equals(dto.getStartTime())){
 			sbStr.append(" AND DATE_FORMAT(a.BALANCE_DATETIME,'"+MYSQL_DATE_FORMAT_YMD+"')>=DATE_FORMAT(:startDate,'"+MYSQL_DATE_FORMAT_YMD+"') ");
 			params.put("startDate",dto.getStartTime());
 		}
 		// 判断是否根据结束时间查询
 		if(dto.getEndTime()!=null&&!"".equals(dto.getEndTime())){
 			sbStr.append(" AND DATE_FORMAT(a.BALANCE_DATETIME,'"+MYSQL_DATE_FORMAT_YMD+"')<=DATE_FORMAT(:endDate,'"+MYSQL_DATE_FORMAT_YMD+"') ");
 			params.put("endDate",dto.getEndTime());
 		}
 		if(dto.getType()!=null&&!"".equals(dto.getType())){
 			if("5".equals(dto.getType())){
 				sbStr.append(" and (a.type='推荐收益' or a.type='屏主收益') ");
 			}else if("6".equals(dto.getType())){
 				sbStr.append(" and a.type='广告收益' ");
 			}
 		}
 		
 		if (type!=1) {
   		  	sbStr.append(" ORDER BY date_format(a.BALANCE_DATETIME,'"+MYSQL_DATE_FORMAT_YMD+"') desc LIMIT " + (dto.getPageNo() - 1) * dto.getPageSize() + "," + dto.getPageSize());
   	  	}
 		
 		String strSql=sbStr.toString();
 		
 		sbStr=new StringBuffer(strSql);
   	  	logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sbStr.toString()+";"+"params:"+params, LOGLEVEL_INFO, CustomerCapitalService.class);
   	  	pv.setSbstr(sbStr);
   	  	pv.setParams(params);
		return pv;
   }
  
}