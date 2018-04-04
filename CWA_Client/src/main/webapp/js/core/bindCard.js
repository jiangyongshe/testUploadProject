$(function(){
	
	// 判断是否存在签约姓名
	judgeExistSignName();
	
	// 初始化省份和城市
	initProvinceAndCity();
	
	// 提交按钮
	submit();
	
	/**
	 * 判断是否存在签约姓名
	 */
	function judgeExistSignName(){
		if(userName)
			$('#signName').val(userName).addClass('disabled');
	}
	
	/**
	 * 初始化省份和城市
	 */
	function initProvinceAndCity(){
		// 初始化省份
		var $province = $('#province');
		var provinces = ChineseDistricts['86'];
		for(var f in provinces){
			for(var i=0;i<provinces[f].length;++i){
				$('#province').append('<option value="'+provinces[f][i]['code']+'">'+provinces[f][i]['address']+'</option>');
			}
		}
		// 当选择省份时加载相关城市
		$province.on('change',function(e){
			var $city = $('#city'), 
				val = $(this).val(),
				citys = ChineseDistricts[val];
			$city.html('<option value="">-请选择-</option>');
			for(var f in citys){
				$city.append('<option value="'+f+'">'+citys[f]+'</option>');
			}
		});
	}
	
	/**
	 * 提交按钮
	 */
	function submit(){
		$('#submit').on('click',function(){
			var $fillData = $('#fillData').find('select,input'),
				ajaxParam = {};
			for(var i=0;i<$fillData.length;++i){
				var $selectOrInput = $fillData.eq(i),
					val = $selectOrInput.val().trim(),
					text = $selectOrInput.parent().find('span').text(),
					id = $selectOrInput.attr('id');
				if(val === ''){
					tipInfo({
						status:'normal',
						content:$selectOrInput[0].tagName==='INPUT'?(text+'不能为空'):('请选择'+text)
					})
					return;
				}
				switch(id){
				case 'signName':// 签约姓名
					if(val.length>20||val.length<2){
						tipInfo({
							status:'normal',
							content:text+'长度应在2~20之间'
						})
						return;
					}
					ajaxParam['bank_card_name'] = val;
					break;
				case 'credentialsNo':// 证件号
					if(!validateIdCard(val)){
						tipInfo({
							status:'normal',
							content:text+'格式不正确'
						})
						return;
					}
					ajaxParam['papers_code'] = val;
					break;
				case 'mobile':// 手机号
					if(!REG_MOBILE.test(val)){
						tipInfo({
							status:'normal',
							content:text+'格式不正确'
						})
						return;
					}
					ajaxParam['mobile'] = val;
					break;
				case 'cardNo':// 银行卡号
					if(!checkCard(val)){
						tipInfo({
							status:'normal',
							content:text+'格式不正确'
						})
						return;
					}
					ajaxParam['bank_card_code'] = val;
					break;
				case 'userType':// 用户类型
					ajaxParam['account_type'] = val;
					break;
				case 'withdrawType':// 提现类型
					ajaxParam['card_type'] = val;
					break;
				case 'credentialsType':// 证件类型
					ajaxParam['papers_type'] = val;
					break;
				case 'openBank':// 开户行
					ajaxParam['open_account_bank_name'] = val;
					break;
				case 'subBranch':// 支行名称
					ajaxParam['branch_name'] = val;
					break;
				}
			}
			// 地址
			ajaxParam['bank_code'] = $('#province').find('option:selected').text()+','+$('#city').find('option:selected').text();
			// 提交数据
			$.ajaxEp({
				url:'/'+language+'/AD/bankCard.do',
				param:ajaxParam,
				success:function(res){
					var code = res.msg,
						data = res.data;
					if(code!='10000'){
						tipInfo({
							status:'fail',
							content:data
						});
					}else{
						tipInfo({
							status:'success',
							content:'绑卡成功,正在前往出金页面...'
						});
						setTimeout(function(){
							window.location.href='/'+language+'/forward/withdraw.do';
						},3000);
					}
				}
			});
		});
	}
	
})