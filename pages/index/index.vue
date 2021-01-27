<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<!-- 列表样式 -->
			<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
			<!-- 分割线 -->
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	export default {
		components: {
			commonList
		},
		data() {
			return {
				list: [{
					username: "昵称1",
					userpic: "/static/default.jpg",
					newstime: "2020-05-24 上午 11：31",
					isFollow: false,
					title: "这是一个标题",
					titlepic: "/static/demo/banner2.jpg",
					support: {
						type: "support", //顶
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 4,
					share_num: 2
				}, {
					username: "昵称2",
					userpic: "/static/default.jpg",
					newstime: "2020-05-24 上午 11：31",
					isFollow: false,
					title: "这是一个标题",
					titlepic: "",
					support: {
						type: "unsupport", //踩
						support_count: 1,
						unsupport_count: 5
					},
					comment_count: 4,
					share_num: 2
				}, {
					username: "昵称2",
					userpic: "/static/default.jpg",
					newstime: "2020-05-24 上午 11：31",
					isFollow: false,
					title: "这是一个标题",
					titlepic: "/static/demo/banner3.jpg",
					support: {
						type: "", //无操作
						support_count: 0,
						unsupport_count: 0
					},
					comment_count: 0,
					share_num: 0
				}]
			}
		},
		onLoad() {

		},
		methods: {
			//关注
			follow(e) {
				this.list[e].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			doSupport(e) {
				//拿到当前的对象
				let item = this.list[e.index];
				//判断用户的操作
				let msg = e.type === 'support' ? '顶' : '踩';
				//之前没有操作过
				if (item.support.type === '') {
					item.support[e.type + '_count']++
				} else if (item.support.type === 'support' && e.type === 'unsupport') {
					//顶-1
					item.support.support_count--;
					//踩+1
					item.support.unsupport_count++;
				} else if (item.support.type === 'unsupport' && e.type === 'support') {
					//顶+1
					item.support.support_count++;
					//踩-1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({
					title: msg + '成功'
				})
			}
		}
	}
</script>

<style>

</style>
