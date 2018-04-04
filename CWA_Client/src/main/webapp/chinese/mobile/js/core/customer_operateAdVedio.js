var adTypeArr=["日用品广告","食品饮料广告","餐饮广告","电子家电广告","服装服饰广告","化妆品广告","钟表首饰广告","教育培训广告","文化广告","会展广告","商业商场广告","娱乐广告","社会服务广告","金融保险广告","汽车广告","房地产广告","邮电通讯快递物流广告","保健广告","旅游酒店广告","家装建材广告","交通运输广告","其他"];
var chineseError=["未知异常","视频token无效","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var operateType="",adNo="",upNum=1,id=0,fileName="",filePath="",src="",old_file_name="",isInterCut="";

$(function(){
	$("#headerTitle").text("上传广告");
	$(".wcBtn").hide();
	currError=currErrorArray(chineseError,englishError,twError);
	operateType=getURLParam("type");
	adNo=getURLParam("adNo");
	fileType=getURLParam("fileType");
	upNum=getURLParam("upNum");
	isInterCut=getURLParam("isInterCut");
	var strs=adNo.split(","),htmls="";
	for (var i = 0; i < strs.length; i++) {
		htmls+='<option value="'+strs[i]+'" data-fileType='+fileType.split(",")[i]+'>'+strs[i]+'</option>';
	}
	$(".adNo").html(htmls);
	showFileType(fileType.split(",")[0]);
	if(operateType!=""){
		$(".adNo").addClass("disabled");
		loadAdvertiseVedioInfo();//加载广告详情
	}else{
		$(".adVedio").hide();
	}
	$(".html-tab li").bind("click",function(){//模板选择
		$(".html-tab li").removeClass("active");
		$(this).addClass("active");
		if($(this).attr("attr-val")=="5"){
			$('.uploadBtn').addClass("disabled");
			$('.updUploadBtn').addClass("disabled");
		}else{
			$('.uploadBtn').removeClass("disabled");
			$('.updUploadBtn').removeClass("disabled");
		}
	})
	$(".adNo").bind("change",function(){
		var currFileType=$(this).find(":selected").attr("data-fileType");
		showFileType(currFileType);
	})
	uploadPicBtn();
})
//展示上传类型
function showFileType(ft){
	if(ft=="1"){
		$(".htmlUpl").hide(); 
		$(".imgFileUpd").hide(); 
		
		if(operateType==""||operateType=="u"){
			var loginType=getLocalStorage('loginType');
			if(loginType=="6"){
				$(".iosVioTip").show();
				$(".iosVideoUpl").show();
			}else{
				$(".fileNameDiv").show(); 
				$(".vioTip").show();
				uploadVideo();
			}
		}
		fileType="1";
	}else if(ft=="2"){
		$(".htmlUpl").show(); 
		$(".fileNameDiv").hide(); 
		$(".imgFileUpd").hide(); 
		textLimitLength();
		fileType="2";
	}else if(ft=="3"){
		//安卓app单独上传图片调用
		var loginType=getLocalStorage('loginType');
		if(loginType=="5"){
			$(".androidImgUpl").show();
			$(".imgFileUpd").hide(); 
		}else{
			if(isWeiXin()){
				$(".wechatImgUpl").show();
				$(".imgFileUpd").hide(); 
			}else{
				$(".imgFileUpd").show(); 
			}
		}
		$(".htmlUpl").hide(); 
		$(".fileNameDiv").hide(); 
		$(".imgTip").show();
		//$(".error").html("只能上传"+upNum+"张图片才可提交");
		$(".vedio")[0].style.display="none";
		fileType="3";
	}
}
//加载用户订单
function loadAdvertiseVedioInfo(){
	jsonAjax("/"+language+"/video/queryAdVideoInfo.do",{adNo:adNo},function(res){
		if(res.data!=null&&res.data!=[]){
			var data=res.data;
			fileName=data.file_name;
			filePath=data.file_path.substring(0,8);
			//src=videoUrl+filePath+"/"+fileName;
			if(data.file_type==1){
				src=videoUrl;
				playVedio();
			}else if(data.file_type==2){
				src=videoUrl;
				// 隐藏上传按钮
				$('.uploadBtn').hide();
				if(data.img!=""){
					$("#imgDiv").html(data.img);
					//展示图片
					$('.uploadBtn').hide();
					$('.updUploadBtn').show();
					imgUrl=$("#imgUpl")[0].src;
				}else{
					//展示图片
					$('.uploadBtn').show();
					$('.updUploadBtn').hide();
				}
				var title=$(".title").val(data.title);
				var context=$(".context").val(data.context);
				var models=$(".html-tab li");
				for (var i = 0; i < models.length; i++) {
					if($(models[i]).attr("attr-val")==data.model){
						$(models[i]).addClass("active");
					}else{
						$(models[i]).removeClass("active");
					}
				}
				if(data.model=="5"){
					$('.uploadBtn').addClass("disabled");
					$('.updUploadBtn').addClass("disabled");
				}else{
					$('.uploadBtn').removeClass("disabled");
					$('.updUploadBtn').removeClass("disabled");
				}
				
				uplImgConfirm(false);
			}else if(data.file_type==3){
				//old_file_name=data.old_file_name;
				src=videoUrl
				if(data.img!==null&&data.img!==""){
					var ImgArray=data.img.split("<img");
					//var oldNameList=old_file_name.split(",");
					for(var i=1;i<ImgArray.length;i++){
					   //由于split 此时的数组是缺少 <img
						 var html=createImg(ImgArray[i],2);    
						 $(".imgList").append(html);
					}
					/*$("#imgDiv").html(data.img);
					$(".vedio img")[0].src=$("#imgUpl")[0].src;
					imgUrl=$("#imgUpl")[0].src;
					$(".vedio img").show();*/
				}
			}
			if(operateType=="u"){
				id=data.id;
				$(".adType").val(data.vedio_type);
				//$(".adName").val(data.name);
				//$(".adIntroduction").val(data.introduction);
			}else{
				$(".adType").val(data.vedio_type);
				//$(".adName").val(data.name);
				//$(".adIntroduction").val(data.introduction);
				$("#htmldiv").attr("disabled",true);
				$(".lookHide").hide();
				/*if(data.img!==null&&data.img!==""){
					var ImgArray=data.img.split("<img");
					for(var i=1;i<ImgArray.length;i++){
					   //由于split 此时的数组是缺少 <img
						var html=createImg(ImgArray[i],2);   
						$(".imgList").append(html);
					}
				}*/
			}
			src+=filePath+"/"+fileName;
		}
	},function(){},"get");
}

//文本框限制输入长度
function textLimitLength(){
	$(".title").bind("input propertychange",function(){
		if($(this).val().length>40){
			$(this).val($(this).val().substring(0,40));
			$(".error1").html("标题最大长度40个字符！");//上传模板信息标题最大长度40个字符
		}
	})
	
	$(".context").bind("input propertychange",function(){
		if($(this).val().length>700){
			$(this).val($(this).val().substring(0,700));
			$(".error1").html("内容最大长度700个字符！");//上传模板信息内容最大长度700个字符
		}
	})
}

function submit(){//file_name;file_path;play_path;
	disabledBtn("submit");
	var adNo=$(".adNo").val();
	var adType=$(".adType").val();
	var adName=$(".adName").val();
	var adIntroduction=$(".adIntroduction").val();
	/*if($("input[type=checkbox]")[0].checked==false){//协议未勾选
		$(".error").html("请同意协议后才能操作！");//信息填写不完整
		startBtn("submit");
		return;
	}*/
	if(adNo==""||adType==""/*||adName==""||adIntroduction==""*/){
		$(".error").html("信息填写不完整");//信息填写不完整
		startBtn("submit");
		return;
	}
	var obj={
			name:adName,
			introduction:adIntroduction,
			vedio_type:adType,
			serial_number:adNo,
			id:id,
		}
	if(fileType=="1"){
		if(fileName==""){
			$(".error").html("请上传文件！");//信息填写不完整
			startBtn("submit");
			return;
		}
		obj.file_type=1;
	}else if(fileType=="2"){
		var title=$(".title").val();
		var context=$(".context").val();
		var img=$("#imgUpl")[0].src;
		var model=$(".html-tab .active").attr("attr-val");
		if(title==""||context==""){
			$(".error").html("上传模板信息填写不完整！");//信息填写不完整
			startBtn("submit");
			return;
		}
		if(title.length>40){
			$(".error").html("上传模板信息标题最大长度40个字符！");//上传模板信息标题最大长度40个字符
			startBtn("submit");
			return;
		}
		if(context.length>700){
			$(".error").html("上传模板信息内容最大长度700个字符！");//上传模板信息内容最大长度700个字符
			startBtn("submit");
			return;
		}
		
		if(model!="5"){
			if(img==window.location.href){//图片是否为空
				$(".error").html("请上传文件！");//信息填写不完整
				startBtn("submit");
				return;
			}
			obj.imgUrl=imgUrl;
		}//http://10.0.0.137:8000/images/20171108/1768883429821510130999573.png
		obj.title=title;
		obj.context=context;
		obj.model=model;
		obj.file_type=2;
	}else if(fileType=="3"){
		var imgList=new Array();
		$(".imgList .uploader-sp2").each(function(index,items){
		   imgList.push($(this).find("img").attr('src'));
		})
		if(imgList.length==0){
			$(".error").html("请上传图片！");//信息填写不完整
			startBtn("submit");
			return;
		}
		if(imgList.length!=upNum){
			$(".error").html("你已购买"+upNum+"个广告位需上传"+upNum+"张图片");//信息填写不完整
			startBtn("submit");
			return;
		}
		obj.imgUrl=imgList.toString();
		obj.file_type=3;
		obj.model="6";
	}
	obj.file_name=fileName;
	obj.file_path=filePath;
	obj.old_file_name=old_file_name;
	obj.order_type=isInterCut;
	jsonAjax("/"+language+"/video/operateAdVideo.do",obj,function(res){
		$(".error").html("");
		if(res.success){
			$(".error").hide();
			window.location.href="ggdd.html";
			//showJudegTip("success","您的广告订单已提交成功，我们会尽快审核您的订单，您可以通过点击 <a href=\"ggdd.html\" class=\"red\">我的广告订单</a> 查看订单状态，订单通过就可以播放了。</p>");
			startBtn("submit");
			
		}else{
			$(".error").html(res.data);
			startBtn("submit");
		}
	},function(){});
	startBtn("submit");
}



var config = {
    //postVarsPerFile:postVarsPerFileObj,/** 上传文件时传入的参数，默认: {} */
	browseFileId : "i_select_files", /** 选择文件的ID, 默认: i_select_files */
	browseFileBtn : "<div>请选择视频文件</div>", /** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */
	dragAndDropArea: "i_select_files", /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */
	dragAndDropTips: "<span>或把视频文件拖拽到这里</span>", /** 拖拽提示, 默认: `<span>把文件(文件夹)拖拽到这里</span>` */
	filesQueueId : "i_stream_files_queue", /** 文件上传容器的ID, 默认: i_stream_files_queue */
	filesQueueHeight : 150, /** 文件上传容器的高度（px）, 默认: 450 */
	retryCount:2,
	maxSize:20971520,/** 单个文件最大上传大小 20M*/
	tokenURL : "/vedioupload/tk/token.do", /** 根据文件名、大小等信息获取Token的URI（用于生成断点续传、跨域的令牌） */
	uploadURL : "/vedioupload/upload/getupload.do", /** HTML5上传的URI */
	messagerId : "i_stream_message_container", /** 消息显示容器的ID, 默认: i_stream_message_container */
 	///extFilters: [".mp4",".MP4"], /** 允许的文件扩展名, 默认: [],即全部允许 ".avi", ".rmvb",".rm",".mpg",".mpeg",".mpe",".mkv",".mp4",".MP4",".mov"*/
	multipleFiles: false, /** 多个文件一起上传, 默认: false */
	autoUploading:false,
	simLimit:1,//单次最大上传文件个数,	100
///	autoRemoveCompleted:true,
	onComplete: function(file) {/** 单个文件上传完毕的响应事件 */
		///console.log(file);
		console.log(' upload success '+file.name);
		var json=eval('('+file.msg+')')
	    if(json.success){
	        if(json.message=='10001'){
	              window.location.href = "/"+language+"/exclude/forward/login.do";
		          return ;
	        }
	        //old_file_name=file.name.split(".")[0];
	        fileName=json.name;
	        filePath=json.message;
	        src=videoUrl+filePath+"/"+fileName;
	        playVedio();
	        showJudegTip("success","文件上传成功！");
	    }else{
	    	showJudegTip("fail","上传文件失败！"+json.message);
	    }
	},onDestroy: function() {/** 销毁的响应函数*/
		  console.log("Stream插件已销毁！");
	},onMaxSizeExceed: function(file) {
		$(".error").html("单个文件上传不能超过20M！");
	},onSelect: function(list) {
		
	},onFileCountExceed: function(selected, limit) {
		$(".error").html("一次只能上传一个文件");
	}
};
function closeAndcancel(){
	_t.cancel();
    if(_t!=null){
      _t.destroy();
      _t=null;
    }
	$("#upload-windows-class-div").hide();
}

function uploadVideo(){
	 _t=new Stream(config);//创建上传对象
	 $("#upload-windows-class-div").show();
	 
}

function playVedio(){//视频播放
	if(fileName!=""){
		var loginType=getLocalStorage('loginType');
		if(loginType=="6"){
			$(".iosPlayVideo").show();
		}else{
			$(".adVedio")[0].src=videoUrl+filePath+"/"+fileName;
			$(".adVedio").show();
		}
	}
}
function uplImgConfirm(id){//上传图片确认
	if($("#imgUpl")[0].src!=window.location.href){//图片是否为空
		$(".vedio img")[0].src=$("#imgUpl")[0].src;
		$(".vedio img").show();
	}
	if(id!=false){
		fileName=new Date().format(DATE_FORMAT_YMDHMS);
		filePath=new Date().format(DATE_FORMAT_YMD);
	}
	if(id){
		turnoff(id);
	}
}

/**
 * 上传图片按钮
 * @returns
 */
function uploadPicBtn() {
	// 上传图片按钮
	$('.fileInput').on('change', function() {
		var _this=this,image_base64="";
		fileList=$('.fileInput')[0].files;
		if(($(".imgList .imgUpload").length+_this.files.length)>Number(upNum)){
			$(".error").html("只能上传"+upNum+"张图片！");
	    	return false;
	    }
		for (var i = 0; i < fileList.length; i++) {
			var file = _this.files[i];
			if (!file) return;
			  //判断类型是不是图片  
	        if(!/image\/\w+/.test(file.type)){     
	        	$(".error").html("上传文件类型只能为图片！");
	            return false;   
	        } 
	        console.log(file.size);
	        //上传图片大小最大2M
	        if(file.size>1024*1024*2){     
	        	$(".error").html("上传图片大小最大2M！");
	            return false;   
	        }
	        var reader = new FileReader();   
	        reader.readAsDataURL(file);   
	        if(file.type.indexOf("gif")>=0){
	        	reader.onload = function(e){
	        		$("#imgUpl")[0].src=this.result;
	        		uploadImge(file,_this);
	        	}
	        }else{
	        	var j=fileList.length-1;
		        //old_file_name+=(old_file_name==""?fileList[j].name:","+fileList[j].name);
		        j--;
		        var orientation;
		        //EXIF js 可以读取图片的元信息 <a rel="nofollow" href="https://github.com/exif-js/exif-js" target="_blank">https://github.com/exif-js/exif-js</a>
		        EXIF.getData(file,function(){
		          orientation=EXIF.getTag(this,'Orientation');
		        });
//			    var reader = new FileReader();   
//		        reader.readAsDataURL(file);   
		        reader.onload = function(e){
		          getImgData(this.result,orientation,function(data){
		              //这里可以使用校正后的图片data了
		        	  file=convertBase64UrlToBlob(data);
		        	  $("#imgUpl")[0].src=data;
		        	  uploadImge(file,_this);
		        	  //o++;
		            });
		        }
	        }
		}
	});
	// 上传图片按钮
	$('.singFileUpd').on('change', function() {
		var _this=this,image_base64="";
		var file = _this.files[0];
		if (!file) return;
		  //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
        	$(".error").html("上传文件类型只能为图片！");
            return false;   
        } 
        console.log(file.size);
        //上传图片大小最大2M
        if(file.size>1024*1024*2){     
        	$(".error").html("上传图片大小最大2M！");
            return false;   
        }
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        if(file.type.indexOf("gif")>=0){
        	reader.onload = function(e){
        		$("#imgUpl")[0].src=this.result;
        		uploadImge(file,_this);
        	}
        }else{
	        //old_file_name+=(old_file_name==""?fileList[j].name:","+fileList[j].name);
	        var orientation;
	        //EXIF js 可以读取图片的元信息 <a rel="nofollow" href="https://github.com/exif-js/exif-js" target="_blank">https://github.com/exif-js/exif-js</a>
	        EXIF.getData(file,function(){
	          orientation=EXIF.getTag(this,'Orientation');
	        });
//		    var reader = new FileReader();   
//	        reader.readAsDataURL(file);   
	        reader.onload = function(e){
	          getImgData(this.result,orientation,function(data){
	              //这里可以使用校正后的图片data了
	        	  file=convertBase64UrlToBlob(data);
	        	  $("#imgUpl")[0].src=data;
	        	  uploadImge(file,_this);
	        	  //o++;
	            });
	        }
        }
	});
}

