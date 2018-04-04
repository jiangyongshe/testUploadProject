var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var mescroll, addr="";

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("page.num="+page.num);
	loadAdvertiseInfo(page.num, 10);
}
function initMescroll(){
	//创建MeScroll对象
	mescroll = initMeScroll("mescroll", {
		down:{
			auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
			callback:function(){
				
			}//下拉刷新的回调
		},
		up: {
			auto:true,//初始化完毕,是否自动触发上拉加载的回调
			isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
			callback: upCallback //上拉加载的回调
		}
	});
}

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	initAddr();//加载省市区
	$(".advArea select").bind("change",function(){//省市区条件查询改变
		var province=$(".advArea select[name='province']").find("option:selected").text();
		var city=$(".advArea select[name='city']").find("option:selected").text();
		var area=$(".advArea select[name='area']").find("option:selected").text();
		var town=$(".advArea select[name='town']").find("option:selected").text();
		if($(this).attr("name")=="city"){//改变城市
			if(city.indexOf("请选择")>0){
				addr=province;
			}else{
				addr=province+"*"+city;
			}
		}else if($(this).attr("name")=="area"){//改变地区
			if(area.indexOf("请选择")>0){
				addr=province+"*"+city;
			}else{
				addr=province+"*"+city+"*"+area;
			}
		}else if($(this).attr("name")=="town"){//改变街道
			if(town.indexOf("请选择")>0){
				addr=province+"*"+city+"*"+area;
			}else{
				addr=province+"*"+city+"*"+area+"*"+town;
			}
			
		}else{
			if(province.indexOf("请选择")>0){
				addr="";
			}else{
				addr=province;
			}
		}
		$("#dataList ul").html("");
		initMescroll();
		mescroll.scrollTo(0,100);
		checkSum();
	})
	initMescroll();//初始化下拉控件
	//禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
	document.ondragstart=function() {return false;}
	
	//加入购物车
	$(document).on("click",".joinCart",function(){
		joinCart();//加入购物车
	})
})


