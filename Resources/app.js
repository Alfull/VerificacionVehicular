// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//Inicializamos base
initDB();

//Variables globales
var meses =['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var mesesAbr=['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'];


//Incluimos el modelo
Ti.include("modelo/vehiculo.js");

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Inicio',
    url:'main_windows/lista_inicio.js',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'imgs/car.png',
    title:'Inicio',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'No cuenta con Vehículos registrados. Para comenzar a utilizar la aplicación debe agregar los datos de uno o más Vehículos oprimiendo el botón "+"',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Verificentros',
    url:'main_windows/lista_verificentros.js',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'imgs/map.png',
    title:'Verificentros',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

//
//create controls tab and root window
//
var win3 = Titanium.UI.createWindow({  
 title:'Información',
 url:'main_windows/informacion.js',
 backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
 icon:'imgs/info.png',
 title:'Información',
 window:win3
});

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'To Do',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win3.add(label3);

//
//create controls tab and root window
//
var win4 = Titanium.UI.createWindow({  
title:'Denuncias',
url:'main_windows/quejas.js',
backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({  
icon:'imgs/phone.png',
title:'Denuncias',
window:win4
});

var label4 = Titanium.UI.createLabel({
	color:'#999',
	text:'To Do',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win4.add(label4);

//
//create controls tab and root window
//
var win5 = Titanium.UI.createWindow({  
title:'Ajustes',
url:'main_windows/lista_vehiculos.js',
backgroundColor:'#fff'
});
var tab5 = Titanium.UI.createTab({  
icon:'imgs/wrench.png',
title:'Ajustes',
window:win5
});

var label5 = Titanium.UI.createLabel({
	color:'#999',
	text:'To Do',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win5.add(label5);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);


// open tab group
tabGroup.open();

//Test de local notification

/*var notification = Ti.App.iOS.scheduleLocalNotification({
	alertBody:"Soy una notificación local.",
	alertAction:"OK",
	userInfo:{"hello":"world"},
	sound:"pop.caf",
	date:new Date(new Date().getTime() + 10000) // 3 seconds after backgrounding
});
*/

//Detecta si es la primera vez que entran a la app
var primera = Titanium.App.Properties.getString('virgen');
if(primera == null)
{
	Titanium.UI.createAlertDialog({title:'Bienvenido', message:'Para comenzar a usar la aplicación debe dar de alta sus vehículos oprimiendo el simbolo +'}).show();
	Titanium.App.Properties.setString('virgen','NO');
}

//Inicializamos la base de datos
function initDB(){
	var db = Titanium.Database.open('BDVerificacionVehicular');
	//db.execute('DROP TABLE vehiculo');
	db.execute('CREATE TABLE IF NOT EXISTS vehiculo  (id TEXT, alias TEXT, placa TEXT, modelo INTEGER, auv INTEGER, muv INTEGER, engomado INTEGER, terminacion INTEGER, path_foto TEXT, n1 TEXT,n2 TEXT,n3 TEXT,n4 TEXT, semestre INTEGER)');
	db.close(); 
}
Titanium.API.info("Iniciando app");

//Listener de las notificaciones:
/*
Ti.App.iOS.addEventListener('notification',function(e)
{
	Ti.API.info("local notification user info: "+e.userInfo.hello);
});
*/

