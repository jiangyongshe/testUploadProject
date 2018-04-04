// 文件路径
var filePath = [];
var chineseError=["信息填写不完整","店铺经营范围不超过100个字符","店铺名称不超过100个字符","店铺详细地址不超过100个字符","请填写完整店铺所在区域"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	//加载省市区
	initAddr();
	// 上传图片按钮
	uploadPicBtn();
	// 提交按钮
	submitBtn();
	// 加载用户信息
	loadUserInfo();
	// 查看样图按钮
	lookExamplePic();
});

/**
 * 查看样图按钮
 * @returns
 */
function lookExamplePic(){
	$('#lookExamplePic').on('click',function(e){
		var clonePic = $('#exPic')[0].cloneNode(true);
		clonePic.style.display = 'inline-block';
		showPicPopup(clonePic,e);
	});
}

/**
 * 上传图片按钮
 * @returns
 */
function uploadPicBtn() {
	// 上传图片按钮
	$('#fileInput').on('change', function() {
		var file = document.getElementById('fileInput').files[0];
		if (!file) return;
		var formdata = new FormData();
		formdata.append('file', file);
		openWaitAnimation();
		$.ajax({
			url : '/'+language+'/AD/uploadADPic.do',
			type : 'post',
			data : formdata,
			dataType : 'json',
			cache : false,
			contentType : false,
			processData : false,
			success : function(res) {
				isLogin(res, function(res){
					var status = res.success;
					var data = res.data;
					var msg = res.msg;
					if(status){
						$('#fileInput').val('');
						// 记录路径
						filePath.push(data);
						if(filePath.length>=5){
							// 隐藏上传按钮
							$('.uploader').hide();
						}
						// 加载图片
						$('#picLi').append(
							'<a id="pictureA'+data.substring(data.indexOf('/',data.indexOf('/')+1)+1).split('.')[0]+'">'+
				            	'<img class="suspendPointer" onclick="javascript:showPicPopup($(\'#pictureA'+data.substring(data.indexOf('/',data.indexOf('/')+1)+1).split('.')[0]+'\').find(\'img\').eq(0)[0].cloneNode(true),event);" src="'+imagePath+data+'"/>'+
				           		'<span onclick="javascript:deletePic(\'pictureA'+data.substring(data.indexOf('/',data.indexOf('/')+1)+1).split('.')[0]+'\');">'+
				           			'<i class="fa fa-trash-o" aria-hidden="true"></i>'+
				           			'删除'+
				           		'</span>'+
				           	'</a>');
					}else{
						showJudegTip('fail','',msg);
					}
				});
			},
			complete : function(XHR, TR) {
				// 关闭等待动画
				closeWaitAnimation();
				if (TR == 'timeout') {// 超时
					showJudegTip('fail','','Time out,please refresh.');
				} else if (XHR.status == '500' || TR == 'error') {// 异常
					showJudegTip('fail','','Server error.');
				}
			}
		});

	});
}

/**
 * 删除图片
 * @returns
 */
function deletePic(id){
	$('#'+id).remove();
	id = id.split('pictureA')[1];
	for(var i=0;i<filePath.length;++i){
		if(filePath[i].indexOf(id)!=-1){
			filePath.splice(i,1);
			if(filePath.length<5){
				// 显示上传按钮
				$('.uploader').show();
			}
			return;
		}
	}
}

/**
 * 同意并继续按钮
 * @returns
 */
function agreeBtn(){
	$('#venturediv').hide();
	$('#agreeDeal').prop('checked',true);
}

/**
 * 提交按钮
 * @returns
 */
function submitBtn(){
	$('#submit').on('click',function(){
		var storeDetailAddr=$('#storeDetailAddr').val();
		var managerScope=$('#managerScope').val();
		var storeName=$('#storeName').val();
		var province=$('[name="province"]').find('option:selected').text();
		var city=$('[name="city"]').find('option:selected').text();
		var area=$('[name="area"]').find('option:selected').text();
		var town=$('[name="town"]').find('option:selected').text();
		if(province.indexOf("请选择 ")>0||city.indexOf("请选择 ")>0||area.indexOf("请选择 ")>0||town.indexOf("请选择 ")>0){
			showJudegTip('fail','',currError[4]);
			return;
		}
		if(storeDetailAddr==null||storeDetailAddr==""||managerScope==null||managerScope==""||storeName==null||storeName==""){
			showJudegTip('fail','',currError[0]);
			return;
		}
		if(storeDetailAddr.length>100){
			showJudegTip('fail','',currError[3]);
			return;
		}
		if(storeName.length>100){
			showJudegTip('fail','',currError[2]);
			return;
		}
		if(managerScope.length>100){
			showJudegTip('fail','',currError[1]);
			return;
		}
		jsonAjax('/'+language+'/AD/applyAD.do',
		{
			managerScope:managerScope,
			deviceWay:$('#deviceWay').find('option:selected').val(),
			storeName:storeName,
			storeDetailAddr:province+'*'+city+'*'+area+'*'+town+'&'+storeDetailAddr,
			filePaths:filePath.join(','),
			agreement:$('#agreeDeal').is(':checked')
		},
		function(res){
			var status = res.success;
			var msg = res.msg;
			if(!status){
				// 文件丢失，清空图片
				if(msg.indexOf('-fileLose')!=-1){
					msg = msg.split('-')[0];
					$('[id^="pictureA"]').remove();
					filePath = [];
				}
				showJudegTip('fail','',msg);
				return;
			}else{
				showJudegTip('success','',msg);
				$('#storeAudit').text('未审核');
			}
		},
		function(){});
	});
}

