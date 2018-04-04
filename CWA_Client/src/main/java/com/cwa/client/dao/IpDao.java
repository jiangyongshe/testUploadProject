package com.cwa.client.dao;


import java.util.List;

import javax.swing.tree.RowMapper;

import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.cwa.client.dto.IpDto;
import com.cwa.client.model.Tb_Ip;
import com.google.zxing.common.StringUtils;


public class IpDao extends BaseDao<IpDto,IpDto>{

	 /*public Tb_Ip findByNmae(String ip) {
		 Tb_Ip ipObj= new Tb_Ip();
		 ipObj.setCountry("中国");
		 ipObj.setEndip("未知ip");
		 ipObj.setLocal("未知地区");
		 ipObj.setPrefixstartip("未知地区Ip");
		 ipObj.setSourceendip("未知地区");
		 ipObj.setSourcestartip("未知地区Ip");
		 ipObj.setStartip("未知地区Ip");
		 return ipObj;
		 
		 Tb_Ip tip=null;
		 String sql = "SELECT * FROM tb_ip WHERE  prefixstartip = ?  AND INET_ATON(?) BETWEEN ﻿StartIP AND EndIP"; 
	       String lip=StringUtils.substringBefore(ip, ".");
		 System.out.println("lip:" + lip);
		 try{
			    RowMapper<Tb_Ip> row=BeanPropertyRowMapper.newInstance(Tb_Ip.class);
			    List<Tb_Ip> list =  this.jdbcTemplate.query(sql, row,lip,ip);
			    if(list.size()>0){
			    	return list.get(0);
			    }
	        }catch (Exception e) {
	        	e.printStackTrace();
	            if((e instanceof IncorrectResultSizeDataAccessException)
	                    &&((IncorrectResultSizeDataAccessException)e).getActualSize()==0)
	                return null;
	    }
			return tip;
	    }  */
	 
}
