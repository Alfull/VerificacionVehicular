var data = [
	{title:'Dirección Ejecutiva de Vigilancia Ambiental', sub:'Tel: 52789931 Ext: 6542',hasChild:false, url:'52789931'},
	{title:'Procuraduría Social', sub:'Tel: 52088802 Ext: 211',  hasChild:false, url:'52088802'},
	{title:'Procuraduría Federal del Consumidor', sub:'Tel: 55688722', hasChild:false, url:'55688722'},
	{title:'Locatel', hasChild:false,url:'56581111', sub:'Tel: 56581111'}

];
var fsize = 12;
var rows = [];
var i = 0;
for(i=0;i<data.length;i++)
{	
	var br = (i>0)?10:0;
	//Filas
	var rP = Ti.UI.createTableViewRow({height:40,tableClass:'caca' });
	var lP1 = Titanium.UI.createLabel({
	    text:data[i].title,
	    top: 6,
	    width:'auto',
	    height:fsize + 2,
	    color:'black',
	    //backgroundColor:'#000000',
	    left:16,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left'
	});
	var lP2 = Titanium.UI.createLabel({
	    text:data[i].sub,
	    height:fsize ,
	    width:'auto',
	    color:'black',
	    //backgroundColor:'#000000',
	    left:16,
	    top: lP1.top + lP1.height, 
	    font:{fontSize: fsize-2},
	    textAlign:'left'
	});
	var iV = Ti.UI.createImageView({
		image:'../imgs/phone.png',
		width:14,
		height:14,
		right:8
		
	});
	rP.url = data.url;
	rP.add(lP1);
	rP.add(lP2);
	rP.add(iV);
	rows.push(rP);
}

var tableview = Titanium.UI.createTableView({
	data:rows,
	//backgroundColor:'white',
	//backgroundImage:'none',
	top:20,
	borderRadius:10,
	borderColor:'#aaa',
	width:300,
	height:40*data.length
	//borderColor:'black'
	//style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

Ti.API.info('Info: '+rows[0].height);

//create table view event listener
tableview.addEventListener('click', function(e)
{
	Ti.API.info('tel:'+e.index+' '+data[e.index].url+' tleng:'+(fsize+2)*data.length);
	Ti.Platform.openURL('tel:'+data[e.index].url);
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
Titanium.UI.currentWindow.backgroundImage='../imgs/bg2.png';