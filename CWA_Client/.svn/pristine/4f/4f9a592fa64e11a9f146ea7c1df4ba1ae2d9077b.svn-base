<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="Cache-Control" content="no-Cache" />
		<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport"/>
		<meta name="format-detection" content="telephone=no" />
		<meta name="keywords">
		<meta name="description"/>
		<title>翔云播</title>
		<script src="/js/commonRel.js"></script>
		<!--日期选择-->
		<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
		<script src="/js/mobiscroll-date.js"></script>
		<script src="/js/mobiscroll.js"></script>
		<!-- 逻辑处理 -->
		<script type="text/javascript" src="/js/core/shoppCart.js"></script>
		<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI"></script>
	</head>
	<body>
		<!--公用头部JS-->
		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>
		<div class="width clear font14">
	 		<div class="mar-auto">
	  			<div class="width clear quan pos-r">
				    <!--左侧菜单-->
				    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>
				    <!--右侧内容-->
				    <div class="right bg-ff">
				   		<div class="clear width bg-f3 wddd">
				        	<h2 class="fl font16 pad-t7 pad-b5">购物车</h2>
				      	</div>
						<!-- 没有数据的提示 -->
			       		<div id="noData" class="clear col-ccc text-c pad-t20 sea-fruit" style="display:none; ">
		        			<p class="pad-t10">
		        				<i class="fa fa-5x fa-frown-o" aria-hidden="true"></i>
		        			</p>
		        			<p class="font16 pad-t10">抱歉，购物车为空，请到 
		        				<a href="customerAdvertise.do" class="red">投放广告</a> 去下单
		        			</p>
		     			</div>
		      			<div class="font13 clear">
		        			<ul class="wddd-list wddd-list2" id="shopCartData"></ul>
		      			</div>
		      			<div class="fenye font14 text-c" id="shopCartPageTurn"></div>
				        <div class="width pad-t10 pad-b10 pad-r10 mar-t20 clear text-r bg-f3 pos-r" style="display:none;">
				            <span class="dis-in font14 pad-l10">
				             	 共计：<span class="red font18" id="checkedBuyCartCount">0条</span>
				            </span>
				            <input id="settle" type="button" value="结算下单" class="btn btn01 bg-red font16 mar-l10" />
				        </div>
	    			</div>
	  			</div>
			</div>
		</div>
		<!--公用底部JS-->
		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
	</body>
</html>