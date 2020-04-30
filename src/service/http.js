import axios from 'axios'
import service from './buddyAPI'
import {Toast} from 'vant'

// 新建axios实例
let instance = axios.create({
	baseURL:'http://localhost:9000/api',
	timeout:1000
})

const Http = {} //包裹请求方法的容器

// service 循环遍历输入不同的请求方法
for(let key in service){
	let api = service[key]  //url method
	
	Http[key] = async function(
		params,     //get,delete--->url  put/post/patch--->data
		isFormData=false, //标识是否是form-data请求
		config={} //配置参数
	){
		let newParams = {}
		
		// 判断content-type是否是form-data
		if(params && isFormData){
			newParams = new FormData()
			for(let i in params){
				newParams.append(i,params[i])
			}
		}else{
			newParams = params
		}
		
		// 不同请求的判断
		let response = {} //请求的返回值
		if (api.mehtods === 'put'||api.methods ==='patch'||api.methods ==="post") {
			try{
				response = await instance[api.method](api.url,newParams,config)
			}catch(e){
				response = e
			}
		} else if(api.method === 'get' || api.method === 'delete'){
			config.params = newParams
			try{
				response = await instance[api.method](api.url,config)
			}catch(e){
				response = e
			}
		}
		return response //返回响应值
	}
}

// 添加拦截器 interceptor
instance.interceptors.request.use(config=>{
	Toast.loading({
	  message: '加载中...',
	  forbidClick: true,
	  loadingType: 'spinner',
	});
	return config
},err=>{
	Toast.clear();
	Toast('请求错误，请求稍后重试')
})

instance.interceptors.response.use(res=>{
	Toast.clear();
	return res.data
},err=>{
	Toast.clear();
	Toast('请求错误，请求稍后重试')
})

export default Http