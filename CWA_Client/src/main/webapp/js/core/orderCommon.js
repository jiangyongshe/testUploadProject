document.writeln("<script type=\"text/javascript\" src=\"/js/jquery.jedate.min.js\"></script><link rel=\"stylesheet\" href=\"/chinese/css/jedate.css\">");//加入日历控件js和css
var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var disCount="1",disCountArr,currNoTimeArr,currObj;
var date=new Date();
date.setDate(date.getDate()+1);//最小日期
var miDate=date.format(DATE_FORMAT_YTD);
date.setDate(date.getDate()+1+365*3);//最大日期
var maDate=date.format(DATE_FORMAT_YTD);
var map=new Map();
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	orderNo=getURLParam("orderNo")/*订单支付订单号*/,payAmount=getURLParam("sumPrice")/*订单支付金额*/,isSub=getURLParam("isSub")/*是否分单支付*/;
	$(document).on("click",".checkAd",function(){
		subOrderChange(this);
		checkSum();//汇总
		differPageOrder(this);
	})
	$(document).on("click","#ckAll",function(){//全选
		$("input[name='checkbox']").prop("checked",this.checked);
		checkSum();//汇总
		differPageOrder(this);
	})
	$(document).on("change",".fileType",function(){
		changePriceByFileType(this);
		if(location.href.indexOf("isInterCut")>0){
			$(this).parents("li").find(".sumPrice").text($(this).parents("li").find(".adPrice").text());
			$(".totalBal").html($(this).parents("li").find(".adPrice").text()+"元");//计算总金额
		}else{
			addBgDateAndEdDateLs(this);//汇总
		}
	})
	
	if(window.location.href.indexOf("customerAdvertise.do")<0){
		if(isWeiXin()){
			$(".aliPay").hide();
		}
		$(document).on("click",".zf-xz li",function(){
			if($(this).attr("data")=="0101"){
				$(".payTypeText").html("支付方式：微信支付 |");
			}else if($(this).attr("data")=="0201"){
				$(".payTypeText").html("支付方式：支付宝支付 |");
			}else if($(this).attr("data")=="0301"){
				$(".payTypeText").html("支付方式：银联支付 |");
			}else if($(this).attr("data")=="0400"){
				$(".payTypeText").html("支付方式：翔云余额支付 |");
			}
			$(".zf-xz li").removeClass("active");
			$(this).addClass("active");//激活样式
		})
		loadUserWalletInfo();//钱包数据初始化
	}
	appendDetailDiv();
})
//不同页同时下单
function differPageOrder(obj){
	if($("#moreOrder").length>0){//暂时只支持投放广告页
		if($(obj).attr("id")!="ckAll"){
			var objStartDate=$(obj).parents("li").find(".bgDate").val();//开始时间
			var objEndDate=$(obj).parents("li").find(".edDate").val();//结束时间
			var objCheckTimes=objStartDate+"@"+objEndDate;
			var objFileType=$(obj).parents("li").find(".fileType :selected").val();//广告类型
			var objDeviceIds=$(obj).parents("li").find(".deviceId").text();//设备编号
			var objTimeInterval=$(obj).parents("li").find("#timeInterval").text();//播放时段
			var ckBox=$(obj).parents("li").find("input[type='checkbox']");
			var objCheckAdvertiseId=ckBox.attr("data-id");//广告商编号
			if(ckBox[0].checked){
				if(map.has(objDeviceIds+objTimeInterval)){
					map.delete(objDeviceIds+objTimeInterval);
				}
				map.set(objDeviceIds+objTimeInterval,{checkAdvertiseId:objCheckAdvertiseId,deviceIds:objDeviceIds,timeInterval:objTimeInterval,fileType:objFileType,checkTimes:objCheckTimes});
			}else{
				if(map.has(objDeviceIds+objTimeInterval)){
					map.delete(objDeviceIds+objTimeInterval);
				}
			}
		}else{//全选
			var objs=$("input[type='checkbox']").not("#moreOrder").not("#ckAll");//得到所有选中数据
			
			for (var i = 0; i < objs.length; i++) {
				var objStartDate=$(objs[i]).parents("li").find(".bgDate").val();//开始时间
				var objEndDate=$(objs[i]).parents("li").find(".edDate").val();//结束时间
				var objCheckTimes=objStartDate+"@"+objEndDate;
				var objCheckAdvertiseId=$(objs[i]).attr("data-id");//广告商编号
				var objFileType=$(objs[i]).parents("li").find(".fileType :selected").val();//广告类型
				var objDeviceIds=$(objs[i]).parents("li").find(".deviceId").text();//设备编号
				var objTimeInterval=$(objs[i]).parents("li").find("#timeInterval").text();//播放时段
				
				if($("#ckAll")[0].checked){
					if(map.has(objDeviceIds+objTimeInterval)){
						map.delete(objDeviceIds+objTimeInterval);
					}
					map.set(objDeviceIds+objTimeInterval,{checkAdvertiseId:objCheckAdvertiseId,deviceIds:objDeviceIds,timeInterval:objTimeInterval,fileType:objFileType,checkTimes:objCheckTimes});
				}else{
					if(map.has(objDeviceIds+objTimeInterval)){
						map.delete(objDeviceIds+objTimeInterval);
					}
				}
			}  
		}
	}
}

