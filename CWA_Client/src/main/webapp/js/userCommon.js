// 初始化数据
$.ajax({
	url:'/'+language+'/user/loadUser.do',
	type:'post',
	data:{},
	dataType:'json',
	async:false,
	timeout:10000,
	success:function(res){
		var code = res.msg,
			data = res.data;
		// 赋值全局变量
		nowTime = data.nowTime;
		imagePath = data.imagePath;
		videoUrl = data.videoUrl;
		switch(Number(code)){
		case 10001:// 未登录
			$('#loginRegisterDIV').show();
			$('#userName').parent().removeClass('hide').addClass('hide');
			break;
		default:// 已登录
			userType = String(code);// 用户类型
			$('#userName').parent().removeClass('hide');
			var userData = data.userData;
			havaWPWD = userData.havaWPWD;// 是否设置了出金密码
			// 赋值全局变量
			userName = userData['user_name'];
			email = userData['email'];
			accountId = userData['account_id'];
			userName = userData['user_name'];
			// 显示用户名
			$('#userName').text(accountId);
			$('#userName').parent().show();
			$('#userName').parent().parent().show();
			$('#userName').attr('href','/'+language+'/forward/customerAdvertise.do');
			// 加载购物车数量
			var $buyCarCount = $("#buyCarCount");
			if($buyCarCount.length>0){
				$buyCarCount.text(userData.shoppCount);
			}
		}
	},
	error:function(){
		tipInfo({
			status:'fail',
			content:'未知异常'
		});
	}
});

/**
 * 退出登录
 */
function exitLogin(){
	jsonAjax('/'+language+'/user/exit.do',{},
			function(res){
		if(res.respCode=='10000'){
			clearLocalStorage();
			// 跳去注册页
			location.href = '/'+language+'/forward/index/cm.do';
			return;
		}
	},
	function(){});
}

/**
 * 搜索广告
 */
function searchAdvertise(){
	var href=window.location.href;
	var adName=$("#inputSearch").val();
	window.location.href="/"+language+"/forward/customerAdvertise.do?adName="+encodeURI(adName);
}

/**
 * 我的资料
 */
function myProfile(){
	if($('#myProfile').length === 0){
		$('body').append(
			'<div class="shade" id="myProfile" style="display:none;">'
		   +'	<div class="tanchu" style="margin-top: -160px;">'
		   +'		<a style="cursor:pointer;" id="closeMyProfile" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>'
		   +'		<div class="tanchu-bt font15" id="myProfile_modify">'
		   +'			我的资料'
		   +'			<a id="" class="fr font14" style="cursor:pointer;">'
		   +'				<i class="fa fa-pencil-square-o pad-r5" aria-hidden="true"></i>'
		   +'				修改'
		   +'			</a>'
		   +'		</div>'
		   +'		<ul class="ggtf-sc2 pad-t10 pad-b15 font14">'
		   +'			<li>'
		   +'				<span class="pos-a ggtf-sc-bt">用户名</span>'
		   +'				<input type="text" class="wenb03 disabled" placeholder="'+accountId+'" />'
		   +'			</li>'
		   +'			<li>'
		   +'				<span class="pos-a ggtf-sc-bt">真实姓名</span>'
		   +'				<input id="myProfile_name" type="text" class="wenb03 disabled" placeholder="请输入真实姓名" />'
		   +'			</li>'
		   +'			<li>'
		   +'				<span class="pos-a ggtf-sc-bt">邮箱</span>'
		   +'				<input id="myProfile_email" type="text" class="wenb03 disabled" placeholder="请输入邮箱" />'
		   +'			</li>'
		   +'			<li>'
		   +'				<input id="myProfile_submit" type="button" value="提 交" class="disabled btn btn05 bg-red font16" />'
		   +'			</li>'
		   +'		</ul>'
		   +'	</div>'
		   +'</div>'
		);
		// 初始化值
		$('#myProfile_name').val(userName);
		$('#myProfile_email').val(email);
		// 绑定修改按钮
		$('#myProfile_modify').on('click',function(){
			// 真实姓名框
			var $myProfile_name = $('#myProfile_name');
			if($myProfile_name.hasClass('disabled')){
				$myProfile_name.removeClass('disabled');
			}else{
				$myProfile_name.addClass('disabled');
			}
			// email框
			var $myProfile_email = $('#myProfile_email');
			if($myProfile_email.hasClass('disabled')){
				$myProfile_email.removeClass('disabled');
			}else{
				$myProfile_email.addClass('disabled');
			}
			// 提交按钮
			var $myProfile_submit = $('#myProfile_submit');
			if($myProfile_submit.hasClass('disabled')){
				$myProfile_submit.removeClass('disabled');
			}else{
				$myProfile_submit.addClass('disabled');
			}
		});
		// 绑定关闭按钮
		$('#closeMyProfile').on('click',function(){
			$('#myProfile').hide();
			$('#myProfile_name').val(userName).removeClass('disabled').addClass('disabled');
			$('#myProfile_email').val(email).removeClass('disabled').addClass('disabled');
			$('#myProfile_submit').removeClass('disabled').addClass('disabled');
		});
		// 绑定提交按钮
		$('#myProfile_submit').on('click',function(){
			var name = $('#myProfile_name').val().trim();
			if(name === ''){
				tipInfo({
					status:'fail',
					content:'请输入真实姓名'
				});
				return;
			}
			if(name.length<2||name.length>20){
				tipInfo({
					status:'fail',
					content:'真实姓名为2-20个字符'
				});
				return;
			}
			var inputEmail = $('#myProfile_email').val().trim();
			if(inputEmail === ''){
				tipInfo({
					status:'fail',
					content:'请输入邮箱'
				});
				return;
			}
			if(!REG_EMAIL.test(inputEmail)){
				tipInfo({
					status:'fail',
					content:'邮箱格式不正确'
				});
				return;
			}
			$.ajaxEp({
				url:'/'+language+'/customer/updUserInfo.do',
				param:{
					accountId:accountId,
					userName:name,
					email:inputEmail
				},
				success:function(res){
					if(res.respCode=="10000"){
						userName = name;
						email = inputEmail;
						tipInfo({
							status:'success',
							content:res.respMessge
						});
					}else{
						tipInfo({
							status:'fail',
							content:res.respMessge
						});
					}
				}
			});
		});
	}
	$('#myProfile').show();
}

