var data = [
	{title:'Requisitos verificación', hasChild:true, url:'requisitos.html',backgroundColor:'white',font:{fontSize:10}},
	{title:'Tarifas', hasChild:true, url:'tarifas.html',backgroundColor:'white',font:{fontSize:10}},
	{title:'Multas', hasChild:true, url:'http://200.57.32.61/df_consulta_ciudadana/',backgroundColor:'white',font:{fontSize:10}}

];

var tableview = Titanium.UI.createTableView({
	
	data:data,
	top:20,
	borderRadius:10,
	borderColor:'#aaa',
	width:300,
	height:43*data.length
});

//create table view event listener
tableview.addEventListener('click', function(e){
		
	var rowdata = e.rowData;
	var w = Ti.UI.createWindow({title:e.rowData.title });
	w.barColor='black';
	w.orientationModes = [
	                      Titanium.UI.PORTRAIT,
	                      Titanium.UI.LANDSCAPE_LEFT,
	                      Titanium.UI.LANDSCAPE_RIGHT
	                      ];

	webview = Ti.UI.createWebView();
	if(rowdata.title=='Multas'){
		
		var a = Titanium.UI.createAlertDialog({
			title:'Alerta',
			message:'Esta acción abrirá el portal de la SSP para consulta de multas.'
		}).show();
	}
	webview.url = rowdata.url;
	w.add(webview);
	
	Titanium.UI.currentTab.open(w,{animated:true});

});

Titanium.UI.currentWindow.backgroundImage='../imgs/bg2.png',

// add table view to the window
Titanium.UI.currentWindow.add(tableview);