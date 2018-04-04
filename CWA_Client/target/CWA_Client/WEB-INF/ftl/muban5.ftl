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
	left: 20px;
	bottom: 20px;
	right: 20px;
	overflow: hidden;
}
.left img {
	width: 100%;
	max-height: 360px;
}
.right {
	position: absolute;
	left: 20px;
	right: 20px;
	top: 20px;
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
	top: 45px;
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
  <div class="right">
    <h2 class="font16" id="title">
   	 ${title}
    </h2>
    <div class="record_list">
    <marquee align="left" id="context" height="100%" behavior="scroll" direction="up" loop="-1" scrollamount="1" scrolldelay="1" class="record_list">
      ${context} 
	</marquee>
	 </div>
  </div>
  <end />
</body>
</html>