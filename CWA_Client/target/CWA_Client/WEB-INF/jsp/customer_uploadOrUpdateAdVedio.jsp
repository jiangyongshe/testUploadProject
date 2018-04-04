<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link href="/<spring:message code="url.language"/>/css/stream-v1.css" rel="stylesheet">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<script src="/js/commonRel.js"></script>
<script src="/js/jquery.citys.js"></script><!-- 省市区街道 -->
<script src="/js/top.js"></script><!--返回顶部-->

<script>

$(document).ready(function(){
  $(".dian-close").click(function(){
  $(".dian-xq").hide(1000);
  });
  
  $('.dian-bt').on("click", function () {
		$(this).next().slideToggle(100);
		$('.dian-xq').not($(this).next()).slideUp('fast');
	});
});

</script>


<script src="/js/upload/browser-md5-file.min.js" type="text/javascript"></script>  

<script type="text/javascript" src="/js/upload/stream-v1.js"></script>


</head>

<body style="width:100%">
<!-- 公用头部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>

<div class="neiye bg-f9 bor-t">
  <div class="mar-auto pos-r">
    <!--左侧菜单-->
    <script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>

   <!--右侧内容-->
    <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">上传广告视频</h2>
      
      <ul class="ggtf-sc pad-t20 font14">
        <li>
          <span class="pos-a ggtf-sc-bt">广告编号</span>
          <select name="" class="xlb04 font14 col-666 adNo">
          </select>
        </li>
        <li>
          <span class="pos-a ggtf-sc-bt">广告类型</span>
          <select name="" class="xlb04 font14 col-666 adType">
            <option value="1">日用品广告</option>
			<option value="2">食品饮料广告</option>
			<option value="3">餐饮广告</option>
			<option value="4">电子家电广告</option>
			<option value="5">服装服饰广告</option>
			<option value="6">化妆品广告</option>
			<option value="7">钟表首饰广告</option>
			<option value="8">教育培训广告</option>
			<option value="9">文化广告</option>
			<option value="10">会展广告</option>
			<option value="11">商业商场广告</option>
			<option value="12">娱乐广告</option>
			<option value="13">社会服务广告</option>
			<option value="14">金融保险广告</option>
			<option value="15">汽车广告</option>
			<option value="16">房地产广告</option>
			<option value="17">邮电通讯快递物流广告</option>
			<option value="18">保健广告</option>
			<option value="19">旅游酒店广告</option>
			<option value="20">家装建材广告</option>
			<option value="21">交通运输广告</option>
			<option value="22">其他广告</option>
          </select>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt ">广告名称</span>
          <input type="text" class="wenb03 adName" placeholder="请输入广告名称" />
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">广告简介</span>
          <textarea name="" cols="" rows="" class="wby01 adIntroduction"></textarea>
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">文件上传</span>
          
          <div class="upload-windows-class fileNameDiv hide"  id="upload-windows-class-div"  >
	       			<div class="upload-windows-file">
				        <div id="i_select_files" class="upload-file-checkbox red" >
						</div>
						<div id="i_stream_files_queue" >
						</div>
						<button onclick="javascript:_t.upload();" class="upload-button point btn btn01 bg-red mar-t10" id="upload_start">上传文件</button> <button onclick="javascript:_t.stop();" class="upload-button point btn btn01 bg-blue mar-t10" id="upload_stop">停止上传</button>
	      			</div>
		  </div>
          <!-- <div class="uploader point  hide" style="display:;">
	          
            <p><i class="fa fa-video-camera fa-2x" aria-hidden="true"></i></p>
            <input type="text" class="filename point" value="点此上传视频" readonly/>
          </div> -->
          <div class="uploader mar-l15 htmlUpl hide" onclick="showUplHtml('htmldiv')">
            <p><i class="fa fa-building-o fa-2x" aria-hidden="true"></i></p>
            <p class="font12">点此上传图文模板</p>
          </div> 
          <div class="uploader point imgFileUpd">
            <p><i class="fa fa-video-camera fa-2x" aria-hidden="true"></i></p>
            <input type="text" class="filename point" value="点此上传图片" readonly/>
            <input type="file" size="30" class="fileInput"/>
          </div>
             
          <div class="uploader-sp vedio" style="display:block;">
            <video width="" height="" class="uploader-video adVedio" style="display:none;" controls>
              <source src="" type="video/ogg">
              <source src="" type="video/mp4">
              您的浏览器不支持视频标签.
            </video>
           <img src="" onclick="showHtml1()" style="cursor:pointer;display:none;"/> 
            <!-- <p><a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i>删除 </a></p> -->
          </div>
          
          
          <div class="uploader-sp clear width pad-b10 imgList" style="display: block;">
           
          </div>
          
          
        </li>
        <li>
          <span class="error red"></span>
        </li>
        <li>
          <label class="checkbox"><input type="checkbox" name="checkbox" id=""><i>✓</i> 阅读并接受</label> <a href="#" class="red" onclick="elementDisplay('venturediv')">《上传视频协议》</a>
        </li>
        
        <li>
           <input name="" id="submit" type="button" value="提 交" class="btn btn05 bg-red font16 mar-t10" onclick="submit()" />
        </li>
      </ul>
    </div>
  </div>
