/**
 * 微信分享处理
 */
//判断是不是微信客户端
///console.info('isWeiXin '+isWeiXin())
var curryUrl = window.location.href;
$(function(){
	initWechatApi();//初始化配置
	/*wx.config({
	      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	      appId: 'wx7c172fbf4170d69d', // 必填，公众号的唯一标识
	      timestamp: '1520562773', // 必填，生成签名的时间戳
	      nonceStr: '35AN0HUF5ZALI4VKDEFGCTYVDO9E8A', // 必填，生成签名的随机串
	      signature: '50e56ce2bddec27fa01e7d9d86e90c8d8688d156',// 必填，签名，见附录1
	      jsApiList: ["chooseImage","uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});*/
	$("input[type='file']").bind("change",function(){
		$("form").submit();
	})
})

function initWechatApi(){
	var curryUrl = window.location.href;
	if(isWeiXin()){
		// 发送请求  /'+language+'/exclude/weChat/getShareInfo.do
		jsonAjax('/'+language+'/exclude/weChat/getShareInfo.do',{curryUrl:curryUrl},
		function(res){
			var msg = res.msg;
			if(msg=='10000'){
			var  obj=JSON.parse(res.data);
				  wx.config({
						      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						      appId: obj.appid, // 必填，公众号的唯一标识
						      timestamp: obj.timestamp, // 必填，生成签名的时间戳
						      nonceStr: obj.noncestr, // 必填，生成签名的随机串
						      signature: obj.signature,// 必填，签名，见附录1
						      jsApiList: ["chooseImage","uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				     });
				 //define(['../js/jweixin-1.2.0.js'],function(wx){ 
					　　
				//}) 
			}else{
				showJudegTip('fail',"监听异常");
			}
		},function(){});
	}
}
var localIds=[],index=0;
//拍照或从手机相册中选图接口  
function wxChooseImage() {  
    wx.chooseImage({  
        count: 9,  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (data) {  
        	if($(".imgList .uploader-sp2").length+data.localIds.length>upNum){
				$(".error").html("只能上传"+upNum+"张图片！");
				$(".error").show();
				return;
			}
		index=0;
        	localIds=data.localIds;
        	var localId = localIds[index].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        	wxuploadImage(localId);
        },  
        fail: function (res) {  
        	showJudegTip("fail", JSON.stringify(res));  
        }  

    });  
}  

//上传图片接口  
function wxuploadImage(e) {  
    wx.uploadImage({
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得  
        isShowProgressTips: 1, // 默认为1，显示进度提示  
        success: function (res) {  
        	index++;
            //mediaId = res.serverId; // 返回图片的服务器端ID 
        	downWchatPic(res.serverId);//重微信服务器下载文件
		if(localIds.length>index){
        		var localId = localIds[index].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          	  	setTimeout(function(){
				wxuploadImage(localId);
			},50);
        	}
        },  
        fail: function (error) {  
            picPath = '';  
            localIds = '';  
            showJudegTip("fail",Json.stringify(error));  
        }  
    });  
}  

function downWchatPic(mediaId){
	jsonAjax("/"+language+"/video/downPicToLocal.do",{mediaId:mediaId},function(res){
		if(res.success){
			fileName=new Date().format(DATE_FORMAT_YMDHMS);
			filePath=new Date().format(DATE_FORMAT_YMD);
			//$(".error").html(res.data);
			var imgUrl=imagePath+res.data;
			$(".imgList").append(createImg(imgUrl,1));
			if($(".imgList .uploader-sp2").length==upNum){
				$(".error").html(upNum+"张图片已经上传完成，确认后可以提交");
				$(".error").show();
			}
		}else{
			$(".error").html(res.respMessge);//验证码回调显示
		}
	},function(){},null,null,false);
}
