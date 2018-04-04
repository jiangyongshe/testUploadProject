<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/index.css">
<script src="/js/commonRel.js"></script>
<script src="/js/top.js"></script><!--返回顶部-->
<style>
.heade, menu {
	display: none;
}
footer {
	background-color: #eee;
}
footer a {
	color: #333;
}
</style>
</head>
<body>

<script src="/<spring:message code="url.language"/>/js/header.js"></script><!--公用头部JS-->

<div class="clear width">
  <div class="mar-auto pos-r">
	<div class="dis-in logo"><a href="/<spring:message code="url.language"/>/html/index1.html"><img src="/<spring:message code="url.language"/>/images/logo.png" alt="翔云播" /></a></div>
    <div class="dis-in pad-l20 font20"><spring:message code="register.btn.welcRegister" /></div>
    <div class="fr pad-t40 font16"><spring:message code="register.text.haveAccount" />? <a href="/<spring:message code="url.language"/>/exclude/forward/login.do" class="red"><spring:message code="register.text.logonImmediately" /></a></div>
  </div>
</div>
  
<div class="clear width bor-t regis01">
 <div class="mar-auto pos-r">
  <div class="regis02 bg-ff font14">
  	<h2 class="regis02-bt font20 text-c title"><spring:message code="register.text.newCustomerRegister" /></h2>
    
    <div class="pos-r pad-t20 font16 registerType">
      <label class="radio dis-in"><input type="radio" name="radio" id="" checked value="1"><i>✓</i> <spring:message code="register.redio.customerRegister" /></label>
      <label class="radio dis-in pad-l20"><input type="radio" name="radio" id="" value="2"><i>✓</i> <spring:message code="register.redio.partnerRegister" /></label>
    </div>
    
    <div class="pos-r pad-t20">
      <span class="pos-a regis02-mc"><spring:message code="register.form.mobile" /></span>
      <input type="text" class="wenb02 bor mobile" placeholder="<spring:message code="register.form.mobileTitle" />" />
    </div>
    
    <div class="pos-r pad-t20">
      <span class="pos-a regis02-mc"><spring:message code="register.form.validCode" /></span>
      <input type="text" class="wenb02 bor validCode" placeholder="<spring:message code="register.form.validCodeTitle" />" />
      <input id="getValidCode" class="btn btn02 regis02-yzm pos-a bg-red" type="button" value="<spring:message code="register.btn.getValidCode" />" />
      <input id="getValidCode1" class="btn btn02 regis02-yzm pos-a" type="button" value="" />
    </div>
        
    <div class="pos-r pad-t20">
      <span class="pos-a regis02-mc"><spring:message code="register.form.setPassWord" /></span>
      <input type="password" class="wenb02 bor passWord" placeholder="<spring:message code="register.form.setPassWordTitle" />" />
    </div>
    
    <div class="pos-r pad-t20">
      <span class="pos-a regis02-mc"><spring:message code="register.form.confirmPassWord" /></span>
      <input type="password" class="wenb02 bor passWord1" placeholder="<spring:message code="register.form.confirmPassWordTitle" />" />
    </div>
    
     <div class="pos-r pad-t20">
      <span class="pos-a regis02-mc"><spring:message code="register.form.inviteCode" /></span>
      <input type="text" class="wenb02 bor inviteCode" placeholder="<spring:message code="register.form.inviteCodeTitle" />" />
   	 </div>
      
    <div class="pad-t10 text-c red tishi01 error"></div>
    
    <div class="pad-t20">
      <input name="" id="registerNow" type="button" value="<spring:message code="register.btn.registerNow" />" class="btn btn01 bg-red font14 width" />
    </div>
  </div>
  
  <div class="fr regis03">
    <img src="/<spring:message code="url.language"/>/images/ewm2.jpg" />
  </div>
 </div>
</div>

<script src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script src="/js/core/register.js"></script>

</body>
</html>