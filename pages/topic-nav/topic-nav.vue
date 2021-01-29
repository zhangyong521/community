<template>
	<view>
		<!-- 头部选项卡 border-bottom border-white -->
		<scroll-view scroll-x scroll-with-animation :scroll-into-view="scrollInto" class="scroll-row border-bottom border-light-secondary"
		 style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" :id="'tab'+index" class="scroll-row-item px-3 py-2 font-md"
			 :class="tabIndex===index?'text-main font-lg font-weight-bold':''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<!-- 关联滑块 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)">
					<!-- 判断是否有内容 -->
					<template v-if="item.list.length > 0">
						<!-- 首页列表页 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<topic-list :item="item2" :index="index2"></topic-list>
						</block>
						<!-- 下拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<template v-else>
						<!-- 无内容 -->
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	//测试数据
	const demo = [{
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
		}, {
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
		}, {
			cover: "/static/demo/topicpic/1.jpeg",
			title: "话题名称",
			desc: "话题描述",
			today_count: 0,
			news_count: 10
		},{
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
	];
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				//列表的高度
				scrollH: 600,
				//顶部选项卡操作
				tabIndex: 0,
				scrollInto: "",
				tabBars: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '体育',
				}, {
					name: '热点',
				}, {
					name: '财经',
				}, {
					name: '娱乐',
				}, {
					name: '军事',
				}, {
					name: '历史',
				}, {
					name: '本地',
				}],
				//列表页操作
				newsList: []
			}
		},
		onLoad() {
			let res = uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
			//根据选项生成列表
			this.getData()
		},
		methods: {
			//获取数据
			getData() {
				var arr = []
				for (var i = 0; i < this.tabBars.length; i++) {
					//生成列表模板
					let obj = {
						//1.上拉加载更多 2.加载中 3.没有更多了
						loadmore: "上拉加载更多",
						list: []
					}
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			//监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			//顶部选项卡操作
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				//使所选项的滚动到最左端
				this.scrollInto = 'tab' + index
			},
			//上拉加载更多
			loadmore(index) {
				//拿到当前列表
				let item = this.newsList[index]
				//判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== '上拉加载更多') return;
				//修改当前列表加载状态
				item.loadmore = '加载中...'
				//模拟数据请求
				setTimeout(() => {
					//加载数据
					item.list = [...item.list, ...item.list]
					item.loadmore = '上拉加载更多'
				}, 1000)
			}
		}
	}
</script>
