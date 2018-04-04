<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Cache-Control" content="no-Cache" />
	<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="keywords">
	<meta name="description" />
	<title>翔云播</title>
	<script src="/js/commonRel.js"></script>
	<!-- 图片放大镜 -->
	<script src="/js/jquery.jqzoom-core.js" type="text/javascript"></script>
	<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/jquery.jqzoom.css" type="text/css">
	<!--日期选择-->
	<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
	<script src="/js/mobiscroll-date.js"></script>
	<script src="/js/mobiscroll.js"></script>
	<!-- 百度地图API -->
	<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI"></script>
	<!-- 逻辑处理 -->
	<script type="text/javascript" src="/js/core/adScreenDetail.js"></script>
</head>
<body>
	<!-- 公用头部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>
	<div class="width clear font14">
		<div class="mar-auto">
			<div class="width clear quan pos-r">
				<!--左侧菜单-->
				<script src="/<spring:message code="url.language"/>/js/left.js"></script>
				<!--右侧内容-->
				<div class="right">
					<div class="clear width bg-f3 wddd">
						<h2 class="fl font16 pad-t7 pad-b5">广告屏详情</h2>
					</div>
					<div class="clear width detail pad-t20">
						<div class="fl detail-l">
							<div class="t2"></div>
							<div class="clearfix t1 clear">
								<ul id="thumblist" class="clearfix"></ul>
							</div>
						</div>

						<div class="fr detail-r">
							<p>
								<span>广告屏编号：</span>
								<span id="deviceCode"></span>
							</p>
							<p class="pad-t25">
								<span>播放中：</span>
								<span id="playingNum">0</span>条
							</p>
							<p class="pad-t25">
								<span>店铺：</span>
								<span id="shopName"></span>
							</p>
							<div class="pos-r pltf-dz pad-t25">
								<span id="address"></span> 
								<a style="cursor:pointer;" class="pos-a pltf-dz2">
									<i class="fa fa-map-marker red" aria-hidden="true"></i>
								</a>
							</div>
							<p class="pad-t25 gwc-dw">
								<span class="dis-in font14">投放日期：</span> 
								<span class="dis-in riqi pos-r"> 
									<input type="text" name="user_age" id="confirmOrderStartTime" class="dis-in wenb04" placeholder="请输入开始时间" /> 
									<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>
								</span> 
								<span class="dis-in pad-l5 pad-r5">-</span> 
								<span class="dis-in riqi pos-r"> 
									<input type="text" name="user_age" id="confirmOrderEndTime" class="dis-in wenb04" placeholder="请输入结束时间" /> 
									<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>
								</span>
							</p>
							<p class="pad-t25 tflx">
								<span>投放类型：</span> 
								<span class="dis-in tfsl">
									<em id="choosePic">图片</em>
									<em id="chooseVideo">视频</em>
								</span>
								<p class="pad-t7" style="padding-left: 75px;">
					            	<span class="dis-in col-999 pad-t5 pad-r10">单价：<em class="red font14" id="typePrice"></em>元/个</span>
					              	<span class="dis-in col-999 pad-t5" style="display:none;">折后价：<em class="red font14" id="discountTypePrice"></em>元/个</span>
					            </p>
							</p>
							<div class="pad-t25 tfsl-plus">
								<span class="dis-in">投放数量：</span>
								<div class="pos-r dis-in cpxq-mk-zl mar-r5">
									<a id="reducePutInCount" style="cursor:pointer;" class="minus2 pos-a">
										<i class="fa fa-minus" aria-hidden="true"></i>
									</a> 
									<input id="putInCount" type="text" class="wenb04 width100 text-c">
									<a id="addPutInCount" style="cursor:pointer;" class="plus2 pos-a">
										<i class="fa fa-plus" aria-hidden="true"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="clear pad-t20">
						<p>选择支付方式</p>
						<ul class="zf-xz2">
							<li id="payType0101">
								<img src="/<spring:message code="url.language"/>/images/zf01.jpg" alt="微信" />
							</li>
							<li id="payType0201">
								<img src="/<spring:message code="url.language"/>/images/zf02.jpg" alt="支付宝" />
							</li>
							<li id="payType0400">
								<img src="/<spring:message code="url.language"/>/images/zf04.jpg" alt="翔云余额" />
							</li>
							<li id="payType0301">
								<img src="/<spring:message code="url.language"/>/images/zf03.jpg" alt="银联" />
							</li>
						</ul>
					</div>
					<div
						class="width pad-t10 pad-b10 pad-r10 mar-t20 clear text-r bg-f3 pos-r">
						<span class="dis-in font14 pad-l20"> 总计 
							<span class="red font18" id="totalPrice">0</span> 元
							<span style="display:none">,折后价为<span class="red" id="discountTotalPrice"></span></span>
						</span> 
						<input id="payBtn" type="button" value="确认付款" class="btn btn01 bg-red font16 mar-l10" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>