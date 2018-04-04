var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var pageSize=20,type="";
$(function(){
	$(".filterHeader").show();
	$("#headerTitle").html("收益明细  <span class='red font14 pad-l20'>合计: <span id='tatolAmount'>0</span></span>");
	currError=currErrorArray(chineseError,englishError,twError);
	type=getURLParam("type");
	var str='  <span class="pos-a screen-list-bt">收益类型</span>';
	if(Number(getLocalStorage('userType'))==2){
	    str+='  <select name="" class="xlb01 width100 type">';
	    str+='    <option value="">全部</option>';
	    str+='    <option value="5">推荐收益</option>';
	    str+='    <option value="6">广告收益</option>';
	    str+='  </select>';
	}else{
		str+='  <select name="" class="xlb01 width100 type">';
	    str+='    <option value="">全部</option>';
	    str+='    <option value="5">屏主收益</option>';
	    str+='    <option value="6">广告收益</option>';
	    str+='  </select>';
	}
	var liDom=document.createElement("li");
	liDom.innerHTML=str;
    $("#user_age2").parent().after(liDom);
    upCallback();//初始化下拉控件
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("pageNo="+pageNo);
	queryCommissionDetail({pageNo:pageNo,pageSize:pageSize,startTime:bgDt,endTime:edDt,type:type});
}

/**
 * 查询佣金明细
 * @param obj.pageNo 页码
 * @param obj.startTime 播放开始时间，时:分:秒 hh:mm:ss
 * @param obj.startTime 播放结束时间，时:分:秒 hh:mm:ss
 * @param obj.userType
 * @returns
 */
var sum=0.00;
function queryCommissionDetail(obj){
	var url="/"+language+"/customer/query/commissionDetail.do";
	jsonAjax(url,obj,function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.list==null||res.list.length==0){
			if($("#dataList li").length==0){
				showEmplyDiv("没找到收益记录！","#dataList");
				$("#tatolAmount").text(0+"元");
			}
			isData=false;
			return;
		}
		
		isData=(pageNo==Math.ceil(res.totalRecords/parseFloat(pageSize))?false:true);//如果当前页是最后一页则不加载
		var data = res.list;
		if(data&&data.length>0){
			var listDom=document.getElementById("dataList"),tatolAmount=0.00;
			for(var i=0;i<data.length;++i){
				var str='<p class="yjmx-list01">'+((Number(obj.pageNo)-1)*Number(pageSize)+i+1)+'</p>';
				str+='<p class="yjmx-list02">'+new Date(Number(data[i].balance_datetime)).format(DATE_FORMAT_YTD)+'</p>';
				str+='<p class="yjmx-list03">'+data[i].type+'</p>';
				str+='<p class="yjmx-list04">'+formatNumber(data[i].referrals_comm,2,1)+'</p>';
				//sum+=data[i].referrals_comm;
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
			
			
			$(".yjmx-list04:not(:first)").each(function(){
				var val=$(this).text();
				tatolAmount+=Number(val);
			})
			$("#tatolAmount").text(formatNumber(tatolAmount,2,1)+"元");
		}else{
			$("#tatolAmount").text(0+"元");
		}
	},function(){});
}
