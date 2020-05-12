var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/Car',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  birthday: {
    type: Date
  },
	company:{
		type:String,
		required:true
	},
	created_time: {
	  type: Date,
	  default: Date.now
	}
})

var User = mongoose.model('User', userSchema)//创建表users

/*var admin=new User({
	username:'哈哈哈',
	password:'123456',
	gender:1,
	company:'杭州公交集团'
})

//保存
admin.save()*/

module.exports = User
