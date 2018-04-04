<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- 引入spring标签  --%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!-- 设备详情逻辑 -->
<script src="/js/core/deviceDetail.js"></script>
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
     			<h2 class="clear font18 pad-b10 bor-b">设备详情</h2>
     			<div class="rmgg-table rmgg-table2 font13">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<thead>
							<tr>
					    		<th>设备编号</th>
					    		<th>设备描述</th>
					  		</tr>
						</thead>
						<tbody id="deviceInfo"></tbody>
					</table>
      			</div>
          
      <ul class="ggtf-sc ggtf-sc2 pad-t20 font14">
        <li>
          <span class="pos-a ggtf-sc-bt">设备报修电话</span>
          <p class="ggtf-sc-sj red font18">0755XXXXXXX</p>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">客服电话</span>
          <p class="ggtf-sc-sj red font18">400-0000-000</p>
        </li>
      </ul>
    </div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>