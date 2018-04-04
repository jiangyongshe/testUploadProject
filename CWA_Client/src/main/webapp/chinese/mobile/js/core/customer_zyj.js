var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","卡号格式有误","充值成功","充值失败，请联系客服","请输入金额","金额输入错误","验证码发送成功！","请输入验证码！"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	$("#headerTitle").text("余额");
	currError=currErrorArray(chineseError,englishError,twError);
	
	if(Number(getLocalStorage('userType'))==2||Number(getLocalStorage('userType'))==5){
		queryCardInfo();//查询卡信息
		$(".withOutAmount").show();
	}
	loadUserProfit();//加载用户收益
})

function queryCardInfo(){
	jsonAjax("/"+language+"/customer/queryUserCardInfo.do",{cardType:3},function(res){
		if(res.success&&res.data!=null&&res.data.length>0){
			$(".cardInfo").show();
			$(".cardNo").text(res.data[0].bank_card_code);
			$(".bankName").text(res.data[0].open_account_bank_name);
		}else{
			$(".banka").show();
		}
	},function(){},"get");
}
function loadUserProfit(){//加载用户收益
	jsonAjax("/"+language+"/customer/query/commission.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".totalProfit").text(dto.total_comm);
			$(".available_comm").text(dto.available_comm);
		}
	},function(){},"get");
}

function goWithDrawPage(){
	if(haveWPWD){
		window.location.href="chuj.html";
	}else{
		window.location.href="xgmm.html?ty=1";
	}
	
}