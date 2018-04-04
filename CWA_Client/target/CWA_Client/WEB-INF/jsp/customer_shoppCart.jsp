<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mescroll.css">
<script src="/js/commonRel.js"></script>
<script src="/js/mescroll.js"></script><!--加载更多-->
<script src="/js/mescroll-option.js"></script><!--加载更多-->
<script src="/js/top.js"></script><!--返回顶部-->
<script src="/js/jquery.qrcode.min.js"></script><!--二维码-->
<script>


</script>
</head>

<body>
<div id="mescroll" class="mescroll">
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script><!--公用头部JS-->

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b ">我的购物车</h2>
      
      <div class="rmgg-table font13" id="dataList">
        <div class="pad-t40 pad-b10 pad-l10 pos-r hide hideDiv"><!-- <label class="checkbox"><input type="checkbox" name="checkbox" id="ckAll" ><i>✓</i> 全选</label> <a href="#" class="pad-l20 delete" onclick="reject()"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</a> -->
        
        <div class="pos-a fytj-gm ggtf-gm commit">
            <span class="dis-in font14 totalBalDiv"> 费用总计：<span class="red font18 totalBal">0元</span></span>
        
            <input name="" id="commit1" onclick="commit(this)" type="button" value="结算下单" class="btn btn01 bg-red font16 mar-l15"  /><!-- onclick="elementDisplay('ewmdiv')" -->
        </div>
        
        </div>
        
        <ul class="data-list mar-t10">
            
        </ul>
      </div>
      
      <div id="payWay" class="hide">
      <h2 class="clear font18 pad-t40 pad-b10 bor-b">选择支付方式</h2>
      
      <ul class="zf-xz clear">
      	<li class="active" data="0400"><a href="#"><i class="fa fa-gg-circle red" aria-hidden="true"></i> 翔云宝: <span class="amount">0</span> 元</a></li>
        <li data="0101"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf01.jpg" /></a></li>
        <li data="0201"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf02.jpg" /></a></li>
       <%--  <li data="0301"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" /></a></li> --%>
      </ul>
      </div>
      <div class="text-r pad-t30 clear ggtf-gm">
        <span class="dis-in font14">
        	<span class="payTypeText hide">支付方式：翔云宝支付 |</span> 
        	<span class="dis-in font14 totalBalDiv"> 费用总计：<span class="red font18 totalBal">0元</span></span>
        </span>
        <input name="" id="payOrder" onclick="payOrder()" type="button" value="确定支付" class="btn btn01 bg-red font16 mar-l15 hide"  />
        <input name="" id="commit" onclick="commit(this)" type="button" value="结算下单" class="btn btn01 bg-red font16 mar-l15 commit"  /><!-- onclick="elementDisplay('ewmdiv')" -->
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_shoppCart.js"></script>
<script type="text/javascript" src="/js/core/orderCommon.js"></script>
</div>
<!--店铺详情提示宽   onmouseout="javascript:turnoff('diandiv')"-->
<div class="shade" id="diandiv" style="display: ;">
  <div class="dian-xq">
    <p class="pos-a dian-close text-c" onclick="javascript:turnoff('diandiv')"><i class="fa fa-close" aria-hidden="true"></i></p>
    <p><b>店铺名称：</b><span class="shopName"></span></p>
    <p><b>详细地址：</b><span class="addrDetail"></span></p>
    <p class="dian-xq-img imgs">
      
    </p>
  </div>
</div>
<!--弹出微信支付提示宽-->
<div class="shade" id="ewmdiv" style="display: ;">
  <div class="tanchu" style="height:auto">
    <div class="tanchu-bt"><span>微信支付</span><a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff('ewmdiv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <div class="tanchu-nr text-c">
      <p class="tanchu-tspc">请用微信扫一下二维码，完成支付。</p>
      <!-- <p class="tanchu-tssj">长按二维码，自动识别。</p> -->
      <p class="pad-t20" id="qrcodeId"></p>
    </div>
    <div class="text-c pad-b10">
      <input name="" type="button" value="取消" class="btn btn04 font14" onclick="javascript:turnoff('ewmdiv')"/>
      <input name="" type="button" value="支付完成" class="btn btn04 font14 mar-l10 bg-red" onclick="checkOrderStatus()"/>
    </div>
  </div>
</div>
</body>
</html>