<template>
	<view class="flex align-center p-2">
		<image :src="item.cover" style="height: 150rpx;width: 150rpx" class="rounded mr-2"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">#{{item.title}}#</text>
			<text class="font text-secondary">{{item.desc}}</text>
			<view class="flex align-center text-secondary font-sm">
				<text class="mr-2">动态:{{item.news_count}}</text>
				<text class="">今日:{{item.today_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
