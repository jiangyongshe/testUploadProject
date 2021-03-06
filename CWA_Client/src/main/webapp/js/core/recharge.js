$(function(){
	// 交易单号
	var tranNo;
	
	// 充值方式的选择
	rechargeChoose();
	
	// 查询是否存在卡号
	cardInfo();
	
	// 发送验证码按钮
	sendVerificationCode();
	
	// 提交按钮
	submit();
	
	/**
	 * 充值方式的选择
	 */
	function rechargeChoose(){
		$('[id^=payType]').on('click',function(){
			var ths = this,
				$ths = $(this),
				payType = ths.id.replace('payType','');
			$ths.parent().find('li').removeClass('active');
			$ths.addClass('active');
			switch(payType){
			case '0101':// 微信
			case '0201':// 支付宝
				$('#cardNo').parent().hide();
				$('#mobile').parent().hide();
				$('#verificationCode').parent().hide();
				break;
			case '0301':// 银联
				$('#cardNo').parent().show();
				$('#mobile').parent().show();
				// 判断输入的卡号是否是缓存数据
				judgeCardNo();
				break;
			}
		});
	}
	
	/**
	 * 发送验证码按钮
	 */
	function sendVerificationCode(){
		$('#getVerificationCode').on('click',function(){
			// 发送的参数
			var ajaxParam = {
				sendMsg : 1
			};
			// 充值方式
			if($('[id^=payType].active').length!=1){
				tipInfo({status:'normal',content:'请选择充值方式'});
				return;
			}
			var payType = $('[id^=payType].active')[0].id.replace('payType','');
			ajaxParam.pay_type = payType;
			// 充值金额
			var money = $('#money').val().trim();
			if(money === ''){
				tipInfo({status:'normal',content:'请输入充值金额'});
				return;
			}
			if(isNaN(money) || (money=Number(money))<0){
				tipInfo({status:'normal',content:'充值金额格式不正确'});
				return;
			}
			if(money>3000){
				tipInfo({status:'normal',content:'充值金额不能大于3000'});
				return;
			}
			ajaxParam.AMOUNT = money;
			// 判断银行卡号是否曾经充值过
			var hasExist = false;
			for(var i=0;i<cardData.length;++i){
				var cardNo = $('#cardNo').val().trim();
				if(cardData[i]['bank_card_code'] === cardNo){
					hasExist = true;
					ajaxParam.cardCode = cardNo;
					ajaxParam.mobile = cardData[i]['mobile'];
					judgeCardNo();
					break;
				}
			}
			if(!hasExist){
				tipInfo({status:'normal',content:'卡号不存在'});
				return;
			}
			// 发送请求
			$.ajaxEp({
				url:'/'+language+'/customerWallet/walletRecharge.do',
				param:JSON.stringify(ajaxParam),
				timeout : 30000,
				contentType:"application/json",
				success : function(res) {
					var data = res.data;
					if(res.msg=="10000"){
						tipInfo({status:'success',content:'发送验证码成功'});
						// 交易单号
						tranNo = data;
						// 禁用输入框
						$('#money,#cardNo,#mobile').addClass('disabled');
						// 倒计时
						verificationCodeInterval({
							btnEle:document.getElementById('getVerificationCode'),
							time:120,
							endFn:function(){
								$('#money,#cardNo,#mobile').removeClass('disabled');
							}
						});
					}else{
						tipInfo({status:'normal',content:data});
					}
				}
			});
		});
	}
	
	/**
	 * 提交按钮
	 */
	function submit(){
		$('#submit').on('click',function(){
			// 传递的参数
			var ajaxParam = {
				FLOW_TYPE:1
			};
			// 充值方式
			if($('[id^=payType].active').length!=1){
				tipInfo({status:'normal',content:'请选择充值方式'});
				return;
			}
			var payType = $('[id^=payType].active')[0].id.replace('payType','');
			ajaxParam.pay_type = payType;
			// 充值金额
			var money = $('#money').val().trim();
			if(money === ''){
				tipInfo({status:'normal',content:'请输入充值金额'});
				return;
			}
			if(isNaN(money) || (money=Number(money))<0){
				tipInfo({status:'normal',content:'充值金额格式不正确'});
				return;
			}
			ajaxParam.AMOUNT = money;
			// 判断是否为银联充值
			if(payType === '0301'){
				// 充值金额不能大于3000
				if(money>3000){
					tipInfo({status:'normal',content:'银联方式下充值金额不能大于3000'});
					return;
				}
				// 判断银行卡号是否曾经充值过
				var hasExist = false;
				for(var i=0;i<cardData.length;++i){
					if(cardData[i]['bank_card_code'] === $('#cardNo').val().trim()){
						hasExist = true;
						ajaxParam.cardCode = $('#cardNo').val().trim();
						ajaxParam.mobile = cardData[i]['mobile'];
						judgeCardNo();
						break;
					}
				}
				if(hasExist){
					// 判断是否发送了验证码
					if(!tranNo){
						tipInfo({status:'fail',content:'请先获取验证码'});
						return;
					}
					ajaxParam.tranNo = tranNo;
					// 手机号验证码
					var verificationCode = $('#verificationCode').val().trim();
					if(verificationCode === ''){
						tipInfo({status:'fail',content:'请输入验证码'});
						return;
					}
					ajaxParam.smsCode = verificationCode;
				}else{
					// 验证卡号格式是否正确
					var cardNo = $('#cardNo').val().trim();
					if(cardNo === ''){
						tipInfo({
							status:'fail',
							content:'请输入银行卡号'
						})
						return;
					}
					if(!checkCard(cardNo)){
						tipInfo({
							status:'fail',
							content:'银行卡号格式不正确'
						})
						return;
					}
					ajaxParam.cardCode = cardNo;
					// 判断手机号格式是否正确
					var mobile = $('#mobile').val().trim();
					if(mobile === ''){
						tipInfo({
							status:'fail',
							content:'请输入手机号'
						})
						return;
					}
					if(!REG_MOBILE.test(mobile)){
						tipInfo({
							status:'fail',
							content:'手机号格式不正确'
						})
						return;
					}
					ajaxParam.mobile = mobile;
				}
			}
			// 提交数据
			$.ajaxEp({
				url:'/'+language+'/customerWallet/walletRecharge.do',
				param:JSON.stringify(ajaxParam),
				timeout:30000,
				contentType:"application/json",
				success:function(res){
					var success = res.success,
						data = res.data;
					if(success){
						switch(payType){
						case '0101':// 微信
							wechatPay(data,res.msg);
							break;
						case '0201':// 支付宝
							$("body").html(data);
							break;
						case '0301':// 银联
							// 判断是否新卡
							var isNewCard = false;
							for(var i=0;i<cardData.length;++i){
								if(cardData[i]['bank_card_code'] === ajaxParam.cardCode){
									isNewCard = true
									break;
								}
							}
							if(isNewCard){
								// 绑定新卡 ，跳转到银联页
								$("body").html(data);
							}else{
								// 使用已绑定的卡，跳转到充值成功页
								window.location.href = '/'+language+'/html/successTrip.html?i=recharge';
							}
							break;
						}
					}else{
						tipInfo({status:'fail',content:data});
					}
				}
			});
		});
	}
	
})