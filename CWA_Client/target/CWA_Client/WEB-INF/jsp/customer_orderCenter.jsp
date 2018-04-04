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
<!--<script src="/<spring:message code="url.language"/>/js/adddate.js"></script>日期时间选择-->
<script>

</script>
</head>

<body>
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script><!--公用头部JS-->

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">我的广告订单</h2>
      
      <div class="ggs-sea pad-t20">
        <div class="pos-r font14 ggs-sea-list">
          <span class="pos-a ggs-sea-bt">广告名称</span>
          <input type="text" class="wenb04 adName" placeholder="请输入广告名称">
        </div>
        
        <div class="pos-r font14 ggs-sea-list">
          <span class="pos-a ggs-sea-bt">播放时段</span>
          <select name="" class="font14 xlb05 playIdle">
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
          <span class="pos-a ggs-sea-bt">订单状态</span>
          <select name="" class="font14 xlb05 orderStatus">
          	<option value="">全部</option>
            <option value="1">未支付</option>
            <option value="2-3">申请中</option>
            <option value="4-1">等待播放</option>
            <option value="4-2">播放中</option>
            <option value="4-3">已停播</option>
            <option value="5">审核不通过</option>
            <option value="6">已取消</option>
            <option value="7">已关闭</option>
          </select>
        </div>
        
        <div class="pos-r font14 ggs-sea-list">
          <input name="" onclick="search()" type="button" value="搜索" class="btn btn06 bg-red font14">
        </div>
      </div>
      
      <div class="rmgg-table font13 pad-t20">
        <ul class="data-list wdggdd-list mar-t10 orderAll">
        
        </ul>
      </div>
      
      <div class="fenye font14 text-c" id="oPageTurn">
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_queryOrder.js"></script>
<!--店铺详情提示宽   onmouseout="javascript:turnoff('diandiv')"
<div class="shade" id="diandiv" style="display: ;">
  <div class="dian-xq">
    <p class="pos-a dian-close text-c" onclick="javascript:turnoff('diandiv')"><i class="fa fa-close" aria-hidden="true"></i></p>
    <p><b>店铺名称：</b><span class="shopName"></span></p>
    <p><b>详细地址：</b><span class="addrDetail"></span></p>
    <p class="dian-xq-img imgs">
      
    </p>
  </div>
</div>-->
<!--弹出微信支付提示宽-->
<div class="shade" id="ewmdiv" style="display: ;">
  <div class="tanchu">
    <div class="tanchu-bt"><span>微信支付</span><a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff('ewmdiv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <div class="tanchu-nr text-c">
      <p class="tanchu-tspc">请用微信扫一下二维码，完成支付。</p>
      <p class="tanchu-tssj">长按二维码，自动识别。</p>
      <p class="pad-t20"><img src="/<spring:message code="url.language"/>/images/ewm.jpg" /></p>
    </div>
  </div>
</div>
<!--弹出订单广告有效播放时间-->
<div class="shade" id="shiduandiv" style="display:none ;">
  <div class="tanchu tanchu4">
    <div class="tanchu-bt"><span>播放时段</span><a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff('shiduandiv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <div class="tanchu4-nr">
       <p class="dis-b rmgg-ss">
              <b class="dis-in pad-r10 font14">日期选择</b>
              <input type="text" name="user_age"  id="" readonly class="dis-in wenb05 beginTime" placeholder="请输入开始日期">
              <span class="dis-in">至</span>
              <input type="text" name="user_age"  id="" readonly class="dis-in wenb05 endTime" placeholder="请输入结束日期">
              <input name="" type="button" onclick="seachEffectualTimeBtn()" value="搜 索" class="dis-in btn btn03 bg-orange font16 mar-l10">
              <input name="" type="button" onclick="clearDate()" value="清空" class="dis-in btn btn03 bg-orange font16 mar-l10">
       </p>
       
       <div class="rmgg-table rmgg-table2 tanchu4-list pos-a">
<table width="100%" border="0" cellspacing="0" cellpadding="0" id="timeTable">
</table>
       </div>
    </div>
  </div>
</div>
</body>
</html>