//根据当前播放类型改变广告价格
function changePriceByFileType(obj){
	obj=$(obj).parents("li").find(".fileType")[0];
	var val=$(obj).find(":selected").val();
	if(val=="1"){
		$(obj).parents("li").find(".adPrice").text($(obj).attr("data-videoPrice"));
		$(obj).parents("li").find(".adLength").text($(obj).attr("data-videoLength"));
	}else if(val=="2"){
		$(obj).parents("li").find(".adPrice").text($(obj).attr("data-htmlPrice"));
		$(obj).parents("li").find(".adLength").text($(obj).attr("data-htmlLength"));
	}else if(val=="3"){
		$(obj).parents("li").find(".adPrice").text($(obj).attr("data-picPrice"));
		$(obj).parents("li").find(".adLength").text($(obj).attr("data-picLength"));
	}
}
//开始日期和结束日期触发事件
function addBgDateAndEdDateLs(obj){
	var startDate=$(obj).parents("li").find(".bgDate").val();//开始时间
	var endDate=$(obj).parents("li").find(".edDate").val();//结束时间
	if(startDate!=""&&endDate!=""&&endDate<startDate){//判断时间选择是否正确
		tipInfo({
			status:'fail',
			content:'错误提示","日期选择有误！(开始时间不能大于结束日期)'
		});
		$(obj).val("");
		return;
	}
	if(endDate!=""&&startDate!=""){
		startDate=new Date(startDate);
		endDate=new Date(endDate);
		selectTimePeriod=parseInt((endDate-startDate)/1000/60/60/24)+1;//得到时间相差的天数
		var sumPrice=$(obj).parents("li").find(".sumPrice");
		var adPrice=$(obj).parents("li").find(".adPrice").text();
		//sumPrice.text((Math.round(eval(adPrice*selectTimePeriod)*100)/100).toFixed(2));//汇总
		var sumPriceText=eval(adPrice*selectTimePeriod)+"";
		if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
			sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
		}else{
			sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
		}
		subOrderChange(obj);
		checkSum();
		differPageOrder(obj);
	}
}
//分单同时改变播放周期和播放类型
function subOrderChange(obj){
	if(isSub=="2"||($("#moreOrder").length>0&&$("#moreOrder")[0].checked)){
		if($(obj).parents("li").find(".checkAd")[0].checked){
			var objs=$("input[type='checkbox']:checked").not("#moreOrder").not("#ckAll");
			if($(obj).hasClass("checkAd")){
				var startDate=$(objs[0]).parents("li").find(".bgDate").val();
				var endDate=$(objs[0]).parents("li").find(".edDate").val();
				var ftyp=$(objs[0]).parents("li").find(".fileType :selected").val();
				$(obj).parents("li").find(".bgDate").val(startDate);//开始时间
				$(obj).parents("li").find(".edDate").val(endDate);//结束时间
				$(obj).parents("li").find(".fileType").val(ftyp);//广告类型
				var d=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
				changePriceByFileType(obj);
				var sumPrice=$(obj).parents("li").find(".sumPrice");
				var adPrice=$(obj).parents("li").find(".adPrice").text();
				//sumPrice.text((Math.round(eval(adPrice*d)*100)/100).toFixed(2));//汇总
				var sumPriceText=eval(adPrice*d)+"";
				if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
					sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
				}else{
					sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
				}
			}else{
				var startDate=$(obj).parents("li").find(".bgDate").val();//开始时间
				var endDate=$(obj).parents("li").find(".edDate").val();//结束时间
				var ftyp=$(obj).parents("li").find(".fileType :selected").val();//广告类型
				for (var i = 0; i < objs.length; i++) {
					$(objs[i]).parents("li").find(".bgDate").val(startDate);//开始时间
					$(objs[i]).parents("li").find(".edDate").val(endDate);//结束时间
					$(objs[i]).parents("li").find(".fileType").val(ftyp);//广告类型
					var d=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
					changePriceByFileType(objs[i]);
					var sumPrice=$(objs[i]).parents("li").find(".sumPrice");
					var adPrice=$(objs[i]).parents("li").find(".adPrice").text();
					//sumPrice.text((Math.round(eval(adPrice*d)*100)/100).toFixed(2));//汇总
					var sumPriceText=eval(adPrice*d)+"";
					if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
						sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
					}else{
						sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
					}
				}
			}
		}
	}
}
//初始化费用
function initFee(){
	var lis=$("li");
	for (var i = 0; i < lis.length; i++) {
		var startDate=$(lis[i]).find(".bgDate").val();//开始时间
		var endDate=$(lis[i]).find(".edDate").val();//结束时间
		startDate=new Date(startDate);
		endDate=new Date(endDate);
		var dateMistake=parseInt((endDate-startDate)/1000/60/60/24)+1;//得到时间相差的天数
		var sumPrice=$(lis[i]).find(".sumPrice");
		var adPrice=$(lis[i]).find(".adPrice").text();
		//sumPrice.text((Math.round(eval(adPrice*dateMistake)*100)/100).toFixed(2));//汇总
		var sumPriceText=eval(adPrice*dateMistake)+"";
		if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
			sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
		}else{
			sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
		}
	}
}

