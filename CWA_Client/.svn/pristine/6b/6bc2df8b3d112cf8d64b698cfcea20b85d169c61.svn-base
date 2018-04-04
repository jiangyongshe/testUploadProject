<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Cache-Control" content="no-Cache" />
	<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport"/>
	<meta name="format-detection" content="telephone=no" />
	<meta name="keywords">
	<meta name="description" />
	<title>翔云播</title>
	<script src="/js/commonRel.js"></script>
	<!--日期选择-->
	<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
	<script src="/js/mobiscroll-date.js"></script>
	<script src="/js/mobiscroll.js"></script>
	<!-- 逻辑处理 -->
	<script type="text/javascript" src="/js/core/customer_wallet.js"></script>
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
						<h2 class="fl font16 pad-t7 pad-b5">翔云余额</h2>
					</div>

					<div class="ggyj clear pad-t20 pad-b20 pad-l20 pad-r20">
						<div class="dis-in width50 bor-r">
							<p>账户余额</p>
							<p class="pad-t10">
								<span class="red font28 pad-r10 amount">0.00</span>元
							</p>
						</div>

						<span class="fr pad-t20"> 
							<a target="_blank" href="/<spring:message code="url.language"/>/forward/recharge.do" class="btn btn01 bg-red font14" />充值</a> 
						</span>
					</div>
					<span class="col-999 pad-t15 pad-r10">翔云余额明细</span>
					<div class="mar-t10 pad-t20 bor-t">
						<div class="pos-r font14 ggs-sea-list">
				          <span class="pos-a ggs-sea-bt">开始日期</span>
				          <input type="text" class="wenb07" id="startTime" readonly placeholder="请输入开始日期">
				        </div>
				        <div class="pos-r font14 ggs-sea-list">
				          <span class="pos-a ggs-sea-bt">结束日期</span>
				          <input type="text" class="wenb07" id="endTime" readonly placeholder="请输入结束日期">
				        </div>
						<div class="pos-r font14 ggs-sea-list">
	          				<span class="pos-a ggs-sea-bt">类型</span>
					        <select id="typeSelect" class="font14 xlb05">
					        		<option value="">全部</option>
									<option value="1">充值</option>
									<option value="2">提现</option>
									<option value="3">下单支付</option>
									<option value="4">退款</option>
									<option value="5">收益提现</option>
									<option value="6">补入</option>
									<option value="7">补出</option>
									<option value="8">提现驳回</option>
					         </select>
					    </div>
						<div class="fl width24 mar-l15">
			            	<input id="searchBtn" type="button" value="搜索" class="btn btn06 bg-blue font14 width33">
			            	<input id="clearSearchConditionBtn" type="button" value="清空" class="btn btn06 bg-999 font14 width33 mar-l5">
			        	</div>
						<div class="rmgg-table font13">
				        	<br/>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<thead>
									<tr>
										<th>序号</th>
										<th>时间</th>
										<th>类型</th>
										<th>金额（元）</th>
									</tr>
								</thead>
								<tbody id="flowData"></tbody>
							</table>
						</div>
						<div class="fenye font14 text-c" id="flowPageTurn"></div>
					</div>
					<div class="wxts pad-t30 pad-l10 pad-r10">
						<span class="red">温馨提示：</span>系统仅显示您两年之内的余额明细，更早的余额明细不显示。
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>