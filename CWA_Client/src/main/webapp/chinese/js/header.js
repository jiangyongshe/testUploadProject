var html ="<div class=\"ding\"><div class=\"mar-auto\">\n";
    html+="<div class=\"fl ding-l\">\n";
	html+="<p class=\"dis-in\">翔云播共享广告，人人广告，人人分享！</p>\n";
	html+="</div>\n";
	html+="<div class=\"fr ding-r\">\n";
	html+="<div class=\"glzx pos-r hide\">\n";
	html+="<span id=\"userName\"></span><i class=\"fa fa-angle-down pad-l5\" aria-hidden=\"true\"></i>\n";
	html+="<div class=\"glzx-menu pos-a\">\n";
	html+="<a href=\"#\" onclick=\"exitLogin()\" id=\"exit\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> <span>退出</span></a>\n";
	html+="</div>\n";
	html+="</div>\n";
	html+="<div class=\"glzx glzx2 pos-r\">\n";
	html+="<i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i> <span>管理中心</span>\n";
	html+="<div class=\"glzx-menu pos-a\">\n";
	html+="<a style=\"cursor:pointer;\" onclick=\"myProfile()\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>我的资料</span></a>\n";
	html+="<a style=\"cursor:pointer;\" onclick=\"updatePwd()\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>设置密码</span></a>\n";
	html+="</div>\n";
	html+="</div>\n";
	html+="<a href=\"/"+language+"/forward/customerWallet.do\"><i class=\"fa fa-gg-circle\" aria-hidden=\"true\"></i> <span>翔云余额</span></a>\n";
	html+="<a href=\"/"+language+"/forward/serviceCenter/cm.do\"><i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i> <span>客服中心</span></a>\n";
	html+="<a href=\"/"+language+"/forward/shoppCart.do\" class=\"gwc\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i> <span>购物车</span> <b class=\"\">（<span class=\"\" id=\"buyCarCount\">0</span>）</b></a>\n";
	html+="</div>\n";
	html+="</div></div>\n";
    html+="<div class=\"clear width heade\"><div class=\"mar-auto pos-r\">\n";
	html+="<div class=\"fl logo\"><a href=\"/"+language+"/forward/index/cm.do\"><img src=\"/"+language+"/images/logo.png\" alt=\"翔云播\" /></a></div>\n";
	html+="<div class=\"fl pad-t40 pad-l20 font14 col-999\"><i class=\"fa fa-map-marker pad-r5\" aria-hidden=\"true\"></i><span class=\"currCity\">深圳</span></div>\n";
	html+="<div class=\"fr home-banner\">\n";
	html+="<input type=\"text\" class=\"fl wenb06 advertiseSearch\" id=\"inputSearch\" placeholder=\"请输入店铺名称或设备编号搜索\">\n";
    html+="<button type=\"button\" onclick=\"searchAdvertise()\" class=\"fl btn btn07 font12 col-999\"><i class=\"fa fa-2x fa-search\" aria-hidden=\"true\"></i></button>\n";
	html+="</div>\n";
	html+="</div></div>\n";
	html+="<script src=\"https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js\"></script>";
	html+="<script>";
	html+="    var city = remote_ip_info['city'];";
	html+="    $(\".currCity\").text(city);";
	html+="</script>";
document.writeln(html);
document.writeln("<script type=\"text/javascript\" src=\"/js/userCommon.js\"></script>");

$(function(){
	// 绑定搜索按钮
	$('#titleSearch').bind('click',function(){
		// 关键字
		var keyword = $('#titleKeyword').val().trim();
		window.location.href = '/'+language+'/forward/customerAdvertise.do?keyword='+encodeURIComponent(keyword);
	});
})