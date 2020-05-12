var fs=require('fs')
var user = require('./dbDatas/user')
var statistic= require('./dbDatas/indexData')
var list1 = require('./dbDatas/carList1')
var charge = require('./dbDatas/chargeInfo')
var express=require('express')
var xlsx=require('node-xlsx')
//包装路由 创建路由
var router=express.Router()

var flag=1//标记车辆列表状态重置
var flagLow=1//标记低电量车辆列表状态重置
var flagCharge=1//标记充电记录状态重置
//渲染首页
router.get('/',function(req,res){
	statistic.find(function(err,statistics){
		if(err){
			return res.status(500).send('server err')
		}
		res.render('index.html',{
			statistics:statistics,
			user: req.session.user
		})
	})
})

router.get('/cars/charge',function(req,res){
	var carid=req.query.carId //根据车辆自编号查找车辆
	charge.find({carId:carid},function(err,chargeInfo){
		if(err){
			return res.status(500).send('server err')
		}else if(flagCharge){
				res.render('carsDetails.html',{
				carId:carid,
				chargeInfo:chargeInfo,
				user:req.session.user
			})
		}else{
				res.render('carsDetails.html',{
				carId:carid,
				chargeInfo:null,
				user:req.session.user
			})
		}
})
})



router.get('/cars/map',function(req,res){
	res.render('map.html',{
		user: req.session.user
	})
})


//渲染车辆列表
router.get('/cars/details',function(req,res){
	list1.find(function(err,details){
		if(err){
			return res.status(500).send('server err')
		}else if(flag){
			res.render('carLists.html',{
				details:details,
				user: req.session.user
			})
		}else{
			res.render('carLists.html',{
				details:null,
				user: req.session.user
			})
		}
		
	})
	
})

//渲染低电量车辆列表
router.get('/cars/low',function(req,res){
	list1.find({$or:[{'status':'熄火'},{'status':'异常'}]},function(err,details){
		if(err){
			return res.status(500).send('server err')
		}else if(flagLow){
			res.render('carList2.html',{
				details:details,
				user: req.session.user
			})
		}else{
			res.render('carList2.html',{
				details:null,
				user: req.session.user
			})
		}
	})
})

router.get('/cars/download',function(req,res){
	res.render('tableDownload.html',{
		user: req.session.user
	})
})

router.get('/cars/login',function(req,res){
	res.render('login.html',{
		user: req.session.user
	})
})

//登录验证
router.post('/login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  user.findOne({
    username: body.username,
    password:body.password
  }, function (err, user) {
    if (err) {
        return res.status(500).json({
        err_code: 500,
         message: err.message
       })
     
    }
    
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'uesrname or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
		console.log(user)
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/cars/userEdit',function(req,res){
	res.render('edit.html',{
		user:req.session.user
	})
})

//修改用户信息
router.post('/cars/userEdit',function(req,res){
	var updateDatas=req.body
	var id=req.session.user._id
	user.findByIdAndUpdate(id,req.body,function(err){
		if(err){
			return res.status(500).send('err')
		}
		req.session.user=updateDatas
		res.redirect('/')
	})
})

//退出登录
router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null
  // 重定向到登录页
  res.redirect('/cars/login')
})

//导出车辆列表数据
router.get('/cars/details/export',function(req,res){
	list1.find(function(err,detailsData){
		if(err){
		return res.status(500).send('download failed')
		}
		var datas=[
			['车辆自编号','车辆型号','路线','车牌号','启用时间','剩余电量','状态','续航里程','日行驶里程']
		]
		for(var i=0;i<detailsData.length;i++){
			var line=[]
			line.push(detailsData[i].carId)
			line.push(detailsData[i].carType)
			line.push(detailsData[i].route)
			line.push(detailsData[i].carNumber)
			line.push(detailsData[i].startTime)
			line.push(detailsData[i].rest)
			line.push(detailsData[i].status)
			line.push(detailsData[i].distance)
			line.push(detailsData[i].driveDistance)
			datas.push(line)
		}
		var carsData =[
	{
		name:'carDetails',
		data:datas
	}
]
		var buffer=xlsx.build(carsData)//创建excel
		fs.writeFile('./excelSheet/carsdetail.xls',buffer,function(err){
			if(err){
				throw err
			}
			console.log('导入成功')
		})
		res.redirect('/cars/details')
	})
})

