document.writeln("<script type=\"text/javascript\" src=\"/js/jquery.jedate.min.js\"></script><script type=\"text/javascript\" src=\"/js/jquery.qrcode.min.js\"></script><link rel=\"stylesheet\" href=\"/chinese/css/jedate.css\">");//加入日历控件js和css
if(getLocalStorage('loginType')!="6"){
	document.writeln("<script type=\"text/javascript\" src=\"https://api.map.baidu.com/api?v=2.0&ak=ckew84HKnPAEf4iNkOXsvpjIClfVnRmI\"></script>");
}
var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var disCount="1",disCountArr,currNoTimeArr,currObj,deviceIndustry="",orderNo="",map;
var date=new Date();
date.setDate(date.getDate()+1);//最小日期
var miDate=date.format(DATE_FORMAT_YTD);
date.setDate(date.getDate()+1+365*3);//最大日期
var maDate=date.format(DATE_FORMAT_YTD);
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	var loginType=getLocalStorage('loginType');
	if(loginType=="6"){
		if($("#payWay").length>0){
			//$(".wechatPay").show();
			/*$("#payWay li").removeClass("active");
			$(".walletPay").addClass("active");*/
		}
	}else{
		addMapHtml();//加入地图弹出框
		$("#payWay").show();
		$(".wechatPay,.aliPay,.unionPay").show();
	}
	if(isWeiXin()){
		$(".aliPay").hide();
	}
	/*orderNo=getURLParam("orderNo")订单支付订单号,*/payAmount=getURLParam("sumPrice")/*订单支付金额*/,isSub=getURLParam("isSub")/*是否分单支付*/,isInterCut=getURLParam("isInterCut");
	$(document).on("click","#ckAll",function(){
		$(".checkAd").prop("checked",$(this)[0].checked);
		checkSum();
	})
	$(document).on("click",".checkAd",function(){
		checkSum();//汇总
	})
	$(document).on("click",".fileType em",function(){
		$(".fileType em").removeClass("active");
		$(this).addClass("active");
		if(window.location.href.indexOf("tfgg.html")<0&&window.location.href.indexOf("gwc.html")<0){
			$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+Math.round(eval($(this).attr("data-price")*disCount))+'</span>元/</em>个');
			//$(".disPrice").html(Math.round(eval($(this).attr("data-price")*disCount)));
		}else{
			var ft=$(this).attr("value");
			if(ft=="3"){
				//$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+btPicPrice+'</span>元/</em>个');
				$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+Math.round(btPicPrice*disCount)+'</span>元/</em>个');
				//$(".disPrice").html(Math.round(btPicPrice*disCount));
			}else{
				//$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+btAdPrice+'</span>元/</em>个');
				$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+Math.round(btAdPrice*disCount)+'</span>元/</em>个');
				//$(".disPrice").html(Math.round(btAdPrice*disCount));
			}
		}
		//$(".disPrice").html($(".disPrice").html().substring(0,$(".disPrice").html().indexOf(".")+3));//截取
		checkSum();
	})
	
	if(window.location.href.indexOf("customerAdvertise.do")<0){
		if(isWeiXin()){
			$(".aliPay").hide();
		}
		$(document).on("click",".zf-xz li",function(){
			$(".zf-xz li").removeClass("active");
			$(this).addClass("active");//激活样式
			/*var val=$(this).attr("data");
			if(val=="0301"){
				$(".cardCodeLi").show();
				$(".phoneMobileLi").show();
				if($("#danjia li").length>0){
					$(".phoneValidCodeLi").show();
				}
			}else{
				$(".cardCodeLi").hide();
				$(".phoneMobileLi").hide();
				$(".phoneValidCodeLi").hide();
			}*/
		})
		//loadUserWalletInfo();//钱包数据初始化
	}
	appendDetailDiv();//加入详情弹出框
	addBuyCountLis();
})

function addMapHtml(){
	var str='<div class="shade" id="tc-map" style="display: ;">';
	str+=' <div class="tc-map">';
	str+='  <a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff(\'tc-map\')"><i class="fa fa-close" aria-hidden="true"></i></a>';
	str+=' <div id="showAddMap" style="width: 100%;height: 100%;"></div>';
	str+=' </div>';
	str+='</div>';
	$("body").append(str);
	// 百度地图API功能
	map = new BMap.Map("showAddMap");
}
function showAddMap(addr,city){
	
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(addr, function(point){
		if (point) {
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
		}else{
			showJudegTip("fail","未找到当前店铺地址！");
		}
	}, city);
	map.enableDoubleClickZoom()
	elementDisplay('tc-map');
}

