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
<script src="/js/commonRel.js"></script>
<script src="/js/top.js"></script><!--返回顶部-->

<script>

</script>
</head>

<body>
<div id="mescroll" class="mescroll">
<!-- 公用头部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">提现</h2>
      
      <p class="clear font16 pad-t30">选择提现方式</p>
      
      <ul class="zf-xz clear">
      	<li class="active" data="0101"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf01.jpg" /></a></li>
        <li data="0201"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf02.jpg" /></a></li>
        <li data="0301"><a href="#"><img src="/<spring:message code="url.language"/>/images/zf03.jpg" /></a></li>
      </ul>
      
      <div class="ggtf-sc pad-t20 font14 clear">
        <ul class="wechatPay">
          <li>
            <span class="pos-a ggtf-sc-bt">微信账号</span>
            <input type="text" class="wenb03" placeholder="请输入微信账号" />
          </li>
        
          <li>
            <span class="pos-a ggtf-sc-bt">真实姓名</span>
            <input type="text" class="wenb03" placeholder="请输入真实姓名" />
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">提现金额</span>
            <input type="text" class="wenb03 amount" placeholder=" " />
          </li>
        </ul>
        
        <ul class="hide aliPay">
          <li>
            <span class="pos-a ggtf-sc-bt">支付宝账号</span>
            <input type="text" class="wenb03" placeholder="请输入支付宝账号" />
          </li>
        
          <li>
            <span class="pos-a ggtf-sc-bt">真实姓名</span>
            <input type="text" class="wenb03" placeholder="请输入真实姓名" />
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">提现金额</span>
            <input type="text" class="wenb03 amount" placeholder="最大可提现金额5000元" />
          </li>
        </ul>
        
        <ul class="hide unionPay">
          <li>
            <span class="pos-a ggtf-sc-bt">银行名称</span>
            <select name="" class="font14 xlb04">
             <option>中国银行</option>
             <option>中国建设银行</option>
             <option>中国农业银行</option>
             <option>中国工商银行</option>
           </select>
          </li>
        
          <li>
            <span class="pos-a ggtf-sc-bt">银行账号</span>
            <input type="text" class="wenb03" placeholder="请输入银行账号" />
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">证件类型</span>
            <select name="" class="font14 xlb04">
              <option>身份证</option>
            </select>
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">证件号码</span>
            <input type="text" class="wenb03" placeholder="请输入证件号码" />
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">真实姓名</span>
            <input type="text" class="wenb03" placeholder="请输入真实姓名" />
          </li>
          
          <li>
            <span class="pos-a ggtf-sc-bt">提现金额</span>
            <input type="text" class="wenb03 amount" placeholder="最大可提现金额5000元" />
          </li>
        </ul>
      </div>
      
      <ul class="ggtf-sc pad-t20 font14">
        <li>
        <input name="" type="button" value="取消" onclick="javascript:history.back();" class="btn btn05 bg-999 font16" />
          <input name="" type="button" value="提交" class="btn btn05 bg-red font16" id="commit" />
        </li>
      </ul>
    </div>
  </div>
</div>
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_walletWithdraw.js"></script>
</div>
</body>
</html>