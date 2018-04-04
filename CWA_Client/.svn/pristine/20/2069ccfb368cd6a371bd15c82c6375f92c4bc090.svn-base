var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=8,type="";
$(function(){
	$("#headerTitle").text("翔云余额");
	currError=currErrorArray(chineseError,englishError,twError);
	loadUserWalletInfo();//钱包数据初始化
})

function loadUserWalletInfo(){//加载用户信息
	jsonAjax("/"+language+"/customerWallet/findWallet.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".amount").text(dto.amount);
		}
	},function(){},"get");
}

