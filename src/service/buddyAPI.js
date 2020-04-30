const BUDDY_APT = {
	getBuddyList:{
		method:'get',
		url:'/contactList'
	},
	newBuddyForm:{
		method:'post',
		url:'/contact/new/form'
	},
	newBuddyJson:{
		method:'post',
		url:'/contact/new/json'
	},
	editBuddy:{
		method:'put',
		url:'/contact/edit'
	},
	delBuddy:{
		method:'delete',
		url:'/contact'
	}
}

export default BUDDY_APT