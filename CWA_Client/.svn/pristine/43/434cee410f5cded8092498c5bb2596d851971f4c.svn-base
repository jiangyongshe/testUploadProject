var shareUrl;
var QR_codeURL;
$(function(){
	$("#headerTitle").text("推荐好友");
	var userType=getLocalStorage('userType');
	userId=getLocalStorage('userId');
	if(userType=="1"){
		userId="C"+userId;
	}else{
		userId="T"+userId;
	}
	//shareUrl = location.protocol+'//'+location.host+'/'+language+'/mobile/html/register.html?referrals_id='+userId;
	shareUrl = location.protocol+'//'+location.host+'/'+language+'/mobile/html/register.html?referrals_id';
	QR_codeURL = location.protocol+'//'+location.host+'/'+language+'/mobile/images/logo3.png';
	// 生成推荐好友的地址
	createRecommendLocation();
	// 获取用户二维码图片
	getUserQRCode();
	// 分享内容
	share();
})

/**
 * 生成推荐好友的地址
 */
function createRecommendLocation(){
	$('#recommendLocation').text(shareUrl+"="+userId);
}

/**
 * 获取用户二维码图片
 * @returns
 */
function getUserQRCode(){
	createQrcode("qrCodeImg",shareUrl+"="+userId);
	convertCanvasToImage("qrCodeImg");
}

/**
 * 分享
 */
function share(){
	var title = '翔云播——共享广告平台，注册/投放广告/商家合作/联系我们?点击链接:'+shareUrl+encodeURIComponent("=")+userId+'。';
	var newwindow = 'newwindow';
	var l=(screen.availWidth-500)/2;
	var t=(screen.availHeight-300)/2; 
	var config = 'width=500,height=400,top='+t+',left='+l+',toolbar=no,menubar=no,location=no,status=yes';
	var site = '翔云播——共享广告平台';
	// 分享到微博
	$('#sinaWeibo').on('click',function(){
		window.open('http://v.t.sina.com.cn/share/share.php?title='+title+'&pic='+QR_codeURL,newwindow,config);
	});
	// 分享到qq空间
	$('#qqZone').on('click',function(){
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=翔云播——共享广告平台&summary=注册/投放广告/商家合作/联系我们'+'&url='+shareUrl+encodeURIComponent("=")+userId+'&pics='+QR_codeURL,newwindow,config);
	});
	// 分享到qq好友
	$('#qqFriend').on('click',function(){
		window.open('http://connect.qq.com/widget/shareqq/index.html?title=翔云播——共享广告平台&summary=注册/投放广告/商家合作/联系我们'+'&url='+shareUrl+encodeURIComponent("=")+userId+'&pics='+QR_codeURL,newwindow,config);
	});
	// 分享到wechat
	$('#wechat').on('click',function(){
		showJudegTip('success','打开微信扫一扫上面的图片分享');
	});
	
	
}