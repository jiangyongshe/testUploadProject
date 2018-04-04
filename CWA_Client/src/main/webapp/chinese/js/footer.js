var html="<footer>\n";
	html+="<p><a href=\"/"+language+"/forward/aboutUs/cm.do\">关于我们</a>|<a href=\"/"+language+"/forward/connection/cm.do\">联系我们</a></p>\n";
	html+="<p>Copyright © 2017 深圳市翔云媒体科技有限公司<a target=\"_blank\" href=\"http://www.miibeian.gov.cn\" class=\"pad-l20 col-999\">粤ICP备17136469号-1</a><a target=\"_blank\" href=\"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030302000441\" class=\"pad-l20 col-999\"><img src=\"/"+language+"/images/beia.png\" class=\"dis-in\" /><span class=\"dis-in pad-l8\">粤公网安备 44030302000441号</span></a></p>\n";
	html+="</footer>\n";
	html+="<script src=\"/js/top.js\"></script>\n";
	html+="<div id=\"top\"></div>\n";
document.writeln(html);

if(typeof userType != 'undefined' && userType != '1' && userType != '0'){
	// 只要是1都不显示收益管理
	$('.commission').show();
}