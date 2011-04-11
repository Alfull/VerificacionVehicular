/**
 * App que emite recordatorios para verificar autos conforme al programa de Verificación Vehicular del DF
 * @author Edgar Orozco
 * Para Bixit SA de CV
 * Para Mobizen SA de CV
 */
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
// Creamos ventana raiz y controles tab
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
	text:'',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win3.add(label3);

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
	text:' ',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win4.add(label4);

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
	text:'',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

//Agregamos los tabs al tabgroup
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);

//Seteamos color de fondo de ventanas
win1.backgroundColor = 'black';
win2.backgroundColor = 'black';
win3.backgroundColor = 'black';
win4.backgroundColor = 'black';
win5.backgroundColor = 'black';

//seteamos color de barras
win1.barColor = 'black';
win2.barColor = 'black';
win3.barColor = 'black';
win4.barColor = 'black';
win5.barColor = 'black';


// Abrimos el tabgroup
tabGroup.open();


//Detecta si es la primera vez que entran a la app
var primera = Titanium.App.Properties.getString('primera');
if(primera == null)
{
	Titanium.UI.createAlertDialog({title:'Bienvenido', message:'Para comenzar a usar la aplicación debe dar de alta sus vehículos oprimiendo el simbolo "+" en la sección "Ajustes"'}).show();
	Titanium.App.Properties.setString('primera','NO');
	tabGroup.setActiveTab(4); 
}

//Inicializamos la base de datos
function initDB(){
	var db = Titanium.Database.open('BDVerificacionVehicular');
	//db.execute('DROP TABLE vehiculo');
	db.execute('CREATE TABLE IF NOT EXISTS vehiculo  (id TEXT, alias TEXT, placa TEXT, modelo INTEGER, auv INTEGER, muv INTEGER, engomado INTEGER, terminacion INTEGER, path_foto TEXT, n1 TEXT,n2 TEXT,n3 TEXT,n4 TEXT, swn1 INTEGER,swn2 INTEGER,swn3 INTEGER,swn4 INTEGER, semestre INTEGER)');
	db.close(); 
}
Titanium.API.info("Iniciando app");

//Listener devehiculos guardados:
Ti.App.addEventListener('vehiculo.guardado',function(e)
{
	Ti.API.info("Se acaba de guardar un vehiculo procedemos a regenerar las notificaciones");
	regeneraNotificaciones();
});

//Listener devehiculos borrados:
Ti.App.addEventListener('vehiculo.borrado',function(e)
{
	Ti.API.info("Se acaba de borrar un vehiculo procedemos a regenerar las notificaciones");
	regeneraNotificaciones();
});

/**
 * Regenera los recordatorios para cada vehiculo
 */
function regeneraNotificaciones(){
	
	Titanium.App.iOS.cancelAllLocalNotifications();
	var db = Titanium.Database.open('BDVerificacionVehicular');
	var rows = db.execute('SELECT * FROM vehiculo');
	var c = 0;
	var data = [];
	var txAl='left';
	
	while(rows.isValidRow())
	{
		var vehiculo = new Vehiculo(rows);
		vehiculo.calculaRecordatorios();
		Ti.API.info('Calculando recordatorios para:'+vehiculo.alias);
		rows.next();
	}
}