//导出低电量车数据
router.get('/cars/low/export',function(req,res){
	list1.find({$or:[{'status':'熄火'},{'status':'异常'}]},function(err,detailsData){
		if(err){
		return res.status(500).send('download failed')
		}
		var datas=[
			['车辆自编号','车辆型号','路线','车牌号','启用时间','剩余电量','状态','续航里程','日行驶里程']
		]
		for(var i=0;i<detailsData.length;i++){
			var line=[]
			line.push(detailsData[i].carId)
			line.push(detailsData[i].carType)
			line.push(detailsData[i].route)
			line.push(detailsData[i].carNumber)
			line.push(detailsData[i].startTime)
			line.push(detailsData[i].rest)
			line.push(detailsData[i].status)
			line.push(detailsData[i].distance)
			line.push(detailsData[i].driveDistance)
			datas.push(line)
		}
		var carsData =[
	{
		name:'carLow',
		data:datas
	}
]
		var buffer=xlsx.build(carsData)//创建excel
		fs.writeFile('./excelSheet/carsLow.xls',buffer,function(err){
			if(err){
				throw err
			}
			console.log('导入成功')
		})
		res.redirect('/cars/low')
	})
})

//导出车辆充电记录数据
router.get('/cars/charge/export',function(req,res){
	charge.find(function(err,detailsData){
		if(err){
		return res.status(500).send('download failed')
		}
		var datas=[
			['食物和饮料','充电开始时间','充电开始电量','充电完成时间','充电完成电量','充电时长']
		]
		for(var i=0;i<detailsData.length;i++){
			var line=[]
			line.push(detailsData[i].eat)
			line.push(detailsData[i].chargeStart)
			line.push(detailsData[i].batteryS)
			line.push(detailsData[i].endTime)
			line.push(detailsData[i].batteryE)
			line.push(detailsData[i].usingtime)
			datas.push(line)
		}
		var carsData =[
	{
		name:'chargeData',
		data:datas
	}
]
		var buffer=xlsx.build(carsData)//创建excel
		fs.writeFile('./excelSheet/charge.xls',buffer,function(err){
			if(err){
				throw err
			}
			console.log('导入成功')
		})
		res.redirect('/cars/charge')
	})
})



//查询车辆
router.post('/findOne',function(req,res){
	var one=req.body.carId //获取用户输入内容
	list1.findOne({carId:one},function(err,oneCar){
		if(err){
			return res.status(500).send('server err')
		}
		if(oneCar){
			res.render('carLists.1.html',{
				oneCar:oneCar,
				user: req.session.user
			})
		}else{
			res.redirect('/cars/details')
		}
	})
})

//查询低电量车辆
router.get('/cars/low/findOne',function(req,res){
	var one=req.query.carId //获取用户输入内容
	list1.findOne({carId:one,$or:[{'status':'熄火'},{'status':'异常'}]},function(err,oneCar){
		if(err){
			 return res.status(500).send('server err')
		}
		
		if(oneCar){
			res.render('carLists.1.html',{
				oneCar:oneCar,
				user: req.session.user
			})
		}else{
			res.redirect('/cars/low')
		}
	})
})

//重置车辆
router.get('/reset',function(req,res){
	flag=0
	res.redirect('/cars/details')
})

//重置低电量车辆
router.get('/low/reset',function(req,res){
	flagLow=0
	res.redirect('/cars/low')
})

//重置充电记录
router.get('/charge/reset',function(req,res){
	flagCharge=0
	res.redirect('/cars/charge')
})

//查询充电记录
router.post('/findDate',function(req,res){
	var carid=req.query.carId //根据车辆自编号查找车辆
	var date=req.body.chargeDate //获取日期
	charge.find({chargeDate:date,carId:carid},function(err,finds){
		if(err){
			return res.status(500).send('server err')
		}
		//console.log(finds)
		res.render('carsDetails.1.html',{
			carId:carid,
			findDate:finds,
			date:date,
			user: req.session.user
		})
	})
})


module.exports=router