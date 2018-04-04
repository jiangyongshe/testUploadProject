var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=8,type="";
$(function(){
	currError=currErrorArray(chineseError,englishError,twError);
	loadUserWalletInfo();//钱包数据初始化
	loadUserWalletFlowInfo({pageNo:page,pageSize:pageSize});//钱包流水数据初始化
	
	$(".query").bind("change",function(){
		type=$(this).find("option:selected").val();
		loadUserWalletFlowInfo({pageNo:page,pageSize:pageSize});
	})
	
	/*$(document).on("click","#ckAll",function(){
		$("table tr").find("input[name='checkbox']").prop("checked",this.checked);
	})
	
	$(document).on("click",".check",function(){
		if(!$(this).find("input")[0].checked){
			$("#ckAll").prop("checked",false);
		}else{
			if($(".check").find("input[type='checkbox']:checked").length==$(".check").length){
				$("#ckAll").prop("checked",true);
			}
		}
	})*/
})

function loadUserWalletInfo(){//加载用户信息
	jsonAjax("/"+language+"/customerWallet/findWallet.do",{},function(res){
		if(res.success&&res.data!=null&&res.data!=[]){
			var dto=res.data;
			$(".amount").text(dto.amount);
		}
	},function(){},"get");
}

function loadUserWalletFlowInfo(obj){//加载用户信息
	obj.type=type;
	// 清空数据和页码
	$('#wPageTurn').empty();
	$("table tr").not("#tableHeader").remove();
	jsonAjax("/"+language+"/customerWallet/queryWalletFlow.do",obj,function(res){
		if(res.data.list.length>0){
			var data=res.data,html="";
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
					stateText='佣金出金';
				}else if(entity.flow_TYPE==6){
					stateText='补入';
				}else if(entity.flow_TYPE==7){
					stateText='补出';
				}else if(entity.flow_TYPE==8){
					stateText='出金驳回';
				}
				html+='<tr>';
				//html+='    <td><label class="checkbox check"><input type="checkbox" data-id='+entity.id+' class="" name="checkbox" id=""><i>✓</i></label></td>';
				html+='    <td>'+((Number(obj.pageNo)-1)*Number(pageSize)+i+1)+'</td>';
				html+='    <td>'+entity.open_DATE+'</td>';
				html+='    <td>'+stateText+'</td>';
				html+='    <td>'+entity.amount+'元</td>';
				//html+='    <td>审核中</td>';
				//html+='    <td><a href="#" onclick="deleteFlow('+entity.id+',this)"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</a></td>';
				html+=' </tr>';
			}
			$("#tableHeader").after(html);//展示列表数据
			pageNumber(data.totalRecords,obj,loadUserWalletFlowInfo,pageSize,'w');
		}
	},function(){},"get");
}

function deleteFlow(id,obj){
	var checks=$(".check").find("input[type='checkbox']:checked");
	var ids="";
	if(id==undefined||id==null||id==""){
		for (var i = 0; i < checks.length; i++) {
			if(i==0){
				ids+=$(checks[i]).attr("data-id");
			}else{
				ids+=","+$(checks[i]).attr("data-id");
			}
		}
		if(ids==""){
			showJudegTip("normal","提示","请选择删除数据");
			return ;
		}
	}else{
		ids=id;
	}
	jsonAjax("/"+language+"/customerWallet/deleteWalletFlow.do",{ids:ids},function(res){
		if(res.success){
			showJudegTip("success","提示","删除成功");
			if(id==undefined||id==null||id==""){
				checks.parents("tr").remove();
			}else{
				$(obj).parents("tr").remove();
			}
		}
	},function(){},"get");
}

