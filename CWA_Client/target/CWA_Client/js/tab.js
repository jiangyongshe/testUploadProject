$(function(){			
  $(".title01-b > li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
    var index = $(this).index();
	$(".title01-t > li").eq(index).css("display","block").siblings().css("display","none");
  });
  
  $(".title02-b > li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
    var index = $(this).index();
	$(".title02-t > li").eq(index).css("display","block").siblings().css("display","none");
  });
  
  $(".title03-b > li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
    var index = $(this).index();
	$(".title03-t > li").eq(index).css("display","block").siblings().css("display","none");
  });
})