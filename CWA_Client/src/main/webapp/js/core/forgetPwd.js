var chineseError=["手机号和密码不能为空","手机号格式错误","密码为6-12个字符","验证码为6个字符"];
var englishError=["register success"];
var twError=[];
var currError=[];

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	// 获取手机验证码按钮
	getVerification();
	// 提交按钮
	submit();
})


/**
 * 忘记密码页的提示
 */
function forgetPwdPageTip(str){
	$('#forgetPwdTip').html(str).show();
}

/**
 * 获取手机验证码按钮
 */
function getVerification(){
	$('#getVerification').on('click',function(){
		// 获取手机号
		var mobile = $('#mobile').val().trim();
		// 发送请求
		jsonAjax('/'+language+'/user/getMobileVerification.do',{mobile:mobile},
		function(res){
			var msg = res.msg;
			if(msg=='10000'||msg=='60001'){
				var tip = res.data.split('-')[0];
				var time = Number(res.data.split('-')[1]);
				// 提示
				forgetPwdPageTip(tip);
				if(time>=0){
					$('#getVerification').removeClass('bg-green').val(time--);
				}
				// 启动倒计时
				var interval = setInterval(function() {
					if(time<0){
						$('#getVerification').addClass('bg-orange').val('获取验证码');
						clearInterval(interval);
						return;
					}
					$('#getVerification').removeClass('bg-orange').val(time--);
				}, 1000);
			}else{
				// 提示
				forgetPwdPageTip(msg);
			}
		},function(){});
	});
}

/**
 * 提交按钮
 * @returns
 */
function submit(){
	$('#submit').on('click',function(){
		// 获取手机号
		var mobile = $('#mobile').val().trim();
		// 获取验证码
		var verification = $('#verification').val().trim();
		// 获取密码
		var pwd = $('#resetPwd').val().trim();
		if(mobile==null||mobile==""||pwd==null|pwd==""){
			forgetPwdPageTip(currError[0]);
			return ;
		}
		if(!REG_MOBILE.test(mobile)){
			forgetPwdPageTip(currError[1]);//手机号格式错误
			return ;
		}
		if(pwd.length>20||pwd.length<6){
			forgetPwdPageTip(currError[2]);//密码为6-12个字符
			return ;
		}
		if(verification.length!=6){
			forgetPwdPageTip(currError[3]);//验证码为6个字符
			return ;
		}
		// 发送请求
		jsonAjax('/'+language+'/user/forgetPwdToUpdate.do',{mobile:mobile,verification:verification,pwd:pwd},
		function(res){
			var msg = res.msg;
			if(msg=='10000'){
				forgetPwdPageTip(res.data);
				setTimeout(function() {
					window.location.href = '/'+language+'/exclude/forward/login.do';
				}, 3000);
			}else{
				// 提示
				forgetPwdPageTip(msg);
			}
		},function(){});
	});
}