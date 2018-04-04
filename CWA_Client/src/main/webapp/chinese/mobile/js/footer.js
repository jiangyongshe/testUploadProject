/*var html="<div class=\"hei60\"></div>\n";
    html+="<div class=\"footer-nav font12\"><ul id=\"menuFooter\">\n";
	html+="<li class=\"indexhtml\"><a href=\"index.html\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i><br />首页</a></li>\n";
	html+="<li class=\"ggddhtml\"><a href=\"ggdd.html\"><i class=\"fa fa-building-o\" aria-hidden=\"true\"></i><br />广告订单</a></li>\n";
	html+="<li class=\"tfgghtml active\"><a href=\"tfgg.html\"><i class=\"fa fa-plus\"' aria-hidden=\"true\"></i><br />投放广告</p></a></li>\n";
	html+="<li class=\"gwchtml\"><a href=\"gwc.html\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i><br />购物车<em id=\"buyCarCount\">0</em></a></li>\n";
	html+="<li class=\"wodehtml\"><a href=\"wode.html\"><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i><br />我的翔云</a></li>\n";
	html+="</ul></div>\n";
	html+="<script src=\""+languageMobile+"/js/top.js\"></script>\n";
	html+="<div id=\"top\"></div>\n";
document.writeln(html);*/

var html="<div class=\"hei60\"></div>\n";
html+="<div class=\"footer-nav font12\"><ul id=\"menuFooter\">\n";
html+="<li class=\"indexhtml\"><a href=\"index.html\"><span><i class=\"fa fa-home\" aria-hidden=\"true\"></i></span><p>首页</p></a></li>\n";
html+="<li class=\"tfgghtml\"><a href=\"tfgg.html\"><span><i class=\"fa fa-plus2\" aria-hidden=\"true\"></i></span><p>批量投放</p></a></li>\n";
html+="<li class=\"gwchtml\"><a href=\"gwc.html\"><span><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i></span><p>购物车</p><em id=\"buyCarCount\">0</em></a></li>\n";
html+="<li class=\"ggddhtml\"><a href=\"ggdd.html\"><span><i class=\"fa fa-building-o2\" aria-hidden=\"true\"></i></span><p>我的订单</p></a></li>\n";
html+="<li class=\"wodehtml\"><a href=\"wode.html\"><span><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></span><p>我的翔云</p></a></li>\n";
html+="</ul></div>\n";
html+="<script src=\""+languageMobile+"/js/top.js\"></script>\n";
html+="<div id=\"top\"></div>\n";
document.writeln(html);
$(function(){
	queryShoppCartCount();
	activeMenu();
})

