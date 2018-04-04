var page=1,pageSize=10;
$(function(){
	$("#headerTitle").text("播放历史");
	initMescroll();//初始化下拉控件
	appendDetailDiv();
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("page.num="+page.num);
	loadHistoryAdvertise({pageNo:page.num,pageSize:pageSize,beginTime:bgDt,endTime:edDt});
}

//加载用户视频播放历史记录
function loadHistoryAdvertise(obj){
	jsonAjax("/"+language+"/customer/queryVedioPlayHistory.do",obj,function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data==null||res.data==[]||res.data.list.length==0){
			mescroll.endSuccess(0);
			if(obj.pageNo==1){
				showEmplyDiv("亲，无播放记录","#dataList");
			}
			return;
		}
		mescroll.endSuccess(res.data.list.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
		if(res.data.list.length>0){
			var data=res.data,imgs="";
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i];
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				var str='<div class="ggdp-list1-tp pos-a">';
				str+='<span><img src="'+imagePath+imgs[0]+'" /></span>';
				str+='</div>';
				str+='<div class="ggdp-list1-nr">';
				str+='<p class="col-999 pad-t2">设备编号：<span class="col-666">'+dto.device_id+'</span></p>';
				str+='<p class="col-999">店铺名称：<span class="col-666">'+dto.shopName+'</span></p>';
				str+='<p class="col-999">广告编号：<span class="col-666">'+dto.serial_number+'</span></p>';
				str+='<p class="col-999">播放开始时间：<span class="col-666">'+dto.beginTime+'</span></p>';
				str+='<p class="col-999">播放结束时间：<span class="col-666">'+dto.endTime+'</span></p>';
				str+='</div>';
				
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
		}
	},function(){},"get");
}

//清空时间
function clearDate(){
	$(".beginTime").val("");
	$(".endTime").val("");
}
