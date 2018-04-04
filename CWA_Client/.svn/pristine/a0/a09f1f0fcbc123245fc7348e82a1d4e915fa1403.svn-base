<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/commonRel.js"></script>
<script src="/js/top.js"></script><!--返回顶部-->

</head>

<body>
<!-- 公用头部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="width clear font14">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <div class="clear width bg-f3 wddd">
        <h2 class="fl font16 pad-t7 pad-b5">广告播出历史查询</h2>
      </div>
      
      <div class="ggtf-city width">
        <div class="pos-r font14 ggs-sea-list">
          <span class="pos-a ggs-sea-bt">开始日期</span>
          <input type="text" name="user_age" class="wenb07 beginTime" placeholder="请输入开始日期">
        </div>
        
        <div class="pos-r font14 ggs-sea-list">
          <span class="pos-a ggs-sea-bt">结束日期</span>
          <input type="text" name="user_age" class="wenb07 endTime" placeholder="请输入结束日期">
        </div>
        
        <div class="fl width24 mar-l15">
          <input name="" type="button" value="搜索" onclick="search()" class="btn btn06 bg-blue font14 width33">
          <input name="" type="button" value="清空" onclick="clearDate()" class="btn btn06 bg-999 font14 width33 mar-l5">
        </div>
      </div>
          
      <div class="rmgg-table rmgg-table2 font13">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="tableInfo">
		  <tr id="tableHeader">
		    <th>序号</th>
		    <th>设备编号</th>
		    <th>店铺名称</th>
		    <th>广告名称</th>
		    <th>播放开始时间</th>
		    <th>播放结束时间</th>
		  </tr>
		</table>
      </div>
      
      <!-- <div class="font13 clear">
        <ul class="wddd-list" id="dataList">
          <li class="wddd-list-bt">
             <div class="wddd-list-a pos-r">
               <a href="#" class="pos-a ddrq">近三个月广告播放历史记录</a>
                订单详情
             </div>
             
             <div class="wddd-list-b">价格（元/天）</div>
             
             <div class="wddd-list-c">支付费用</div>
             
             <div class="wddd-list-d">操作</div>
          </li>
        </ul>
      </div> -->
      
      <div class="fenye font14 text-c" id="cPageTurn">
      </div>
    </div>
  </div>
</div>
<!--日期选择-->
<script src="/js/mobiscroll-date.js"></script>
<!--日期选择-->
<script src="/js/mobiscroll.js"></script>
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_adHistoryQuery.js"></script>
</body>
</html>