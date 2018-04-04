var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var mescroll,pageSize=9,count=0,adName="";
var ty=getURLParam("type");
if(ty!="ios"){
	document.writeln('<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI"></script>');
}

function upCallback(page){
	//联网加载数据
	console.log("pageNo="+pageNo);
	loadRecommendAdvertiseInfo();
}

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	setTimeout(function(){bindSearchBtn();},100)//绑定搜索按钮
	advertiseSearchMethod(true);
	if(!getLocalStorage("first")&&getLocalStorage("accountId")){
		//queryNoticeList();//如果是登陆跳转首页时去查询未阅读公告
	}
})
//查询公告
function queryNoticeList(){
	jsonAjax("/"+language+"/customer/queryNoticeList.do",{},function(res){
		if(res.data&&res.data.length>0){
			noticeArr=res.data;
			showNoticeDiv();//显示公告
		}
		
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		isData=false;
	},"get");
}
function searchAdvertise(){
	adName=$("#inputSearch").val();
	scrollCommonMethod();
}

//加载广告商品
function loadRecommendAdvertiseInfo(){
	jsonAjax("/"+language+"/exclude/queryRecommendAd.do",{pageNo:pageNo,pageSize:pageSize,adName:adName,mailingAddress:addr,deviceIndustry:deviceIndustry},function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data==null||res.data.length==0){
			if($("#dataList dd").length==0){
				showEmplyDiv("没有搜索到广告！","#dataList");
			}
			isData=false;
			return;
		}
		//mescroll.endSuccess(res.data["data"].length);
		isData=(pageNo==Math.ceil(res.data.count/parseFloat(pageSize))?false:true);//如果当前页是最后一页则不加载
		if(res.data["data"]!=null&&res.data["data"].length>0){
			var data=res.data["data"];
			//var data=[{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":90,"device_id":"84209697c52a","serial_number":null,"name":"杨小贤甜品店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"12:00","end_time":"23:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"016757","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":89,"device_id":"84209697c547","serial_number":null,"name":"浩轩砂锅麻辣烫","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"10:00","end_time":"22:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"657674","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":87,"device_id":"8420969848a9","serial_number":null,"name":"葡萄园酒窖","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"08:30","end_time":"22:30","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"781942","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":86,"device_id":"8420969848b3","serial_number":null,"name":"MOOTEA末茶","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"11:00","end_time":"23:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180118/4992775103964224.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"537570","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":82,"device_id":"842096e6d4c4","serial_number":null,"name":"赵记甜品店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"12:00","end_time":"22:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"900632","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":78,"device_id":"84209697c54c","serial_number":null,"name":"颜珍药店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"09:00","end_time":"21:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"443038","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":77,"device_id":"84209698483c","serial_number":null,"name":"美宜佳北村分店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"08:00","end_time":"23:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"517134","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":72,"device_id":"84209697c531","serial_number":null,"name":"喜洋洋威尔斯店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"08:00","end_time":"23:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"506227","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null},{"pageSize":null,"pageNo":null,"rowNo":null,"advertiser_id":59,"device_id":"84209697c532","serial_number":null,"name":"美宜佳革新路分店","addr":null,"ad_length":"15","allPlayNumber":"30","begin_time":"07:30","end_time":"23:00","price":"12.00","play_begin_time":null,"play_end_time":null,"order_status":null,"recommed":null,"pics":"advertiserPic/20180116/5352480584597764.jpg,advertiserPic/20180116/5352480584597764.jpg","passVideoName":null,"notPassVideoName":null,"passVideoPath":null,"notPassVideoPath":null,"device_code":"518163","file_type":null,"lessPrice":null,"greaterPrice":null,"device_industry":null}];
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.length; i++) {
				var dto=data[i],imgs="";
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				
				
				var str='<p class="ggdp-bt">';
				str+='<img onclick="javascript:window.location.href=\'detail.html?checkAdvertiseId='+dto.advertiser_id+'&deviceId='+dto.device_id+'&timeInterval='+dto.begin_time+'-'+dto.end_time+'&fileType=1\'" src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'"/>';
				str+='</p>';
				str+='<p class="title">'+dto.name+'</p>';
			    
			    var liDom=document.createElement("dd");
				liDom.innerHTML=str;
				
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
		}else{
			if($("#dataList dd").length==0){
				showEmplyDiv("没有找到广告！","#dataList");
			}
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		isData=false;
		},"get");
}