//加载用户信息
function loadUserWalletInfo(){
	jsonAjax("/"+language+"/customerWallet/findWallet.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".amount").text(dto.amount);
		}
	},function(){},"get");
}
//加载广告折扣
function loadDisCountAndNum(){
	jsonAjax("/"+language+"/customer/queryUserYMWDiscount.do",{},function(res){
		if(res.success){
			disCountArr=res.data;
			if(getURLParam("isInterCut")==""){
				checkSum();//汇总
			}else{
				$("input[type='checkbox']").attr("disabled",true);
			}
		}
	},function(){},null,null,null,false);
}

//汇总
function checkSum(){
	var objs=$("input[type='checkbox']:checked").not("#moreOrder").not("#ckAll");//得到所有选中数据
	var totalBal=0,ifSubm=true;
	checkAdvertiseId="",deviceIds="",timeInterval="",shoppIds="",fileType="",checkTimes="";
	if($("#ckAll").length>0){
		var ckAll=$("input[name='checkbox']").not("#moreOrder").not("#ckAll");
		if(ckAll.length==objs.length){
			$("#ckAll")[0].checked=true;
		}else{
			$("#ckAll")[0].checked=false;
		}
	}
	for (var i = 0; i < objs.length; i++) {
		//计算费用
		var sumPrice=$(objs[i]).parents("li").find(".sumPrice").text();//汇总
		var startDate=$(objs[i]).parents("li").find(".bgDate").val();//开始时间
		var endDate=$(objs[i]).parents("li").find(".edDate").val();//结束时间
		if(!checkDate(startDate,endDate)){
			tipInfo({
				status:'fail',
				content:'播放周期有误！'
			});
			$(objs[i]).parents("li").find(".sumPrice").text("--");
			objs[i].checked=false;
			ifSubm=false;
			continue;
		}
		totalBal=totalBal+parseFloat(sumPrice);//总金额
		checkTimes+=$(objs[i]).parents("li").find(".bgDate").val()+"@"+$(objs[i]).parents("li").find(".edDate").val()+",";
		checkAdvertiseId+=$(objs[i]).attr("data-id")+",";//广告商编号
		fileType+=$(objs[i]).parents("li").find(".fileType :selected").val()+",";//广告类型
		if($(objs[i]).attr("data-shoppId")!=undefined){//购物车商品id
			shoppIds+=$(objs[i]).attr("data-shoppId")+",";
		}
		deviceIds+=$(objs[i]).parents("li").find(".deviceId").text()+",";//设备编号
		timeInterval+=$(objs[i]).parents("li").find("#timeInterval").text()+",";//播放时段
	}  
	if(parseFloat(disCount)!=parseFloat("1")&&totalBal!=0){
		// 折后价: <span class='red font18 disTotalBal'>"+eval(totalBal*disCount).toFixed(2)+"元</span>
		$(".totalBal").html(Math.round(totalBal*100)/100+"元");//计算总金额
	}else{
		$(".totalBal").html(Math.round(totalBal*100)/100+"元");//计算总金额
	}
	$(".payCount").html(objs.length+"条");
	if($("#moreOrder").length>0){//暂时只支持投放广告页
		checkAdvertiseId="",deviceIds="",timeInterval="",shoppIds="",fileType="",checkTimes="";
		map.forEach(function(value,key,map){//得到所有选中放入map中的设备
			checkAdvertiseId+=value.checkAdvertiseId+",";
			deviceIds+=value.deviceIds+",";
			timeInterval+=value.timeInterval+",";
			fileType+=value.fileType+",";
			checkTimes+=value.checkTimes+",";
		})
	}
	//截取字符不包括最后一位
	deviceIds=deviceIds.substring(0,deviceIds.length-1);
	checkTimes=checkTimes.substring(0,checkTimes.length-1);
	fileType=fileType.substring(0,fileType.length-1);
	shoppIds=shoppIds.substring(0,shoppIds.length-1);
	timeInterval=timeInterval.substring(0,timeInterval.length-1);
	checkAdvertiseId=checkAdvertiseId.substring(0,checkAdvertiseId.length-1);
	return ifSubm;
}
//(播放周期只能大于当前日期并且在往后半年内)
function checkDate(startDate,endDate){
	if(endDate==""||startDate==""||endDate<startDate){
		return false;
	}
	return true;
}

