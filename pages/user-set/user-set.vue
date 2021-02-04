<template>
	<view>

		<uni-list-item title="账号与安全" showArrow clickable @click="open('user-password')"></uni-list-item>
		<uni-list-item title="绑定邮箱" showArrow clickable @click="open('user-email')"></uni-list-item>
		<uni-list-item title="资料编辑" showArrow clickable @click="open('user-userinfo')"></uni-list-item>
		<uni-list-item title="清楚缓存" showArrow></uni-list-item>
		<uni-list-item title="意见反馈" showArrow></uni-list-item>
		<uni-list-item title="关于社区" showArrow></uni-list-item>


		<view class="py-2 px-3">
			<button class="bg-main text-white " style="border-radius: 50rpx;border: 0;" type="primary">退出登录</button>
		</view>

	</view>

</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {

			}
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				});
			}
		}
	}
</script>

<style>

</style>
