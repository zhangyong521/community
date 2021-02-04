<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			//获取网络状态
			uni.getNetworkType({
			    success: (res)=> {
			        if(res.networkType==='none'){
						uni.showToast({
							title:'当前属于断网状态，请先链接网路',
							icon:'none'
						});
					}
			    }
			});
			
			//监听网络状态
			uni.onNetworkStatusChange((res)=> {
			    if(res.networkType==='none'){
			    	uni.showToast({
			    		title:'当前属于断网状态，请先链接网路',
			    		icon:'none'
			    	});
			    }
			});
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	/**官方css库*/
	@import "./common/uni.css";
	/**阿里的图标库*/
	@import "./common/icon.css";
	/**动画库*/
	@import "./common/animate.css";
	/**自定义的css库*/
	@import "./common/free.css";
	/**全局样式*/
	@import "./common/common.css";
	
</style>
