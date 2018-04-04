var html="<div class=\"ding\"><div class=\"mar-auto\">\n";
	html+="<div class=\"fl ding-l\">\n";
	html+="<p class=\"dis-in\">翔云播共享广告，人人广告，人人分享！</p>\n";
	html+="<p class=\"dis-in pad-l10\" id=\"loginRegP\" style=\"display:none\"><a href=\"/"+language+"/exclude/forward/login.do\" class=\"red\" >请登录</a><a href=\"/"+language+"/user/reg.do\" class=\"pad-l8\">免费注册</a></p>\n";
	html+="<p class=\"dis-in pad-l10\" style=\"display:none\">欢迎你，<a class=\"red\" id=\"userName\"></a> | <a href=\"#\" onclick=\"exitLogin()\" id=\"exit\">退出</a></p>\n";
	html+="</div>\n";
	html+="<div class=\"fr ding-r\">\n";
//	html+="<a href=\"/"+language+"/forward/customerAdvertise.do\"><i class=\"fa fa-ship\" aria-hidden=\"true\"></i> <span>我要买</span></a>\n";
//	html+="<a id=\"changeShopkeeper\" onclick=\"activeShopkeeperDIV()\" style=\"display:none\" class=\"suspendPointer\"><i class=\"fa fa-hand-o-up\" aria-hidden=\"true\"></i> <span>成为店主</span></a>\n";
	html+="<div class=\"glzx pos-r\">\n";
	html+="<i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i> <span>管理中心</span>\n";
	html+="<div class=\"glzx-menu pos-a\">\n";
//	html+="<a href=\"/"+language+"/forward/user/recommendFriend.do\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>推荐好友</span></a>\n";
	html+="<a href=\"/"+language+"/forward/user/profile.do\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>我的资料</span></a>\n";
	html+="<a href=\"/"+language+"/forward/user/updatePwd.do\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>修改密码</span></a>\n";
	html+="</div>\n";
	html+="</div>\n";
	html+="<a href=\"/"+language+"/forward/shoppCart.do\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i> <span>购物车</span> <b class=\"red\" id=\"buyCarCount\"></b>\n";
	html+="<a href=\"/"+language+"/forward/customerWallet.do\"><i class=\"fa fa-gg-circle\" aria-hidden=\"true\"></i> <span>翔云宝</span></a>\n";
	html+="<a href=\"/"+language+"/html/khzx.html\"><i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i> <span>客服中心</span></a>\n";
	html+="</div>\n";
	html+="</div></div>\n";
    html+="<div class=\"clear width heade\"><div class=\"mar-auto pos-r\">\n";
	//html+="<div class=\"fl logo\"><a href=\"/"+language+"/html/index1.html\"><img src=\"/"+language+"/images/logo.png\" alt=\"翔云播\" /></a></div>\n";
    html+="<div class=\"fl logo\"><a href=\"#\"><img src=\"/"+language+"/images/logo.png\" alt=\"翔云播\" /></a></div>\n";
    html+="<div class=\"fr home-banner\">\n";
	html+="<img src=\"/"+language+"/images/banner21.jpg\" alt=\"每个人都有广告需求\" /></a>\n";
	html+="</div>\n";
//	html+="<div class=\"fr home-search\">\n";
//	html+="<input id=\"titleKeyword\" type=\"text\" class=\"fl wenb06\" placeholder=\"请输入关键词\" />\n";
//	html+="<button id=\"titleSearch\" type=\"button\" class=\"fl btn btn07 bg-red font14\"><i class=\"fa fa-2x fa-search\" aria-hidden=\"true\"></i></button>\n";
//	html+="</div>\n";
//	html+="<div class=\"pos-a hear-r font14\"><a href=\"/"+language+"/exclude/forward/askToBuy.do\"><img src=\"/"+language+"/images/fbqg.gif\" alt=\"发布求购信息\" /></a></div>\n";
	html+="</div></div>\n";
	html+="<menu><ul>\n";
	//html+="<li class=\"index\"><a href=\"/"+language+"/html/index1.html\">首页</a></li>\n";
	html+="<li class=\"adStore\"><a href=\"/"+language+"/exclude/forward/adStore.do\">广告店铺展示</a></li>\n";
	html+="<li class=\"customerAdvertise\"><a href=\"/"+language+"/forward/customerAdvertise.do\">投放广告</a></li>\n";
