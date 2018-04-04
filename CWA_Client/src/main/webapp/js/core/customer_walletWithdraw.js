var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var pay_type="";
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	
	$("#commit").bind("click",function(){
		commit();
	})
	document.getElementsByName("customerWallet")[0].className="active";
	$(".customerAdvertise").attr('class','active');
	$(document).on("click",".zf-xz li",function(){
		$(".zf-xz li").removeClass("active");
		var pay_type=$(this).attr("data");
		if(pay_type=="0101"){
			$(".wechatPay").removeClass("hide");
			$(".aliPay").addClass("hide");
			$(".unionPay").addClass("hide");
		}else if(pay_type=="0102"){
			$(".wechatPay").addClass("hide");
			$(".aliPay").removeClass("hide");
			$(".unionPay").addClass("hide");
		}else if(pay_type=="0103"){
			$(".wechatPay").addClass("hide");
			$(".aliPay").addClass("hide");
			$(".unionPay").removeClass("hide");
		}
		$(this).addClass("active");//激活样式
	})
})

function commit(){//加载用户信息
	var amount=$("ul").not(".hide").find(".amount").val();
	disabledBtn("commit");//禁用提交按钮
	if(amount==""){
		tipInfo({
			status:'fail',
			content:'请输入金额'
		});
		startBtn("commit");
		return;
	}
	if(isNaN(amount)){
		tipInfo({
			status:'fail',
			content:'金额输入错误'
		});
		startBtn("commit");
		return;
	}
	var pay_type=$(".zf-xz").find(".active").attr("data");
	$.ajax({
		url : "/"+language+"/customerWallet/walletWithout.do",
		data : JSON.stringify({AMOUNT:amount,pay_type:pay_type,FLOW_TYPE:2}),
		type : "POST",
		cache:false,
		timeout : 10000,
		dataType : "json",
		contentType:"application/json",
		success : function(res) {
			if(res.success){
				$("body").html(res.data);
			}else{
				tipInfo({
					status:'fail',
					content:res.msg
				});
			}
			startBtn("commit");
		},
		error : function(res) {
			startBtn("commit");
		}
	});
	startBtn("commit");
}
