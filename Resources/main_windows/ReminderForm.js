/**
 * Forma que configura los recordatorios para cada vehiculo
 */
function ReminderForm(vehiculo){

	//Ancho de filas
	var anchoFil = 50;
	//Tamaño de fuente
	var fsize = 14;
	//Variable q tiene el arreglo de filas
	var form = [];
		
	//Modal para config de recordatorios
	var w = Titanium.UI.createWindow({
		backgroundColor:'white',
		opacity:0.92,
		barColor:'black',
		backgroundImage:'../imgs/bg.png',
		title:'Ajuste de recordatorio'
	});
	var b = Titanium.UI.createButton({
		title:'Cerrar',
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	
	w.setLeftNavButton(b);
	b.addEventListener('click',function()
	{
		w.close();
	});
	
	//Filas
	var rP1 = Ti.UI.createTableViewRow({height:50});
	
	var lP1 = Titanium.UI.createLabel({
	    text:'Inicio período',
	    top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'#aaa',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left'
	});
	var lRem1 = Titanium.UI.createLabel({
	    text:'Primer día del período de 2 meses',
	    height:fsize ,
	    width:'auto',
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    top: lP1.top + lP1.height +2, 
	    font:{fontSize: fsize-2},
	    textAlign:'left'
	});
	
	var swRem1 = Ti.UI.createSwitch({
		right:10,
		value:true
	});

	rP1.add(lP1);
	rP1.add(lRem1);
	rP1.add(swRem1);
	
	form.push(rP1);
	
	//--------------------------------------------/
	var rP2 = Ti.UI.createTableViewRow({height:50});
	
	var lP2 = Titanium.UI.createLabel({
	    text:'Mitad período',
	    top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'#aaa',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left'
	});
	var lRem2 = Titanium.UI.createLabel({
	    text:'1er día del segundo mes',
	    height:fsize ,
	    width:'auto',
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    top: lP2.top + lP2.height +2, 
	    font:{fontSize: fsize-2},
	    textAlign:'left'
	});
	
	var swRem2 = Ti.UI.createSwitch({
		right:10,
		value:true
	});

	rP2.add(lP2);
	rP2.add(lRem2);
	rP2.add(swRem2);
	
	form.push(rP2);	
	
	var rP3 = Ti.UI.createTableViewRow({height:50});
	
	var lP3 = Titanium.UI.createLabel({
	    text:'Quincena final',
	    top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'#aaa',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left'
	});
	var lRem3 = Titanium.UI.createLabel({
	    text:'15 días antes del término',
	    height:fsize ,
	    width:'auto',
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    top: lP3.top + lP3.height +2, 
	    font:{fontSize: fsize-2},
	    textAlign:'left'
	});
	
	var swRem3 = Ti.UI.createSwitch({
		right:10,
		value:true
	});

	rP3.add(lP3);
	rP3.add(lRem3);
	rP3.add(swRem3);
	
	form.push(rP3);
	
	var rP4 = Ti.UI.createTableViewRow({height:50});
	
	var lP4 = Titanium.UI.createLabel({
	    text:'Semana final',
	    top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'#aaa',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left'
	});
	var lRem4 = Titanium.UI.createLabel({
	    text:'7 días antes del término',
	    height:fsize ,
	    width:'auto',
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    top: lP4.top + lP4.height +2, 
	    font:{fontSize: fsize-2},
	    textAlign:'left'
	});
	
	var swRem4 = Ti.UI.createSwitch({
		right:10,
		value:true
	});

	rP4.add(lP4);
	rP4.add(lRem4);
	rP4.add(swRem4);
	
	form.push(rP4);
	
	//Creamos una seccion para poder manipular su header.
	var vh = Titanium.UI.createView({
		
	});
	
	var secc = Titanium.UI.createTableViewSection({
		
	});
	
	var rP5 = Ti.UI.createTableViewRow({ header:' '});
	
	var lP5 = Titanium.UI.createLabel({
	    text:'Primer semestre',
	    //top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left',
	    hasCheck: true
	});
	rP5.semestre = 1;
	rP5.hasCheck=true;
	rP5.add(lP5);
	
	//form.push(rP5);	
	
	var rP6 = Ti.UI.createTableViewRow();
	
	var lP6 = Titanium.UI.createLabel({
	    text:'Segundo semestre',
	    //top: 6,
	    width:200,
	    height:fsize + 2,
	    color:'black',
	    //backgroundColor:'#000000',
	    left:5,
	    font:{fontSize: fsize, fontWeight:'bold'},
	    textAlign:'left',
	    hasCheck: false
	});
	
	rP6.add(lP6);	
	rP6.semestre = 2;
	
	//form.push(rP6);	

	
	//Tabla de la forma
	var tableForm = Titanium.UI.createTableView({
		data:form,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	//tableForm.addEventListener('click', function(){});

	swRem1.addEventListener('change',function(e)
	{
		Ti.API.info('Basic Switch value = ' + e.value + ' act val ' + swRem1.value);
		vehiculo.swn1 = (swRem1.value)? 1 : 0;

	});
	
	swRem2.addEventListener('change',function(e)
	{
		Ti.API.info('Basic Switch value = ' + e.value + ' act val ' + swRem2.value);
		vehiculo.swn2 = (swRem2.value)? 1 : 0;		
	});
	swRem3.addEventListener('change',function(e)
	{
		Ti.API.info('Basic Switch value = ' + e.value + ' act val ' + swRem3.value);
		vehiculo.swn3 = (swRem3.value)? 1 : 0;
	});
	swRem4.addEventListener('change',function(e)
	{
		Ti.API.info('Basic Switch value = ' + e.value + ' act val ' + swRem4.value);
		vehiculo.swn4 = (swRem4.value)? 1 : 0;
	});
	
	(vehiculo.swn1)? swRem1.value = true:swRem1.value=false;
	(vehiculo.swn2)? swRem2.value = true:swRem2.value=false;
	(vehiculo.swn3)? swRem3.value = true:swRem3.value=false;
	(vehiculo.swn4)? swRem4.value = true:swRem4.value=false;
	
	w.add(tableForm);
	w.open({modal:true});

	tableForm.addEventListener('click', function(e)
	{
	
		
		var section = e.section;
		Ti.API.info('Rows en seccion: '+section.rowCount+' index: '+e.index);
		if(section.rowCount < 3){// resetear checks
		
			setTimeout(function()
			{
				for (var i=0;i<section.rows.length;i++)
				{
					section.rows[i].hasCheck = false;
					section.rows[i].children[0].color = '#000';
				}

				e.row.hasCheck = true;
				e.row.children[0].color = '#336699';
						
			},100);
			
		}		
				
	});	
	
}