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
<!--城市3级联动-->
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/city-picker.css">
<!-- 省市区街道 -->
<script src="/js/jquery.citys.js"></script>
<!--焦点图-->
<script src="/js/banner.js"></script>
<!-- 百度地图API -->
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI"></script>
<!-- 逻辑处理 -->
<script type="text/javascript" src="/js/core/putInAd.js"></script>
<!-- 日期选择 -->
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/mobiscroll-date.js"></script>
<script src="/js/mobiscroll.js"></script>
</head>
<body>
	<!-- 公用头部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>
	<div class="width clear">
		<div class="mar-auto">
			<!--图片轮播开始-->
			<div class="slide-main" id="touchMain">
				<a class="prev" href="javascript:void(0);" stat="prev1001">
					<img src="/<spring:message code="url.language"/>/images/l-btn.png" />
				</a>
				<div class="slide-box" id="slideContent">
					<div class="slide" id="bgstylea" style="background-image: url(/<spring:message code="url.language"/>/images/banner01.jpg);"></div>
					<div class="slide" id="bgstyleb" style="background-image: url(/<spring:message code="url.language"/>/images/banner02.jpg);"></div>
					<div class="slide" id="bgstylec" style="background-image: url(/<spring:message code="url.language"/>/images/banner03.jpg);"></div>
				</div>
				<a class="next" href="javascript:void(0);" stat="next1002">
					<img src="/<spring:message code="url.language"/>/images/r-btn.png" />
				</a>
				<div class="item">
					<a class="cur" stat="item1001" href="javascript:void(0);"></a>
					<a href="javascript:void(0);" stat="item1002"></a>
					<a href="javascript:void(0);" stat="item1003"></a>
				</div>
			</div>
			<!--图片轮播结束-->
		</div>
	</div>

	<div class="width clear pad-t20 font14">
		<div class="mar-auto">
			<div class="width clear quan pos-r">
				<!--左侧菜单-->
				<script src="/<spring:message code="url.language"/>/js/left.js"></script>
				<!--右侧内容-->
				<div class="right">
					<div class="width bg-f3 shuaix"></div>
					<div class="ggtf-city width bg-f3 mar-t10 advArea">
						<div class="pos-r font14 ggtf-city-list">
							<span class="pos-a ggtf-city-bt">省份</span> 
							<select name="province" class="font14 xlb03"></select>
						</div>
						<div class="pos-r font14 ggtf-city-list">
							<span class="pos-a ggtf-city-bt">城市</span> 
							<select name="city" class="font14 xlb03"></select>
						</div>
						<div class="pos-r font14 ggtf-city-list">
							<span class="pos-a ggtf-city-bt">区域</span> 
							<select name="area" class="font14 xlb03"></select>
						</div>
						<div class="pos-r font14 ggtf-city-list">
							<span class="pos-a ggtf-city-bt">商圈</span> 
							<select name="town" class="font14 xlb03">
								<option value="">- 请选择 -</option>
							</select>
						</div>
						<div class="pos-r font14 ggtf-city-list">
							<span class="pos-a ggtf-city-bt">行业</span> 
							<select name="industry" class="font14 xlb03">
				                <option value="">- 请选择 -</option>
							    <option value="1">超市便利店</option>
							    <option value="2">餐饮</option>
							    <option value="3">奶茶店</option>
							    <option value="4">药店</option>
							    <option value="5">娱乐休闲</option>
							    <option value="6">美容院</option>
							    <option value="7">地产中介</option>
							    <option value="8">美容美发</option>
							    <option value="9">婚纱摄影</option>
							    <option value="10">面包店</option>
							    <option value="11">培训机构</option>
							    <option value="12">服饰</option>
							    <option value="0">其它</option>
							</select>
						</div>
					</div>
					<div class="data-list font12 width">
						<ul id="dataList"></ul>
					</div>
					<div class="fenye font14 text-c" id="advertisePageTurn"></div>
					<div class="width pad-t10 pad-b10 pad-r10 mar-t20 clear text-r bg-f3">
						<span class="dis-in font14 pad-l10"> 
							已选屏：<span class="red font18" id="checkAdNum">0</span>
						</span> 
						<input type="button" value="加入购物车" class="btn btn01 bg-blue font16 mar-l10 joinCart" /> 
						<input type="button" value="立即购买" class="btn btn01 bg-red font16 mar-l10" id="buyBtn" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>