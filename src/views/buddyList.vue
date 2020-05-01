<template>
	<div class="buddyList">
		<!-- 联系人列表 -->
		 <van-contact-list
		    v-model="chosenContactId"
		    :list="list"
		    @add="onAdd"
		    @edit="onEdit"
		    @select="onSelect"
		  />
		<van-popup v-model="showEdit" position="bottom">
		  <van-contact-edit
		    :contact-info="editingContact"
		    :is-edit="isEdit"
		    @save="onSave"
		    @delete="onDelete"
		  />
		</van-popup>
		
	</div>
</template>

<script>
import { ContactList,Toast,ContactEdit,Popup} from 'vant'
import axios from 'axios'
export default {
	name: 'buddyList',
	components: {
		[ContactList.name]: ContactList,
		[ContactEdit.name]: ContactEdit,
		[Popup.name]: Popup
	},
	data(){
		return {
			list:[],
			instance:null,  //axios实例
			showEdit:false,  //编辑弹框显隐
			editingContact:{}, //正在编辑的联系人数据
			isEdit:false,       //新建false 编辑 true
			chosenContactId: null,
			showEdit: false
		}
	},
	created() {
		this.instance = axios.create({
			baseURL:'http://localhost:9000/api',
			timeout:1000
		})
		this.getList()
	},
	methods:{
		async getList(){
			let res = await this.$Http.getBuddyList()
			this.list = res.data;
		},
		onAdd(){
			this.showEdit = true
			this.isEdit = false
		},
		onEdit(info){
			this.showEdit = true
			this.isEdit = true
			this.editingContact = info
		},
		async onSave(info){
			if(this.isEdit){
				console.log(info)
				//编辑保存
				let res = await this.$Http.editBuddy(info)
				
				if(res.code === 200){
					Toast('保存成功');
					this.showEdit = false
					this.getList()
				}
			}else{
				//新建保存
				// let res = await this.$Http.newBuddyJson(info)
				let res = await this.$Http.newBuddyForm(info,true)
				if(res.code === 200){
					Toast('新建成功');
					this.showEdit = false
					this.getList()
				}
				// this.instance.post('/contact/new/json',info).then(res=>{
				// 	console.log(res)
				// })
			}
		},
		async onDelete(info){
			let res = await this.$Http.delBuddy(
				{
					id:info.id
				})
			if(res.code === 200){
				Toast('删除成功');
				this.showEdit = false
				this.getList()
			}
			
		},
		// 选中联系人
		onSelect() {
			this.showList = false;
		},
	}
};
</script>

<style scoped>
	.van-popup{
		height: 100%;
	}
</style>