/**
 * 修改密码
 */
function updatePwd(){
	if($('#updatePwd').length === 0){
		$('body').append(
			'<div class="shade" id="updatePwd" style="display:none;">'
		   +'	<div class="tanchu" style="margin-top: -160px;">'
		   +'		<a style="cursor:pointer;" id="closeUpdatePwd" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>'
		   +'	    <div class="tanchu-bt font15">设置密码</div>'
		   +'	    <div class="text-c pad-t20 pad-b20 bor-b">'
		   +'	    	<label class="radio"><input type="radio" name="radio" id="loginPwdChecked"><i>✓</i> 登录密码</label>'
		   +'	    	<label class="radio pad-l20"><input type="radio" name="radio" id="withdrawPwdChecked"><i>✓</i> 提现密码</label>'
		   +'	    </div>'
		   +'	    <ul class="ggtf-sc2 pad-t10 pad-b15 font14" id="updatePwdUl">'
		   +'	        <li>'
		   +'	          	<span class="pos-a ggtf-sc-bt">原密码</span>'
		   +'	          	<input id="updatePwd_oldPwd" type="text" onfocus="this.type=\'password\'" class="wenb03" placeholder="请输入原密码" />'
		   +'	        	<a id="resetCapitalPwdHref" href="javascript:void(0);" class="pos-a czmm blue hide">重置资金密码</a>'
		   +'	        </li>'
		   +'	        <li>'
		   +'	          	<span class="pos-a ggtf-sc-bt">新密码</span>'
		   +'	          	<input id="updatePwd_newPwdOne" type="text" onfocus="this.type=\'password\'" class="wenb03" placeholder="请输入新密码" />'
		   +'	        </li>'
		   +'	        <li>'
		   +'	        	<span class="pos-a ggtf-sc-bt">确认密码</span>'
		   +'	          	<input id="updatePwd_newPwdTwo" type="text" onfocus="this.type=\'password\'" class="wenb03" placeholder="请确认新密码" />'
		   +'	        </li>'
		   +'	        <li>'
		   +'           	<input id="updatePwd_submit" type="button" value="提 交" class="btn btn05 bg-red font16" />'
		   +'	        </li>'
		   +'	    </ul>'
		   +'	    <ul class="ggtf-sc2 pad-t10 pad-b15 font14 hide" id="resetCapitalPwdUl">'
		   +'	        <li>'
		   +'	          	<span class="pos-a ggtf-sc-bt">手机号码</span>'
		   +'	          	<input id="resetCapitalPwd_mobile" type="text" class="wenb03" placeholder="请输入手机号码" />'
		   +'	        </li>'
		   +'	        <li>'
		   +'	          	<span class="pos-a ggtf-sc-bt">验证码</span>'
		   +'	          	<input id="resetCapitalPwd_verificationCode" type="text" class="wenb03" placeholder="请输入验证码" />'
		   +'	        	<a id="get_resetWithdraw_verification_btn" href="javascript:void(0);" class=\"pos-a czmm blue\">获取验证码</a>'
		   +'	        </li>'
		   +'	        <li>'
		   +'	        	<span class="pos-a ggtf-sc-bt">重置密码</span>'
		   +'	          	<input id="resetCapitalPwd_password" type="text" onfocus="this.type=\'password\'" class="wenb03" placeholder="请输入密码" />'
		   +'	        </li>'
		   +'	        <li>'
		   +'           	<input id="resetWithdraw_submit" type="button" value="提 交" class=" btn btn05 bg-red font16" />'
		   +'	        </li>'
		   +'	    </ul>'
		   +'	</div>'
		   +'</div>'	
		);
		// 登录密码选项框
		$('#loginPwdChecked').on('click',function(res){
			$('#updatePwd_oldPwd').parent().show();
			$('#resetCapitalPwdHref').hide();
		});
		// 提现密码选项框
		$('#withdrawPwdChecked').on('click',function(res){
			if(havaWPWD){
				$('#updatePwd_oldPwd').parent().show();
				$('#resetCapitalPwdHref').show();
			}else{
				$('#updatePwd_oldPwd').parent().hide();
				$('#resetCapitalPwdHref').show();
			}
		});
		// 重置密码按钮
		$('#resetCapitalPwdHref').on('click',function(){
			$('#resetCapitalPwdUl').show();
			$('#updatePwdUl').hide();
			$('#loginPwdChecked').parent().parent().hide();
		});
		// 绑定关闭按钮
		$('#closeUpdatePwd').on('click',function(){
			$('#updatePwd_oldPwd,'
			 +'#updatePwd_newPwdOne,'
			 +'#updatePwd_newPwdTwo,'
			 +'#resetCapitalPwd_mobile,'
			 +'#resetCapitalPwd_verificationCode,'
			 +'#resetCapitalPwd_password').val('');
			$('#resetCapitalPwdUl').hide();
			$('#updatePwdUl').show();
			$('#loginPwdChecked').parent().parent().show();
			$('#loginPwdChecked').click();
			$('#loginPwdChecked').prop('checked',false);
			$('#updatePwd').hide();
		});
		// 绑定修改密码按钮
		$('#updatePwd_submit').on('click',function(){
			// 提交数据的参数
			var ajaxParam = {};
			// 判断是否选择了修改类型
			if(!$('#loginPwdChecked').is(':checked') && !$('#withdrawPwdChecked').is(':checked')){
				tipInfo({
					status:'fail',
					content:'请选择修改类型'
				});
				return;
			}
			// 判断是否需要输入原密码
			if($('#loginPwdChecked').is(':checked') || havaWPWD){
				var oldPwd = $('#updatePwd_oldPwd').val().trim();
				if(oldPwd === ''){
					tipInfo({
						status:'fail',
						content:'原密码不能为空'
					});
					return;
				}
				if(oldPwd.length<6||oldPwd.length>12){
					tipInfo({
						status:'fail',
						content:'密码长度应为6-12个字符'
					});
					return;
				}
				ajaxParam.oldPwd = oldPwd;
			}
			var newPwdOne = $('#updatePwd_newPwdOne').val().trim();
			if(newPwdOne === ''){
				tipInfo({
					status:'fail',
					content:'新密码不能为空'
				});
				return;
			}
			if(newPwdOne.length<6||newPwdOne.length>12){
				tipInfo({
					status:'fail',
					content:'密码长度应为6-12个字符'
				});
				return;
			}
			ajaxParam.newPwd = newPwdOne;
			var newPwdTwo = $('#updatePwd_newPwdTwo').val().trim();
			if(newPwdTwo === ''){
				tipInfo({
					status:'fail',
					content:'请再输入一次新密码'
				});
				return;
			}
			if(newPwdOne!=newPwdTwo){
				tipInfo({
					status:'fail',
					content:'两次密码输入不一致'
				});
				return;
			}
			ajaxParam.confirmPwd = newPwdTwo;
			// 请求的URL
			var url = '';
			if($('#loginPwdChecked').is(':checked')){
				url = '/'+language+'/customer/updatePwd.do';
			}else if($('#withdrawPwdChecked').is(':checked')){
				url = '/'+language+'/customer/updateWithDrawPwd.do';
			}else{
				tipInfo({
					status:'fail',
					content:'请选择修改类型'
				});
			}
			// 发送请求
			$.ajaxEp({
				url:url,
				param:ajaxParam,
				success:function(res){
					var msg = res.msg,
						data = res.data;
					if(msg!='10000'){
						tipInfo({
							status:'fail',
							content:data
						});
					}else{
						tipInfo({
							status:'success',
							content:data
						});
						if($('#withdrawPwdChecked').is(':checked')){
							havaWPWD = true;
						}
						// 关闭修改密码框
						$('#closeUpdatePwd').click();
					}
				}
			});
		});
		// 发送重置资金密码验证码按钮
		$('#get_resetWithdraw_verification_btn').on('click',function(){
			// 提交参数的对象
			var ajaxParam = {};
			// 手机号
			var mobile = $('#resetCapitalPwd_mobile').val().trim();
			if(mobile === ''){
				tipInfo({
					status:'fail',
					content:'请输入手机号'
				});
				return;
			}
			ajaxParam.mobile = mobile;
			if(!REG_MOBILE.test(mobile)){
				tipInfo({
					status:'fail',
					content:'手机号格式不正确'
				});
				return;
			}
			$.ajaxEp({
				url:'/'+language+'/customer/getDrawMobileVerification.do',
				param:ajaxParam,
				success:function(res){
					var code = res.msg,
						data = res.data;
					switch(code){
					case '10000':
						var info = data.split('-')[0];
						var time = data.split('-')[1];
						tipInfo({
							status:'normal',
							content:'修改资金密码成功'
						});
						verificationCodeInterval({
							btnEle:$('#get_resetWithdraw_verification_btn')[0],
							time:Number(time)
						});
						break;
					case '60001':
						var info = data.split('-')[0];
						var time = data.split('-')[1];
						tipInfo({
							status:'normal',
							content:'验证码处于有效期，如需重新发送，请等待'+time+'秒'
						});
						break;
					default:
						tipInfo({
							status:'fail',
							content:code
						});
					}
				}
			});
		});
		// 绑定重置资金密码提交按钮
		$('#resetWithdraw_submit').on('click',function(){
			// 提交参数的对象
			var ajaxParam = {};
			// 手机号
			var mobile = $('#resetCapitalPwd_mobile').val().trim();
			if(mobile === ''){
				tipInfo({
					status:'fail',
					content:'请输入手机号'
				});
				return;
			}
			ajaxParam.mobile = mobile;
			if(!REG_MOBILE.test(mobile)){
				tipInfo({
					status:'fail',
					content:'手机号格式不正确'
				});
				return;
			}
			// 验证码
			var verificationCode = $('#resetCapitalPwd_verificationCode').val().trim();
			if(verificationCode === ''){
				tipInfo({
					status:'fail',
					content:'请输入验证码'
				});
				return;
			}
			ajaxParam.verification = verificationCode;
			// 密码
			var pwd = $('#resetCapitalPwd_password').val().trim();
			if(pwd === ''){
				tipInfo({
					status:'fail',
					content:'请输入密码'
				});
				return;
			}
			if(pwd.length<6||pwd.length>12){
				tipInfo({
					status:'fail',
					content:'密码长度应为6-12个字符'
				});
				return;
			}
			ajaxParam.pwd = pwd;
			ajaxParam.type = 1;
			$.ajaxEp({
				url:'/'+language+'/user/forgetPwdToUpdate.do',
				param:ajaxParam,
				success:function(res){
					var code = res.msg,
						info = res.data;
					if(code === '10000'){
						tipInfo({
							status:'success',
							content:info
						});
						$('#closeUpdatePwd').click();
					}else{
						tipInfo({
							status:'fail',
							content:code
						});
					}
				}
			});
		});
	}
	$('#updatePwd').show();
}

