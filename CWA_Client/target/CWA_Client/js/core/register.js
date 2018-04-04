var chineseError=["注册成功,页面正在跳转...","信息填写不完整","手机号为空","手机号格式错误","两次输入密码不一致","密码为6-12个字符","邀请码不能超过10个字符","验证码为6个字符","注册合伙人成功,请等待审核！"];
var englishError=["register success"];
var twError=[];
var time=120,currError=[];
//var registerType="";
$(function(){
	disabledBtn("getValidCode1");//禁用倒计时按钮
///	alert("111");
	$("#getValidCode1").hide();//隐藏倒计时按钮
	//language=$("#languageP").html();
	currError=currErrorArray(chineseError,englishError,twError);
	var referrals_id=getURLParam("referrals_id");
	/*registerType=getURLParam("registerType");
	if(registerType!=""){
		$(".title").text("店主注册");
	}else{
		$(".title").text("广告主注册");
	}*/
	if(referrals_id!=""){
		$(".inviteCode").val(referrals_id);
	}
	$("#registerNow").bind("click",function(){//注册按钮点击事件
		register();
	})
	$("#getValidCode").bind("click",function(){//获取验证码点击事件
		getValidCode();
	})
})
function register(){
	disabledBtn("registerNow");
	var mobile=$(".mobile").val();//手机号
	var validCode=$(".validCode").val();//验证码
	var passWord=$(".passWord").val();//密码
	var passWord1=$(".passWord1").val();//确认密码
	var inviteCode=$(".inviteCode").val();//邀请码
	var registerType=$(".registerType").find("input[type='radio']:checked").val();
	$(".error").show();
	if(mobile==""||validCode==""||passWord==""){
		$(".error").html(currError[1]);//信息填写不完整
		startBtn("registerNow");
		return;
	}
	if(!REG_MOBILE.test(mobile)){
		$(".error").html(currError[3]);//手机号格式错误
		startBtn("registerNow");
		return;
	}
	if(validCode.length!=6){
		$(".error").html(currError[7]);//验证码6个字符
		startBtn("registerNow");
		return;
	}
	if(passWord.length>12||passWord.length<6){
		$(".error").html(currError[5]);//密码为6-12个字符
		startBtn("registerNow");
		return;
	}
	if(passWord!=passWord1){
		$(".error").html(currError[4]);//两次密码不相同
		startBtn("registerNow");
		return;
	}
	if(inviteCode.length>10){
		$(".error").html(currError[6]);//两次密码不相同
		startBtn("registerNow");
		return;
	}
	jsonAjax("/"+language+"/user/registerUser.do",{mobile:mobile,validCode:validCode,passWord:passWord,passWord1:passWord1,inviteCode:inviteCode,registerType:registerType},function(res){
		if(res.respCode=="10000"){
			
			if(registerType=="1"){
				$(".error").html(currError[0]);//注册回调显示
				setTimeout(function(){
					autoLogin(mobile,passWord);
				},3000);
			}else if(registerType=="2"){
				$(".error").html(currError[8]);//注册回调显示
			}
		}else{
			$(".error").html(res.respMessge);//注册回调显示
			startBtn("registerNow");
		}
	},function(){startBtn("registerNow");});
}

function autoLogin(accountId,pwd){
	// 发送请求
	jsonAjax('/'+language+'/user/login.do',
			{accountId:accountId,pwd:pwd},
			function(res) {
				setLocalStorage('accountId',accountId);
				// 页面跳转
				location.href = '/'+language+'/forward/customerAdvertise.do';
			},function(){});
}
function getValidCode(){
	disabledBtn("getValidCode");
	var mobile=$(".mobile").val();
	$(".error").show();
	if(mobile==""){
		$(".error").html(currError[2]);//手机号为空
		startBtn("getValidCode");
		return;
	}
	if(!REG_MOBILE.test(mobile)){
		$(".error").html(currError[3]);//手机号格式错误
		startBtn("getValidCode");
		return;
	}
	jsonAjax("/"+language+"/user/phoneVildate.do",{mobile:mobile},function(res){
		if(res.respCode=="10000"){
			$(".error").hide();
			$("#getValidCode").hide();
			$("#getValidCode1").val(time+" s");
			$("#getValidCode1").show();
			countdown();//短信2分钟倒计时
		}else{
			$(".error").html(res.respMessge);//验证码回调显示
			startBtn("getValidCode");
		}
	},function(){});
	
	function countdown(){
		setTimeout(function(){
			time--;
			if(time>=0){
				$("#getValidCode1").val(time+" s");
				countdown();
			}else{
				time=120;
				startBtn("getValidCode");
				$("#getValidCode").show();
				$("#getValidCode1").hide();
			}
		},1000);
	} //可获取短信验证码倒计时
}