var languageHtml="<option value=\"chinese\">中文简体</option>\n";
	languageHtml+="<option value=\"english\">English</option>\n";
// 语言切换
function changeLanguage() {
	location.href = location.href.replace(language, $("#lanauge").find("option:selected").val());
}
$(function(){
	// 设置当前语言提示
	$("#lanauge").find("option[value='" + language + "']").attr("selected",true);
})