/**
 * 投放类型切换
 * @param type
 * @returns
 */
function putTypeChange(type){
	switch(Number(type)){
	case 1:
		return '视频';
	case 2:
		return '图文模板';
	case 3:
		return '图片';
	}
}

/**
 * 订单类型切换
 * @param status
 * @returns
 */
function orderStatusChange(status){
	switch(Number(status)){
	case 1:
		return '待付款';
	case 2:
	case 3:
		return '处理中';
	}
}

/**
 * 广告类型切换
 * @param type
 * @returns
 */
function adTypeChange(type){
	switch(Number(type)){
	case 1:
		return '日用品广告';
	case 2:
		return '食品饮料广告';
	case 3:
		return '餐饮广告';
	case 4:
		return '电子家电广告';
	case 5:
		return '服装服饰广告';
	case 6:
		return '化妆品广告';
	case 7:
		return '钟表首饰广告';
	case 8:
		return '教育培训广告';
	case 9:
		return '文化广告';
	case 10:
		return '会展广告';
	case 11:
		return '商业商场广告';
	case 12:
		return '娱乐广告';
	case 13:
		return '社会服务广告';
	case 14:
		return '金融保险广告';
	case 15:
		return '汽车广告';
	case 16:
		return '房地产广告';
	case 17:
		return '邮电通讯快递物流广告';
	case 18:
		return '保健广告';
	case 19:
		return '旅游酒店广告';
	case 20:
		return '家装建材广告';
	case 21:
		return '交通运输广告';
	case 22:
		return '其他广告';
	}
}