//分单下单检验所有设备类型播放周期是否一致
function checkSubOrder(objs){
	for (var i = 1; i < objs.length; i++) {
		var startDate=$(objs[i]).parents("li").find(".bgDate").val();//开始时间
		var endDate=$(objs[i]).parents("li").find(".edDate").val();//结束时间
		var ftyp=$(objs[i]).parents("li").find(".fileType :selected").val();//广告类型
		var startDate1=$(objs[i-1]).parents("li").find(".bgDate").val();//开始时间
		var endDate1=$(objs[i-1]).parents("li").find(".edDate").val();//结束时间
		var ftyp1=$(objs[i-1]).parents("li").find(".fileType :selected").val();//广告类型
		if(startDate!=startDate1||endDate!=endDate1||ftyp!=ftyp1){
			return false;
		}
	}
	return true;
}
//确认提交
function commit(obj){
	
	disabledBtn($(obj).attr("id"));//禁用提交按钮
	if(getURLParam("isInterCut")!=""){
		shoppIds="";
		fileType=$(".fileType :selected").val(),checkTimes=new Date().format(DATE_FORMAT_YTD),checkAdvertiseId=getURLParam("checkAdvertiseId"),deviceIds=getURLParam("deviceId"),timeInterval=getURLParam("timeInterval"),isInterCut=getURLParam("isInterCut");
	}else{
		if(!checkSum()){return};
	}
	var objs=$("input[type='checkbox']:checked").not("#ckAll");//得到所有选中数据
	if(objs.length>0){
		if(objs.length>3&&isSub!="2"){
			tipInfo({
				status:'fail',
				content:'每次下单不超过3单'
			});
			startBtn($(obj).attr("id"));
			return;
		}else{
			if(isSub=="2"&&objs.length!=1&&!checkSubOrder(objs)){
				tipInfo({
					status:'fail',
					content:'多设备下单所有设备播放周期和播放类型需要一致'
				});
				startBtn($(obj).attr("id"));
				return;
			}
		}
		openWaitAnimation("正在检验订单,请稍后...");
		jsonAjax("/"+language+"/order/queryNoOrderTime.do",{checkTimes:checkTimes,checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,isInterCut:getURLParam("isInterCut"),fileType:fileType},function(res){
			closeWaitAnimation();
			if(res.success){
				startBtn($(obj).attr("id"));
				var result=queryEffectualTimeByOrderNo(res.data,placeAnOrder);//下单提示
				if(result==""){
					if(res.msg=="2"){
						placeAnOrder("2");//下单 参数标识下单不许再检验订单
					}else{
						placeAnOrder("1");//下单 参数标识下单不许再检验订单
					}
				}
			}else{
				tipInfo({
					status:'fail',
					content:res.data
				});
				startBtn($(obj).attr("id"));
			}
		},function(){},null,null,false);
		startBtn($(obj).attr("id"));
	}else{
		tipInfo({
			status:'normal',
			content:'请选择购买广告播放时段！'
		});
		startBtn($(obj).attr("id"));
	}
}
//下单
var placeAnOrder=function placeAnOrder(isCheckOrder){
	turnoff('orderTitlediv');
	openWaitAnimation("正在下单,请稍后...");
	jsonAjax("/"+language+"/order/placeAnOrder.do",{isCheckOrder:isCheckOrder,checkTimes:checkTimes,checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,shoppIds:shoppIds,timeInterval:timeInterval,isInterCut:getURLParam("isInterCut"),fileType:fileType,isSub:isSub},function(res){
		closeWaitAnimation();
		var msg=res.msg.split("-");
		if(msg[0]=="10000"){
			orderNo=msg[3];
			fileType=msg[4];
			var data=res.data,total=msg[1];
			var result=queryEffectualTimeByOrderNo(data,null,msg);//下单提示
			if(result=="fail"){
				return;
			}
			//var totStr=total+"元";
			var totStr=parseFloat(msg[2]).toFixed(2)+"元";
			/*if(msg[2]!=msg[1]){
				totStr+=" 折后价: <span class='red font18 disTotalBal'>"+parseFloat(msg[2]).toFixed(2)+"元</span>";
			}*/
			$(".totalBal").html(totStr);//计算总金额
			$("#payWay").show();
			$(".commit").hide();
			$("#payOrder").show();
			$(".payTypeText").show();
			$("input").not("input[type='button']").attr("disabled",true);
			$(".playAndCycleP").attr("disabled",true);
			$(".cycleType").attr("disabled",true);
			$(".fileType").attr("disabled",true);
			if($(".delete").length>0){
				$(".delete").hide();
			}
			currtScrollToEnd();//滚动到底部
			try {
				if(mescroll){
					mescroll.endSuccess(0);
				}
			} catch (e) {
				
			}
			//startBtn("commitUpdate");
		}else{
			if(msg[0]=="40007"){
				var title =res.msg.split(",")
				if(title[1]>"1"){
					// 注册回调显示
					tipInfo({
						status:'fail',
						content:title[0].split("-")[1]+res.data
					});
				}else{
					// 注册回调显示
					tipInfo({
						status:'fail',
						content:res.data
					});
				}
			}else{
				// 注册回调显示
				tipInfo({
					status:'fail',
					content:res.data
				});
			}
			
			//startBtn("commitUpdate");
		}
	},function(){closeWaitAnimation();},null,null,false);
}
//广告购买天数提示
function queryEffectualTimeByOrderNo(data,confirmFun,msg){
	if(data){
		var html="",tableHtml="";
		for (var o in data) {
			if(o.indexOf("body")>=0){
				var keys=o.split("-"),time=data["time"+o.replace("body","")],strs=data[o].split(",");
				var days=(new Date(time.split("==")[1])-new Date(time.split("==")[0]))/1000/3600/24 + 1;
				if(days==data[o].split("<em class=\"red\">0</em>").length-1){//判断选择广告周期是否已售罄
					str="==店铺:"+keys[3]+" 设备编号:"+keys[4]+" 设备播放时段:"+keys[1]+"-"+keys[2]+"在<span class='green'>"+time+"</span>周期已被购买完,不能再购买,请重新选择播放周期!";
					tipInfo({
						status:'normal',
						content:str
					});
					turnoff('orderTitlediv');
					return "fail";
				}
				tableHtml+='       <div class="font14 bor-b tanchu5-nr-b">';
				tableHtml+='         <span class="red font16"><em class="col-999 font14">店铺：</em>'+keys[3]+'</span>';
				tableHtml+='         <span class="pad-l10"><em class="col-999">设备编号：</em>'+keys[4]+'</span>';
				tableHtml+='         <span class="pad-l10"><em class="col-999">设备播放时段：</em>'+keys[1]+"-"+keys[2]+'</span>';
				tableHtml+='         <span class="pad-l10"><em class="col-999">播放周期：</em>'+time.split("==")[0]+'至'+time.split("==")[1]+'</span>';
				tableHtml+='       </div>';
				tableHtml+='       <div class="tanchu5-list bor-b3">';
				for (var i = 0; i < strs.length; i++) {
					tableHtml+='         <span class="pad-l10 dis-in">'+strs[i]+'</span>';
				}
				tableHtml+='       </div>';
			}
		}
		if($("#orderTitlediv").length==0){//元素不存在则创建
			html+='<div class="shade" id="orderTitlediv" style="display:none ;">';
			html+='  <div class="tanchu tanchu5">';
			html+='    <div class="tanchu-bt">';
			html+='      <span>广告日期可购买数量</span><a href="#0" onclick="turnoff(\'orderTitlediv\')" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>';
			html+='    </div>';
			html+='    <div class="tanchu5-nr" id="timeTable">';
			html+=tableHtml;
			html+='    </div>';
			html+='    <div class="tis01 text-c" style="display:block;"><span class="xiadantishi font16 red">确认继续下单吗？</span></div>';
			html+='    <div class="tanchu-xyan text-c orderConfirmBtn">';
			html+='      <input name="confirm" type="button" value="确定" class="btn btn04 font14 mar-l10 bg-red">';
			html+='      <input name="" onclick="turnoff(\'orderTitlediv\')" type="button" value="取消" class="btn btn04 font14 mar-l10 bg-999">';
			html+='    </div>';
			html+='  </div>';
			html+='</div>';
			$("body").append(html);
			$("input[name='confirm']").bind("click",confirmFun);
		}else{
			$("#timeTable").html(tableHtml);
		}
		if(confirmFun){//确认下单
			$(".xiadantishi").text("确认继续下单吗？");
			$(".orderConfirmBtn").show();//确认取消按钮
		}else{//下单
			$(".xiadantishi").html("下单成功,订单5分钟有效。请选择支付方式支付! 订单金额:<span class='red font18'>"+parseFloat(msg[2]).toFixed(2)+"</span>");
			$(".orderConfirmBtn").hide();//确认取消按钮
		}
		if(tableHtml!=""){
			$("#orderTitlediv").show();//确认下单弹出框
		}
		$(".tanchu5")[0].style.marginTop=-$(".tanchu5").height()/2+"px";//调整弹出框位置
		return tableHtml;
	}
}
//支付订单
function payOrder(){
	disabledBtn("payOrder");//禁用提交按钮
	var payWay=$(".zf-xz").find(".active").attr("data");
	if(payWay==undefined||payWay==""){
		tipInfo({
			status:'fail',
			content:'请选择支付方式'
		});
		startBtn("payOrder");
		return;
	}
	jsonAjax("/"+language+"/order/payOrder.do",{payWay:payWay,orderNo:orderNo},function(res){
		if(res.success){
			startBtn("payOrder");
			/*tipInfo({
				status:'success',
				content:'支付成功！正在跳转到上传文件...'
			});
			setTimeout(function(){
				if(getURLParam("isInterCut")==""){
					window.location.href="/"+language+"/forward/updateOrUploadVideo.do?adNo="+orderNo+"&fileType="+fileType;
				}else{
					window.location.href="/"+language+"/forward/updateOrUploadVideo.do?adNo="+orderNo+"&isInterCut=2"+"&fileType="+fileType;
				}
			},2000);*/
			//$("#payWay").hide();
			/*$("#commit").show();
			$("#commit").val("继续下单");*/
			//$("#payOrder").hide();
			if(payWay=="0201"){
				$("body").html(res.data);
			}else if(payWay=="0101"){
				if(res.data.indexOf('http')>-1){
			           window.location.href=res.data;
		        }else{
		        	payNo=res.msg;
					createQrcode("qrcodeId",res.data);
					convertCanvasToImage("qrcodeId");
					$("#ewmdiv").show();
				}
				
			}else if(payWay=="0400"){
				window.location.href="/"+language+"/exclude/orderPay/alipayOrderReturnUrl.do";
			}
			//$("body").html(res.data);
		}else{
			tipInfo({
				status:'fail',
				content:res.data
			});
			startBtn("payOrder");
		}
	},function(){});
	startBtn("payOrder");
}

