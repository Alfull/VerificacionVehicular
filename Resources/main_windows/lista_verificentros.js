/***************************************************************************************
 * LISTA DE VERIFICENTROS
 */
//
// la ventana y tab de lista de verificentros
//
var win = Titanium.UI.currentWindow;
Ti.include("../verificentros.js");

var search = Titanium.UI.createSearchBar({
	barColor:'#385292',
	hintText:'Colonia, delegación o municipio',
	showCancel:true
});
search.addEventListener('change', function(e)
{
	e.value;
});
search.addEventListener('return', function(e)
{
	search.blur();
});
search.addEventListener('cancel', function(e)
{
	search.blur();
});

var tableView;
var data = [];

//create a var to track the active row
var currentRow = null;
var currentRowIndex = null;
var fontSize = 12;
var alLeft = 14;

//create the rest of the rows
for(var dat in datos)
{
	var row = Ti.UI.createTableViewRow();
	row.selectedBackgroundColor = '#fff';
	row.height = 90;
	row.className = 'datarow';
	row.clickName = 'row';

	var labCol = Ti.UI.createLabel({
		color:'#576996',
		font:{fontSize:fontSize+2,fontWeight:'bold', fontFamily:'Arial'},
		width:"auto",
		clickName:'user',
		textAlign:1,
		left:alLeft,
		top:14,
		height:18,
		text:datos[dat].colonia
	});
	
	row.add(labCol);

	//Fila de calle
	var labCalle = Ti.UI.createLabel({
		color:'#222',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		width:"auto",
		clickName:'comment',
		textAlign:1,
		left:alLeft,
		top:labCol.top+fontSize+2 + 6,
		height:fontSize,
		text:datos[dat].calle
	});
	row.add(labCalle);

	//Fila de delegacion
	var labDel = Ti.UI.createLabel({
		color:'#222',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		width:"auto",
		clickName:'comment',
		textAlign:1,
		left:alLeft,
		top:labCalle.top+fontSize +2,
		height:fontSize+2,
		text:datos[dat].delegacion
	});
	row.add(labDel);
	
	//Fila de tel
	var labTel = Ti.UI.createLabel({
		color:'#222',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		width:"auto",
		clickName:'comment',
		textAlign:1,
		left:alLeft,
		top:labDel.top+labDel.height+2,
		height:fontSize+2,
		//autoLink:Ti.UI.Android.LINKIFY_PHONE_NUMBERS,
		text:(datos[dat].telefono1!= '')?''+datos[dat].telefono1:''+(datos[dat].telefono2!='')?', '+datos[dat].telefono1:''
	});
	
	row.add(labTel);
	
	row.filter = labCol.text+ ' '+labCalle.text+ ' '+labDel.text + ' '+labTel.text;

	
	//Fila de boton
	var button = Ti.UI.createView({
		backgroundImage:'../imgs/map-marker.png',
		top:'auto',
		right:10,
		width:16,
		clickName:'button',
		height:32
	});
	row.add(button);

	data.push(row);
}


//
//create table view (
//
tableView = Titanium.UI.createTableView({
	data:data,
	search:search,
	filterAttribute:'filter',
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

tableView.addEventListener('click', function(e)
{
	var rowNum = e.index;
	
	//win.fireEvent('verificentro.seleccionado',{rowNum:rowNum,latitud:datos[rowNum].latitud,longitud:datos[rowNum].longitud});
	var url = "http://maps.google.com/?ie=UTF8&q="+datos[rowNum].latitud+","+datos[rowNum].longitud+"&z=15&mrt=yp";
	Titanium.Platform.openURL(url);
});

win.add(tableView);
