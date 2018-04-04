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
})

function commit(){//加载用户信息
	var amount=$(".amount").val();
	disabledBtn("commit");//禁用提交按钮
	if(amount==""){
		showJudegTip("fail","请输入金额");
		startBtn("commit");
		return;
	}
	if(isNaN(amount)){
		showJudegTip("fail","金额输入错误");
		startBtn("commit");
		return;
	}
	var pay_type=$(".payType").find("input:checked").val();
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
				showJudegTip("fail",res.msg);
			}
			startBtn("commit");
		},
		error : function(res) {
			startBtn("commit");
		}
	});
	startBtn("commit");
}
