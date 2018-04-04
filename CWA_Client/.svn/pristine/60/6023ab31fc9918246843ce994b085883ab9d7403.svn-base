var html  = "<div class=\"left\">\n";
	html += "<a href=\"/"+language+"/forward/index/cm.do\" class=\"menu01 index\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i><span class=\"dis-in\">首页</span></a>\n";
	html += "<a href=\"/"+language+"/forward/customerAdvertise.do\" class=\"menu01 customerAdvertise\"><i class=\"fa fa-caret-square-o-right\" aria-hidden=\"true\"></i><span class=\"dis-in\">投放广告</span></a>\n";
	html += "<a href=\"/"+language+"/forward/shoppCart.do\" class=\"menu01 shoppCart\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i><span class=\"dis-in\">购物车</span></a>\n";
	html += "<a href=\"/"+language+"/forward/customerOrder.do\" class=\"menu01 customerOrder\"><i class=\"fa fa-sliders\" aria-hidden=\"true\"></i><span class=\"dis-in\">我的订单</span></a>\n";
	html += "<a href=\"/"+language+"/forward/user/commission.do\" class=\"menu01 commission\" style=\"display:none;\"><i class=\"fa fa-gg\" aria-hidden=\"true\"></i><span class=\"dis-in\">收益管理</span></a>\n";
	html += "</div>\n";
document.writeln(html);

// 根据页面URL修改选中状态
var urlStr = window.location.href.split("/");
var menuName = urlStr[urlStr.length-1].split(".")[0];
$('.'+menuName).addClass('active');