</div>

<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script><!--公用底部JS-->
<script type="text/javascript" src="/js/core/customer_operateAdVedio.js"></script>

<!--上传html-->
<div class="shade" id="htmldiv" style="display:none ;">
  <div class="tanchu-html">
    <div class="tanchu-bt text-l">选择图文模板<a href="#0" class="tanchu-close text-c" title="关闭" onclick="hideUplHtml('htmldiv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <ul class="html-tab">
      <li class="active" attr-val="1">
        <span class="html-tab01-l html-bor-r col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
        <span class="html-tab01-r">文字</span>
      </li>
      <li attr-val="2">
        <span class="html-tab02-l html-bor-b col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
        <span class="html-tab02-r">文字</span>
      </li>
      <li attr-val="3">
        <span class="html-tab01-r html-bor-r">文字</span>
        <span class="html-tab01-l col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
      </li>
      <li attr-val="4">
        <span class="html-tab02-r html-bor-b">文字</span>
        <span class="html-tab02-l col-ccc"><i class="fa fa-2x fa-image" aria-hidden="true"></i></span>
      </li>
      <li attr-val="5">
        <span class="html-tab02-r" style="padding-top: 36px;">文字</span>
      </li>
    </ul>
    
    <ul class="html-tab-nr">
      <li>
        <div class="html-nr-l">
          <div class="uploader uploadBtn" style="display: ;">
            <p><i class="fa fa-image fa-3x" aria-hidden="true"></i></p>
            <input type="text" class="filename" value="点此上传图片" readonly/>
            <input type="button" name="file" class="sc-anniu" value="上传..."/>
            <input type="file" size="30" class="fileInput"/>
          </div>
            
          <div class="html-nr-img pos-r updUploadBtn" style="display: none;">
             <div id="imgDiv"><img src="" id="imgUpl" style="height:1px"/></div>
             
             <div class="uploader pos-a " style="border: 0px;">
               <input type="text" class="filename point" value="点此修改图片" readonly/>
               <input type="button" name="file" class="sc-anniu" value="上传..."/>
               <input type="file" size="30" class="fileInput"/>
             </div>
          </div>
        </div>
         
        <div class="html-nr-r">
          <input name="" type="text" class="wenb04 title" placeholder="请输入标题" />
          <textarea name="" cols="" rows="" class="wby03 context" placeholder="请输入内容"></textarea>
        </div>
      </li>
    </ul>
    
    <div class="tanchu-xyan text-c" style="padding-bottom: 15px;">
      <input name="confirm" type="button" onclick="uplImgConfirm('htmldiv')" value="确定" class="btn btn04 font14 mar-l10 bg-red">
      <input name="" type="button" onclick="hideUplHtml('htmldiv')"value="取消" class="btn btn04 font14 mar-l10">
    </div>
  </div>
</div>
<!-- 上传视频 
<div class="upload-windows-class"  id="upload-windows-class-div"  >
       <div class="upload-windows-file">
	        <div id="i_select_files" class="upload-file-checkbox" >
			</div>
			<div id="i_stream_files_queue" style="width:575px;height:178px" >
			</div>
			<button onclick="javascript:_t.upload();" class="upload-button point" id="upload_start">上传文件</button> <button onclick="javascript:_t.stop();" class="upload-button point" style="background: red" id="upload_stop">停止上传</button> <button onclick="closeAndcancel()" class="upload-button point" style="background: gray;" id="upload_cancel">取消并关闭</button>
      </div>
