$(function() {
	var // 当前页数据
		currPageData = [],
		// 已经选中的数据
		checkedAdData = [],
		// 购物车数据总量
		allDataLength = 0;
	
	// 加载广告商品
	loadShoppCartInfo({
		pageNo : 1,
		pageSize : 10
	});
	
	// 付款按钮
	payBtn();
	
	/**
	 * 加载广告商品
	 * @param obj
	 */
	function loadShoppCartInfo(obj) {
		$('#shopCartPageTurn,#shopCartData').empty();
		$('#settle').parent().hide();
		$.ajaxEp({
			url:'/'+language+'/shoppCart/queryShoppCart.do',
			param:obj,
			openWaitingAnimation:false,
			success:function(res){
				var data = res.data,
					list = data.list,
					length = list.length,
					totalRecords = data.totalRecords;
				allDataLength = totalRecords;
				discount = Number(res.msg);// 折扣
				if (data != null && data != [] && length > 0) {
						// 缓存当前页数据
						currPageData = list;
						$('#noData').hide();
						$('#settle').parent().show();
						var html = '',
							disCount = res.msg,
							$shopCartData = $('#shopCartData');
						// 数据头部
						$shopCartData.html(
							 '<li class="wddd-list-bt">'
							+'    <div class="wddd-list-a pos-r">'
							+'     <label class="checkbox pos-a ddrq"><input type="checkbox" '+(totalRecords===checkedAdData.length?'checked':'')+' name="checkbox" class="checkAll"><i>✓</i> 全选</label>'
							+'       订单详情'
							+'    </div>'
							+'    <div class="wddd-list-d">操作</div>'
							+'</li>'
						);
						// 数据内容
						for (var i = 0; i < length; i++) {
							html = '';
							var dto = list[i], 
								imgSrc = '',
								pics = dto.pics;
							if (pics != null && pics != "") {
								imgSrc = imagePath + pics.split(",")[0];
							}else{
								imgSrc = '/chinese/images/zwtp.png'
							}
							html += ''
								 +  '<li id="'+dto['id']+'">'
								 +  '	<div class="wddd-list-e bg-f9 clear">'
								 +  '		<label class="checkbox dis-in pad-r10 pad-l5"><input type="checkbox" data-id="100014" name="checkbox" class="checkAd"><i>✓</i></label>'
								 +  '	</div>'
								 +  '	<div class="wddd-list-a">'
								 +  '		<div class="pos-r wddd-list-a2 bor-b">'
								 +  '			<a target="_blank" href="/'+language+'/forward/screenDetail.do?checkAdvertiseId='+dto['advertiser_id']+'&deviceId='+dto['device_id']+'&timeInterval='+dto['begin_time']+'-'+dto['end_time']+'&fileType=1" class="wddd-list-tp"><img src="'+imgSrc+'" /></a>'
								 +  '   		<div class="wddd-list-nr">'
								 +  ' 				<p><em class="">广告屏编号：</em>'+dto['device_code']+'</p>'
								 +  '				<p class="pad-t10"><em class="">店铺：</em>'+dto['shop_name']+'</p>'
								 +  '				<div class="pos-r pltf-dz pad-t10"><span class="">'+dto['mailing_address'].replace(/[*&]/g,'')+'</span><a href="javascript:void(0);" class="pos-a pltf-dz2 addrLogo"><i class="fa fa-map-marker red" aria-hidden="true"></i></a></div>'
								 +  '			</div>'
								 +  '		</div>'
								 +  '	</div>'
								 +  '	<div class="wddd-list-d">'
								 +  '		<a href="javascript:void(0);" class="dis-in deleteOrder"><i class="fa fa-trash-o pad-r5" aria-hidden="true"></i>删除订单</a>'
								 +  '	</div>'
								 +	'</li>';
							$shopCartData.append(html);
						}
						/**
						 * 绑定地图展示事件
						 */
						$('.addrLogo').on('click',function(){
							var addr = $(this).parent().find('span').text();
							// 地图展示
							addrBMapDisplay(addr);
							addrBMapDisplay(addr);
						});
						/**
						 * 选中事件
						 */
						$('.checkAd').on('click',function(){
							var ths = this,
								$ths = $(this),
								shopCartId = $ths.parents('li').attr('id'),
								checkData;
							// 根据选中的购物车ID找到相关数据
							for(var i=0;i<currPageData.length;++i){
								var data = currPageData[i];
								if(String(data['id']) === String(shopCartId)){
									checkData = data
									break;
								}
							}
							if($ths.is(':checked')){
								// 缓存选中数据
								if(checkData){
									disposeCacheData({
										isAdd:true,
										data:checkData
									});
								}
							}else{
								// 清掉缓存的数据
								if(checkData){
									disposeCacheData({
										isAdd:false,
										data:checkData
									});
								}
							}
						});
						
						/**
						 * 全选按钮
						 */
						$('.checkAll').on('click',function(){
							var ths = this,
								$ths = $(this);
							if($ths.is(':checked')){
								// 查询所有数据
								$.ajaxEp({
									url:'/'+language+'/shoppCart/queryShoppCart.do',
									param:{
										pageNo : 1,
										pageSize : 99999
									},
									success:function(res){
										var data = res.data,
											list = data.list,
											length = list.length;
										if (data != null && data != [] && length > 0) {
											for(var i=0;i<length;++i){
												var dto = list[i];
												// 缓存数据
												disposeCacheData({
													isAdd:true,
													data:dto
												});
												// 选择所有选项
												$('#shopCartData').find('.checkAd').prop('checked',true);
											}
										}
									}
								});
							}else{
								// 清空缓存数据
								checkedAdData = [];
								// 统计选屏数量
								checkAdNum();
								// 取消所有选项
								$('#shopCartData').find('.checkAd').prop('checked',false);
							}
							
						});
						/**
						 * 绑定删除订单事件
						 */
						$('.deleteOrder').on('click',function(){
							var ths = this,
								$ths = $(this),
								shopCartId = $ths.parents('li').attr('id');
							$.ajaxEp({
								url:'/'+language+'/shoppCart/reJectShoppCart.do',
								param:{
									cartId:shopCartId
								},
								openWaitingAnimation:false,
								success:function(res){
									if(res.respCode==='10000'){
										// 删除成功,刷新当前页面
										// 如果当前页的数据和删除的数据相同，则加载下一页数据，若没有下一页，则加载当前页数据
										var $currPage = $('[id^=shopCartPageNumberOf].active');
										var currPage = Number($currPage.text());
										if($('#shopCartData li').length-1 === shopCartId.split(',').length){
											if($('[id^=shopCartPageNumberOf'+(currPage+1)+']').length === 1){
												$currPage.click();
											}else if($('[id^=shopCartPageNumberOf'+(currPage-1)+']').length === 1){
												$('[id^=shopCartPageNumberOf'+(currPage-1)+']').click();
											}else{
												$('[id^=shopCartPageNumberOf1]').click();
											}
										}else{
											$currPage.click();
										}
										// 修改头部的购物车数量
										$('#buyCarCount').text(Number($('#buyCarCount').text())-1);
									}else{
										tipInfo({
											status:'fail',
											content:res.respMessge
										});
									}
								}
							});
						});
						// 分页代码
						pageNumber(totalRecords, obj, loadShoppCartInfo, 'shopCart');
						// 根据选中的缓存数据勾选数据
						checkCacheData();
				} else {
						$('#noData').show();
						
					}
				}
		});
	}
	
	/**
	 * 付款按钮
	 */
	function payBtn(){
		$('#settle').on('click',function(){
			if(checkedAdData.length>0){
				confirmOrder(checkedAdData,2);
			}else{
				tipInfo({
					status:'normal',
					content:'请勾选需要购买的订单'
				});
			}
		});
	}
	
	/**
	 * 统计选屏数量
	 */
	function checkAdNum(){
		$('#checkedBuyCartCount').text(checkedAdData.length+'条');
		// 判断是否选中了所有选项
		if(checkedAdData.length === allDataLength){
			// 全选按钮设为未选中
			$('.checkAll').prop('checked',true);
		}else{
			// 全选按钮设为选中
			$('.checkAll').prop('checked',false);
		}
	}
	
	/**
	 * 根据选中的缓存数据勾选数据
	 */
	function checkCacheData(){
		for(var i=0;i<checkedAdData.length;++i){
			var $li = $('#'+checkedAdData[i]['value']['shopCartId']);
			if($li.length === 1){
				$li.find('.checkAd').click();
			}
		}
	}
	
	/**
	 * 处理缓存数据
	 * @param obj.isAdd 是否加入缓存
	 * @param obj.data  加入/删除缓存的数据
	 */
	function disposeCacheData(obj){
		var isAdd = obj.isAdd,
			data = obj.data,
			key = data['device_code']+data['device_id']+data['begin_time']+'-'+data['end_time'];
		if(isAdd){
			// 判断缓存中是否已经缓存了此数据
			var existCache = false;
			for(var i=0;i<checkedAdData['length'];++i){
				if(key === checkedAdData[i]['key']){
					existCache = true;
					break;
				}
			}
			// 缓存选中的数据
			if(!existCache){
				checkedAdData.push({
					key:key,
					value:{
						id:data['advertiser_id'],
						pic_price:data['pic_price'],
						ad_price:data['price'],
						device_id:data['device_id'],
						idle_time:data['begin_time']+'-'+data['end_time'],
						shopCartId:data['id']
					}
				});
			}
		}else{
			// 清掉缓存的数据
			for(var i=0;i<checkedAdData['length'];++i){
				if(key === checkedAdData[i]['key']){
					checkedAdData.splice(i,1);
					break;
				}
			}
		}
		// 统计选屏数量
		checkAdNum();
	}
	
})
