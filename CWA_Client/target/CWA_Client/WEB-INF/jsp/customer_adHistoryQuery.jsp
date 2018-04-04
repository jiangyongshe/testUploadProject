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
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/mobiscroll-date.css" />
<script src="/js/commonRel.js"></script>
<script src="/js/top.js"></script><!--返回顶部-->
<!--日期选择-->
<script src="/js/mobiscroll-date.js"></script>
<!--日期选择-->
<script src="/js/mobiscroll.js"></script>
<script>
$(document).ready(function(){
  $(".dian-close").click(function(){
  $(".dian-xq").hide(1000);
  });
  
  $('.dian-bt').on("click", function () {
		$(this).next().slideToggle(100);
		$('.dian-xq').not($(this).next()).slideUp('fast');
	});
});

//点击关闭层
  function turnoff(obj){
   document.getElementById(obj).style.display="none";
    }
//点击显示层
  function elementDisplay(objid){
   var obj=document.getElementById(objid);{
    obj.style.display='inline-block';
    }
   }
</script>
</head>

<body>
<!-- 公用头部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">广告播出历史查询</h2>
      
      <div class="pad-t20 rmgg-ss">
             <b class="dis-in pad-r20 font14">日期选择</b>
             <input type="text" value="" name="user_age" id="" readonly class="dis-in wenb05 beginTime" placeholder="请输入开始日期"/>
             <span class="dis-in">至</span>
             <input type="text" value="" name="user_age" id="" readonly class="dis-in wenb05 endTime" placeholder="请输入结束日期"/>
             <input name="" type="button" value="搜 索" onclick="search()" class="dis-in btn btn03 bg-orange font16 mar-l10" />
             <input name="" type="button" value="清空" onclick="clearDate()" class="dis-in btn btn03 bg-orange font16 mar-l10" />
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
          <div class="fenye font14 text-c" id="cPageTurn">
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_adHistoryQuery.js"></script>
</body>
</html>