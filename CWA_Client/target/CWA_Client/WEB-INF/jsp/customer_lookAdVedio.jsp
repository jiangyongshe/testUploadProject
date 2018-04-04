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
<script src="/js/jquery.citys.js"></script><!-- 省市区街道 -->
<script src="/js/top.js"></script><!--返回顶部-->

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
    <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">查看广告视频</h2>
      
      <ul class="ggtf-sc pad-t20 font14">
        <li>
          <span class="pos-a ggtf-sc-bt">广告编号</span>
          <select name="" class="xlb04 font14 col-666 adNo">
          </select>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">广告类型</span>
          <p class="ggtf-sc-sj adType"></p>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">广告名称</span>
          <p class="ggtf-sc-sj adName"></p>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">广告简介</span>
          <p class="ggtf-sc-sj adIntroduction"></p>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">文件上传</span>
          <div class="uploader htmlUpl hide" onclick="showUplHtml('htmldiv')">
            <p><i class="fa fa-building-o fa-2x" aria-hidden="true"></i></p>
            <p class="font12">点此预览上传图文模板</p>
          </div>
          <div class="uploader-sp vedio" style="display:block;">
            <video width="" height="" class="uploader-video adVedio" style="display: none;" controls>
            </video>
            <img src="" onclick="showHtml()" style="cursor:pointer;display:none;"/>
            <!-- <p><a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i>删除 </a></p> -->
          </div>
          <div class="uploader-sp clear width pad-b10 imgList" style="display: block;">
           
          </div>
        </li>
        
        <li class="pad-t20">
           <a href="/<spring:message code="url.language"/>/forward/customerOrder.do" class="btn btn04 bg-red font16">返 回</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_operateAdVedio.js"></script>

<!--上传html-->
<div class="shade " id="htmldiv" style="display:none ;">
  <div class="tanchu-html">
    <div class="tanchu-bt text-l">查看图文模板<a href="#0" class="tanchu-close text-c" title="关闭" onclick="hideUplHtml('htmldiv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <ul class="html-tab disabled">
      <li class="active" attr-val="1">
        <span class="html-tab01-l html-bor-r col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
        <span class="html-tab01-r">文字</span>
      </li>
      <li attr-val="2">
        <span class="html-tab02-l html-bor-b col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
        <span class="html-tab02-r">文字</span>
      </li>
      <li attr-val="3">
        <span class="html-tab01-r html-bor-r">文字</span>
        <span class="html-tab01-l col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
      </li>
      <li attr-val="4">
        <span class="html-tab02-r html-bor-b">文字</span>
        <span class="html-tab02-l col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
      </li>
      <li attr-val="5">
        <span class="html-tab02-r" style="padding-top: 36px;">文字</span>
      </li>
    </ul>
    
    <ul class="html-tab-nr disabled">
      <li>
        <div class="html-nr-l">
          <div class="uploader uploadBtn" style="display: ;">
            <p><i class="fa fa-image fa-3x" aria-hidden="true"></i></p>
            <input type="text" class="filename" value="点此上传图片" readonly/>
            <input type="button" name="file" class="sc-anniu" value="上传..."/>
            <input type="file" size="30" class="fileInput"/>
          </div>
            
          <div class="html-nr-img pos-r updUploadBtn" style="display: none;">
              <div id="imgDiv"><img src="" id="imgUpl" style="height:1px"/></div>
             
             <div class="uploader pos-a " style="border: 0px;">
               <input type="text" class="filename point" value="点此修改图片" readonly/>
               <input type="button" name="file" class="sc-anniu" value="上传..."/>
               <input type="file" size="30" class="fileInput"/>
             </div>
          </div>
        </div>
         
        <div class="html-nr-r">
          <input name="" type="text" class="wenb04 title" placeholder="请输入标题" />
          <textarea name="" cols="" rows="" class="wby03 context" placeholder="请输入内容"></textarea>
        </div>
      </li>
    </ul>
    
    <div class="tanchu-xyan text-c" style="padding-bottom: 15px;">
      <input name="confirm" type="button" onclick="uplImgConfirm('htmldiv')" value="确定" class="btn btn04 font14 mar-l10 bg-red disabled">
      <input name="" type="button" onclick="hideUplHtml('htmldiv')"value="取消" class="btn btn04 font14 mar-l10">
    </div>
  </div>
</div>
</body>
</html>