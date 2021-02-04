<template>
	<view>
		<input class="uni-input" type="text" v-model="email" placeholder="请输入绑定的邮箱" />
		<input class="uni-input" type="text" v-model="password" placeholder="请输入邮箱的密码" />

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
				email: "",
				password: ""

			}
		},
		//计算属性
		computed: {
			disabled() {
				return this.email == '' || this.password == '';
			}
		},
		methods: {
			//验证邮箱
			check() {
				let rule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!rule.test(this.email)) {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "none"
					})
					return false;
				}
				return true;
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
