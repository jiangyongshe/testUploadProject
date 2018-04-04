$(function(){
	var page = 1;// 页码
	var ADCount = 16;// 每页显示的数量
	// 加载省市区
	initAddrExclusiveStreet();
	// 获取页面传入的keyword
	var pageKeyword = decodeURIComponent(getURLParam('keyword'));
	if(pageKeyword){
		$('#titleKeyword').val(pageKeyword);
	}
	// 初始化数据
	initStoreData({pageNo:page,pageSize:ADCount,keyword:pageKeyword});
	// 绑定搜索按钮
	bindSearchBtn();
	
	// 绑定页面图片放大事件
	$(document).on("click",".p7 img",function(){
		var cloneImg = this.cloneNode(true);
		cloneImg.style.height = '300px';
		$(this).parents('li').find('.a1>img').remove();
		$(this).parents('li').find('.a1').prepend(cloneImg);
	})
	$('.p7').find('img').on('click',function(){
		
	});
	/**
	 * 初始化数据
	 * @returns
	 */
	function initStoreData(param){
		jsonAjax('/'+language+'/exclude/AD/queryForStore.do',param,function(res){
			var count = res.count;
			var data = res.data;
			// 清空数据
			$('#storeData').empty();
			// 清空页码
			$('#storePageTurn').empty();
			if(count>0){
				var html = '';
				for(var i=0;i<data.length;++i){
					html += '<li>'+
								'<a href="/chinese/forward/confirmOrder.do?checkAdvertiseId='+String(data[i].advertiser_id).replace(',','')+'&deviceId='+data[i].device_id.replace(',','')+'&timeInterval='+data[i].play_begin_time+'-'+data[i].play_end_time+'&fileType=1" class="btn btn01 bg-red pos-a font16 rmgg-goum">'+
									'<i class="fa fa-shopping-cart" aria-hidden="true"></i> '+
									'购买'+
								'</a>'+
								'<div class="a1">'+
									function(pic){
										var pics = [];
										if(pic){
											pics = pic.split(',');
										}
										if(pics.length>0){
											return '<img src="'+imagePath+pics[0]+'" />';
										}else{
											return '<img style="height:300px;" src="/chinese/images/lun00.jpg" alt=""/>';
										}
									}(data[i].pics)+
									'<div class="rmgg-xx font12">'+
										'<p class="p1 font16">'+data[i].name+'</p>'+
										'<p class="p2">'+
											'价格：<span class="font16">'+data[i].price+'元/天</span>'+
										'</p>'+
										'<p class="p2">'+
											'广告时长: <span class="font16">'+data[i].ad_length+'秒</span>'+
										'</p>'+
									'</div>'+
								'</div>'+
								'<div class="a2 text-c font12">'+
									'<p class="p4 font16">'+data[i].name+'</p>'+
									'<p class="p5">地址：'+data[i].addr.replace(/\*/g,'').replace('&','')+'</p>'+
									'<p class="p6">'+
										'<span class="dis-in"><b class="col-999">设备编号：</b>'+data[i].device_code+'</span>'+
										'<span class="dis-in"><b class="col-999">广告时长：</b>'+data[i].ad_length+'秒</span> '+
										'<span class="dis-in"><b class="col-999">最低循环次数：</b>60次</span> '+//'+data[i].allPlayNumber+'
										'<span class="dis-in"><b class="col-999">价格：</b>￥'+data[i].price+'元/天</span> '+
										'<span class="dis-b"><b class="col-999">设备播放时段：</b>'+data[i].play_begin_time+'-'+data[i].play_end_time+'</span>'+
									'</p>'+
									'<p class="p7">'+
										function(pic){
											var pics = [];
											if(pic){
												pics = pic.split(',')
											}
											var imgHTML = '';
											for(var j=0;j<pics.length;++j){
												imgHTML+='<img src="'+imagePath+pics[j]+'"/>';
											}
											return imgHTML;
										}(data[i].pics)+
									'</p>'+
								'</div>'+
							'</li>'
				}
				$('#storeData').html(html);
				// 添加事件
				storeDetail();
				// 分页
				pageNumber(count,param,initStoreData,'store');
			}
		},function(){})
	}
	
	/**
	 * 绑定搜索按钮
	 * @returns
	 */
	function bindSearchBtn(){
		$('#search').on('click',function(){
			// 地址
			var province = $('[name="province"]').find('option:selected').text().trim();
			var city = $('[name="city"]').find('option:selected').text().trim();
			var area = $('[name="area"]').find('option:selected').text().trim();
			var addr = '';
			if(province.indexOf('请选择')==-1){
				addr += province+'*';
			}
			if(city.indexOf('请选择')==-1){
				addr += city+'*';
			}
			if(area.indexOf('请选择')==-1){
				addr += area;
			}
			// 价格
			var lessPrice = $('#lessPrice').val().trim();
			var greaterPrice = $('#greaterPrice').val().trim();
			// 关键字
			var keyword = $('#keyword').val().trim();
			initStoreData({
				addr : addr,
				lessPrice:lessPrice,
				greaterPrice:greaterPrice,
				keyword:keyword,
				pageNo:page,
				pageSize:ADCount
			});
		});
	}
});