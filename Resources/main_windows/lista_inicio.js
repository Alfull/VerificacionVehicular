/**
 * La vista de cuadrotes horribles
 */

var win = Titanium.UI.currentWindow;
var tabGroup = win.tabGroup;

//Incluimos el modelo
Ti.include("../modelo/vehiculo.js");


tabGroup.addEventListener('focus',function(e){
	
	//Ti.API.info('Idx: '+e.index);
	if(e.index==0){
		//creaRows();
		scrollView.views=[];
		scrollView.views = creaRows();
		//win.add(cover);
	}
	
});



	//Se crea vista base:
	var cover = Titanium.UI.createView({
		backgroundImage:'../imgs/bg2.png',
		//backgroundColor:'silver',
		zIndex:5
	});
	
	function creaRows(){
		// create table view data object
		var db = Titanium.Database.open('BDVerificacionVehicular');
		var rows = db.execute('SELECT * FROM vehiculo');
		var c = 0;
		var data = [];
		var txAl='left';
		var ff = 'Helvetica';
		
		while(rows.isValidRow())
		{
			var vehiculo = new Vehiculo(rows);
			var fcolor = (vehiculo.engomado==3 || vehiculo.engomado==4 || vehiculo.engomado==5)?'white':'black'; 
			
			//Ti.API.info("Leyendo de la base: "+vehiculo.toString() );
			if(rows.fieldByName('id') == null) continue;
			
			//Vista del engomado
			var view = Ti.UI.createView({
			    backgroundImage:'../imgs/goma'+vehiculo.engomado+'.png',
			    top:0,
			  //borderWidth: 1,
			  //borderColor: 'white',
			    width:315,
			    height:360
			});
			view.vehiculoId = vehiculo.id;
			//Creamos los labels para cada vehiculo
			var lAlias = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:22,fontWeight:'normal', fontFamily:ff},
				//left: vFoto.left + vFoto.width + 10,
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},
				top: 45,
				left:50,
				width:125,
				height:60,
				textAlign: 'left',
				//borderWidth: 1,
				//borderColor: 'black',
				text: vehiculo.alias
			});
			
	//****************************Todos estos estan agrupados en el siguiente view
			var grupo1 = Ti.UI.createView({
			    top:50,
			    left:180,
			  //borderWidth: 1,
			  //borderColor: 'white',
			    width:120,
			    height:'auto'
			}); 
			
			var lPlaca = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:18,fontWeight:'normal', fontFamily:ff},
				left: 0,
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},
				top: 0,
				//width:70,
				height:18,
				//right:60,
				textAlign: 'left',
				//borderWidth: 1,
				//borderColor: 'black',
				text: vehiculo.placa
			});
			
			var lModelo = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:14,fontWeight:'normal', fontFamily:ff},
				//left: vFoto.left + vFoto.width + 10,
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},
				left: 0,
				top: 24,
				width:100,
				height:14,
				textAlign: 'left',
				//borderWidth: 1,
				//borderColor: 'black',
				//right:60,
				text: 'MODELO'
			});
			
			var vModelo = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:14,fontWeight:'normal', fontFamily:ff},
				left: 0,
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},
				top: 44,
				width:100,
				height:14,
				textAlign: 'left',
				//borderWidth: 1,
				//borderColor: 'black',
				//right:60,
				text: vehiculo.modelo
			});
			
			grupo1.add(lPlaca);
			grupo1.add(lModelo);
			grupo1.add(vModelo);
			//*******************Termina grupo 1***************************
			
			//************Comienza grupo 2, datos de ultima verificacion
			var grupo2 = Ti.UI.createView({
			    top:140,
			    //left:180,
			  //borderWidth: 1,
			  //borderColor: 'white',
			    width:'auto',
			    height:30
			}); 
			
			var lUltimaVer = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:12,fontWeight:'normal', fontFamily:ff},
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},				
				top:0,
				width:'240',
				height:14,
				//borderWidth: 1,
				//borderColor: 'black',
				textAlign: 'center',
				text:'ÚLTIMA VERIFICACIÓN'
				
			});
			
			var vUltimaVer = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:14,fontWeight:'normal', fontFamily:ff},
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},				
				top:14,
				width:'240',
				height:16,
				//borderWidth: 1,
				//borderColor: 'black',
				textAlign: 'center',
				text:vehiculo.ultimaVerificacion()
				
			});
			
			grupo2.add(lUltimaVer);
			grupo2.add(vUltimaVer);
			//******************** Termina grupo2
			
			//****************Comienza Grupo 3 Proxima verificacion 
			var grupo3 = Ti.UI.createView({
			    top:grupo2.top + grupo2.height + 40,
			    //left:180,
			  //borderWidth: 1,
			  //borderColor: 'white',
			    width:'auto',
			    height:36
			}); 
			
			var lProxVer = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:16,fontWeight:'normal', fontFamily:ff},
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},				
				top:0,
				width:'240',
				height:18,
				//borderWidth: 1,
				//borderColor: 'black',
				textAlign: 'center',
				text:'PRÓXIMA VERIFICACIÓN'
				
			});
			
			var vProxVer = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:18,fontWeight:'bold', fontFamily:ff},
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},
				//left:0,
				top:lProxVer.top + lProxVer.height + 2,
				width:'230',
				height:20,
				minimumFontSize:10,
				//borderWidth: 1,
				//borderColor: 'black',
				textAlign: 'center',
				text:vehiculo.proximaVerificacion().toUpperCase()
				
			});
			
			var vFaltan = Ti.UI.createLabel({
				color:fcolor,
				font:{fontSize:14,fontWeight:'bold', fontFamily:ff},
				minimumFontSize:9,
				//shadowColor: 'white',
				//shadowOffset: {x:1,y:1},				
				top:vProxVer.top + vProxVer.height + 2,
				width:'230',
				height:16,
				//borderWidth: 1,
				//borderColor: 'black',
				textAlign: 'center',
				text:vehiculo.diasFaltantes().toUpperCase()
				
			});
			
			grupo3.add(lProxVer);
			grupo3.add(vProxVer);
			grupo3.add(vFaltan);
			
			//**************************** FIN GRUPO 3

			
			var botonOK = Titanium.UI.createImageView({
				width:18,
				image:'../imgs/todo.png',
				height:19,
				bottom:0,
				right:0
			});
			botonOK.vehiculoId = vehiculo.id;
			botonOK.vehiculo = vehiculo;
			botonOK.addEventListener('click', function(e){
				var w = Ti.UI.createWindow({
					backgroundColor:'white'
				});
				var b = Ti.UI.createButton({
					title:'Vehículo Verificado',
					bottom:120,
					width:290,
					height:30
				});
				b.vehiculo = e.source.vehiculo;
				var c = Ti.UI.createButton({
					title:'Cancelar',
					bottom:40,
					width:290,
					height:30
				});
				b.addEventListener('click',function(e)
				{
					var cvehiculo = e.source.vehiculo;
					cvehiculo.anioUltimaVerificacion = new Date().getFullYear();
					cvehiculo.mesUltimaVerificacion = new Date().getMonth();
					cvehiculo.swn1 = true; cvehiculo.swn2 = true; cvehiculo.swn3 = true; cvehiculo.swn4 = true;
					cvehiculo.calculaRecordatorios();
					//Ti.API.info("LOS EV: "+cvehiculo.toString());
					cvehiculo.guardar();
					var svcp = scrollView.currentPage;
					scrollView.views=[];
					scrollView.views = creaRows();
					scrollView.scrollToView(svcp);
					//Se emite trigger de vehiculo guardado
					Ti.App.fireEvent('vehiculo.guardado');
					w.close();
				});

				c.addEventListener('click',function()
				{
					w.close();
				});
				w.add(c);
				w.add(b);
				w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,navBarHidden:true});

			});
			
			
			view.add(lAlias);
			view.add(grupo1);
			view.add(grupo2);
			view.add(grupo3);
			view.add(botonOK);
			//view.add(vProxVer);
			//view.add(vFaltan);
			
			data.push(view);
			rows.next();
		}
		return data;
	}

	
	//Se crea una vista scrollable
	var scrollView = Titanium.UI.createScrollableView({
		views:creaRows(),
		showPagingControl:true,
		clipViews:false,
		top:-10,
		//left:20,
		//right:20,
		height:360
	});
	
cover.add(scrollView);
win.add(cover);
win.open();
//}