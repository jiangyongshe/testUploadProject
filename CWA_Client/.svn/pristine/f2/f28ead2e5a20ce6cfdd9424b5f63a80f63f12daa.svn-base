var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=8,type="";
$(function(){
	$("#headerTitle").text("广告收益");
	currError=currErrorArray(chineseError,englishError,twError);
	// 设置佣金账号
	$('#accountId').text(getLocalStorage('accountId'));
	queryCommission(1);//广告主佣金查询
	if(Number(getLocalStorage('userType'))==2){
		$(".advertise").show();
		queryCommission(2);//店主佣金查询
	}
})

/**
 * 查询广告佣金
 * @returns
 */
function queryCommission(userType){
	var uri = '';
	if(Number(userType)==1){
		uri = '/customer/query/commission.do';
	}else{
		uri = '/AD/query/commission.do';
	}
	jsonAjax('/'+language+uri,{},
	function(res){
		if(res.data){
			if(Number(userType)==1){
				$('#commissionTotal').text(formatNumber(res.data.total_comm,2,1));
				$('#allowCommission').text(formatNumber(res.data.available_comm,2,1));
			}else{
				$('#adCommissionTotal').text(formatNumber(res.data.total_comm,2,1));
				$('#adAllowCommission').text(formatNumber(res.data.available_comm,2,1));
			}
		}else{
			if(Number(userType)==1){
				$('#commissionTotal').text('0.00');
				$('#allowCommission').text('0.00');
			}else{
				$('#adCommissionTotal').text('0.00');
				$('#adAllowCommission').text('0.00');
			}
		}
	},
	function(){});
}

function widthOutHref(){
	window.location.href="chuj.html";
}
