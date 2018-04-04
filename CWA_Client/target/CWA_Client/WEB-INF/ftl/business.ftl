<#-- 成交速递 -->
<ul class="cjzx-list">
	<#list data1 as obj>
			<li>
		   	   <a>
		           <i class="fa fa-angle-double-right col-999" aria-hidden="true"></i>
		           用户<span class="red">${obj.account_id}</span>在${obj.shop_name}
		           成交<span class="red">${obj.total_price?string('0.00')}元</span>
		           订单
		        </a>
		   </li>
	</#list>
</ul>