/**  
 * 
 *  上传图片
 */  
function uploadImge(file,obj){  
	var formdata = new FormData();
	formdata.append('file', file);
	openWaitAnimation("图片正在上传,请稍等...");
	$.ajax({
		url : '/'+language+'/video/uploadADPic.do',
		type : 'post',
		data : formdata,
		dataType : 'json',
		cache : false,
		contentType : false,
		processData : false,
		success : function(res) {
			$(".error").html("");
			isLogin(res, function(res){
				var status = res.success;
				var data = res.data;
				var msg = res.msg;
				$('.fileInput').val("");
				if(status){
					 // 隐藏上传按钮
					$('.uploadBtn').hide();
					//展示图片
					$('.updUploadBtn').show();
					imgUrl=imagePath+data;
					if(fileType=="3"||fileType=="3#"){
						fileName=new Date().format(DATE_FORMAT_YMDHMS);
						filePath=new Date().format(DATE_FORMAT_YMD);
						if($(obj).hasClass("singFileUpd")){//如果是单个图片修改
							currImgObj.src=imgUrl;//直接修改图片路径
						}else{
							var html=createImg(imgUrl,1);
							$(".imgList").append(html);
						}
						if($(".imgList .uploader-sp2").length==upNum){
							$(".error").html(upNum+"张图片已经上传完成，确认后可以提交");
							$(".error").show();
							$(".imgFileUpd").hide();
						}
					}
				}else{
					showJudegTip('fail',msg);
					$("#imgUpl")[0].src="";
				}
			});
		},
		complete : function(XHR, TR) {
			// 关闭等待动画
			closeWaitAnimation();
			if (TR == 'timeout') {// 超时
				showJudegTip('fail','Time out,please refresh.');
			} else if (XHR.status == '500' || TR == 'error') {// 异常
				showJudegTip('fail','Server error.');
			}
		}
	});
}

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  

