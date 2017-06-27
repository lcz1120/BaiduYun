var cont = document.getElementById("content");
var cont_left = cont.getElementsByClassName('left')[0]
var lis_a = cont_left.querySelectorAll('li a');
var arr = ['url(images/left_01.png) no-repeat','url(images/left_02.png) no-repeat','url(images/left_03.png) no-repeat','url(images/left_04.png) no-repeat','url(images/left_05.png) no-repeat','url(images/left_06.png) no-repeat','url(images/left_07.png) no-repeat','url(images/left_08.png) no-repeat','url(images/left_09.png) no-repeat']
for(var i = 0;i<lis_a.length;i++){
	lis_a[i].style.background = arr[i];
}
/*-----------为content-left添加9张图片-----------------*/
var btn = document.getElementsByClassName('btn')[0];
var folder1 = document.getElementsByClassName('folder1')[0];
var folders = document.getElementsByClassName('folder');
var folder2 = document.getElementsByClassName('folder2')[0];
var alter = document.getElementsByClassName('alter')[0]//input
var txt = document.getElementsByClassName('txt')[0];//value
var ok = document.getElementsByClassName('ok')[0];//√
var no = document.getElementsByClassName('no')[0];//x
var all = document.getElementById("checkAll");//全选
var img1 = document.getElementsByClassName("img1");//文件夹图片
var img2 = document.getElementsByClassName("img2");//未勾选
var img3 = document.getElementsByClassName("img3");//已勾选
var Twoimg = document.getElementsByClassName('Twoimg');
var rgKey = document.getElementsByClassName("rgkey")[0];//右键菜单
/*----------------------框选的left--------------------------*/
var cont = document.getElementById("content");
var contLeft = cont.getElementsByClassName('left')[0];
/*----------------------框选的top---------------------------*/
var nav = document.getElementsByTagName('nav')[0];
var allFolder = document.getElementsByClassName('allFolder')[0];//全部文件
var pTxt =  allFolder.getElementsByTagName('p')[1];//已加载xx,共x个
var folderName = document.getElementsByClassName('folderName')[0];//文件名
var level = document.getElementById("level");//面包屑导航
var levelAs = level.getElementsByTagName('a');//获取面包屑导航a标签
var levelDiv = document.getElementById("levelDiv");//获取面包屑导航的div
var is = level.getElementsByTagName('i');//面包屑导航下的i
var rgKeyFolder = rgKey.getElementsByTagName('li')[4];//右键新建文件夹
var renFolder = document.getElementById("ren");//重命名
var deleteFolder = document.getElementById("deleteFolder")//删除文件夹
var contLeft_left = contLeft.getBoundingClientRect().right;//获取content的右边到左边可视区的距离
var folderName_top = folderName.getBoundingClientRect().bottom;//获取folderName的下边到上边可视区的距离
var folderRgKey = document.getElementsByClassName("folderRgKey")[0];//文件夹上的右键
var rgKeyRen = folderRgKey.getElementsByTagName('li')[0];//文件夹上右键的重命名
var rgKeyDele = folderRgKey.getElementsByTagName('li')[1];//文件夹上右键的删除
var folder1Divs = folder1.getElementsByTagName('div'); // folder1下面的所有div
var path = [];//存面包屑的路径
var onOff = true; //点击新建的时候控制Twoimg
var on = true;//控制点击多个新建
var isDrag = false;//碰撞开关
var dblclick = true;//当点新建文件夹的时候控制能否双击进入
var m = 1//控制文件夹的数量
var pid2 = 0;//pid对应的父级
var mouseBox = true; //判断鼠标框选的开关 true:可以框选 false:不能框选
var drag = true;//当我鼠标按下的时候判断是否在文件夹的勾选上  true - 是  false - 不是
/*--------------文件夹切换-------------------*/


