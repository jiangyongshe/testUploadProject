var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
$(function(){
	document.getElementsByName("customerAdvertise")[0].className="active";
	$(".customerAdvertise").attr('class','active');
	currError=currErrorArray(chineseError,englishError,twError);
	loadBuyConfirmInfo();//加载购买确认广告信息
})


//加载广告商品
function loadBuyConfirmInfo(){
	fileType=getURLParam("fileType"),checkTimes=getURLParam("checkTimes"),checkAdvertiseId=getURLParam("checkAdvertiseId"),deviceIds=getURLParam("deviceId"),timeInterval=getURLParam("timeInterval"),isInterCut=getURLParam("isInterCut");
	pay=getURLParam("pay");
	jsonAjax("/"+language+"/customer/queryConfimBuyAdvertiseInfo.do",{checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,checkTimes:checkTimes,isInterCut:isInterCut,fileType:fileType},function(res){
		if(res.data!=null&&res.data!=[]&&res.success){
			var data=res.data,pageMenu='',html="";
			disCount=res.msg;
			for (var i = 0; i < data.length; i++) {
				var dto=data[i],imgs="",addr=data[i].mailing_address,price=dto.ad_price,length=dto.ad_length;
				//价格
				if(dto.file_type=="2"){
					if(isInterCut!="2"){
						price=dto.html_price;
						length=dto.html_length;
					}else{
						price=dto.inter_cut_html_price;
						length=dto.inter_cut_html_length;
					}
				}else if(dto.file_type=="3"){
					if(isInterCut!="2"){
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
				if(addr!=null&&addr!=""){
					var addrList=dto.mailing_address.split("*");
					if(addrList[0]==addrList[1]){
						addr=dto.mailing_address.replace(addrList[0],"");
					}
				}
				html+='<li>';
				html+='  <div class="data-list-a"><label class="checkbox"><input type="checkbox" data-advertiserId="'+dto.advertiser_id+'" data-id="'+dto.id+'" name="checkbox" class="checkAd" checked><i>✓</i></label></div>';
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
				if(isInterCut!="2"){
					html+='<p>播放类型：<select name="" class="dis-in xlb08 fileType" data-htmlPrice="'+dto.html_price+'" data-htmlLength="'+dto.html_length+'" data-picPrice="'+dto.pic_price+'" data-picLength="'+dto.pic_length+'" data-videoPrice="'+dto.ad_price+'" data-videoLength="'+dto.ad_length+'">';
				}else{
					html+='<p>播放类型：<select name="" class="dis-in xlb08 fileType" data-htmlPrice="'+dto.inter_cut_html_price+'" data-htmlLength="'+dto.inter_cut_html_length+'" data-picPrice="'+dto.inter_cut_pic_price+'" data-picLength="'+dto.inter_cut_pic_length+'" data-videoPrice="'+dto.ad_price+'" data-videoLength="'+dto.ad_length+'">';
				}
				html+='<option value="1" '+(dto.file_type=="1"?'selected = "selected"':'')+'>视频</option>';
				html+='<option value="3" '+(dto.file_type=="3"?'selected = "selected"':'')+'>图片</option>';
				html+='<option value="2" '+(dto.file_type=="2"?'selected = "selected"':'')+'>图文模板</option>';
				html+='</select></p>';
				if(isInterCut!="2"){
					html+='    <p>设备播放时段：<span id="timeInterval">'+dto.idle_time+'</span></p>';
				}
				html+='    <p>广告时长：<span class="adLength">'+length+'</span>秒</p>';
				//html+='    <p>最低循环播放次数：'+dto.play_number+'条</p>';
				html+='  </div>';
				html+='<div class="data-list-d col-999">';
				html+='<p>最低循环播放次数：'+dto.play_number+'条</p><p>价格：<span class="red">￥<span class="adPrice">'+price+'</span></span> 元/天</p>';
				html+='<p>费用：<span class="red sumPrice">';
				if(dto.sumPrice==null){
					html+='￥--';
				}else{
					html+='￥'+eval(dto.sumPrice*(dto.disCount==null?1:dto.disCount/10));
				}
				html+='</span>  元</p>';
				html+='<p class="pad-t7 playAndCycleP"><span class="dis-in">播放日期：</span>';
				if(pay=="1"||isInterCut=="2"){
					if(isInterCut!="2"){
						html+='<span class="dis-in">'+checkTimes.replace("@"," 至 ")+"</span>";
					}else{
						html+='<span class="dis-in">'+new Date().format(DATE_FORMAT_YTD)+"</span>";
						$(".totalBalDiv").html("费用总计: <span class='red font18 totalBal'>"+dto.sumPrice+"元</span>");//计算总金额
					}
				}else{
					html+='<input type="text" data-playNumber='+dto.play_number+' readonly placeholder="年/月/日" value="'+dto.startDate+'" class="workinput wicon dt bgDate" /> - <input type="text" placeholder="年/月/日" readonly class="workinput wicon dt edDate" value="'+dto.endDate.substring(0,10)+'">';
				}
				html+='</p></div></li>';
			}
			$("#dataList ul").append(html);
			if(isInterCut!="2"){
				checkSum();
			}
			if(pay!=undefined&&pay!=""&&pay==1){//订单支付
				$("#payWay").show();
				$("#commit").hide();
				$("#payOrder").show();
				//禁用可修改订单项
				$("input").not("input[type='button']").attr("disabled",true);
				$(".fileType").attr("disabled",true);
				$(".sumPrice").text("￥"+payAmount);//费用
				$(".totalBalDiv").html("费用总计: <span class='red font18 totalBal'>"+payAmount+"元</span>");//计算总金额
			}
			createDateControl();//绑定时间控件
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		mescroll.endErr();
		},"get");
}
