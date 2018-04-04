var adTypeArr=["日用品广告","食品饮料广告","餐饮广告","电子家电广告","服装服饰广告","化妆品广告","钟表首饰广告","教育培训广告","文化广告","会展广告","商业商场广告","娱乐广告","社会服务广告","金融保险广告","汽车广告","房地产广告","邮电通讯快递物流广告","保健广告","旅游酒店广告","家装建材广告","交通运输广告","其他"];
var chineseError=["未知异常","视频token无效","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var operateType="",adNo="",id=0,fileName="",filePath="",src="",old_file_name="",isInterCut="";

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	operateType=getURLParam("type");
	adNo=getURLParam("adNo");
	fileType=getURLParam("fileType");
	isInterCut=getURLParam("isInterCut");
	document.getElementsByName("customerOrder")[0].className="active";
	$(".customerAdvertise").attr('class','active');
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
		$(".fileNameDiv").show(); 
		$(".htmlUpl").hide(); 
		$(".imgFileUpd").hide(); 
		if(operateType==""||operateType=="u"){
			uploadVideo();
		}
		fileType="1";
	}else if(ft=="2"){
		$(".htmlUpl").show(); 
		$(".fileNameDiv").hide(); 
		$(".imgFileUpd").hide(); 
		fileType="2";
	}else if(ft=="3"){
		$(".imgFileUpd").show(); 
		$(".htmlUpl").hide(); 
		$(".fileNameDiv").hide(); 
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
			if(operateType=="u"){
				id=data.id;
				$("input[type=checkbox]")[0].checked=true;
				$(".adType").val(data.vedio_type);
				$(".adName").val(data.name);
				$(".adIntroduction").val(data.introduction);
			}else{
				$(".adType").text(adTypeArr[data.vedio_type-1]);
				$(".adName").text(data.name);
				$(".adIntroduction").text(data.introduction);
				$("#htmldiv").attr("disabled",true);
				/*if(data.img!==null&&data.img!==""){
					var ImgArray=data.img.split("<img");
					for(var i=1;i<ImgArray.length;i++){
					   //由于split 此时的数组是缺少 <img
						var html=createImg(ImgArray[i],2);   
						$(".imgList").append(html);
					}
				}*/
			}
			if(data.file_type==1){
				src=videoUrl+filePath+"/"+fileName;
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
				src=videoUrl
				if(data.img!==null&&data.img!==""){
					var ImgArray=data.img.split("<img");
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
			src+=filePath+"/"+fileName;
		}
	},function(){},"get");
}

function submit(){//file_name;file_path;play_path;
	disabledBtn("submit");
	var adNo=$(".adNo").val();
	var adType=$(".adType").val();
	var adName=$(".adName").val();
	var adIntroduction=$(".adIntroduction").val();
	if($("input[type=checkbox]")[0].checked==false){//协议未勾选
		$(".error").html("请同意协议后才能操作！");//信息填写不完整
		startBtn("submit");
		return;
	}
	if(adNo==""||adType==""||adName==""||adIntroduction==""){
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
			$(".error").html("上传html信息填写不完整！");//信息填写不完整
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
	}else if(fileType=="3"||fileType=="3#"){
		var imgList=new Array();
		$(".imgList .uploader-sp2").each(function(index,items){
		   imgList.push($(this).find("img").attr('src'))
			
		})
		obj.imgUrl=imgList.toString();
		obj.file_type=3;
		obj.model="6";
	}
	obj.file_name=fileName;
	obj.file_path=filePath;
	obj.old_file_name=old_file_name;
	obj.order_type=isInterCut;
	jsonAjax("/"+language+"/video/operateAdVideo.do",obj,function(res){
		if(res.success){
			$(".error").hide();
			if(operateType=="u"){
				setTimeout(function(){
					location.reload();
				},3000)
			}
			showJudegTip("success","提示","您的广告订单已提交成功，我们会尽快审核您的订单，您可以通过点击 <a href=\"/"+language+"/forward/customerOrder.do\" class=\"red\">我的广告订单</a> 查看订单状态，订单通过就可以播放了。</p>");
			startBtn("submit");
			
		}else{
			showJudegTip("fail","提示","上传失败,请联系客服!");
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
	        old_file_name=file.name.split(".")[0];
	        fileName=json.name;
	        filePath=json.message;
	        src=videoUrl+filePath+"/"+fileName;
	        playVedio();
	        showJudegTip("success","提示","文件上传成功！");
	    }else{
	    	showJudegTip("fail","提示","上传文件失败！"+json.message);
	    }
	},onDestroy: function() {/** 销毁的响应函数*/
		  console.log("Stream插件已销毁！");
	},onMaxSizeExceed: function(file) {
		showJudegTip("fail","提示","单个文件上传不能超过20M！");
	},onSelect: function(list) {
		
	},onFileCountExceed: function(selected, limit) {
	   showJudegTip("fail","提示","一次只能上传一个文件");
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
		$(".adVedio")[0].src=src;
		$(".adVedio").show();
		setTimeout(function(){//3秒后关闭提示
	    	hideJudegTip();
	    },3000);
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
	   if($(".imgList .imgUpload").length>4){
	    	showJudegTip('fail','',"最多能上传5张图片！");
	     return false;
	   }
		var _this=this,image_base64="";
		var file = _this.files[0];
		if (!file) return;
		  //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
        	showJudegTip('fail','',"上传文件类型只能为图片！");
            return false;   
        } 
        //上传图片大小最大2M
        if(file.size>1024*1024*2){     
        	showJudegTip('fail','',"上传图片大小最大2M！");
            return false;   
        }
        var reader = new FileReader();   
        reader.readAsDataURL(file);   
        reader.onload = function(e){
          $("#imgUpl")[0].src=this.result;
        }
        var formdata = new FormData();
		formdata.append('file', file);
		openWaitAnimation();
		$.ajax({
			url : '/'+language+'/video/uploadADPic.do',
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
					$(_this).val("");
					if(status){
						 // 隐藏上传按钮
						$('.uploadBtn').hide();
						//展示图片
						$('.updUploadBtn').show();
						imgUrl=imagePath+data;
						old_file_name=file.name;
						if(fileType=="3"||fileType=="3#"){
							fileName=new Date().format(DATE_FORMAT_YMDHMS);
							filePath=new Date().format(DATE_FORMAT_YMD);
							var html=createImg(imgUrl,1);
							$(".imgList").append(html);
							
						}
					}else{
						showJudegTip('fail','',msg);
						$("#imgUpl")[0].src="";
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

function createImg(imgUrl,type){
	var html  = ' <div class="uploader-sp2 imgUpload"  >';
	if(type==1){
		html += '<img onclick="showPicPopup(this.cloneNode(true),event)" src="'+imgUrl+'" style="cursor:pointer;display:;width: 100px;"/>';
	}else if(type==2){
		html += '<img onclick="showPicPopup(this.cloneNode(true),event)"  style="cursor:pointer;display:;width: 100px;"'+imgUrl;
	}
	html += '<p ><a href="#" onclick="showHtml(this)"><i class="fa fa-trash-o" aria-hidden="true"></i> </a></p>';
    html += '</div>';
    return html;
}

function  showHtml(el){
	//删除img
	$(el).parents(".uploader-sp2").remove();
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
