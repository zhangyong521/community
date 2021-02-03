<template>
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar :statusBar="true" :border="false" :flexd="true" @clickRight="openAddInput">
			<view class="flex justify-center align-center font-weight-bold w-100">
				<view class="font-md text-light-muted mx-1" @click="changeTab(index)" v-for="(item,index) in tabBars" :key="index"
				 :class="tabIndex === index ? 'font-lg text-main':'font-md text-light-muted'">{{item.name}}</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>

		<!-- 关联滑块 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<!-- 下拉加载 -->
					<load-more :loadmore="loadmore"></load-more>
				</scroll-view>
			</swiper-item>

			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">

					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>

					<!-- 搜索框 -->
					<view class="p-1">
						<view class="bg-light rounded flex align-center justify-center py-1 text-secondary" @click="openSearch">
							<text class="iconfont icon-sousuo mr-1"></text>
							搜索话题
						</view>
					</view>

					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item>
							<image src="/static/demo/banner1.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
						<swiper-item>
							<image src="/static/demo/banner1.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<!-- 分割线 -->
					<divider></divider>

					<!-- 最近更新 -->
					<view class="p-2 font">最近更新</view>

					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>

				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>
<script>
	//测试数据
	const demo = [{
		username: "昵称1",
		userpic: "/static/default.jpg",
		newstime: "2020-05-24 上午 11：31",
		isFollow: true,
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
		isFollow: true,
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
		isFollow: true,
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
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import hotCate from '@/components/news/hot-cate.vue';
	import topicList from '@/components/news/topic-list.vue';
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				tabIndex: 0,
				scrollH: 500,
				tabBars: [{
					name: '关注'
				}, {
					name: '话题'
				}],
				//关注列表
				list: [],
				//1.上拉加载更多 2.加载中 3.没有更多了
				loadmore: "上拉加载更多",
				hotCate: [{
					name: "关注",
				}, {
					name: '推荐',
				}, {
					name: '体育',
				}, {
					name: '热点',
				}, {
					name: '财经',
				}],
				topicList: [{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					},
					{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}
				],
			}
		},
		onLoad() {
			let res = uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			//根据选项生成列表
			this.list = demo
		},
		methods: {
			//打开发布页
			openAddInput() {
				uni.navigateTo({
					url: "../add-input/add-input"
				})
			},
			//切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			//监听滑动
			onChangeTab(e) {
				this.tabIndex = e.detail.current
			},
			//顶踩操作
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
			},
			loadmoreEvent() {
				//验证当前是否加载状态
				if (this.loadmore !== '上拉加载更多') return;
				//设置加载状态
				this.loadmore = '加载中...'
				//模拟请求数据
				setTimeout(() => {
					//加载数据
					this.list = [...this.list, ...this.list]
					//设置加载状态
					this.loadmore = '上拉加载更多'
				}, 2000)
			},
			//打开搜索页
			openSearch(){
				uni.navigateTo({
					url:"../search/search?type=topic"
				});
			}

		}
	}
</script>

<style>

</style>
