var chineseError=["账号和密码不为空","账号和密码不能超过20个字符"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	// 登录按钮
	loginBtn();
	// 判断是否购买过来的
	judgeIsBuy();
	// 绑定回车按钮
	$(document).keydown(function(event){
		if(event.keyCode == 13){ // 绑定回车 
			$('#loginBtn').click(); // 触发登录按钮 
		} 
	});
	var accountId=getCookie('accountId');
	var pwd=getCookie('passWord');
	if(accountId!=null&&accountId!=""&&pwd!=null&&pwd!=""){
		$('#accountId').val(accountId);
		$('#password').val(pwd);
	}
})

/**
 * 登录页的提示
 */
function loginPageTip(str){
	$('#loginTip').html(str).show();
}

/**
 * 判断是否购买过来的
 * @returns
 */
function judgeIsBuy(){
	checkAdvertiseId = getURLParam('checkAdvertiseId').trim();
	deviceId = getURLParam('deviceId').trim();
	timeInterval = getURLParam('timeInterval').trim();
	fileType = getURLParam('fileType').trim();
	clearLocalStorage();
	if(checkAdvertiseId && deviceId){
		$('[name="userType"]').parent().find('[value="1"]').attr('checked','true');
	}
}

/**
 * 登录逻辑
 */
function loginBtn(){
	$('#loginBtn').on('click',function(){
		// 获取手机号
		var accountId = $('#accountId').val().trim();
		// 获取密码
		var pwd = $('#password').val().trim();
		if(accountId==null||accountId==""||pwd==null||pwd==""){
			loginPageTip(currError[0]);
			return;
		}
		if(accountId.length>20||pwd.length>20){
			loginPageTip(currError[1]);
			return;
		}
		// 发送请求
		jsonAjax('/'+language+'/user/login.do',
				{
					accountId:accountId,
					pwd:pwd,
					loginType:1// 登录类型
				},
				function(res) {
					// 登录失败
					if(!res.success){
						loginPageTip(res.msg);
						return;
					}
					// 清空提示
					$('#loginTip').hide();
					// 清空用户名密码
					$('#accountId').val('');
					$('#password').val('');
					clearLocalStorage();
					clearCookie();
					//登录账号保存至本地缓存
					setLocalStorage('accountId',accountId);
					setCookie('accountId',accountId);
					setCookie('passWord',pwd);
					// 获取页面参数，判断是否购买
					if(checkAdvertiseId && deviceId && timeInterval){
						location.href = '/'+language+'/forward/confirmOrder.do?checkAdvertiseId='+checkAdvertiseId+'&deviceId='+deviceId+'&timeInterval='+timeInterval+'&fileType='+fileType;
					}else{
						// 普通登录
						location.href = '/'+language+'/forward/customerAdvertise.do';
					}
				},function(){});
	});
}