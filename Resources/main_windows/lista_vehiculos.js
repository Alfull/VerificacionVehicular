var win = Titanium.UI.currentWindow;
var tabGroup = win.tabGroup;
win.barColor = 'black';
//Incluimos el modelo
Ti.include("../modelo/vehiculo.js");
Ti.include("RowsVehiculo.js");
Ti.include("VehiculoForm.js");
var data = RowsVehiculo();

// create table view
var tableview = Titanium.UI.createTableView({
	deleteButtonTitle:'Eliminar',
	editable:true, 
	moveable:true
});

tableview.setData(data);

// add move event listener
tableview.addEventListener('move',function(e)
{
	Titanium.API.info("move - row="+e.row+", index="+e.index+", section="+e.section+", from = "+e.fromIndex);
});

tableview.addEventListener('click', function(e)
{
	if (e.rowData.vehiculo)
	{
		Titanium.API.info('quieren ver: '+e.rowData.vehiculo);
		
		VehiculoForm(e.rowData.vehiculo);
		//Titanium.UI.currentTab.open(win,{animated:true});
	}
});

//Botones en el nav

//
//  create edit/cancel buttons for nav bar
//
var edit = Titanium.UI.createButton({
	title:'Editar'
});

edit.addEventListener('click', function()
{
	win.setLeftNavButton(cancel);
	//win.setRightNavButton(cancel);
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

//add table view to the window
//if(data.length > 0){ 
	Titanium.UI.currentWindow.add(tableview);
	win.setLeftNavButton(edit);
//}

	//Event listener para borrar registros
tableview.addEventListener('delete',function(e){
	Ti.API.info("Borrar el "+e.row.myid);
	var vehiculo = new Vehiculo();
	vehiculo.borrar(e.row.myid);
});

/////////////// Pantalla de captura de automovil
add.addEventListener('click', function(){

	var vehiculo = new Vehiculo();
	VehiculoForm(vehiculo);
});


