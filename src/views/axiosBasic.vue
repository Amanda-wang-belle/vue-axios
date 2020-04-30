<template>
	<div class="axiosFirst">
		axiosBasic
	</div>
</template>

<script>
import axios from 'axios'

export default({
	name:"axiosFirst",
	created() {
		//vue项目启动之后根目录是public，所以可以直接用/data.json路径
		// localhost:8080/data.json?id=12
		
/* 		get 获取数据（url,config）
		delete 删除数据（url,config）
		post 发送数据（url,data,config）
		put 修改数据(向后台发送所有数据)（url,data,config）
		patch 更改数据(仅向后台发送修改数据) （url,data,config）
		*/
		
		axios.get('/data.json',{
			params:{
				id:12
			}
		}).then((res) =>{
			console.log(res)
		})
		//get
		axios({
			methods:'get',
			url:'/data.json',
			params:{
				id:12
			}
		}).then(res =>{
			console.log(res)
		})
		//post
		//form-data 表单提交(图片上传、文件上传)
		//application/json
		let data ={
			id:12
		}
		axios.post('/post',data).then(res =>{
			console.log(res)
		})
		axios({
			methods:'post',
			url:'/post',
			data:data
		}).then(res =>{
			console.log(res)
		})
		// form-data
		let formData = new FormData();
		for(let key in data){
			formData.append(key,data[key])
		}
		axios.post('/post',formData,{}).then(res =>{
			console.log(res)
		})
		
		//put
		axios.put('/put',data,{}).then(res =>{
			console.log(res)
		})
		axios({
			methods:'put',
			url:'/put',
			data:data
		}).then(res =>{
			console.log(res)
		})
		
		//patch
		axios.patch('/patch',data,{}).then(res =>{
			console.log(res)
		})
		
		//delete与get请求类似，只有两个参数
		// 第一种方法直接把参数放到url中
		// http://localhost:8080/delete?id=12
		axios.delete('/delete',{
			params:{
				id:12
			}
		}).then(res =>{
			console.log(res)
		})
		// http://localhost:8080/delete
		axios.delete('/delete',{
			data:{
				id:12
			}
		}).then(res =>{
			console.log(res)
		})
		
		/* axios并发请求 axios.all(arr) axios.spread()
		   同时进行多个请求，并统一处理返回值
		*/
		axios.all(
			[
				axios.get('/data.json'),
				axios.get('data1.json')
			]
		).then(
			// 分割不同请求的返回值
			axios.spread((dataRes,data1Res) =>{
				console.log(dataRes,data1Res)
			})
		)
		
	}
})
</script>

<style scoped>
</style>
