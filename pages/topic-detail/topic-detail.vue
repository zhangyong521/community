<template>
	<view>
		<!-- 头部话题标题 -->
		<topic-info :info="info"></topic-info>
		<!-- 分割线 -->
		<divider></divider>

		<!-- 精华帖子 -->
		<view class="p-2 flex align-center border-bottom" hover-class="bg-light" v-for="(item,index) in topList" :key="index">
			<image src="/static/common/totop.jpg" style="width: 35rpx;height: 35rpx;" class="mr-2"></image>
			<text class="font text-dark text-ellipsis">
				{{item.title}}
			</text>
		</view>
		<!-- 分割线 -->
		<divider></divider>

		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index" :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>

		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<divider></divider>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>

		<!-- 上拉加载 -->
		<load-more :loadmore="loadtext"></load-more>
	</view>
</template>

<script>
	//测试数据
	const demo = [{
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
	}];
	import topicInfo from '@/components/topic-detail/topic-info.vue';
	import commonList from '@/components/common/common-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				},
				topList: [{
					title: "新人必读】uni-app实战第二季商城类项目开发"
				}, {
					title: "新人必读】uni-app实战第三季仿微信类项目开发"
				}],
				tabIndex: 0,
				tabBars: [{
					name: "默认"
				}, {
					name: "最新"
				}],
				//默认列表
				list1: [],
				//上拉加载
				loadtext1: "上拉加载更多",
				//最新列表
				list2: [],
				loadtext2: "上拉加载更多",
			}
		},
		//计算属性
		computed: {
			// tab切换数据
			listData() {
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2
			},
			//上拉加载
			loadtext() {
				if (this.tabIndex === 0) {
					return this.loadtext1
				}
				return this.loadtext2
			}
		},
		onLoad(e) {
			if (e.detail) {
				let res = JSON.parse(e.detail)
			}
			this.list1 = demo
		},
		//上拉加载
		onReachBottom() {
			this.loadmore()
		},
		methods: {
			//切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			//顶踩操作
			doSupport(e) {
				//拿到当前的对象
				let item = this.list1[e.index];
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
			},
			//关注
			follow(e) {
				this.list1[e].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			//上拉加载更多
			loadmore() {
				//拿到当前的列表
				let index = this.tabIndex
				//判断是否处于可加载状态
				if (this.loadtext !== '上拉加载更多') return;
				//设置上拉加载状态处于加载中....
				this['loadtext' + (index + 1)] = '加载中...'
				//请求数据
				setTimeout(() => {
					this['list' + (index + 1)] = [...this['list' + (index + 1)], ...this['list' + (index + 1)]]
					this['loadtext' + (index + 1)] = '上拉加载更多'
				}, 2000)
			}
		}

	}
</script>

<style>

</style>
