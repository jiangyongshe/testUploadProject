var 
	pageNo = 1,
	count = 9,
	orderNo = '';

$(function(){
	
	//加载广告商品
	loadOrderInfo({
		pageNo:pageNo,
		pageSize:count
	});
	
	// 根据状态查看订单数据
	queryOrderByStatus();
	
	/**
	 * 加载用户订单
	 * @param obj
	 */
	function loadOrderInfo(obj){
		// 清空数据和页码
		$('#dataList,#oPageTurn').empty();
		$('#noData').hide();
		$.ajaxEp({
			url:'/'+language+'/order/queryOrder.do',
			param:obj,
			openWaitingAnimation:false,
			success:function(res){
			var data = res.data,
				list = data.list,// 订单数据
				length = list.length,// 订单数据长度
				totalRecords = data.totalRecords;// 总订单数据长度
			if(length>0){
				var $dataList = $('#dataList'),
					orderClassify = {},// 订单分类
					orderHTML = '';// 遍历生成订单数据
				$dataList.html(
					'<li class="wddd-list-bt">'
				   +'	<div class="wddd-list-a pos-r">'
				   +'		<span class="pos-a ddrq">近三个月订单</span>'
				   +'		订单详情'
				   +'	</div>'
				   +'	<div class="wddd-list-b">支付费用</div>'
				   +'	<div class="wddd-list-c">订单状态</div>'
				   +'	<div class="wddd-list-d">操作</div>'
				   +'</li>'
				);
				for(var i=0;i<length;++i){
					var orderData = list[i],
						unified_serial_number = orderData['unified_serial_number'];
					// 存在总单号则查找分单号数据并记录
					if(unified_serial_number){
						$.ajaxEp({
							url:'/'+language+'/order/queryOrder.do',
							async:false,
							openWaitingAnimation:false,
							param:{
								pageNo:1,
								pageSize:10000,
								unifiedOrderNo:unified_serial_number
							},
							success:function(res){
								orderClassify[unified_serial_number] = res.data.list;
								orderClassify[unified_serial_number].push(orderData);
							}
						});
					}
				}
				for(var i=0;i<length;++i){
					var orderData = list[i],
						// 分单号
						serial_number = orderData['serial_number'],
						// 总单号
						unified_serial_number = orderData['unified_serial_number'],
						// 订单号，显示在标题
						titleSerialNumber = unified_serial_number?unified_serial_number:serial_number,
						// 投放类型
						putTypeText = putTypeChange(Number(orderData['file_type'])),
						// 屏数
						buyCount = orderData['file_type']==='3'?Math.ceil(orderData['buyCount']/orderData['upFileNum']):orderData['buyCount'],
						buyCount = orderData['if_sub'] === 2?buyCount:1,
						// 单价
						adPrice = formatNumber(orderData['ad_price'],2,1),
						// 投放天数
						putDay = orderData['days'],
						// 总价
						sumPrice = formatNumber(orderData['sumPrice'],2,1),
						// 当前时间毫秒
						nowTimeMS = nowTime,
						// 开始时间毫秒
						startTimeMS = new Date(orderData['startDate'].replace(/-/g,"/")+' 00:00:00').getTime(),
						// 结束时间毫秒
						endTimeMS = new Date(orderData['endDate'].replace(/-/g,"/")+' 23:59:59').getTime(),
						// 订单类型
						orderType = Number(orderData['order_type']),
						// 订单状态
						orderStatus = Number(orderData['order_status']),
						// 上传数量 
						upFileNumHTML = '<span class="dis-in">上传数量</span><span class="dis-in fr">'+(Number(orderData['file_type'])===3?orderData['upFileNum']:'1')+'个</span>',
						// 删除订单
						deleteOrderHTML = (orderStatus === 1 || orderStatus > 4)?'<a id="deleteOrder'+titleSerialNumber+'" style="cursor:pointer;" class="fr col-999 font16"><i class="fa fa-trash-o" aria-hidden="true"></i></a>':'',
						// 取消原因
						cancelHTML = orderStatus===5?'<div><em class="red">取消原因：</em>'+orderData['result']+'</div>':'',
						// 显示的按钮
						buttonHTML = '',
						// 具体订单状态，需联合其它字段同时判断
						orderStatusText = '';
					// 判断订单状态
					if(orderStatus === 1){
						orderStatusText = "待付款";
					}else if(orderStatus < 4){
						orderStatusText = "处理中";
					}else if(orderStatus === 4 && orderType != 4){
						if(nowTimeMS < startTimeMS){
							orderStatusText = "待发布";
						}else if(startTimeMS <= nowTimeMS && nowTimeMS <= endTimeMS){
							orderStatusText = "播放中";
						}else if(nowTimeMS > endTimeMS){
							orderStatusText = "已取消";
						}
					}else if(orderType === 4 && orderStatus === 4){
						orderStatusText = "已取消";
					}else{
						if(orderStatus === 5){
							orderStatusText = "已取消";
						}else if(orderStatus === 6 || orderStatus === 8){
							orderStatusText = "已取消";
						}else if(orderStatus === 7 ){
							orderStatusText = "已取消";
						}else if(orderStatus === 9 ){
							orderStatusText = "已完成";
						}
					}
					// 根据订单状态展示不同的按钮
					if(orderStatus === 1){
						// 支付
						buttonHTML += '<a id=\'goPay{"orderNo":\"'+titleSerialNumber+'\","sumPrice":'+sumPrice+'}\' style="cursor:pointer;" class="dis-in"><i class="fa fa-money pad-r5" aria-hidden="true"></i>去支付</a>';
					}else if(orderStatus === 2){
						// 待上传
						buttonHTML += '<a href="updateOrUploadVideo.do?type=u&adNo='+titleSerialNumber+'&fileType='+orderData['file_type']+'&fileNum='+orderData['upFileNum']+'" target="_blank" class="dis-in"><i class="fa fa-upload pad-r5" aria-hidden="true"></i>上传'+putTypeText+'</a>';
					}else if(orderStatus === 3 || orderStatus === 5){
						// 查看和修改 
						buttonHTML += '<a href="lookVideo.do?adNo='+titleSerialNumber+'" target="_blank" class="dis-in"><i class="fa fa-building-o pad-r5" aria-hidden="true"></i>查看'+putTypeText+'</a>'
							       +  '<a href="updateOrUploadVideo.do?type=m&adNo='+titleSerialNumber+'&fileType='+orderData['file_type']+'&fileNum='+orderData['upFileNum']+'" target="_blank" class="dis-in"><i class="fa fa-pencil-square-o pad-r5" aria-hidden="true"></i>修改'+putTypeText+'</a>';
					}else if(orderStatus === 4/*审核通过*/ || orderStatus === 7){
						// 查看
						buttonHTML += '<a href="lookVideo.do?adNo='+titleSerialNumber+'" target="_blank" class="dis-in"><i class="fa fa-building-o pad-r5" aria-hidden="true"></i>查看'+putTypeText+'</a>';
					}else if(orderStatus === 6 || orderStatus === 8){
						// 不显示任何按钮
						buttonHTML = '';
					}else if(orderStatus === 9){
						// 已完成，只能查看
						buttonHTML += '<a href="lookVideo.do?adNo='+titleSerialNumber+'" target="_blank" class="dis-in"><i class="fa fa-building-o pad-r5" aria-hidden="true"></i>查看'+putTypeText+'</a>';
					}
					orderHTML += ''
							  +  '<li>'
							  +  '	<div class="wddd-list-e bg-f9 clear">'
							  +  '		<span>'
							  +	 '			<i class="fa fa-angle-right pad-r5" aria-hidden="true"></i>'
							  +	 '			订单编号：'+titleSerialNumber
							  +	 '		</span>'
							  +  deleteOrderHTML
							  +  '	</div>'
							  +  '	<div class="wddd-list-a">'
							  +  '		<div class="clear fl width100 pad-b10 bor-b pos-r">'
							  +  '  		<div class="fl width100">'
							  +  '    			<p class="fl width24">'
							  +	 '					<span class="dis-in">投放类型</span>'
							  +	 '					<span class="dis-in fr">'+putTypeText+'</span>'
							  +	 '				</p>'
							  +  '    			<p class="fr width32">'
							  +	 '					<span class="dis-in">单价</span>'
							  +	 '					<span class="dis-in fr">'+adPrice+'元/个</span>'
							  +  '				</p>'
							  +  '  		 </div>'
							  +  ' 	 		 <div class="fl width100">'
							  +  '   		 	<p class="fl width24">'
							  +	 '					<span class="dis-in">屏数</span>'
							  +	 '					<span class="dis-in fr">'+buyCount+'台</span>'
							  +	 '			 	</p>'
							  +  '    		 	<p class="fr width32">'
							  +  '					<span class="dis-in">投放天数</span>'
							  +  '					<span class="dis-in fr">'+putDay+'天</span>'
							  +	 '			 	</p>'
							  +  '	  		</div>'
							  +  '			<div class="fl width100">'
							  +  '     			<p class="fl width24">'
							  +  upFileNumHTML
							  +  '				</p>'
							  +  '   		</div>'
							  +  '		</div>'
							  +  '		<div class="pad-t10 clear">'
							  +
							  // 订单数据
							  function(){
								var
									// 返回的文本
									s = '',
									// 数据分为同时下多个订单和单独下单，需区分开来
									orderDatas = [],
									// 分订单数据长度
									jLength = 0;
								// 数据
								if(unified_serial_number){
									orderDatas = orderClassify[unified_serial_number];
								}else{
									orderDatas.push(orderData);
								}
								jLength = orderDatas.length;
								// 生成分订单数据
								for(var j=0;j<jLength;++j){
									var partOrderData = orderDatas[j],
										// 图片
										pics = partOrderData['pics']?imagePath+partOrderData['pics'].split(",")[0]:'/chinese/images/zwtp.png',
										// 广告屏编号
										deviceCode = partOrderData['device_code'],
										// 店铺名
										shopName = partOrderData['shop_name'],
										// 地址
										mailingAddress = partOrderData['mailing_address']?partOrderData['mailing_address'].replace(/[&*]/g,''):'',
										// class 标记，用于标记大于2条数据时隐藏的部分
										classSign = unified_serial_number + 'hideData';
									s += ''
									  +  '<div class="pos-r wddd-list-a2 bor-b '+(j>1?classSign+' hide':'')+'">'
									  +  '	<a target="_blank" href="/'+language+'/forward/screenDetail.do?checkAdvertiseId='+partOrderData.id+'&deviceId='+partOrderData.device_id+'&timeInterval='+partOrderData.idle_time+'&fileType=1" class="wddd-list-tp">'
									  +  '		<img src="'+pics+'" />'
									  +  '	</a>'
									  +  ' 	<div class="wddd-list-nr">'
									  +  '      <p><em class="">广告屏编号：</em>'+deviceCode+'</p>'
									  +  '		<p class="pad-t10"><em class="">店铺：</em>'+shopName+'</p>'
									  +  '   	<div class="pos-r pltf-dz pad-t10">'
									  +  '			<span>'+mailingAddress+'</span>'
									  +  '			<a href="javascript:void(0);" class="pos-a pltf-dz2 addrLogo">'
									  +  '				<i class="fa fa-map-marker red" aria-hidden="true"></i>'
									  +  '			</a>'
									  +  '		</div>'
									  +  '  </div>'
									  +  '</div>';
								}
								if(jLength>2){
									s += '<div class="clear yinxian text-c"><a style="cursor:pointer;" class="xianshi" id="showAll'+unified_serial_number+'">显示全部<i class="fa fa-angle-down pad-l5" aria-hidden="true"></i></a></div>'
								}
								return s;
							  }()
				              +  '  	</div>'
				              +  cancelHTML
				              +  '  </div>'
				              +  '	<div class="wddd-list-b">'
				              +  '		￥'+sumPrice
				              +  '	</div>'
				              +  '	<div class="wddd-list-c">'
				              +  ' 		<span class="red">'+orderStatusText+'</span>'
				              +  '	</div>'
				              +  '	<div class="wddd-list-d">'
				              +  buttonHTML
				              +  '  </div>'
				              +  '</li>';
				}
				$dataList.append(orderHTML);
				// 绑定'显示全部事件'
				if($('[id^=showAll]').length>0){
					$('[id^=showAll]').on('click',function(){
						var ths = this,
						$ths = $(ths),
						$partOrderData = $('.'+ths.id.replace('showAll','')+'hideData');
						if($partOrderData.hasClass('hide')){
							$partOrderData.removeClass('hide');
							$ths.text('隐藏');
						}else{
							$partOrderData.addClass('hide');
							$ths.text('显示全部');
						}
					});
				}
				// 地图显示事件
				$('.addrLogo').on('click',function(){
					var addr = $(this).parent().find('span').text();
					// 地图展示
					addrBMapDisplay(addr);
					addrBMapDisplay(addr);
				});
				// 支付按钮
				$('[id^=goPay]').on('click',function(){
					var ths = this,
						$ths = $(ths),
						payInfo = $.parseJSON(ths.id.replace('goPay',''));
					if($('#payDIV').length===0){
						$('body').append(
							  '<div class="shade" id="payDIV" style="display:none;">'
							+ '	<div class="tanchu" style="margin-top: -205px;">'
							+ '		<a style="cursor:pointer;" id="closePayDIV" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>'
							+ '		<div class="tanchu-bt font15">支付订单</div>'
							+ '     <br/>'
							+ '		<p class="col-999 text-c pad-b10 font14">'
							+ '			合计 <span class="red" id="totalPrice"></span> 元'
							+ '		</p>'
							+ '		<div class="mar-t10 bor-t2">'
							+ '			<h2 class="font13 pad-t10 pad-b10 pad-l20 bor-b2">选择支付方式</h2>'
							+ '			<ul class="tc-zf pad-q10">'
							+ '				<li id="payType0101" style="cursor:pointer;"><img src="/chinese/images/zf01.jpg" alt="微信"/></li>'
							+ '				<li id="payType0201" style="cursor:pointer;"><img src="/chinese/images/zf02.jpg" alt="支付宝" /></li>'
							+ '				<li id="payType0400" style="cursor:pointer;"><img src="/chinese/images/zf04.jpg" alt="翔云余额" /></li>'
							+ '				<li id="payType0301" style="cursor:pointer;"><img src="/chinese/images/zf03.jpg" alt="银联" /></li>'
							+ '			</ul>'
							+ '		</div>'
							+ '	    <div class="text-c pad-t5 pad-b15 pad-l15 pad-r15">'
							+ '			<input id="confirmPay" type="button" value="确认付款" class="btn btn02 bor-rad font13 bg-red width24">'
							+ '		</div>'
							+ '	</div>'
							+ '</div>'
						);
						// 绑定支付类型
						$('[id^=payType]').on('click',function(){
							var ths = this,
								$ths = $(ths);
							$('[id^=payType]').removeClass('active');
							$ths.addClass('active');
						})
						// 绑定关闭按钮
						$('#closePayDIV').on('click',function(){
							$('#payDIV').hide();
						});
					}
					$('#totalPrice').text(payInfo['sumPrice']);
					$('#confirmPay').unbind('click').bind('click',function(){
						// 支付方式
						var $payType = $('[id^=payType].active');
						if($payType.length<=0){
							tipInfo({
								status:'fail',
								content:'请选择支付方式'
							});
							return;
						}
						var payType = $payType.attr('id').replace('payType','');
						// 发送请求
						payOrder({
							payType:payType,
							orderNo:payInfo['orderNo']
						});
					});
					$('#payDIV').show();
				});
				// 绑定删除订单事件
				$('[id^=deleteOrder]').on('click',function(){
					var ths = this,
						$ths = $(ths),
						serialNumber = ths.id.replace('deleteOrder','');
					jsonAjax("/"+language+"/order/deleteOrder.do",
							{
								orderNo:serialNumber
							},function(res){
						if(res.success){
							tipInfo({
								status:'success',
								content:res.data
							});
							$ths.parents("li").remove();
							setTimeout(function(){
								$('#judgeTipDiv').hide();
							}, 500);
						}else{
							tipInfo({
								status:'fail',
								content:res.data
							});
						}
					},function(){});
				});
				// 分页代码
				pageNumber(totalRecords,obj,loadOrderInfo,'o');
			}else{
				// 无数据
				if(obj.pageNo == 1){
					$('#noData').show();
				}
			}
		}
		});
	}
	
	/**
	 * 根据状态查看订单数据
	 */
	function queryOrderByStatus(){
		$('[id^=orderStatus]').on('click',function(){
			var ths = this,
				$ths = $(ths),
				value = ths.id.replace('orderStatus','');
			$ths.parent().find("li").removeClass("active");
			$ths.addClass("active");
			//加载广告商品
			loadOrderInfo({
				pageNo:pageNo,
				pageSize:count,
				orderStatus:value
			});
		});
	}

})


/**
 * 搜索按钮
 */
function search(){
	var playIdle=$(".playIdle").find("option:selected").text();
	var orderStatus=$(".orderStatus").find("option:selected").val();
	var adName=$(".adName").val();
	if(playIdle=="全部"){
		playIdle="";
	}
	loadOrderInfo({
		pageNo:pageNo,
		pageSize:count,
		playIdle:playIdle,
		orderStatus:orderStatus,
		adName:adName
	});
}
