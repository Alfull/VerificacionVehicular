/**
 * La vista de cuadrotes horribles
 */

var win = Titanium.UI.currentWindow;
var tabGroup = win.tabGroup;

//Incluimos el modelo
Ti.include("../modelo/vehiculo.js");




//Se crea una vista scrollable
var scrollView = Titanium.UI.createScrollView({
    contentWidth:300,
    contentHeight:300,
    top:0,
    showVerticalScrollIndicator:false,
    showHorizontalScrollIndicator:true
});


//Para cada dato se crean vistas dentro del scroll
//function RowsVehiculo()
//{
	// create table view data object
	var db = Titanium.Database.open('BDVerificacionVehicular');
	var rows = db.execute('SELECT * FROM vehiculo');
	var c = 0;
	var data = [];
	var txAl='left';
	while(rows.isValidRow())
	{
		var vehiculo = new Vehiculo(rows);
		
		Ti.API.info("Leyendo de la base: "+vehiculo.toString() );
		if(rows.fieldByName('id') == null) continue;
		
		var view = Ti.UI.createView({
		    backgroundImage:'../imgs/icono'+vehiculo.engomado+'.png',
		    borderRadius:10,
		    width:250,
		    height:250,
		    top:10
		});
		scrollView.add(view);
		rows.next();
	}
//}
	
win.add(scrollView);