<template>
	<view>
		<!-- 搜索历史 -->
		<view class="py-2 font-md px-2 text-light-muted">搜索历史</view>
		<view class="flex flex-wrap">
			<view class="border rounded font mx-2 my-1 px-2 text-light-muted" 
			v-for="(item,index) in list" :key="index"
			hover-class="bg-hover-light">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['项目','开始第一天','开始吧','开始拉拉啊','开始第二天','开始乐乐乐']
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
