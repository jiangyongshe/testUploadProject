var count=9,playIdle="",orderStatus="",adName="";

$(function(){
	$("#headerTitle").text("我的订单");
	upCallback();//初始化下拉控件
	appendDetailDiv();//详情弹出框
	$(document).on("click",".deleteDiv",function(e){
		e.stopPropagation();
		$(".deleteOrder").hide();
		$(this).parents('li').find('.deleteOrder').show();
	})
	$(document).on("click","body span:not(.deleteDiv)",function(e){
		e.stopPropagation();
		$(".deleteOrder").hide();
	})
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("pageNo="+pageNo);
	loadOrderInfo({
		pageNo:pageNo,
		pageSize:count,
		playIdle:playIdle,
		orderStatus:orderStatus,
		adName:adName
	});
}
//加载用户订单
function loadOrderInfo(obj){
	jsonAjax("/"+language+"/order/queryOrder.do",obj,function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data==null||res.data.list.length==0){
			if($("#dataList li").length==0){
				showEmplyDiv("无订单记录,<a href='tfgg.html' class='red'>去下单</a>","#dataList");
			}
			isData=false;
			return;
		}
		
		if(!obj.isShow){
			//mescroll.endSuccess(res.data["data"].length);
			isData=(pageNo==Math.ceil(res.data.totalRecords/parseFloat(count))?false:true);//如果当前页是最后一页则不加载
		}
		if(res.data.list.length>0){
			var data=res.data,date=new Date().format(DATE_FORMAT_YTD);
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],statusText="",cssClass="",imgs="",disable="",cancelReason="",str="";
				if(dto.order_status==1){
					disable="gray";
					statusText="待付款";
					cssClass="withoutPayment";
				}else if(dto.order_status<4){
					statusText="处理中";
					cssClass="application";
				}else if(dto.order_status==4&&dto.order_type!=4){
					if(date<dto.startDate){
						statusText="待发布";
						cssClass="watingPlay";
					}else if(dto.startDate<=date&&date<=dto.endDate){
						statusText="播放中";
						cssClass="playing";
					}else if(date>dto.endDate){
						statusText="已取消";
						cssClass="canceled";
					}
				}else if(dto.order_type==4&&dto.order_status==4){
					statusText="已取消";
					cssClass="canceled";
				}else{
					if(dto.order_status==5){
						statusText="已取消";
						cssClass="canceled";
					}else if(dto.order_status==6||dto.order_status==8){
						statusText="已取消";
						disable="gray";
						cssClass="canceled";
					}else if(dto.order_status==7){
						statusText="已取消";
						cssClass="canceled";
					}else if(dto.order_status==9){
						statusText="已完成";
						cssClass="complete";
					}
				}
				var fileType="视频",deleteStr='';//上传文件类型
				if(dto.file_type=="2"){
					fileType="图文模板";
				}else if(dto.file_type=="3"){
					fileType="图片";
				}
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				/*if(addr!=null&&addr!=""){,addr=dto.mailing_address
					var addrList=dto.mailing_address.split("*");
					if(addrList[0]==addrList[1]){
						addr=dto.mailing_address.replace(addrList[0],"");
					}
				}*/
				var deviceCount=1;
				if(dto.order_status==1||dto.order_status>4){
					deleteStr='<span class="wddd-more pad-r10 col-999 deleteDiv">更多</span><span class="pos-a wddd-shan deleteOrder" onclick="deleteOrderByOrderNo({orderNo:\''+(dto.if_sub==2?dto.unified_serial_number:dto.serial_number)+'\'},this)">删除订单</span>';
				}
				if(dto.if_sub==2||dto.unified_serial_number.length>0){
					if($("#"+dto.unified_serial_number).length==0){
						deviceCount=dto.file_type=="3"?Math.ceil(dto.buyCount/dto.upFileNum):dto.buyCount;
						str='<div class="ggdd-tit pad-b5 font13">';
						str+='<span><i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>订单编号：'+dto.unified_serial_number+'</span>';
						str+='<div class="fr pos-r">';
						str+=deleteStr;
						str+='<b class="red">'+statusText+'</b>';
						str+='</div>';
						str+='</div>';
						str+='<div class="clear fl width100 pos-r" id="'+dto.unified_serial_number+'">';
						str+='<p class="fl width56"><span class="dis-in ggdd-btl">投放类型</span><span class="dis-in ggdd-btr">'+fileType+'</span></p>';
						str+='<p class="fr width42"><span class="dis-in">单价</span><span class="dis-in fr text-r">'+dto.ad_price+'元/个</span></p>';
						str+='<p class="fl width56"><span class="dis-in ggdd-btl">屏数</span><span class="dis-in ggdd-btr"><span class="buyCount">'+(dto.if_sub==2?deviceCount:1)+'</span>台</span></p>';
						str+='<p class="fr width42"><span class="dis-in">投放天数</span><span class="dis-in fr text-r">'+dto.days+'天</span></p>';
						str+='<p class="fl width56"><span class="dis-in ggdd-btl">上传数量</span><span class="dis-in ggdd-btr"><span class="upFileNum">'+(dto.file_type=="3"?dto.upFileNum:1)+'</span>个</span></p>';
						str+='<p class="fr width42 red"><span class="dis-in">总额</span><span class="dis-in fr font16 text-r">¥ <span class="sumPrice">'+dto.sumPrice+'</span></span></p>';
						str+='<p class="fl width56 content*">';
						str+='<span class="dis-in ggdd-btl">投放内容</span>';
						if(dto.order_status>=4){
							if(dto.order_status==5){
								str+='<a href="shangchuanshipin.html?type=u&adNo='+dto.unified_serial_number+'&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-l5 pad-r5"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
							}else if(dto.order_status==6){
								str=str.replace("content*","hide");
							}else if(dto.order_status==8){
								str=str.replace("content*","hide");
							}else{
								str+='<a href="chakanshipin.html?type=q&adNo='+dto.unified_serial_number+'" class="red pad-l5"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a>';
							}
							
						}else{
							if(dto.order_status==2){
								str+='<a href="shangchuanshipin.html?adNo='+dto.unified_serial_number+'&isInterCut=2&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-l5"><i class="fa fa-upload" aria-hidden="true"></i> 上传</a>';
							}else if(dto.order_status==3){
								str+='<a href="shangchuanshipin.html?type=u&adNo='+dto.unified_serial_number+'&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-l5"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
								str+='<a href="chakanshipin.html?type=q&adNo='+dto.unified_serial_number+'&upNum='+dto.upFileNum+'" class="red pad-l10"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a>';
							}else if(dto.order_status==1){
								str=str.replace("content*","hide");
							}
						}
						str+='</p>';
						str+='</div>';
						str+='<div class="clear ggdp-ny pos-r">';
						str+='<div class="ggdp-list1-tp pos-a" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')">';
						str+='<span><img src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'" /></span>';
						str+='</div>';
						str+='<div class="ggdp-list1-nr pos-r">';
						str+='<p class="">广告屏编号：<span class="">'+dto.device_code+'</span></p>';
						str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
						str+='<div class="pos-r pltf-dz">';
						str+='<span class="">'+(dto.mailing_address!=null?dto.mailing_address.replace(/\*/g,"").replace(/&/g,""):"")+'</span>';
						str+='<a href="javascript:;" onclick="showAddMap(\''+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'\',\''+dto.mailing_address.split("*")[1]+'\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
						str+='</div>';
						str+='</div>';
						str+='</div>';
						if(deviceCount>1&&dto.if_sub==2){
							str+='<div class="clear yinxian text-c showOrhide"><a href="javascript:;" class="xianshi showAll" onclick="showAllOrder(\''+dto.unified_serial_number+'\')">显示全部<i class="fa fa-angle-down pad-l5" aria-hidden="true"></i></a></div>';
							str+='<div class="clear yinxian text-c showOrhide"><a href="javascript:;" class="xianshi hideAll" onclick="hideAllOrder(\''+dto.unified_serial_number+'\')">隐藏<i class="fa fa-angle-up pad-l5" aria-hidden="true"></i></a></div>';
						}
					}else{
						str='<div class="clear ggdp-ny pos-r">';
						str+='<div class="ggdp-list1-tp pos-a" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')">';
						str+='<span><img src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'" /></span>';
						str+='</div>';
						str+='<div class="ggdp-list1-nr pos-r">';
						str+='<p class="">广告屏编号：<span class="">'+dto.device_code+'</span></p>';
						str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
						str+='<div class="pos-r pltf-dz">';
						str+='<span class="">'+(dto.mailing_address!=null?dto.mailing_address.replace(/\*/g,"").replace(/&/g,""):"")+'</span>';
						str+='<a href="javascript:;" onclick="showAddMap(\''+dto.mailing_address.replace(/\*/g,"").replace(/&/g,"")+'\',\''+dto.mailing_address.split("*")[1]+'\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
						str+='</div>';
						str+='</div>';
						str+='</div>';
						$("#"+dto.unified_serial_number).after(str);
						/*var sumPrice =$("#"+dto.unified_serial_number).parent().find(".sumPrice");//费用总计
						var buyCount=$("#"+dto.unified_serial_number).parent().find(".buyCount");
						if(dto.order_status==1){
							var payHref =$("#"+dto.unified_serial_number).parent().find(".payHref");//支付路径
							payHref.attr("href",payHref.attr("href").replace("&sumPrice="+sumPrice.text(),"&sumPrice="+(parseFloat(sumPrice.text())+parseFloat(dto.sumPrice))));
						}
						sumPrice.text(parseFloat(sumPrice.text())+parseFloat(dto.sumPrice));
						buyCount.text(parseInt(buyCount.text())+1);*/
						continue;
					}
				}else{
					str='<div class="ggdd-tit pad-b5 font13">';
					str+='<span><i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>订单编号：'+dto.serial_number+'</span>';
					str+='<div class="fr pos-r">';
					str+=deleteStr;
					str+='<b class="red">'+statusText+'</b>';
					str+='</div>';
					str+='</div>';
					str+='<div class="clear fl width100 pos-r">';
					str+='<p class="fl width56"><span class="dis-in ggdd-btl">投放类型</span><span class="dis-in ggdd-btr">'+fileType+'</span></p>';
					str+='<p class="fr width42"><span class="dis-in">单价</span><span class="dis-in fr text-r">'+dto.ad_price+'元/个</span></p>';
					str+='<p class="fl width56"><span class="dis-in ggdd-btl">屏数</span><span class="dis-in ggdd-btr"><span class="buyCount">1</span>台</span></p>';
					str+='<p class="fr width42"><span class="dis-in">投放天数</span><span class="dis-in fr text-r">'+dto.days+'天</span></p>';
					str+='<p class="fl width56"><span class="dis-in ggdd-btl">上传数量</span><span class="dis-in ggdd-btr"><span class="upFileNum">'+(dto.file_type=="3"?dto.upFileNum:1)+'</span>个</span></p>';
					str+='<p class="fr width42 red"><span class="dis-in">总额</span><span class="dis-in fr font16 text-r">¥ <span class="sumPrice">'+dto.sumPrice+'</span></span></p>';
					str+='<p class="fl width56 content*">';
					str+='<span class="dis-in ggdd-btl">投放内容</span>';
					
					if(dto.order_status>=4){
						if(dto.order_status==5){
							str+='<a href="shangchuanshipin.html?type=u&adNo='+dto.serial_number+'&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-l5 pad-r5"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
						}else if(dto.order_status==6){
							str=str.replace("content*","hide");
						}else if(dto.order_status==8){
							str=str.replace("content*","hide");
						}else{
							str+='<a href="chakanshipin.html?type=q&adNo='+dto.serial_number+'" class="red pad-r10"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a>';
						}
					}else{
						if(dto.order_status==2){
							str+='<a href="shangchuanshipin.html?adNo='+dto.serial_number+'&isInterCut=2&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-r10"><i class="fa fa-upload" aria-hidden="true"></i> 上传</a>';
						}else if(dto.order_status==3){
							str+='<a href="shangchuanshipin.html?type=u&adNo='+dto.serial_number+'&fileType='+dto.file_type+'&upNum='+dto.upFileNum+'" class="red pad-r10"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a>';
							str+='<a href="chakanshipin.html?type=q&adNo='+dto.serial_number+'" class="red pad-r10"><i class="fa fa-building-o" aria-hidden="true"></i> 查看</a>';
						}else if(dto.order_status==1){
							str=str.replace("content*","hide");
						}
					}
					str+='</p>';
					str+='</div>';
					str+='<div class="clear ggdp-ny pos-r">';
					str+='<div class="ggdp-list1-tp pos-a" onclick="showShopDetail(\''+dto.shop_name+'\',\''+dto.mailing_address+'\',\''+dto.pics+'\')">';
					str+='<span><img src="'+(imgs==""?'/chinese/mobile/images/zwtp.png':imagePath+imgs[0])+'" /></span>';
					str+='</div>';
					str+='<div class="ggdp-list1-nr pos-r">';
					str+='<p class="">广告屏编号：<span class="">'+dto.device_code+'</span></p>';
					str+='<p class="">店铺：<span class="">'+dto.shop_name+'</span></p>';
					str+='<div class="pos-r pltf-dz">';
					str+='<span class="">'+(dto.mailing_address!=null?dto.mailing_address.replace(/\*/g,"").replace(/&/g,""):"")+'</span>';
					str+='<a href="javascript:;" onclick="showAddMap(\''+(dto.mailing_address!=null?dto.mailing_address.replace(/\*/g,"").replace(/&/g,""):"")+'\',\''+(dto.mailing_address!=null?dto.mailing_address.split("*")[1]:"")+'\')" class="pos-a pltf-dz2"><i class="fa fa-map-marker red" aria-hidden="true"></i></a>';
					str+='</div>';
					str+='</div>';
					str+='</div>';
				}
				if(dto.order_status==5){
					str+='<p class="clear red pad-t5">取消原因：<span class="col-666">'+dto.result+'</span></p>';
				}
				if(dto.order_status==1){
					str+='<div class="ggdd-an bor-t2 text-r clear">';
				    str+='<span class="btn btn03 bor-rad bg-yellow" onclick="payShow(this,\''+(dto.if_sub==2?dto.unified_serial_number:dto.serial_number)+'\')">去支付</span>';
				    str+='</div>';
				}
				var liDom=document.createElement("li");
				liDom.setAttribute('class','dingdan '+cssClass);
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
			if(!obj.isShow){
				$(".hideAll").hide();
			}else{
				$("#"+obj.unifiedOrderNo).attr("id",obj.unifiedOrderNo+"true");
			}
			showOrderByOrderStatus($("ul .active").attr("id"),$("ul .active")[0]);
		}else{
			if($("#dataList li").length==0){
				showEmplyDiv("无订单记录,<a href='tfgg.html' class='red'>去下单</a>","#dataList");
			}
		}
	},function(){},"get");
}
var orderNo="";
function queryEffectualTimeByOrderNo(obj){
	if(orderNo==""){
		initQueryDate();//第一次弹出初始化日期控件
	}
	if(obj.orderNo!=null&&obj.orderNo!=undefined&&obj.orderNo!=""){
		orderNo=obj.orderNo;
	}else{
		obj.orderNo=orderNo;
	}
	jsonAjax("/"+language+"/order/queryEffectualTimeByOrderNo.do",obj,function(res){
		if(res.data!=null&&res.data!=[]){
			var html="",data=res.data,date=new Date().format(DATE_FORMAT_YTD);
			html+='<tr>';
			html+='  <th>时间</th>';
			html+='  <th>状态</th>';
			html+='</tr>';
			for (var i = 0; i < data.length; i++) {
				var status="未播放",cl="red";
				if(new Date(data[i].play_date.replace(/-/g, "/"))<new Date(date.replace(/-/g, "/"))){
					status="已播放",cl="green";
				}else if(data[i].play_date==date){
					status="正在播放",cl="col-999";
				}
				html+='<tr>';
				html+='  <td>'+data[i].play_date+'</td>';
				html+='  <td><span class="'+cl+'">'+status+'</span></td>';
				html+='</tr>';
			}
			$("#timeTable").html("");
			$("#timeTable").html(html);
			$("#shiduandiv").show();
		}
	},function(){},"get");
}
//有效时段搜索按钮
function seachEffectualTimeBtn(){
	var beginTime=$("#user_age1").val();
	var endTime=$("#user_age2").val();
	
	queryEffectualTimeByOrderNo({beginTime:beginTime,endTime:endTime});
	
}
//清空时间
function clearDate(){
	$(".beginTime").val("");
	$(".endTime").val("");
}
//显示全部
function showAllOrder(orderNo){
	if($("#"+orderNo).length>0){
		$("#"+orderNo).parent().find(".showAll").hide();
		$("#"+orderNo).parent().find(".hideAll").show();
		loadOrderInfo({
			unifiedOrderNo:orderNo,
			pageNo:1,
			pageSize:1000000,
			playIdle:playIdle,
			orderStatus:orderStatus,
			adName:adName,
			isShow:true
		});
	}else{
		$("#"+orderNo+"true").parent().find(".showAll").hide();
		$("#"+orderNo+"true").parent().find(".hideAll").show();
		$("#"+orderNo+"true").parent().find(".ggdp-ny").show();
	}
}
//隐藏
function hideAllOrder(orderNo){
	$("#"+orderNo+"true").parent().find(".hideAll").hide();
	$("#"+orderNo+"true").parent().find(".showAll").show();
	$("#"+orderNo+"true").parent().find(".ggdp-ny").not(":last").hide();
	myScroll.refresh();
}

//根据不同订单状态显示
function changeStatus(id,obj){
	orderStatus=$(obj).attr("value");
	scrollCommonMethod();
	$(obj).parent().find("li").removeClass("active");
	$(obj).addClass("active");
}
function showOrderByOrderStatus(id,obj){
	$(".dingdan").hide();
	if(id==""||id==null||id==undefined){
		$(".dingdan").show();
	}else{
		$("."+id).show();
	}
}
//删除订单
function deleteOrderByOrderNo(obj,_this){
	jsonAjax("/"+language+"/order/deleteOrder.do",obj,function(res){
		if(res.success){
			showJudegTip("success",res.data);
			$(_this).parents("li").remove();
		}else{
			showJudegTip("fail",res.data);
		}
	},function(){},"get");
}

function payShow(obj,currOrderNo){
	$("#tishidiv .buyCount").text($(obj).parents("li").find(".buyCount").text());
	$("#tishidiv .totalBal").text($(obj).parents("li").find(".sumPrice").text());
	total=$(obj).parents("li").find(".sumPrice").text();
	orderNo=currOrderNo;
	elementDisplay('tishidiv');
}

