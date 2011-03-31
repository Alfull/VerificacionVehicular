/**
 * Clase que crea los rows de la lista de vehiculos
 */

var AMARILLO = 'imgs/icono1.png';
var ROSA = 'imgs/icono2.png';
var VERDE = 'imgs/icono3.png';
var AZUL = 'imgs/icono4.png';
var ROJO = 'imgs/icono5.png';

var mesv =[];
mesv[0]=[];mesv[1]=[];mesv[2]=[];mesv[3]=[];mesv[4]=[];mesv[5]=[];mesv[6]=[];mesv[7]=[];mesv[8]=[];mesv[9]=[];
mesv[0][0]="Mayo - Junio";
mesv[0][1]="Noviembre - Diciembre";

mesv[1][0]="Abril - Mayo";
mesv[1][1]="Octubre - Noviembre";
mesv[2][0]="Abril - Mayo";
mesv[2][1]="Octubre - Noviembre";

mesv[3][0]="Marzo - Abril";
mesv[3][1]="Septiembre - Octubre";
mesv[4][0]="Marzo - Abril";
mesv[4][1]="Septiembre - Octubre";

mesv[5][0]="Enero - Febrero";
mesv[5][1]="Julio - Agosto";
mesv[6][0]="Marzo - Abril";
mesv[6][1]="Septiembre - Octubre";

mesv[7][0]="Febrero - Marzo";
mesv[7][1]="Agosto - Septiembre";
mesv[8][0]="Febrero - Marzo";
mesv[8][1]="Agosto - Septiembre";

mesv[9][0]="Mayo - Junio";
mesv[9][1]="Noviembre - Diciembre";

function RowsVehiculo()
{
	// create table view data object
	var db = Titanium.Database.open('BDVerificacionVehicular');
	var rows = db.execute('SELECT * FROM vehiculo');
	var c = 0;
	var data = [];
	var txAl='left';
	while(rows.isValidRow())
	{
		var vehiculo = new Vehiculo(rows);
		
		Ti.API.info("Leyendo de la base: "+vehiculo.toString() );
		if(rows.fieldByName('id') == null) continue;
		var row = Ti.UI.createTableViewRow({hasChild:true});
		row.height  =80;
		row.myid =vehiculo.id;
		
		//La foto
		var path_foto = (vehiculo.pathFoto=='' || vehiculo.pathFoto==null)?'../imgs/foto-default4.png': vehiculo.pathFoto;
		//var foto_path = '../imgs/foto-default.png';
		var vFoto = Ti.UI.createView({
			backgroundImage: path_foto,
			top:10,
			left:5,
			width:60,
			height:60,
			borderWidth: 1,
			borderColor: 'black',
			clickName:'photo'
		});
		row.add(vFoto);
		
		var lAlias = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10,

			top:2,
			height:16,
			textAlign: txAl,
			width:200,
			//borderWidth: 1,
			//borderColor: 'black',

			text: vehiculo.alias
		});
		lAlias.rowNum = c;
		row.add(lAlias);

		var vColor = Ti.UI.createView({
			backgroundImage: imagenEngomado(vehiculo.engomado),
			top:0,
			left:lAlias.left + lAlias.width +17,
			//right: 5,
			width:25,
			height:80,
//			borderWidth: 1,
//			borderColor: 'black',
			clickName:'color'
		});
		row.add(vColor);
		
		
		var lPlaca = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10,
			top:lAlias.height +1,
			height:12,
			width:'auto',
			text:'Placa'
		});
		lPlaca.rowNum = c;
		row.add(lPlaca);

		var vPlaca = Ti.UI.createLabel({
			color:'black',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10+ lPlaca.width +10,
			top:lAlias.height +1,
			height:12,
			width:'auto',
			text:vehiculo.placa
		});
		vPlaca.rowNum = c;
		row.add(vPlaca);

		var lModelo = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left: vPlaca.left + vPlaca.width +10,
			top:lAlias.height +1,
			height:12,
			width:'auto',
			text:'Modelo'
		});
		lModelo.rowNum = c;
		row.add(lModelo);

		var vModelo = Ti.UI.createLabel({
			color:'black',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left: lModelo.left + lModelo.width +10,
			top: lAlias.height +1,
			height:12,
			width:'auto',

			text:vehiculo.modelo
		});
		vModelo.rowNum = c;
		row.add(vModelo);

		//Tercer renglon
		var lProxVer = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10,
			top:vPlaca.height +vPlaca.top+ 1,
			width:200,
			height:12,
			textAlign: txAl,
			
			//borderWidth: 1,
			//borderColor: 'black',
			text:'Próxima Verificación'
		});
		lProxVer.rowNum = c;
		row.add(lProxVer);

		//Cuarto renglon
		var vProxVer = Ti.UI.createLabel({
			color:'black',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10,
			top:lProxVer.height + lProxVer.top +1,
			width:200,
			height:16,
			
			textAlign: txAl,
			text:mesesVerifica(vehiculo.terminacion, vehiculo.mesUltimaVerificacion, vehiculo.anioUltimaVerificacion)
			
		});
		vProxVer.rowNum = c;
		row.add(vProxVer);
		
		//Quinto renglon
		var lFaltan = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
			left: vFoto.left + vFoto.width + 10,
			top:vProxVer.height + vProxVer.top +1,
			width:200,
			height:14,
			
			textAlign: txAl,
			text: "Faltan "+ faltanDias(vehiculo.terminacion, vehiculo.mesUltimaVerificacion, vehiculo.anioUltimaVerificacion)+ " días"
			
		});
		lFaltan.rowNum = c;
		row.add(lFaltan);
		
		
		row.className='vehiculo_row';
		
		row.vehiculo = vehiculo;
		row.addEventListener('click',mostrarVehiculo);
		
		data.push(row);
		rows.next();
		c++;
		
	}

	db.close();
	return data;
}

