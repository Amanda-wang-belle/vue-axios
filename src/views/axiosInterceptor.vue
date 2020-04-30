<template>
	<div class="axiosInterceptor">
		axiosInterceptor
	</div>
</template>

<script>
	// 拦截器，在请求或响应被处理前拦截他们
import axios from 'axios'
export default{
	name:'axiosInterceptor',
	created() {
		//请求拦截器：拦截请求响应
		axios.interceptors.request.use(config=>{
			return config
		},err=>{
			return Promise.reject(err)
		})
		
		//响应拦截器
		axios.interceptors.response.use(res=>{
			return res
		},err=>{
			return Promise.reject(err)
		})
		
		//取消拦截器
		let instance4 = axios.interceptors.request.use(config=>{
			config.headers = {
				auth : true
			}
		})
		axios.interceptors.request.reject(instance4)
		
		//登录状态（token:''）
		let instance5 = axios.create({})
		instance5.interceptors.request.use(config=>{
			config.headers.token = ''
			return config
		})
		
		//移动端请求时等待弹框
		let instance6 = axios.create({})
		instance6.interceptors.request.use(config=>{
			$('#poup').show()
			return config
		})
		instance6.interceptors.response.use(res =>{
			$("#poup").hide()
			return res
		})
	}
}
</script>

<style>
</style>
