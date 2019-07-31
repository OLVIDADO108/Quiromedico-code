var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5d2e2904bfcb827ab0cc1ecd/1dh25lljl';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

if (location.href.split("/").slice(-1)=="agenda-tu-cita.php" || location.href.split("/").slice(-1)=="ver-agenda-citas.php" ){
	
var tipoCitasApiString = "";
var tipoCitasNum = "";
var fechaCita = "";
var horaiosID = "";
var nombre = "";
var telefono = "";
var email = "";
var comentarios = "";
var estatusEnvio = "";
var fechAgendaCita = "";
var nombreHTMLFinal="";
var urlREST = "//quiromedico.com/ApiQuiroMedico/";
var horariosstr
var tipoCitaString;
var lugar;

	
$('#pagina2').hide();
$('#pagina3').hide();
$('#pagina4').hide();
$('#VerAgendaCitas2').hide();
$('#VerAgendaCitas3').hide();
$('#agendaCitaBtn').hide();
obtenTipoCita(100, function () {

	$('#pagina2').hide();
	$('#pagina3').hide();
	$('#pagina4').hide();
	$('#pagina5').hide();
	$('#VerAgendaCitas2').hide();
	$('#VerAgendaCitas3').hide();
	$('#agendaCitaBtn').hide();
	tipoCitasApiString = JSON.parse(this.responseText);
	creaTipoCitas(tipoCitasApiString);
	$('#datepickerAgendaCitas').datepicker({ todayBtn: "linked", language: "es", autoclose: true, format: "yyyy-mm-dd", todayHighlight: true, calendarWeeks: true });
});
}
function obtenerFecha() {
	$('#my_hidden_input').val($('#datepicker').datepicker('getFormattedDate'));
	fechaCita = $('#my_hidden_input').val();
	obtenHorarioCitas(fechaCita, tipoCitasNum, function () {
		tipoCitasApiString = JSON.parse(this.responseText);
		creaTipohorarios(tipoCitasApiString);
	});
	$('#pagina2').hide();
	$('#pagina3').show();
}
function obtenAgendaCitas() {
	$('#my_hidden_inputAgendaCitas').val($('#datepickerAgendaCitas').datepicker('getFormattedDate'));
	fechAgendaCita = $('#my_hidden_inputAgendaCitas').val();
	obtenAgendaCitasApi(fechAgendaCita, function () {
		tipoCitasApiString = JSON.parse(this.responseText);
		creaAgendaCitas(tipoCitasApiString);
	});
	$('#VerAgendaCitas1').hide();
	$('#VerAgendaCitas2').show();
}
function escojeTipoCitas(strtipocitas,tipoCitasN,nombreHTML, diasCitasNo0, diasCitasNo1, diasCitasNo2, diasCitasNo3, diasCitasNo4, diasCitasNo5, diasCitasNo6) {
	tipoCitaString=strtipocitas;
	tipoCitasNum = tipoCitasN;
    nombreHTMLFinal=nombreHTML;
	var diasCitasNo = diasCitasNo0 + "," + diasCitasNo1 + "," + diasCitasNo2 + "," + diasCitasNo3 + "," + diasCitasNo4 + "," + diasCitasNo5 + "," + diasCitasNo6;
	$('#pagina1').hide();
	$('#datepicker').datepicker({ todayBtn: "linked", language: "es", autoclose: true, startDate: "-0d", format: "yyyy-mm-dd", todayHighlight: true, calendarWeeks: true, daysOfWeekDisabled: diasCitasNo });
	$('#pagina2').show();
}
function escojeHorarios(horarios,strhorario) {
	horaiosID = horarios;
	horariosstr=strhorario;
	$('#pagina3').hide();
	$('#pagina4').show();
}
function creaTipoCitas(varTipoCitas) {
	var obj = JSON.parse(varTipoCitas);
	for (var i = 0; i < obj.length; i++) {
		$("#divContainerTipoCitas").append('<div class="col-md-6"><button type="button" class="btn-agenda" onclick="escojeTipoCitas(\'' + obj[i].FCNOMBRETIPOCITA + '\',' + obj[i].FITIPOCITAID +' , '+  obj[i].FCNOMBREHTML + ' , ' + obj[i].FCDIASCITAS + ')">' + obj[i].FCNOMBRETIPOCITA + '</button></div>');
	}
}
function creaTipohorarios(varTipoHorarios) {
	var obj = JSON.parse(varTipoHorarios);
		if (obj.length==0){		
		$("#divContainerHorario").append('<p>&nbsp;</p>');
		$("#divContainerHorario").append('<h3 class="red aos-init aos-animate" data-aos-duration="900" data-aos="fade-left">no hay citas disponobles para esta fecha.</h3>');
		$("#divContainerHorario").append('<p>&nbsp;</p>');
		$("#divContainerHorario").append('<div><button onclick="location.reload();" type="button" class="btn-accent full" )">Regresar al registro de citas</button></div>');
	}
	for (var i = 0; i < obj.length; i++) {
		$("#divContainerHorario").append('<div><button type="button" class="btn-horarios" onclick="escojeHorarios(' + obj[i].FIHORARIOS + ',\'' + obj[i].FDHORARIO + '\')">' + obj[i].FDHORARIO + '</button></div>');
	}
}
function creaAgendaCitas(varTipoHorarios) {
	var citaConfirmacion = "";
	var tipoButton = "";
	var obj = JSON.parse(varTipoHorarios);
	$("#divContainerAgendaCitasbtn").append('<p>&nbsp;</p>');
	$("#divContainerAgendaCitasbtn").append('<p>&nbsp;</p>');
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].FIESTATUS === 1) {
			$("#divContainerAgendaCitasbtn").append(
				'<button type="button" class="btn btn-warning btn-lg" data-toggle="modal" data-target="#myModal' + i + '">' + obj[i].FCNOMBRETIPOCITA + ' a las:' + obj[i].FDHORARIO + '</button><br><br>'
			);
			citaConfirmacion = "Cita aun no Confirmada, llamar al paciente para confirmarla";
			tipoButton = '<button type="button" class="btn btn-success" onclick="actualizaCitas(' + obj[i].FICITAS + ', 2)" data-dismiss="modal">Confirmar Cita</button>';
		}
		if (obj[i].FIESTATUS === 2) {
			$("#divContainerAgendaCitasbtn").append(
				'<button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal' + i + '">' + obj[i].FCNOMBRETIPOCITA + ' a las:' + obj[i].FDHORARIO + '</button><br><br>'
			);
			citaConfirmacion = "Cita Confirmada";
			tipoButton = "";
		}
		$("#divContainerAgendaCitasmdl").append(
			'<div class="modal fade" id="myModal' + i + '" role="dialog" >' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<h4 class="modal-title">Información de la cita</h4>' +
			'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>Nombre del paciente: <strong>' + obj[i].FCNOMBRE + '</strong></p>' +
			'<p>Horario de la cita: <strong>' + obj[i].FDHORARIO + '.</strong></p>' +
			'<p>Fecha de la cita: <strong>' + obj[i].FDFECHACITA + '.</strong></p>' +
			'<p>Telefono del paciente: <strong>' + obj[i].FCTELEFONO + '.</strong></p>' +
			'<p>eMail del paciente: <strong>' + obj[i].FCCORRERO + '</strong></p>' +
			'<p>Comentarios del paciente: <strong>' + obj[i].FCCOMENTARIOS + '.</strong></p>' +
			'<p></p><strong>' + citaConfirmacion + '.</strong>' +
			'<button type="button" class="btn btn-danger"  onclick="actualizaCitas(' + obj[i].FICITAS + ', 0)" data-dismiss="modal">Cancelar Cita</button>' +
			tipoButton +
			'</div>' +
			'<div class="modal-footer">' +
			'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
		);
	}
}
function obtenTipoCita(userId, callback) {
	var usersUrl = urlREST + "/Api/QuiroMedic/ObtenerTipoCitas?id=";
	var params = userId;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + usersUrl + params + " failed"));

	xhttp.open("GET", usersUrl + params, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}
