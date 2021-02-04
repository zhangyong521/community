<template>
	<view>
		<uni-list-item title="头像" clickable @click="changeUserpic">
			<view class="flex align-center" slot="footer">
				<image :src="userpic" style="height: 100rpx;width: 100rpx;" class="rounded-circle"></image>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<uni-list-item title="昵称">
			<view class="flex align-center" slot="footer">
				<input class="uni-input text-right" v-model="username" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<uni-list-item title="性别" clickable @click="changeSex">
			<view class="flex align-center" slot="footer">
				<text>{{sexText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<uni-list-item title="生日">
			<view class="flex align-center" slot="footer">
				<input class="uni-input text-right" v-model="birthday" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
			
		</uni-list-item>
		
		<uni-list-item title="情感" clickable @click="changeEmotion">
			<view class="flex align-center" slot="footer">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<uni-list-item title="职业" clickable @click="changeJob">
			<view class="flex align-center" slot="footer">
				<text>{{job}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<uni-list-item title="家乡">
			<view class="flex align-center" slot="footer">
				<text>贵州</text>
				<input class="uni-input text-right" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<view class="py-2 px-3">
			<button class="bg-main text-white " style="border-radius: 50rpx;border: 0;" type="primary">完成</button>
		</view>

	</view>
</template>

<script>
	const sexArray = ["保密", "男", "女"]; //0保密 1男 2女
	const EmotionArray = ["保密", "未婚", "已婚"]; //0保密 1未婚 2已婚
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				userpic: "/static/default.jpg",
				username: "哈哈",
				sex: 0,
				birthday: "2020-10-10",
				emotion: 0,
				job: "保密",
			}
		},
		//计算属性
		computed: {
			sexText() {
				return sexArray[this.sex]
			},
			emotionText() {
				return EmotionArray[this.emotion]
			}
		},
		methods: {
			//修改头像
			changeUserpic() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.userpic = res.tempFilePaths[0];
					}
				});
			},
			//修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sex = res.tapIndex;
					}
				});
			},
			//修改生日
			onDateChange() {
				console.log("wqe")
			},
			// 修改情感
			changeEmotion() {
				uni.showActionSheet({
					itemList: EmotionArray,
					success: (res) => {
						this.emotion = res.tapIndex;
					}
				});
			},
			//修改职业
			changeJob() {
				let JobArray = ["IT", "教师", "农民", "其他"]
				uni.showActionSheet({
					itemList: JobArray,
					success: (res) => {
						this.job = JobArray[res.tapIndex];
					}
				});
			}
		}
	}
</script>

<style>
</style>
