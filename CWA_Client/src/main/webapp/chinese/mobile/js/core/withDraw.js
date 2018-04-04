var chineseError=["提现成功","请输入提现金额","金额格式错误","金额大于可提现额","两次输入密码不一致","银联提现未绑卡，<a href='/chinese/mobile/html/banka.html' class='red'>去绑卡</a>!","请输入提现密码"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=8,type="",canWithdrawMoney=0.00;
$(function(){
	$("#headerTitle").text("提现");
	currError=currErrorArray(chineseError,englishError,twError);
	// 设置佣金类型
	/*if(Number(getLocalStorage('userType'))==2){
		$('.commissionType').html('<option value=1>广告主佣金</option><option value=2>店主佣金</option>');
	}else{
		$('.commissionType').html('<option value=1>广告主佣金</option>');
	}*/
	queryAllowWithdrawMoney(1);//广告佣金查询
	bindWithdrawBtn();// 绑定出金按钮
	//commissionTypeDrop();
	$('#withdrawMoney').val('');
	$(document).on("click",".zf-xz li",function(){
		$(".zf-xz li").removeClass("active");
		$(this).addClass("active");//激活样式
		if($(this).attr("data")=="0401"){
			$(".ysWithDrawTip").removeClass("hide");
		}else{
			$(".ysWithDrawTip").addClass("hide");
		}
	})
	
	$("#withdrawMoney").bind("input propertychange",function(){
		if($(this).val()==''){
			$("#withdrawPwd").addClass("disabled");
		}else{
			$("#withdrawPwd").removeClass("disabled");
		}
	})
	$(document).on("keypress","#withdrawMoney",function(event){//只能输入数字
		//控制只能输入的值  
	    if (event.which && (event.which < 48 || event.which > 57) && event.which != 8) {  
	        event.preventDefault();  
	        return;  
	    }  
	})
})

/**
 * 佣金类型下拉框change事件
 * @returns
 */
function commissionTypeDrop(){
	$('.commissionType').on('change',function(){
		// 获取用户类型
		var userType = $(this).find('option:selected').val();
		// 查询可出金额
		queryAllowWithdrawMoney(userType);
	});
}

/**
 * 查询可出金额
 * @returns
 */
function queryAllowWithdrawMoney(userType){
	var	uri = '/customer/query/commission.do';
	jsonAjax('/'+language+uri,{},
	function(res){
		var data = res.data; 
		if(data){
			$('#allowWithdrawMoney').attr('placeholder',formatNumber(data.available_comm,2,1));
			canWithdrawMoney=data.available_comm;
		}else{
			$('#allowWithdrawMoney').attr('placeholder',formatNumber(0,2,1));
		}
	},
	function(){});
}

/**
 * 绑定出金按钮
 * @returns
 */
function bindWithdrawBtn(){
	$('#submit').bind('click',function(){
		disabledBtn("submit");
		var userType = $('.commissionType').find('option:selected').val();
		var payType = $('.payType').find('.active').attr("data");
		var uri = '/customer/withdraw.do';
		var withdrawMoney=$('#withdrawMoney').val();
		//var canWithdrawMoney=$('#allowWithdrawMoney').attr('placeholder');
		var pwd=$('#withdrawPwd').val();
		if(withdrawMoney==""||Number(withdrawMoney)==0){
			showJudegTip('fail',currError[1]);
			startBtn("submit");
			return;
		}
		if(pwd==""){
			showJudegTip('fail',currError[6]);
			startBtn("submit");
			return;
		}
		if(isNaN(withdrawMoney)){
			showJudegTip('fail',currError[2]);
			startBtn("submit");
			return;
		}
		if(parseFloat(withdrawMoney)>parseFloat(canWithdrawMoney)){
			showJudegTip('fail',currError[3]);
			startBtn("submit");
			return;
		}
		jsonAjax('/'+language+uri,{withdrawMoney:withdrawMoney,payType:payType,pwd:pwd},
		function(res){
			startBtn("submit");
			var status = res.success;
			var msg = res.msg;
			if(status){
				showJudegTip('success',msg);
				$('#withdrawMoney').val('');
			}else{
				if(msg=="50006"){
					showJudegTip('normal',currError[5]);
				}else{
					showJudegTip('fail',msg);
				}
			}
			// 重新查询可出佣金
			queryAllowWithdrawMoney(1);
			$('#withdrawPwd').val('');
		},
		function(){startBtn("submit");});
	});
}