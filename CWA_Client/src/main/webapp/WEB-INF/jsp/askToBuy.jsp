<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<!-- 逻辑处理 -->
<script src="/js/core/askToBuy.js"></script>
</head>

<body>
<!--公用头部JS-->
<script src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
     <div class="right right1 bg-ff">
       <h2 class="clear font18 pad-b10 bor-b3 yellow">发布求购信息</h2>
       
       <div class="qgxx-lc pad-b15 pad-t20 bor-b2">
         <div class="qgxx-lc-a">
           <p class="qgxx-lc-a1 text-c">撮合交易流程</p>
           <p class="qgxx-lc-a2">广告投放一站式保姆服务</p>
         </div>
         
         <div class="qgxx-lc-b">
           <p class="qgxx-lc-b1 red">1</p>
           <div class="qgxx-lc-b2">
             <h4 class="font16">发布求购信息</h4>
             <p class="col-999">通过网页、QQ、电话发布广告投放<br />资源需求</p>
           </div>
         </div>
         
         <div class="qgxx-lc-b">
           <p class="qgxx-lc-b1 red">2</p>
           <div class="qgxx-lc-b2">
             <h4 class="font16">推荐广告资源</h4>
             <p class="col-999">专业媒介团队寻找价优可靠资源策划<br />方案及服务商匹配</p>
           </div>
         </div>
         
         <div class="qgxx-lc-b">
           <p class="qgxx-lc-b1 red">3</p>
           <div class="qgxx-lc-b2">
             <h4 class="font16">完成采购投放交易</h4>
             <p class="col-999">敲定合作方，对交易进行担保，完成<br />广告投放和效果评估</p>
           </div>
         </div>
       </div>
       
       <h2 class="clear font16 pad-t30 pad-b10 bor-b">您的委托求购内容</h2>
       
       <div class="wtqg font14">
         <ul>
           <li>
             <span class="pos-a wtqg-l">公司名称：</span>
             <input id="company" type="text" class="wenb07" />
             <span class="red dis-in pad-l5">*</span>
           </li>
           
           <li>
             <span class="pos-a wtqg-l">广告预算：</span>
             <input id="budget" type="text" class="wenb07 width50" />
             <span class="dis-in pad-l5">万元 <span class="red">*</span></span>
           </li>
           
           <li>
             <span class="pos-a wtqg-l">联系人：</span>
             <input id="contacts" type="text" class="wenb07" />
             <span class="red dis-in pad-l5">*</span>
           </li>
           
           <li>
             <span class="pos-a wtqg-l">联系方式：</span>
             <input id="contactWay" type="text" class="wenb07" />
             <span class="red dis-in pad-l5">*</span>
           </li>
         </ul>
         
         <ul class="wtqg1">
           <li>
             <span class="pos-a wtqg-l">需求简述：</span>
             <textarea id="describe" cols="" rows="" class="wby02"></textarea>
           </li>
         </ul>
       </div>
       
       <div class="clear text-c font14">
         <p class="pad-t15"><i class="fa fa-info-circle red font16" aria-hidden="true"></i> 确认您发的求购信息真实无误，否则不能发布！谢谢！</p>
         <p class="pad-t15"><input id="issueBtn" type="button" value="发布求购" class="btn btn05 bg-red font16" /></p>
       </div>
       
       <div class="qgxx-bz pad-b15 pad-t15 mar-t20 bor-t2">
         <div class="qgxx-bz-a">
           <p class="qgxx-bz-a1 text-c yellow"><i class="fa fa-3x fa-usd" aria-hidden="true"></i></p>
           <div class="qgxx-bz-a2">
             <h4 class="font16">免费</h4>
             <p class="col-999 pad-t10">免费提供保姆式跨媒体组合投放<br />方案和投放执行</p>
           </div>
         </div>
         
         <div class="qgxx-bz-a">
           <p class="qgxx-bz-a1 text-c yellow"><i class="fa fa-3x fa-soccer-ball-o" aria-hidden="true"></i></p>
           <div class="qgxx-bz-a2">
             <h4 class="font16">省力</h4>
             <p class="col-999 pad-t10">一站式服务，标准化专业化团队<br />提供优质服务</p>
           </div>
         </div>
         
         <div class="qgxx-bz-a">
           <p class="qgxx-bz-a1 text-c yellow"><i class="fa fa-3x fa-cny" aria-hidden="true"></i></p>
           <div class="qgxx-bz-a2">
             <h4 class="font16">省钱</h4>
             <p class="col-999 pad-t10">一手资源采购，发挥整合采购优<br />势，价格最低</p>
           </div>
         </div>
         
         <div class="qgxx-bz-a">
           <p class="qgxx-bz-a1 text-c yellow"><i class="fa fa-3x fa-shield" aria-hidden="true"></i></p>
           <div class="qgxx-bz-a2">
             <h4 class="font16">放心</h4>
             <p class="col-999 pad-t10">广告投放担保交易，不用担心广告<br />没按约定投放</p>
           </div>
         </div>
       </div>
     </div>
  </div>
</div>
<!--公用底部JS-->
<script src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>