/**
 * 流水类型切换
 * @param type
 * @returns
 */
function flowTypeChange(type){
	var flowText = '';
	switch(type){
	case 1:
		flowText = '充值';
		break;
	case 2:
		flowText = '提现';
		break;
	case 3:
		flowText = '下单支付';
		break;
	case 4:
		flowText = '退款';
		break;
	case 5:
		flowText = '收益提现';
		break;
	case 6:
		flowText = '补入';
		break;
	case 7:
		flowText = '补出';
		break;
	case 8:
		flowText = '提现驳回';
		break;
	}
	return flowText;
}

/**
 * 充值类型切换
 * @param type
 * @returns
 */
function payTypeChange(type){
	switch(Number(type)){
	case 1:
		return '微信';
	case 2:
		return '支付宝';
	case 3:
		return '后台';
	}
}

/**
 * 确认下单
 * @param adScreenArr 广告屏数据
 * @param isSub 投放广告页和购物车付款传入2，广告详情页传入1
 */
function confirmOrder(adScreenArr,isSub){
	var picPrice,  // 图片单价
		videoPrice;// 视频单价
	for(var i=0;i<adScreenArr['length'];++i){
		var data = adScreenArr[i]['value'];
		if(i === 0){
			picPrice   = data['pic_price'];
			videoPrice = data['ad_price'];
			break;
		}
	}
	// 首次点击需生成HTML元素
	if($('#confirmOrderDIV').length<=0){
		var html = ''
			+ '<div class="shade" id="confirmOrderDIV" style="display:none;">'
			+ '	<div class="tanchu" style="margin-top: -205px;">'
			+ '		<a style="cursor:pointer;" id="closeConfirmOrder" class="tanchu-close text-c" title="关闭"><i class="fa fa-close" aria-hidden="true"></i></a>'
			+ '		<div class="tanchu-bt font15">确认下单</div>'
			+ '		<div class="touflx">'
			+ '			<span class="dis-in">投放日期：</span>'
			+ '			<span class="dis-in riqi pos-r">'
			+ '				<input type="text" id="confirmOrderStartTime" readonly class="dis-in wenb04 width100"/>'
			+ '				<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>'
			+ '			</span>'
			+ '			<span class="dis-in pad-l5 pad-r5">-</span>'
			+ '			<span class="dis-in riqi pos-r">'
			+ '				<input type="text" id="confirmOrderEndTime" readonly class="dis-in wenb04 width100"/>'
			+ '				<i class="fa fa-angle-right pos-a" aria-hidden="true"></i>'
			+ '			</span>'
			+ '		</div>'
			+ '		<div class="touflx touflx2">'
			+ '			<span class="dis-in">投放类型：</span>'
			+ '			<span class="dis-in tfsl"><em id="choosePic">图片</em><em id="chooseVideo">视频</em></span>'
			+ '			<div class="col-999 fr mar-r15 text-r">'
			+ '				<p>单价：<em class="red font14" id="typePrice"></em>/个</p>'
			+ '				<p>折后价：<em class="red font14" id="discountTypePrice">12元</em>/个</p>'
			+ '			</div>'	
			+ '		</div>'
			+ '		<div class="touflx touflx3">'
			+ '			<span class="dis-in pad-t10">投放数量：</span>'
			+ '			<div class="pos-r dis-in cpxq-mk-zl fr mar-r15">'
			+ '				<a id="reducePutInCount" style="cursor:pointer;" class="minus2 pos-a"><i class="fa fa-minus" aria-hidden="true"></i></a>'
			+ '				<input id="putInCount" type="text" class="wenb04 width100 text-c">'
			+ '				<a id="addPutInCount" style="cursor:pointer;" class="plus2 pos-a"><i class="fa fa-plus" aria-hidden="true"></i></a>'
			+ '			</div>'
			+ '		</div>'
			+ '		<div class="mar-t10 bor-t2">'
			+ '			<h2 class="font13 pad-t10 pad-b10 pad-l20 bor-b2">选择支付方式</h2>'
			+ '			<ul class="tc-zf pad-q10">'
			+ '				<li id="payType0101" style="cursor:pointer;"><img src="/chinese/images/zf01.jpg" alt="微信"/></li>'
			+ '				<li id="payType0201" style="cursor:pointer;"><img src="/chinese/images/zf02.jpg" alt="支付宝" /></li>'
			+ '				<li id="payType0400" style="cursor:pointer;"><img src="/chinese/images/zf04.jpg" alt="翔云余额" /></li>'
			+ '				<li id="payType0301" style="cursor:pointer;"><img src="/chinese/images/zf03.jpg" alt="银联" /></li>'
			+ '			</ul>'
			+ '		</div>'
			+ '		<p class="col-999 text-c pad-b10 font14">'
			+ '			共 <span class="red" id="screenNum"></span> 个广告屏，合计 <span class="red" id="totalPrice"></span> 元<span style="display:none;">,折后价为<span id="discountTotalPrice" class="red"></span></span>'
			+ '		</p>'
			+ '	    <div class="text-c pad-t5 pad-b15 pad-l15 pad-r15">'
			+ '			<input id="confirmPay" type="button" value="确认付款" class="btn btn02 bor-rad font13 bg-red width24">'
			+ '		</div>'
			+ '	</div>'
			+ '</div>';
		$('body').append(html);
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
			//showNow : true,
			//nowText : "今天",
			startYear : currYear, //开始年份
			endYear : currYear + 3//结束年份
		};
		// 最大最小日期限制
		var min = new Date(nowTime+1*24*3600*1000),
			max = new Date();
		max.setFullYear(min.getFullYear()+3);
		max.setDate(min.getDate());
		min = min.format(DATE_FORMAT_YTD);
		max = max.format(DATE_FORMAT_YTD);
		$("#confirmOrderStartTime").attr('max',max).attr('min',min).mobiscroll($.extend(opt['date'], opt['def']));
		$("#confirmOrderEndTime").attr('max',max).attr('min',min).mobiscroll($.extend(opt['date'], opt['def']));
		$("#confirmOrderStartTime,#confirmOrderEndTime").on('change',function(){
			// 当选择完日期后计算总价
			calculTotalPrice(adScreenArr);
		});
		// 绑定关闭按钮
		$('#closeConfirmOrder').on('click',function(){
			$('#confirmOrderDIV').hide();
		});
		// 绑定支付类型
		$('[id^=payType]').on('click',function(){
			var ths = this,
				$ths = $(ths);
			$('[id^=payType]').removeClass('active');
			$ths.addClass('active');
		})
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
		// 绑定选择图片、视频类型按钮
		$('#choosePic,#chooseVideo').on('click',function(){
			var ths = this, 
				$ths = $(ths), 
				id = this.id;
			$('[id^=choose]').removeClass('active');
			$ths.addClass('active');
			if(id.indexOf('Pic')!=-1){// 选择的是图片
				$('#typePrice').text(formatNumber(picPrice,2,1)+'元');
				// 计算总价
				calculTotalPrice(adScreenArr);
				// 折扣价
				if(discount!=1){
					$('#discountTypePrice').text(formatNumber(Number(picPrice)*discount,2,1)+'元').parent().show().parent().removeClass('pad-t5');
				}
			}else if(id.indexOf('Video')!=-1){// 选择的是视频
				$('#typePrice').text(formatNumber(videoPrice,2,1)+'元');
				// 计算总价
				calculTotalPrice(adScreenArr);
				// 折扣价
				if(discount!=1){
					$('#discountTypePrice').text(formatNumber(Number(videoPrice)*discount,2,1)+'元').parent().show().parent().removeClass('pad-t5');
				}
			}
		});
		// 付款按钮
		$('#confirmPay').on('click',function(){
			// 创建订单并且支付
			createOrderAndPay(adScreenArr,isSub);
		});
	}
	// 清空选择类型
	$('[id^=choose]').removeClass('active');
	$('#typePrice').text('');
	$('#discountTypePrice').text('').parent().hide().parent().removeClass('pad-t5').addClass('pad-t5');
	// 投放数量重置
	$('#putInCount').val('');
	// 选择的屏幕数量
	$('#screenNum').text(adScreenArr['length']);
	// 重置总价
	$('#totalPrice').text('');
	// 默认选择图片
	$('#choosePic').click();
	// 日期默认为一星期
	$("#confirmOrderStartTime").val(new Date(nowTime+1*24*3600*1000).format(DATE_FORMAT_YTD));
	$("#confirmOrderEndTime").val(new Date(nowTime+7*24*3600*1000).format(DATE_FORMAT_YTD));
	// 展示
	$('#confirmOrderDIV').show();
}