/*
 	思路:
		1.写数据
		2.拿到数据渲染页面
		3.文件夹新建、重命名、删除
	注意:
		1.文件夹默认出现在第一个位置
		2.新建文件夹名字为新建文件夹
		3.当新建文件夹有了的时候在新建会出现新建文件夹(2)以此类推
		4.当我点√的时候进行判断如果没重名则新建文件夹,如果重名则弹出来名字重复
		5.点x的时候整个文件夹删除,新建数组里的数据删除
		6.鼠标移入出现边框移出边框消失
		7.点击勾选,鼠标移出边框不消失
		8.当选中一个的时候可以点击重命名,选中多个或者没选中的时候重命名点击无效果
		9.点击重命名的时候,点击√的时候进行判断如果没重名则新建文件夹,如果重名则弹出来名字重复,点x的时候文件名为默认名
		10.点击删除的时候被勾选的文件夹删除,数组里对应的内容删除
		11.当点击全选的时候都选中,再点一下全取消,如果文件夹全部被选中,则全选被勾上
 * */
var newF = document.getElementById("newFolder");
var f1box = document.getElementsByClassName('f1box')[0];//文件夹的父级
//var str = '';
var data = [{
	id:1,
	name:'css',
	pid:0
},
{
	id:2,
	name:'html',
	pid:0
},
{
	id:3,
	name:'javascript',
	pid:0
},
{
	id:4,
	name:'javascript2',
	pid:3
},
{
	id:5,
	name:'javascript3',
	pid:4
}]
/*-------------新建文件夹封装--------------------*/
function newFolder(d){
//	str = '<div class="folder"><div class="Twoimg"><img src="images/folder.png" class="img1"/><img src="images/gou1.png" class="img2"/><img src="images/gou2.png" class="img3"/></div><p>'+arr.name+'</p></div>'+str;
//	folder1.innerHTML = str;
	var folder = document.createElement('div');
	var Twoimg = document.createElement('span');
	var img1 = document.createElement('img');
	var img2 = document.createElement('img');
	var img3 = document.createElement('img');
	var p = document.createElement('p');
	img1.className = 'img1';
	img2.className = 'img2';
	img3.className = 'img3';
	Twoimg.className = 'Twoimg';
	Twoimg.style.display = 'block';
	folder.className = 'folder';
	img1.src = 'images/folder.png';
	img2.src = 'images/gou1.png';
	img3.src = 'images/gou2.png';
	p.innerHTML = d.name;
	Twoimg.appendChild(img1);
	Twoimg.appendChild(img2);
	Twoimg.appendChild(img3);
	folder.appendChild(Twoimg);
	folder.appendChild(p);
	folder1.appendChild(folder);
	
	/*-----------鼠标移入文件夹-----------*/
	Twoimg.onmouseover = function(){
		if(onOff){
			this.style.borderColor = '#307fde';
			img2.style.display = 'block';
			img2.onclick = function(){
				img3.style.display = 'block'
				gou();
			}
			img3.onclick = function(){
				img3.style.display = 'none';
				img2.style.display = 'none';
				gou();
			}
		}
	}
	Twoimg.onmouseout = function(){
		if(img3.style.display != 'block'){
			Twoimg.style.borderColor = '#fff';
			img2.style.display = 'none';
		}
	}
/*---------------双击--------------------*/

	img1.ondblclick = function(){
		all.checked = false;//双击进入文件夹的时候全选为false
		if (!dblclick) return;
		for (var i = 0; i < folder1Divs.length; i++) {
			folder1.removeChild(folder1Divs[i])
			i--;
		}
		pid2 = d.id;
		location.hash = 't='+d.id  //t = 双击进入的那个文件夹的id
		bread();//点击上一级和全部文件的封装
		path.push(d)
		var div = document.createElement("div");
		div.id = 'levelDiv';
		div.style.float = 'left';
		var str = '';
		for (var i = 0; i < path.length; i++) {
			str += '<a href="#t='+path[i].id+'" style="color:#065cc1">'+path[i].name+'<time style="margin:0 4px;color:#000">></time></a>';
		}
		div.innerHTML = str;

/*-------------------面包屑导航最后一个颜色改变,hash去掉-------------------------*/
		var divLastChild = div.lastElementChild
		var divLastChildNodes = divLastChild.childNodes[1];
		if (divLastChild) {
			divLastChild.href = 'javascript:;';
			divLastChild.style.color = '#000000'
			divLastChild.style.cursor = 'text';
			divLastChild.removeChild(divLastChildNodes)
		}else{
			divLastChild.href = path[i].id;
		}
		var levelDivs = level.getElementsByTagName('div');
		if (levelDivs.length>0) {
			var leverChild = level.children[4];
			level.removeChild(leverChild)
		}
		level.appendChild(div)	
		m = 1;
		level.style.display = 'block';
	}
	
/*----------------------点击面包屑导航-------------------------------*/
		
	for (var i = 0; i < levelAs.length; i++) {
		levelAs[i].onclick = function(){
			str = '';
			path = [];
			path.push(d);
			for (var k = 0; k < path.length; k++) {
				str += '<a href="#t='+path[k].id+'" style="color:#065cc1">'+path[k].name+'<time style="margin:0 4px;color:#000">></time></a>';
			}
			var levelDivs = level.getElementsByTagName('div');
			levelDivs.innerHTML = '';
			levelDivs.innerHTML = str;
		}
	}
	
/*---------------拖拽--------------------*/
	img1.onmousedown = function(ev){
		ev.preventDefault();
		if (img3.onclick || img2.onclick) {
			//再勾选上按下时,文件夹不能拖拽
			drag = false;
		}
		if(img1.onmousedown){
			//再文件夹上按下时,文件夹可以拖拽
			drag = true;
		}
		if (drag) {
			var img = document.createElement("img");
			img.className = 'img4';
			img.src = 'images/folder.png';
			folder1.appendChild(img);
			document.onmousemove = function(ev){
				var l = ev.clientX - contLeft_left - img.offsetWidth/2;
				var t = ev.clientY - folderName_top - img.offsetHeight/2;
				img.style.left = l + 'px'; 
				img.style.top = t + 'px';
				img.style.display = 'block';
			}
			document.onmouseup = function(ev){
				for (var i = 0; i < folders.length; i++) {
					//判断拖拽的文件夹是否发生碰撞并且拖拽的文件夹是否跟自身发生碰撞
					if (duang(img,folders[i]) && !duang(img,folder)) {
						for (var j = 0; j < data.length; j++) {
							//判断拖拽文件夹的innerHTML和数组里的name
							if (p.innerHTML == data[j].name) {
								for (var k = 0; k < data.length; k++) {
									//判断发生碰撞的文件夹的innerHTML和数组里的name
									if (folders[i].children[1].innerHTML == data[k].name) {
										//把发生碰撞文件夹的id赋值给被拖拽的文件夹的pid
										data[j].pid = data[k].id
									}
								}
								hash();
							}
						}
					}
				}
				folder1.removeChild(img);
				document.onmousemove = document.onmouseup = null;
			}
		}
	}
}

