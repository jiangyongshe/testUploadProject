var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","卡号格式有误","充值成功","充值失败，请联系客服","请输入金额","金额输入错误","验证码发送成功！","请输入验证码！","获取验证码时金额和充值时金额不一致!","银联充值金额不超过3000!"];
var englishError=["register success"];
var twError=[];
var currError=[];
var tranNo="",amountGlaod="",time=120,orderNo="",isNeedValidCode=false;
$(function(){
	$("#headerTitle").text("银联支付");
	currError=currErrorArray(chineseError,englishError,twError);
	$("#commit").bind("click",function(){
		payOrder();
	})
	orderNo=getURLParam("orderNo");
	$(".cardCodeSe").bind("change",function(){
		$(".phoneMobileDis").val($(this).find(":selected").attr("data-mobile"));
	});
	$("#cardCodeValue").bind("input propertychange",function(){
		$(".phoneValidCodeLi").hide();
		$(".phoneMobile").val("");
		isNeedValidCode=false;
	})
	$(".amount").val(getURLParam("amount"));
	$(".amount").addClass("disabled");//禁用金额
	queryCardInfo();//查询卡信息
})


function queryCardInfo(){
	jsonAjax("/"+language+"/customer/queryUserCardInfo.do",{},function(res){
		if(res.success&&res.data!=null&&res.data.length>0){
			var str='<div class="" id="danjia"><ul>';
			for (var i = 0; i < res.data.length; i++) {
				str+='<li onmousedown="getValue(\''+res.data[i].mobile+'\',\''+res.data[i].bank_card_code+'\');showAndHide(\'danjia\',\'hide\');"><i class="fa fa-caret-right pad-r5" aria-hidden="true"></i>'+res.data[i].bank_card_code+(res.data[i].open_account_bank_name==""?'':'（'+res.data[i].open_account_bank_name+'）')+'</li>';
			}
            str+='</ul></div>';
            var div=document.createElement("div");
            div.setAttribute("class","danjia pos-a");
            div.setAttribute("id","danjia");
            div.innerHTML=str;
            $(".cardCode").after(div);
			$(".cardCode").val(res.data[0].bank_card_code);
			$(".phoneMobile").val(res.data[0].mobile);
			$(".phoneValidCodeLi").show();
			isNeedValidCode=true;
		}
	},function(){},"get");
}

//支付订单
function payOrder(){
	disabledBtn("commit");// 禁用提交按钮
	var pay_type="0301";
	var obj={payWay:pay_type,orderNo:orderNo};
	var	cardCode=$(".cardCode").val();
	var	mobile=$(".phoneMobile").val();
	
	if(mobile==""||cardCode==""){
		showJudegTip("fail",currError[1]);//手机号为空
		startBtn("commit");
		return;
	}
	if((mobile.indexOf("*")<0&&!REG_MOBILE.test(mobile))||($("#danjia li").length==0&&mobile.indexOf("*")>=0)){
		showJudegTip("fail",currError[3]);//手机号格式错误
		startBtn("commit");
		return;
	}
	
	if((cardCode.indexOf("*")<0&&!checkCard(cardCode))||($("#danjia li").length==0&&cardCode.indexOf("*")>=0)){//银行卡号
		showJudegTip('fail',currError[4]);
		startBtn("commit");
		return;
	}
	obj.mobile=mobile;
	obj.cardCode=cardCode;
	var phoneCode="";
	if(tranNo!=""){
		phoneCode=$(".phoneValidCode").val();
		if(phoneCode==""){
			showJudegTip('fail',currError[10]);
			startBtn("commit");
			return;
		}
		obj.tranNo=tranNo;
		obj.smsCode=phoneCode;
	}
	if(isNeedValidCode&&tranNo==""){
		showJudegTip('fail',currError[10]);
		startBtn("commit");
		return;
	}
	openWaitAnimation("正在提交中,请稍后...");
	jsonAjax("/"+language+"/order/payOrder.do",obj,function(res){
		closeWaitAnimation();
		if(res.success){
			if(phoneCode!=""){
				window.location.href="zhifuchenggong.html";
				return;
			}
			$("body").html(res.data);
		}else{
			showJudegTip("fail",res.data);
		}
		startBtn("commit");
	},function(){startBtn("commit");},null,null,false);
}

function getValidCode(){//银联获取验证码
	disabledBtn("getValidCode");
	var	cardCode=$(".cardCode").val();
	var	mobile=$(".phoneMobile").val();
	var pay_type="0301";
	if(mobile==""||cardCode==""){
		showJudegTip("fail",currError[1]);//手机号为空
		startBtn("getValidCode");
		return;
	}
	if((mobile.indexOf("*")<0&&!REG_MOBILE.test(mobile))||($("#danjia li").length==0&&mobile.indexOf("*")>=0)){
		showJudegTip("fail",currError[3]);//手机号格式错误
		startBtn("getValidCode");
		return;
	}
	
	if((cardCode.indexOf("*")<0&&!checkCard(cardCode))||($("#danjia li").length==0&&cardCode.indexOf("*")>=0)){//银行卡号
		showJudegTip('fail',currError[4]);
		startBtn("getValidCode");
		return;
	}
	
	var obj={
		orderNo:orderNo,
		mobile:mobile,
		cardCode:cardCode,
		payWay:pay_type,
		sendMsg:1
	}
	
	jsonAjax("/"+language+"/order/payOrder.do",obj,function(res){
		if(res.success){
			if(res.msg=="10000"){
				$("#getValidCode").hide();
				$("#getValidCode1").val(time+" s");
				$("#getValidCode1").show();
				showJudegTip('success',currError[9]);
				$(".amount").addClass("disabled");
				$(".cardCode").addClass("disabled");
				tranNo=res.data;
				countdown();//短信2分钟倒计时
			}else{
				showJudegTip("fail",res.data);//验证码回调显示
				startBtn("getValidCode");
			}
		}else{
			showJudegTip("fail",res.data);
			startBtn("getValidCode");
		}
	},function(){startBtn("getValidCode");},null,null,false);
}
function countdown(){
	setTimeout(function(){
		time--;
		if(time>=0){
			$("#getValidCode1").val(time+" s");
			countdown();
		}else{
			time=120;
			startBtn("getValidCode");
			$(".amount").removeClass("disabled");
			$(".cardCode").removeClass("disabled");
			$("#getValidCode").show();
			$("#getValidCode1").hide();
		}
	},1000);
} //可获取短信验证码倒计时