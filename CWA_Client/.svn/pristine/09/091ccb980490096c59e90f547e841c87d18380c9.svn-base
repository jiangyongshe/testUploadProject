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
<script src="/js/commonRel.js"></script>
<script src="/js/jquery.qrcode.min.js"></script><!--二维码-->
<script src="/js/banner.js"></script><!--焦点图-->
<script>

</script>
</head>

<body>
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script><!--公用头部JS-->

<div class="width clear">
  <div class="mar-auto">
     <!--图片轮播开始-->
     <div class="slide-main" id="touchMain">
      <a class="prev" href="javascript:;" stat="prev1001"><img src="/<spring:message code="url.language"/>/images/l-btn.png" /></a>
	  <div class="slide-box" id="slideContent">
		<div class="slide" id="bgstylea" style="background-image: url(/<spring:message code="url.language"/>/images/banner01.jpg);"></div>
		<div class="slide" id="bgstyleb" style="background-image: url(/<spring:message code="url.language"/>/images/banner01.jpg);"></div>
		<div class="slide" id="bgstylec" style="background-image: url(/<spring:message code="url.language"/>/images/banner01.jpg);"></div>
      </div>
	  <a class="next" href="javascript:;" stat="next1002"><img src="/<spring:message code="url.language"/>/images/r-btn.png" /></a>
	  <div class="item">
		<a class="cur" stat="item1001" href="javascript:;"></a><a href="javascript:;" stat="item1002"></a><a href="javascript:;" stat="item1003"></a>
	  </div>
    </div>
    <!--图片轮播结束-->
  </div>
</div>


<div class="width clear pad-t20 font14">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
   
   <div class="right">
      
	  <div class="data-list font12 width" style="margin-top:-15px;">
        <ul id="dataList">
           
		</ul>
      </div>
      
      <div id="payWay" class="hide">
	      <ul class="zf-xz pad-q10">
	      	<li class="active" data="0400" class="walletPay"><a href="#"><i class="fa fa-gg-circle blue" aria-hidden="true"></i> 翔云余额: <span class="amount">0</span> 元</a></li>
      		<li data="0101" class="wechatPay"><a href="#"><img src="/chinese/mobile/images/zf01.jpg" alt="微信" /></a></li>
      		<li data="0201" class="aliPay"><a href="#"><img src="/chinese/mobile/images/zf02.jpg" alt="支付宝" /></a></li>
	        <%-- <li data="0301"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" /></a></li> --%>
	      </ul>
       </div>
      <div class="width pad-t10 pad-b10 pad-r10 mar-t20 clear text-r bg-f3">
      		<span class="dis-in font14 pad-l10">
             	 共计：<span class="red font18 payCount">0条</span>
            </span>
            <span class="dis-in font14 pad-l10">
              	费用总计：<span class="red font18 totalBal">0元</span>
            </span>
        
            <input name="" id="payOrder" onclick="payOrder()" type="button" value="确定支付" class="btn btn01 bg-red font16 mar-l10 hide"  />
        	<input name="" id="commit" onclick="commit(this)" type="button" value="确定下单" class="btn btn01 bg-red font16 mar-l10 commit"  /><!-- onclick="elementDisplay('ewmdiv')" -->
      </div>
      
   </div>
 </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_buyConfirm.js"></script>
<script type="text/javascript" src="/js/core/orderCommon.js"></script>
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