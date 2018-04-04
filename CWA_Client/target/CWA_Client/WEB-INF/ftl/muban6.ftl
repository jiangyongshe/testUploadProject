<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>翔云播</title>
<style>
* {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	padding: 0;
	margin: 0;
}
html, body {
	margin:0;
	padding:0;
	height: 100%;
}
fieldset,img { 
	border:0;
}
ol,ul {
	list-style:none;
}
body{
	font-family: Constantia, Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
	background: #fff;
	font-size: 15px;
	color: #aa3e03;
	overflow-x: hidden;
}
.ie7 body{
	overflow:hidden;
}
.cb-slideshow,
.cb-slideshow:after { 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
	right: 0;
	bottom: 0;
    z-index: 0; 
}
.cb-slideshow li { 
    width: 100%;
    height: 100%;
}
.cb-slideshow li span { 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
	right: 0;
	bottom: 0;
    color: transparent;
    background-position: center center;
    background-repeat: no-repeat;
	background-size: contain;
    opacity: 0;
    z-index: 0;
	-webkit-backface-visibility: hidden;
	-webkit-animation-name: imageAnimation;
    -moz-animation-name: imageAnimation;
    -o-animation-name: imageAnimation;
    -ms-animation-name: imageAnimation;
    animation-name: imageAnimation; 
	-webkit-animation-duration: ${adLength}s; /*图片播放总时间*/
    -moz-animation-duration: ${adLength}s; /*图片播放总时间*/
    -o-animation-duration: ${adLength}s; /*图片播放总时间*/
    -ms-animation-duration: ${adLength}s; /*图片播放总时间*/
    animation-duration: ${adLength}s;  /*图片播放总时间*/
	-webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -o-animation-timing-function: linear;
    -ms-animation-timing-function: linear;
    animation-timing-function: linear; 
	-webkit-animation-iteration-count: 1;
    -moz-animation-iteration-count: 1;
    -o-animation-iteration-count: 1;
    -ms-animation-iteration-count: 1;
    animation-iteration-count: 1; 
	-webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -o-animation-delay: 0s;
    -ms-animation-delay: 0s;
    animation-delay: 0s; 
}
<#list imgList as img>
	.cb-slideshow li:nth-child(${img_index+1}) span { 
	    background-image: url(${img});  
	    -webkit-animation-delay: ${adLength/imgList?size*img_index}s;
	    -moz-animation-delay: ${adLength/imgList?size*img_index}s;
	    -o-animation-delay: ${adLength/imgList?size*img_index}s;
	    -ms-animation-delay: ${adLength/imgList?size*img_index}s;
	    animation-delay: ${adLength/imgList?size*img_index}s; 
	}
</#list>


/* 图片谈入谈出动画 */
@-webkit-keyframes imageAnimation { 
    <#if imgList?size=5>
	    0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
        16% { opacity: 1 }
    	24% { opacity: 0 }
    	100% { opacity: 0 }
   	<#elseif imgList?size=4>
   		0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	24% { opacity: 1 }
	    36% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=3>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	32% { opacity: 1 }
	    48% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=2>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	40% { opacity: 1 }
	    60% { opacity: 0 }
	    100% { opacity: 0 }
    <#else>
       	0% { opacity: 1;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	99% { opacity: 1 }
	    100% { opacity: 1 }
	    100% { opacity: 1 }
    </#if>
}
@-moz-keyframes imageAnimation { 
    <#if imgList?size=5>
	    0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
        16% { opacity: 1 }
    	24% { opacity: 0 }
    	100% { opacity: 0 }
   	<#elseif imgList?size=4>
   		0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	24% { opacity: 1 }
	    36% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=3>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	32% { opacity: 1 }
	    48% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=2>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	40% { opacity: 1 }
	    60% { opacity: 0 }
	    100% { opacity: 0 }
    <#else>
       	0% { opacity: 1;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	99% { opacity: 1 }
	    100% { opacity: 1 }
	    100% { opacity: 1 }
    </#if>
}
@-o-keyframes imageAnimation { 
    <#if imgList?size=5>
	    0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
        16% { opacity: 1 }
    	24% { opacity: 0 }
    	100% { opacity: 0 }
   	<#elseif imgList?size=4>
   		0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	24% { opacity: 1 }
	    36% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=3>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	32% { opacity: 1 }
	    48% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=2>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	40% { opacity: 1 }
	    60% { opacity: 0 }
	    100% { opacity: 0 }
    <#else>
       	0% { opacity: 1;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	99% { opacity: 1 }
	    100% { opacity: 1 }
	    100% { opacity: 1 }
    </#if>
}
@-ms-keyframes imageAnimation { 
    <#if imgList?size=5>
	    0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
        16% { opacity: 1 }
    	24% { opacity: 0 }
    	100% { opacity: 0 }
   	<#elseif imgList?size=4>
   		0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	24% { opacity: 1 }
	    36% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=3>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	32% { opacity: 1 }
	    48% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=2>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	40% { opacity: 1 }
	    60% { opacity: 0 }
	    100% { opacity: 0 }
    <#else>
       	0% { opacity: 1;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	99% { opacity: 1 }
	    100% { opacity: 1 }
	    100% { opacity: 1 }
    </#if>
}
@keyframes imageAnimation { 
    <#if imgList?size=5>
	    0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
        16% { opacity: 1 }
    	24% { opacity: 0 }
    	100% { opacity: 0 }
   	<#elseif imgList?size=4>
   		0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	24% { opacity: 1 }
	    36% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=3>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	32% { opacity: 1 }
	    48% { opacity: 0 }
	    100% { opacity: 0 }
   	<#elseif imgList?size=2>
   	   	0% { opacity: 0;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	40% { opacity: 1 }
	    60% { opacity: 0 }
	    100% { opacity: 0 }
    <#else>
       	0% { opacity: 1;
	    -webkit-animation-timing-function: ease-in; }
	    8% { opacity: 1;
	         -webkit-animation-timing-function: ease-out; }
	   	99% { opacity: 1 }
	    100% { opacity: 1 }
	    100% { opacity: 1 }
    </#if>
}
.no-cssanimations .cb-slideshow li span{
	opacity: 1;
}
</style>
</head>

<body>
<ul class="cb-slideshow">
  <#list imgList as img>
  	<li><span></span></li>
   </#list>
</ul>
<div class="left" id="img" style="display:none">
 <#list imgList as img>
    	<img src="${img}" class="imgUpl"/>
  </#list>
 </div>
 <end />
</body>
</html>
