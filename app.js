var express=require('express')
var bodyParser=require('body-parser')
var router=require('./router.js')
var path = require('path')
var session = require('express-session')

var app=express()
 
 app.use('/public/', express.static(path.join(__dirname, './public/')))
 app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
 app.engine('html',require('express-art-template'))
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
 
 app.use(session({
   // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
   // 目的是为了增加安全性，防止客户端恶意伪造
   secret: 'car',
   resave: false,
   saveUninitialized: false // 无论你是否使用 Session ，默认直接给你分配一把钥匙
 }))
 
 
 //把路由器挂在到app3中,挂在必须在配置模板引擎和bodyparser之前
 app.use(router) 
 
 app.use(function (req, res) {
   res.render('404.html')//处理404
 })
 
 
 app.listen(3000,function(){
	 console.log('running')
 })
 