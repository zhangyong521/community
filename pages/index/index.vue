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
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 分割线 -->
							<divider></divider>
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
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	export default {
		components: {
			commonList,
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
		//监听导航的搜索框点击事件
		onNavigationBarSearchInputClicked() {
			//点击调转搜索页
			uni.navigateTo({
				url: "../search/search"
			})
		}, 
		//监听导笔点击事件
		onNavigationBarButtonTap() {
			//点击调转搜索页
			uni.navigateTo({
				url: "../add-input/add-input"
			})
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
			//关注
			follow(e) {
				this.newsList[0].list[e].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			//顶踩操作
			doSupport(e) {
				//拿到当前的对象
				let item = this.newsList[0].list[e.index];
				//判断用户的操作
				console.log(this.newsList[0]);
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
				}, 10000)
			}
		}
	}
</script>

<style>

</style>
