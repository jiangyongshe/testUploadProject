<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords">
<meta name="description"/>
<title>翔云播</title>
<script src="/js/commonRel.js"></script>
<!-- 银行卡操作相关 -->
<script src="/js/bankCardCommon.js"></script>
<!-- 逻辑处理 -->
<script src="/js/core/recharge.js"></script>
</head>
<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>
	<div class="width clear font14">
 		<div class="mar-auto">
  			<div class="width clear quan pos-r">
    			<!--左侧菜单-->
    			<script src="/<spring:message code="url.language"/>/js/left.js"></script>
   				<!--右侧内容-->
    			<div class="right bg-ff">
      				<div class="clear width bg-f3 wddd">
        				<h2 class="fl font16 pad-t7 pad-b5">翔云余额充值</h2>
      				</div>
			        <div class="clear pad-t20">
			        	<p>选择充值方式</p>
			        	<ul class="zf-xz2">
			          		<li id="payType0101"><img src="/<spring:message code="url.language"/>/images/zf01.jpg" alt="微信" /></li>
			          		<li id="payType0201"><img src="/<spring:message code="url.language"/>/images/zf02.jpg" alt="支付宝" /></li>
			          		<li id="payType0301"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" alt="银联" /></li>
			        	</ul>
			      	</div>
      				<ul class="ggtf-sc pad-t20 font14"> 
			        	<li>
			          		<span class="pos-a ggtf-sc-bt">充值金额</span>
			          		<input id="money" type="text" class="wenb03" placeholder="请输入充值金额" />
			        	</li>
			        	<li style="display:none;">
				            <span class="pos-a ggtf-sc-bt">银行卡号</span>
				            <input id="cardNo" type="text" class="wenb03" placeholder="请输入银行卡号"/>
				            <div class="danjia pos-a" id="cardInfo">
				               <ul></ul>
				            </div>
			       	    </li>
				        <li style="display:none;">
				          <span class="pos-a ggtf-sc-bt">手机号码</span>
				          <input id="mobile" type="text" class="wenb03" placeholder="请输入银行预留手机号" />
				        </li>
				        <li style="display:none;">
				          <span class="pos-a ggtf-sc-bt">手机验证码</span>
				          <input id="verificationCode" type="text" class="wenb03" placeholder="请输入手机验证码" />
				          <input id="getVerificationCode" class="btn btn04 bg-blue pos-a yzm" type="button" value="获取验证码" />
				        </li>
				        <li>
				          <input id="submit" type="button" value="提交" class="btn btn01 bg-red font16 mar-t10" />
				        </li>
			    	</ul>
    			</div>
  			</div>
		</div>
	</div>
	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>