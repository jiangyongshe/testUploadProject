var commissionPage = 1;
var commissionCount = 4;
var inOutMoneyPage = 1;
var inOutMoneyCount = 4;

$(function(){
	// 设置佣金类型
	if(Number(getLocalStorage('userType'))==2){
		$('#oneCommissionType,#twoCommissionType').html('<option value=2>店主佣金</option>');
		$('#threeCommissionType').html('<option value=2>店主出金</option>');
	}else{
		$('#oneCommissionType,#twoCommissionType').html('<option value=1>广告主佣金</option>');
		$('#threeCommissionType').html('<option value=1>广告主出金</option>');
	}
	
	// 设置佣金账号
	$('#accountId').text(getLocalStorage('accountId'));
	
	// 查询广告佣金
	queryCommission(1);
	
	// 查询佣金明细
	queryCommissionDetail({pageNo:commissionPage,userType:1});
	
	// 查询出金明细
	queryInOutMoneyDetail({pageNo:inOutMoneyPage,userType:1});
	
	// 第一个佣金类型下拉框change事件
	commissionTypeOneDrop();

	// 绑定佣金明细查询按钮 
	commissionDetailBtnSearch();

	// 绑定出金明细查询按钮 
	inOutMoneyBtnSearch();
})

/**
 * 第一个佣金类型下拉框change事件
 * @returns
 */
function commissionTypeOneDrop(){
	$('#oneCommissionType').on('change',function(){
		// 获取用户类型
		var userType = $(this).find('option:selected').val();
		// 查询佣金
		queryCommission(userType);
	});
}

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
			$('#commissionTotal').text(formatNumber(res.data.total_comm,2,1));
			$('#allowCommission').text(formatNumber(res.data.available_comm,2,1));
		}else{
			$('#commissionTotal').text('0.00');
			$('#allowCommission').text('0.00');
		}
	},
	function(){});
}

/**
 * 查询佣金明细
 * @param obj.pageNo 页码
 * @param obj.startTime 播放开始时间，时:分:秒 hh:mm:ss
 * @param obj.startTime 播放结束时间，时:分:秒 hh:mm:ss
 * @param obj.userType
 * @returns
 */
function queryCommissionDetail(obj){
	if(Number(obj.userType)==1){
		jsonAjax('/'+language+'/customer/query/commissionDetail.do',{
			pageNo:obj.pageNo,
		    pageSize:commissionCount,
		    startTime:obj.startTime,
		    endTime:obj.endTime
		},function(res){
			var data = res.list;
			// 清空数据
			$('#commissionDetailData').empty();
			// 清空页码
			$('#commissionDetailPageTurn').empty();
			if(data&&data.length>0){
				var commissionDetailDataHTML = '';
				for(var i=0;i<data.length;++i){
					commissionDetailDataHTML += '' 
						       + '<tr>'
						       + '<td>'+((Number(obj.pageNo)-1)*Number(commissionCount)+i+1)+'</td>'
							   + '<td>'+new Date(Number(data[i].balance_datetime)).format(DATE_FORMAT_YTD)+'</td>'
							   + '<td>'+formatNumber(data[i].referrals_comm,2,1)+'</td>'
							   + '<td>推荐佣金</td>'
							   + '</tr>';
				}
				$('#commissionDetailData').html(commissionDetailDataHTML);
				// 添加页码HTML代码
				pageNumber(res.totalRecords,obj,queryCommissionDetail,commissionCount,'commissionDetail');
			}
		},function(){});
	}else{
		jsonAjax('/'+language+'/AD/query/commissionDetail.do',{
			pageNo:obj.pageNo,
		    pageSize:commissionCount,
		    startTime:obj.startTime,
		    endTime:obj.endTime
		},function(res){
			var data = res.data;
			// 清空数据
			$('#commissionDetailData').empty();
			// 清空页码
			$('#commissionDetailPageTurn').empty();
			if(data&&data.length>0){
				var commissionDetailDataHTML = '';
				for(var i=0;i<data.length;++i){
					commissionDetailDataHTML += '' 
						       + '<tr>'
						       + '<td>'+((Number(obj.pageNo)-1)*Number(commissionCount)+i+1)+'</td>'
							   + '<td>'+new Date(Number(data[i].balance_datetime)).format(DATE_FORMAT_YTD)+'</td>'
							   + '<td>'+formatNumber(data[i].advertiser_comm,2,1)+'</td>'
							   + '<td>'+(data[i].type=='ad'?'广告佣金':'推荐佣金')+'</td>'
							   + '</tr>';
				}
				$('#commissionDetailData').html(commissionDetailDataHTML);
				// 添加页码HTML代码
				pageNumber(res.count,obj,queryCommissionDetail,commissionCount,'commissionDetail');
			}
		},function(){});
	}
}

