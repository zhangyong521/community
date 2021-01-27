<template>
	<!-- 封装加载更多 -->
	<view class="flex align-center justify-center py-3">
		<text class="font text-light-muted">{{loadmore}}</text>
	</view>
</template>

<script>
	export default {
		props:['loadmore']
	}
</script>