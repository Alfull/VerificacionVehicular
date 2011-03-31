/**
 * Clase Vehiculo
 */

function Vehiculo(rows){

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
		this.semestre = rows.fieldByName('semestre');
	}
		
		
	//Metodo para resetar
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
		this.semestre=0;
	};
	
	//Metodo toString para debuguear
	this.toString = function(){
		var str = 'Alias:'+this.alias+' Placa:'+this.placa+' Mod:'+this.modelo+' term:'+this.terminacion+' goma:'+
		this.engomado+' AuV:'+this.anioUltimaVerificacion+' MuV:'+this.mesUltimaVerificacion +
		+' path_foto: '+this.pathFoto+
		' N1:'+this.n1+ ' N2:'+this.n2+ ' N3:'+this.n3+ ' N4:'+this.n4+ ' Semestre:'+this.semestre; 
		
		return str;
	};
	//Metodo para guardar los vehiculos en la bd
	this.guardar = function(){
		var db = Titanium.Database.open('BDVerificacionVehicular');
		//Si es nuevo insertamos
		if(this.id==0){
			this.id = new Date().getTime();
			var sql = 'INSERT INTO vehiculo (id, alias, placa, modelo, auv, muv, engomado, terminacion, path_foto, n1, n2, n3, n4, semestre ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
			db.execute(sql, 
					this.id, this.alias, this.placa, this.modelo, this.anioUltimaVerificacion, this.mesUltimaVerificacion, 
					this.engomado, this.terminacion, this.pathFoto,
					this.n1, this.n2, this.n3, this.n4, this.semestre
					);
			Ti.API.info("Guardando: "+this.toString());
			Ti.API.info("IdEnBase: "+db.lastInsertRowId);
			var res = db.lastInsertRowId;
			db.close();
			return res;
		}
		else
		{
			var sql = 'UPDATE vehiculo SET alias = ?, placa = ?, modelo = ?, auv=?, muv=?, engomado=?, terminacion=?, path_foto=?, n1=?, n2=?, n3=?, n4=?, semestre=? WHERE id = ?';
			db.execute(sql, 
					this.alias, this.placa, this.modelo, this.anioUltimaVerificacion, this.mesUltimaVerificacion, 
					this.engomado, this.terminacion, this.pathFoto, 
					this.n1,this.n2,this.n3,this.n4,this.semestre,
					this.id);
			var res = db.rowsAffected;
			db.close();
			Ti.API.info("Actualizando: "+this.toString());
			Ti.API.info("Registros afectados: "+res);
			return res;
		}
		
	};
	
	//Funcion para borrar vehiculos
	this.borrar = function(id){
		var db = Titanium.Database.open('BDVerificacionVehicular');
		var sql = 'DELETE FROM vehiculo WHERE id = ?';
		db.execute(sql,id);
		var res = db.rowsAffected;
		Ti.API.info("Se borraron: "+db.rowsAffected);
		db.close();
		return res;
	};
	
	//Valida que los datos requeridos para guardar esten completos y sean coherentes
	//TODO: validar que sean coherentes.
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
		else if(this.validaPlaca(this.placa))
		{
			return -4;
		}
		else
		{
			return true;
		}
	};
	
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

}