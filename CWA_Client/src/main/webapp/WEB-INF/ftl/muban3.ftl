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
	overflow: hidden;
}
body {
	font-family: "MicroSoft YaHei","\5FAE\8F6F\96C5\9ED1",Helvetica,serif;
	font-size: 13px;
	line-height: 21px;
	color: #666;
	background-color: #fff;
}
.font16 {
	font-size: 16px;
}

.left {
	position: absolute;
	right: 10px;
	top: 10px;
	bottom: 10px;
	width: 360px;
	overflow: hidden;
	text-align: center;
	align-items: center;
	justify-content: center;
	display: -webkit-flex;
}
.left img {
	display: inline-block;
	max-height: 500px;
	max-width: 360px;
}
.right {
	position: absolute;
	right: 390px;
	left: 15px;
	top: 10px;
	bottom: 0;
	overflow: hidden;
}
.right > h2 {
	padding-bottom: 15px;
	text-align: center;
	border-bottom: 1px solid #eee;
}
.record_list {
	position: absolute;
	left: 0;
	top: 38px;
	right: 0;
	bottom: 0;
	font-size: 14px;
	line-height: 24px;
}
.record_list p {
	text-indent: 2em;
}
</style>
</head>

<body>
  <div class="left" id="img">
    <img src="${imgUrl}"  id="imgUpl"/>
  </div>
  
  <div class="right">
    <h2 class="font16" id="title">
    	${title}
    </h2>
    <div class="record_list">
    <marquee align="left" height="100%" id="context" behavior="slide" direction="up" loop="-1" scrollamount="3" scrolldelay="1">
      ${context} 
	</marquee>
	</div>
  </div>
  <end />
</body>
</html>