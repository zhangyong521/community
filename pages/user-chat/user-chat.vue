<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;" :scroll-into-view="scrollInto" scroll-with-animation>

			<block v-for="(item,index) in list" :key="index">
				<view :id="'chat'+index">
					<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0"></user-chat-list>
				</view>
			</block>

		</scroll-view>

		<!-- 底部操作条 -->
		<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
			<input type="text" value="" v-model="content" class="flex-1 rounded bg-light ml-4" style="padding: 5rpx; height: 60rpx;"
			 placeholder="文明发言" @confirm="submit" />
			<view class="iconfont icon-fabu flex align-center justify-center font-lg animated" hover-class="jello text-main"
			 style="width: 100rpx;" @click="submit"></view>
		</view>
		
	</view>
</template>

<script>
	import userChatList from '@/components/user-chat/user-chat-list.vue';

	export default {
		components: {
			userChatList
		},
		data() {
			return {
				content: "",
				scrollInto: "",
				list: [{
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}, {
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}, {
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}, {
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}, {
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}, {
						user_id: 2,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊！！！！！",
						type: "text",
						create_time: 1612334902,
					}
				]
			}
		},
		onReady() {
			//滚动到底部
			this.pageToBottom();
		},
		methods: {
			//发送
			submit() {
				let obj = {
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					type: "text",
					data: this.content,
					create_time: (new Date()).getTime(),
				}
				if (this.content === '') {
					return uni.showToast({
						title: '消息不能为空',
						icon: "none"
					})
				}

				this.list.push(obj)
				this.content = ''
				//滚动到底部
				this.pageToBottom();
			},
			//滚动到底部的方法
			pageToBottom() {
				let lastIndex = this.list.length - 1
				if (lastIndex < 0) return;
				this.scrollInto = 'chat' + lastIndex
			}
		}
	}
</script>

<style>

</style>
