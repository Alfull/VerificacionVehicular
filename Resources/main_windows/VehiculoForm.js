Ti.include("ReminderForm.js");

/**
 * Forma de captura del vehiculo
 */
function VehiculoForm(vehiculo){
	

	var titulo='Nuevo vehículo';
	var win = Ti.UI.createWindow({title:titulo,backgroundColor:"black",backgroundImage:'../imgs/bg.png'});
	win.barColor = 'black';
	var meses =[];
	//meses.push('Nunca');
	meses.push('Enero');meses.push('Febrero');meses.push('Marzo');meses.push('Abril');meses.push('Mayo');
	meses.push('Junio');meses.push('Julio');meses.push('Agosto');meses.push('Septiembre');meses.push('Octubre');
	meses.push('Noviembre');meses.push('Diciembre');
	
	var anchoCol=30;
	var fsize = 16;
	Titanium.UI.currentTab.open(win);
	var form = [];

	//Event handlers
	var filtroAlias = function(e)
	{
		var val = e.source.value;
		var maxlon = 12;
		!!( /[^0-9a-zA-ZñÑ\s]/.test(val) ) ? e.source.value = val.replace(/[^0-9a-zA-ZñÑ\s]/gi,'') : false ;
		e.source.value = e.source.value.slice(0,maxlon);
		e.source.value = e.source.value.toUpperCase();
	};

	var filtroPlaca = function(e)
	{
		var val = e.source.value;
		var maxlon = 7;
	    !!( /[^0-9a-zA-Z]/.test(val) ) ? e.source.value = val.replace(/[^0-9a-zA-Z]/gi,'') : false ;
	    e.source.value = e.source.value.slice(0,maxlon);
	    e.source.value = e.source.value.toUpperCase();
	};

	var determinaColor = function(e)
	{
		var val = e.value;
		var redf = new RegExp(/^(\d{3})\w{3}$/);
		var mdf = redf.exec(val);
		var terminacion=null;
		var redom = new RegExp(/^([a-zA-Z]{3})(\d{4})$/);
		var medo = redom.exec(val);
		if(medo==null && mdf==null)
		{
			var a = Titanium.UI.createAlertDialog({
				title:'Alerta',
				message:'El valor introducido no corresponde a una placa, modifique e intente de nuevo.'
			}).show();
			return false;
		}
		else if(medo!=null && mdf==null)
		{
			//alert("placa edomex "+medo[2]);
			terminacion = medo[2].substring(3);
			Ti.API.info("placa edomex "+medo[2]+ " terminacion "+terminacion);
		}
		else if(medo==null && mdf!=null)
		{
			terminacion = mdf[1].substring(2);
			Ti.API.info("placa df "+ mdf[1]+" terminacion "+terminacion);
		}
		else{
			alert("Imposible!");
			return false;
		}
		
		setColores(terminacion);
		vehiculo.terminacion = terminacion;
	};	


	var setColores = function(dig){
		
		resetColores();
		var engomado = 0;
		if(dig == 1 || dig ==2){
			vColorVer.image='../imgs/icono4.png';
			engomado = 4;
		}
		if(dig == 3 || dig ==4){
			vColorRoj.image='../imgs/icono3.png';
			engomado = 3;
		}
		if(dig == 5 || dig ==6){
			vColorAm.image='../imgs/icono1.png';
			engomado = 1;
		}
		if(dig == 7 || dig ==8){
			vColorRos.image='../imgs/icono2.png';
			engomado = 2;
		}
		if(dig == 9 || dig ==0){
			vColorAz.image='../imgs/icono5.png';
			engomado = 5;
		}
		vehiculo.engomado = engomado;
		
		Ti.API.info("Engomado: "+engomado);
	};

	var resetColores = function()
	{
		vColorAm.image='../imgs/icono1-ns.png';
		vColorRos.image='../imgs/icono2-ns.png';
		vColorRoj.image='../imgs/icono3-ns.png';
		vColorVer.image='../imgs/icono4-ns.png';
		vColorAz.image='../imgs/icono5-ns.png';
		
	};

	var cambiaColor = function(e)
	{
		resetColores();
		e.source.image = '../imgs/icono'+e.source.colorId+'.png';
		vehiculo.engomado = e.source.engomado;
		Ti.API.info("Engomado: "+e.source.engomado);
	};

	var tomaFoto= function()
	{
		Titanium.Media.showCamera({

			success:function(event)
			{
				var cropRect = event.cropRect;
				var image = event.media;
				var ts = new Date().getTime();
				var nombreFoto = 'vehiculo_'+ts+'.jpg';
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,nombreFoto);
				f.write(image);
				//vBFoto.image = f.nativePath;
				vehiculo.pathFoto = f.nativePath;
				Ti.API.info("Path foto: "+f.nativePath);
				
			},
			cancel:function()
			{

			},
			error:function(error)
			{
				// create alert
				var a = Titanium.UI.createAlertDialog({title:'Camera'});

				// set message
				if (error.code == Titanium.Media.NO_CAMERA)
				{
					a.setMessage('Device does not have video recording capabilities');
				}
				else
				{
					a.setMessage('Unexpected error: ' + error.code);
				}
				// show alert
				a.show();
			},
			allowEditing:true
		});
	};	
	
	
	
	//Comienza construccion de objetos UI
	
	
	
	var bGuardar = Titanium.UI.createButton({
		title:'Guardar',
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	
	//Guarda el vehiculo
	bGuardar.addEventListener('click',guardarVehiculo);
	
	function guardarVehiculo(){
		
			vehiculo.placa = fPlaca.value;
			vehiculo.alias = fAlias.value;
			
			var res = vehiculo.validar();
			if(res == -1)
			{
				
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:"El alias de este registro es necesario para poder guardar."
				}).show();
				return false;

			}
			else if(res == -2)
			{
			
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:"La placa de este registro es necesaria para poder guardar."
				}).show();
			}
			else if(res == -3)
			{
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:"El modelo de este registro es necesaria para poder guardar."
				}).show();
			}
			else if(res == -4)
			{
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:"La placa introducida no se reconoce como una placa válida."
				}).show();
				
			}
			else if(res == -5)
			{
				
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:"La fecha de última verificación no es válida."
				}).show();
			}
			else{
				
				//Generamos las notificaciones para este vehiculo
				vehiculo.calculaRecordatorios();
				//guardamos todos los valores
				vehiculo.guardar();
				win.close();
				
				//Se emite trigger de vehiculo guardado
				Ti.App.fireEvent('vehiculo.guardado');
				
				tableview.setData([]);
				tableview.setData(RowsVehiculo());
			}
	}
	
	
	win.setRightNavButton(bGuardar);
	
	var rAlias = Ti.UI.createTableViewRow({height:anchoCol});
	rAlias.myid = "alias";
	var lAlias = Titanium.UI.createLabel({
	    text:'Alias',
	    height:anchoCol,
	    width:140,
	    //backgroundImage:'../imgs/bgcell.png',
	    color:'#aaa',
	    //borderColor:'black',
	    //borderWidth:1,
	    left:0,
	    font:{fontSize: fsize},
	    textAlign:'right'
	});
	var fAlias = Ti.UI.createTextField({
		hintText:'',
		clearOnEdit: false,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType:Titanium.UI.KEYBOARD_ASCII,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		top:0,
		left:lAlias.width+10,
		width:150
	});
	rAlias.add(lAlias);
	rAlias.add(fAlias);
	form.push(rAlias);

	var rPlaca = Ti.UI.createTableViewRow({height:anchoCol});
	rPlaca.myid = "placa";
	var lPlaca = Titanium.UI.createLabel({
	    text:'Placa',
	    height:anchoCol,
	    width:140,
	    color:'#aaa',
	    //backgroundImage:'../imgs/bgcell.png',
	    //backgroundColor:'#000000',
	    left:0,
	    font:{fontSize: fsize},
	    textAlign:'right'
	});

	var fPlaca = Ti.UI.createTextField({
		hintText:'',
		clearOnEdit: false,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType:Titanium.UI.KEYBOARD_ASCII,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		top:0,
		left:lPlaca.width+10,
		
		width:150
	});
	rPlaca.add(lPlaca);
	rPlaca.add(fPlaca);
	
	form.push(rPlaca);
	
	var rColores = Ti.UI.createTableViewRow({selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,header:"Confirme el color del engomado"});
	rColores.myid = "colores";
	var vColorAm = Titanium.UI.createImageView({
		image:'../imgs/icono1-ns.png',
		//top:0,
		//bottom:4,
		left:0,
		//height:'auto',
		width:'auto'
	});
	var vColorRos = Titanium.UI.createImageView({
		image:'../imgs/icono2-ns.png',
		//top:0,
		//bottom:4,
		left:64-5,
		//height:'auto',
		width:'auto'
	});
	
	var vColorRoj = Titanium.UI.createImageView({
		image:'../imgs/icono3-ns.png',
		//top:0,
		//bottom:4,
		left:64*2-10,
		//height:'auto',
		width:'auto'
	});
	var vColorVer = Titanium.UI.createImageView({
		image:'../imgs/icono4-ns.png',
	//top:0,
		//bottom:4,
		
		left:64*3-15,
		//height:'auto',
		width:'auto'
	});
	var vColorAz = Titanium.UI.createImageView({
		image:'../imgs/icono5-ns.png',
		//top:0,
		//bottom:4,
		
		left:64*4-20,
		//height:'auto',
		width:'auto'
	});

	
	vColorAm.colorId = 1;
	vColorAm.engomado = 1;
	
	vColorRos.colorId = 2;
	vColorRos.engomado = 2;
	
	vColorRoj.colorId = 3;
	vColorRoj.engomado = 3;	
	
	vColorVer.colorId = 4;
	vColorVer.engomado = 4;
	
	vColorAz.colorId = 5;
	vColorAz.engomado = 5;

	rColores.add(vColorAm);
	rColores.add(vColorRos);
	rColores.add(vColorRoj);
	rColores.add(vColorVer);
	rColores.add(vColorAz);	
	
	//Modelo
	var rModelo = Ti.UI.createTableViewRow({height:anchoCol,width:250,selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE});
	rModelo.myid = "modelo";
	var lModelo = Titanium.UI.createLabel({
	    text:'Modelo',
	    height:anchoCol,
	    width:140,
	    color:'#aaa',
	    font:{fontSize: fsize},
	    //backgroundImage:'../imgs/bgcell.png',
	    //right:10,
	    left:0,
	    textAlign:'right'
	});
	var lModeloSel = Titanium.UI.createLabel({
	    text:'',
	    height:100,
	    width:100,
	    color:'#000000',
	    left:lModelo.width+10,
	    textAlign:'left'
	});
	
	rModelo.add(lModelo);
	rModelo.add(lModeloSel);
	form.push(rModelo);
	
	//Ultima verificacion
	var rUltima = Ti.UI.createTableViewRow({height:anchoCol,width:250,selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE});
	rUltima.myid = "ultima";
	var lUltima = Titanium.UI.createLabel({
	    text:'Última verificación',
	    height:anchoCol,
	    width:140,
	    //backgroundImage:'../imgs/bgcell.png',
	    //borderColor:'black',
	    //borderWidth:1,
	    color:'#aaa',
	    left:0,
	    font:{fontSize: fsize},
	    textAlign:'right'
	});
	
	var lUltimaSel = Titanium.UI.createLabel({
	    text:'',
	    height:100,
	    width:200,
	    color:'#000000',
	    minimumFontSize:10,
	    left:lUltima.width+10,
	    textAlign:'left'
	});	
	
	rUltima.add(lUltima);
	rUltima.add(lUltimaSel);

	form.push(rUltima);
	
	form.push(rColores);
	
	//form.push(rFoto);
	
	var tableForm = Titanium.UI.createTableView({
		data:form,
		bottom:120,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	tableForm.addEventListener('click', function(){});
	
	//Foto y ToDo list view
	var vFotoTodoList = Ti.UI.createView({width:'300',height:'auto',bottom:40});
	
	//var rFoto = Ti.UI.createTableViewRow({backgroundColor:'transparent',borderWidth:0,height:150,width:'auto',selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,header:" "});
	//rFoto.myid = "foto";
	
	var botonFoto = Titanium.UI.createButton({
		width:120,
		color:'black',
		title:'Tomar Foto',
		height:40,
		top:20,
		left:10
	});
	
	botonFoto.addEventListener('click', tomaFoto);
	//rFoto.add(vBFoto);

	var botonReminder = Titanium.UI.createButton({
		width:120,
		color:'black',
		title:'Recordatorios',
		top:20,
		height:40,
		right:10
	});

	
	vFotoTodoList.add(botonFoto);
	vFotoTodoList.add(botonReminder);	
	
	botonReminder.addEventListener('click',function(){
		//Modal para recordatorios
		ReminderForm(vehiculo);
	});	
	
	win.add(tableForm);
	win.add(vFotoTodoList);
	
	///Funciones de listeners de campos
	fAlias.addEventListener('change',filtroAlias);
	fPlaca.addEventListener('change',filtroPlaca);
	fPlaca.addEventListener('blur',determinaColor);
	
	rModelo.addEventListener('click',function(){
		//Modal para picker de modelo
		var w = Titanium.UI.createWindow({
			backgroundColor:'black',
			opacity:0.92,
			barColor:'black',
			title:'Seleccione Modelo'
		});
		var b = Titanium.UI.createButton({
			title:'Cerrar',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		
		var mPicker = Ti.UI.createPicker();

		var anio = 1980;
		var hasta = new Date().getFullYear();
		var anios=[];
		
		for(anio = 1980; anio<= hasta; anio++){
			anios.push(anio);
			var row = Ti.UI.createPickerRow();
			var label = Ti.UI.createLabel({
				text:anio,
				textAlign:'center',
				width:'auto',
				height:'auto'
			});
			row.add(label);
			mPicker.add(row);
		}
		mPicker.selectionIndicator = true;
		
		var vPick = Ti.UI.createView({ 
			height: '350', 
			width: '200', 
			backgroundColor:'black',
			opacity:0.92
			//border:1,
			//borderColor:'white'
			
		});
		vPick.add(mPicker);
		
		var bOK = Titanium.UI.createButton({
			width:80,
			color:'black',
			title:'OK',
			height:40,
			bottom:0
		});
		bOK.addEventListener('click',function()
		{
			w.close();
					
		});
		vPick.add(bOK);
		
		w.add(vPick);
		w.setLeftNavButton(b);
		
		b.addEventListener('click',function()
		{
			w.close();
			
		});
		w.open({modal:true});
		if(!vehiculo.modelo){ 
			mPicker.setSelectedRow(0,25,false);
		}
		else{
			mPicker.setSelectedRow(0,vehiculo.modelo - 1980,false);
		}
		mPicker.addEventListener('change',function(e)
		{
			Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
			lModeloSel.text = anios[e.rowIndex];
			vehiculo.modelo = anios[e.rowIndex];
		});
	});
	
	rUltima.addEventListener('click',function(){
		//Modal para picker de ultima verif
		var w = Titanium.UI.createWindow({
			backgroundColor:'black',
			opacity:0.92,
			barColor:'black',
			title:'Última Verificación'
		});
		var b = Titanium.UI.createButton({
			title:'Cerrar',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		
		var uPicker = Ti.UI.createPicker();
		var colAnio = Ti.UI.createPickerColumn();
		var colMes = Ti.UI.createPickerColumn();
		

		
		var data = [];
		
		var hasta = new Date().getFullYear();
		//var hasta = 2011;
		var anio = hasta-2;
		
		for(anio; anio <= hasta; anio++){
			colAnio.addRow(Ti.UI.createPickerRow({title:anio+"",custom_item:anio+""}));
		}
		var i;
		//colMes.addRow(Ti.UI.createPickerRow({title:"Nunca",custom_item:"--"}));
		for(i=0; i<= 11; i++){
			colMes.addRow(Ti.UI.createPickerRow({title:meses[i],custom_item:i+""}));
		}

		uPicker.selectionIndicator = true;
		
		uPicker.add([colMes,colAnio]);
		var vPick = Ti.UI.createView({ 
			backgroundColor:'black',
			opacity:0.92,
			top: 0 
		});
		vPick.add(uPicker);
		
		var bOK = Titanium.UI.createButton({
			width:80,
			color:'black',
			title:'OK',
			height:40,
			bottom:40
		});
		vPick.add(bOK);
		bOK.addEventListener('click', function(){
			//Validamos que no este en el futuro
			var ahora = new Date(new Date().getFullYear(),new Date().getMonth(), 0);
			var selec = new Date(uPicker.getSelectedRow(1).custom_item,uPicker.getSelectedRow(0).custom_item,0);
			Ti.API.info('Ahora: '+ahora+ ' SELEC: '+selec);
			if(ahora < selec)
			{
				
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:'Ultima verificación inválida, no puede ser en el futuro.'
				}).show();
				
				return false;
			}
			else{
				w.close();
			}
		});
		
		w.add(vPick);
	
		w.setLeftNavButton(b);
		b.addEventListener('click',function()
		{
			//Validamos que no este en el futuro
			var ahora = new Date(new Date().getFullYear(),new Date().getMonth(), 0);
			var selec = new Date(uPicker.getSelectedRow(1).custom_item,uPicker.getSelectedRow(0).custom_item,0);
			Ti.API.info('Ahora: '+ahora+ ' SELEC: '+selec);
			if(ahora < selec)
			{
				
				var a = Titanium.UI.createAlertDialog({
					title:'Alerta',
					message:'Ultima verificación inválida, no puede ser en el futuro.'
				}).show();
				return false;
			}
			else{
				w.close();
			}
		});
		uPicker.addEventListener('change',function(e)
		{
			lUltimaSel.text = uPicker.getSelectedRow(0).custom_item +" de "+uPicker.getSelectedRow(1).custom_item;
			if(uPicker.getSelectedRow(0).custom_item == '--' || uPicker.getSelectedRow(1).custom_item == '--'){
				lUltimaSel.text = 'Nunca';
				vehiculo.anioUltimaVerificacion = 0;
				vehiculo.mesUltimaVerificacion = 0;
			}
			else{
				lUltimaSel.text = uPicker.getSelectedRow(0).title +" de "+uPicker.getSelectedRow(1).custom_item;
				vehiculo.anioUltimaVerificacion = uPicker.getSelectedRow(1).custom_item;
				vehiculo.mesUltimaVerificacion = uPicker.getSelectedRow(0).custom_item;	
			}
			
		});

		w.open({modal:true});
		Ti.API.info("SET PICK U: "+vehiculo.anioUltimaVerificacion+" - " + (hasta-3));
		if(!vehiculo.mesUltimaVerificacion)
		{
			uPicker.setSelectedRow(0,0,false);
			uPicker.setSelectedRow(1,0,false);
		}
		else{
			
			uPicker.setSelectedRow(0,vehiculo.mesUltimaVerificacion,false);
			uPicker.setSelectedRow(1,vehiculo.anioUltimaVerificacion -  (hasta-3) +1,false);
		}
	});	
	
	//Metodo para setear el valor de un vehiculo a modificar
	var modificar = function(){
		
		fAlias.value=vehiculo.alias;
		fPlaca.value=vehiculo.placa;
		lModeloSel.text = vehiculo.modelo;
		lUltimaSel.text = meses[vehiculo.mesUltimaVerificacion] + ' de '+vehiculo.anioUltimaVerificacion;
		
		if(vehiculo.engomado==1) vColorAm.image='../imgs/icono1.png';
		if(vehiculo.engomado==2) vColorRos.image='../imgs/icono2.png';
		if(vehiculo.engomado==3) vColorRoj.image='../imgs/icono3.png';
		if(vehiculo.engomado==4) vColorVer.image='../imgs/icono4.png';
		if(vehiculo.engomado==5) vColorAz.image='../imgs/icono5.png';
		
		//vBFoto.image = (vehiculo.path_foto)?vehiculo.pathFoto:'../imgs/boton-cam.png';
		
		
		
		Ti.API.info('../imgs/icono'+vehiculo.engomado+'.png');
	};
	
	if(vehiculo.id > 0)
	{
		modificar();
	}
	


}


