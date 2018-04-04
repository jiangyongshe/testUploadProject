var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var amount="";
$(function(){
	$("#headerTitle").text("下单支付");
	$(".filterBtn").hide();
	currError=currErrorArray(chineseError,englishError,twError);
	initMescroll();//初始化下拉控件
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("page.num="+page.num);
	var fileType=getURLParam("fileType"),buyCount=getURLParam("buyCount"),pay=getURLParam("pay"),checkTimes=getURLParam("checkTimes"),checkAdvertiseId=getURLParam("checkAdvertiseId"),deviceIds=getURLParam("deviceId"),timeInterval=getURLParam("timeInterval"),isInterCut=getURLParam("isInterCut");
	if(fileType==""&&checkTimes==""&&checkAdvertiseId==""&&deviceIds==""&&timeInterval==""&&pay=="1"&&getURLParam("orderNo")!=""){
		jsonAjax("/"+language+"/order/queryOrderByOrderNo.do",{orderNo:getURLParam("orderNo")},function(res){
			fileType=res.data["fileType"],buyCount=res.data["buyCount"],checkTimes=res.data["checkTimes"],checkAdvertiseId=res.data["checkAdvertiseId"],deviceIds=res.data["deviceIds"],timeInterval=res.data["timeInterval"],amount=res.data["amount"];
		},function(){},"get",null,null,false);
	}
	loadBuyConfirmInfo({checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,checkTimes:checkTimes,isInterCut:isInterCut,fileType:fileType,pay:pay,buyCount:buyCount});
}
//加载广告商品
function loadBuyConfirmInfo(obj){
	jsonAjax("/"+language+"/customer/queryConfimBuyAdvertiseInfo.do",obj,function(res){
		mescroll.endSuccess(0);
		if(res.data!=null&&res.data!=[]&&res.success){
			var data=res.data,pageMenu='',html="";
			disCount=res.msg;
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.length; i++) {
				var dto=data[i],price=dto.ad_price,imgs="",length=dto.ad_length;
				//价格
				if(dto.file_type=="2"){
					if(obj.isInterCut!="2"){
						price=dto.html_price;
						length=dto.html_length;
					}else{
						price=dto.inter_cut_html_price;
						length=dto.inter_cut_html_length;
					}
				}else if(dto.file_type=="3"){
					if(obj.isInterCut!="2"){
						price=dto.pic_price;
						length=dto.pic_length;
					}else{
						price=dto.inter_cut_pic_price
						length=dto.inter_cut_pic_length;
					}	
				}
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				/*if(addr!=null&&addr!=""){,addr=data[i].mailing_address
					var addrList=dto.mailing_address.split("*");
					if(addrList[0]==addrList[1]){
						addr=dto.mailing_address.replace(addrList[0],"");
					}
				}*/
				
				
				//var str='<span class="ggdp-list1-xz pos-a"><label class="checkbox"><input type="checkbox" data-id="'+dto.id+'" data-timeInterval='+dto.idle_time+' name="checkbox" class="checkAd" ><i>✓</i></label></span>';
				var str='<div class="ggdp-list1-tp pos-a" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')">';
				str+='<span><img src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'" /></span>';
				str+='</div>';
				str+='<div class="ggdp-list1-nr pos-r">';
				str+='<p class="">广告屏编号：<span class="">'+dto.device_code+'</span><span class=" hide deviceId">'+dto.device_id+'</span></p>';
				str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
				str+='<div class="pos-r pltf-dz">';
				//dto.mailing_address.substring(0,findCharIndex(dto.mailing_address,"*",3)).replace(/\*/g,"").replace(/&/g,"")
				str+='<span class="">'+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'</span>';
				str+='<a href="#" onclick="elementDisplay(\'tc-map\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
				str+='</div>';
				str+='</div>';
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
			
			if(obj.pay!=undefined&&obj.pay!=""&&obj.pay==1){//订单支付
				$("#payWay").show();
				$("#commit").hide();
				$("#payOrder").show();
				//禁用可修改订单项
				if(amount!=null&&amount!=""){
					$(".totalBal").html(amount.split("-")[1]+"元");
					$(".payCount").html("1条");
				}/*else{
					checkSum();
				}
				$("#dataList p").addClass("disabled");*/
			}else{
				checkSum();
				createDateControl();//绑定时间控件
			}
			if(isSub=="2"){
				//$("#dataList p").addClass("disabled");
				commit($("#commit")[0]);
			}
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}
//插播
function interCut(obj){
	var ca=$(obj).parents("li").find("input[type='checkbox']").attr("data-id");//广告商编号
	var di=$(obj).parents("li").find(".deviceId").text();//设备编号
	var ti=$(obj).parents("li").find("#timeInterval").text();//播放时段
	var ft=$(obj).parents("li").find(".fileType :selected").val();//播放类型
	window.location.href="tfgg01.html?checkAdvertiseId="+ca+"&deviceId="+di+"&timeInterval="+ti+"&isInterCut=2"+"&fileType="+ft;
}