//加载广告商品
function loadAdvertiseInfo(pageNo,pageSize){
	jsonAjax("/"+language+"/customer/queryAdvertiseInfo.do",{pageNo:pageNo,pageSize:pageSize,mailingAddress:addr},function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data==null||res.data==[]){
			mescroll.endSuccess(0);
			return;
		}
		mescroll.endSuccess(res.data.list.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
		if(res.data!=null&&res.data!=[]){
			var data=res.data,pageMenu='';
			disCount=res.msg;
			var listDom=$("#dataList ul")[0];
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],html="",imgs="",addr=dto.mailing_address;
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				if(addr!=null&&addr!=""){
					var addrList=dto.mailing_address.split("*");
					if(addrList[0]==addrList[1]){
						addr=dto.mailing_address.replace(addrList[0],"");
					}
				}
				var str='<div class="data-list-a"><label class="checkbox"><input type="checkbox" data-id="'+dto.id+'" name="checkbox" class="checkAd" ><i>✓</i></label></div>';
				str+='<div class="data-list-b pos-r">';
				str+='<span class="data-list-b1"><img src="'+imagePath+imgs[0]+'" /></span>';
				str+='<span class="data-list-b2 red">'+dto.shop_name+'</span>';
				str+='<div class="dian-xq">';
				str+='<p class="pos-a dian-close text-c" onclick="turnoffByCss(this)"><i class="fa fa-close" aria-hidden="true"></i></p>';
				str+='<p><b>店铺名称：</b>'+dto.shop_name+'</p><p><b>详细地址：</b>'+addr.replace(/\*/g,"").replace(/&/g,"")+'</p>';
				str+='<p class="dian-xq-img">';
				for (var j = 0; j < imgs.length; j++) {
					str+='<img src="'+imagePath+imgs[j]+'" onclick="showPicPopup(this.cloneNode(true),event)"/>';
				}
				str+='</p>';
				str+='</div></div>';
				str+='<div class="data-list-c col-999"><p>设备编号：<span class="deviceId">'+dto.device_id+'</span></p>';
				str+='<p>播放类型：<select name="" class="dis-in xlb08 fileType" data-htmlPrice="'+dto.html_price+'" data-htmlLength="'+dto.html_length+'" data-picPrice="'+dto.pic_price+'" data-picLength="'+dto.pic_length+'" data-videoPrice="'+dto.ad_price+'" data-videoLength="'+dto.ad_length+'">';
				str+='<option value="1">视频</option><option value="3">图片</option><option value="2">图文模板</option></select></p><p>设备播放时段：<span id="timeInterval">'+dto.idle_time+'</span></p><p>广告时长：<span class="adLength">'+dto.ad_length+'</span>秒</p></div>';
				str+='<div class="data-list-d col-999 pos-r">';
				str+='<p>最低循环播放次数：'+dto.play_number+'条</p><p>价格：<span class="red">￥<span class="adPrice">'+dto.ad_price+'</span></span> 元/天</p><p>费用：<span class="red sumPrice">￥--</span>  元</p>';
				str+='<span class="btn btn03 bg-orange ggdd-ckrq" onclick="interCut(this)">插播</span>';
				str+='<p class="pad-t7"><span class="dis-in">播放日期：</span>';
				/*str+='<input type="number" class="dis-in wenb10 playCycle" placeholder=""  min="1" max="999"/>';
				//str+='<select name="" class="dis-in xlb07 mar-l5 cycleType"><option value="m">月</option><option value="y">年</option><option value="w">周</option></select>';
				str+='<span class="dis-in mar-l10">广告折扣 <em class="red disCount">--</em> 折</span>';*/
				var d=new Date();
				d.setMonth(d.getMonth() +1);//默认最大日期
				str+='<input type="text" data-playNumber='+dto.play_number+' readonly value="'+miDate+'" placeholder="年/月/日" class="workinput wicon dt bgDate" /> - <input type="text" value="'+d.format(DATE_FORMAT_YTD)+'" placeholder="年/月/日" readonly class="workinput wicon dt edDate">';
				str+='</p></div>';
				
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
			if($("#dataList li").length>6){
				$(".secondDiv").show();
			}
			//if(!disCountArr){loadDisCountAndNum();}//加载折扣
			createDateControl();//绑定事件控件
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}
function submit(){
	checkSum();
	var objs=$("#dataList input[type='checkbox']:checked");//得到所有选中数据
	if(objs.length>0){
		if(objs.length>3){
			showJudegTip("normal","提示","每次下单不超过3单！");
			return;
		}
		window.location.href="/"+language+"/forward/confirmOrder.do?checkAdvertiseId="+checkAdvertiseId+"&deviceId="+deviceIds+"&timeInterval="+timeInterval+"&fileType="+fileType+"&checkTimes="+checkTimes;
	}else{
		showJudegTip("normal","提示","请选择广告播放时段！");
	}
}

function interCut(obj){
	var ca=$(obj).parents("li").find("input[type='checkbox']").attr("data-id");//广告商编号
	var di=$(obj).parents("li").find(".deviceId").text();//设备编号
	var ti=$(obj).parents("li").find("#timeInterval").text();//播放时段
	var ft=$(obj).parents("li").find(".fileType :selected").val();//播放类型
	window.location.href="/"+language+"/forward/confirmOrder.do?checkAdvertiseId="+ca+"&deviceId="+di+"&timeInterval="+ti+"&isInterCut=2"+"&fileType="+ft;
}

//加入购物车
function joinCart(){
	checkSum();
	var objs=$("#dataList input[type='checkbox']:checked").not("#ckAll");//得到所有选中数据
	if(objs.length>0){
		jsonAjax("/"+language+"/shoppCart/joinShoppCart.do",{checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,checkTimes:checkTimes,fileType:fileType},function(res){
			if(res.respCode=="10000"){
				showJudegTip("SUCCESS","加入购物车","加入成功，您可要通过点击 <a href='/"+language+"/forward/shoppCart.do' class='red'>我的购物车</a> 完成支付");
				$("#buyCarCount").text(parseInt($("#buyCarCount").text())+checkAdvertiseId.split(",").length);//改变购物车数量
				//startBtn("commitUpdate");
			}else{
				$(".error").html(res.respMessge);//注册回调显示
				//startBtn("commitUpdate");
			}
		},function(){});
	}else{
		showJudegTip("normal","提示","请选择广告播放时段！");
	}
}
