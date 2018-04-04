$(function(){
	// 绑定发布按钮
	$('#issueBtn').bind('click',function(){
		jsonAjax('/'+language+'/user/issueMsg.do',
		{
			company:$('#company').val(),
			budget:$('#budget').val(),
			contacts:$('#contacts').val(),
			contactWay:$('#contactWay').val(),
			describe:$('#describe').val()
		},
		function(res){
			var success = res.success;
			var msg = res.msg;
			if(success){
				showJudegTip('success','',msg);
				$('#company').val("");
				$('#budget').val("");
				$('#contacts').val("");
				$('#contactWay').val("");
				$('#describe').val("");
			}else{
				showJudegTip('fail','',msg);
			}
		},
		function(){})
	});
});