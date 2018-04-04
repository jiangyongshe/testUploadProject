package com.cwa.client.web;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cwa.client.dao.ClientInOutMoneyDao;
import com.cwa.client.dto.ClientInOutMoneyDto;
import com.cwa.client.dto.InOutMoneyParamDto;

public class TestCase {

	private String[] classPathresources = {"applicationContext.xml","applicationContextPayConfig.xml"};
	
	private ApplicationContext ac;
	
	@Before
	public void init(){
		ac = new ClassPathXmlApplicationContext(classPathresources);
	}
	
	@Test
	public void TestA() throws Exception{
		ClientInOutMoneyDao dao = ac.getBean("clientInOutMoneyDao",ClientInOutMoneyDao.class);
		InOutMoneyParamDto param = new InOutMoneyParamDto();
		param.setAccount_id("13412345678");
		List<ClientInOutMoneyDto> list = dao.queryDetail(param);
		System.out.println(list.size());
	}
}
