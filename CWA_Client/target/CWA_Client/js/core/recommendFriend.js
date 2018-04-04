var shareUrl;
var QR_codeURL;
$(function(){
	shareUrl = location.protocol+'//'+location.host+'/'+language+'/user/reg.do?referrals_id='+getLocalStorage('userId');
	QR_codeURL = location.protocol+'//'+location.host+'/'+language+'/recommend/QR-code.do';
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
	$('#recommendLocation').text(shareUrl);
}

/**
 * 获取用户二维码图片
 * @returns
 */
function getUserQRCode(){
	$('#qrCodeImg').attr('src',QR_codeURL);
}

/**
 * 分享
 */
function share(){
	var title = '想知道我在干什么?点击链接:'+shareUrl+',或者识别图中二维码。';
	var newwindow = 'newwindow';
	var l=(screen.availWidth-500)/2;
	var t=(screen.availHeight-300)/2; 
	var config = 'width=500,height=400,top='+t+',left='+l+',toolbar=no,menubar=no,location=no,status=yes';
	var site = '翔云播';
	// 分享到微博
	$('#sinaWeibo').on('click',function(){
		window.open('http://v.t.sina.com.cn/share/share.php?title='+title+'&pic='+QR_codeURL,newwindow,config);
	});
	// 分享到qq空间
	$('#qqZone').on('click',function(){
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=翔云播&summary=戳上面链接,了解我在做什么&pics='+QR_codeURL+'&url='+shareUrl,newwindow,config);
	});
	// 分享到qq好友
	$('#qqFriend').on('click',function(){
		window.open('http://connect.qq.com/widget/shareqq/index1.html?title=翔云播&summary='+title+'&url='+shareUrl+'&pics='+QR_codeURL,newwindow,config);
	});
	// 分享到wechat
	$('#wechat').on('click',function(){
		showJudegTip('success','','打开微信扫一扫上面的图片分享');
	});
	
	
}