var chineseError=["基本资料修改成功","信息填写不完整","电子邮箱格式错误","手机号不为空","手机号格式错误","验证码为6个字符","真实姓名为2-20个字符"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	loadUserInfo();//加载用户信息
	loadUserWalletInfo();//加载钱包信息
	var loginType=getLocalStorage('loginType');
	if(loginType!="6"){
		$(".luckIcloudAmount").show();
	}
})

function loadUserInfo(){//加载用户信息
	jsonAjax("/"+language+"/user/loadUser.do",{},function(res){
		var userData = res.data.userData;
		if(userData!=null&&userData!=[]){
			$(".accountId").text(userData.account_id);//用户名
			$(".userName").text("姓名 : "+(userData.user_name==""?"未知":userData.user_name));//用户真实姓名
			var userType = res.msg;
			if(Number(userType)==2||Number(userType)==3||Number(userType)==4||Number(userType)==5||Number(userType)==6){// 1:广告主2：店主3：合作商 4：代理 5：业务员 6 销售员
				$(".profit").show();
				if(Number(userType)==2){
					$(".recommendProfit").show();
				}else{
					$(".screenProfit").show();
				}
				loadUserProfit();//加载用户收益
			}
		}
	},function(){},"get");
}

function loadUserWalletInfo(){//加载用户信息
	jsonAjax("/"+language+"/customerWallet/findWallet.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".amount").text("¥ "+dto.amount);
		}
	},function(){},"get");
}

function loadUserProfit(){//加载用户收益
	jsonAjax("/"+language+"/customer/query/commission.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".totalProfit").text(dto.total_comm+"元");
			$(".adProfit").text(dto.ad_comm+"元");
			$(".mProfit").text(dto.m_comm+"元");
		}
	},function(){},"get");
}
//退出登录
function exitLogin(){
	jsonAjax('/'+language+'/user/exit.do',{},
		function(res){
			if(res.respCode=='10000'){
				clearLocalStorage();
				// 跳去注册页
				location.href = languageMobile+'/html/login.html';
				return;
			}
		},
	function(){});
}