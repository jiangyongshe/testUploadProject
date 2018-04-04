var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var mescroll,isDelete=false,pageSize=9/*删除标识 如果true 则重新加载数据*/;

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	$("#headerTitle").text("购物车");
	$(".wcBtn").hide();
	loadShoppCartInfo();//初始化下拉控件
})
/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("pageNo="+pageNo);
	if(isDelete){isDelete=false;scrollCommonMethod();return;};//初始化下拉控件
	loadShoppCartInfo();//加载广告商品
}

//全选按钮click
function checkAllClick(obj){
	if(!obj.checked){return;}
	hideEmplyDiv();
	$("#dataList").html("");
	pageSize=10000;
	$(obj).prop("checked",false);
	isData=false;
	pageNo=1;
	loadShoppCartInfo(true);
}

//加载广告商品
function loadShoppCartInfo(isCheckAll){
	jsonAjax("/"+language+"/shoppCart/queryShoppCart.do",{pageNo:pageNo,pageSize:pageSize},function(res){
		if(res.data.list==null||res.data.list.length==0){
			if($("#dataList li").length==0){
				showEmplyDiv("亲，购物车是空的","#dataList");
				$("#payWay").hide();
			}
			isData=false;
			return;
		}
		//mescroll.endSuccess(res.data["data"].length);
		isData=(pageNo==Math.ceil(res.data.totalRecords/parseFloat(pageSize))?false:true);//如果当前页是最后一页则不加载
		if(res.data!=null&&res.data!=[]){
			var data=res.data,pageMenu='',html="";
			disCount=res.msg;
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],price=dto.price,imgs="",length=dto.ad_length;
				//价格
				if(dto.file_type=="2"){
					price=dto.html_price==null?0:dto.html_price;
					length=dto.html_length==null?0:dto.html_length;
				}else if(dto.file_type=="3"){
					price=dto.pic_price==null?0:dto.pic_price;
					length=dto.pic_length==null?0:dto.pic_length;
				}
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				var fileType="视频";//上传文件类型
				if(dto.file_type=="2"){
					fileType="图文模板";
				}else if(dto.file_type=="3"){
					fileType="图片";
				}
		      	var str='';
				str+='<span class="ggdp-list1-xz pos-a"><label class="checkbox"><input type="checkbox" data-id="'+dto.advertiser_id+'" data-timeInterval='+dto.begin_time+'-'+dto.end_time+' data-shoppId="'+dto.id+'" name="checkbox" class="checkAd" ><i>✓</i></label></span>';
				str+='<div class="ggdp-list1-tp pos-a" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')">';
				str+='<span><img src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'" /></span>';
				str+='<p>可投放广告位<b class="pad-l10">'+dto.toDaySell+'</b>条</p>';
				str+='</div>';
				
				str+='<div class="ggdp-list1-nr pos-r">';
				//str+='<span class="pos-a bfts">播放中：'+(dto.currPlayCount==null?0:dto.currPlayCount)+'条</span>';
				str+='<p class="">广告屏编号：<span class="">'+dto.device_code+'</span><span class=" hide deviceId">'+dto.device_id+'</span></p>';
				str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
				str+='<div class="pos-r pltf-dz">';
				//dto.mailing_address.substring(0,findCharIndex(dto.mailing_address,"*",3)).replace(/\*/g,"").replace(/&/g,"")
				str+='<span class="">'+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'</span>';
				str+='<a href="javascript:;" onclick="showAddMap(\''+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'\',\''+dto.mailing_address.split("*")[1]+'\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
				str+='</div>';
				str+='</div>';
				
				/*str+='<div class="ggdp-list1-nr pos-r">';
				str+='<p class="">广告屏编号：<span class="">'+(dto.device_code==null?'':dto.device_code)+'</span><span class="col-666 hide deviceId">'+dto.device_id+'</span></p>';
				str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
				str+='<div class="pos-r pltf-dz">';*/
				//str+='<span class="">'+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'</span>';
				//str+='<a href="javascript:;" onclick="showAddMap(\''+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'\',\''+dto.mailing_address.split("*")[1]+'\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
				/*str+='</div>';
				str+='</div>';
				str+='<div class="shanchu-btn" onclick="reject('+dto.id+',this)"><span class="pos-a shanchu-btn2 font14"><i class="fa fa-trash-o pad-r5" aria-hidden="true"></i>删除</span></div>';
				str+='  </div>';
				str+='<div class="clear fl width100 pad-t10 pad-b10 pos-r completeDiv">';
				str+='<p class="fl width56"><span class="dis-in ggdd-btl">投放类型</span><span class="dis-in ggdd-btr">'+fileType+'</span></p>';
				str+=' <p class="fr width42"><span class="dis-in">单价</span><span class="dis-in fr text-r">'+price+'元/个</span></p>';
				str+='<p class="fl width56"><span class="dis-in ggdd-btl">投放数量</span><span class="dis-in ggdd-btr">'+dto.buyCount+'</span></p>';
				str+='<p class="fr width42"><span class="dis-in">投放天数</span><span class="dis-in fr text-r">'+(datedifference(dto.play_begin_time,dto.play_end_time)+1)+'天</span></p>';
				str+='</div>';
				
				var showBgTm=dto.play_begin_time,showEdTm=dto.play_end_time;
				if(new Date(showBgTm)<=new Date()){
					showBgTm=miDate;//最小日期
					if(new Date(showEdTm)<=new Date()){
						var dt=new Date(showBgTm);
						dt.setMonth(dt.getMonth() +1);
						//默认最大日期
						showEdTm=dt.format(DATE_FORMAT_YTD);
					}
				}
				str+='<div class="updtDiv hide">';
				str+=' <p class="pad-t8 gwc-dw">';
				str+='<span class="dis-in font14">投放日期：</span>';
				str+='<span class="dis-in riqi pos-r">';
				str+='<input type="text" min='+miDate+' max='+maDate+' data-playNumber='+dto.play_number+' readonly value="'+showBgTm+'" placeholder="请选择开始时间" class="dis-in wenb02 dt bgDate" />';
				str+='  <i class="fa fa-angle-right pos-a" aria-hidden="true"></i>';
				str+='</span>';
				str+='<span class="dis-in pad-l5 pad-r5">-</span>';
				str+='<span class="dis-in riqi pos-r">';
				str+='<input type="text" min='+miDate+' max='+maDate+' value="'+showEdTm+'" placeholder="请选择结束时间" readonly class="dis-in wenb02 dt edDate">';
				str+='  <i class="fa fa-angle-right pos-a" aria-hidden="true"></i>';
				str+='</span>';
				str+=' </p>';
				str+='<p class="pad-t8 tflx">';
				str+='<span class="">投放类型：</span>';
				str+='<span class="dis-in tfsl fileType">';
				str+='<em class="'+(dto.file_type=="3"?'active':'')+'" data-val="1" data-price="'+(dto.pic_price==null?0:dto.pic_price)+'" data-length="'+(dto.pic_length==null?0:dto.pic_length)+'" value="3">图片</em>';
				str+='<em class="'+(dto.file_type=="1"?'active':'')+'" data-price="'+(dto.price==null?0:dto.price)+'" data-length="'+(dto.ad_length==null?0:dto.ad_length)+'" value="1">视频</em>';
				str+='</span>';
				str+='<span class="col-999 fr pad-t5 pad-r5 priceAndLength">';
				str+=' 单价：<em class="red font14"><span class="adPrice">'+price+'</span>元/</em>个';
				str+='</span>';
			    str+='</p>';
			    str+='<div class="pad-t10 tfsl-plus">';
			    str+='<span class="dis-in">投放数量：</span>';
			    str+='<div class="pos-r dis-in cpxq-mk-zl fr mar-r5">';
			    str+='<a href="javascript:;" class="minus2 pos-a subtract"><i class="fa fa-minus" aria-hidden="true"></i></a>';
			    str+='<input name="" type="text" class="wenb02 text-c buyCount" value="'+dto.buyCount+'">';
			    str+='<a href="javascript:;" class="plus2 pos-a add"><i class="fa fa-plus" aria-hidden="true"></i></a>';
			    str+='</div></div></div>';
			    str+='<div class="pad-t10 mar-t10 bor-t2 clear col-999 gwc-xg">';
			    str+='<span class="updt" onclick="updtBtn(this)"><i class="fa fa-pencil-square-o pad-r5" aria-hidden="true"></i>修改</span>';
			    //str+='<span class="hide complete" onclick="completeBtn(this)"><i class="fa fa-check-square-o pad-r5" aria-hidden="true"></i>完成</span>';
			    str+='<p class="red fr"><span class="dis-in">总额</span><span class="dis-in font16 pad-l20">¥ <span class="sumPrice">0</span></span></p>';
			    str+='</div>';*/
				var d=new Date();
				d.setDate(d.getDate() +oneWeek);//默认最大日期
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
				
				if($(".batchSelectDate .bgDate").length==0){
					var batchWin='<span class="dis-in">投放日期：</span>';
					batchWin+='<span class="dis-in riqi pos-r">';
					batchWin+='<input type="text" min='+miDate+' max='+maDate+' data-playNumber='+dto.play_number+' readonly value="'+miDate+'" placeholder="请选择开始时间" class="dis-in wenb02 dt bgDate" />';
					batchWin+='  <i class="fa fa-angle-right pos-a" aria-hidden="true"></i>';
					batchWin+='</span>';
					batchWin+='<span class="dis-in pad-l5 pad-r5">-</span>';
					batchWin+='<span class="dis-in riqi pos-r">';
					batchWin+='<input type="text" min='+miDate+' max='+maDate+' value="'+d.format(DATE_FORMAT_YTD)+'" placeholder="请选择结束时间" readonly class="dis-in wenb02 dt edDate">';
					batchWin+='  <i class="fa fa-angle-right pos-a" aria-hidden="true"></i>';
					batchWin+='</span>';
					btPicPrice=dto.pic_price;
					btPicLength=dto.pic_length;
					btAdPrice=dto.price;
					btAdLength=dto.ad_length;
					$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+Math.round(dto.pic_price*disCount)+'</span>元/</em>个');
					//$(".disPrice").html(dto.pic_price*disCount);
					$(".batchSelectDate").html(batchWin);
				}
			}
			createDateControl();//绑定时间控件
			//$(".disPrice").html($(".disPrice").html().substring(0,$(".disPrice").html().indexOf(".")+3));//截取
			initFee();
			if(isCheckAll){
				//$("#ckAll")[0].checked
				$("#dataList input[type='checkbox']").prop("checked",true);
				isData=false;
				checkSum();
			}
		}else{
			if($("#dataList li").length==0){
				showEmplyDiv("亲，购物车是空的","#dataList");
				$("#payWay").hide();
			}
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}
//修改
function updtBtn(obj){
	$(obj).hide();
	$(obj).parents("li").find(".updtDiv").show();
	$(obj).parents("li").find(".completeDiv").hide();
}
//完成
/*function completeBtn(obj){
	var sDate=$(obj).parents("li").find(".bgDate").val();//开始时间
	var eDate=$(obj).parents("li").find(".edDate").val();//结束时间
	var bCount=$(obj).parents("li").find(".buyCount").val();//购买数量
	var fType=$(obj).parents("li").find(".fileType .active").text();//播放类型
	var aPrice=$(objs[i]).parents("li").find(".adPrice").text();
	var str='<p class="fl width56"><span class="dis-in ggdd-btl">投放类型</span><span class="dis-in ggdd-btr">'+fType+'</span></p>';
	str+=' <p class="fr width42"><span class="dis-in">单价</span><span class="dis-in fr text-r price">'+aPrice+'元/个</span></p>';
	str+='<p class="fl width56"><span class="dis-in ggdd-btl">投放数量</span><span class="dis-in ggdd-btr">'+bCount+'</span></p>';
	str+='<p class="fr width42"><span class="dis-in">投放天数</span><span class="dis-in fr text-r">'+(datedifference(sDate,eDate)+1)+'天</span></p>';
	$(obj).parents("li").find(".completeDiv").html(str);
	$(obj).parents("li").find(".updtDiv").hide();
	$(obj).parents("li").find(".completeDiv").show();
}*/

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
			showJudegTip("fail","请选择要删除的广告！");
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
			if($("#dataList li").length==0){
				showEmplyDiv("亲，购物车是空的","#dataList");
				$("#payWay").hide();
			}
			showJudegTip("success","删除成功");
			checkSum();
			//startBtn("commitUpdate");
		}else{
			$(".error").html(res.respMessge);//注册回调显示
			//startBtn("commitUpdate");
		}
	},function(){});
}
function clearGWC(){
	showConfimTip("清空购物车","确定清空购物车吗？",function(){
		jsonAjax("/"+language+"/shoppCart/reJectShoppCart.do",{},function(res){
			if(res.respCode=="10000"){
				$("#dataList").html("");
				$("#buyCarCount").text(0);
				showEmplyDiv("亲，购物车是空的","#dataList");
				showJudegTip("success","购物车已清空");
				$("#successdiv").hide();
				checkSum();
				//startBtn("commitUpdate");
			}else{
				$(".error").html(res.respMessge);//注册回调显示
				//startBtn("commitUpdate");
			}
		},function(){});
	});
}
function submit(){
	var objs=$("#dataList input[type='checkbox']:checked");//得到所有选中数据
	if(objs.length>0){
		elementDisplay('batchDiv');
	}else{
		showJudegTip("normal","请选择广告设备！");
	}
}
function gwcCommit(obj){
	if(checkSum()){
		isSub="2";
		placeAnOrder(obj);
	}else{
		showJudegTip("fail","请填写完整信息再购买");
	}
}
