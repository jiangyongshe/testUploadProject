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
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/index.css">
<script src="/js/commonRel.js"></script>
<!--焦点图-->
<script src="/js/banner.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!-- 其它逻辑 -->
<script src="/js/core/index.js"></script>
</head>

<body>
	<!-- 公用头部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="width clear pad-t10">
		<div class="mar-auto">
			<!--图片轮播开始-->
			<div class="slide-main" id="touchMain">
				<a class="prev" stat="prev1001"><img
					src="/<spring:message code="url.language"/>/images/l-btn.png" /></a>
				<div class="slide-box" id="slideContent">
					<div class="slide" id="bgstylec">
						<a stat="sslink-3" target="_blank">
							<div class="obj-e">一站式户外全媒体覆盖</div>
							<div class="obj-f">资源覆盖全国近300个城市</div>
						</a>
					</div>
					<div class="slide" id="bgstylea">
						<a stat="sslink-1" target="_blank">
							<div class="obj-a">高品质 创新 节能 安全 美观</div>
							<div class="obj-b">通过专业化、标准化、规模化的市场运作，改善了店招现场制作的落后模式</div>
						</a>
					</div>
					<div class="slide" id="bgstyleb">
						<a stat="sslink-2" target="_blank">
							<div class="obj-c">集研发 设计 制作 安装于一体</div>
							<div class="obj-d">具有先进的生产设备、精湛的制作工艺和完善的施工管理体制和售后服务体系</div>
						</a>
					</div>
				</div>
				<a class="next" stat="next1002"><img
					src="/<spring:message code="url.language"/>/images/r-btn.png" /></a>
				<div class="item">
					<a class="cur" stat="item1001" ></a><a
						stat="item1002"></a><a 
						stat="item1003"></a>
				</div>
			</div>
			<!--图片轮播结束-->

			<div class="guanggao">
				<a target="_blank"><img src="/<spring:message code="url.language"/>/images/gg01.jpg" /></a> <a
					target="_blank"><img src="/<spring:message code="url.language"/>/images/gg02.jpg" /></a> <a
					target="_blank"><img src="/<spring:message code="url.language"/>/images/gg03.jpg" /></a> <a
					target="_blank"><img src="/<spring:message code="url.language"/>/images/gg04.jpg" /></a> <a
					target="_blank"><img src="/<spring:message code="url.language"/>/images/gg05.jpg" /></a>
			</div>
		</div>
	</div>

	<div class="width clear mar-t30 pad-t30 pad-b30 font14 bg-f9">
		<div class="mar-auto">
			<div class="fl cjzx">
				<h3 class="cjzx-bt text-c">
					<span><i class="fa fa-ticket" aria-hidden="true"></i> 广告店铺</span>
				</h3>

				<ul class="ggdp-list font13">
					<li>
						<p class="font16 yellow ggdp-list-bt">天虹商场</p>
						<p class="ggdp-list-xq pad-t7">
							<span class="dis-in width48"><span class="col-999">设备编号：</span>GGKZQ0001</span>
							<span class="dis-in width52"><span class="col-999">空闲时段：</span>19:00:00-20:00:00</span>
							<span class="dis-in width33"><span class="col-999">广告时长：</span>20秒</span>
							<span class="dis-in width33"><span class="col-999">播放次数：</span>200次</span>
							<span class="dis-in width33"><span class="col-999">价格：</span>30元/天</span>
						</p>
						<p class="ggdp-list-dz">
							<span class="col-999">地址：</span>广东省深圳市罗湖区金光华广场
						</p>
					</li>

					<li>
						<p class="font16 yellow ggdp-list-bt">天虹商场</p>
						<p class="ggdp-list-xq pad-t7">
							<span class="dis-in width48"><span class="col-999">设备编号：</span>GGKZQ0001</span>
							<span class="dis-in width52"><span class="col-999">空闲时段：</span>19:00:00-20:00:00</span>
							<span class="dis-in width33"><span class="col-999">广告时长：</span>20秒</span>
							<span class="dis-in width33"><span class="col-999">播放次数：</span>200次</span>
							<span class="dis-in width33"><span class="col-999">价格：</span>30元/天</span>
						</p>
						<p class="ggdp-list-dz">
							<span class="col-999">地址：</span>广东省深圳市罗湖区金光华广场
						</p>
					</li>

					<li>
						<p class="font16 yellow ggdp-list-bt">天虹商场</p>
						<p class="ggdp-list-xq pad-t7">
							<span class="dis-in width48"><span class="col-999">设备编号：</span>GGKZQ0001</span>
							<span class="dis-in width52"><span class="col-999">空闲时段：</span>19:00:00-20:00:00</span>
							<span class="dis-in width33"><span class="col-999">广告时长：</span>20秒</span>
							<span class="dis-in width33"><span class="col-999">播放次数：</span>200次</span>
							<span class="dis-in width33"><span class="col-999">价格：</span>30元/天</span>
						</p>
						<p class="ggdp-list-dz">
							<span class="col-999">地址：</span>广东省深圳市罗湖区金光华广场
						</p>
					</li>
				</ul>
			</div>

			<div class="fl cjdz">
				<h3 class="cjzx-bt text-c">
					<span><i class="fa fa-gavel" aria-hidden="true"></i> 成交速递</span>
				</h3>
				<ul class="cjzx-list" id="newestOrder"></ul>
			</div>

			<div class="fr qgxx">
				<h3 class="cjzx-bt text-c">
					<span><i class="fa fa-envelope-open-o" aria-hidden="true"></i>
						求购信息</span>
				</h3>

				<ul class="cjzx-list">
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找深圳地区做电视广告监播 (50万)</a><span class="fr col-999">1天前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							找辽宁省沈阳市大东区新华一 (60万)</a><span class="fr col-999">7天前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找西双版纳的报纸投放广告 (保密)</a><span class="fr col-999">10天前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找养生堂栏目做几期节目 (85万)</a><span class="fr col-999">1个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找河南开封南岗县内的报纸 (保密)</a><span class="fr col-999">1个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找深圳地区做电视广告监播 (50万)</a><span class="fr col-999">2个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							找辽宁省沈阳市大东区新华一 (60万)</a><span class="fr col-999">2个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找西双版纳的报纸投放广告 (保密)</a><span class="fr col-999">3个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找养生堂栏目做几期节目 (85万)</a><span class="fr col-999">3个月前</span></li>
					<li><a href="#"><i
							class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
							寻找河南开封南岗县内的报纸 (保密)</a><span class="fr col-999">5个月前</span></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="width clear pad-b30">
		<div class="mar-auto">
			<div class="width rmgg-bt">
				<h2 class="fl font18">
					<i class="fa fa-cubes yellow" aria-hidden="true"></i> 热门广告投放时段
				</h2>
				<span class="fr font14"><a href="/<spring:message code="url.language"/>/exclude/forward/adStore.do" class="red">更多&gt;&gt;</a></span>
			</div>

			<div class="rmgg">
				<ul>
					<!-- 热门推荐广告 -->
    				<%@include file="../../chinese/templeteHTML/hotAD.html" %>
				</ul>
			</div>

			<div class="width banner1 pad-t30">
				<img src="/<spring:message code="url.language"/>/images/banner1.jpg" />
			</div>
		</div>
	</div>

	<script src="/<spring:message code="url.language"/>/js/footer.js"></script>
	<!--公用底部JS-->

	<script type="text/javascript">
		$('.rmgg li').mouseenter(function() {
			$(this).find('.rmgg-xx').stop().animate({
				bottom : '-66px'
			});
			$(this).find('.a2').css({
				left : '0'
			})
			$(this).children('.a2').find('.p4').css({
				left : '0'
			})
			$(this).children('.a2').find('.p5').css({
				left : '0'
			})
			$(this).children('.a2').find('.p6').css({
				transform : 'scale(1)'
			})
			$(this).children('.a2').find('.p7').css({
				bottom : '0'
			})
		})
		$('.rmgg li').mouseleave(function() {
			$(this).find('.rmgg-xx').stop().animate({
				bottom : '0px'
			});
			$(this).find('.a2').css({
				left : -$(this).width()
			})
			$(this).children('.a2').find('.p4').css({
				left : -$(this).width()
			})
			$(this).children('.a2').find('.p5').css({
				left : -$(this).width()
			})
			$(this).children('.a2').find('.p6').css({
				transform : 'scale(1.3)'
			})
			$(this).children('.a2').find('.p7').css({
				bottom : '-74px'
			})
		})
	</script>
</body>
</html>