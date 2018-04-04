$(function(){
	// 设置佣金类型
	if(Number(getLocalStorage('userType'))==2){
		$('#commissionType').html('<option value=2>店主佣金</option>');
	}else{
		$('#commissionType').html('<option value=1>广告主佣金</option>');
	}
	
	// 佣金类型下拉框change事件
	commissionTypeDrop();
	// 查询可出金额
	queryAllowWithdrawMoney(1);
	// 绑定出金按钮
	bindWithdrawBtn();
});

/**
 * 佣金类型下拉框change事件
 * @returns
 */
function commissionTypeDrop(){
	$('#commissionType').on('change',function(){
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
	var uri = '';
	if(Number(userType)==1){
		uri = '/customer/query/commission.do';
	}else{
		uri = '/AD/query/commission.do';
	}
	jsonAjax('/'+language+uri,{},
	function(res){
		var data = res.data;
		if(data){
			$('#allowWithdrawMoney').attr('placeholder',formatNumber(data.available_comm,2,1));
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
		var userType = $('#commissionType').find('option:selected').val();
		var uri = '';
		if(Number(userType)==1){
			uri = '/customer/withdraw.do';
		}else{
			uri = '/AD/withdraw.do';
		}
		jsonAjax('/'+language+uri,{withdrawMoney:$('#withdrawMoney').val()},
		function(res){
			var status = res.success;
			var msg = res.msg;
			if(status){
				showJudegTip('success','',msg);
				$('#withdrawMoney').val('');
				// 重新查询可出佣金
				queryAllowWithdrawMoney(userType);
			}else{
				showJudegTip('fail','',msg);
			}
		},
		function(){});
	});
}