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
<script src="/js/commonRel.js"></script>
</head>

<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="width clear font14">
  		<div class="mar-auto pos-r"> 
			<!-- 左侧菜单-->
			<script src="/<spring:message code="url.language"/>/js/left.js"></script>

			<!-- 右侧内容 -->
			<div class="right bg-ff">
		      <div class="clear width bg-f3 wddd">
		        <h2 class="fl font16 pad-t7 pad-b5">广告查询</h2>
		      </div>
		      
		      <div class="ggtf-city width">
		        <div class="pos-r font14 ggs-sea-list">
		          <span class="pos-a ggs-sea-bt">广告编号</span>
		          <input type="text" class="wenb07" id="adNumber" placeholder="请输入广告编号" />
		        </div>
		        <div class="pos-r font14 ggs-sea-list">
		          <span class="pos-a ggs-sea-bt">播放时段</span>
		          <select name="" class="font14 xlb05" id="timeQuantum">
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
		        <div class="pos-r font14 ggs-sea-list">
		          <span class="pos-a ggs-sea-bt">广告状态</span>
		          <select id="adStatus" class="font14 xlb05">
		            <option value="">全部</option>
		            <option value="123">申请中</option>
		            <option value="9">播放中</option>
		            <option value="10">等待播放</option>
		            <option value="11">已停播</option>
		            <option value="5">审核不通过</option>
		            <option value="6">已取消</option>
		            <option value="7">已关闭</option>
				  </select>
		        </div>
		        <div class="pos-r font14 ggs-sea-list">
		          <input name="" type="button" id="search" value="搜索" class="btn btn06 bg-blue font14">
		        </div>
		      </div>
			
				<div class="rmgg-table rmgg-table2 clear font13">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<thead>
		  					<tr>
								<th>序号</th>
							    <th>店铺编号</th>
							    <th>设备编号</th>
							    <th>广告编号</th>
							    <th>播放时段</th>
							    <th>价格（元/天）</th>
							    <th>开始日期</th>
							    <th>结束日期</th>
							    <th>广告状态</th>
							    <th>广告查看</th>
							</tr>
						</thead>
						<tbody id="adData">
						</tbody>
					</table>
				</div>
      
      			<div class="fenye font14 text-c" id="adPageTurn"></div>
      
    		</div>
    	
		</div>
</div>
<!-- 查询广告逻辑 -->
<script src="/js/core/ad_queryAD.js"></script>
<!-- 公用底部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>