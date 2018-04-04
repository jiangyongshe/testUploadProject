var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var mescroll,isDelete=false/*删除标识 如果true 则重新加载数据*/;

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("page.num="+page.num);
	if(page.num>1){
		$(".hideDiv").show();
	}
	if(isDelete){location.reload();return;};
	loadShoppCartInfo(page.num, 10);//加载广告商品
}

$(function(){
	//创建MeScroll对象
	mescroll = initMeScroll("mescroll", {
		down:{
			auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
			callback:function(){
				
			}//下拉刷新的回调
		},
		up: {
			auto:true,//初始化完毕,是否自动触发上拉加载的回调
			isBoth: true, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
			callback: upCallback //上拉加载的回调
		}
	});
	
	//禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
	document.ondragstart=function() {return false;}
})
//加载广告商品
function loadShoppCartInfo(pageNo,pageSize){
	jsonAjax("/"+language+"/shoppCart/queryShoppCart.do",{pageNo:pageNo,pageSize:pageSize},function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data.list==null||res.data.list.length==0){
			mescroll.endSuccess(0);
			if(pageNo==1){
				$(".ggtf-gm").hide();
				showEmplyDiv("抱歉，购物车为空","#dataList ul");
			}
			return;
		}
		mescroll.endSuccess(res.data.list.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
		if(res.data!=null&&res.data!=[]){
			var data=res.data,pageMenu='',html="";
			disCount=res.msg;
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],imgs="",addr=dto.mailing_address,price=dto.price,length=dto.ad_length;
				//价格
				if(dto.file_type=="2"){
					price=dto.html_price;
					length=dto.html_length;
				}else if(dto.file_type=="3"){
					price=dto.pic_price;
					length=dto.pic_length;
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
				html+='  <div class="data-list-a"><label class="checkbox"><input type="checkbox" data-id="'+dto.advertiser_id+'" data-shoppId="'+dto.id+'" name="checkbox" class="checkAd" ><i>✓</i></label></div>';
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
				html+='    <p>设备编号：<span class="deviceId">'+dto.device_id+'</span></p>';
				html+='		<p>播放类型：<select name="" class="dis-in xlb08 fileType" data-htmlPrice="'+dto.html_price+'" data-htmlLength="'+dto.html_length+'" data-picPrice="'+dto.pic_price+'" data-picLength="'+dto.pic_length+'" data-videoPrice="'+dto.price+'" data-videoLength="'+dto.ad_length+'">';
				html+='			<option value="1" '+(dto.file_type=="1"?'selected = "selected"':'')+'>视频</option>';
				html+='			<option value="3" '+(dto.file_type=="3"?'selected = "selected"':'')+'>图片</option>';
				html+='			<option value="2" '+(dto.file_type=="2"?'selected = "selected"':'')+'>图文模板</option>';
				html+='</select></p>';
				html+='    <p>设备播放时段：<span id="timeInterval">'+dto.begin_time+'-'+dto.end_time+'</span></p>';
				html+='    <p>广告时长：<span class="adLength">'+length+'</span>秒</p>';
				html+='  </div>';
				html+='<div class="data-list-d col-999">';
				html+='<p>最低循环播放次数：'+dto.play_number+'条</p><p>价格：<span class="red">￥<span class="adPrice">'+price+'</span></span> 元/天</p>';
				html+='<p>费用：<span class="red sumPrice">￥'+dto.total_price+'</span>  元</p>';
				html+='<p class="pad-t7 playAndCycleP"><span class="dis-in">播放周期：</span>';
				/*html+='<input type="number" min="1" max="999" class="dis-in wenb10 playCycle" value="'+(dto.playCycle==null?'1':dto.playCycle)+'" placeholder="" />';
				html+='<select name="" class="dis-in xlb07 mar-l5 cycleType">';
				html+='	<option value="m" '+(dto.cycleType==2?'selected = "selected"':'')+'>月</option>';
				html+='	<option value="y" '+(dto.cycleType==3?'selected = "selected"':'')+'>年</option>';
				html+='	<option value="w" '+(dto.cycleType==1?'selected = "selected"':'')+'>周</option></select>';
				html+='<span class="dis-in mar-l10">广告折扣 <em class="red disCount">'+(dto.disCount==null?'--':dto.disCount)+'</em> 折</span>';
				*/
				html+='<input type="text" data-playNumber='+dto.play_number+' placeholder="年/月/日" value="'+dto.play_begin_time+'" class="workinput wicon dt bgDate" readonly /> - <input type="text" placeholder="年/月/日" readonly class="workinput wicon dt edDate" value="'+dto.play_end_time+'">';
				html+='</p>';
				html+='<a href="#" onclick="reject('+dto.id+',this)" class="pos-a data-list-shan delete"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</a>';
				html+='</div></li>';
			}
			$("#dataList ul").append(html);
			createDateControl();//绑定时间控件
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}

//剔除购物车
function reject(id,obj){
	isDelete=true;
	var objs=$("input[type='checkbox']:checked").not("#ckAll"),bl=false;//得到所有选中数据
	if(id==undefined||id==null||id==""){
		id="";
		for (var i = 0; i < objs.length; i++) {
			id+=$(objs[i]).attr("data-shoppId")+",";
		}  
		if(id==""){
			showJudegTip("fail","提示","请选择要删除的广告！");
			return;
		}
		bl=true;
		id=id.substring(0,id.length-1);
	}
	jsonAjax("/"+language+"/shoppCart/reJectShoppCart.do",{cartId:id},function(res){
		if(res.respCode=="10000"){
			if(bl){
				for (var i = 0; i < objs.length; i++) {
					$(objs[i]).parents("li").remove();
				}  
				$("#buyCarCount").text(parseInt($("#buyCarCount").text())-objs.length);
			}else{
				$(obj).parents("li").remove();
				$("#buyCarCount").text(parseInt($("#buyCarCount").text())-1);
			}
			if($("ul li").length==0){
				showEmplyDiv("抱歉，购物车为空","#dataList ul");
			}
			showJudegTip("SUCCESS","提示","删除成功");
			//startBtn("commitUpdate");
		}else{
			$(".error").html(res.respMessge);//注册回调显示
			//startBtn("commitUpdate");
		}
	},function(){});
}