/**
 * 创建订单并且支付
 * @param adScreenArr 广告屏数据
 * @param isSub 投放广告页和购物车付款传入2，广告详情页传入1
 */
function createOrderAndPay(adScreenArr,isSub){
	// 投放类型
	var $putInType = $('[id^=choose].active');
	if($putInType.length<=0){
		tipInfo({
			status:'fail',
			content:'请选择投放类型'
		});
		return;
	}
	var fileType;
	if($putInType.attr('id').indexOf('Pic')!=-1){
		fileType = 3;
	}else if($putInType.attr('id').indexOf('Video')!=-1){
		fileType = 1;
	}
	// 投放数量
	var $ths  = $('#putInCount'),
		value = $ths.val();
	if(value === ''){
		tipInfo({
			status:'fail',
			content:'请选择投放数量'
		});
		return;
	}
	if(isNaN(value)){
		tipInfo({
			status:'fail',
			content:'投放数量输入非法'
		});
		return;
	}
	if(value<1||value>maxBuyCount){
		tipInfo({
			status:'fail',
			content:'投放数量应该在1~'+maxBuyCount
		});
		return;
	}
	// 判断日期格式是否正确
	if(!$('#confirmOrderEndTime').val()||!$('#confirmOrderStartTime').val()){
		tipInfo({
			status:'fail',
			content:'请选择日期'
		});
		return;
	}else{
		// 选择的天数
		var diffDate = (new Date($('#confirmOrderEndTime').val().replace(/-/g,'\/')).getTime()-new Date($('#confirmOrderStartTime').val().replace(/-/g,'\/')).getTime())/1000/3600/24;
		if(diffDate<0){
			$('#confirmOrderEndTime').val($('#confirmOrderStartTime').val());
			tipInfo({
				status:'fail',
				content:'结束日期不能小于开始日期'
			});
			return;
		}
	}
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
	var checkTimes = [],
		checkAdvertiseId = [],
		deviceId = [],
		timeInterval = [],
		fileTypes = [],
		buyCount = [],
		shoppIds = [];
	for(var i=0;i<adScreenArr.length;++i){
		var data = adScreenArr[i]['value'];
		checkTimes.push($('#confirmOrderStartTime').val()+'@'+$('#confirmOrderEndTime').val());
		checkAdvertiseId.push(data['id']);
		deviceId.push(data['device_id']);
		timeInterval.push(data['idle_time']);
		fileTypes.push(fileType);
		buyCount.push($('#putInCount').val());
		if(data['shopCartId']){
			shoppIds.push(data['shopCartId']);
		}
	}
	$.ajaxEp({
		url:"/"+language+"/order/placeAnOrder.do",
		param:{
			checkTimes:checkTimes.join(','),
			checkAdvertiseId:checkAdvertiseId.join(','),
			deviceId:deviceId.join(','),
			timeInterval:timeInterval.join(','),
			fileType:fileTypes.join(','),
			isSub:isSub,
			buyCount:buyCount.join(','),
			shoppIds:shoppIds.join(',')
		},
		success:function(res){
			var msg = res['msg'],
				data = msg.split('-'),
				code = data[0],		// 返回编码
				buyData = res.data	// 可购买的产品数据
			if(code === '10000'){
				var total = data[1],  	// 订单总价
					orderNo = data[3],	// 订单号
					fileType = data[4], // 投放类型
					startTimeStr = $('#confirmOrderStartTime').val(),// 开始日期
					endTimeStr = $('#confirmOrderEndTime').val(),// 结束日期
					diffDate = 1+(new Date(endTimeStr.replace(/-/g,'\/')).getTime()-new Date(startTimeStr.replace(/-/g,'\/')).getTime())/1000/3600/24;// 选择的天数
				// 判断是否所有日期都能购买
				var allDateBuy = true;
				for(var f in buyData){
					var v = buyData[f];
					if(v.indexOf('可购买')!=-1){// 有不能购买的日期,需要用户确认
						var shopName = f.split('-')[3],// 店铺名称
							deviceCode = f.split('-')[4];// 设备编号
						// 弹出框
						if($('#effectiveDateTip').length===0){
							$('body').append(
								'<div class="shade" id="effectiveDateTip" style="display:none;">'
							   +'	<div class="tanchu tanchu5">'
							   +'		<a id="closeEffectiveDate" style="cursor:pointer;" class="tanchu-close text-c" title="关闭">'
							   +'			<i class="fa fa-close" aria-hidden="true"></i>'
							   +'		</a>'
							   +'		<div class="tanchu-bt font15"><span>有效时段</span></div>'
							   +'		<div class="tanchu5-nr" id="effectiveDateContent"></div>'
							   +'		<div class="tis01 text-c" style="display:none;"><span class="red" id="effectiveDateMoneyTip"></span></div>'
							   +'   	<div class="tanchu-xyan text-c" style="display:none;">'
							   +'    		<input id="effectiveDateConfirm" type="button" value="确定" class="btn btn04 font14 mar-l10 bg-red">'
							   +'    		<input id="effectiveDateCancel" type="button" value="取消" class="btn btn04 font14 mar-l10">'
							   +'   	</div>'
							   +'	</div>'
							   +'</div>'
							);
							// 绑定关闭、取消按钮
							$('#closeEffectiveDate,#effectiveDateCancel').on('click',function(){
								$('#effectiveDateTip').hide();
								$('#effectiveDateContent').html('');
								$('#effectiveDateMoneyTip').empty().parent().hide();
								$('#effectiveDateConfirm').parent().hide();
							});
							// 绑定确认支付按钮
							$('#effectiveDateConfirm').on('click',function(){
								// 支付订单
								payOrder({
									payType:payType,
									orderNo:orderNo,
									totalPrice:total
								});
							});
						}
						// 提示内容
						$('#effectiveDateContent').append(
								 '<div class="font14 bor-b tanchu5-nr-b">'
								+'		<span class="red font16"><em class="col-999 font14">店铺：</em>'+shopName+'</span>'
								+'		<span class="pad-l20"><em class="col-999">广告屏编号：</em>'+deviceCode+'</span>'
								+'		<span class="pad-l20"><em class="col-999">播放周期：</em>'+startTimeStr+'至'+endTimeStr+'</span>'
								+'</div>'
								+'<div class="tanchu5-list bor-b3">'
								+function(){
									// 判断有多少天不能购买
									var effectiveDateArr = v.split(','),
										notBuyDateArr = [];
									for(var i=0;i<effectiveDateArr['length'];++i){
										if(Number(/<em.*?>(.*?)<\/em>/ig.exec(effectiveDateArr[i].split(':')[1])[1]) === 0){
											notBuyDateArr.push(0);
										}
									}
									// 判断是否所选择的天数都不能购买
									var html = '';
									if(diffDate === notBuyDateArr['length']){
										html += '<p class="dis-b text-c red pad-t5 pad-b10 bor-b2">当前投放日期内已卖完</p>';
									}else{
										for(var i=0;i<effectiveDateArr['length'];++i){
											html += '<span class="pad-l10 dis-in">'+effectiveDateArr[i]+'</span>';
										}
										// 金额提示
										$('#effectiveDateMoneyTip').html('订单金额为'+total+'元,是否继续支付?').parent().show();
										// 弹出购买确认按钮
										$('#effectiveDateConfirm').parent().show();
									}
									return html;
								 }()
								+'</div>'
						);
						allDateBuy = false;
					}
				}
				// 有不能购买的日期，需要提示
				if(!allDateBuy){
					$('#effectiveDateTip').show();
					return;
				}
				// 支付订单
				payOrder({
					payType:payType,
					orderNo:orderNo,
					totalPrice:total
				});
			}else{
				// 回调显示
				tipInfo({
					status:'fail',
					content:buyData
				});
			}
		}
	});
}

