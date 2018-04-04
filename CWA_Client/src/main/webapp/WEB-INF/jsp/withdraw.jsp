<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- 引入spring标签  --%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords">
<meta name="description" />
<title>翔云播</title>
<script src="/js/commonRel.js"></script>
<!--日期选择-->
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/mobiscroll-date.js"></script>
<script src="/js/mobiscroll.js"></script>
<!-- 出金逻辑 -->
<script src="/js/core/withdraw.js"></script>
</head>
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
						<h2 class="fl font16 pad-t7 pad-b5">提现</h2>
					</div>
					<div class="clear pad-t20">
						<p>选择提现方式</p>
						<ul class="zf-xz2">
							<li id="payType0101"><img src="/<spring:message code="url.language"/>/images/zf01.jpg" alt="微信" /></li>
							<li id="payType0401"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" alt="银联" /></li>
						</ul>
					</div>
					<div class="ggtf-sc pad-t20 font14 clear">
						<ul>
							<li>
								<span class="pos-a ggtf-sc-bt">可提现金额</span> 
								<input id="allowWithdrawMoney" type="text" class="wenb03 disabled"/>
							</li>
							<li>
								<span class="pos-a ggtf-sc-bt">提现金额</span> 
								<input id="withdrawalAmount" type="text" class="wenb03" placeholder="请输入提现金额" />
							</li>
							<li>
								<span class="pos-a ggtf-sc-bt">提现密码</span> 
								<input id="withdrawPassword" type="text" class="wenb03" placeholder="请输入提现密码" />
							</li>
						</ul>
					</div>
					<div id="warmPrompt" class="hide red" style="padding-left:10%;">温馨提示：每提现一次收取手续费1.5元</div> 
					<ul class="ggtf-sc font14">
						<li>
							<input id="submit" type="button" value="提交" class="btn btn05 bg-red font16" />
						</li>
					</ul>
					<div class="ggtf-city width bg-f9 mar-t20">
						<div class="pos-r font14 ggs-sea-list">
							<span class="pos-a ggs-sea-bt">开始日期</span> 
							<input id="startTime" type="text" class="wenb07" placeholder="请输入开始日期"> 
							<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>
						</div>
						<div class="pos-r font14 ggs-sea-list">
							<span class="pos-a ggs-sea-bt">结束日期</span> 
							<input id="endTime" type="text" class="wenb07" placeholder="请输入结束日期"> 
							<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>
						</div>
						<div class="pos-r font14 ggs-sea-list">
							<span class="pos-a ggs-sea-bt">用户类型</span> 
							<select id="withdrawType" class="font14 xlb05">
								<option value="5">店主</option>
							</select>
						</div>
						<div class="fl width24 mar-l15">
							<input id="search" type="button" value="搜索" class="btn btn06 bg-blue font14 width33"> 
							<input id="clear" type="button" value="清空" class="btn btn06 bg-999 font14 width33 mar-l5">
						</div>
					</div>
					<div class="rmgg-table font13">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>序号</th>
									<th>日期</th>
									<th>提现金额（元）</th>
									<th>状态</th>
								</tr>
							</thead>
							<tbody id="withdrawData"></tbody>
						</table>
					</div>
					<div class="fenye font14 text-c" id="withdrawPageTurn"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>