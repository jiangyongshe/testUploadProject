$(function(){
	$(".sendbtn").bind("click",function(){
		sendEmail();//邮件发送
	});
})

function sendEmail(){
	$(".sendbtn")[0].disabled=true;
	var userName = $(".userName").val();
	var emailName = $(".emailName").val();
	var title = $(".title").val();
	var content = $(".content").val();
	if(userName.trim()==""||emailName.trim()==""||title.trim()==""||content.trim()==""){
		alert("请填写完整的信息！");
		$(".sendbtn")[0].disabled=false;
		return;
	}
	//电子邮箱格式
	var REG_EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if(!REG_EMAIL.test(emailName)){
		alert("邮箱格式错误！");
		$(".sendbtn")[0].disabled=false;
		return;
	}
	var obj={userName:userName,emailName:emailName,title:title,content:content};
	$.ajax({
		url:"/index/sendEmail/sendEmailForComp/cm.do",
		data:obj,
		type:"post",
		cache:false,
		async: false,
		timeout : 30000,
		dataType : "json",
		success : function(res) {
			if(res=="10000"){
				$("#successdiv").show();
				console.log("send email success!");
			}else{
				$("#faildiv").show();
				console.log("send email fail! please do it later...");
			}
		},
		error : function(res) {
			$("#faildiv").show();
			console.log("send email error ! please do it later...");
		}
	});
}

function turnoff(id){
	$("#"+id).hide();
}