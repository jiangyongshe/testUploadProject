var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=15,beginTime="",endTime="",adStatus="",adNumber="";
$(function(){
	$("#headerTitle").text("查询广告");
	currError=currErrorArray(chineseError,englishError,twError);
	initMescroll();//初始化下拉控件
	addWhereQuery();
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("page.num="+page.num);
	// 加载广告数据
	loadADData({pageNo:page.num,
		 pageSize:pageSize,
		 begin_time:beginTime,
		 end_time:endTime,
		 order_status:adStatus,
		 serial_number:adNumber
	});
}


/**
 * 加载广告数据
 * @param obj.page 页码
 * @param obj.servial_number 订单编号
 * @param obj.begin_time 播放开始时间，时:分:秒 hh:mm:ss
 * @param obj.end_time 播放结束时间，时:分:秒 hh:mm:ss
 * @param obj.order_status 订单状态
 * @returns
 */
function loadADData(obj){
	jsonAjax('/'+language+'/AD/query.do',obj,function(res){
		if(res.data==null||res.data==[]){
			mescroll.endSuccess(0);
			return;
		}
		mescroll.endSuccess(res.data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
		var data = res.data;
		if(data&&data.length>0){
			//联网成功的回调,隐藏上拉加载的状态
			var listDom=document.getElementById("dataList");
			for(var i=0;i<data.length;++i){
				var fileType="视频";//上传文件类型
				if(data[i].file_type=="2"){
					fileType="图文模板";
				}else if(data[i].file_type=="3"){
					fileType="图片";
				}
				var str='<div class="ggcx-tit pad-b5 font13">';
				str+=advertiseNameShow(data[i]);
				str+='<b class="fr col-fff">'+data[i].order_status+ '</b>';
				str+='</div>';
				str+='<div class="pad-t5">';
				str+='<p class="dis-in width49">店铺编号：'+data[i].advertiser_id+'</p>';
				str+='<p class="dis-in width49">设备编号：'+data[i].device_id+'</p>';
				str+='<p class="">广告编号：'+data[i].serial_number+'</p>';
				str+='<p class="">播放时段：'+data[i].begin_time+'-'+data[i].end_time+'</p>';
				str+='<p class="dis-in width49">价格（元/天）：'+data[i].price+'</p>';
				str+='<p class="dis-in width49">播放类型：'+fileType+'</p>';
				str+='<p class="dis-in width49">开始日期：'+data[i].play_begin_time+'</p>';
				str+='<p class="dis-in width49">结束日期：'+data[i].play_end_time+'</p>';
				str+='</div>';

				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
		}
	},
	function(){});
}
function advertiseNameShow(obj){
	// 视频名称 视频路径
	var videoName="",videoPath="";
	switch(obj.order_status){
	case '申请中':
	case '审核不通过':
	case '已取消':
	case '已关闭':
		videoPath = obj.notPassVideoPath;
		break;
	default:
		videoPath = obj.passVideoPath;
	}
	// 返回元素
	if(videoPath){
		if(obj.file_type==1){
			return '<a href="#" onclick="javascript:playVideo(\''+videoPath+'\')" class="yellow"><i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>查看上传广告</a>';
		}else{
			return '<a href="'+videoUrl+videoPath+'" class="yellow"><i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>查看上传广告</a>';
		}
	}else{
		return '<a class="yellow"><i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>未上传广告</a>';
	}
 }
/**
 * 搜索按钮
 * @returns
 */
function searchBtn(){
	// 获取播放时段
	var timeQuantum = $('#timeQuantum').find('option:selected').text().trim();
	// 获取广告编号
	adNumber = $('#adNumber').val().trim();
	// 获取广告状态
	adStatus = $('#adStatus').find('option:selected').val().trim();
	if(timeQuantum&&timeQuantum.indexOf('-')!=-1){
		beginTime = timeQuantum.split('-')[0];
		endTime = timeQuantum.split('-')[1];
	}
	scrollCommonMethod();//公共下拉刷新条件筛选
}

//增加订单查询条件
function addWhereQuery(){
  var html='<li>';
  html+='<span class="pos-a screen-list-bt">广告编号</span>';
  html+='<input type="text" name="" id="adNumber" class="wenb03 width100" placeholder="请输入广告编号" />';
  html+='</li>';
  html+='<li>';
  html+='<span class="pos-a screen-list-bt">播放时段</span>';
  html+='<select name="" id="timeQuantum" class="xlb01 width100">';
  html+='  <option>全部</option>';
  html+='  <option>18:00:00-19:00:00</option>';
  html+='  <option>18:00:00-19:00:00</option>';
  html+='  <option>19:00:00-20:00:00</option>';
  html+='  <option>20:00:00-21:00:00</option>';
  html+='  <option>21:00:00-22:00:00</option>';
  html+='  <option>22:00:00-23:00:00</option>';
  html+='</select>';
  html+='</li>';
  html+='<li>';
  html+='<span class="pos-a screen-list-bt">广告状态</span>';
  html+='<select name="" id="adStatus" class="xlb01 width100">';
  html+='  <option value="">全部</option>';
  html+='  <option value="123">申请中</option>';
  html+='  <option value="9">播放中</option>';
  html+='  <option value="10">等待播放</option>';
  html+='  <option value="11">已停播</option>';
  html+='  <option value="5">审核不通过</option>';
  html+='  <option value="6">已取消</option>';
  html+='  <option value="7">已关闭</option>';
  html+='</select>';
  html+='</li>';
  html+='<li>';
  html+='	<button name=""onclick="searchBtn()" type="button" class="btn btn07 bg-blue bor-rad font13 width100 mar-t10 search">搜索</button>';
  html+='</li>';
  $(".screen-list").html(html);
}

/**
 * 关闭视频
 * @returns
 */
function closeVideo(){
	var videoDIV = document.getElementById('videoDIV');
	var videoEle = videoDIV.getElementsByTagName("video")[0]; ;
	videoEle.pause();
	videoDIV.style.display = 'none';
}

/**
 * 播放视频
 * @param videoPath
 * @returns
 */
function playVideo(videoPath){
	videoPath = videoUrl+videoPath;
	var videoDIV = document.getElementById('videoDIV');
	if(videoDIV) videoDIV.parentNode.removeChild(videoDIV);
	var videoDIVNew = document.createElement('div');
	videoDIVNew.setAttribute('id','videoDIV');
	videoDIVNew.setAttribute('class','shade');
	videoDIVNew.innerHTML = '<div class="tanchu-sp" id="videoDiv1">'+
								'<a class="tanchu-close text-c" title="关闭" onclick="javascript:closeVideo(\'videoDIV\')">'+
								'<i class="fa fa-close" aria-hidden="true"></i></a>'+
								'<video poster="/chinese/images/black.jpg" class="" width=100% autoplay controls src="'+videoPath+'"></video>'+
							'</div>';
	document.getElementsByTagName('body')[0].appendChild(videoDIVNew);
	videoDIV = document.getElementById('videoDIV');
	var videoEle=videoDIV.getElementsByTagName("video")[0];
	videoEle.setAttribute('src',videoPath);
	// 居中
	document.getElementById('videoDiv1').style.top = window.innerHeight/4 + 'px';
	// 播放
	videoEle.play();
	videoDIV.style.display = 'block';
}

