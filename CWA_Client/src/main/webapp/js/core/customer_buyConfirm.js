var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var amount="";
$(function(){
	document.getElementsByName("customerAdvertise")[0].className="active";
	$(".customerAdvertise").attr('class','active');
	currError=currErrorArray(chineseError,englishError,twError);
	upCallBack();//加载购买确认广告信息
})

function upCallBack(){
	var fileType=getURLParam("fileType"),pay=getURLParam("pay"),checkTimes=getURLParam("checkTimes"),checkAdvertiseId=getURLParam("checkAdvertiseId"),deviceIds=getURLParam("deviceId"),timeInterval=getURLParam("timeInterval"),isInterCut=getURLParam("isInterCut");
	if(fileType==""&&checkTimes==""&&checkAdvertiseId==""&&deviceIds==""&&timeInterval==""&&pay=="1"&&getURLParam("orderNo")!=""){
		jsonAjax("/"+language+"/order/queryOrderByOrderNo.do",{orderNo:getURLParam("orderNo")},function(res){
			fileType=res.data["fileType"],checkTimes=res.data["checkTimes"],checkAdvertiseId=res.data["checkAdvertiseId"],deviceIds=res.data["deviceIds"],timeInterval=res.data["timeInterval"],amount=res.data["amount"];
		},function(){},"get",null,null,false);
	}
	loadBuyConfirmInfo({checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,checkTimes:checkTimes,isInterCut:isInterCut,fileType:fileType,pay:pay});
}
//加载广告商品
function loadBuyConfirmInfo(obj){
	jsonAjax("/"+language+"/customer/queryConfimBuyAdvertiseInfo.do",obj,function(res){
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
				var str = '<a href="javascript:void(0)" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')" class="pos-r tfgg-tp">';
				str += '   <img src="'+imagePath+imgs[0]+'" />';
				str += '   <p class="pos-a tfgg-bt">'+dto.shop_name+'</p>';
				str += ' </a>';
				str += '<div class="pos-r pad-t10 tfgg-list">';
				str += ' <label class="checkbox pos-a tfgg-list-xz"><input type="checkbox" data-id="'+dto.id+'" name="checkbox" checked class="checkAd" ><i>✓</i></label>';
				str += ' <p class="col-999 dis-in pad-t7">设备编号：<span class="deviceId hide">'+dto.device_id+'</span><span class="">'+dto.device_code+'</span></p>';
				str += ' <p class="col-999 pad-r5 fr">';
				str += '  <span class="dis-in">播放类型：</span>';
				if(obj.isInterCut!="2"){
					str+='<select name="" class="dis-in xlb02 fileType" data-htmlPrice="'+dto.html_price+'" data-htmlLength="'+dto.html_length+'" data-picPrice="'+dto.pic_price+'" data-picLength="'+dto.pic_length+'" data-videoPrice="'+dto.ad_price+'" data-videoLength="'+dto.ad_length+'">';
				}else{
					str+='<select name="" class="dis-in xlb02 fileType" data-htmlPrice="'+dto.inter_cut_html_price+'" data-htmlLength="'+dto.inter_cut_html_length+'" data-picPrice="'+dto.inter_cut_pic_price+'" data-picLength="'+dto.inter_cut_pic_length+'" data-videoPrice="'+dto.ad_price+'" data-videoLength="'+dto.ad_length+'">';
				}
				str+='<option value="1" '+(dto.file_type=="1"?'selected = "selected"':'')+'>视频</option>';
				str+='<option value="3" '+(dto.file_type=="3"?'selected = "selected"':'')+'>图片</option>';
				str+='<option value="2" '+(dto.file_type=="2"?'selected = "selected"':'')+'>图文模板</option>';
				str+='</select></p>';
				if(obj.isInterCut!="2"){
					str+='<p class="col-999 pad-t5 clear">设备播放时段：<span class="col-666" id="timeInterval">'+dto.idle_time+'</span></p>';
				}
				str += ' <div class="pad-t5">';
				str += '  <p class="col-999 dis-in">最低循环次数：<span class="col-666">60次</span></p>';
				str += '   <p class="col-999 dis-in pad-l10">广告时长：<span class="adLength">'+dto.ad_length+'</span>秒</p>';
				str += ' </div>';
				str += ' <div class="pad-t5">';
				str += '   <p class="col-999 dis-in">价格：<em class="red"><span class="adPrice">'+(amount!=null&&amount!=""?amount.split("-")[0]:price)+'</span>元/天</em></p>';
				str += '   <p class="col-999 dis-in pad-l10">费用：<em class="red"><span class="sumPrice">';
				if(dto.sumPrice==null){
					str+='--';
				}else{
					str+=(amount!=null&&amount!="")?amount.split("-")[1]:eval(dto.sumPrice*(dto.disCount==null||dto.disCount==1?1:dto.disCount/10));
				}
				str += ' </span>元</em></p>';
				str += '   </div>';
				str += '</div>';
				str += '<p class="col-999 pad-t10 gwc-dw">';
				var d=new Date(),showBgTm="",showEdTm="",disable="dt";
				str+='<span class="dis-in">播放日期：</span>';
				if(obj.pay=="1"||obj.isInterCut=="2"){
					if(obj.isInterCut!="2"){
						showBgTm=dto.startDate;
						showEdTm=dto.endDate;
						disable="disabled";
					}else{
						showBgTm=d.format(DATE_FORMAT_YTD);
						showEdTm=d.format(DATE_FORMAT_YTD);
						disable="disabled";
					}
				}else{
					showBgTm=dto.startDate;
					showEdTm=dto.endDate.substring(0,10);
				}
				str += '<input type="text" data-playNumber='+dto.play_number+' readonly value="'+showBgTm+'" placeholder="请选择开始时间" class="dis-in wenb04 '+disable+' bgDate" />';
				str += '  <span class="dis-in">-</span>';
				str += '<input type="text" value="'+showEdTm+'" placeholder="请选择结束时间" readonly class="dis-in wenb04 '+disable+' edDate">';
				str += '</p>';
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
				
			}
			
			if(obj.pay!=undefined&&obj.pay!=""&&obj.pay==1){//订单支付
				$("#payWay").show();
				$("#commit").hide();
				$("#payOrder").show();
				//禁用可修改订单项
				$("input").not("input[type='button']").attr("disabled",true);
				$(".fileType").attr("disabled",true);
				if(amount!=null&&amount!=""){
					$(".totalBal").html(amount.split("-")[1]+"元");
					$(".payCount").html("1条");
				}else{
					checkSum();
				}
			}else{
				checkSum();
				createDateControl();//绑定时间控件
			}
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}