function convertBase64UrlToBlob(urlData){  
      
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
      
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);  
    var ia = new Uint8Array(ab);  
    for (var i = 0; i < bytes.length; i++) {  
        ia[i] = bytes.charCodeAt(i);  
    }  
  
    return new Blob( [ab] , {type : 'image/png'});  
}  */   

/**
	 * 将base64转换成二进制图片（Blob）
 */
function convertBase64UrlToBlob(base64Data) {
	var byteString;
	if (base64Data.split(',')[0].indexOf('base64') >= 0){
		byteString = atob(base64Data.split(',')[1]);
	}else{
		byteString = unescape(base64Data.split(',')[1]);
	}
	var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
	//处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(byteString.length);  
    var ia = new Uint8Array(ab);  
	//var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type:mimeString});
}

function iosUploadSuccess(fileN,fileP){
	fileName=fileN;
    filePath=fileP;
    src=videoUrl+filePath+"/"+fileName;
    playVedio();
    /*showJudegTip("success","文件上传成功！");*/
}

function iosUpload(){
	loadURL("luckycloud://uploadVideo");
}

/**
 * 调用android上传文件打开图册API
 */
function androidUpload(type){
	if(!type){
		type="0";
	}
	window.androidJS.fileOperation(type);
}

/**
 * 接收android回传图片数量进行判断
 */