/*-------------一上来显示#t=0------------------------*/

if (!location.hash) {
	location.hash = 't='+0;
}

/*-------------渲染页面--------------------*/
for (var i = data.length-1; i >= 0; i--) {
	if (data[i].pid == 0) {
		newFolder(data[i])
	}
}

/*-------------面包屑导航封装--------------------*/

function bread(){
	is[0].onclick = function(){
		if(path[path.length - 1].pid == 0) {
			level.style.display = 'none';
		}
		location.hash = 't=' + path[path.length - 1].pid;
		path.splice(path.length - 1, 1)
		var levelLast = level.lastElementChild;
		var levelLast2 = level.lastElementChild.previousElementSibling;
		var levelI = level.getElementsByTagName('i');
		if (levelI.length > 2) {
			level.removeChild(levelLast)
			level.removeChild(levelLast2)
		}
		
	}
	is[1].onclick = function(){
		location.hash = 't='+0;
		path = [];
		level.innerHTML = '<i>返回上一级</i><span>|</span><i>全部文件</i><span>&gt</span>';
		level.style.display = 'none';
	}
}

/*-------------hash封装-------------------------*/
function hash(){
	for (var i = 0; i < folder1Divs.length; i++) {
		folder1.removeChild(folder1Divs[i])
		i--;
	}
	var page = location.hash.split('=')[1];
	for (var i = data.length-1; i >= 0; i--) {
		if (page == data[i].pid) {
			newFolder(data[i])
		}
	}
}

