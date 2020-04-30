<template>
	<div class="axiosErr">
		axiosInterceptor
	</div>
</template>

<script>
	// 拦截器，在请求或响应被处理前拦截他们
import axios from 'axios'
export default{
	name:'axiosErr',
	created() {
		axios.get('/data.json').then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})
		
		let instance = axios.create({})
		instance.interceptors.request.use(config=>{
			return config
		},err=>{
			return Promise.reject(err)
		})
		
		instance.get('/data.json').then(res=>{
			return res
		},err=>{
			console.log(err)
		})
		
		// 取消请求
		let source = axios.CancleToken.source()
		axios.get('/data.json',{
			CancleToken:source.token
		}).then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})
		
		// 取消请求（message可选）
		source.cancle('cancle http')
		
	}
}
</script>

<style>
</style>
