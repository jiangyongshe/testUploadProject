var html="<div class=\"left\">\n";
    html+="<div class=\"menu-but\"></div>\n";
	html+="<div class=\"menu-pc\">\n";
	html+="<div class=\"menu-ggz\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-ship\" aria-hidden=\"true\"></i> 广告管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	
	html+="<li name=\"customerAdvertise\"><a href=\"/"+language+"/forward/customerAdvertise.do\">我要投放广告<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerOrder\"><a href=\"/"+language+"/forward/customerOrder.do\">我的广告订单<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"shoppCart\"><a href=\"/"+language+"/forward/shoppCart.do\">购物车<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"adHistoryQuery\"><a href=\"/"+language+"/forward/adHistoryQuery.do\">广告播出历史查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu-ggz shopManager\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-ticket\" aria-hidden=\"true\"></i> 店主管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	//html+="<li name=\"gotoChangeToAd\"><a href=\"/"+language+"/forward/AD/gotoChangeToAd.do\">完善店主资料<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"queryAD\"><a href=\"/"+language+"/forward/AD/queryAD.do\">广告查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"deviceMonitoring\"><a href=\"/"+language+"/forward/AD/deviceMonitoring.do\">设备监控<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"deviceDetail\"><a href=\"/"+language+"/forward/AD/deviceDetail.do\">设备详情<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu-ggz\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-gg\" aria-hidden=\"true\"></i> 资金管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"commission\"><a href=\"/"+language+"/forward/user/commission.do\">广告佣金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"withdraw\"><a href=\"/"+language+"/forward/user/withdraw.do\">出金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerWallet\"><a href=\"/"+language+"/forward/customerWallet.do\">翔云宝<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div name=\"changeShopkeeperBtn hide\" style=\"display:none\" class=\"menu-dz btn bg-red text-c font18\" onclick=\"activeShopkeeperDIV()\"><i class=\"fa fa-hand-o-up\" aria-hidden=\"true\"></i> 成为店主</div>\n";
	html+="</div>\n";
	html+="<div class=\"menu00\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-ship\" aria-hidden=\"true\"></i> 广告管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"customerAdvertise\"><a href=\"/"+language+"/forward/customerAdvertise.do\">我要投放广告<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerOrder\"><a href=\"/"+language+"/forward/customerOrder.do\">我的广告订单<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"shoppCart\"><a href=\"/"+language+"/forward/shoppCart.do\">我的购物车<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"adHistoryQuery\"><a href=\"/"+language+"/forward/adHistoryQuery.do\">广告播出历史查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu00 shopManager\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-ticket\" aria-hidden=\"true\"></i> 店主管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	//html+="<li name=\"gotoChangeToAd\"><a href=\"/"+language+"/forward/AD/gotoChangeToAd.do\">完善店主资料<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"queryAD\"><a href=\"/"+language+"/forward/AD/queryAD.do\">广告查询<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"deviceMonitoring\"><a href=\"/"+language+"/forward/AD/deviceMonitoring.do\">设备监控<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"deviceDetail\"><a href=\"/"+language+"/forward/AD/deviceDetail.do\">设备详情<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div class=\"menu00\">\n";
	html+="<span class=\"menu01\"><i class=\"fa fa-gg\" aria-hidden=\"true\"></i> 资金管理</span>\n";
	html+="<ul class=\"menu02\">\n";
	html+="<li name=\"agencyCommission\"><a href=\"/"+language+"/forward/user/commission.do\">广告佣金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"withdraw\"><a href=\"/"+language+"/forward/user/withdraw.do\">出金<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="<li name=\"customerWallet\"><a href=\"/"+language+"/forward/customerWallet.do\">翔云宝<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></a></li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="<div name=\"changeShopkeeperBtn hide\" style=\"display:none\" class=\"menu-sjdz btn bg-red text-c font16\" onclick=\"activeShopkeeperDIV()\"><i class=\"fa fa-hand-o-up\" aria-hidden=\"true\"></i> 成为店主</div>\n";
	html+="</div>\n";
	html+="<script>\n";
	html+="$(\".menu00\").click(function() {\n"; //弹出垂直菜单
	html+="if ($(this).hasClass(\"cura\")) {\n";
	html+="$(this).children(\".menu02\").hide();\n";
	html+="$(\".menu00\").removeClass(\"cura\");\n";
	html+="} else {\n";
	html+="$(\".menu00\").removeClass(\"cura\");\n";
	html+="$(this).addClass(\"cura\");\n";
	html+="$(\".menu00\").children(\".menu02\").slideUp(\"fast\");\n";
	html+="$(this).children(\".menu02\").slideDown(\"fast\");\n";
	html+="}\n";
	html+="});\n";
	html+="$(document).ready(function(){\n";
	html+="$(\".menu-but\").click(function(){\n";
	html+="$(\".left\").toggleClass(\"left1\");\n";
	html+="$(\".right\").toggleClass(\"right1\");\n";
	html+="});\n";
	html+="});\n";
	html+="</script>\n";
	html+="\n";
document.writeln(html);
//根据页面url修改选中状态
var urlStr = window.location.href.split("/");
var menuName = urlStr[urlStr.length-1].split(".")[0];
var menuNameEles = document.getElementsByName(menuName);
for(var i=0;i<menuNameEles.length;++i){
	menuNameEles[i].setAttribute('class','active');
}
/*$(".menu00").click(function() { //弹出垂直菜单
	if ($(this).hasClass("cura")) {
		$(this).children(".menu02").hide();
		$(".menu00").removeClass("cura");
	} else {
		$(".menu00").removeClass("cura");
		$(this).addClass("cura");
		$(".menu00").children(".menu02").slideUp("fast");
		$(this).children(".menu02").slideDown("fast");
	}
}); */ 
    