window.onhashchange = function(){
	hash();
}
/*-------------已加载全部,共x个------------------*/
pTxt.innerHTML = '已加载全部,共'+data.length+'个';
/*-------------全选-------------------*/
all.onclick = function(){	
	//判断alter是否为block状态,如果是全选则选不了
	if(alter.style.display == 'block'){
		all.checked = false
		return
	}
	if (all.checked) {		
		for (var i = 0; i < img3.length; i++) {
//			img3[i].onOff = true;
			img3[i].style.display = 'block'
			img2[i].style.display = 'none'
			Twoimg[i].style.borderColor = '#307fde';
		}
	} else{
		for (var i = 0; i < img3.length; i++) {
			img3[i].style.display = 'none'
			Twoimg[i].style.borderColor = '#fff';		
		}
	}
}

/*-------------文件夹全部√上全选勾上----------*/
/*
 	1.添加
 	2.删除
 	3.单选
 	4.反选
 	5.框选
 	6.文件夹右键
 	7.右键
 	8.碰撞检测
 	9.点击重命名
 * */
function gou(){
	var	h = 0;
	if(img3.length == 0){
		all.checked = false;
		return
	}
	for(var i=0;i<img3.length;i++){	
		if(img3[i].style.display == 'block'){
			h++;
		}
	}
	if(h == img3.length){
		all.checked = true;
	}else{
		all.checked = false;
	}
//	console.log(h);
}

/*-------------新建文件夹封装---------------*/
function xj(){
	if (alter.style.display == 'block') {
		on = false;//判断alter是否显示如果显示则点击新建无效
	}
	if(on){
		mouseBox = false; //当点击新建的时候鼠标不能框选
		dblclick = false;//当点新建文件夹的时候双击无效
		txt.value = '';
		for (var i = 0; i < img3.length; i++) {
			img3[i].style.display = 'none';
			img2[i].style.display = 'none';
			Twoimg[i].style.borderColor = '#fff';
		}
		if(data.length == 0){
			m = 1
		}
		all.checked = false;
		onOff = false;
		on = false;
		var j = {};
		for (var i = 0; i < data.length; i++) {
			var n = data[i].id;
		}
		n++;
		j.id = n;
		j.pid = pid2;
		data.push(j)
		newFolder(data[data.length-1])
//		console.log(data);
		//判断一下我当前的文件夹div的个数是否大于1
		if (folder1Divs.length > 1) {
			var divs = folder1.getElementsByTagName('div');
			var firstFolder = folder1.getElementsByTagName('div')[0]//第一个文件夹
			var lastFolder = folder1.getElementsByTagName('div')[divs.length-1]//最后一个文件夹
//			console.log(firstFolder,lastFolder);
			folder1.insertBefore(lastFolder,firstFolder)//把最后一个文件夹插入到第一个文件夹之前
		}
		alter.style.left = 0;
		alter.style.display = 'block';
//		if (m == 1) {
//			txt.value = '新建文件夹';
//			txt.select();
//			m++;
//		}else{
//			txt.value = '新建文件夹('+m+')';
//			txt.select();
//			m++;
//		}
		//点击√
		ok.onclick = function(){
			for (var i = 0; i < data.length; i++) {
				if (txt.value == data[i].name) {
					alert('文件夹重名')
					return;
				}
			}
			if(txt.value == ''){
				if(m == 1){
					txt.value = '新建文件夹'
					m++
				}else{
					txt.value = '新建文件夹('+(m++)+	')'
				}
	//			console.log(m);
			}
			if (folder1Divs.length > 1) {
				var txt2 = lastFolder.firstElementChild.nextElementSibling	//p的innerHt
		//		console.log(txt2);
				txt2.innerHTML = txt.value
				data[data.length-1].name = txt2.innerHTML
			}else{
				var txt3 = folder1.children[3].lastElementChild;
				txt3.innerHTML = txt.value
				data[data.length-1].name = txt3.innerHTML
			}
			txt.value = '';
			alter.style.display = 'none';
			pTxt.innerHTML = '已加载全部,共'+data.length+'个';
	//		checkAll.checked = false;
			all.checked = false;
			onOff = true;
			on = true;
			dblclick = true;//点击ok后可双击文件夹
			mouseBox = true;//当点击ok后可以鼠标框选
//			console.log(data);
		}
		no.onclick = function(){
			folder1.removeChild(this.parentNode.nextElementSibling)
			alter.style.display = 'none'
			txt.value = '';
			data.pop()
			onOff = true;
			on = true;
			dblclick = true;//点击ok后可双击文件夹
			mouseBox = true;//当点击ok后可以鼠标框选
	//		console.log(data);
	//		console.log(this.parentNode.nextElementSibling);
		}
	}
}