function addBuyCountLis(){
	$(document).on("keypress",".buyCount",function(event){//只能输入数字
		//控制只能输入的值  
	    if (event.which && (event.which < 48 || event.which > 57) && event.which != 8) {  
	        event.preventDefault();  
	        return;  
	    }  
	})
	$(document).on("blur",".buyCount",function(event){//只能输入数字
		if($(this).val()==""){
			$(this).val("1");
		}  
	})
	$(document).on("input propertychange",".buyCount",function(event){
		var val=$(this).val();
		if(val!=""){
			if(isNaN(val)){
				$(this).val(1);
				checkSum();
				return;
			}
			if(val>maxBuyCount){
				showJudegTip("fail","投放数量最大为"+maxBuyCount);
				$(this).val(maxBuyCount);
				checkSum();
				return;
			}
			if(val<1){
				showJudegTip("fail","投放数量最小为1");
				$(this).val(1);
				checkSum();
				return;
			}
			checkSum();
		}
	})
	$(document).on("click",".subtract",function(event){
		var val=$(this).parent().find(".buyCount").val();
		if(parseInt(val)>1){
			$(this).parent().find(".buyCount").val(parseInt(val)-1);
			checkSum();
		}
	})
	$(document).on("click",".add",function(event){
		var val=$(this).parent().find(".buyCount").val();
		if(parseInt(val)<maxBuyCount){
			$(this).parent().find(".buyCount").val(parseInt(val)+1);
			checkSum();
		}
	})
}
//根据当前播放类型改变广告价格
function changePriceByFileType(obj){
	obj=$(obj).parents("p").parent().find(".fileType")[0];
	var val=$(obj).find(":selected").val();
	if(val=="1"){
		$(obj).parents("p").parent().find(".adPrice").text($(obj).attr("data-videoPrice"));
		$(obj).parents("p").parent().find(".adLength").text($(obj).attr("data-videoLength"));
	}else if(val=="2"){
		$(obj).parents("p").parent().find(".adPrice").text($(obj).attr("data-htmlPrice"));
		$(obj).parents("p").parent().find(".adLength").text($(obj).attr("data-htmlLength"));
	}else if(val=="3"){
		$(obj).parents("p").parent().find(".adPrice").text($(obj).attr("data-picPrice"));
		$(obj).parents("p").parent().find(".adLength").text($(obj).attr("data-picLength"));
	}
}
//开始日期和结束日期触发事件
function addBgDateAndEdDateLs(obj){
	var startDate=$(obj).parents("p").parent().find(".bgDate").val();//开始时间
	var endDate=$(obj).parents("p").parent().find(".edDate").val();//结束时间
	if(startDate!=""&&endDate!=""&&endDate<startDate){//判断时间选择是否正确
		showJudegTip("fail","日期选择有误！(开始时间不能大于结束日期)");
		$(obj).val("");
		return;
	}
	if(endDate!=""&&startDate!=""){
		startDate=new Date(startDate);
		endDate=new Date(endDate);
		selectTimePeriod=parseInt((endDate-startDate)/1000/60/60/24)+1;//得到时间相差的天数
		var sumPrice=$(obj).parents("p").parent().find(".sumPrice");
		var adPrice=$(obj).parents("p").parent().find(".adPrice").text();
		var buyCount=$(obj).parents("p").parent().find(".buyCount .active").text()
		var sumPriceText=eval(adPrice*selectTimePeriod)+"";
		if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
			sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
		}else{
			sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
		}
		//subOrderChange(obj);
		checkSum();
	}
}
//分单同时改变播放周期和播放类型
function subOrderChange(obj){
	if(isSub=="2"||($("#moreOrder").length>0&&$("#moreOrder")[0].checked)){
		if($(obj).parents("p").parent().find(".checkAd")[0].checked){
			var objs=$("input[type='checkbox']:checked").not("#moreOrder");
			if($(obj).hasClass("checkAd")){
				var startDate=$(objs[0]).parents("p").parent().find(".bgDate").val();
				var endDate=$(objs[0]).parents("p").parent().find(".edDate").val();
				var ftyp=$(objs[0]).parents("p").parent().find(".fileType :selected").val();
				$(obj).parents("p").parent().find(".bgDate").val(startDate);//开始时间
				$(obj).parents("p").parent().find(".edDate").val(endDate);//结束时间
				$(obj).parents("p").parent().find(".fileType").val(ftyp);//广告类型
				var d=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
				changePriceByFileType(obj);
				var sumPrice=$(obj).parents("p").parent().find(".sumPrice");
				var adPrice=$(obj).parents("p").parent().find(".adPrice").text();
				//sumPrice.text((Math.round(eval(adPrice*d)*100)/100).toFixed(2));//汇总
				var sumPriceText=eval(adPrice*d)+"";
				if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
					sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
				}else{
					sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
				}
			}else{
				var startDate=$(obj).parents("p").parent().find(".bgDate").val();//开始时间
				var endDate=$(obj).parents("p").parent().find(".edDate").val();//结束时间
				var ftyp=$(obj).parents("p").parent().find(".fileType :selected").val();//广告类型
				for (var i = 0; i < objs.length; i++) {
					$(objs[i]).parents("p").parent().find(".bgDate").val(startDate);//开始时间
					$(objs[i]).parents("p").parent().find(".edDate").val(endDate);//结束时间
					$(objs[i]).parents("p").parent().find(".fileType").val(ftyp);//广告类型
					var d=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
					changePriceByFileType(objs[i]);
					var sumPrice=$(objs[i]).parents("p").parent().find(".sumPrice");
					var adPrice=$(objs[i]).parents("p").parent().find(".adPrice").text();
					var sumPriceText=eval(adPrice*d)+"";
					if(sumPriceText.split(".").length>1&&sumPriceText.split(".")[1].length>2){
						sumPrice.text(sumPriceText.substring(0,sumPriceText.indexOf(".")+3));//汇总
					}else{
						sumPrice.text((Math.round(sumPriceText*100)/100).toFixed(2));//汇总
					}
					//sumPrice.text((Math.round(eval(adPrice*d)*100)/100).toFixed(2));//汇总
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
		var bCount=$(lis[i]).find(".buyCount").val()
		//sumPrice.text((Math.round(eval(adPrice*dateMistake)*100)/100).toFixed(2));//汇总
		var sumPriceText=eval(adPrice*dateMistake*bCount)+"";
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
	checkAdvertiseId="",deviceIds="",timeInterval="",shoppIds="",fileType="",checkTimes="",buyCount="";
	var totalBal=0,ifSubm=true,payCount=1;
	if(window.location.href.indexOf("detail")>0){//详情页
		var startDate=$(".bgDate").val();//开始时间
		var endDate=$(".edDate").val();//结束时间
		if(!checkDate(startDate,endDate)){
			showJudegTip("fail","投放日期有误！");
			ifSubm=false;
			return;
		}
		selectTimePeriod=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
		var adPrice=$(".adPrice").text();
		var singBuyCount=$(".buyCount").val();//购买数量
		if(singBuyCount==""){
			showJudegTip("fail","投放数量不为空！");
			ifSubm=false;
			return;
		}
		buyCount=singBuyCount;
		fileType=$(".fileType .active").attr("value");//播放类型
		checkTimes=startDate+"@"+endDate;
		timeInterval=$(".deviceId").attr("data-timeInterval");
		deviceIds=$(".deviceId").text();
		checkAdvertiseId=$(".deviceId").attr("data-id");
		
		totalBal=eval(adPrice*selectTimePeriod*buyCount);
	}else{
		/*if(window.location.href.indexOf("gwc.html")>=0){
			initFee();
		}*/
		var objs=$("#dataList input[type='checkbox']:checked");//得到所有选中数据
		var objsAll=$("#dataList input[type='checkbox']");//得到checkBox数据
		var disabledInp=$("input[type='checkbox'].disabled");
		if((objs.length+disabledInp.length)==objsAll.length&&objsAll.length>0){
			$("#ckAll")[0].checked=true;
		}else{
			$("#ckAll")[0].checked=false;
		}
		payCount=objs.length;
		for (var i = 0; i < objs.length; i++) {
			//计算费用
			var startDate=$(objs[i]).parents("li").find(".bgDate").val();//开始时间
			var endDate=$(objs[i]).parents("li").find(".edDate").val();//结束时间
			
			var adPrice=$(objs[i]).parents("li").find(".adPrice").text();
			var singBuyCount=$(objs[i]).parents("li").find(".buyCount").val();//购买数量
			var objFileType=$(objs[i]).parents("li").find(".fileType .active").attr("value");//播放类型
			if(window.location.href.indexOf("tfgg.html")>=0||window.location.href.indexOf("gwc.html")>=0){//投放广告 批量投放.
				singBuyCount=$("#batchDiv .buyCount").val();//购买数量
				objFileType=$("#batchDiv .fileType .active").attr("value");//播放类型
				startDate=$("#batchDiv .bgDate").val();//开始时间
				endDate=$("#batchDiv .edDate").val();//结束时间
				if(!checkDate(startDate,endDate)){
					showJudegTip("fail","投放日期有误！");
					ifSubm=false;
					return;
				}
				if(singBuyCount==""){
					showJudegTip("fail","投放数量不为空！");
					ifSubm=false;
					return;
				}
				//adPrice=getAdPrice(objs[i],objFileType);
				adPrice=$(".adPrice").text();
			}
			if(!checkDate(startDate,endDate)){
				showJudegTip("fail","投放日期有误！");
				objs[i].checked=false;
				ifSubm=false;
				continue;
			}
			if(singBuyCount==""){
				showJudegTip("fail","投放数量不为空！");
				ifSubm=false;
				objs[i].checked=false;
				continue;
			}
			var selectTimePeriod=parseInt((new Date(endDate)-new Date(startDate))/1000/60/60/24)+1;//得到时间相差的天数
			totalBal+=parseFloat(eval(adPrice*selectTimePeriod*singBuyCount));
			buyCount+=singBuyCount+",";
			fileType+=objFileType+",";//播放类型
			checkTimes+=startDate+"@"+endDate+",";
			timeInterval+=$(objs[i]).attr("data-timeInterval")+",";
			deviceIds+=$(objs[i]).parents("li").find(".deviceId").text()+",";
			checkAdvertiseId+=$(objs[i]).attr("data-id")+",";
			if($(objs[i]).attr("data-shoppId")){//购物车商品id
				shoppIds+=$(objs[i]).attr("data-shoppId")+",";
			}
			$(objs[i]).parents("li").find(".sumPrice").text(eval(adPrice*selectTimePeriod*singBuyCount));
		}
		
		
		//截取字符不包括最后一位
		deviceIds=deviceIds.substring(0,deviceIds.length-1);
		checkTimes=checkTimes.substring(0,checkTimes.length-1);
		fileType=fileType.substring(0,fileType.length-1);
		shoppIds=shoppIds.substring(0,shoppIds.length-1);
		timeInterval=timeInterval.substring(0,timeInterval.length-1);
		buyCount=buyCount.substring(0,buyCount.length-1);
		checkAdvertiseId=checkAdvertiseId.substring(0,checkAdvertiseId.length-1);
	}
	totalBal=totalBal+"";//转字符
	if(totalBal.split(".").length>1&&totalBal.split(".")[1].length>2){//保留两位小数
		totalBal=totalBal.substring(0,totalBal.indexOf(".")+3);//总金额
	}else{
		totalBal=(Math.round(totalBal*100)/100).toFixed(2);
	}
	/*if(parseFloat(disCount)!=parseFloat("1")&&totalBal!=0){//有折扣时
		// 折后价: <span class='red font18 disTotalBal'>"+eval(totalBal*disCount).toFixed(2)+"元</span>
		$(".totalBal").html(totalBal);//计算总金额
		$(".disTotalBal").removeClass("hide");
		$(".disTotalBal").html(' 折后共计<br /><span class="red">'+eval(totalBal*disCount).toFixed(2)+'</span>元');//计算总金额
	}else{
		$(".disTotalBal").addClass("hide");
		$(".totalBal").html(totalBal);//计算总金额
	}*/
	$(".disTotalBal").addClass("hide");
	$(".totalBal").html(totalBal);//计算总金额
	$(".payCount").html(payCount);
	return ifSubm;
}
//(播放周期只能大于当前日期并且在往后半年内)
function checkDate(startDate,endDate){
	if(endDate==""||startDate==""||endDate<startDate){
		return false;
	}
	return true;
}

//获取价格
function getAdPrice(obj,objFileType){
	return $(obj).parents("li").attr("adPrice"+objFileType);
}
//确认提交
function commit(obj,isIt){
	disabledBtn($(obj).attr("id"));//禁用提交按钮
	if(!checkSum()){
		if(window.location.href.indexOf("detail")>0){//详情页
			showJudegTip("fail","请选择完整广告信息");
		}else{
			showJudegTip("fail","未选择需要加入广告设备或购买广告信息填写有误！");
		}
	}else{
		if(!isIt){
			var objs=$("#dataList input[type='checkbox']:checked")/*.not("#ckAll")*/;//得到所有选中数据
			if(objs.length==0){
				/*if(objs.length>3&&isSub!="2"){
					showJudegTip("fail","每次下单不超过3单");
					startBtn($(obj).attr("id"));
					return;
				}else{
					if(isSub=="2"&&objs.length!=1&&!checkSubOrder(objs)){
						showJudegTip("fail","多设备下单所有设备播放周期和播放类型需要一致");
						startBtn($(obj).attr("id"));
						return;
					}
				}*/
				showJudegTip("normal","请选择购买广告播放时段！");
				startBtn($(obj).attr("id"));
				return;
			}	
		}
		openWaitAnimation("正在检验订单,请稍后...");
		jsonAjax("/"+language+"/order/queryNoOrderTime.do",{checkTimes:checkTimes,checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,isInterCut:isInterCut,fileType:fileType,buyCount:buyCount},function(res){
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
				showJudegTip("fail",res.data);
				startBtn($(obj).attr("id"));
			}
		},function(){},null,null,false,false);
	}
	startBtn($(obj).attr("id"));
}
//分单下单检验所有设备类型播放周期是否一致
function checkSubOrder(objs){
	for (var i = 1; i < objs.length; i++) {
		var startDate=$(objs[i]).parents("p").parent().find(".bgDate").val();//开始时间
		var endDate=$(objs[i]).parents("p").parent().find(".edDate").val();//结束时间
		var ftyp=$(objs[i]).parents("p").parent().find(".fileType .active").val();//广告类型
		var startDate1=$(objs[i-1]).parents("p").parent().find(".bgDate").val();//开始时间
		var endDate1=$(objs[i-1]).parents("p").parent().find(".edDate").val();//结束时间
		var ftyp1=$(objs[i-1]).parents("p").parent().find(".fileType .active").val();//广告类型
		if(startDate!=startDate1||endDate!=endDate1||ftyp!=ftyp1){
			return false;
		}
	}
	return true;
}
//下单
function placeAnOrder(obj){
	disabledBtn($(obj).attr("id"));//禁用提交按钮
	turnoff('orderTitlediv');
	openWaitAnimation("正在下单,请稍后...");
	jsonAjax("/"+language+"/order/placeAnOrder.do",{isCheckOrder:"",checkTimes:checkTimes,checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,shoppIds:shoppIds,timeInterval:timeInterval,isInterCut:isInterCut,fileType:fileType,isSub:isSub,buyCount:buyCount},function(res){
		closeWaitAnimation();
		startBtn($(obj).attr("id"));
		var msg=res.msg.split("-");
		if(msg[0]=="10000"){
			orderNo=msg[3];
			fileType=msg[4];
			//total=msg[1];
			total=parseFloat(msg[2]).toFixed(2);
			var data=res.data;
			var result=queryEffectualTimeByOrderNo(data,payOrder,msg);//下单提示
			if(result=="fail"){
				return;
			}
			if(result==""){
				payOrder();
			}
			
			//showJudegTip("SUCCESS","下单成功,订单5分钟有效。请选择支付方式支付! 订单金额:<span class='red font16'>"+parseFloat(msg[2]).toFixed(2)+"</span>"+str);
			//var totStr=parseFloat(msg[2]).toFixed(2)+"元";
			/*if(msg[2]!=msg[1]){
				totStr+=" 折后价: <span class='red font18 disTotalBal'>"+parseFloat(msg[2]).toFixed(2)+"元</span>";
			}*/
			
			/*$(".totalBal").html(totStr);//计算总金额
			$("#payWay").show();
			$("#commit").hide();
			$("#payOrder").show();
			$("#dataList").addClass("disabled");
			//$(".payTypeText").show();
			if($(".delete").length>0){
				$(".delete").hide();
				$("#dataList input[type='checkbox']").not("input[type='checkbox']:checked").parents("li").hide();
			}
			if($(".joinCart").length>0){
				$(".joinCart").hide();
			}
			currtScrollToEnd();//滚动到底部
			try {
				if(mescroll){
					mescroll.endSuccess(0);
				}
			} catch (e) {
				
			}*/
			//startBtn("commitUpdate");
		}else{
			showJudegTip("fail",res.data);//注册回调显示
			//startBtn("commitUpdate");
		}
	},function(){closeWaitAnimation();startBtn($(obj).attr("id"));},null,null,false);
}
//广告购买天数提示
function queryEffectualTimeByOrderNo(data,confirmFun,msg){
	// 弹出有效日期
	if(data){
		var html="",tableHtml="",noPayCount=0;
		for (var o in data) {
			if(o.indexOf("body")>=0){
				var keys=o.split("-"),time=data["time"+o.replace("body","")],strs=data[o].split(",");
				var days=(new Date(time.split("==")[1])-new Date(time.split("==")[0]))/1000/3600/24 + 1;
				/*if($("#dataList input[type='checkbox']:checked").length==1){
					if(days==data[o].split("<em class=\"red\">0</em>").length-1){//判断选择广告周期是否已售罄
						str="店铺:"+keys[3]+" 设备编号:"+keys[4]+" 设备播放时段:"+keys[1]+"-"+keys[2]+"在<span class='green'>"+time+"</span>已被购买完,无法再购买,请重新选择投放日期!";
						showJudegTip("normal",str);
						turnoff('orderTitlediv');
						return "fail";
					}
				}*/
				tableHtml+='       <div class="bor-b tanchu5-nr-b pad-b5 pad-t5">';
				tableHtml+='         <span class="dis-b red font13"><em class="col-999 font12">店铺：</em>'+keys[3]+'</span>';
				tableHtml+='         <span class="dis-b"><em class="col-999">设备编号：</em>'+keys[4]+'</span>';
				//tableHtml+='         <span class="dis-b"><em class="col-999">设备播放时段：</em>'+keys[1]+"-"+keys[2]+'</span>';
				tableHtml+='         <span class="dis-b"><em class="col-999">投放日期：</em>'+time.split("==")[0]+'至'+time.split("==")[1]+'</span>';
				tableHtml+='       </div>';
				tableHtml+='       <div class="tanchu5-list pad-b5 pad-t5">';
				if(days==data[o].split("<em class=\"red\">0</em>").length-1){//判断选择广告周期是否已售罄
					tableHtml+='         <p class="dis-b text-c red pad-t5 pad-b10 bor-b2">当前投放日期内已卖完</p>';
					noPayCount++;
				}else{
					for (var i = 0; i < strs.length; i++) {
						tableHtml+='         <span class="dis-b"> '+strs[i]+'</span>';
					}
				}
				tableHtml+='       </div>';
			}
		}
		if($("#orderTitlediv").length==0){//元素不存在则创建
			html+='<div class="shade" id="orderTitlediv" style="display:none ;">';
			html+='  <div class="tanchu-html">';
			html+='    <div class="tanchu-bt">';
			html+='      <span>广告日期可购买数量</span><a href="#0" onclick="turnoff(\'orderTitlediv\')" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>';
			html+='    </div>';
			html+='    <div class="tanchu5-nr" id="timeTable">';
			html+=tableHtml;
			html+='    </div>';
			html+='    <div class="tis01 text-c pad-b10 pad-t5 bor-t" style="display:block;"><span class="xiadantishi red"></span></div>';
			html+='    <div class="tanchu-xyan text-c orderConfirmBtn">';
			html+='      <input name="confirm" type="button" value="确定" class="btn btn02 bor-rad font13 mar-l10 bg-red">';
			html+='      <input name="" onclick="turnoff(\'orderTitlediv\')" type="button" value="取消" class="btn btn02 bor-rad font13 mar-l10 bg-999">';
			html+='    </div>';
			html+='  </div>';
			html+='</div>';
			$("body").append(html);
			$("#orderTitlediv input[name='confirm']").bind("click",function(e){
				e.stopPropagation();//阻止事件冒泡
				confirmFun();
			});
		}else{
			$("#timeTable").html(tableHtml);
		}
		if(confirmFun){//确认下单
			$(".xiadantishi").text("确认继续付款？支付金额:"+parseFloat(msg[2]).toFixed(2)+"元");
			$(".orderConfirmBtn").show();//确认取消按钮
			if((window.location.href.indexOf("tfgg.html")>0||window.location.href.indexOf("gwc.html")>0)&&noPayCount==$("#dataList input[type='checkbox']:checked").length){
				$(".orderConfirmBtn,.xiadantishi").hide();//确认取消按钮
			}else if(window.location.href.indexOf("detail.html")>0&&noPayCount>0){
				$(".orderConfirmBtn,.xiadantishi").hide();//确认取消按钮
			}
		}else{//下单
			$(".xiadantishi").html("下单成功,订单5分钟有效。请选择支付方式支付! 订单金额:<span class='red font18'>"+parseFloat(msg[2]).toFixed(2)+"</span>");
			$(".xiadantishi").parent()[0].style.bottom="1rem";
			$(".orderConfirmBtn").hide();//确认取消按钮
		}
		if(tableHtml!=""){
			$("#orderTitlediv").show();//确认下单弹出框
		}
		//$(".tanchu-html")[0].style.marginTop=-$(".tanchu-html").height()/2+"px";//调整弹出框位置
		return tableHtml;
	}
}
//支付订单
function payOrder(){
	turnoff('orderTitlediv');
	var payWay=$(".zf-xz").find(".active").attr("data");
	var loginType=getLocalStorage('loginType');
	if(loginType=="6"){
		showJudegTip("success","请选择其他版本进行支付！",5000);
		return;
	}
	if(payWay==undefined||payWay==""){
		showJudegTip("fail","请选择支付方式");
		return;
	}
	if(payWay=="0301"){
		window.location.href="yinlian.html?orderNo="+orderNo+"&amount="+total;
		return;
	}
	openWaitAnimation("正在支付中,请稍后...");
	jsonAjax("/"+language+"/order/payOrder.do",{payWay:payWay,orderNo:orderNo},function(res){
		closeWaitAnimation();
		if(res.success){
			/*showJudegTip("success","支付成功！正在跳转到上传文件...");
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
				if(isWeiXin()){
					if(res.data.indexOf("package")>-1){
						onBridgeReady(res.data);	
					}else{
						//<!--弹出微信支付提示宽-->
						var html='<div class="shade" id="ewmdiv" style="display:;">';
						html+='<div class="tanchu" style="height:auto">';
						html+='   <div class="tanchu-bt"><span>微信支付</span><a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff(\'ewmdiv\')"><i class="fa fa-close" aria-hidden="true"></i></a></div>';
						html+='  <div class="tanchu-nr text-c">';
						html+='   <p class="tanchu-tspc">请用微信扫一下二维码，完成支付。</p>';
						html+='    <p class="tanchu-tssj">长按二维码，自动识别。</p> ';
						html+='    <p class="pad-t20" id="qrcodeId"></p>';
						html+='  </div>';
						html+='  <div class="text-c pad-b10">';
						html+='    <input name="" type="button" value="取消" class="btn btn04 font14" onclick="javascript:turnoff(\'ewmdiv\')"/>';
						html+='     <input name="" type="button" value="支付完成" class="btn btn04 font14 mar-l10 bg-red" onclick="checkOrderStatus()"/>';
						html+='   </div>';
						html+='  </div>';
						html+='</div>';
						$("body").append(html);
						payNo=res.msg;
						createQrcode("qrcodeId",res.data);
						convertCanvasToImage("qrcodeId");
						$("#ewmdiv").show();
					}
				}else{
					if(res.data.indexOf('http')>-1){
				        window.location.href=res.data;
			        }else{
			        	payNo=res.msg;
						createQrcode("qrcodeId",res.data);
						convertCanvasToImage("qrcodeId");
						$("#ewmdiv").show();
					}
				}
			}else if(payWay=="0400"){
				window.location.href="zhifuchenggong.html";
			}
			turnoff('batchDiv');
			//$("body").html(res.data);
		}else{
			showJudegTip("fail",res.data);
		}
	},function(){},null,null,false);
}

function onBridgeReady(str){
	 var jsonstr=$.parseJSON(str);
	   WeixinJSBridge.invoke(
	       'getBrandWCPayRequest', {
	           "appId" : jsonstr.appId,     // 公众号名称，由商户传入
	           "timeStamp": jsonstr.timeStamp,         // 时间戳，自1970年以来的秒数
	           "nonceStr" : jsonstr.nonceStr, // 随机串
	           "package" : jsonstr.package,     
	           "signType": jsonstr.signType,         // 微信签名方式：
	           "paySign" : jsonstr.paySign // 微信签名
	       },function(res){
	           if(res.err_msg == "get_brand_wcpay_request:ok") { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回
	        	   window.location.href="zhifuchenggong.html";
	           }else{
	              if(res.err_msg == "get_brand_wcpay_request:fail"){
	            	  showJudegTip("fail",currError[6]);// 注册回调显示
	              } else if(res.err_msg == "get_brand_wcpay_request:cancel"){
	            	  
	              }  
	           }
	      });
	}

function checkOrderStatus(){
	openWaitAnimation("正在检验订单状态,请稍后...");
	jsonAjax("/"+language+"/order/checkOrderStatus.do",{orderNo:payNo},function(res){
		closeWaitAnimation();
		if(res.success){
			window.location.href="zhifuchenggong.html";
		}else{
			showJudegTip("fail",res.data);//注册回调显示
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
	/*//生成日期控件
	$.jeDate(".dt",{
            format:"YYYY-MM-DD",
            isTime:true,
            minDate:miDate,
            maxDate:maDate,
            initDate:{},
            isShow:true
    });//renderHtml*/
	var currYear = (new Date()).getFullYear();	
	var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};
	opt.default = {
		theme: 'android-ics light', // 皮肤样式
		display: 'modal', // 显示方式
		mode: 'scroller', // 日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: false,
		nowText: "今天",
		startYear: currYear, // 开始年份
		endYear: currYear + 3 // 结束年份
	};

	$(".bgDate").mobiscroll($.extend(opt['date'], opt['default']));
    $(".edDate").mobiscroll($.extend(opt['date'], opt['default']));
    
    //初始化价格
    /*if(Number(disCount)<1){
    	$(".disCountDiv").removeClass("hide");
    	$(".disCountDiv").parent().removeClass("zhehouj-wu");
    }*/
}
//查询当前广告所有不能下单日期  obj 当前日期选择框对象
function queryAdvertiseDateForSellOut(obj){
	if(!obj||window.location.href.indexOf("tfgg.html")>=0){return;}; 
	var deviceId=$(obj).parents("p").parent().find(".deviceId").text();//设备编号
	var idleTime=$(obj).parents("p").parent().find(".deviceId").attr("data-timeInterval");//广告时段
	if(window.location.href.indexOf("gwc.html")>=0){
		idleTime=$(obj).parents("li").parent().find("input[type='checkbox']").attr("data-timeInterval");//广告时段
	}
	var playNum=$(obj).attr("data-playNumber");//可卖数量
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
			showJudegTip("fail",res.data);
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


//加入购物车
function joinCart(){
	if(!checkSum()){
		showJudegTip("fail","选择广告信息填写有误");
	}else{
		if(window.location.href.indexOf("detail")<0){//详情页
			var objs=$("#dataList input[type='checkbox']:checked");
			if(objs.length==0){
				showJudegTip("fail","请选择需要加入广告设备！");
				return;
			}
		}
		jsonAjax("/"+language+"/shoppCart/joinShoppCart.do",{checkAdvertiseId:checkAdvertiseId,deviceId:deviceIds,timeInterval:timeInterval,checkTimes:checkTimes,fileType:fileType,buyCount:buyCount},function(res){
			if(res.respCode=="10000"){
				showJudegTip("success","加入成功，您可要通过点击 <a href='gwc.html' class='red'>我的购物车</a> 查看");
				$("#buyCarCount").text(parseInt($("#buyCarCount").text())+checkAdvertiseId.split(",").length);//改变购物车数量
				var objs=$("input[type='checkbox']:checked").not("#ckAll");//得到所有选中数据
				for (var i = 0; i < objs.length; i++) {
					$(objs[i]).prop("checked",false);
					$(objs[i]).parents("span").addClass("disabled");
				}  
				//startBtn("commitUpdate");
			}else{
				$(".error").html(res.respMessge);//注册回调显示
				//startBtn("commitUpdate");
			}
		},function(){});
	}
}