function acceptAndroid(imageCount,type){
	// 图片base64
	//var src = 'data:'+mimeType+';base64,'+base64Data;
	if(type=="1"){//修改图片
		androidUploadImg(1);//可以上传
	}else{
		if(eval($(".imgList .imgUpload").length+imageCount)<=Number(upNum)){
			androidUploadImg(1);//可以上传
		}else{
			androidUploadImg(0);//不可以上传
			$(".error").html("只能上传"+upNum+"张图片！");
		}
	}
	/*$(".error").text(base64Data.length+"=="+base64Data[0]);
	file=convertBase64UrlToBlob(base64Data);
	$("#imgUpl")[0].src=base64Data;
	uploadImge(file);*/
	
}
/**
 * 调用android上传文件API
 */
function androidUploadImg(ifUp){
	window.androidJSImage.Imageupdate(ifUp);
}

/**
 * 接收android上传文件后图片路径
 */
function acceptAndroidUpUrls(urls,type){
	fileName=new Date().format(DATE_FORMAT_YMDHMS);
	filePath=new Date().format(DATE_FORMAT_YMD);
	if(urls!=null&&urls!=""){
		var url=urls.split(",");
		if(type=="1"){
			currImgObj.src=imagePath+url[0];//直接修改图片路径
		}else{
			for (var i = 0; i < url.length; i++) {
				imgUrl=imagePath+url[i];
				var html=createImg(imgUrl,1);
				$(".imgList").append(html);
			}
		}
		if($(".imgList .uploader-sp2").length==upNum){
			$(".androidImgUpl").hide();
			$(".error").html(upNum+"张图片已经上传完成，确认后可以提交");
			$(".error").show();
		}
	}
	
	//$(".error").html(urls)
}

