$(function(){
	
	var commissionPage = 1;
	var commissionCount = 9;
	
	// 如果是店主则能出金
	if(userType === '2'){
		// 出金按钮
		$('#withdraw').show();
		// 判断是否已经绑卡
		$.ajaxEp({
			url:'/'+language+'/customer/queryUserCardInfo.do',
			param:{cardType:3},
			aysnc:false,
			success:function(res){
				var success = res.success,
				list = res.data,
				length = list.length;
				if(success&&list!=null&&length>0){
					// 已经绑卡
					$('#bindCard').hide();
				}else{
					// 未绑卡
					$('#bindCard').show();
				}
			}
		});
	}
	// 判断用户是否屏主
	if(userType!='1'&&userType!='2'){
		$('#m_comm').parent().find('span').eq(0).text('屏主收益：');
		$('#revenueType [value="5"]').text('屏主收益');
	}else{
		$('#m_comm').parent().find('span').eq(0).text('推荐收益：');
		$('#revenueType [value="5"]').text('推荐收益');
	}
	
	// 日期初始化
	dateInit();
	
	// 查询收益总额，屏主收益（推荐收益），广告收益
	queryCommission();
	
	// 查询佣金明细
	queryCommissionDetail({pageNo:commissionPage,pageSize:commissionCount});
	
	// 绑定佣金明细查询按钮 
	commissionDetailBtnSearch();
	
	// 清空搜索时间
	clearCommissionDate();
	
	/**
	 * 查询收益总额，屏主收益（推荐收益），广告收益
	 */
	function queryCommission(){
		$.ajaxEp({
			url:'/'+language+'/customer/query/commission.do',
			param:{},
			openWaitingAnimation:false,
			success:function(res){
				var success = res.success,
					dto = res.data;
				if(success&&dto!=null&&dto!=[]){
					$("#commissionTotal").text(formatNumber(dto.total_comm,2,1));
					$("#ad_comm").text(formatNumber(dto.ad_comm,2,1));
					$("#m_comm").text(formatNumber(dto.m_comm,2,1));
					$("#available_comm").text(formatNumber(dto.available_comm,2,1));
				}
			}
		});
	}
	
	/**
	 * 查询佣金明细
	 * @param obj.pageNo 页码
	 * @param obj.pageSize 每页显示的数量
	 * @param obj.startTime 播放开始时间，时:分:秒 hh:mm:ss
	 * @param obj.startTime 播放结束时间，时:分:秒 hh:mm:ss
	 * @param obj.type 收益类型 5-推荐收益(屏主收益) 6-广告收益
	 */
	function queryCommissionDetail(obj){
		$.ajaxEp({
			url:'/'+language+'/customer/query/commissionDetail.do',
			param:{
				pageNo:obj.pageNo,
			    pageSize:obj.pageSize,
			    startTime:obj.startTime,
			    endTime:obj.endTime,
			    type:obj.type
			},
			openWaitingAnimation:false,
			success:function(res){
				var data = res.list;
				// 清空数据
				$('#commissionDetailData,#commissionDetailPageTurn').empty();
				if(data&&data.length>0){
					var commissionDetailDataHTML = '';
					for(var i=0;i<data.length;++i){
						commissionDetailDataHTML += '' 
							       + '<tr>'
							       + '<td>'+((Number(obj.pageNo)-1)*Number(obj.pageSize)+i+1)+'</td>'
								   + '<td>'+new Date(Number(data[i].balance_datetime)).format(DATE_FORMAT_YTD)+'</td>'
								   + '<td>'+formatNumber(data[i].referrals_comm,2,1)+'</td>'
								   + '<td>'+data[i].type+'</td>'
								   + '</tr>';
					}
					$('#commissionDetailData').html(commissionDetailDataHTML);
					// 添加页码HTML代码
					pageNumber(res.totalRecords,obj,queryCommissionDetail,'commissionDetail');
				}
			}
		});
	}

	/**
	 * 绑定佣金明细查询按钮 
	 */
	function commissionDetailBtnSearch(){
		$('#commissionSearchBtn').bind('click',function(){
			// 获取开始结束日期
			var startTime = $('#commissionStartTime').val();
			var endTime = $('#commissionEndTime').val();
			queryCommissionDetail({
				pageNo:commissionPage,
				pageSize:commissionCount,
				startTime:startTime,
				endTime:endTime,
				type:$('#revenueType').val()==='all'?'':$('#revenueType').val()
			});
		});
	}

	/**
	 * 清空搜索时间
	 */
	function clearCommissionDate(){
		$('#clearSearchConditionBtn').on('click',function(){
			$("#commissionStartTime").val("");
			$("#commissionEndTime").val("");
			$("#revenueType").val("all");
		});
	}
	
	/**
	 * 日期初始化
	 */
	function dateInit(){
		$(function() {
			var currYear = (new Date(nowTime)).getFullYear();
			var opt = {};
			opt.date = {
				preset : 'date'
			};
			opt.datetime = {
				preset : 'datetime'
			};
			opt.time = {
				preset : 'time'
			};
			opt.def = {
				theme : 'android-ics light', //皮肤样式
				display : 'modal', //显示方式 
				mode : 'scroller', //日期选择模式
				dateFormat : 'yyyy-mm-dd',
				lang : 'zh',
				showNow : true,
				nowText : "今天",
				startYear : currYear - 50, //开始年份
				endYear : currYear + 10//结束年份
			};
			$("#commissionStartTime").mobiscroll($.extend(opt['date'], opt['def']));
			$("#commissionEndTime").mobiscroll($.extend(opt['date'], opt['def']));
		});
	}

})