/**
 * 支付订单
 * @param obj.payType 支付类型
 * @param obj.orderNo 订单号
 * @param obj.totalPrice 订单价格
 */
function payOrder(obj){
	var payType = obj.payType,
		orderNo = obj.orderNo,
		totalPrice = obj.totalPrice;
	if(!totalPrice && !(totalPrice === 0)){
		totalPrice = $('#totalPrice').text();
	}
	switch(payType){
	case '0301':// 银联支付
		window.location.href="/"+language+"/forward/unionpay.do?orderNo="+orderNo+'&amount='+totalPrice;
		break;
	case '0101':// 微信
	case '0201':// 支付宝
	case '0400':// 翔云余额
		$.ajaxEp({
			url:'/'+language+'/order/payOrder.do',
			param:{
				payWay:payType,
				orderNo:orderNo
			},
			success:function(res){
				var success = res.success,
					data = res.data;
				if(success){// 返回成功
					switch(payType){
					case '0101':// 微信
						wechatPay(data,res.msg);
						break;
					case '0201':// 支付宝
						$("body").html(data);
						break;
					case '0400':// 翔云余额
						window.location.href = '/'+language+'/html/successTrip.html?i=pay';
						break;
					}
				}else{
					tipInfo({
						status:'fail',
						content:data
					});
				}
			}
		});
		break;
	default:
		tipInfo({
			status:'fail',
			content:'非法操作'
		});
		$('#effectiveDateCancel').click();
	}
}