// @param {string} img 图片的base64
// @param {int} dir exif获取的方向信息
// @param {function} next 回调方法，返回校正方向后的base64
function getImgData(img,dir,next){
 var image=new Image();
 image.onload=function(){
  var degree=0,drawWidth,drawHeight,width,height;
  drawWidth=this.naturalWidth;
  drawHeight=this.naturalHeight;
  //以下改变一下图片大小
  /*var maxSide = Math.max(drawWidth, drawHeight);
  if (maxSide > 1024) {
    var minSide = Math.min(drawWidth, drawHeight);
    minSide = minSide / maxSide * 1024;
    maxSide = 1024;
    if (drawWidth > drawHeight) {
      drawWidth = maxSide;
      drawHeight = minSide;
    } else {
      drawWidth = minSide;
      drawHeight = maxSide;
    }
  }*/
  var canvas=document.createElement('canvas');
  canvas.width=width=drawWidth;
  canvas.height=height=drawHeight;
  var context=canvas.getContext('2d');
  //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
  switch(dir){
    //iphone横屏拍摄，此时home键在左侧
    case 3:
      degree=180;
      drawWidth=-width;
      drawHeight=-height;
      break;
    //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
    case 6:
      canvas.width=height;
      canvas.height=width;
      degree=90;
      drawWidth=width;
      drawHeight=-height;
      break;
    //iphone竖屏拍摄，此时home键在上方
    case 8:
      canvas.width=height;
      canvas.height=width;
      degree=270;
      drawWidth=-width;
      drawHeight=height;
      break;
  }
  //使用canvas旋转校正
  context.rotate(degree*Math.PI/180);
  context.drawImage(this,0,0,drawWidth,drawHeight);
  var imgType=this.src.substring(5,this.src.indexOf(";"));//获取文件类型
  //返回校正图片
  if(imgType.indexOf("png")>=0){
	  next(canvas.toDataURL("image/jpeg",0.77));
  }else{
	  next(canvas.toDataURL(imgType,0.92));
  }
 }
 image.src=img;
}

