var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Car',{ useNewUrlParser: true })

var Schema = mongoose.Schema


var chargeSchema = new Schema({  
	carId:{
		type:String,
		required:true
	},
  eat: {
    type: String,
    required: true
  },
  chargeStart: {
    type: String,
    required: true
  },
  batteryS: {
    type:String,
   required:true
  },
 endTime: {
    type: String,
		required:true
  },
	batteryE:{
		type:String,
		required:true
	},
	usingtime: {
	  type: String,
	  required:true
	},
	chargeDate:{
		type:String,
		required:true
	}
})

var Charge = mongoose.model('Charge', chargeSchema)//创建集合charges

/*var charges=new Charge({
	carId:'CL-674',
	eat:'炸鸡薯片',
	chargeStart:'10:11',
	batteryS:'75%',
	endTime:'12:11',
	batteryE:'50%',
	usingtime:'2h',
	chargeDate:'2019-01-02'
})

charges.save()*/
module.exports=Charge
