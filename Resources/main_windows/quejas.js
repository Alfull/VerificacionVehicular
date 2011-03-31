var data = [
	{title:'Dirección Ejecutiva de Vigilancia', hasChild:true, test:'quejas-procu.js'},
	{title:'Procuraduría Social', hasChild:true, test:'quejas-prosoc.js'},
	{title:'Procuraduría Federal del Consumidor', hasChild:true, test:'quejas-profeco.js'},
	{title:'Locatel', hasChild:true, test:'quejas-locatel.js'}

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