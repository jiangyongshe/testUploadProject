<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
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
	<link href="/<spring:message code="url.language"/>/css/stream-v1.css" rel="stylesheet">
	<script src="/js/commonRel.js"></script>
	<!-- 省市区街道 -->
	<script src="/js/jquery.citys.js"></script>
	<!--返回顶部-->
	<script src="/js/top.js"></script>
	<script src="/js/upload/browser-md5-file.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="/js/upload/stream-v1.js"></script>
	<!-- 逻辑处理 -->
	<script type="text/javascript" src="/js/core/operationFile.js"></script>
</head>

<body style="width: 100%">
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
						<h2 class="fl font16 pad-t7 pad-b5">上传广告<span name="fileType"></span></h2>
					</div>
					<ul class="ggtf-sc pad-t20 font14">
						<li>
							<span class="pos-a ggtf-sc-bt">广告编号</span> 
							<p class="ggtf-sc-sj" id="serialNumber"></p>
						</li>
						<li>
							<span class="pos-a ggtf-sc-bt">广告类型</span> 
							<select class="xlb04 font14 col-666" id="adType">
								<option value="1">日用品广告</option>
								<option value="2">食品饮料广告</option>
								<option value="3">餐饮广告</option>
								<option value="4">电子家电广告</option>
								<option value="5">服装服饰广告</option>
								<option value="6">化妆品广告</option>
								<option value="7">钟表首饰广告</option>
								<option value="8">教育培训广告</option>
								<option value="9">文化广告</option>
								<option value="10">会展广告</option>
								<option value="11">商业商场广告</option>
								<option value="12">娱乐广告</option>
								<option value="13">社会服务广告</option>
								<option value="14">金融保险广告</option>
								<option value="15">汽车广告</option>
								<option value="16">房地产广告</option>
								<option value="17">邮电通讯快递物流广告</option>
								<option value="18">保健广告</option>
								<option value="19">旅游酒店广告</option>
								<option value="20">家装建材广告</option>
								<option value="21">交通运输广告</option>
								<option value="22">其他广告</option>
							</select>
						</li>
						<li class="hide">
							<span class="pos-a ggtf-sc-bt ">广告名称</span>
							<input id="adName" type="text" class="wenb03" placeholder="请输入广告名称" />
						</li>
						<li  class="hide">
							<span class="pos-a ggtf-sc-bt">广告简介</span> 
							<textarea id="introduction" class="wby01 adIntroduction"></textarea>
						</li>
						<li>
          					<span class="pos-a ggtf-sc-bt">上传文件</span>
	        				<div id="videoFile" class="uploader" style="display:none;">
	          					<p><i class="fa fa-video-camera fa-2x" aria-hidden="true"></i></p>
	         					<input type="text" class="filename" value="点此上传视频" readonly/>
	         					<input type="button" name="file" class="sc-anniu" value="上传..."/>
					            <input type="file" size="30"/>
						     </div>
						     <div id="imgFile" class="uploader" style="display:none;">
	          					<p><i class="fa fa-video-camera fa-2x" aria-hidden="true"></i></p>
	         					<input type="text" class="filename" value="点此上传图片" readonly/>
	         					<input type="button" name="file" class="sc-anniu" value="上传..."/>
					            <input type="file" size="30"/>
						     </div>
						     <p id="pic_tip" style="display:none;" class="red">温馨提示:建议每张图片像素为1920*1080且大小不超过2M</p>
						     <p id="video_tip" style="display:none;" class="red">温馨提示:视频大小不超过20M</p>
						     <div class="shangcjd" style="display:none;">
					         	<p><i class="fa fa-folder pad-r5" aria-hidden="true"></i><span id="upload_file_name"></span></p>
					            <p class="pos-r">
					            	<span class="dis-b jindu1">&nbsp;</span>
					              	<span class="dis-b jindu2 pos-a" id="upload_proportion_percentage_width"></span>
					              	<span class="dis-b jindu3 pos-a" id="upload_proportion_percentage_text"></span>
					            </p>
					            <p>速度：<span id="upload_speed"></span></p>
					            <p>已上传:<span id="upload_proportion"></span></p>
					            <p>剩余时间：<span id="time_remaining"></span></p>
					         </div>
						     <!-- 上传的视频 -->
				          	 <div id="videoDIV" class="uploader-sp" style="display: block;"></div>
				             <!-- 上传的图片 -->
						     <div id="imgs" class="uploader-sp clear width pad-b10" style="z-index:10;display: block;"></div>
						</li>
						<li class="clear">
							<input id="submit" type="button" value="提 交" class="btn btn05 bg-red font16 mar-t10" />
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!--公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>