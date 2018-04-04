var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	
	$("#commit").bind("click",function(){
		commit();
	})
	document.getElementsByName("customerWallet")[0].className="active";
	$(".customerAdvertise").attr('class','active');
	$(document).on("click",".zf-xz li",function(){
		$(".zf-xz li").removeClass("active");
		$(this).addClass("active");//激活样式
	})
})

function commit(){//加载用户信息
	var amount=$(".amount").val();
	disabledBtn("commit");//禁用提交按钮
	var pay_type=$(".zf-xz").find(".active").attr("data");
	if(amount==""){
		showJudegTip("fail","提示","请输入金额");
		startBtn("commit");
		return;
	}
	if(isNaN(amount)){
		showJudegTip("fail","提示","金额输入错误");
		startBtn("commit");
		return;
	}
	$.ajax({
		url : "/"+language+"/customerWallet/walletRecharge.do",
		data : JSON.stringify({AMOUNT:amount,pay_type:pay_type,FLOW_TYPE:1}),
		type : "POST",
		cache:false,
		timeout : 10000,
		dataType : "json",
		contentType:"application/json",
		success : function(res) {
			isLogin(res,function(){
				if(res.success){
					if(pay_type=="0201"){
						$("body").html(res.data);
					}else if(pay_type=="0101"){
					        if(res.data.indexOf('http')>-1){
					           window.location.href=res.data;
					        }else{
						         orderNo=res.msg;
								createQrcode("qrcodeId",res.data);
								convertCanvasToImage("qrcodeId");
								$("#ewmdiv").show();
							}
						
					}
				}else{
					showJudegTip("fail","提示",res.data);
				}
				startBtn("commit");
			});
		},
		error : function(res) {
			startBtn("commit");
		}
	});
	startBtn("commit");
}

function checkOrderStatus(){
	openWaitAnimation("正在检验订单状态,请稍后...");
	jsonAjax("/"+language+"/order/checkOrderStatus.do",{orderNo:orderNo},function(res){
		closeWaitAnimation();
		if(res.success){
			window.location.href="/"+language+"/exclude/orderPay/alipayOrderReturnUrl.do";
		}else{
			showJudegTip("fail","提示",res.data);//注册回调显示
		}
	},function(){closeWaitAnimation();},null,null,false);
}