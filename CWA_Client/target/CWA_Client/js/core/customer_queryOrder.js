var pageNo=1,count=5;

$(function(){
	initDate();
	loadOrderInfo({pageNo:pageNo,pageSize:count});//加载广告商品
})
//初始化时间控件
function initDate(){
	var currYear = (new Date()).getFullYear();
	var opt = {};
	opt.date = {
		preset : 'date'
	};
	opt.datetime = {
		preset : 'datetime'
	};
	opt.time = {
		preset : 'time'
	};
	opt.def = {
		theme : 'android-ics light', //皮肤样式
		display : 'modal', //显示方式 
		mode : 'scroller', //日期选择模式
		dateFormat : 'yyyy-mm-dd',
		lang : 'zh',
		showNow : true,
		nowText : "今天",
		startYear : currYear - 50, //开始年份
		endYear : currYear + 10
	//结束年份
	};

	$(".beginTime").mobiscroll(
			$.extend(opt['date'], opt['def']));
	$(".endTime").mobiscroll(
			$.extend(opt['date'], opt['def']));
}
//加载用户订单
function loadOrderInfo(obj){
	// 清空数据和页码
	$('.orderAll,#oPageTurn').empty();
	jsonAjax("/"+language+"/order/queryOrder.do",obj,function(res){
		if(res.data.list.length>0){
			var data=res.data,html="",date=new Date().format(DATE_FORMAT_YTD);
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],statusText="",imgs="",addr=dto.mailing_address;
				if(dto.order_status<4){
					statusText="申请中";
				}else if(dto.order_status==4){
					if(date<dto.startDate){
						statusText="等待播放";
					}else if(dto.startDate<=date&&date<=dto.endDate){
						statusText="播放中";
					}else if(date>dto.endDate){
						statusText="已停播";
					}
				}else{
					if(dto.order_status==5){
						statusText="审核不通过";
					}else if(dto.order_status==6){
						statusText="已取消";
					}else if(dto.order_status==7){
						statusText="已关闭";
					}
				}
				var fileType="视频";//上传文件类型
				if(dto.file_type=="2"){
					fileType="图文模板";
				}else if(dto.file_type=="3"){
					fileType="图片";
				}
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				if(addr!=null&&addr!=""){
					var addrList=dto.mailing_address.split("*");
					if(addrList[0]==addrList[1]){
						addr=dto.mailing_address.replace(addrList[0],"");
					}
				}
				
				html+='<li>';
				html+='  <div class="data-list-b pos-r">';
				html+='    <span class="data-list-b1"><img src="'+imagePath+imgs[0]+'" /></span>';
				html+='    <span class="data-list-b2 red">'+dto.shop_name+'</span>';
				html+='    <div class="dian-xq">';
				html+='      <p class="pos-a dian-close text-c" onclick="turnoffByCss(this)"><i class="fa fa-close" aria-hidden="true"></i></p>';
				html+='      <p><b>店铺名称：</b>'+dto.shop_name+'</p>';
				html+='      <p><b>详细地址：</b>'+addr.replace(/\*/g,"").replace(/&/g,"")+'</p>';
				html+='      <p class="dian-xq-img">';
				for (var j = 0; j < imgs.length; j++) {
					html+='<img src="'+imagePath+imgs[j]+'" onclick="showPicPopup(this.cloneNode(true),event)"/>';
				}
				html+='      </p>';
				html+='    </div>';
				html+='  </div>';
				html+='  <div class="data-list-c col-999">';
				html+='    <p>设备编号：<span>'+dto.device_id+'</span></p>';
				html+='    <p>播放类型：<span>'+fileType+'</span></p>';
				html+='    <p>广告名称：'+(dto.adName==null?"":dto.adName)+'</p>';
				html+='    <p>播放时段：<span>'+dto.idle_time+'</span></p>';
				html+='    <p>播放周期：'+dto.days+'天</p>';
				html+=' 	<p>支付费用：<span class="">￥'+dto.sumPrice+'</span>元</p>';
				if(dto.order_status==5){
					html+='		<p class="red">驳回原因：<span>'+dto.result+'</span></p>';
				}
				html+='  </div>';
				html+='  <div class="data-list-d col-999 pos-r">';
				html+='    <p>订单状态：<span class="">'+statusText+'</span></p>';
				html+='    <p>播放开始日期：'+dto.startDate+'</p>';
				html+='    <p>播放结束日期：'+dto.endDate+'</p>';
				html+='   <div class="ggdd-ckrq ggdd-ckrq2 interDiv">';
				html+='  	<span class="btn btn03 bg-orange" onclick="queryEffectualTimeByOrderNo({orderNo:\''+dto.serial_number+'\'})">有效时段</span>';
				if(dto.order_status==4&&dto.order_type==2){
					html+='    <span class="btn btn03 bg-999" data-orNo="'+dto.serial_number+'" onclick="cancerInterCut(this)">取消插播</span>';
				}else if(dto.order_status==4&&dto.order_type==3){
					html+='<span class="btn btn03 bg-999 disabled">已取消插播</span>'; 
				}
				html+='    </div><p>广告视频：';
				if(dto.order_status>=4){
					if(dto.order_status==5){
						html+='  <a href="/'+language+'/forward/updateOrUploadVideo.do?type=u&adNo='+dto.serial_number+'&fileType='+dto.file_type+'" class="red"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
					}
					html+='<a href="/'+language+'/forward/lookVideo.do?type=q&adNo='+dto.serial_number+'" class="red"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a> ';
				}else{
					if(dto.order_status==2){
						html+='  <a href="/'+language+'/forward/updateOrUploadVideo.do?adNo='+dto.serial_number+'&isInterCut=2&fileType='+dto.file_type+'" class="red"><i class="fa fa-upload" aria-hidden="true"></i> 上传</a> ';
					}else if(dto.order_status==3){
						html+='  <a href="/'+language+'/forward/updateOrUploadVideo.do?type=u&adNo='+dto.serial_number+'&fileType='+dto.file_type+'" class="red"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
						html+='| <a href="/'+language+'/forward/lookVideo.do?type=q&adNo='+dto.serial_number+'&fileType='+dto.file_type+'" class="red"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a> ';
					}else{
						html+=' <a href="/'+language+'/forward/confirmOrder.do?checkTimes='+dto.startDate+'@'+dto.endDate+'&checkAdvertiseId='+dto.id+'&deviceId='+dto.device_id+'&timeInterval='+dto.idle_time+'&orderNo='+dto.serial_number+'&fileType='+dto.file_type+'&pay=1&sumPrice='+dto.sumPrice+(dto.order_type==2?'&isInterCut=2"':'"')+'class="red">未支付,去支付</a> ';
					}
				}
				html+='	</p>';
				html+='  </div>';
				html+='</li>';
			}
			$(".orderAll").append(html);//展示列表数据
			pageNumber(data.totalRecords,obj,loadOrderInfo,count,'o');//分页
		}else{
			if(obj.pageNo==1){
				showEmplyDiv("无订单记录,<a href='/"+language+"/forward/customerAdvertise.do' class='red'>去下单</a>",".orderAll");
			}
		}
	},function(){},"get");
}
function search(){
	var playIdle=$(".playIdle").find("option:selected").text();
	var orderStatus=$(".orderStatus").find("option:selected").val();
	var adName=$(".adName").val();
	if(playIdle=="全部"){
		playIdle="";
	}
	loadOrderInfo({
		pageNo:pageNo,
		pageSize:count,
		playIdle:playIdle,
		orderStatus:orderStatus,
		adName:adName
	});
}
var orderNo="";
function queryEffectualTimeByOrderNo(obj){
	if(obj.orderNo!=null&&obj.orderNo!=undefined&&obj.orderNo!=""){
		orderNo=obj.orderNo;
	}else{
		obj.orderNo=orderNo;
	}
	jsonAjax("/"+language+"/order/queryEffectualTimeByOrderNo.do",obj,function(res){
		if(res.data!=null&&res.data!=[]){
			var html="",data=res.data,date=new Date().format(DATE_FORMAT_YTD);
			html+='<tr>';
			html+='  <th>时间</th>';
			html+='  <th>状态</th>';
			html+='</tr>';
			for (var i = 0; i < data.length; i++) {
				var status="未播放";
				if(new Date(data[i].play_date.replace(/-/g, "/"))<new Date(date.replace(/-/g, "/"))){
					status="已播放";
				}else if(data[i].play_date==date){
					status="正在播放";
				}
				html+='<tr>';
				html+='  <td>'+data[i].play_date+'</td>';
				html+='  <td><span class="green">'+status+'</span></td>';
				html+='</tr>';
			}
			$("#timeTable").html("");
			$("#timeTable").html(html);
			$("#shiduandiv").show();
		}
	},function(){},"get");
}
//有效时段搜索按钮
function seachEffectualTimeBtn(){
	var beginTime=$(".beginTime").val();
	var endTime=$(".endTime").val();
	
	queryEffectualTimeByOrderNo({beginTime:beginTime,endTime:endTime});
	
}
//取消插播
function cancerInterCut(obj){
	showConfimTip("提示","确认取消插播吗？",function(){
		var orNo=$(obj).attr("data-orNo");
		jsonAjax("/"+language+"/order/cancerInterCut.do",{orderNo:orNo},function(res){
			if(res.success){
				showJudegTip("success","提示","取消插播成功!");
				$("#successdiv").remove();
				$(obj).parents(".interDiv").append('<span class="btn btn03 bg-999 disabled">已取消插播</span>');
				$(obj).remove();
			}else{
				showJudegTip("fail","提示",res.data);
			}
		},function(){});
	})
}
//清空时间
function clearDate(){
	$(".beginTime").val("");
	$(".endTime").val("");
}
