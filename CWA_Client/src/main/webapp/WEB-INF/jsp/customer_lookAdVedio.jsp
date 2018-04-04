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
		<meta name="keywords">
		<meta name="description"/>
		<title>翔云播</title>
		<script src="/js/commonRel.js"></script>
		<!-- 省市区街道 -->
		<script src="/js/jquery.citys.js"></script>
		<!--返回顶部-->
		<script src="/js/top.js"></script>
		<!-- 逻辑处理 -->
		<script type="text/javascript" src="/js/core/lookVideoOrPic.js"></script>
	</head>
	<body>
		<!-- 公用头部JS-->
		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>
		<div class="width clear font14">
			<div class="mar-auto">
		  		<div class="width clear quan pos-r">
	    			<!--左侧菜单-->
	    			<script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>
	    			<!--右侧内容-->
		    		<div class="right bg-ff">
		      			<div class="clear width bg-f3 wddd">
		        			<h2 class="fl font16 pad-t7 pad-b5">查看广告<span name="fileType"></span></h2>
		      			</div>
		      			<ul class="ggtf-sc pad-t20 font14">
		        			<li>
					        	<span class="pos-a ggtf-sc-bt">广告编号</span>
					        	<p class="ggtf-sc-sj" id="serialNumber"></p>
		        			</li>
		        			<li>
		         				<span class="pos-a ggtf-sc-bt">广告类型</span>
		          				<p class="ggtf-sc-sj" id="adType"></p>
		        			</li>
					        <li>
					        	<span class="pos-a ggtf-sc-bt hide">广告名称</span>
					          	<p class="ggtf-sc-sj" id="name"></p>
					        </li>
		        			<li>
		          				<span class="pos-a ggtf-sc-bt hide">广告简介</span>
		          				<p class="ggtf-sc-sj" id="introduction"></p>
		        			</li>
		        			<li>
          						<span class="pos-a ggtf-sc-bt"><span name="fileType"></span>查看</span>
					            <div id="content" class="uploader-sp" style="display: block;"></div>
					        </li>
		        			<li class="pad-t20">
		           				<a href="/<spring:message code="url.language"/>/forward/customerOrder.do" class="btn btn04 bg-red font16">返 回</a>
		        			</li>
		      			</ul>
		    		</div>
	  			</div>
			</div>
		</div>
		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
	</body>
</html>