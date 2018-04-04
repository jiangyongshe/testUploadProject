package com.cwa.client.service;



import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.CustomerWalletDao;
import com.cwa.client.dao.PartnerDao;
import com.cwa.client.model.Tb_Partner;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

import net.sf.json.JSONObject;

@Service
public class PartnerService implements Constant{
	
	private static LogWriteUtil util=LogWriteUtil.getSingleton();
	
	@Resource
	private PartnerDao partnerDao;
	
	@Resource
	private CustomerWalletDao customerWalletDao;
	
	public Tb_Partner findById(Integer agentId){
		return partnerDao.findById(agentId);
	}
	
	public int findAdminByAccountId(String accountId){
		return partnerDao.findAdminByAccountId(accountId);
	}
	
	
	//注册合伙人
	public void registerPartner(Tb_Partner entity) throws Exception{
		partnerDao.save(entity);
		util.writeLog("","==customer:"+entity.getAccount_id()+"==dto:"+JSONObject.fromObject(entity),LOGLEVEL_INFO, PartnerService.class);
		/*partnerDao.insertCommonReport(entity.getAccount_id());
		Tb_Customer_Wallet wallet=new Tb_Customer_Wallet();//初始化钱包
		wallet.setAMOUNT(new BigDecimal(0));
		wallet.setCUSTOMER_ID(entity.getAccount_id());
		wallet.setSTATE(1);
		customerWalletDao.save(wallet);*/
	}
}
