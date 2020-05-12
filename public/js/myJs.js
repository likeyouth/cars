// JavaScript Document
function my$(id){
		return document.getElementById(id);
	}
	var list=my$("rightCol").children;
	my$("list3").onclick=function(){
		my$("t2").innerHTML="车辆列表";
		for(var i=1;i<list.length;i++){
			list[i].style.display="none";
		}
		my$("bottom3").style.display="block";
	}
	
	my$("list1").onclick=function(){
		my$("t2").innerHTML="车辆:&nbsp;2-8888";
		for(var i=1;i<list.length;i++){
			list[i].style.display="none";
		}
		my$("bottom1").style.display="block";
	}
	
	my$("list4").onclick=function(){
		my$("t2").innerHTML="报表下载";
		for(var i=1;i<list.length;i++){
			list[i].style.display="none";
		}
		my$("bottom4").style.display="block";
	}