/**
 * 微信支付
 * @param data
 */
function wechatPay(data,orderNo){
	/**
	 * 生成微信支付二维码
	 */
	function createWechatPayQRCode(){
		createQrcode("qrcodeId",data);
		convertCanvasToImage("qrcodeId");
		// 绑定支付成功后的按钮事件
		$('#wechatPaySuccess').unbind('click').bind('click',function(){
			$.ajaxEp({
				url:'/'+language+'/order/checkOrderStatus.do',
				param:{
					// 支付成功的订单号
					orderNo:orderNo
				},
				success:function(res){
					if(res.success){
						// 充值成功跳转的页面
						window.location.href = '/'+language+'/html/successTrip.html?i=recharge';
					}else{
						tipInfo({
							status:'fail',
							content:res.data
						});
					}
				}
			});
		});
		$("#ewmdiv").show();
	}
	// 引入生成二维码的框架
	if($('[src="/js/jquery.qrcode.min.js"]').length === 0){
		loadJavaScript('/js/jquery.qrcode.min.js',function(){
			// 二维码弹出框
			$('body').append(
					'<div class="shade" id="ewmdiv" style="display:none;">'
				   +'	<div class="tanchu" style="height:auto">'
				   +'	    <div class="tanchu-bt"><span>微信支付</span><a id="close_wechat_recharge" class="tanchu-close text-c" title="关闭" style="cursor:pointer;"><i class="fa fa-close" aria-hidden="true"></i></a></div>'
				   +'	    <div class="tanchu-nr text-c">'
				   +'	      <p class="tanchu-tspc">请用微信扫一下二维码，完成支付。</p>'
				   +'	      <p class="pad-t20" id="qrcodeId"></p>'
				   +'	    </div>'
				   +'	    <div class="text-c pad-b10">'
				   +'	      <input id="cancel_wechat_recharge" type="button" value="取消" class="btn btn04 font14"  style="cursor:pointer;"/>'
				   +'	      <input id="wechatPaySuccess"  type="button" value="支付完成" class="btn btn04 font14 mar-l10 bg-red"/>'
				   +'	    </div>'
				   +'	  </div>'
				   +'	</div>'
			);
			// 生成微信支付二维码
			createWechatPayQRCode();
			// 关闭按钮
			$('#close_wechat_recharge,#cancel_wechat_recharge').on('click',function(){
				$('#ewmdiv').hide();
			});
		});
	}else{
		// 生成微信支付二维码
		createWechatPayQRCode();
	}
}

