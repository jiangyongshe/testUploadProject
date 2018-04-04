var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var pageSize=20;
$(function(){
	$(".filterHeader").show();
	$("#headerTitle").text("翔云余额明细");
	currError=currErrorArray(chineseError,englishError,twError);
	var html='<li>';
	html+='<span class="pos-a screen-list-bt">类型</span>';
	html+='<select name="" class="xlb01 width100 flowType">';
	html+='   <option value="">全部</option>';
	html+='   <option value="1">充值</option>';
	html+='   <option value="2">提现</option>';
	html+='   <option value="3">下单支付</option>';
	html+='   <option value="4">退款</option>';
	html+='   <option value="5">收益提现</option>';
	html+='   <option value="6">补入</option>';
	html+='   <option value="7">补出</option>';
	html+='   <option value="8">提现驳回</option>';
	html+='</select>';
	html+='</li>';
	$("#user_age2").parents("li").after(html);
	upCallback();
})

/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
	console.log("pageNo="+pageNo);
	loadUserWalletFlowInfo({pageNo:pageNo,pageSize:pageSize,type:flowType,beginDate:bgDt,endDate:edDt});
}

function loadUserWalletFlowInfo(obj){//加载用户信息
	// 清空数据和页码
	jsonAjax("/"+language+"/customerWallet/queryWalletFlow.do",obj,function(res){
		//联网成功的回调,隐藏上拉加载的状态
		if(res.data==null||res.data.list.length==0){
			if($("#dataList li").length==0){
				showEmplyDiv("没找到钱包使用记录！","#dataList");
			}
			isData=false;
			return;
		}
		isData=(pageNo==Math.ceil(res.data.totalRecords/parseFloat(pageSize))?false:true);//如果当前页是最后一页则不加载
		if(res.data.list.length>0){
			var data=res.data,html="";
			var listDom=document.getElementById("dataList");
			for (var i = 0; i < data.list.length; i++) {
				var entity=data.list[i],stateText="";
				if(entity.flow_TYPE==1){
					stateText='充值'
				}else if(entity.flow_TYPE==2){
					stateText='提现';
				}else if(entity.flow_TYPE==3){
					stateText='下单支付';
				}else if(entity.flow_TYPE==4){
					stateText='退款';
				}else if(entity.flow_TYPE==5){
					stateText='收益提现';
				}else if(entity.flow_TYPE==6){
					stateText='补入';
				}else if(entity.flow_TYPE==7){
					stateText='补出';
				}else if(entity.flow_TYPE==8){
					stateText='提现驳回';
				}
				
				var str='<p class="yjmx-list01">'+((Number(obj.pageNo)-1)*Number(pageSize)+i+1)+'</p>';
				str+='<p class="yjmx-list22">'+new Date(entity.open_DATE.replace(/-/g, '/').replace(".0","")).format(DATE_FORMAT_YTDHMS)+'</p>';
				str+='<p class="yjmx-list23">'+stateText+'</p>';
				str+='<p class="yjmx-list24">'+entity.amount+'元</p>';
				
				var liDom=document.createElement("li");
				liDom.innerHTML=str;
				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
		}
	},function(){},"get");
}