</div>-->

<!--上传视频协议-->
<div class="shade" id="venturediv" style="display: ;">
  <div class="tanchu-xy">
    <div class="tanchu-bt text-l">上传视频协议<a href="#0" class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff('venturediv')"><i class="fa fa-close" aria-hidden="true"></i></a></div>
    
    <div class="tanchu-xynr">
      <p>本协议是您与商城网站（简称;本站;，网址：www.jd.com）所有者（以下简称为;商城;）之间就商城网站服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击;同意并继续;按钮后，本协议即构成对双方有约束力的法律文件。</p>
            <h5> 第1条 本站服务条款的确认和接纳</h5>

            <p><strong>1.1</strong>本站的各项电子服务的所有权和运作权归商城所有。用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。
            </p>

            <p><strong>1.2</strong>用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。</p>

            <p><strong>1.3</strong>如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</p>

            <p><strong>1.4</strong>商城保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</p>
            <h5> 第2条 本站服务</h5>

            <p><strong>2.1</strong>商城通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站规定的情况下，方有权使用本站的相关服务。</p>

            <p><strong>2.2</strong>用户必须自行准备如下设备和承担如下开支：（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。
            </p>
            <h5> 第3条 用户信息</h5>

            <p><strong>3.1</strong>用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且商城保留终止用户使用商城各项服务的权利。
            </p>

            <p><strong>3.2</strong>用户在本站进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。
            </p>

            <p><strong>3.3</strong>用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。
            </p>

            <p><strong>3.4</strong><strong>用户同意，商城拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。</strong></p>

            <p><strong>3.5</strong><strong>用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。</strong></p>

            <p><strong>3.6</strong><strong>用户同意，商城有权使用用户的注册信息、用户名、密码等信息，登录进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。</strong></p>
            <h5> 第4条 用户依法言行义务</h5>

            <p> 本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：</p>

            <p><strong>（1）</strong>不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
            </p>

            <p><strong>（2）</strong>从中国大陆向境外传输资料信息时必须符合中国有关法规；</p>

            <p><strong>（3）</strong>不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动； </p>

            <p><strong>（4）</strong>不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；</p>

            <p><strong>（5）</strong>不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</p>

            <p><strong>（6）</strong>不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；</p>

            <p><strong>（7）</strong>不得教唆他人从事本条所禁止的行为；</p>

            <p><strong>（8）</strong>不得利用在本站注册的账户进行牟利性经营活动；</p>

            <p><strong>（9）</strong>不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；</p>

            <p> 用户应不时关注并遵守本站不时公布或修改的各类合法规则规定。</p>

            <p><strong>本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。</strong></p>

            <p><strong>若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。</strong>用户须对自己在网上的言论和行为承担法律责任。</p>
            <h5> 第5条 商品信息</h5>

            <p>
                本站上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，本站不作特别通知。由于网站上商品信息的数量极其庞大，虽然本站会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，本站网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解；商城欢迎纠错，并会视情况给予纠错者一定的奖励。</p>

            <p> 为表述便利，商品和服务简称为;商品;或;货物;。</p>
            <h5> 第6条 订单</h5>

            <p><strong>6.1</strong>在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。<span>收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担连带责任。</span>
            </p>

            <p><strong>6.2</strong><strong>除法律另有强制性规定外，双方约定如下：本站上销售方展示的商品和价格等信息仅仅是交易信息的发布，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售方发出的交易诉求；销售方收到您的订单信息后，只有在销售方将您在订单中订购的商品从仓库实际直接向您发出时（
                以商品出库为标志），方视为您与销售方之间就实际直接向您发出的商品建立了交易关系；如果您在一份订单里订购了多种商品并且销售方只给您发出了部分商品时，您与销售方之间仅就实际直接向您发出的商品建立了交易关系；只有在销售方实际直接向您发出了订单中订购的其他商品时，您和销售方之间就订单中该其他已实际直接向您发出的商品才成立交易关系。您可以随时登录您在本站注册的账户，查询您的订单状态。</strong>
            </p>

            <p>
                <strong>6.3</strong><strong>由于市场变化及各种以合理商业努力难以控制的因素的影响，本站无法保证您提交的订单信息中希望购买的商品都会有货；如您拟购买的商品，发生缺货，您有权取消订单。</strong>
            </p>
            <h5> 第7条 配送</h5>

            <p><strong>7.1</strong>销售方将会把商品（货物）送到您所指定的收货地址，所有在本站上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。
            </p>

            <p><strong>7.2</strong>因如下情况造成订单延迟或无法配送等，销售方不承担延迟配送的责任：</p>

            <p><strong>（1）</strong>用户提供的信息错误、地址不详细等原因导致的； </p>

            <p><strong>（2）</strong>货物送达后无人签收，导致无法配送或延迟配送的；</p>

            <p><strong>（3）</strong>情势变更因素导致的；</p>

            <p><strong>（4）</strong>不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等。</p>
            <h5> 第8条 所有权及知识产权条款</h5>

            <p><strong>8.1</strong><strong>用户一旦接受本协议，即表明该用户主动将其在任何时间段在本站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给商城所有，用户同意商城有权就任何主体侵权而单独提起诉讼。</strong>
            </p>

            <p><strong>8.2</strong><strong>本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在商城网站上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</strong>
            </p>

            <p>
                <strong>8.3</strong><strong>用户同意并已充分了解本协议的条款，承诺不将已发表于本站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</strong>
            </p>

            <p><strong>8.4</strong><strong>商城是本站的制作者,拥有此网站内容及资源的著作权等合法权利,受国家法律保护,有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知用户。在法律允许的最大限度范围内，商城对本协议及本站内容拥有解释权。</strong>
            </p>

            <p><strong>8.5</strong><strong>除法律另有强制性规定外，未经商城明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本站的信息内容，否则，商城有权追究其法律责任。</strong>
            </p>

            <p><strong>8.6</strong>本站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是商城或其内容提供者的财产，受中国和国际版权法的保护。本站上所有内容的汇编是商城的排他财产，受中国和国际版权法的保护。本站上所有软件都是商城或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。
            </p>
            <h5> 第9条 责任限制及不承诺担保</h5>

            <p><strong>除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在;按现状;和;按现有;的基础上提供的。</strong>
            </p>

            <p>
                <strong>除非另有明确的书面说明,商城不对本站的运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</strong>
            </p>

            <p><strong>商城不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。</strong></p>

            <p><strong>如因不可抗力或其它本站无法控制的原因使本站销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，商城会合理地尽力协助处理善后事宜。</strong></p>
            <h5> 第10条 协议更新及用户关注义务</h5> 根据国家法律法规变化及网站运营需要，商城有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。用户可随时登录查阅最新协议；
            <strong><em>用户有义务不时关注并阅读最新版的协议及网站公告。如用户不同意更新后的协议，可以且应立即停止接受商城网站依据本协议提供的服务；如用户继续使用本网站提供的服务的，即视为同意更新后的协议。商城建议您在使用本站之前阅读本协议及本站的公告。</em></strong>
            如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
            <h5> 第11条 法律管辖和适用</h5> 本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。
            如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。
            如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向有管辖权的中华人民共和国大陆地区法院提起诉讼。
            <h5> 第12条 其他 </h5>

            <p><strong>12.1</strong>商城网站所有者是指在政府部门依法许可或备案的商城网站经营主体。</p>

            <p><strong>12.2</strong>商城尊重用户和消费者的合法权利，本协议及本网站上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本站欢迎用户和社会各界提出意见和建议，商城将虚心接受并适时修改本协议及本站上的各类规则。
            </p>

            <p><strong>12.3</strong><span>本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。</span></p>

            <p><strong>12.4</strong><span>您点击本协议下方的;同意并继续;按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</span>
            </p>
    </div>
    
    <div class="tanchu-xyan text-c">
       <input name="" onclick="javascript:turnoff('venturediv');$('input[type=checkbox]')[0].checked=true;" type="button" value="同意并继续" class="btn btn04 font16 bg-red" />
    </div>
  </div>
</div>

</body>
</html>