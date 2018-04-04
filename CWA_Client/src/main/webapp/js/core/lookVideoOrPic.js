$(function(){
	// 初始化数据
	initData();
	
	/**
	 * 初始化数据
	 */
	function initData(){
		var serialNumber = getURLParam('adNo');
		$('#serialNumber').text(serialNumber);
		jsonAjax("/"+language+"/video/queryAdVideoInfo.do",
				{ adNo:serialNumber },
				function(res){
					var data = res.data,
						fileType = Number(data.file_type),
						fileTypeText = fileType===1?'视频':(fileType===3?'图片':'HTML');
						adType = adTypeChange(data['vedio_type']),// 广告类型
						introduction = data['introduction'],// 广告简介
						name = data['name'];// 广告名称
					$('[name="fileType"]').text(fileTypeText);
					$('#adType').text(adType);
					$('#introduction').text(introduction);
					$('#name').text(name);
					switch(fileType){
					case 1:// 显示视频
						$('#content').append(
								'<video src="'+videoUrl+data['file_path']+'" class="uploader-video" controls></video>');
						break;
					case 3:// 显示图片
						$('#content').append(data['img']);
						// 图片预览
						$('#content img').css('cursor','pointer');
						$('#content img').on('click',function(e){
							showPicPopup(this.cloneNode(true),e);
						});
						break;
					}
				},
				function(){});
	}
	
})