/**
 * 查询出金明细
 * @param obj.pageNo 页码
 * @param obj.startTime 播放开始时间，时:分:秒 hh:mm:ss
 * @param obj.startTime 播放结束时间，时:分:秒 hh:mm:ss
 * @param obj.userType
 * @returns
 */
function queryInOutMoneyDetail(obj){
	if(Number(obj.userType)==1){
		jsonAjax('/'+language+'/customer/query/withdrawDetail.do',{
			pageNo:obj.pageNo,
		    pageSize:inOutMoneyCount,
		    startTime:obj.startTime,
		    endTime:obj.endTime
		},function(res){
			var data = res.list;
			// 清空数据
			$('#withdrawDetailData').empty();
			// 清空页码
			$('#withdrawDetailPageTurn').empty();
			if(data&&data.length>0){
				var withdrawDetailDataHTML = '';
				for(var i=0;i<data.length;++i){
					withdrawDetailDataHTML += '' 
						       + '<tr>'
						       + '<td>'+((Number(obj.pageNo)-1)*Number(inOutMoneyCount)+i+1)+'</td>'
							   + '<td>'+new Date(Number(data[i].open_date)).format(DATE_FORMAT_YTDHMS)+'</td>'
							   + '<td>'+formatNumber(data[i].amount,2,1)+'</td>'
							   + '<td>'+function(status){
										switch(status){
										case 1:
											return '申请中';
										case 2:
											return '通过';
										case 3:
											return '驳回';
										case 4:
											return '需冲正';
										case 5:
											return '处理中';
										case 6:
											return '冲正成功';
										}
									}(data[i].status)+'</td>'
							   + '</tr>';
				}
				$('#withdrawDetailData').html(withdrawDetailDataHTML);
				// 添加页码HTML代码
				pageNumber(res.totalRecords,obj,queryInOutMoneyDetail,commissionCount,'withdrawDetail');
			}
		},function(){});
	}else{
		jsonAjax('/'+language+'/AD/query/withdrawDetail.do',{
			pageNo:obj.pageNo,
		    pageSize:inOutMoneyCount,
		    startTime:obj.startTime,
		    endTime:obj.endTime
		},function(res){
			var data = res.data;
			// 清空数据
			$('#withdrawDetailData').empty();
			// 清空页码
			$('#withdrawDetailPageTurn').empty();
			if(data&&data.length>0){
				var withdrawDetailDataHTML = '';
				for(var i=0;i<data.length;++i){
					withdrawDetailDataHTML += '' 
						       + '<tr>'
						       + '<td>'+((Number(obj.pageNo)-1)*Number(inOutMoneyCount)+i+1)+'</td>'
							   + '<td>'+new Date(Number(data[i].open_date)).format(DATE_FORMAT_YTDHMS)+'</td>'
							   + '<td>'+formatNumber(data[i].amount,2,1)+'</td>'
							   + '<td>'+function(status){
										switch(status){
										case 1:
											return '申请中';
										case 2:
											return '通过';
										case 3:
											return '驳回';
										case 4:
											return '需冲正';
										case 5:
											return '处理中';
										case 6:
											return '冲正成功';
										}
									}(data[i].status)+'</td>'
							   + '</tr>';
				}
				$('#withdrawDetailData').html(withdrawDetailDataHTML);
				// 添加页码HTML代码
				pageNumber(res.count,obj,queryInOutMoneyDetail,commissionCount,'withdrawDetail');
			}
		},function(){});
	}
}

/**
 * 绑定佣金明细查询按钮 
 * @returns
 */
function commissionDetailBtnSearch(){
	$('#commissionSearchBtn').bind('click',function(){
		// 获取开始结束日期
		var startTime = $('#commissionStartTime').val();
		var endTime = $('#commissionEndTime').val();
		// 获取用户类型
		var userType = $('#twoCommissionType').find('option:selected').val();
		queryCommissionDetail({pageNo:commissionPage,startTime:startTime,endTime:endTime,userType:userType});
	});
}

/**
 * 绑定出金明细查询按钮 
 * @returns
 */
function inOutMoneyBtnSearch(){
	$('#inOutMoneySearchBtn').bind('click',function(){
		// 获取开始结束日期
		var startTime = $('#inOutMoneyStartTime').val();
		var endTime = $('#inOutMoneyEndTime').val();
		// 获取用户类型
		var userType = $('#threeCommissionType').find('option:selected').val();
		queryInOutMoneyDetail({pageNo:inOutMoneyPage,startTime:startTime,endTime:endTime,userType:userType});
	});
}
//清空出入金时间
function clearInOutMoneyDate(){
	$("#inOutMoneyStartTime").val("");
	$("#inOutMoneyEndTime").val("");
}
//清空佣金时间
function clearCommissionDate(){
	$("#commissionStartTime").val("");
	$("#commissionEndTime").val("");
}