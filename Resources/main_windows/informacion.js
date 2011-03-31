var data = [
	{title:'Requisitos verificación', hasChild:true, test:'info-verificacion.js'},
	{title:'Tarifas', hasChild:true, test:'info-tarifas.js'},
	{title:'Multas', hasChild:true, test:'info-multas.js'}

];

var tableview = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

//create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			//url:e.rowData.test,
			title:e.rowData.wintitle || e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);