/*-------------重命名封装--------------------*/
function ren(){
	mouseBox = false; //当点击重命名的时候鼠标不能框选
	var n = 0
	for (var i = 0; i < img3.length; i++) {
		if (img3[i].style.display == 'block') {
			n++
		}		
	}
//	console.log(n);
	if(n == 0){
		mouseBox = true;
		return
	}
	if(n > 1){
		alert('请选中单个文件夹')
		mouseBox = true;//当点击ok后可以鼠标框选
		return
	}
	if(n == 1){
		onOff = false;
		for (var i = 0; i < img3.length; i++) {
			if(img3[i].style.display == 'block'){
				var p = img3[i].parentNode.nextElementSibling
				var l = p.offsetLeft
				var t = p.offsetTop
				alter.style.left = l - 40 + 'px' ;
				alter.style.top = t + 'px';
				alter.style.display = 'block';
				txt.value = p.innerHTML;
				txt.select();
				ok.onclick = function(){
					for (var i = 0; i < data.length; i++) {
						if (txt.value == data[i].name) {
							alert('文件夹重名')
							return;
						}
					}
					if(txt.value == ''){
						alert('请输入内容')
						return;
					}
					for (var j = 0; j < data.length; j++) {
						if(data[j].name == p.innerHTML){							
							p.innerHTML = txt.value
							alter.style.display = 'none';
							txt.value = '';			
							data[j].name = p.innerHTML
							onOff = true;
							gou()
						}
					}					
//					console.log(data);
					mouseBox = true; //当点击ok的时候鼠标能框选
				}
				no.onclick = function(){
					alter.style.display = 'none';
					onOff = true;
					mouseBox = true; //当点击ok的时候鼠标能框选
					gou()
				}
			}
			img3[i].style.display = 'none';
			img2[i].style.display = 'none';
			Twoimg[i].style.borderColor = '#fff'
		}
		
	}
}

/*-------------删除封装------------------------*/
function dele(){
	for (var i = 0; i < img3.length; i++) {
		if(img3[i].style.display == 'block'){
			for(var j = 0;j < data.length;j++){
				if(data[j].name == img3[i].parentNode.nextElementSibling.innerHTML){
					data.splice(j,1)
				}
			}
			var par = img3[i].parentNode.parentNode
			folder1.removeChild(par)
			i--;
			gou()
			pTxt.innerHTML = '已加载全部,共'+data.length+'个';
		}
	}
}
/*-------------新建文件夹---------------*/
newF.onclick = function(){
	xj();
//	console.log(data);
}

