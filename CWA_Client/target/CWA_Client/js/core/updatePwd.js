var chineseError=["密码不为空","两次输入密码不一致","密码为6-12个字符"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	// 提交按钮
	submit();
})

/**
 * 提交按钮
 */
function submit(){
	$('#submit').on('click',function(){
		// 获取原密码
		var oldPwd = $('#oldPwd').val();
		// 获取新密码
		var newPwd = $('#newPwd').val();
		// 获取二次输入的密码
		var confirmPwd = $('#confirmPwd').val();
		if(oldPwd==null||oldPwd==""||newPwd==null||newPwd==""||confirmPwd==null||confirmPwd==""){
			showJudegTip('fail','提示',currError[0]);
			return;
		}
		if(newPwd.length>12||newPwd.length<6||oldPwd.length>12||oldPwd.length<6||confirmPwd.length>12||confirmPwd.length<6){
			showJudegTip('fail','提示',currError[2]);
			return;
		}
		if(newPwd!=confirmPwd){
			showJudegTip('fail','提示',currError[1]);
			return;
		}
		// 发送请求
		jsonAjax('/'+language+'/customer/updatePwd.do',{oldPwd:oldPwd,newPwd:newPwd,confirmPwd:confirmPwd},
		function(res){
			var msg = res.msg;
			if(msg!='10000'){
				showJudegTip('fail','提示',msg);
			}else{
				showJudegTip('success','提示',res.data);
				// 清空输入框
				$('#oldPwd').val('');
				$('#newPwd').val('');
				$('#confirmPwd').val('');
			}
		},function(){});
	});
	
}