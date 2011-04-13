/**
 * Clase Vehiculo.
 * Se encarga de los atributos del vehiculo asi como implementar operaciones de calculo de tiempo restante y recordatorios.
 */

function Vehiculo(rows){

	//Var privadas
	var meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
	
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
	
	var meso =[];
	meso[0]=[];meso[1]=[];meso[2]=[];meso[3]=[];meso[4]=[];meso[5]=[];meso[6]=[];meso[7]=[];meso[8]=[];meso[9]=[];
	meso[0][0]={ini:5,fin:6};
	meso[0][1]={ini:11,fin:12};

	meso[1][0]={ini:4,fin:5};
	meso[1][1]={ini:10,fin:11};
	meso[2][0]={ini:4,fin:5};
	meso[2][1]={ini:10,fin:11};

	meso[3][0]={ini:3,fin:4};
	meso[3][1]={ini:9,fin:10};
	meso[4][0]={ini:3,fin:4};
	meso[4][1]={ini:9,fin:10};

	meso[5][0]={ini:1,fin:2};
	meso[5][1]={ini:7,fin:8};
	meso[6][0]={ini:3,fin:4};
	meso[6][1]={ini:9,fin:10};

	meso[7][0]={ini:2,fin:3};
	meso[7][1]={ini:8,fin:9};
	meso[8][0]={ini:2,fin:3};
	meso[8][1]={ini:8,fin:9};

	meso[9][0]={ini:5,fin:6};
	meso[9][1]={ini:11,fin:12};

	var mesUVAux=null;
	var anioUVAux = null;
	
	//Variables publicas
	this.id=0;
	this.alias='';
	this.placa='';
	this.terminacion='';
	this.engomado='';
	this.modelo='';
	this.anioUltimaVerificacion=0;
	this.mesUltimaVerificacion=0;
	this.pathFoto=null;
	this.n1=null;
	this.n2=null;
	this.n3=null;
	this.n4=null;
	this.swn1 = 1;
	this.swn2 = 1;
	this.swn3 = 1;
	this.swn4 = 1;
	this.semestre=0;
	
	if(rows != null){
		this.id = rows.fieldByName('id');
		this.alias = rows.fieldByName('alias');
		this.placa = rows.fieldByName('placa');
		this.modelo = rows.fieldByName('modelo');
		this.anioUltimaVerificacion = rows.fieldByName('auv');
		this.mesUltimaVerificacion = rows.fieldByName('muv');
		this.engomado = rows.fieldByName('engomado');
		this.terminacion = rows.fieldByName('terminacion');
		this.pathFoto = rows.fieldByName('path_foto');
		this.n1 = rows.fieldByName('n1');
		this.n2 = rows.fieldByName('n2');
		this.n3 = rows.fieldByName('n3');
		this.n4 = rows.fieldByName('n4');
		
		this.swn1 = rows.fieldByName('swn1');
		this.swn2 = rows.fieldByName('swn2');
		this.swn3 = rows.fieldByName('swn3');
		this.swn4 = rows.fieldByName('swn4');

		this.semestre = rows.fieldByName('semestre');
	}
		
		
	/**
	 * Metodo para resetar
	 */
	this.reset = function(){
		this.id=0;
		this.alias='';
		this.placa='';
		this.terminacion='';
		this.engomado='';
		this.modelo='';
		this.anioUltimaVerificacion=0;
		this.mesUltimaVerificacion=0;
		this.pathFoto='';
		this.n1=null;
		this.n2=null;
		this.n3=null;
		this.n4=null;
		this.swn1=1;
		this.swn2=1;
		this.swn3=1;
		this.swn4=1;

		this.semestre=0;
	};
	
	/**
	 * Metodo toString para debuguear
	 */
	this.toString = function(){
		var str = 'Alias:'+this.alias+' Placa:'+this.placa+' Mod:'+this.modelo+' term:'+this.terminacion+' goma:'+
		this.engomado+' AuV:'+this.anioUltimaVerificacion+' MuV:'+this.mesUltimaVerificacion +
		' path_foto: '+this.pathFoto+
		' N1:'+this.n1+ ' N2:'+this.n2+ ' N3:'+this.n3+ ' N4:'+this.n4+
		' SWN1:'+this.swn1+ ' SWN2:'+this.swn2+ ' SWN3:'+this.swn3+ ' SWN4:'+this.swn4+ ' Semestre:'+this.semestre; 
		
		return str;
	};
	
	/**
	 * Metodo para guardar los vehiculos en la bd
	 */
	this.guardar = function(){
		var db = Titanium.Database.open('BDVerificacionVehicular');
		//Si es nuevo insertamos
		if(this.id==0){
			this.id = new Date().getTime();
			var sql = 'INSERT INTO vehiculo (id, alias, placa, modelo, auv, muv, engomado, terminacion, path_foto, n1, n2, n3, n4, swn1, swn2, swn3, swn4, semestre ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
			db.execute(sql, 
					this.id, this.alias, this.placa, this.modelo, this.anioUltimaVerificacion, this.mesUltimaVerificacion, 
					this.engomado, this.terminacion, this.pathFoto,
					this.n1, this.n2, this.n3, this.n4, this.swn1, this.swn2, this.swn3, this.swn4, this.semestre
					);
			Ti.API.info("Guardando: "+this.toString());
			Ti.API.info("IdEnBase: "+db.lastInsertRowId);
			var res = db.lastInsertRowId;
			db.close();
			return res;
		}
		else
		{
			var sql = 'UPDATE vehiculo SET alias = ?, placa = ?, modelo = ?, auv=?, muv=?, engomado=?, terminacion=?, path_foto=?, n1=?, n2=?, n3=?, n4=?, swn1=?, swn2=?, swn3=?, swn4=?, semestre=? WHERE id = ?';
			db.execute(sql, 
					this.alias, this.placa, this.modelo, this.anioUltimaVerificacion, this.mesUltimaVerificacion, 
					this.engomado, this.terminacion, this.pathFoto, 
					this.n1,this.n2,this.n3,this.n4,this.swn1,this.swn2,this.swn3,this.swn4,this.semestre,
					this.id);
			var res = db.rowsAffected;
			db.close();
			Ti.API.info("Actualizando: "+this.toString());
			Ti.API.info("Registros afectados: "+res);
			return res;
		}
		
	};
	
	/**
	 * Funcion para borrar vehiculos
	 */
	this.borrar = function(id){
		var db = Titanium.Database.open('BDVerificacionVehicular');
		var sql = 'DELETE FROM vehiculo WHERE id = ?';
		db.execute(sql,id);
		var res = db.rowsAffected;
		Ti.API.info("Se borraron: "+db.rowsAffected);
		db.close();
		return res;
	};
	
	
	/**
	 * Valida que los datos requeridos para guardar esten completos y sean coherentes
	 */
	this.validar = function(){
		
		if(this.alias == null || this.alias == '')
		{
			return -1;
		}
		else if(this.placa == null || this.placa == '')
		{
			return -2;
		}
		else if(this.modelo == null || this.modelo == '')
		{
			return -3;
		}
		else if(this.anioUltimaVerificacion == 0)
		{
			return -5;
		}

		else if(this.validaPlaca(this.placa))
		{
			return -4;
		}
		else
		{
			return true;
		}
	};
	
	/**
	 * Valida el numero de placa
	 */
	this.validaPlaca = function(placa){
		var val = placa;
		if(val == null || val == '') return false;
		var redf = new RegExp(/^(\d{3})\w{3}$/);
		var mdf = redf.exec(val);
		var terminacion=null;
		var redom = new RegExp(/^([a-zA-Z]{3})(\d{4})$/);
		var medo = redom.exec(val);
		if(medo==null && mdf==null)
		{
			return true;
		}
		else
			return false;
	};
	
	/**
	 * Genera los recordatorios para cada configuracion seteada.
	 */
	this.calculaRecordatorios = function(){
		
		var pv = this.calculaProximaVerificacion();
		if(pv === false){ this.swn1=false; this.swn2=false; this.swn3=false; this.swn4= false;}return;
		var anioProxVer = pv.anio;
		var mesIni = pv.periodo.ini;
		var mesFin = pv.periodo.fin;
		
		//vemos si se requiere la primera notificacion
		if(this.swn1){
			var notification = Ti.App.iOS.scheduleLocalNotification({
				alertBody:"Recordatorio de verificación vehicular para su vehículo placas: "+this.placa+ " que verifica en los meses de "+meses[mesIni]+' y '+meses[mesFin],
				alertAction:"OK",
				sound:"pop.caf",
				date:new Date(new Date(anioProxVer,mesIni-1,1).getTime() + 32400000) //
				//date:new Date(new Date().getTime()+300000)
			});
			this.n1 = anioProxVer+'-'+mesIni+'-'+'01';
		}
		else{
			this.n1 = null;
		}
		//vemos si se requiere la segunda notificacion
		if(this.swn2){
			var notification = Ti.App.iOS.scheduleLocalNotification({
				alertBody:"Recordatorio de verificación vehicular para su vehículo placas: "+this.placa+ " que verifica en los meses de "+meses[mesIni]+' y '+meses[mesFin]+'. Le queda solamente un mes para verificar.',
				alertAction:"OK",
				sound:"pop.caf",
				date:new Date(new Date(anioProxVer,mesFin-1,1).getTime() + 32400000)
				//date:new Date(new Date().getTime()+600000)
			});
			this.n2 = anioProxVer+'-'+mesFin+'-'+'01';
		}
		else{
			this.n2 = null;
		}
		//vemos si se requiere la tercer notificacion
		if(this.swn3){
			var notification = Ti.App.iOS.scheduleLocalNotification({
				alertBody:"Recordatorio de verificación vehicular para su vehículo placas: "+this.placa+ " que verifica en los meses de "+meses[mesIni]+' y '+meses[mesFin]+'. Le queda menos de dos semanas para verificar.',
				alertAction:"OK",
				sound:"pop.caf",
				//date:new Date(new Date().getTime() + 900000)//
				date:new Date(new Date(anioProxVer,mesFin-1,15).getTime() + 32400000)
			});
			this.n3 = anioProxVer+'-'+mesFin+'-'+'15';
		}
		else{
			this.n3 = null;
		}
		
		//vemos si se requiere la cuarta notificacion
		if(this.swn4){
			var notification = Ti.App.iOS.scheduleLocalNotification({
				alertBody:"Recordatorio de verificación vehicular para su vehículo placas: "+this.placa+ " que verifica en los meses de "+meses[mesIni]+' y '+meses[mesFin]+'. Le queda menos de una semana para verificar.',
				alertAction:"OK",
				sound:"pop.caf",
				date:new Date(new Date(anioProxVer,mesFin-1,23).getTime() + 32400000)
				//date:new Date(new Date().getTime()+120000)
			});
			this.n4 = anioProxVer+'-'+mesFin+'-'+'23';
		}
		else{
			this.n4 = null;
		}		
		
	};
	
	/**
	 * Despliega el label de ultima verificacion
	 */
	this.ultimaVerificacion = function(){
		Ti.API.info('MesID:'+this.mesUltimaVerificacion);
		var muv = ((this.mesUltimaVerificacion -1) >= 0)? this.mesUltimaVerificacion : 0;
		return meses[muv].toUpperCase() + ' '+this.anioUltimaVerificacion;
	};
	
	/**
	 * Despliega label de proxima verificacion
	 */
	this.proximaVerificacion = function(){
		
		var pv = this.calculaProximaVerificacion();
		if(pv === false) return 'PERIODO VENCIDO';
		var anioProxVer = pv.anio;
		var periodoProxVer = meses[pv.periodo.ini -1] + ' - '+meses[pv.periodo.fin -1];
		
		return periodoProxVer + ' de '+anioProxVer;
	};
	
	/**
	 * Calcula los dias faltantes para que termine el prox periodo de verificacion
	 */
	this.diasFaltantes = function(){
		
		var pv = this.calculaProximaVerificacion();
		if(pv === false) return " ";
		var hoy = new Date();
		var fin = new Date(pv.anio,pv.periodo.fin,0);
		var inicio = new Date(pv.anio,pv.periodo.ini-1,1);
		
		Ti.API.info('Fin:'+fin);
		
		var _sec = 1000;
		var _min = _sec * 60;
		var _hr = _min * 60;
		var _dia = _hr * 24;
		
	    var now = new Date();
	    var diff = fin - hoy;
	    var diasfin = Math.floor(diff / _dia);		

	    var difi = inicio - hoy;
	    var diasini = Math.floor(difi / _dia);		
	    
	    Ti.API.info('Faltan:'+diasini);
	    Ti.API.info('Quedan:'+diasfin);
	    
	    var res;
	    //Todavia falta para que verifique.
	    if(diasini > 0){
	    	
	    	res = 'Faltan '+diasini+' días';
	    }
	    //Esta dentro del periodo
	    else if(diasini < 0 && diasfin > 0){
	    	
	    	res = 'Restan '+diasfin+' días para verificar';
	    }
	    //Ya se paso de su verificación
	    else if(diasfin < 0){
	    	
	    	'Expiró hace '+Math.abs(diasfin)+' días';
	    }
	    
		return res;
	};
	
	/**
	 * Regresa un objeto con el periodo de la proxima verificacion
	 */
	this.calculaProximaVerificacion = function(){
		
		var bimestre, anioProxVerificacion; 
		if(mesUVAux != null) 
		{
			bimestre = (mesUVAux < 5)? 0:1;
		}
		else
		{
			bimestre = (this.mesUltimaVerificacion < 5)? 0:1;
		}
		
		if(anioUVAux){
			
			anioProxVerificacion = anioUVAux;
		}
		else {
			
			anioProxVerificacion = Number(this.anioUltimaVerificacion);	
		}
			
		
		var periodoProxVer = {};
		var anioActual = new Date().getFullYear();
		Ti.API.info('Terminacion: '+this.terminacion);
		
		
		if(this.modelo == anioActual || this.modelo == anioActual +1 || this.modelo == anioActual -1){
			
			//Aplica para modelos nuevos verificación hasta por 3 periodos mas.
			
			anioProxVerificacion = anioProxVerificacion + 2;
			periodoProxVer = meso[this.terminacion][bimestre];
			Ti.API.info("Es auto nuevo, verifica hasta dentro de 3 periodos mas ini: "+periodoProxVer.ini+' fin '+periodoProxVer.fin+' '+anioProxVerificacion);
		}
		else if(this.modelo < anioActual -1){
			
			//Ya no es nuevo verifica al siguiente periodo
			//Revisamos cual es el ultimo periodo que verifico. Si es del segundo bimestre, entonces le aumentamos un año.
			periodoProxVerS1 = meso[this.terminacion][0];
			periodoProxVerS2 = meso[this.terminacion][1];
			
			if(this.mesUltimaVerificacion < periodoProxVerS1.ini-1 && this.anioUltimaVerificacion == anioActual){
				//El mes de verificacion es menor al periodo pero en el mismo año
				periodoProxVer = periodoProxVerS1;
				anioProxVerificacion = anioActual;
			}
			else if	(this.mesUltimaVerificacion >= periodoProxVerS1.ini-1 && this.mesUltimaVerificacion < periodoProxVerS2.ini-1 && this.anioUltimaVerificacion == anioActual){
				
				periodoProxVer = periodoProxVerS2;
				anioProxVerificacion = anioActual;
			}
			else if	(this.mesUltimaVerificacion >= periodoProxVerS1.ini-1 && this.mesUltimaVerificacion > periodoProxVerS2.ini-1 && this.anioUltimaVerificacion == anioActual){
				
				periodoProxVer = periodoProxVerS1;
				anioProxVerificacion = anioActual+1;
			}
			
			else
			if(bimestre == 1 && this.anioUltimaVerificacion != anioActual){
				periodoProxVer = periodoProxVerS1;
				anioProxVerificacion++;
				
			}
			else if(bimestre == 0 && this.anioUltimaVerificacion != anioActual){
				
				periodoProxVer = meso[this.terminacion][1];
			}
			
			Ti.API.info("Ya no es nuevo: "+periodoProxVer.ini+' fin '+periodoProxVer.fin+' '+anioProxVerificacion);
			
		}		
		//Revisa que sea coherente el proximo periodo de verificacion, de lo contrario recualcula con nuevos datos.
		var ultimoDia = new Date(anioProxVerificacion,periodoProxVer.fin,0);

		if(ultimoDia < new Date()){
			
			Ti.API.info("Prox Ver Incoherente: "+periodoProxVer.ini+' fin '+periodoProxVer.fin+' '+anioProxVerificacion);
			//anioUVAux = anioProxVerificacion;
			//mesUVAux = periodoProxVer.fin;
			//return this.calculaProximaVerificacion();
			return false;
		}
		else{
			mesUVAux = null;
			anioUVAux = null;
		}
			
		
		return {anio:anioProxVerificacion, periodo:periodoProxVer};
	};
}