/*-------------重命名--------------------*/
renFolder.onclick = function(){	
	ren();
//	console.log(data);
}
/*-------------删除------------------------*/
deleteFolder.onclick = function(){	
	dele();
//	console.log(data);
}
/*-------------鼠标框选--------------------*/
folder1.onmousedown = function(ev){
	if (!mouseBox) {
		//判断鼠标框选的开关状态
		return;
	}
	if (ev.which != 1) {
		return;
	}
	if ( ev.target.parentNode.parentNode.parentNode == folder1) {
		return;
	}
	ev.preventDefault();
	rgKey.style.display = 'none';
	folderRgKey.style.display = 'none';
	ev = ev || event;	
	var x = ev.clientX - contLeft_left - 10;
	var y = ev.clientY - folderName_top - 2;
	var div = document.createElement('div');
	div.id = 'div';
	div.style.left = x + 'px';
	div.style.top = y + 'px';
	folder1.appendChild(div);
	document.onmousemove = function(e){
		var x2 = e.clientX - x - contLeft_left;
		var y2 = e.clientY - y - folderName_top;
		if (x2 < 0) {
			div.style.left = e.clientX - contLeft_left - 10 + 'px';
			div.style.width = ev.clientX - e.clientX  + 'px';
		}
		if (y2 < 0) {
			div.style.top = e.clientY - folderName_top + 'px';
			div.style.height = ev.clientY - e.clientY + 'px';
		}
		div.style.width = x2 - 10 +'px';
		div.style.height = y2 +'px';
		for (var i = 0; i < Twoimg.length; i++) {
			//判断是否碰撞,如果碰撞则碰撞的被选中
			if (duang(div,Twoimg[i])) {
				img3[i].style.display = 'block';
				Twoimg[i].style.borderColor = '#307fde';
				gou();
			}else{
				img3[i].style.display = 'none';
				img2[i].style.display = 'none';
				Twoimg[i].style.borderColor = '';
			}
		}
	}
	document.onmouseup = function(){
		folder1.removeChild(div);
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

/*-------------右键新建文件夹-------------------------*/
rgKeyFolder.onclick = function(){
	rgKey.style.display = 'none';
	xj();
}

/*-------------碰撞检测-------------------------------*/
function duang(obj,obj2){
	var pos1 = obj.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if (pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
		//没碰上
		gou();
		return false;
	}else{
		//碰上
		gou();
		return true;
	}
}

/*--------------folder的浮动转换为absolute----------------------*/
//for (var i = 0; i < folders.length; i++) {
//	folders[i].style.left = folders[i].getBoundingClientRect().left - contLeft_left + 'px';
//	folders[i].style.top = folders[i].getBoundingClientRect().top - folderName_top + 'px';
//}
//for (var i = 0; i < folders.length; i++) {
//	folders[i].style.position = 'absolute';
//	folders[i].style.margin = 0;
//}
/*--------------folder浮动转换为absolute----------------------*/



/*-------------清除window的默认样式-------------------*/
contLeft.onmousedown = function(){
	//阻止contLeft可以选中文字
	return false;
}
nav.onmousedown = function(){
	//阻止nav可以选中文字
	return false;
}
document.onclick = function(){
	rgKey.style.display = 'none';
	folderRgKey.style.display = 'none';
}
/*--------------------文件夹右键-----------------------------*/
	folder1.oncontextmenu = function(ev){
		folderRgKey.style.display = 'none';
		rgKey.style.display = 'none';
		ev.preventDefault();
		if ( ev.target.parentNode.parentNode.parentNode === folder1 ) {
			console.log(ev.target);
			for (var i = 0; i < img1.length; i++) {
				img3[i].style.display = 'none';
				Twoimg[i].style.borderColor = '#fff';
				img2[i].style.display = 'none';
				if (ev.target == img1[i]) {
					ev.target.nextElementSibling.nextElementSibling.style.display = 'block';
					Twoimg[i].style.borderColor = '#307fde';
					img2[i].style.display = 'block';
					gou()
				}
				if (ev.target == img2[i]) {
					ev.target.nextElementSibling.style.display = 'block';
					Twoimg[i].style.borderColor = '#307fde';
					img2[i].style.display = 'block';
					gou()
				}
			}
			ev = ev || event;
			var x = ev.clientX - contLeft_left - 7;
			var y = ev.clientY - folderName_top;
			folderRgKey.style.left = x  + 'px';
			folderRgKey.style.top = y + 'px';
			folderRgKey.style.display = 'block';
			//重命名
			rgKeyRen.onclick = function(){
				ren();
			}
			//删除
			rgKeyDele.onclick = function(){
				dele();
			}
			return false;
		}else{
			for (var i = 0; i < Twoimg.length; i++) {
				Twoimg[i].style.borderColor = '#fff';
				img2[i].style.display = 'none';
				img3[i].style.display = 'none';
			}
			gou();
			ev = ev || event;	
			var x = ev.clientX - contLeft_left - 7;
			var y = ev.clientY - folderName_top;
			rgKey.style.left = x  + 'px';
			rgKey.style.top = y + 'px';
			rgKey.style.display = 'block';
			return false;
		}
		
	}

/*
 bug
 	1.点击新建的时候可以触发Twoimg的onmouseover
 	2.点击全选再点新建全选按钮处于勾选状态
 	3.文件夹全部删除后,全选处于勾选状态
 	4.当点重命名的时候可以触发Twoimg的onmouseover
 	5.父集文件夹与子集文件夹重名
 	6.删除文件夹时,判断innHTML的pid
 	7.当点全选然后双击进入文件夹时,checked为false
 	8.点击新建文件夹时,阻止触发双击进入
 	9.alter弹出的时候清除默认样式
 **/


