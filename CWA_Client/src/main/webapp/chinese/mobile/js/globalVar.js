/*********全局变量**********/

// 正整数
var REG_POSITIVE_INTEGER = /^[1-9]\d*$/;

//一周
var oneWeek=7;

//一月
var oneMonth=30;

//一年
var oneYear=365;

//最大广告购买数量
var maxBuyCount=20;

// 正实数（两位小数）
var REG_POSITIVE_REALNUMBER = /^([1-9]([0-9]+)?(\.[0-9]{1,2})?)$|^(0\.0[1-9]{1})$|^(0\.[1-9]{1}[0-9]{0,1})$/;

// 0到10
var REG_POSITIVE_ZERO_TO_TEN = /^([1-9](\.[0-9]{1,2})?)$|^(10.00)$|^(10.0)$|^(10)$|^(0\.0[1-9]{1})$|^(0\.[1-9]{1}[0-9]{0,1})$/;

// 手机号
var REG_MOBILE = /^1[3|4|5|7|8][0-9]\d{8}$/;

// 年月日日期格式化
var DATE_FORMAT_YTD = 'yyyy-MM-dd';

//年月日日期格式化
var DATE_FORMAT_YMD = 'yyyyMMdd';


// 年月日时分秒日期格式化
var DATE_FORMAT_YTDHMS = 'yyyy-MM-dd hh:mm:ss';
//年月日时分秒日期格式化
var DATE_FORMAT_YMDHMS = 'yyyyMMddhhmmss';

//电子邮箱
var REG_EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

//获取当前手机端基础路径
var languageMobile = "/"+location.href.substring(location.href.indexOf(location.host)).split('/')[1]+'/mobile';

//获取当前语言
var language =languageMobile.substring(1,languageMobile.lastIndexOf("/"));
//滑动变量
var myScroll;
//消息公告数组
var noticeArr=[];

//ws通知地址
var wsUrl="ws://10.0.0.133:55003/notice";
