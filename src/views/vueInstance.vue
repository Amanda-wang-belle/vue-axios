<template>
	<div class="vueInstance">
		vueInstance
	</div>
</template>

<script>
	
import axios from 'axios'
export default{
	name:'vueInstance',
	created() {
		// axios实例
		// 1、后端接口域名有多个    2、超时时长不同
		let instance = axios.create({
			baseUrl:'localhost:8080',  //请求的域名，基本地址
			timeout:'1000' ,			//ms
			url:'/data.json',			//请求的路径
			methods:'get',				//请求的方法
			headers:{					//请求头
				token:''
			},
			params:{					//params请求参数放到url里面
				
			},
			data:{						//data请求参数放到请求体里
				
			}
		})
		let instance1 = axios.create({
			baseUrl:"localhost:8081",
			timeout:'2000'
		})
		instance.get('/data.json').then((res) =>{
			console.log(res)
		})
		instance1.get('/data.json').then((res) =>{
			console.log(res)
		})
		
		//优先级  请求配置 > 实例配置 > 全局配置
		// 1、axios全局配置
		axios.defaults.timeout = '3000',
		axios.defaults.baseUrl = 'localhost:9001'
		
		// 2、axios实例配置
		let instance3 = axios.create({})
		instance3.defaults.timeout = '5000'
		
		//3、axios请求配置
		axios.get('/data.json',{
			timeout:5000
		}).then(res =>{
			console.log(res)
		})
		
		
	}
}	
</script>

<style>
</style>