//	html+="<li class=\"askToBuy\"><a href=\"/"+language+"/exclude/forward/askToBuy.do\">求购信息</a></li>\n";
//	html+="<li class=\"qydt\"><a href=\"/"+language+"/html/qydt.html\">企业动态</a></li>\n";
//	html+="<li class=\"gywm lxwm fwtk cjwt\"><a href=\"/"+language+"/html/gywm.html\">关于我们</a></li>\n";
	html+="</ul></menu>\n";
document.writeln(html);
var loginStatus=false;
$(function(){
	//根据页面url修改选中状态
	var urlStr = window.location.href.split("/");
	var suffixName = urlStr[urlStr.length-1].split(".")[0];
	if(suffixName!='login'){
		if(document.getElementsByName(suffixName).length>0){
			$('.customerAdvertise').attr('class','active');
		}else{
			$('.'+suffixName).attr('class','active');
		}
	}
	var accountId = getLocalStorage('accountId');
	if(accountId!=null){// 已经登录
		// 显示用户名
		$('#userName').text(accountId);
		$('#userName').parent().show();
		$('#userName').attr('href','/'+language+'/forward/customerAdvertise.do');
		// 加载用户信息
		jsonAjax('/'+language+'/user/loadUser.do',{},
		function(res){
			var data = res.data;
			if(data){
				loginStatus=true;//修改状态
				// 记录登录账号
				//setLocalStorage('accountId',accountId);
				// 记录用户ID
				var userId = data.id;
				setLocalStorage('userId',userId);
				// 记录用户类型
				var userType = res.msg;
				setLocalStorage('userType',userType);
				// 显示登录注册按钮
				$('#loginRegP').hide();
				if(Number(userType)==1){// 普通用户
					// 显示成为店主菜单
					//$('#changeShopkeeper').show();
					// 隐藏店主菜单
					$('.shopManager').hide();
					$("[name='agencyCommission']").hide();
				}else{// 成为店主
					// 隐藏成为店主菜单
					$('#changeShopkeeper').hide();
					// 隐藏成为店主按钮
					$('[name="changeShopkeeperBtn"]').hide();
				}
				// 加载购物车数量 TODO
				var shoppCount=data.shoppCount;
				$("#buyCarCount").text(shoppCount);
			}
			
		},function(){});
	}else{// 未登录
		// 隐藏退出按钮
		$('#exit').hide();
		
		// 显示登录注册按钮
		$('#loginRegP').show();
		// 显示成为店主按钮
		//$('#changeShopkeeper').show();
		// 购物车数量清空
		$('#buyCarCount').text('');
	}
	// 绑定搜索按钮
	$('#titleSearch').bind('click',function(){
		// 关键字
		var keyword = $('#titleKeyword').val().trim();
		window.location.href = '/'+language+'/exclude/forward/adStore.do?keyword='+encodeURIComponent(keyword);
	});
})
/**
 * 激活为店主提示框
 * @returns
 */
function activeShopkeeperDIV(){
	if(!loginStatus){
		// 跳去注册页
		location.href = '/'+language+'/user/reg.do?registerType=1';
		return;
	}
	jsonAjax('/'+language+'/exclude/AD/activeAD.do',{},
			function(res){
				var msg = res.msg;
				var success = res.success;
				if(msg=='999'){
					// 跳去注册页
					location.href = '/'+language+'/exclude/forward/login.do';
					return;
				}
				if(success){// 激活成功
					showJudegTip('success','',msg);
					location.href='/'+language+'/forward/AD/gotoChangeToAd.do';
					$('#activeErrorTip').html('').hide();
					// 隐藏成为店主菜单
					$('#changeShopkeeper').hide();
					// 隐藏成为店主按钮
					$('[name="changeShopkeeperBtn"]').hide();
				}else{// 激活失败
					$('#activeErrorTip').html(msg).show();
				}
			},
			function(){});
}

//退出登录
function exitLogin(){
	if(loginStatus){
		jsonAjax('/'+language+'/user/exit.do',{},
			function(res){
				if(res.respCode=='10000'){
					clearLocalStorage();
					// 跳去注册页
					location.href = '/'+language+'/html/index1.html';
					return;
				}
			},
		function(){});
	}
}
/*$(window).bind('beforeunload',function(){
	if(event.clientX>document.body.clientWidth&&event.clientY<0||event.altKey)
    {   
		exitLogin();
    }
	$(window).unbind('beforeunload');
});*/
	//解除绑定，一般放在提交触发事件中
	
/*window.onbeforeunload = function(event) { 
	var x=event.currentTarget.screenX,y=event.currentTarget.screenY;
	
	var b=x+y;
	if(window.event.clientX>document.body.clientWidth&&window.event.clientY<0||window.event.altKey)
    {   
		exitLogin();
    }
}*/