function checkOrderStatus(){
	openWaitAnimation("正在检验订单状态,请稍后...");
	jsonAjax("/"+language+"/order/checkOrderStatus.do",{orderNo:payNo},function(res){
		closeWaitAnimation();
		if(res.success){
			window.location.href="/"+language+"/exclude/orderPay/alipayOrderReturnUrl.do";
		}else{
			// 注册回调显示
			tipInfo({
				status:'fail',
				content:res.data
			});
		}
	},function(){closeWaitAnimation();},null,null,false);
}

function currtScrollToEnd(){//滚动到底部
	if($("#mescroll").length>0){
		var h = $("#mescroll")[0].scrollHeight-window.innerHeight;
		$("#mescroll").scrollTop(h); 
	}
}

function createDateControl(){
	//生成日期控件
	$.jeDate(".dt",{
            format:"YYYY-MM-DD",
            isTime:true,
            minDate:miDate,
            maxDate:maDate,
            initDate:{},
            isShow:true
    });//renderHtml
	if(window.location.href.indexOf("confirmOrder.do")<0){
		initFee();
	}
}
//查询当前广告所有不能下单日期  obj 当前日期选择框对象
function queryAdvertiseDateForSellOut(obj){
	if(!obj){return;};
	var deviceId=$(obj).parents("li").find(".deviceId").text();//设备编号
	var idleTime=$(obj).parents("li").find("#timeInterval").text();//广告时段
	var playNum=$(obj).attr("data-playNumber");//广告时段
	if(currObj==obj){//如果还是点当前日期输入框则不去更新 currNoTimeArr
		//定时器
		return;
	};
	currObj=obj;
	jsonAjax("/"+language+"/order/queryAdvertiseDateForSellOut.do",{deviceId:deviceId,idleTime:idleTime,playNum:playNum},function(res){
		if(res.success){
			currNoTimeArr=res.data;
			//filterDate(res.data);筛选当前日期选择框对应月不能下单日期并禁用
		}else{
			tipInfo({
				status:'fail',
				content:res.data
			});
		}
	},function(){},null,null,null,false);
}

//筛选当前日期选择框对应月不能下单日期并禁用  yearAndMonth 年月
function filterDate(year,month){
	var validate=[],str="";
	if(!(year||month)||!currNoTimeArr||currNoTimeArr.length==0){return validate};
	for (var i = 0; i < currNoTimeArr.length; i++) {
		if(parseInt(currNoTimeArr[i].play_date.substring(0,4))==parseInt(year)&&parseInt(currNoTimeArr[i].play_date.substring(5,7))==parseInt(month)){
			str+="%"+currNoTimeArr[i].play_date.substring(8)+",";//拼接当前月禁用日期
		}
		if(parseInt(currNoTimeArr[i].play_date.substring(0,4))>parseInt(year)||(parseInt(currNoTimeArr[i].play_date.substring(0,4))==parseInt(year)&&parseInt(currNoTimeArr[i].play_date.substring(5,7))>parseInt(month))){
			break;
		}
	}
	validate=[str.substring(0,str.length-1),false];
	return validate;
}
