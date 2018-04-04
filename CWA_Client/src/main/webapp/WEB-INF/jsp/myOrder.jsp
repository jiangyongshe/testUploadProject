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
		<!--返回顶部-->
		<script src="/js/top.js"></script>
		<!-- 逻辑处理 -->
		<script type="text/javascript" src="/js/core/myOrder.js"></script>
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
			        		<h2 class="fl font16 pad-t7">我的订单</h2>
			        		<ul class="fr wddd-tab">
			         			 <li class="active" id="orderStatus">全部</li>
							     <li id="orderStatus1" value="1">待付款</li>
							     <li id="orderStatus2-3" value="2-3">处理中</li>
							     <li id="orderStatus4-1" value="4-1">待发布</li>
							     <li id="orderStatus4-2" value="4-2">播放中</li>
 								 <li id="orderStatus6" value="6">已取消</li>
 								 <li id="orderStatus9" value="9">已完成</li>
								 <!--
								 	<li id="played" onclick="changeStatus('played',this)" value="4-3">已停播</li>
							     	<li id="auditNotPass" onclick="changeStatus('auditNotPass',this)" value="5">审核不通过</li>
							     	<li id="closed" onclick="changeStatus('closed',this)" value="7">已关闭</li>
							     -->							     
							</ul>
			      		</div>
			      		<!-- 没有数据的提示 -->
						<div id="noData" class="clear col-ccc text-c pad-t20 pad-b20 sea-fruit" style="display:none; ">
				        	<p class="pad-t10"><i class="fa fa-5x fa-frown-o" aria-hidden="true"></i></p>
				        	<p class="font16 pad-t10">抱歉，我的订单为空，请到 <a href="customerAdvertise.do" class="red">投放广告</a> 去下单</p>
				      	</div>
				      	<!-- 播放时段 -->
			      		<div class="ggtf-city width searchWhere hide">
			        		<div class="pos-r font14 ggs-sea-list">
				          		<span class="pos-a ggs-sea-bt">播放时段</span>
				          		<select class="font14 xlb05 playIdle">
						            <option>全部</option>
						            <option>07:00:00-08:00:00</option>
						            <option>08:00:00-09:00:00</option>
						            <option>09:00:00-10:00:00</option>
						            <option>10:00:00-11:00:00</option>
						            <option>11:00:00-12:00:00</option>
						            <option>12:00:00-13:00:00</option>
						            <option>13:00:00-14:00:00</option>
						            <option>14:00:00-15:00:00</option>
						            <option>15:00:00-16:00:00</option>
						            <option>16:00:00-17:00:00</option>
						            <option>17:00:00-18:00:00</option>
						            <option>18:00:00-19:00:00</option>
						            <option>19:00:00-20:00:00</option>
						            <option>20:00:00-21:00:00</option>
						            <option>21:00:00-22:00:00</option>
				          		</select>
				        	</div>
			        		<!-- 订单状态 -->
				        	<div class="pos-r font14 ggs-sea-list">
				          		<span class="pos-a ggs-sea-bt">订单状态</span>
				          		<select class="font14 xlb05 orderStatus">
				            		<option value="">全部</option>
						            <option value="1">未支付</option>
						            <option value="2-3">申请中</option>
						            <option value="4-1">等待播放</option>
						            <option value="4-2">播放中</option>
						            <option value="4-3">已停播</option>
						            <option value="5">审核不通过</option>
						            <option value="6">已取消</option>
						            <option value="7">已关闭</option>
				          		</select>
				        	</div>
			        		<!-- 搜索按钮 -->
				        	<div class="pos-r font14 ggs-sea-list">
				          		<input onclick="search()" type="button" value="搜索" class="btn btn06 bg-blue font14">
				        	</div>
				        </div>
			   		    <!-- 订单内容 -->
			      	    <div class="font13 clear">
			          		<ul class="wddd-list" id="dataList"></ul>
			          	</div>
			      	  	<!-- 分页内容 -->
			      	  	<div class="fenye font14 text-c" id="oPageTurn"></div>
				    </div>
				</div>
			</div>
		</div>
		<!--公用底部JS-->
		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
	</body>
</html>