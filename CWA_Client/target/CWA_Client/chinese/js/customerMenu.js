var html="<div class=\"left left-ggs\">\n";
	html+="<div class=\"menu-pc\">\n";
	html+="<span class=\"menu01\">广告管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"customerAdvertise\"><a href=\"/"+language+"/forward/customerAdvertise.do\">我要投放广告<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerOrder\"><a href=\"/"+language+"/forward/customerOrder.do\">我的广告订单<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"shoppCart\"><a href=\"/"+language+"/forward/shoppCart.do\">我的购物车<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"adHistoryQuery\"><a href=\"/"+language+"/forward/adHistoryQuery.do\">广告播出历史查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="<span class=\"menu01\">账户管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"recommendFriend\"><a href=\"/"+language+"/forward/customer/recommendFriend.do\">推荐好友<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"agencyCommission\"><a href=\"/"+language+"/forward/agencyCommission.do\">广告佣金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"withdraw\"><a href=\"/"+language+"/forward/customer/withdraw.do\">出金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerWallet\"><a href=\"/"+language+"/forward/customerWallet.do\">翔云宝<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"myProfile\"><a href=\"/"+language+"/forward/myProfile.do\">我的资料<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerUpdatePwd\"><a href=\"/"+language+"/forward/customerUpdatePwd.do\">修改密码<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu00\">\n";
	html+="<span class=\"menu01\">广告管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"customerAdvertise\"><a href=\"/"+language+"/forward/customerAdvertise.do\">我要投放广告<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerOrder\"><a href=\"/"+language+"/forward/customerOrder.do\">我的广告订单<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"shoppCart\"><a href=\"/"+language+"/forward/shoppCart.do\">我的购物车<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"adHistoryQuery\"><a href=\"/"+language+"/forward/adHistoryQuery.do\">广告播出历史查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu00\">\n";
	html+="<span class=\"menu01\">账户管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"recommendFriend\"><a href=\"/"+language+"/forward/customer/recommendFriend.do\">推荐好友<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"agencyCommission\"><a href=\"/"+language+"/forward/agencyCommission.do\">广告佣金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"withdraw\"><a href=\"/"+language+"/forward/customer/withdraw.do\">出金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerWallet\"><a href=\"/"+language+"/forward/customerWallet.do\">翔云宝<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"myProfile\"><a href=\"/"+language+"/forward/myProfile.do\">我的资料<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerUpdatePwd\"><a href=\"/chinese/forward/customerUpdatePwd.do\">修改密码<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="</div>\n";
document.writeln(html);
//根据页面url修改选中状态
var urlStr = window.location.href.split("/");
var menuName = urlStr[urlStr.length-1].split(".")[0];
var menuNameEles = document.getElementsByName(menuName);
for(var i=0;i<menuNameEles.length;++i){
	menuNameEles[i].setAttribute('class','active');
}
$(".menu00").click(function() { //弹出垂直菜单
	if ($(this).hasClass("cura")) {
		$(this).children(".menu02").hide();
		$(".menu00").removeClass("cura");
	} else {
		$(".menu00").removeClass("cura");
		$(this).addClass("cura");
		$(".menu00").children(".menu02").slideUp("fast");
		$(this).children(".menu02").slideDown("fast");
	}
});
    