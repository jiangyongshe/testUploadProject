$(function(){
	
	var i = decodeURIComponent(getURLParam('i')),
	
		obj = $.parseJSON(i);
	
	$('#title').text(obj['title']);
	
	$('#content').append(obj['html']);
	
})