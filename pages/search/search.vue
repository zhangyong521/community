<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- 搜索页面 -->
			<view class="px-2 py-1 font-md">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded mx-2 my-1 font px-2" hover-class="bg-light" v-for="(item,index) in list" :key="index"
				 @click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 搜索列表 -->
			<view>
				<block v-for="(item,index) in searchList" :key="index">
					<template v-if="type==='post'">
						<!-- 帖子列表 -->
						<common-list :item="item" :index="index"></common-list>
					</template>

					<template v-else-if="type==='topic'">
						<!-- 话题列表 -->
						<topic-list :item="item" :index="index"></topic-list>
					</template>
					<template v-else="type==='user'">
						<!-- 用户列表 -->
						<user-list :item="item" :index="index"></user-list>
					</template>
				</block>
			</view>
		</template>
	</view>

</template>

<script>
	const demo1 = [{
			username: "昵称1",
			userpic: "/static/default.jpg",
			newstime: "2020-05-24 上午 11：31",
			isFollow: false,
			title: "这是一个标题",
			titlepic: "/static/demo/banner2.jpg",
			support: {
				type: "support",
				support_count: 1,
				unsupport_count: 5
			},
			comment_count: 4,
			share_num: 2
		},
		{
			username: "昵称2",
			userpic: "/static/default.jpg",
			newstime: "2020-05-24 上午 11：31",
			isFollow: false,
			title: "这是一个标题",
			titlepic: "",
			support: {
				type: "unsupport",
				support_count: 1,
				unsupport_count: 5
			},
			comment_count: 4,
			share_num: 0
		},
		{
			username: "昵称1",
			userpic: "/static/default.jpg",
			newstime: "2020-05-24 上午 11：31",
			isFollow: false,
			title: "这是一个标题",
			titlepic: "/static/demo/banner2.jpg",
			support: {
				type: "",
				support_count: 0,
				unsupport_count: 0
			},
			comment_count: 4,
			share_num: 2
		}
	];
	const demo2 = [{
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}, {
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}, {
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}, {
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}, {
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}, {
		cover: "/static/demo/topicpic/1.jpeg",
		title: "话题名称",
		desc: "话题描述",
		today_count: 10,
		news_count: 0
	}];
	const demo3 = [{
			avatar: "/static/default.jpg",
			username: "昵称",
			sex: 1,
			age: 24,
			isFollow: true
		},
		{
			avatar: "/static/default.jpg",
			username: "昵称",
			sex: 0,
			age: 24,
			isFollow: false
		}, {
			avatar: "/static/default.jpg",
			username: "昵称",
			sex: 2,
			age: 24,
			isFollow: true
		}
	];
	import commonList from '@/components/common/common-list.vue';
	import topicList from '@/components/news/topic-list.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			commonList,
			topicList,
			userList
		},
		data() {
			return {
				searchtext: "",
				list: ['学习uniapp', 'thinkphp 开发后台', 'laravel 入门实战', '前端开发', 'tp6低层源码'],
				//搜索结果
				searchList: [],
				//搜索的当前类型
				type: "post"
			}
		},
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text);
			this.searchContent = e.text
		},
		//监听导航搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
			//可能含有多个图标
			console.log(e.index)
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type) {
				case 'post':
					pageTitle = '帖子'
					break;
				case 'topic':
					pageTitle = '话题'
					break;
				case 'user':
					pageTitle = '用户'
					break;
			}
			// #ifdef APP-PLUS
			//修改搜索占位
			let currentWebview = this.$mp.page.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView;
			tn.searchInput.placeholder = '搜索' + pageTitle;
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif

		},
		methods: {
			clickSearchHistory(text) {
				this.searchtext = text;
				this.searchEvent()
			},
			searchEvent() {
				uni.hideKeyboard();
				uni.showLoading({
					title: '加载中'
				})
				setTimeout(() => {
					switch (this.type) {
						case 'post':
							this.searchList = demo1;
							break;
						case 'topic':
							this.searchList = demo2;
							break;
						case 'user':
							this.searchList = demo3;
							break;
					}
					//隐藏loading
					uni.hideLoading();
				}, 2000)
			}
		}
	}
</script>

<style>
</style>
