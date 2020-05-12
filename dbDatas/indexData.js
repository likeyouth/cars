var mongoose = require('mongoose')

// 首页数据
mongoose.connect('mongodb://localhost/Car',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var indexSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  carSum: {
    type: Number,
    required: true
  },
  moniterCar: {
    type: Number,
   required:true
  },
  proportionM: {
    type: String,
		required:true
  },
	outCars:{
		type:Number,
		required:true
	},
	proportionO: {
	  type: String,
	  required:true
	}
})

var IndexData = mongoose.model('Statistic', indexSchema)//创建集合statistics
/*var indexs=new IndexData({
	company:'广东公交集团',
	carSum:683,
	moniterCar:683,
	proportionM:'100%',
	outCars:683,
	proportionO:'100%'
})

indexs.save()*/
module.exports=IndexData