function createImg(imgUrl,type){
	var html  = ' <div class="uploader-sp2 imgUpload"  >';
	if(type==1){
		html += '<img onclick="singUpdImage(this)" data-oldName="" src="'+imgUrl+'" style="cursor:pointer;display:;width: 100px;"/>';
	}else if(type==2){
		html += '<img onclick="singUpdImage(this)" data-oldName=""  style="cursor:pointer;display:;width: 100px;"'+imgUrl;
	}
	html += '<p class="lookHide"><a href="#" onclick="showHtml(this)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></p>';
    html += '</div>';
    return html;
}

//修改单个文件
function singUpdImage(obj){
	if(operateType==""||operateType=="u"){
		currImgObj=obj;//当前图片对象
		//安卓app单独上传图片调用
		var loginType=getLocalStorage('loginType');
		if(loginType=="5"){//安卓
			androidUpload("1");//安卓调用
		}else{
			$('.singFileUpd').click();//调用打开文件
		}
	}
}

function  showHtml(el){
	/*if(old_file_name.indexOf($(el).parents(".uploader-sp2").find("img").attr("data-oldName"))==0){
		old_file_name=old_file_name.replace($(el).parents(".uploader-sp2").find("img").attr("data-oldName"),"");
	}else{
		old_file_name=old_file_name.replace(","+$(el).parents(".uploader-sp2").find("img").attr("data-oldName"),"");
	}*/
	//删除img
	$(el).parents(".uploader-sp2").remove();
	$(".error").html("");
	var loginType=getLocalStorage('loginType');
	if(loginType=="5"){
		$(".androidImgUpl").show();
	}else{
		$(".imgFileUpd").show();
	}
}

function  showHtml1(){
	window.open(src);
}

function showUplHtml(id){
	if(id){
		elementDisplay(id);
	}
}

function hideUplHtml(id){
	if(id){
		turnoff(id);
	}
}

function iosJsMethod(){
	loadURL("luckycloud://playios?url="+src);
	//window.location.href="http://LuckyCloud://playIOs?url="+src;
}

function loadURL(url) {
     var iFrame;
     iFrame = document.createElement("iframe");
     iFrame.setAttribute("src", url);
     iFrame.setAttribute("style", "display:none;");
     iFrame.setAttribute("height", "0px");
     iFrame.setAttribute("width", "0px");
     iFrame.setAttribute("frameborder", "0");
     document.body.appendChild(iFrame);
     // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
     iFrame.parentNode.removeChild(iFrame);
     iFrame = null;
}
