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
<meta name="keywords">
<meta name="description"/>
<title>翔云播</title>
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/home.css">
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/globalVar.js"></script>
</head>
<body>
<div class="header">
  <div class="mar-auto">
    <div class="fl index-logo"><img src="/<spring:message code="url.language"/>/images/logo2.png" alt="翔云播" /></div>
  
    <div id="loginRegisterDIV" class="fr index-login" style="display:none;">
      <a href="/<spring:message code="url.language"/>/forward/register/cm.do">免费注册</a>|<a href="/<spring:message code="url.language"/>/exclude/forward/login.do">登录</a>
    </div>
    
    <div class="fr index-login col-fff font16" style="display:none;">
      欢迎你，<span class="pad-r20"><a class="col-fff" id="userName"></a></span><a style="cursor: pointer;" onclick="exitLogin()">退出</a>
    </div>
  </div>
</div>

<div class="clear banner text-c">
  <div class="banner-wz">共享广告  随心分享</div>
</div>

<div class="fl clear width">
  <a href="../customerAdvertise.do" class="index-munu index-munu01">
    <h2>广告投放</h2>
  </a>
  
  <a href="javascript:void(0);" class="index-munu index-munu02">
    <h2>共享屏点</h2>
  </a>
  
  <a href="../platformCollaborate/cm.do" class="index-munu index-munu03">
    <h2>平台合作</h2>
  </a>
  
  <a href="../aboutUs/cm.do" class="index-munu index-munu04">
    <h2>关于我们</h2>
  </a>
</div>
<!--公用底部JS-->
<script src="/<spring:message code="url.language"/>/js/footer.js"></script>

<script type="text/javascript" src="/js/userCommon.js"></script>
</body>
</html>