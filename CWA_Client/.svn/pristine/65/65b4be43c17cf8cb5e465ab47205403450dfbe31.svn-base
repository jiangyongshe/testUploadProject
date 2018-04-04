$(function(){
	// 初始化
	var init = {
		// 成交速递初始页码
		newestOrderPageNo:1,
		// 成交速递每页显示的数量
		newestOrderPageSize:10,
		
		// 绑定页面图片放大事件
		bindImgBig:function(){
			$('.p7').find('img').on('click',function(){
				var cloneImg = this.cloneNode(true);
				cloneImg.style.height = '300px';
				$(this).parents('li').find('.a1>img').remove();
				$(this).parents('li').find('.a1').prepend(cloneImg);
			});
		}
	}
	init.bindImgBig();
})