function obtenHorarioCitas(fechaCita, tipoCita, callback) {
	var usersUrl = urlREST + "/Api/QuiroMedic/ObtenerHorario?fechaCita=";
	var params = fechaCita;
	var param2 = "&tipoCita=";
	var param3 = tipoCita;
	var fullUrl = usersUrl + params + param2 + param3;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + fullUrl + " failed"));
	xhttp.open("GET", fullUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}
function enviaroCitas(fechaCita, tipoCita, nombre, telefono, correo, comnentarios, callback) {
	var usersUrl = urlREST + "/Api/QuiroMedic/AltaCita?fechaCita=";
	var params = fechaCita;
	var param2 = "&tipoCita=";
	var param3 = tipoCita;
	var param4 = "&nombre=";
	var param5 = nombre;
	var param6 = "&telefono=";
	var param7 = telefono;
	var param8 = "&correo=";
	var param9 = correo;
	var param10 = "&comnentarios=";
	var param11 = comnentarios;
	var fullUrl = usersUrl + params + param2 + param3 + param4 + param5 + param6 + param7 + param8 + param9 + param10 + param11;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + fullUrl + " failed"));
	xhttp.open("GET", fullUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}
function obtenAgendaCitasApi(fechaAgendaCitas, callback) {
	var usersUrl = urlREST + "/api/QuiroMedicInterno/AgendaCitas?fechaAgendaCitas=";
	var params = fechaAgendaCitas;
	var fullUrl = usersUrl + params;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + fullUrl + " failed"));

	xhttp.open("GET", fullUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}
