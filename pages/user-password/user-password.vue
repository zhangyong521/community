<template>
	<view>

		<input class="uni-input" type="text" value="" placeholder="请输入旧密码" v-model="oldpassword" />

		<input class="uni-input" type="text" value="" placeholder="请输入新密码" v-model="newpassword" />

		<input class="uni-input" type="text" value="" placeholder="请输入确认密码" v-model="renewpassword" />

		<view class="py-2 px-3">
			<button class="bg-main-disabled text-white " style="border-radius: 50rpx;border: 0;" type="primary" :disabled="disabled"
			 @click="submit">设置</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				renewpassword: ""
			}
		},
		//计算属性
		computed: {
			disabled() {
				return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == '';
			}
		},

		methods: {
			//验证新密码和旧密码是否相同
			check() {
				if (this.newpassword !== this.renewpassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return false
				}
				return true
			},
			submit() {
				if (!this.check()) {
					return;
				}
				console.log("提交成功")
			}

		}
	}
</script>

<style>

</style>