/**
 * 计算总价
 * @param adScreenArr 广告屏数据
 */
function calculTotalPrice(adScreenArr){
	var totalPrice = 0;
	for(var i=0;i<adScreenArr['length'];++i){
		var data = adScreenArr[i]['value'];
		if($('#choosePic').hasClass('active')){
			totalPrice += Number(data['pic_price']);
		}else if($('#chooseVideo').hasClass('active')){
			totalPrice += Number(data['ad_price']);
		}
	}
	if(totalPrice && Number($('#putInCount').val())){
		if(!$('#confirmOrderEndTime').val()||!$('#confirmOrderStartTime').val()){
			tipInfo({
				status:'fail',
				content:'请选择日期'
			});
		}else{
			// 选择的天数
			var diffDate = (new Date($('#confirmOrderEndTime').val().replace(/-/g,'\/')).getTime()-new Date($('#confirmOrderStartTime').val().replace(/-/g,'\/')).getTime())/1000/3600/24;
			if(diffDate<0){
				$('#confirmOrderEndTime').val($('#confirmOrderStartTime').val());
				tipInfo({
					status:'fail',
					content:'结束日期不能小于开始日期'
				});
				diffDate = 0;
			}
			totalPrice = formatNumber(totalPrice * Number($('#putInCount').val())*(diffDate+1),2,1);
			$('#totalPrice').text(totalPrice);
			if(discount!=1){
				totalPrice = totalPrice.replace(',','');
				$('#discountTotalPrice').text(formatNumber(Number(totalPrice)*discount,2,1)+'元').parent().show();
			}
		}
		return totalPrice;
	}
}

/**
 * 根据地址在百度地图上显示
 * @param addr
 */
function addrBMapDisplay(addr){
	if($('#tc-map').length === 0){
		$("body").append(
			 '<div class="shade" id="tc-map" style="display:none;">'
			+'	<div class="tanchu-map">'
			+'		<a style="cursor:pointer;" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff(\'tc-map\')"><i class="fa fa-close" aria-hidden="true"></i></a>'
			+'		<div id="showAddMap" style="width: 100%;height: 100%;"></div>'
			+'	 </div>'
			+'</div>'
		);
	}
	var map = new BMap.Map("showAddMap");
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(addr, function(point){
		if (point) {
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
		}else{
			tipInfo({
				status:'fail',
				content:'未找到当前店铺地址！'
			});
		}
	});
	// 左键双击放大,右键双击缩小
	map.enableDoubleClickZoom();
	// 滚动放大和缩小
	map.enableScrollWheelZoom();
	// 显示地图
	elementDisplay('tc-map');
}