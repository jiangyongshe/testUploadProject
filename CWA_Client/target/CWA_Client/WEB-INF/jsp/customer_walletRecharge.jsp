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
<script src="/js/commonRel.js"></script>
<script src="/js/top.js"></script><!--返回顶部-->
<script src="/js/jquery.qrcode.min.js"></script><!--二维码-->

<script>

</script>
</head>

<body>
<div id="mescroll" class="mescroll">
<!-- 公用头部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">充值</h2>
      
      <ul class="ggtf-sc pad-t20 font14"> 
        <li>
          <span class="pos-a ggtf-sc-bt">充值金额</span>
          <input type="number" class="wenb03 amount" placeholder="请输入充值金额" />
        </li>
      </ul>
      
      <p class="clear font16 pad-t40">选择充值方式</p>
      
      <ul class="zf-xz clear">
      	<li class="active" data="0101"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf01.jpg" /></a></li>
        <li data="0201"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf02.jpg" /></a></li>
        <%-- <li data="0301"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" /></a></li> --%>
      </ul>
      
      
      <div class="pad-t30 text-c clear ggtf-gm">
        <input name="" type="button" value="取消" onclick="javascript:history.back();" class="btn btn01 bg-999 font16" />
        <input name="" type="button" value="提交" class="btn btn01 bg-red font16 mar-l10" id="commit" />
      </div>
    </div>
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
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_walletRecharge.js"></script>
</div>
</body>
</html>