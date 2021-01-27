<template>
	<view>
		<view class="p-2">

			<!-- 头像昵称 / 关注按钮-->
			<view class="flex align-center justify-between">
				<!-- 左边头像昵称/时间 -->
				<view class="flex align-center">
					<!-- 头像 -->
					<image class="rounded-circle mr-2" :src="item.userpic" style="width: 65rpx; height: 65rpx;" lazy-load @click="openSpace"></image>
					<!-- 昵称/时间 -->
					<view>
						<view class="font" style="line-height: 1.5;">{{item.username}}</view>
						<text class="font-sm text-light-muted" style="line-height: 1.5;">{{item.newstime}}</text>
					</view>
				</view>
				<!-- 右边按钮 -->
				<view class="flex align-center justify-center rounded bg-main text-white animated faster" style="width:90rpx; height:50rpx;"
				 hover-class="pulse" @click="follow" v-if="!item.isFollow">
					关注
				</view>
			</view>

			<!-- 标题 -->
			<view class="font my-1" @click="openDetail">
				{{item.title}}
			</view>

			<!-- 图片 -->
			<image v-if="item.titlepic" class="rounded w-100" :src="item.titlepic" style="height: 350rpx;" @click="openDetail"></image>

			<!-- 图标按钮 -->
			<view class="flex align-center">
				<!-- 顶 -->
				<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doSupport('support')"
				 :class="item.support.type==='support'?'support-active':''">
					<!-- 图标 -->
					<text class="iconfont icon-dianzan2 mr-2"></text>
					<!-- 名称 -->
					<text>{{item.support.support_count > 0 ? item.support.support_count : '顶' }}</text>
				</view>
				<!-- 踩 -->
				<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="doSupport('unsupport')"
				 :class="item.support.type==='unsupport'?'support-active':''">
					<!-- 图标 -->
					<text class="iconfont icon-cai mr-2"></text>
					<!-- 名称 -->
					<text>{{item.support.unsupport_count > 0 ? item.support.unsupport_count : '踩' }}</text>
				</view>
				<!-- 评论 -->
				<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
					<!-- 图标 -->
					<text class="iconfont icon-pinglun2 mr-2"></text>
					<!-- 名称 -->
					<text>{{item.comment_count > 0 ? item.comment_count: '评论'}}</text>
				</view>
				<!-- 分享 -->
				<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
					<!-- 图标 -->
					<text class="iconfont icon-fenxiang mr-2"></text>
					<!-- 名称 -->
					<text>{{item.share_num> 0 ? item.share_num: '分享'}}</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			//打开个人空间
			openSpace() {
				console.log("打开个人空间");
			},
			//关注
			follow() {
				//通知父组件
				this.$emit('follow', this.index)
			},
			//详情
			openDetail() {
				console.log("详情页");
			},
			//顶采操作
			doSupport(type) {
				//通知父组件
				this.$emit('doSupport', {
					type: type,
					index: this.index
				})
			}
		},
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>
