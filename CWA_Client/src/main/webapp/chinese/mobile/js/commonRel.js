//获取当前手机端基础路径
var languageMobile = "/"+location.href.substring(location.href.indexOf(location.host)).split('/')[1]+'/mobile';


var html='<link rel="shortcut icon" href="'+languageMobile+'/images/logo.ico" type="image/x-icon">';
	html+='<link rel="stylesheet" href="'+languageMobile+'/css/font-awesome.min.css">';
	html+='<link rel="stylesheet" href="'+languageMobile+'/css/public.css">';
	html+='<link rel="stylesheet" href="'+languageMobile+'/css/global.css">';
	html+='<script src="'+languageMobile+'/js/jquery.min.js"></script>\n';
	html+='<script src="'+languageMobile+'/js/globalVar.js"></script>\n';// 全局变量
 	html+='<script src="'+languageMobile+'/js/common.js"></script>\n';// 公共方法
 	
document.write(html);