var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var mescroll, addr="",adName="",pageSize=9;

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	loadAdvertiseInfo();
}

$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	$("#inputSearch").focus();
	bindSearchBtn();//绑定搜索按钮
	advertiseSearchMethod(true);//加载广告
})

function searchAdvertise(){
	adName=$("#inputSearch").val();
	scrollCommonMethod();
}
//全选按钮click
function checkAllClick(obj){
	if(!obj.checked){return;}
	hideEmplyDiv();
	$("#dataList").html("");
	pageSize=10000;
	isData=false;
	pageNo=1;
	$(obj).prop("checked",false);
	loadAdvertiseInfo(true);
}

//加载广告商品
function loadAdvertiseInfo(isCheckAll){
	jsonAjax("/"+language+"/customer/queryAdvertiseInfo.do",{pageNo:pageNo,pageSize:pageSize,mailingAddress:addr,adName:adName,deviceIndustry:deviceIndustry},function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data.list==null||res.data.list.length==0){
			if(adName!=""&&$("#dataList li").length==0){
				showEmplyDiv("没有匹配到您要搜索的广告！","#dataList");
			}
			isData=false;
			return;
		}
		//mescroll.endSuccess(res.data["data"].length);
		isData=(pageNo==Math.ceil(res.data.totalRecords/parseFloat(pageSize))?false:true);//如果当前页是最后一页则不加载
		if(res.data.list!=null&&res.data.list.length>0){
			var data=res.data,pageMenu='';
			disCount=res.msg;
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.list.length; i++) {
				var dto=data.list[i],html="",imgs="",cls="";
				if(dto.pics!=null&&dto.pics!=""){
					imgs=dto.pics.split(",");
				}
				if(dto.ifSubBuy){
					cls="disabled"
				}
				var str='<span class="ggdp-list1-xz pos-a '+cls+'"><label class="checkbox"><input type="checkbox" data-id="'+dto.id+'" data-timeInterval='+dto.idle_time+' name="checkbox" class="checkAd '+cls+'" ><i>✓</i></label></span>';
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
				var d=new Date();
				d.setDate(d.getDate() +oneWeek);//默认最大日期
				var liDom=document.createElement("li");
				liDom.setAttribute("adPrice3",dto.pic_price);
				liDom.setAttribute("adPrice1",dto.ad_price);
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
					btAdPrice=dto.ad_price;
					btAdLength=dto.ad_length;
					$(".priceAndLength").html('单价：<em class="red"><span class="adPrice">'+Math.round(dto.pic_price*disCount)+'</span>元/</em>个');
					//$(".disPrice").html(dto.pic_price*disCount);
					$(".batchSelectDate").html(batchWin);
				}
			}
			//if(!disCountArr){loadDisCountAndNum();}//加载折扣
			if(isCheckAll){
				//$("#ckAll")[0].checked
				$("input[type='checkbox']").not(".disabled").prop("checked",true);
				isData=false;
			}
			checkSum();
			if(!isCheckAll){
				$("#ckAll").prop("checked",false);
			}
			createDateControl();//绑定事件控件
			//$(".disPrice").html($(".disPrice").html().substring(0,$(".disPrice").html().indexOf(".")+3));//截取
		}else{
			if(adName!=""&&$("#dataList li").length==0){
				showEmplyDiv("没有匹配到您要搜索的广告！","#dataList");
			}
		}
	},function(){
		//联网失败的回调,隐藏上拉加载的状态
		isData=false;
		},"get");
}
function submit(){
	var objs=$("#dataList input[type='checkbox']:checked");//得到所有选中数据
	if(objs.length>0){
		elementDisplay('batchDiv');
	}else{
		showJudegTip("normal","请选择广告设备！");
	}
}
function bacthSubmit(obj){
	if(checkSum()){
		isSub="2";
		placeAnOrder(obj);
	}
}
