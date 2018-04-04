var chineseError=["账号和密码不为空","账号和密码不能超过20个字符"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	// 登录按钮
	loginBtn();
	// 判断是否购买过来的
	judegIsBuy();
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
		$("#rememberPwd")[0].checked=true;
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
function judegIsBuy(){
	checkAdvertiseId = getURLParam('checkAdvertiseId').trim();
	deviceId = getURLParam('deviceId').trim();
	timeInterval = getURLParam('timeInterval').trim();
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
				{accountId:accountId,pwd:pwd,mobileLoginPage:1},
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
					var userType = res.msg;
					clearLocalStorage();
					clearCookie();
					//登录账号保存至本地缓存
					setLocalStorage('accountId',accountId);
					//登录账号类型保存至本地缓存
					setLocalStorage('userType',userType);
					if($("#rememberPwd")[0].checked){
						setCookie('accountId',accountId);
						setCookie('passWord',pwd);
					}
					if(isWeiXin()){
						var url=res.data;
						if(url==null||url==""){
							location.href = languageMobile+"/html/index.html";
						}else{
							location.href = url;
						}
						return;
					}
					// 获取页面参数，判断是否购买
					if(checkAdvertiseId && deviceId && timeInterval){
						location.href = languageMobile+'/html/tfgg.html?checkAdvertiseId='+checkAdvertiseId+'&deviceId='+deviceId+'&timeInterval='+timeInterval;
					}else{
						// 普通登录
						location.href = languageMobile+'/html/index.html';
					}
				},function(){});
	});
}
//setTimeout(getWxObject,2000);
/*function getWxObject(){
	jsonAjax('/'+language+'/user/login.do',
		{accountId:accountId,pwd:pwd,mobileLoginPage:1},
		function(res) {
			
		},function(){
			
	});
	var obj = new WxLogin({
		 id:"qrcodeId", 
		 appid: "wxcfca560da6abf615", 
		 scope: "snsapi_login", 
		 redirect_uri: "/chinese/user/thirdLoginCallBack.do",
		 state: "232232323",
		 style: "white",
		 href: ""
	 });
	$("#ewmdiv").show();
}*/

