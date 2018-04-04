var html="<div class=\"ding\"><div class=\"mar-auto\">\n";
    html+="<div class=\"fl ding-l\">\n";
	html+="<p class=\"dis-in\">翔云播共享广告，人人广告，人人分享！</p>\n";
	html+="</div>\n";
	html+="<div class=\"fr ding-r\">\n";
	html+="<div class=\"glzx pos-r\">\n";
	html+="<span>13612345678</span><i class=\"fa fa-angle-down pad-l5\" aria-hidden=\"true\"></i>\n";
	html+="<div class=\"glzx-menu pos-a\">\n";
	html+="<a href=\"#\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> <span>退出</span></a>\n";
	html+="</div>\n";
	html+="</div>\n";
	html+="<div class=\"glzx glzx2 pos-r\">\n";
	html+="<i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i> <span>管理中心</span>\n";
	html+="<div class=\"glzx-menu pos-a\">\n";
	html+="<a href=\"javascript:;\" onclick=\"elementDisplay('wdzldiv')\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>我的资料</span></a>\n";
	html+="<a href=\"javascript:;\" onclick=\"elementDisplay('xgmmdiv')\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> <span>设置密码</span></a>\n";
	html+="</div>\n";
	html+="</div>\n";
	html+="<a href=\"qianbao.html\"><i class=\"fa fa-gg-circle\" aria-hidden=\"true\"></i> <span>翔云余额</span></a>\n";
	html+="<a href=\"khzx.html\"><i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i> <span>客服中心</span></a>\n";
	html+="<a href=\"gwc.html\" class=\"gwc\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i> <span>购物车</span> <b class=\"\">（2）</b></a>\n";
	html+="</div>\n";
	html+="</div></div>\n";
    html+="<div class=\"clear width heade\"><div class=\"mar-auto pos-r\">\n";
	html+="<div class=\"fl logo\"><a href=\"index.html\"><img src=\"images/logo.png\" alt=\"翔云播\" /></a></div>\n";
	html+="<div class=\"fl pad-t40 pad-l20 font14 col-999\"><i class=\"fa fa-map-marker pad-r5\" aria-hidden=\"true\"></i><span>深圳</span></div>\n";
	html+="<div class=\"fr home-banner\">\n";
	html+="<input type=\"text\" class=\"fl wenb06\" placeholder=\"请输入关键词\">\n";
    html+="<button type=\"button\" class=\"fl btn btn07 font12 col-999\"><i class=\"fa fa-2x fa-search\" aria-hidden=\"true\"></i></button>\n";
	html+="</div>\n";
	html+="</div></div>\n";
	
	html+="<div class=\"shade\" id=\"wdzldiv\" style=\"display: ;\">\n";   // 弹出我的资料开始
	html+="<div class=\"tanchu\" style=\"margin-top: -160px;\">\n";
	html+="<a href=\"javascript:;\" class=\"tanchu-close text-c\" title=\"关闭\" onclick=\"javascript:turnoff('wdzldiv')\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></a>\n";
	html+="<div class=\"tanchu-bt font15\">我的资料<a href=\"javascript:;\" class=\"fr font14\"><i class=\"fa fa-pencil-square-o pad-r5\" aria-hidden=\"true\"></i>修改</a></div>\n";
	html+="<ul class=\"ggtf-sc2 pad-t10 pad-b15 font14\">\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">用户名</span>\n";
	html+="<input type=\"text\" class=\"wenb03 disabled\" placeholder=\"XXXXXXXX\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">真实姓名</span>\n";
	html+="<input type=\"text\" class=\"wenb03\" placeholder=\"张三\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">邮箱</span>\n";
	html+="<input type=\"text\" class=\"wenb03\" placeholder=\"123456@163.com\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<input name=\"\" type=\"button\" value=\"提交\" class=\"btn btn05 bg-red font16\" />\n";
	html+="</li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="</div>\n";    // 弹出我的资料结束
	
	html+="<div class=\"shade\" id=\"xgmmdiv\" style=\"display: ;\">\n";     // 弹出修改登录密码开始
	html+="<div class=\"tanchu\" style=\"margin-top: -190px;\">\n";
	html+="<a href=\"javascript:;\" class=\"tanchu-close text-c\" title=\"关闭\" onclick=\"javascript:turnoff('xgmmdiv')\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></a>\n";
	html+="<div class=\"tanchu-bt font15\">设置密码</div>\n";
	html+="<div class=\"text-c pad-t20 pad-b20 bor-b\">\n";
	html+="<label class=\"radio\"><input type=\"radio\" name=\"radio\" id=\"\" checked=\"\"><i>✓</i> 修改登录密码</label>\n";
	html+="<label class=\"radio pad-l20\"><input type=\"radio\" name=\"radio\" id=\"\"><i>✓</i> 设置提现密码</label>\n";
	html+="</div>\n";
	html+="<ul class=\"ggtf-sc2 pad-t10 pad-b15 font14\">\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">原密码</span>\n";
	html+="<input type=\"password\" class=\"wenb03\" placeholder=\"请输入原密码\" />\n";
	html+="<a href=\"#\" class=\"pos-a czmm blue\">重置资金密码</a>\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">新密码</span>\n";
	html+="<input type=\"password\" class=\"wenb03\" placeholder=\"请输入新密码\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">确认密码</span>\n";
	html+="<input type=\"password\" class=\"wenb03\" placeholder=\"请确认新密码\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<input name=\"\" type=\"button\" value=\"提交\" class=\"btn btn05 bg-red font16\" />\n";
	html+="</li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="</div>\n";     // 弹出修改登录密码结束
	
	html+="<div class=\"shade\" id=\"\" style=\"display: ;\">\n";     // 弹出重置资金密码开始
	html+="<div class=\"tanchu\" style=\"margin-top: -160px;\">\n";
	html+="<a href=\"javascript:;\" class=\"tanchu-close text-c\" title=\"关闭\" onclick=\"javascript:turnoff('xgmmdiv')\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></a>\n";
	html+="<div class=\"tanchu-bt font15\">重置资金密码</div>\n";
	html+="<ul class=\"ggtf-sc2 pad-t10 pad-b15 font14\">\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">手机号码</span>\n";
	html+="<input type=\"text\" class=\"wenb03\" placeholder=\"请输入手机号\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">验证码</span>\n";
	html+="<input type=\"text\" class=\"wenb03\" placeholder=\"请输入手机验证码\" />\n";
	html+="<a href=\"#\" class=\"pos-a czmm blue\">获取验证码</a>\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<span class=\"pos-a ggtf-sc-bt\">重置密码</span>\n";
	html+="<input type=\"password\" class=\"wenb03\" placeholder=\"请输入密码\" />\n";
	html+="</li>\n";
	html+="<li>\n";
	html+="<input name=\"\" type=\"button\" value=\"提交\" class=\"btn btn05 bg-red font16\" />\n";
	html+="</li>\n";
	html+="</ul>\n";
	html+="</div>\n";
	html+="</div>\n";     // 弹出重置资金密码开始结束
document.writeln(html);


//点击关闭层
  function turnoff(obj){
   document.getElementById(obj).style.display="none";
    }
//点击显示层
  function elementDisplay(objid){
   var obj=document.getElementById(objid);{
    obj.style.display='block';
    }
   }