var win = Titanium.UI.currentWindow;
var tabGroup = win.tabGroup;
win.barColor = 'black';

//Incluimos el modelo de datos
Ti.include("../modelo/vehiculo.js");
//Incluimos las filas UI de la tabla de vehiculos
Ti.include("RowsVehiculo.js");
//Incluimos la forma de captura y edicion de vehiculos
Ti.include("VehiculoForm.js");

tabGroup.addEventListener('focus',function(e){
	
	Ti.API.info('Idx: '+e.index);
	if(e.index==4){
		tableview.setData([]);
		tableview.setData(RowsVehiculo());
	}
	
});

//Obtenemos la lista de filas
var data = RowsVehiculo();

// Creamos la vista tabular
var tableview = Titanium.UI.createTableView({
	deleteButtonTitle:'Eliminar',
	editable:true, 
	moveable:false
});
tableview.setData(data);

//Se asigna listener para edicion
tableview.addEventListener('click', function(e)
{
	if (e.rowData.vehiculo)
	{
		VehiculoForm(e.rowData.vehiculo);
	}
});

//Botones en el nav

//
//  crear editar/cancelar en el nav bar
//
var edit = Titanium.UI.createButton({
	title:'Editar'
});

edit.addEventListener('click', function()
{
	win.setLeftNavButton(cancel);
	tableview.editing = true;
});

var cancel = Titanium.UI.createButton({
	title:'Hecho',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
cancel.addEventListener('click', function()
{
	win.setLeftNavButton(edit);
	tableview.editing = false;
});

var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ADD
});
win.setRightNavButton(add);

//Agregamos la tabla a la ventana raiz
Titanium.UI.currentWindow.add(tableview);
win.setLeftNavButton(edit);

//Event listener para borrar registros
tableview.addEventListener('delete',function(e){
	Ti.API.info("Borrar el "+e.row.myid);
	var vehiculo = new Vehiculo();
	vehiculo.borrar(e.row.myid);
	
	//Se emite trigger de vehiculo guardado
	Ti.App.fireEvent('vehiculo.borrado');
});

/////////////// Pantalla de captura de automovil
add.addEventListener('click', function(){

	var vehiculo = new Vehiculo();
	VehiculoForm(vehiculo);
});