/**
 * 加载用户数据
 * @returns
 */
function loadUserInfo(){
	jsonAjax('/'+language+'/AD/loadAdvertiserInfo.do',{},
	function(res){
		var data = res.data;
		filePath = res.pic;
		// 加载数据--图片
		if(filePath.length>=5){
			// 如果图片大于五张则隐藏上传按钮
			$('.uploader').hide();
		}
		for(var i=0;i<filePath.length;++i){
			$('#picLi').append(
					'<a id="pictureA'+filePath[i].substring(filePath[i].indexOf('/',filePath[i].indexOf('/')+1)+1).split('.')[0]+'">'+
	            	'<img class="suspendPointer" onclick="javascript:showPicPopup($(\'#pictureA'+filePath[i].substring(filePath[i].indexOf('/',filePath[i].indexOf('/')+1)+1).split('.')[0]+'\').find(\'img\').eq(0)[0].cloneNode(true),event);" src="'+imagePath+filePath[i]+'"/>'+
	           		'<span onclick="javascript:deletePic(\'pictureA'+filePath[i].substring(filePath[i].indexOf('/',filePath[i].indexOf('/')+1)+1).split('.')[0]+'\');">'+
	           			'<i class="fa fa-trash-o" aria-hidden="true"></i>'+
	           			'删除'+
	           		'</span>'+
	           	'</a>');
		}
		// 加载数据--审核状态
		switch(Number(data.audit_status)){
		case 1:
			$('#storeAudit').text('未审核');
			break;
		case 2:
			$('#storeAudit').text('通过');
			$('#storeAudit').removeClass('red').addClass('green');
			// 店铺所在区域和设备使用方式不能选择
			$('[name="province"],[name="city"],[name="area"],[name="town"],#deviceWay').attr('disabled',true);
			// 店铺经营范围，店铺名称，店铺详细地址不能输入
			$('#managerScope,#storeName,#storeDetailAddr').attr('readOnly',true);
			// 隐藏上传图片
			$('.uploader').hide();
			// 隐藏删除图片按钮
			$('[id^="pictureA"]').find('span').hide();
			// 隐藏同意协议按钮
			$('#agreeDeal').parent().parent().hide();
			// 隐藏提交按钮
			$('#submit').parent().hide();
			break;
		case 3:
			$('#storeAudit').text('驳回');
			break;
		}
		// 加载数据--店铺所在区域
		var zoneData = data.mailing_address.split('&')[0].split('*');
		for(var i=0;i<zoneData.length;++i){
			var options;
			switch(i){
			case 0:
				options = $('[name="province"]').find('option');
				break;
			case 1:
				options = $('[name="city"]').find('option');
				break;
			case 2:
				options = $('[name="area"]').find('option');
				break;
			case 3:
				options = $('[name="town"]').find('option');
				break;
			}
			for(var j=0;j<options.length;++j){
				var option = options.eq(j);
				if(option.text()==zoneData[i]){
					option.attr('selected',true);
					option.parent().trigger('change');
					break;
				}
			}
		}
		
		// 加载数据--店铺经营范围
		$('#managerScope').val(data.scope);
		// 加载数据--设备使用方式
		$('#deviceWay').find('option[value="'+data.device_use_type+'"]').attr('selected',true);
		// 加载数据--店铺名称
		$('#storeName').val(data.shop_name);
		setLocalStorage('username',data.shop_name);
		// 加载数据--店铺详细地址
		$('#storeDetailAddr').val(data.mailing_address.split('&')[1]);
		if(data.shop_name!=null&&data.shop_name!=undefined&&data.shop_name!=""){
			$('#agreeDeal').prop('checked',true);
		}
	},
	function(){});
}