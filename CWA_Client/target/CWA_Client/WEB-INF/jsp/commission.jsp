<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- 引入spring标签  --%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no"
	name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon"
	href="/<spring:message code="url.language"/>/images/logo.ico"
	type="image/x-icon">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/neiye.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!--日期选择-->
<script src="/js/mobiscroll-date.js"></script>
<!--日期选择-->
<script src="/js/mobiscroll.js"></script>
<!-- 佣金逻辑 -->
<script src="/js/core/commission.js"></script>
<script>
	$(function() {
		$(".tab01-t > li")
				.click(
						function() {
							$(this).addClass("active").siblings().removeClass(
									"active");
							var index = $(this).index();
							$(".tab01-b > li").eq(index)
									.css("display", "block").siblings().css(
											"display", "none");
						});
	})
</script>
</head>

<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="neiye bg-f9 bor-t">
		<div class="mar-auto pos-r">
			<!-- 左侧菜单-->
			<script src="/<spring:message code="url.language"/>/js/left.js"></script>

			<!-- 右侧内容 -->
			<div class="right bg-ff">
				<div class="clear font16 pad-b10 bor-b">
					<ul class="tab01-t dis-in">
						<li class="active">广告佣金</li>
						<li>佣金明细</li>
						<li>出金明细</li>
					</ul>
					<a
						href="/<spring:message code="url.language"/>/forward/user/withdraw.do"
						class="fr btn btn01 bg-yellow font15">出金</a>
				</div>

				<ul class="tab01-b">
					<li class="active">
						<ul class="ggtf-sc pad-t20 font14">

							<li class=""><span class="pos-a ggtf-sc-bt">佣金类型</span> <select
								id="oneCommissionType" class="font14 xlb04">
							</select></li>

							<li><span class="pos-a ggtf-sc-bt">佣金账户</span>
								<p class="ggtf-sc-sj" id="accountId"></p></li>

							<li><span class="pos-a ggtf-sc-bt">佣金总额</span>
								<p class="ggtf-sc-sj">
									<span class="red font16" id="commissionTotal">0.00</span> 元
								</p></li>

							<li><span class="pos-a ggtf-sc-bt">可出佣金</span>
								<p class="ggtf-sc-sj">
									<span class="red font16" id="allowCommission">0.00</span> 元
								</p></li>
						</ul>
					</li>

					<li>
						<div class="pad-t20 rmgg-ss">
						
							<p class="dis-in ">
								<b class="dis-in pad-r10 font14">佣金类型</b> 
								<select id="twoCommissionType" class="dis-in font14 xlb04 width110"></select>
							</p>
							<p class="dis-in pad-l20">
								<b class="dis-in pad-r10 font14">日期选择</b> <input type="text"
									name="user_age" id="commissionStartTime" readonly
									class="dis-in wenb05" placeholder="请输入开始日期" /> <span
									class="dis-in">至</span> <input type="text" name="user_age"
									id="commissionEndTime" readonly class="dis-in wenb05"
									placeholder="请输入结束日期" /> <input id="commissionSearchBtn"
									type="button" value="搜 索"
									class="dis-in btn btn03 bg-orange font16 mar-l10" />
									<input id=""
									type="button" value="清空" onclick="clearCommissionDate()"
									class="dis-in btn btn03 bg-orange font16 mar-l10" />
							</p>
						</div>

						<div class="rmgg-table rmgg-table2 font13">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<thead>
									<tr>
										<th>序号</th>
										<th>日期</th>
										<th>资金变动（元）</th>
										<th>类型</th>
									</tr>
								</thead>
								<tbody id="commissionDetailData">

								</tbody>
							</table>
						</div>

						<div class="fenye font14 text-c" id="commissionDetailPageTurn">
						</div>
					</li>

					<li>
						<div class="pad-t20 rmgg-ss">
							<p class="dis-in">
								<b class="dis-in pad-r10 font14">出金类型</b> 
								<select id="threeCommissionType" class="dis-in font14 xlb04 width110"></select>
							</p>
							<p class="dis-in pad-l20">
								<b class="dis-in pad-r10 font14">日期选择</b> <input type="text"
									name="user_age" id="inOutMoneyStartTime" readonly
									class="dis-in wenb05" placeholder="请输入开始日期" /> <span
									class="dis-in">至</span> <input type="text" name="user_age"
									id="inOutMoneyEndTime" readonly class="dis-in wenb05"
									placeholder="请输入结束日期" /> <input id="inOutMoneySearchBtn"
									type="button" value="搜 索"
									class="dis-in btn btn03 bg-orange font16 mar-l10" />
									<input id=""
									type="button" value="清空" onclick="clearInOutMoneyDate()"
									class="dis-in btn btn03 bg-orange font16 mar-l10" />
							</p>
						</div>

						<div class="rmgg-table rmgg-table2 font13">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<thead>
									<tr>
										<th>序号</th>
										<th>日期</th>
										<th>资金变动（元）</th>
										<th>状态</th>
									</tr>
								</thead>
								<tbody id="withdrawDetailData">
								</tbody>
							</table>
						</div>

						<div class="fenye font14 text-c" id="withdrawDetailPageTurn">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript"
		src="/<spring:message code="url.language"/>/js/footer.js"></script>
	<script type="text/javascript">
		$(function() {
			var currYear = (new Date()).getFullYear();
			var opt = {};
			opt.date = {
				preset : 'date'
			};
			opt.datetime = {
				preset : 'datetime'
			};
			opt.time = {
				preset : 'time'
			};
			opt.def = {
				theme : 'android-ics light', //皮肤样式
				display : 'modal', //显示方式 
				mode : 'scroller', //日期选择模式
				dateFormat : 'yyyy-mm-dd',
				lang : 'zh',
				showNow : true,
				nowText : "今天",
				startYear : currYear - 50, //开始年份
				endYear : currYear + 10
			//结束年份
			};

			$("#commissionStartTime").mobiscroll(
					$.extend(opt['date'], opt['def']));
			$("#commissionEndTime").mobiscroll(
					$.extend(opt['date'], opt['def']));
			$("#inOutMoneyStartTime").mobiscroll(
					$.extend(opt['date'], opt['def']));
			$("#inOutMoneyEndTime").mobiscroll(
					$.extend(opt['date'], opt['def']));
		});
	</script>
</body>
</html>