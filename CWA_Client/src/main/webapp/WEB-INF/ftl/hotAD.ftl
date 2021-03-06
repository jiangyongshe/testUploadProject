<#-- 热门广告 -->
<#assign products=data/>
<#list products as product>
	<li>
		<#if product.pics??>
			<#assign pics=product.pics?split(',')/>
		</#if>
		<a class="btn btn01 bg-red pos-a font16 rmgg-goum" href="/chinese/forward/confirmOrder.do?checkAdvertiseId=${product.advertiser_id?replace(',','')}&deviceId=${product.device_id?replace(',','')}&timeInterval=${product.play_begin_time}-${product.play_end_time}">
			<i class="fa fa-shopping-cart" aria-hidden="true"></i> 
			购买
		</a>
	    <div class="a1">
	    	<#if product.pics??>
		    	<#list pics as pic>
		    		<#if pic_index==0>
		    			<script>
					      	document.write(
								<#-- 图片 -->
								'<img style="height:300px;" src="'+imagePath+'${pic}"/>'
							);
						</script>
		    		</#if>
		    	</#list>
		    <#else>
		    	<#-- 没有上传图片时显示的图片 -->
		    	<script>
			      	document.write(
						<#-- 图片 -->
						'<img style="height:300px;" src="/chinese/images/lun00.jpg" alt=""/>'
					);
				</script>
			</#if>
			<div class="rmgg-xx font12">
				<p class="p1 font16">${product.name}</p>
				<p class="p2">价格：<span class="font16">${product.price}元/条</span></p>
				<p class="p2">广告时长: <span class="font16">${product.ad_length}秒</span></p>
			</div>
		</div>
		<div class="a2 text-c font12">
				<p class="p4 font16">${product.name}</p>
				<p class="p5">地址：${product.addr?replace('*','')?replace('&','')}</p>
				<p class="p6">
	              <span class="dis-in"><b class="col-999">设备编号：</b>${product.device_id}</span>
	              <span class="dis-in"><b class="col-999">广告时长：</b>${product.ad_length}秒</span>
	              <span class="dis-in"><b class="col-999">播放次数：</b>${product.allPlayNumber}次</span>
	              <span class="dis-in"><b class="col-999">价格：</b>${product.price}元/条</span>
	              <span class="dis-b"><b class="col-999">空闲时段：</b>${product.play_begin_time}-${product.play_end_time}</p>
	            </p>
				<p class="p7">
					<#if product.pics??>
		    			<script>
				            <#list pics as pic>
						      	document.write(
									<#-- 图片 -->
									'<img src="'+imagePath+'${pic}"/>'
								);
					    	</#list>
						</script>
					</#if>
	           </p>
		</div>
	</li>
</#list>