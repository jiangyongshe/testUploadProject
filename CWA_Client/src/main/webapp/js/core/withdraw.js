$(function(){
	
	// 可出金额
	var allowWithdrawMoney = 0;
	
	// 日期初始化
	dateInit();
	
	// 查询可出金额
	queryAllowWithdrawMoney();
	
	// 支付方式的选择
	payTypeChoose();
	
	// 提现明细
	withdrawDetail({
		pageNo:1,
		pageSize:5,
		account_type:5
	});
	
	// 搜索按钮
	searchBtn();
	
	// 清空搜索按钮
	clearBtn();
	
	// 提现按钮
	withdrawBtn();
	
	/**
	 * 日期初始化
	 */
	function dateInit(){
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
	}

	/**
	 * 查询可出金额
	 */
	function queryAllowWithdrawMoney(){
		$.ajaxEp({
			url:'/'+language+'/customer/query/commission.do',
			openWaitingAnimation:false,
			success:function(res){
				var data = res.data; 
				if(data)
					allowWithdrawMoney = data.available_comm;
				else
					allowWithdrawMoney = 0;
				$('#allowWithdrawMoney').attr('placeholder',formatNumber(allowWithdrawMoney,2,1));
			}
		});
	}
	
	/**
	 * 支付方式的选择
	 */
	function payTypeChoose(){
		$('[id^="payType"]').on('click',function(){
			var ths = this,
				$ths = $(ths),
				val = $ths.attr('id').replace('payType','');
			$('[id^="payType"]').removeClass('active');
			$ths.addClass('active');
			if(val === '0401'){
				$('#warmPrompt').show();
			}else{
				$('#warmPrompt').hide();
			}
		});
	}

	/**
	 * 提现明细
	 */
	function withdrawDetail(obj){
		$.ajaxEp({
			url:'/'+language+'/AD/query/withdrawDetail.do',
			param:obj,
			openWaitingAnimation:false,
			success:function(res){
				// 清空数据
				$('#withdrawData,#withdrawPageTurn').empty();
				var list = res.data;
				if(list&&list.length>0){
					var html = '';
					for(var i=0;i<list.length;++i){
						var data = list[i];
						html += ''
							 +  '<tr>'
							 +  '	<td>'+((Number(obj.pageNo)-1)*Number(obj.pageSize)+i+1)+'</td>'
							 +  '	<td>'+new Date(Number(list[i].open_date)).format(DATE_FORMAT_YTDHMS)+'</td>'
							 +  '	<td>'+formatNumber(list[i].amount,2,1)+'</td>'
							 +  '	<td>'+function(){
											switch(Number(list[i].status)){
											case 1:
												return '申请中';
											case 2:
												return '成功';
											case 3:
												return '驳回';
											case 4:
												return '需冲正';
											case 5:
												return '处理中';
											case 6:
												return '冲正成功';
											}
										}()
							 +  '	</td>'
							 +  '</tr>'
							 +  '';
					}
					$('#withdrawData').html(html);
					// 分页代码
					pageNumber(res.count,obj,withdrawDetail,'withdraw');
				}
			}
		});
	}

	/**
	 * 清空搜索按钮
	 */
	function clearBtn(){
		$('#clear').on('click',function(){
			$('#startTime,#endTime').val('');
		})
	}
	
	/**
	 * 搜索按钮
	 */
	function searchBtn(){
		$('#search').on('click',function(){
			var obj = {
				pageNo:1,
				pageSize:5,
				account_type:5,
				startTime:$('#startTime').val(),
				endTime:$('#endTime').val()
			};
			withdrawDetail(obj);
		})
	}
	
	/**
	 * 提现按钮
	 */
	function withdrawBtn(){
		$('#submit').on('click',function(){
			// 判断是否设置了提现密码
			if(!havaWPWD){
				updatePwd();
				$('#withdrawPwdChecked').click();
				tipInfo({status:'normal',content:'请设置提现密码'});
				return;
			}
			// 提现方式
			if($('[id^="payType"].active').length === 0){
				tipInfo({status:'normal',content:'请选择提现方式'});
				return;
			}
			var ajaxParam = {
				payType:$('[id^="payType"].active').attr('id').replace('payType','')
			}
			// 提现金额
			var withdrawalAmount = Number($('#withdrawalAmount').val().trim());
			if(isNaN(withdrawalAmount)||withdrawalAmount<=0){
				tipInfo({status:'normal',content:'金额格式不正确'})
				return;
			}
			if(withdrawalAmount>allowWithdrawMoney){
				tipInfo({status:'normal',content:'不能大于可出金额'})
				return;
			}
			ajaxParam.withdrawMoney = withdrawalAmount;
			// 提现密码
			var withdrawPassword = $('#withdrawPassword').val().trim();
			if(withdrawPassword === ''){
				tipInfo({status:'normal',content:'请输入提现密码'})
				return;
			}
			ajaxParam.pwd = withdrawPassword;
			// 发送请求
			$.ajaxEp({
				url:'/'+language+'/customer/withdraw.do',
				param:ajaxParam,
				success:function(res){
					var status = res.success,
						msg = res.msg;
					if(status){
						tipInfo({
							status:'success',
							content:msg
						});
						$('#allowWithdrawMoney').attr('placeholder',formatNumber(allowWithdrawMoney-ajaxParam.withdrawMoney,2,1));
					}else{
						if(msg==='50006'){
							tipInfo({
								status:'normal',
								content:'银盛出金未绑卡，<a href=\'/'+language+'/forward/bindCard.do\' class=\'red\'>去绑卡</a>!'
							});
						}else{
							tipInfo({
								status:'fail',
								content:msg
							});
						}
					}
				}
			});
		})
	}
})