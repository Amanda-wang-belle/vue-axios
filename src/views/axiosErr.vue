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
		
	}
}
</script>

<style>
</style>
