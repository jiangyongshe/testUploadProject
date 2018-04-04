$(function(){
	
	var page = 1,
		pageSize = 8;
	
	// 如果用户是普通用户，则没有提现和提现驳回的情况
	if(userType === '1'){
		$("#typeSelect").find('[value="2"],[value="8"]').remove();
	}
	
	// 日期初始化
	dateInit();
	
	// 清空搜索条件
	clearCommission();
	
	// 钱包数据初始化
	loadUserWalletInfo();
	
	// 查询充值流水
	loadUserWalletFlowInfo({pageNo:page,pageSize:pageSize});
	
	// 查询按钮
	queryBtn();
	
	/**
	 * 加载用户信息---获取余额
	 */
	function loadUserWalletInfo(){
		$.ajaxEp({
			url:"/"+language+"/customerWallet/findWallet.do",
			openWaitingAnimation:false,
			param:{},
			success:function(res){
				if(res.success&&res.data!=null&&res.data!=[]){
					var dto = res.data;
					$(".amount").text(dto.amount);
				}
			}
		});
	}
	
	/**
	 * 加载用户信息---获取用户流水
	 * @param obj
	 */
	function loadUserWalletFlowInfo(obj){
		// 清空数据和页码
		$('#flowData,#flowPageTurn').empty();
		$.ajaxEp({
			url:'/'+language+'/customerWallet/queryWalletFlow.do',
			param:obj,
			openWaitingAnimation:false,
			success:function(res){
				var data = res.data,
					list = data.list,
					length = list.length;
				if(data==null||length===0){
					return;
				}
				var count = data.totalRecords;
				var html = '';
				for(var i=0;i<length;++i){
					var dto = list[i],
						number = (i+1+(Number(obj['pageNo'])-1)*Number(obj['pageSize'])),
						time = new Date(dto['open_DATE'].replace(/-/g, '/').replace(".0","")).format(DATE_FORMAT_YTDHMS),
						type = function(){
							var stateText = '';
							if(dto.flow_TYPE==1){
								stateText='充值'
							}else if(dto.flow_TYPE==2){
								stateText='提现';
							}else if(dto.flow_TYPE==3){
								stateText='下单支付';
							}else if(dto.flow_TYPE==4){
								stateText='退款';
							}else if(dto.flow_TYPE==5){
								stateText='收益提现';
							}else if(dto.flow_TYPE==6){
								stateText='补入';
							}else if(dto.flow_TYPE==7){
								stateText='补出';
							}else if(dto.flow_TYPE==8){
								stateText='提现驳回';
							}
							return stateText;
						}(),
						amount = formatNumber(dto['amount'],2,1);
					html += ''
						 + '<tr>'
						 + '	<td>'+number+'</td>'
						 + '	<td>'+time+'</td>'
						 + '	<td>'+type+'</td>'
						 + '	<td>'+amount+'</td>'
						 + '</tr>';
				}
				$('#flowData').html(html);
				// 分页代码
				pageNumber(count,obj,loadUserWalletFlowInfo,'flow');
			}
		});
	}

	/**
	 * 查询按钮
	 */
	function queryBtn(){
		$('#searchBtn').bind('click',function(){
			// 获取开始结束日期
			var startTime = $('#startTime').val();
			var endTime = $('#endTime').val();
			loadUserWalletFlowInfo({
				pageNo:page,
				pageSize:pageSize,
				beginDate:startTime,
				endDate:endTime,
				type:$('#typeSelect').val()
			});
		});
	}
	
	/**
	 * 清空搜索条件
	 */
	function clearCommission(){
		$('#clearSearchConditionBtn').on('click',function(){
			$("#startTime").val("");
			$("#endTime").val("");
			$("#typeSelect").val("");
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
			$("#startTime").mobiscroll($.extend(opt['date'], opt['def']));
			$("#endTime").mobiscroll($.extend(opt['date'], opt['def']));
		});
	}
})