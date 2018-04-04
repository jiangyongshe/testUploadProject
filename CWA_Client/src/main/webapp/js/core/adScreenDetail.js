$(function(){
	var picPrice,  // 图片单价
		videoPrice,// 视频单价
		adScreenArr = [];// 广告屏数据
	
	// 初始化数据
	initData();
	
	// 日期选择
	dateChoose();
	
	// 绑定选择图片、视频类型按钮
	typeChoose();
	
	// 投放数量选择
	chooseNum();
	
	// 支付类型
	choosePayType();
	
	// 付款按钮
	payBtn();
	
	/**
	 * 初始化数据
	 */
	function initData(){
		// 获取传入的参数
		var checkAdvertiseId = getURLParam('checkAdvertiseId'),
			deviceId = getURLParam('deviceId'),
			timeInterval = getURLParam('timeInterval'),
			fileType = getURLParam('fileType');
		$.ajaxEp({
			url:'/'+language+'/customer/queryConfimBuyAdvertiseInfo.do',
			param:{
				checkAdvertiseId:checkAdvertiseId,
				deviceId:deviceId,
				timeInterval:timeInterval,
				fileType:fileType
			},
			success:function(res){
				// 广告屏数据,包装成 value-object的形式
				adScreenArr.push({
					value:res.data[0]
				});
				var success = res.success;
				discount = Number(res.msg);// 折扣
				if(adScreenArr!=null&&adScreenArr!=[]&&success){
					var dto = adScreenArr[0]['value'],
						device_code = dto.device_code,
						playingNum = dto.currPlayCount?dto.currPlayCount:0,
						shopName = dto.shop_name,
						address = dto.mailing_address.replace(/[*&]/g,'');
					picPrice   = dto['pic_price'];
					videoPrice = dto['ad_price'];
					$('#deviceCode').text(device_code);
					$('#playingNum').text(playingNum);
					$('#shopName').text(shopName);
					$('#address').text(address).parent().find('a').on('click',function(){
						// 地图展示
						addrBMapDisplay(address);
						addrBMapDisplay(address);
					});
					// 图片
					var pic = dto.pics,
						firstImgSrc;
					if(pic){
						var pics = pic.split(",");
						for(var i=0;i<pics.length;++i){
							var path = imagePath+pics[0];
							if(i === 0){
								firstImgSrc = path;
							}
							$('#thumblist').append(
							    '<li>'
							   +'	<a href="javascript:void(0);" class="zoomThumbActive" rel="{gallery: \'gal1\', smallimage: \''+path+'\',largeimage: \''+path+'\'}">'
							   +'		<img src="'+path+'" height="15%" width="15%"/>'
							   +'	</a>'
							   +'</li>'
							);
						}
						$('.t2').html(
							'<a href="'+firstImgSrc+'" class="jqzoom" rel="gal1" title="triumph">' 
						   +'	<img src="'+firstImgSrc+'" height="100%" width="100%" title="triumph"/>'
						   +'</a>'
						);
						// 放大镜
						$('.jqzoom').jqzoom({
				            zoomType: 'standard',
				            lens:true,
				            preloadImages: false,
				            alwaysOn:false,
				            title:false
				            /*
				            zoomWidht:　　小图片所选区域的宽度。
							zoomHeight:　  小图片所选区域的高度。
							zoomType:　　 默认值为standard。如果设为reverse，在小图片仲，移入鼠标时，所选区域高亮，非选中区域淡灰色。
							xOffset:　　　　放大后的图片与小图片间的X(横坐标)距离。
							yOffset:　　　　放大后的图片与小图片间的Y(纵坐标)距离。
							position:　　　  放大后的图片相对原图片的位置，默认为"right",还可设置为"left","top","bottom"。
							lens:　　　　　　布尔值，表示是否显示小图片中的选中区域，默认值为"true",如果设为"false"，则放大后的图片上面不会出现主题字样。
							imageOpacity:　当zoomType的值为"reverse"时，用来设置非选中区域透明度的值。取值范围在(0.0-1.0)间。
							preloadImages：布尔值，表示是否重新加载大图像。
							preloadText：　 重新加载大图像时，小图像显示的文本说明。
							title：　　　　　 大图像顶部是否显示<a>标签里的title。
							showEffect:　　 大图像加载时的特效，可选值:"show"表示直接显示，"fadein"由透明度渐变载入效果。
							hideEffect：　　 大图像隐藏特效，可选值："hide"表示直接隐藏，"fadeout"透明度渐变隐藏。　　
							fadeinSpeed:　　当大图像的载入特效设为"fadein"时，此属性可设置特效的时间，可选值为'fast','slow',number分别代表，快慢，毫秒数。
							fadtoutSpeed:　 当大图像的隐藏特效设为"fadeout"时，此属性可设置特效载的时间，可选值为'fast','slow',number分别代表，快慢，毫秒数。
							*/
				        });
					}else{
						firstImgSrc = '/chinese/images/zwtp.png';
						$('.t2').html(
							'<a>' 
						   +'	<img src="'+firstImgSrc+'" height="100%" width="100%"/>'
						   +'</a>'
						);
					}
				}else{
					tipInfo({
						status:'fail',
						content:'加载失败'
					});
				}
			}
			
		});
		// 日期初始化
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
			startYear : currYear, //开始年份
			endYear : currYear + 3//结束年份
		};
		// 最大最小日期限制
		var min = new Date(nowTime+1*24*3600*1000),
			max = new Date(),
			$confirmOrderStartTime = $("#confirmOrderStartTime"),
			$confirmOrderEndTime = $('#confirmOrderEndTime');
		max.setFullYear(min.getFullYear()+3);
		max.setDate(min.getDate());
		min = min.format(DATE_FORMAT_YTD);
		max = max.format(DATE_FORMAT_YTD);
		$confirmOrderStartTime.attr('max',max).attr('min',min).mobiscroll($.extend(opt['date'], opt['def']));
		$confirmOrderEndTime.attr('max',max).attr('min',min).mobiscroll($.extend(opt['date'], opt['def']));
		// 日期默认为一星期
		$confirmOrderStartTime.val(new Date(nowTime+1*24*3600*1000).format(DATE_FORMAT_YTD));
		$confirmOrderEndTime.val(new Date(nowTime+7*24*3600*1000).format(DATE_FORMAT_YTD));
	}
	
	/**
	 * 日期选择
	 */
	function dateChoose(){
		$("#confirmOrderStartTime,#confirmOrderEndTime").on('change',function(){
			// 当选择完日期后计算总价
			calculTotalPrice(adScreenArr);
		});
	}
	
	/**
	 * 绑定选择图片、视频类型按钮
	 */
	function typeChoose(){
		$('#choosePic,#chooseVideo').on('click',function(){
			var ths = this, 
				$ths = $(ths), 
				id = this.id;
			$('[id^=choose]').removeClass('active');
			$ths.addClass('active');
			if(id.indexOf('Pic')!=-1){// 选择的是图片
				$('#typePrice').text(formatNumber(picPrice,2,1));
				// 折扣价
				if(discount!=1){
					$('#discountTypePrice').text(formatNumber(Number(picPrice)*discount,2,1)).parent().show().parent().removeClass('pad-t5');
				}
				// 计算总价
				calculTotalPrice(adScreenArr);
			}else if(id.indexOf('Video')!=-1){// 选择的是视频
				$('#typePrice').text(formatNumber(videoPrice,2,1));
				// 折扣价
				if(discount!=1){
					$('#discountTypePrice').text(formatNumber(Number(videoPrice)*discount,2,1)).parent().show().parent().removeClass('pad-t5');
				}
				// 计算总价
				calculTotalPrice(adScreenArr);
			}
		});
	}
	
	/**
	 * 投放数量选择
	 */
	function chooseNum(){
		// 绑定投放数量输入框
		$('#putInCount').on('input',function(event){
		    // 检验输入是否合法并且是否在合理的数量范围内
			var $ths  = $('#putInCount'),
		    	value = $ths.val();
			if(/[^\d]/g.test(value)) 
				value = value.replace(/[^\d]/g,'');
			if(value === '' || Number(value)<1)
				value = 1;
			else if(Number(value)>maxBuyCount)
				value = maxBuyCount;
			$ths.val(value);
		    // 计算总价
			calculTotalPrice(adScreenArr);
		});
		// 绑定投放数量'-'按钮
		$('#reducePutInCount').on('click',function(){
			var $ths  = $('#putInCount'),
	    		value = Number($ths.val());
			if(!value||isNaN(value)||value<=1){
				$ths.val(1);
			}else{
				$ths.val(value-1);
			}
			// 计算总价
			calculTotalPrice(adScreenArr);
		});
		// 绑定投放数量'+'按钮
		$('#addPutInCount').on('click',function(){
			var $ths  = $('#putInCount'),
				value = Number($ths.val());
			if(!value||isNaN(value)){
				$ths.val(1);
			}else if(value>=maxBuyCount){
				$ths.val(maxBuyCount);
			}else{
				$ths.val(value+1);
			}
			// 计算总价
			calculTotalPrice(adScreenArr);
		});
	}
	
	/**
	 * 支付类型
	 */
	function choosePayType(){
		// 绑定支付类型
		$('[id^=payType]').on('click',function(){
			var ths = this,
				$ths = $(ths);
			$('[id^=payType]').removeClass('active');
			$ths.addClass('active');
		})
	}
	
	/**
	 * 付款按钮
	 */
	function payBtn(){
		$('#payBtn').on('click',function(){
			// 创建订单并且付款
			createOrderAndPay(adScreenArr,1);
		});
	}
})