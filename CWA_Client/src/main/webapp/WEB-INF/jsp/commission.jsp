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
<!--日期选择-->
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/mobiscroll-date.js"></script>
<script src="/js/mobiscroll.js"></script>
<!-- 佣金逻辑 -->
<script src="/js/core/commission.js"></script>
</head>

<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="width clear font14">
		<div class="mar-auto">
			<div class="width clear quan pos-r">
				<!-- 左侧菜单-->
				<script src="/<spring:message code="url.language"/>/js/left.js"></script>

				<!-- 右侧内容 -->
				<div class="right bg-ff">
			      <div class="clear width bg-f3 wddd">
			        <h2 class="fl font16 pad-t7 pad-b5">广告收益</h2>
			      </div>
			      
			      <div class="ggyj clear pad-t20 pad-b20 pad-l20 pad-r20">
			        <div class="dis-in width24">
			          <p>余额</p>
			          <p class="pad-t10"><span class="red font28 pad-r10" id="commissionTotal">0.00</span>元</p>
			        </div>
			        
			        <div class="dis-in width33 bor-r">
			          	<p><span class="col-999"></span><span id="m_comm">0.00</span>元</p>
			          	<p class="pad-t5"><span class="col-999">广告收益：</span><span id="ad_comm">0.00</span>元</p>
			        	<p class="pad-t5"><span class="col-999">可提现金额：</span><span id="available_comm">0.00</span>元</p>
			        </div>
			        
			        <a id="bindCard" style="display:none;" href="/<spring:message code="url.language"/>/forward/bindCard.do" class="fr btn btn01 bg-yellow font15 mar-t15 mar-l15 text-c">绑卡</a>
			        <a id="withdraw" style="display:none;" href="/<spring:message code="url.language"/>/forward/withdraw.do" class="fr btn btn01 bg-red font15 mar-t15 text-c">提现</a>
			      </div>
			      
				<div class="ggtf-city width bg-f9">
			        <div class="pos-r font14 ggs-sea-list">
			          <span class="pos-a ggs-sea-bt">开始日期</span>
			          <input type="text" class="wenb07" id="commissionStartTime" readonly placeholder="请输入开始日期">
			        </div>
			        
			        <div class="pos-r font14 ggs-sea-list">
			          <span class="pos-a ggs-sea-bt">结束日期</span>
			          <input type="text" class="wenb07" id="commissionEndTime" readonly placeholder="请输入结束日期">
			        </div>
			        
			        <div class="pos-r font14 ggs-sea-list">
          				<span class="pos-a ggs-sea-bt">收益类型</span>
				        <select id="revenueType" class="font14 xlb05">
				        	<option value="all">全部</option>
				            <option value="5"></option>
				            <option value="6">广告收益</option>
				         </select>
				    </div>
			        
			        <div class="fl width24 mar-l15">
			          <input id="commissionSearchBtn" type="button" value="搜索" class="btn btn06 bg-blue font14 width33">
			          <input id="clearSearchConditionBtn" type="button" value="清空" class="btn btn06 bg-999 font14 width33 mar-l5">
			        </div>
			      </div>
			      
			       <div class="rmgg-table font13">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<thead>
					  <tr>
					    <th>序号</th>
					    <th>日期</th>
					    <th>资金变动（元）</th>
					    <th>类型</th>
					  </tr>
					  </thead>
					  <tbody id="commissionDetailData"></tbody>
					</table>
	          	   </div>
				   <div class="fenye font14 text-c" id="commissionDetailPageTurn">
				   </div>
				</div>
			</div>
		</div>
	</div>
	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>