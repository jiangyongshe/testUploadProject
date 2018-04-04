package com.cwa.client.service;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cwa.client.dao.SalesmanDao;
import com.cwa.client.dto.BranchDto;
import com.cwa.client.dto.SalesPersonDto;
import com.cwa.client.dto.SalesmanDto;
import com.cwa.client.utils.LogWriteUtil;

@Service
public class SalesmanService {

	private static LogWriteUtil util=LogWriteUtil.getSingleton();
	
	@Resource
	private SalesmanDao salesmanDao;
	
	public BranchDto findBranchByCmpId(String CmpId){
		return salesmanDao.findBranchByCmpId(CmpId);
	}
	
	public SalesmanDto findBySalesmanid(String salesmanid){
		return salesmanDao.findBySalesmanid(salesmanid);
	}
	
	public SalesPersonDto findBySalesPersonid(String salesPersonId){
		return salesmanDao.findBySalesPersonid(salesPersonId);
	}
	
	public void updateSalesmanCommission(String accountId,Double money){
		salesmanDao.updateSalesmanCommission(accountId,money);
	}
	
	public void updateSalesmanWithdraw(String accountId,Double withdraw){
		salesmanDao.updateSalesmanWithdraw(accountId,withdraw);
	}
}