/**
 * Determina el path de la imagen de color que corresponde a cierta terminacion
 * 1 y 2 = verde
 * 3 y 4 = rojo
 * 5 y 6 = amarillo
 * 7 y 8 = rosa
 * 9 y 0 = azul
 * @integer terminacion
 */
function imagenColor(terminacion){
	
	var path = '../';
	switch (terminacion) {
	case 1:
		path= path+VERDE;
		break;
	case 2:
		path= path+VERDE;
		break;
	case 3:
		path= path+ROJO;
		break;
	case 4:
		path= path+ROJO;
		break;
	case 5:
		path= path+AMARILLO;
		break;
	case 6:
		path= path+AMARILLO;
		break;
	case 7:
		path= path+ROSA;
		break;
	case 8:
		path= path+ROSA;
		break;
	case 9:
		path= path+AZUL;
		break;
	case 0:
		path= path+AZUL;
		break;

	default:
		break;
	}
	//Ti.API.info('Terminacion: '+terminacion + 'IMG: '+path);
	return path;
}

function imagenEngomado(engomado){
	return '../imgs/icono'+engomado+'.png';
}

/**
 * Funcion que determina los meses en que se debe verificar
 * @param terminacion
 * @param muv
 * @param auv
 * @returns string
 */
function mesesVerifica(terminacion,muv,auv){
	//TODO: Que se debe hacer cuando nunca se ha verificado?
	var bimestre = (muv < 7)? 0:1;
	Ti.API.info('Terminacion: '+terminacion);
	//TODO: se debe determinar el año en que se va a verificar.
	
	return mesv[terminacion][bimestre] + ' de '+auv;
	
}

function faltanDias(terminacion,muv,auv){
	//TODO: hacer función que determina el tiempo restante.
	return 234;
}

/**
 * Ejecuta la vista para mostrar los detalles del vehiculo
 * @param e
 */
function mostrarVehiculo(e){
	//var vehiculo = e.row.vehiculo;
	//Ti.API.info('Se quieren ver los detalles de: '+vehiculo);
}
