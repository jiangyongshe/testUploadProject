package com.cwa.client.web.quartzJob;

import java.io.File;
import java.util.List;
import javax.annotation.Resource;
import com.cwa.client.dao.FileManagerDao;
import com.cwa.client.dto.FileManagerDto;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.Encypter;
import com.cwa.client.utils.LogWriteUtil;

public class ClearFileTaskTimer implements Constant {

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();

	@Resource
	private FileManagerDao fileManagerDao;
	
	/**
	 * 基础路径
	 */
	private static final String BASE_UPLOAD_PATH = "baseUploadPath";

	public void execute() {
		logWriteUtil.writeLog(LOGTYPE_TIMER, "The expired file is being cleared.", LOGLEVEL_INFO, ClearFileTaskTimer.class);
		FileManagerDto fileManager = new FileManagerDto();
		// 查询过期的文件数据并删除
		List<FileManagerDto> list = fileManagerDao.query();
		for (FileManagerDto fdt : list) {
			String path = fdt.getFilePath();
			File file = new File(Encypter.getValueByKey(BASE_UPLOAD_PATH)+path);
			// 删除文件
			if (file.exists() && file.isFile()){
				logWriteUtil.writeLog(LOGTYPE_TIMER, "File "+file.getName()+" was delete.", LOGLEVEL_INFO, ClearFileTaskTimer.class);
				file.delete();
			}
			// 删除空目录
			delDirectories(file.getParent());
			// 修改文件状态
			fileManager.setFilePath(path);
			fileManager.setStatus(THREE);
			fileManagerDao.upadteFileStatus(fileManager);
		}
		logWriteUtil.writeLog(LOGTYPE_TIMER, "Expired documents are cleared.", LOGLEVEL_INFO, ClearFileTaskTimer.class);
	}
	
	/**
	 * 删除空目录
	 * @param path
	 */
	public void delDirectories(String path) {
		File dir = new File(path);
		if (dir.exists() && dir.isDirectory()) {
			File[] files = dir.listFiles();
			if (files != null && files.length > 0){
				return;
			} else{
				logWriteUtil.writeLog(LOGTYPE_TIMER, "Delete empty dir,name is "+path+".", LOGLEVEL_INFO, ClearFileTaskTimer.class);
				dir.delete();
			}
		}
	}
	
}
