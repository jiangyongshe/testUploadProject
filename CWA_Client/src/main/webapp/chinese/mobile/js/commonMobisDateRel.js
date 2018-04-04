var html='<link rel="stylesheet" href="'+languageMobile+'/css/mobiscroll-date.css">';
	html+='<script src="'+languageMobile+'/js/mobiscroll-date.js?t=1.0"></script>\n';// 全局变量
	html+='<script src="'+languageMobile+'/js/mobiscroll.js?t=1.0"></script>\n';
	// <!--弹出筛选-->
	html+='<div class="shade" id="tc-eject" style="display: ;">';
	html+='  <span class="cd-close2 text-c pad-l5" onclick="javascript:turnoff(\'tc-eject\')" title="关闭"></span>';
	html+='<ul class="screen-list searchEv">';
	html+='    <li>';
	html+='       <span class="pos-a screen-list-bt">开始时间</span>';
	html+='      <input type="text" name="user_age" id="user_age1" class="wenb03 width100" placeholder="请输入开始时间" />';
	html+='    </li>';
	html+='   <li>';
	html+='     <span class="pos-a screen-list-bt">结束时间</span>';
	html+='      <input type="text" name="user_age" id="user_age2" class="wenb03 width100" placeholder="请输入结束时间" />';
	html+='    </li>';
	html+='  <li>';
	html+='    <button name="" type="button" class="btn btn03 bg-blue font13 width100 mar-t10 query">搜索</button>';
	html+='  </li>';
	html+=' </ul>';
	html+='</div>';
 	
document.write(html);


var bgDt ="",edDt ="",flowType="";
function initQueryDate(){
	var currYear = (new Date()).getFullYear();	
	var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};
	opt.default = {
		theme: 'android-ics light', // 皮肤样式
		display: 'modal', // 显示方式
		mode: 'scroller', // 日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: true,
		nowText: "今天",
		startYear: currYear - 50, // 开始年份
		endYear: currYear + 10 // 结束年份
	};

	$("#user_age1").mobiscroll($.extend(opt['date'], opt['default']));
    $("#user_age2").mobiscroll($.extend(opt['date'], opt['default']));
}


window.onload=function(){
	if($("#user_age1").length>0){
		initQueryDate();// 初始化查询日期
	}
	//查詢篩選
	$(".query").bind("click",function(){
		if($(".flowType").length>0){
			flowType=$(".flowType").find("option:selected").val();
		}
		if($(".type").length>0){
			type=$(".type").find("option:selected").val();
		}
		bgDt=$("#user_age1").val();
		edDt=$("#user_age2").val();
		scrollCommonMethod();//公共下拉刷新条件筛选
	})
}