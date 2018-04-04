$(function(){
	var 
		imgArray = [],// 上传的图片
		
		imgMaxLength = Number(getURLParam('fileNum')),// 图片长度
		
		serialNumber = getURLParam('adNo'),// 订单号
		
		fileType = Number(getURLParam('fileType')),// 文件类型
		
		operationType = getURLParam('type'),// 操作类型
		
		file_name = '',// 如果上传过文件，此处的值为HTML/video的文件名，用于标识是否对已经上传的文件进行修改
	
		file_path = '';// 如果上传过文件，此处的值应为上传的时间，用于标识是否对已经上传的文件进行修改
	
	// 上传起始时间
	var upload_listener_start_time = 0;
	// 每次上传的大小
	var upload_file_size = 0;
	// 已上传的
	var have_upload_file_size = 0;
	// 上传的时间（上传的时候，不实时刷新）
	var upload_time = 0;
	
	// 初始化
	initData();
	
	// 上传图片按钮
	uploadIMG();
	
	// 上传视频按钮
	uploadVideo();
	
	// 提交数据按钮
	submitBtn();
	
	/**
	 * 初始化数据
	 */
	function initData(){
		var fileTypeText = fileType===1?'视频':(fileType===3?'图片':'HTML');
		if(fileType!=3){// 如果不等于3则不能上传图片
			imgMaxLength = 0;
		}
		$('[name="fileType"]').text(fileTypeText);
		$('#serialNumber').text(serialNumber);
		switch(fileType){
		case 1:// 视频
			$('#videoFile').show();
			$('#video_tip').show();
			break;
		case 3:// 图片
			$('#imgFile').show();
			$('#pic_tip').show();
			break;
		}
		// 操作类型，修改
		if(operationType === 'm'){ 
			// 查询数据
			jsonAjax("/" + language + "/video/queryAdVideoInfo.do",
				{adNo:serialNumber},
				function(res) {
					var data = res.data;
					file_name = data['file_name'];
					file_path = data['file_path'].substring(0,8);
					var vedio_type = data['vedio_type'],// 广告类型
						name = data['name'],// 广告名称
						introduction = data['introduction'],// 广告简介
						imgHTML = data['img'];
					$('#adType').val(vedio_type);
					$('#adName').val(name);
					$('#introduction').val(introduction);
					if(fileType === 1){// 视频
						// 加载视频
						$('#videoDIV').html(
							'<video src="'+videoUrl+file_path+'/'+file_name+'" class="uploader-video" controls>'
						   +'	您的浏览器不支持视频标签.'
						   +'</video>'
						   +'<p>'
						   +'	<a id="deleteVideo" style="cursor:pointer;">'
						   +'		<i class="fa fa-trash-o" aria-hidden="true"></i>删除'
						   +'	</a>'
						   +'</p>'
						);
						// 绑定删除事件
						deleteVideo();
					}else if(fileType === 3){// 图片
						if(imgHTML){
							// 加载并且缓存图片地址
							var div = document.createElement('div');
							div.innerHTML = imgHTML;
							var $img = $(div).find('img');
							for(var i=0;i<$img.length;++i){
								var imgSrc = $img.eq(i).attr('src');
								imgArray.push(imgSrc.replace(imagePath,''));
								$('#imgs').append(
										'<div class="uploader-sp2">'
										+'	<img style="cursor:pointer;" onclick="javascript:showPicPopup(this.cloneNode(true),event);" src="'+imgSrc+'"/>'
										+'	<p>'
										+'		<a id="deleteIMG'+(imgArray.length-1)+'" style="cursor:pointer;">'
										+'			<i class="fa fa-trash-o" aria-hidden="true"></i>'
										+'		</a>'
										+'	</p>'
										+'</div>'	
								);
								// 绑定删除事件
								deleteIMG(imgArray.length-1);
							}
							if(imgMaxLength === imgArray.length){
								$('#imgFile').hide();
							}
						}
					}
				},function(){});
		}
	}
	
	/**
	 * 上传图片按钮
	 */
	function uploadIMG(){
		$('#imgFile input[type="file"]').on('change',function(){
			var ths = this, 
				$ths = $(ths), 
				file = this.files[0];
			uploadIMGAjax(file,$ths);
		});
	}
	
	/**
	 * 上传视频按钮
	 */
	function uploadVideo(){
		$('#videoFile input[type="file"]').on('change',function(){
			var ths = this,
				$ths = $(ths),
				file = this.files[0],
				fileName = file.name;
			upload_listener_start_time = new Date().getTime();
			upload_file_size = 0;
			have_upload_file_size = 0;
			upload_time = new Date().getTime();
			$('#upload_file_name').text(fileName);
			$.ajaxFile({
				file:file,// 文件
				url:'/'+language+'/common/uploadVideo.do',
				fileType:['mp4','quicktime'],// 指定类型
				openWaitingAnimation:false,
				maxSize:maxVideoSize,// 限制大小
				xhr:xhrPrototypeScheduleListener,
				success:function(res){
					if(res.success){
						// 上传速度
						var speed = (have_upload_file_size/1024/1024)/((new Date().getTime()-upload_time)/1000);
						// 单位
						var unit = 'MB/S';
						if(speed<1){
							speed = speed * 1024;
							unit = 'KB/S';
						}
						if(speed<1){
							speed = speed * 1024;
							unit = 'B/S';
						}
						$('#upload_speed').text(Number(speed).toFixed(2)+unit);
						$ths.val('');
						var uri = res.data;
						$('#videoDIV').html(
							'<video src="'+videoUrl+uri+'" class="uploader-video" controls>'
						   +'	您的浏览器不支持视频标签.'
						   +'</video>'
						   +'<p>'
						   +'	<a id="deleteVideo" style="cursor:pointer;">'
						   +'		<i class="fa fa-trash-o" aria-hidden="true"></i>删除'
						   +'	</a>'
						   +'</p>'
						);
						// 绑定删除事件
						deleteVideo();
						// 缓存文件名
						file_name = uri;
						// 年月日时分秒
						file_name = uri.split('/')[1];
						// 年月日
						file_path = uri.split('/')[0];
					}else{
						tipInfo({
							status:'fail',
							content:res.msg
						});
					}
				}
			});
		});
	}
	
	/**
	 * 删除图片事件
	 * @param imgIndex
	 */
	function deleteIMG(imgIndex){
		$('#deleteIMG'+imgIndex).on('click',function(){
			imgArray.remove(imgArray[Number(this.id.replace('deleteIMG',''))]);
			$(this).parent().parent().remove();
			// 重置IMG的ID,为的是删除数据时能正确找到下标
			var $deleteIMG = $('[id^=deleteIMG]');
			if($deleteIMG.length>0){
				// 修改ID
				for(var i=0;i<$deleteIMG.length;++i){
					$deleteIMG.eq(i).attr('id','deleteIMG'+i);
				}
			}
			$('#imgFile').show();
		});
	}
	
	/**
	 * 删除视频事件
	 */
	function deleteVideo(){
		$('#deleteVideo').on('click',function(){
			file_path = '';
			file_name = '';
			$('#videoDIV').empty();
			$('.shangcjd').hide();
		});
	}
	
	/**
	 * 提交数据按钮
	 */
	function submitBtn(){
		$('#submit').on('click',function(){
			// 提交的参数
			var ajaxParam = {};
			// 广告类型
			var adType = $('#adType').val();
			ajaxParam['vedio_type'] = adType;
			if(fileType === 1){// 视频
				// 文件类型
				ajaxParam['file_type'] = 1;
				if(file_name === '' || file_path === ''){
					tipInfo({
						status:'fail',
						content:'请上传视频'
					});
					return;
				}
			}else if(fileType === 3){// 图片
				if(imgArray.length != imgMaxLength){
					tipInfo({
						status:'fail',
						content:'请上传'+imgMaxLength+'张图片'
					});
					return;
				}
				// 模板类型
				ajaxParam['model'] = 6;
				// 文件类型
				ajaxParam['file_type'] = 3;
				// 图片
				var $img = $('#imgs img'), imgParam = [];
				for(var i=0;i<$img.length;++i){
					imgParam.push($img.eq(i).attr('src'));
				}
				ajaxParam['imgUrl'] = imgParam.join(',');
			}else{
				tipInfo({
					status:'fail',
					content:'非法操作'
				});
				return;
			}
			// 订单号
			ajaxParam['serial_number'] = serialNumber;
			// 以下参数用于标识是否上传过文件
			ajaxParam['file_name'] = file_name;
			ajaxParam['file_path'] = file_path;
			
			ajaxParam['name'] = '';
			ajaxParam['introduction'] = '';
			// 提交数据
			jsonAjax("/" + language + "/video/operateAdVideo.do",ajaxParam,
			function(res) {
				if(res.success){
					// 跳转到我的订单页
					window.location.href="customerOrder.do";
				}else{
					tipInfo({
						status:'fail',
						content:res.data
					});
				}
			},function(){});
		});
	}
	
	/**
	 * 将图片传入后台
	 * @param file 文件二进制
	 * @param $ths 文件框（非必传，传入将在上传文件成功后清空文本）
	 * @returns
	 */
	function uploadIMGAjax(file,$ths){
		$.ajaxFile({
			file:file,// 文件
			url:'/'+language+'/common/uploadIMG.do',
			fileType:['jpg','png','gif','jpeg'],// 指定类型
			maxSize:maxPicSize,// 限制大小
			success:function(res){
				if($ths){
					// 清空文本框
					$ths.val('');
				}
				// 年月日时分秒
				file_name = new Date(nowTime).format(DATE_FORMAT_YMDHMS);
				// 年月日
				file_path = new Date(nowTime).format(DATE_FORMAT_YMD);
				var success = res.success;
				var msg = res.msg;
				var data = res.data;
				if(success){
					imgArray.push(data);
					// 加载图片
					$('#imgs').append(
						'<div class="uploader-sp2">'
					   +'	<img style="cursor:pointer;" onclick="javascript:showPicPopup(this.cloneNode(true),event);" src="'+imagePath+data+'"/>'
					   +'	<p>'
					   +'		<a id="deleteIMG'+imgArray.indexOf(data)+'" style="cursor:pointer;">'
					   +'			<i class="fa fa-trash-o" aria-hidden="true"></i>'
					   +'		</a>'
					   +'	</p>'
					   +'</div>'	
					);
					// 绑定删除事件
					deleteIMG(imgArray.indexOf(data));
					if(imgArray.length === imgMaxLength){
						// 达到最大数量则隐藏上传框
						$('#imgFile').hide();
					}
				}else{
					tipInfo({
						status:'fail',
						content:msg
					});
				}
			}
		});
	}

	/**
	 * 数据传输进度监控
	 */
	function xhrPrototypeScheduleListener(){
		var xhr = $.ajaxSettings.xhr();
		xhr.upload.onprogress = function(e){
			var nowTime = new Date().getTime();
			// 上传的大小
			upload_file_size = e.loaded - have_upload_file_size;
			// 上传速度
			var speed = (upload_file_size/1024/1024)/((nowTime-upload_listener_start_time)/1000);
			// 单位
			var unit = 'MB/S';
			if(speed<1){
				speed = speed * 1024;
				unit = 'KB/S';
			}
			if(speed<1){
				speed = speed * 1024;
				unit = 'B/S';
			}
			$('#upload_speed').text(Number(speed).toFixed(2)+unit);
			// 上传进度
			$('#upload_proportion_percentage_width').css('width',Number(e.loaded*100/e.total)+'%');
			$('#upload_proportion_percentage_text').text(Number(e.loaded*100/e.total).toFixed(2)+'%');
			var upload_proportion = '';
			if(e.total/1024/1024>1){
				upload_proportion = Number(e.loaded/1024/1024).toFixed(2)+'MB/'+Number(e.total/1024/1024).toFixed(2)+'MB';
			}else if(e.total/1024>1){
				upload_proportion = Number(e.loaded/1024).toFixed(2)+'KB/'+Number(e.total/1024).toFixed(2)+'KB';
			}else{
				upload_proportion = Number(e.loaded).toFixed(2)+'B/'+Number(e.total).toFixed(2)+'B';
			}
			$('#upload_proportion').text(upload_proportion);
			// 计算剩余时间
			var residueTime = (e.total-e.loaded)/(upload_file_size/((nowTime-upload_listener_start_time)/1000));
			residueTime = Number(Number(residueTime).toFixed(0));
			if(residueTime<60){
				// 秒
				var second = residueTime < 10 ? ('0'+residueTime) : residueTime;
				residueTime = '00:00:'+second;
			}else if(residueTime<3600){
				// 秒
				var second = residueTime%60;
				// 分钟
				var minute = (residueTime-second)/60;
				second = second < 10 ? ('0'+second) : second;
				minute = minute < 10 ? ('0'+minute) : minute;
				residueTime = '00:'+minute+':'+second;
			}else{
				// 分钟
				var minute = residueTime%3600;
				// 小时
				var hours = (residueTime - minute)/3600;
				// 秒
				var second = minute%60;
				minute = (minute-Number(second))/60;
				second = second < 10 ? ('0'+second) : second;
				minute = minute < 10 ? ('0'+minute) : minute;
				hours  = hours < 10  ? ('0'+hours)  : hours;
				residueTime = hours+':'+minute+':'+second;
			}
			$('#time_remaining').text(residueTime);
			// 展示进度框
			$('.shangcjd').show();
			// 刷新当前时间
			upload_listener_start_time = nowTime;
			// 已上传的大小
			have_upload_file_size = e.loaded;
		}
		return xhr;
	}
})

