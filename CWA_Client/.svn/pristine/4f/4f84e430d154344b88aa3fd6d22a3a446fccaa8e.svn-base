package com.cwa.client.web.quartzJob;


import javax.annotation.Resource;

import com.cwa.client.service.CancelTimeoutOrderService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

public class CanceOrderlTaskTimer implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();

	@Resource
	private CancelTimeoutOrderService cancelTimeoutOrderService;
	
	
	public void execute() throws Exception{
		logWriteUtil.writeLog(LOGTYPE_TIMER, "The timeout order begin cleared.", LOGLEVEL_INFO, CanceOrderlTaskTimer.class);
		cancelTimeoutOrderService.cancelTimeoutOrder();
		logWriteUtil.writeLog(LOGTYPE_TIMER, "The timeout order end cleared.", LOGLEVEL_INFO, CanceOrderlTaskTimer.class);
	}

}
