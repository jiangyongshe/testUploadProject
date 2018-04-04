var html='<link rel="stylesheet" href="'+languageMobile+'/css/mescroll.css">';
	html+='<script src="'+languageMobile+'/js/mescroll.js"></script>\n';
	html+='<script src="'+languageMobile+'/js/mescroll-option.js"></script>\n';// 全局变量
 	
document.write(html);



function initMescroll(){
	//创建MeScroll对象
	mescroll = new MeScroll("mescroll", {
		down:{
			auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
			use:false,
			callback:function(){
				
			}//下拉刷新的回调
		},
		up: {
			auto:true,//初始化完毕,是否自动触发上拉加载的回调
			isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
			callback: upCallback //上拉加载的回调
		}
	});
}

function scrollCommonMethod(){
	turnoff('tc-eject');
	$("#dataList").html("");
	initMescroll();//初始化下拉控件
	mescroll.scrollTo(0,100);//回到顶部
}