function actualizaAgendaCitas(idCita, estatusCita, callback) {
	var usersUrl = urlREST + "/api/QuiroMedicInterno/actualizaAgendaCitas?idCita=";
	var params = idCita;
	var param2 = "&estatusCita=";
	var param3 = estatusCita;
	var fullUrl = usersUrl + params + param2 + param3;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + fullUrl + " failed"));
	xhttp.open("GET", fullUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}
function actualizaCitas(fidCita, estatusCita) {
	actualizaAgendaCitas(fidCita, estatusCita, function () {
		var x = JSON.parse(this.responseText);
		x(tipoCitasApiString);
	});
	$('#VerAgendaCitas2').hide();
	$('#VerAgendaCitas3').show();
}
$(document)
	.ready(function () {
		$('#pagina4')
			.bootstrapValidator({
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				submitHandler: function (validator, form) {
					nombre = $('#nombreReserva').val();
					email = $('#emailReserva').val();
					telefono = $('#telefonoReserva').val();
					comentarios = $('#comentariosReserva').val();
					
					enviaroCitas(fechaCita, horaiosID, nombre, telefono, email, comentarios, function () {
						estatusEnvio = JSON.parse(this.responseText);
					});
					enviarCorreoCita(fechaCita);
					$('#pagina4').hide();
					$('#pagina5').show();
				},
				fields: {
					nombreReserva: {
						validators: {
							notEmpty: {
								message: 'Introducir tu Nombre'
							}
						}
					},
					apellidoReserva: {
						validators: {
							notEmpty: {
								message: 'Introducir tu apellido'
							}
						}
					},
					emailReserva: {
						validators: {
							notEmpty: {
								message: '<b class="bg-danger">Introducir tu email</b>'
							},
							emailAddress: {
								message: '<b class="bg-danger">El email tiene un formato incorrecto</b>'
							}
						}
					},
					telefonoReserva: {
						validators: {
							notEmpty: {
								message: 'Introducir tu número telefónico'
							},
							regexp: {
								regexp: /^[0-9]+$/,
								message: 'El número telefónico sólo puede consistir de números'
							}
						}
					},
					condicionesReserva: {
						validators: {
							notEmpty: {
								message: 'Acepta los terminos y condiciones'
							}
						}
					}
				}
			});
	});
	
function popUp(myIDpopUp) {
	var popup = document.getElementById("myPopup" + myIDpopUp);
	popup.classList.toggle("show");
}