//查询购物车数量
function queryShoppCartCount(){
	$.ajax({
		url : '/'+language+'/user/loadUser.do',
		data : {},
		type : 'get',
		cache:false,
		async: true,
		timeout : 30000,
		dataType : 'json',
		success : function(res) {
			var data =null;
			if(res.data){
				data=res.data.userData;
			}
			if(data){
				var userId = data.id;
				var userType = res.msg;
				var accountId = data.account_id;
				var loginType = data.loginType;
				haveWPWD=data.havaWPWD;
				if(haveWPWD&&$(".typePwd").length>0){
					$(".typePwd").text("修改提现密码");
				}else{
					if(getURLParam("ty")=="1"){
						$("input[type='radio']")[1].checked=true;
						$('#oldPwd').hide();
					}
					$(".typePwd").text("设置提现密码");
				}
				if($(".bankCardName").length>0&&$(".mobile").length>0){
					$(".bankCardName").val(data.user_name);
					$(".mobile").val(data.fullMb);
				}
				if($("#mobile").length>0){
					$("#mobile").val(data.fullMb);
				}
				setLocalStorage('userId',userId);
				setLocalStorage('sessionId',res.data.sessionId);
				setLocalStorage('userType',userType);
				setLocalStorage('accountId',accountId);
				setLocalStorage('loginType',loginType);
				setLocalStorage('first',true);
				// 加载购物车数量 TODO
				var shoppCount=data.shoppCount;
				$("#buyCarCount").text(shoppCount);
				if(ws==null){
					keepAlive();//心跳
				}
			}
		}
	});
}
//激活菜单样式
function activeMenu(){
	var str=window.location.href.substring(window.location.href.lastIndexOf("/")+1,window.location.href.lastIndexOf("html")+4).replace(".","");
	$("#menuFooter li").removeClass("active");
	if(str.indexOf("wdzl")>=0||str.indexOf("qianbao")>=0||str.indexOf("xgmm")>=0||str.indexOf("ggyj")>=0||str.indexOf("chuj")>=0||str.indexOf("kefu")>=0||str.indexOf("ggcx")>=0||str.indexOf("sbjk")>=0||str.indexOf("sbxq")>=0){
		$(".wodehtml").addClass("active");
		return;
	}else if(str.indexOf("tfgg01")>=0){
		$(".tfgghtml").addClass("active");
		return;
	}else if(str.indexOf("shangchuanshipin")>=0||str.indexOf("chakanshipin")>=0){
		$(".ggddhtml").addClass("active");
		return;
	}else if(str.indexOf("detail")>=0){
		$(".indexhtml").addClass("active");
		return;
	}
	$("."+str.split("#")[0]).addClass("active");
}
var ws=null,wsCount=0;
//ws 
function keepAlive(){
	if("WebSocket" in window){
		ws = new WebSocket(wsUrl);
	}else if ('MozWebSocket' in window) {  
		ws = new MozWebSocket(wsUrl);  
    }else{
		showJudegTip('fail',"您的浏览器不支持 WebSocket!");
	}
	ws.onopen=function(){
		wsLoginMs();//发送登录请求
		//sendHeartMs();//发送心跳
	};
	ws.onmessage=function(res){
		var data=JSON.parse(res.data);
		if(data.type=="10002"){
			if(data.code=="10000"){
				sendHeartMs();//登录成功,发送心跳
			}
		}else if(data.type=="10001"){
			if(data.code="10000"){
				if(noticeArr.length>0){//如果还在查看又推送公告，则往后加
					noticeArr=noticeArr.concat(JSON.parse(data.respMsg));
					$(".countAll").text(noticeArr.length);
					//addNoticeForDiv(data.respMsg);//添加公告在当前公告框
				}else{
					noticeArr=JSON.parse(data.respMsg);
					showNoticeDiv();//显示公告
				}
				ws.send('{"uuid":"'+getLocalStorage("sessionId")+'","type":"10001","respCode":"10000","respMsg":""}');//发送消息
			}
			//{"uuid":"sessionid","type":"10001","respCode":"10000","respMsg":"[{\"id\":1,\"notice_title\":\"test\",\"state\":2,\"user_type\":1,\"send_date_start\":\"2018-03-13 14:00:00\",\"failure_date_start\":\"2018-03-15 14:00:00\",\"notice_content\":\"test\"},{\"id\":1,\"notice_title\":\"test\",\"state\":2,\"user_type\":1,\"send_date_start\":\"2018-03-13 14:00:00\",\"failure_date_start\":\"2018-03-15 14:00:00\",\"notice_content\":\"test\"}]"}
		}
	};
	ws.onclose=function(){
		if(wsCount<3){//重连3次
			setTimeout(function(){keepAlive()},5000);//断线重连
		}
		wsCount++;
		console.log(".....conntion close");
	};
	ws.onerror=function(){
		console.log(".....conntion close");
	};
}
//心跳
function sendHeartMs(){
	if(ws!=null&&getLocalStorage("accountId")!=null){
		var loginType=getLocalStorage("userType");//登录用户类型
		if(loginType=="1"){
			loginType="6";
		}else if(loginType=="2"){
			loginType="5";
		}
		var sessionid=getLocalStorage("sessionId");//sessionId
		if(loginType=="5"||loginType=="6"){
			ws.send('{"uuid":"'+sessionid+'","type":"10005","content":"{\\"userType\\":'+loginType+',\\"clientType\\":2}"}');//发送消息
			setTimeout(sendHeartMs,1000*80);//每隔80秒发送一次心跳
		}
	}
}
//登录
function wsLoginMs(){
	if(ws!=null&&getLocalStorage("accountId")!=null){
		var loginType=getLocalStorage("userType");//登录用户类型
		if(loginType=="1"){
			loginType="6";
		}else if(loginType=="2"){
			loginType="5";
		}
		var sessionid=getLocalStorage("sessionId");//sessionId
		var accountId=getLocalStorage("accountId");//sessionId
		if(loginType=="5"||loginType=="6"){
			ws.send('{"uuid":"'+sessionid+'","type":"10002","content":"{\\"userType\\":'+loginType+',\\"clientType\\":2,\\"accountId\\":\\"'+accountId+'\\"}"}');//发送消息
		}
	}
}