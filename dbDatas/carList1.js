var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Car',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var listSchema = new Schema({  
  carId: {
    type: String,
    required: true
  },
  carType: {
    type: String,
    required: true
  },
  route: {
    type:String,
   required:true
  },
 carNumber: {
    type: String,
		required:true
  },
	startTime:{
		type:String,
		required:true
	},
	rest: {
	  type: String,
	  required:true
	},
	status:{
		type:String,
		required:true
	},
	distance:{
		type:String,
		required:true
	},
	driveDistance:{
		type:String,
		required:true
	}
})

var List= mongoose.model('List', listSchema)//创建集合statistics
/*var carlist=new List({
	carId:'CL-172',
	carType:'万象-K786',
	route:'5路',
	carNumber:'浙A83B29',
	startTime:'2018-10-1',
	rest:'30%',
	status:'启动',
	distance:'662公里',
	driveDistance:'654公里'
})

carlist.save()*/
module.exports=List