function enviarCorreoCita(fechaCita){
	var mensajeSujeto = "Registro de cita para "+tipoCitaString +" a las: " + horariosstr + " con fecha "+ fechaCita;   
	var mensajeCuerpo =  "Hola "+ nombre+ "! se registro para la alta de la cita para " +tipoCitaString +" a las: " + horariosstr + " con fecha "+ fechaCita +" de forma correcta, uno de nuestros terapeutas se contactara con usted para confirmar la cita";
	
    var emailS = email;
    var tipo = 0;    

	enviaCorreoApi("citas@quiromedico.com",emailS,mensajeSujeto,mensajeCuerpo,0, function () {
	estatusEnvio = JSON.parse(this.responseText)});

mensajeCuerpo= "Hola! favor de confirmar la cita para " +tipoCitaString +" a las: " + horariosstr + " con fecha: "+fechaCita+  " con "+nombre+" al telefono "+ telefono + " con los comenctario : " + comentarios;

	enviaCorreoApi("citas@quiromedico.com","citas@quiromedico.com",mensajeSujeto,mensajeCuerpo,0, function () {
	estatusEnvio = JSON.parse(this.responseText)});
		
	$('#agendaCitaBtn').show();
window.location.href=nombreHTMLFinal;
}

$(document)
	.ready(function () {
		$('#contacto')
			.bootstrapValidator({
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				submitHandler: function (validator, form) {
					nombre = $('#nombreContacto').val();
					email = $('#emailContacto').val();
					telefono = $('#telefonoContacto').val();
					comentarios = $('#mensajeContacto').val();
					lugar = $('#lugarContacto').val();
					
					
					enviaroCitas(fechaCita, horaiosID, nombre, telefono, email, comentarios, function () {
						estatusEnvio = JSON.parse(this.responseText);
					});
					enviarCorreoContacto();
				},
				fields: {
					nombreContacto: {
						validators: {
							notEmpty: {
								message: 'Introducir tu Nombre'
							}
						}
					},
					lugarContacto: {
						validators: {
							notEmpty: {
								message: 'Introducir tu apellido'
							}
						}
					},
					emailContacto: {
						validators: {
							notEmpty: {
								message: '<b class="bg-danger">Introducir tu email</b>'
							},
							emailAddress: {
								message: '<b class="bg-danger">El email tiene un formato incorrecto</b>'
							}
						}
					},
					telefonoContacto: {
						validators: {
							notEmpty: {
								message: 'Introducir tu número telefónico'
							},
							regexp: {
								regexp: /^[0-9]+$/,
								message: 'El número telefónico sólo puede consistir de números'
							}
						}
					},
					mensajeContacto: {
						validators: {
							notEmpty: {
								message: 'Introducir un mensaje'
							}
						}
					}
				}
			});
	});
	
function enviarCorreoContacto(){
	var mensajeSujeto = "QuiroMedico contacto";   
	var mensajeCuerpo =  "Hola "+ nombre+ "! se registro correctamente el formulario, en unos momentos uno de nuestros terapeutas se pondra en contacto con usted";
    var emailS = email;
 
	enviaCorreoApi("contacto@quiromedico.com",emailS,mensajeSujeto,mensajeCuerpo,0, function () {
	estatusEnvio = JSON.parse(this.responseText)});

mensajeCuerpo= "Hola! favor de llamar a "+nombre+" al telefono "+ telefono + " con los comenctario :" + comentarios;

	enviaCorreoApi("contacto@quiromedico.com","contacto@quiromedico.com",mensajeSujeto,mensajeCuerpo,0, function () {
	estatusEnvio = JSON.parse(this.responseText)});
		
window.location.href="confirmacion-Contacto.php";
	
}
$('#TestimoniosCar').carousel({wrap: true});

function enviaCorreoApi(from,to,subject,body,opc, callback) {
	var usersUrl = urlREST + "/Api/QuiroMedicCorreo/enviaCorreo?from=";
	var params = from;
	var param2 = "&to=";
	var param3 = to;
	var param4 = "&subject=";
	var param5 = subject;
	var param6 = "&body=";
	var param7 = body;
	var param8 = "&opc=";
	var param9 = opc;
	var fullUrl = usersUrl + params + param2 + param3+ param4+ param5+ param6+ param7+ param8+ param9;
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener('load', callback);
	xhttp.addEventListener('error', () => console.log("Request to " + fullUrl + " failed"));

	xhttp.open("GET", fullUrl, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

