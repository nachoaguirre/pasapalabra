// Basado en el código de https://github.com/marioterron/pasapalabra
$(document).ready(function(){
	
	
	var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
	var physicalScreenHeight = window.screen.height * window.devicePixelRatio;
	
	
	// SETUP
	var intentos        = 4;  // Cuantos intentos para jugar
	var refresh_termino = 10; // Duración pantalla final, antes de volver al inicio...
	var idle_tiempo     = 30;
	
	// TEXTOS DINAMICOS
	$(".turnos_quedan").text(intentos);
	$(".total_preguntas").text(intentos);
	
	// Variables iniciales....
	var correctas          = 0;
	var letras_usadas      = [];
	var letras_correctas   = [];
	var letras_incorrectas = [];
	var myTimer;
	var tocable            = true;
	
	
	
		
	$('body').bind('touchstart',function() {
    	clearInterval(myTimer);
    	console.log("reset idle");
	});

	$('body').bind('touchend', function() {
    	myTimer = setInterval(function() { 
        	console.log("IDLE...");
        	//alert("Inactivo durante "+ idle_tiempo + " segundos...");
        	location.href = "index.html";
		},idle_tiempo*1000);
	});
	

	//////////////////////////////
	// FUNCIONES
	//////////////////////////////
	
	// Array con todas las preguntas de una letra
	function filtarLetra(arr, value) {
		var preguntas = arr.filter(function(res){
			return res.letra == value;
		});
		return preguntas;
	}
	
	// Selecciona una pregunta de una letra. DEVUELVE OBJETO CON LA PREGUNTA Y OPCIONES
	function filtarLetraRandom(arr, value) {
		var preguntas = arr.filter(function(res){
			return res.letra == value;
		});
		var rand = preguntas[Math.floor(Math.random() * preguntas.length)];
		return rand;
	}
	//console.log(filtarLetraRandom(letras, "K"));
	
	
	// Reestablece las opciones de una pregunta.
	function resetOpciones() {
		tocable = true;
		$(".opcion_radio").removeClass("opcion_seleccionada  animated heartBeat");
		$(".letra_3").text("");
		$(".pregunta_3").text("");
		$(".opcion_1_texto").text("");
		$(".opcion_2_texto").text("");
		$(".opcion_3_texto").text("");
		$(".opcion").removeAttr("data-opcion-letra");
		$(".opcion").removeAttr("data-correcta");
	}
	
	
	// Logo devuelve al home...
	$("#logo").on("click", function(){
		location.href = "index.html";
	});
	

	//////////////////////////////
	// SCREEN 1
	// (intro)
	//////////////////////////////
	
	var video1 = document.getElementById("video1");
	if (typeof video1 !== "undefined") {
    	// setInterval allow me to monitor every 40 millisecond if the video is ending or not, if true we loop the video and play it again
		setInterval(function() {
	        if (video1.readyState != 0) {
	            if (video1.paused) {
    	            video1.currentTime = 0;
					video1.play();
            	}
        	}            
    	}, 40)
	}
	
	
	$(".boton_1").on("click", function(){ // screen_1 > screen_2
		var video2 = document.getElementById("video2");
		video2.oncanplaythrough = function() { video2.muted = true; video2.play(); }
		$("#screen_1").hide();
		$("#screen_2").show();
	});
	
	
	$(".boton_1_instrucciones").on("click", function(){ // screen_1 > screen_2
		var video1_instrucciones = document.getElementById("video1_instrucciones");
		video1_instrucciones.oncanplaythrough = function() { video1_instrucciones.muted = true; video1_instrucciones.play(); }
		$("#screen_1").hide();
		$("#screen_1_instrucciones").show();
	});
	
	$(".boton_1_instrucciones_comenzar").on("click", function(){ // screen_1 > screen_2
		var video2 = document.getElementById("video2");
		video2.oncanplaythrough = function() { video2.muted = true; video2.play(); }
		$("#screen_1_instrucciones").hide();
		$("#screen_2").show();
	});
	
	
	//////////////////////////////
	// SCREEN 2
	// (seleccionar letra)
	//////////////////////////////

	// Set de contenidos screen_3 (pregunta y opciones segun letra)
	function setLetra(letra) {		
		letras_usadas.push(letra);
		var elegida = filtarLetraRandom(letras, letra);		
		$(".letra_3").text(elegida.letra);
		$(".pregunta_3").text(elegida.pregunta);
		$(".opcion_1_texto").text(elegida.opcion1);
		$(".opcion_2_texto").text(elegida.opcion2);
		$(".opcion_3_texto").text(elegida.opcion3);
		$(".opcion").attr("data-opcion-letra", elegida.letra);
		$("[data-opcion='"+elegida.correcta+"']").attr("data-correcta", "true");
	}
	

	
	// pincho una letra del rosco...
	$(".letra").on("click", function(){ 
		resetOpciones();
		var letra = $(this).text();
		if(letras_usadas.includes(letra) == false) { // No se ha usado la letra aún...
			setLetra(letra);
			intentos--;
			if(intentos < 2) {
				$(".turnos_plural").text("TURNO");
			}
			$("#screen_2").hide();
			var video3 = document.getElementById("video3");
			video3.oncanplaythrough = function() { video3.muted = true; video3.play(); }
			$("#screen_3").show();
		} else {
			alert("Esta letra ya ha sido seleccionada. Pincha otra letra");
		}
	});
	
	
	
	
	
	//////////////////////////////
	// SCREEN 3
	// (responder pregunta)
	//////////////////////////////
	
	
	// PINCHO OPCION A) B) C)
	$(".opcion").on("click", function() {
		
		if(tocable == true) {
			tocable = false;
			$(".turnos_quedan").text(intentos);
		
			var respuesta = $(this).attr("data-correcta");
			var letra     = $(this).attr("data-opcion-letra");
			//console.log("respuesta", respuesta, "letra", letra);
			
			$(".opcion_radio", this).addClass("opcion_seleccionada animated heartBeat");
					
			
			if(respuesta == "true") {
				//console.log("respuesta correcta");
				letras_correctas.push(letra);			
				$("[data-letra='"+letra+"']").addClass("letra_correcta");
				if(intentos == 0) {
					$(".boton_4").hide();
					$(".boton_4_terminar").show();
					$(".result_aciertos").text(letras_correctas.lenght);
				}
				$("#screen_3").delay(1000).fadeOut().delay(2000);
				$("#screen_4").delay(1000).show(0);
				var video4 = document.getElementById("video4");
				video4.oncanplaythrough = function() { video4.muted = true; video4.play(); }
				
			} else {
				//console.log("respuesta incorrecta");
				letras_incorrectas.push(letra);
				$("[data-letra='"+letra+"']").addClass("letra_incorrecta");
				if(intentos == 0) {
					$(".boton_5").hide();
					$(".boton_5_terminar").show();
				}
				$("#screen_3").delay(1000).fadeOut().delay(2000);
				$("#screen_5").delay(1000).show(0);
				var video5 = document.getElementById("video5");
				video5.oncanplaythrough = function() { video5.muted = true; video5.play(); }
			}
		}
		
		
		
	});
	
	
	
	
	//////////////////////////////
	// SCREEN 4
	// (respuesta correcta)
	//////////////////////////////
	
	$(".boton_4").on("click", function(){ // screen_4 > screen_2
		$("#screen_4").hide();		
		$("#screen_2").show();
	});
	
	$(".boton_4_terminar").on("click", function(){ // screen_5 > screen_6/7
		$("#screen_4").hide();		
		$(".result_aciertos").text(letras_correctas.length);
		if(letras_correctas.length >= 3) {
			$("#screen_6").show();
		} else {
			if(letras_correctas.length == 1) {
				$(".plural").text("ACIERTO");
			}
			$("#screen_7").show();
		}
		setTimeout("location.href = 'index.html'",refresh_termino*1000);
		
	});
	
	
	
	//////////////////////////////
	// SCREEN 5
	// (respuesta incorrecta)
	//////////////////////////////
	
	$(".boton_5").on("click", function(){ // screen_5 > screen_2
		$("#screen_5").hide();		
		$("#screen_2").show();
	});
	
	$(".boton_5_terminar").on("click", function(){ // screen_5 > screen_6/7
		$("#screen_5").hide();	
		$(".result_aciertos").text(letras_correctas.length);	
		if(letras_correctas.length >= 3) {
			var video6 = document.getElementById("video6");
			video6.oncanplaythrough = function() { video6.muted = true; video6.play(); }
			$("#screen_6").show();
		} else {
			if(letras_correctas.length == 1) {
				$(".plural").text("ACIERTO");
			}
			$("#screen_7").show();
		}
		setTimeout("location.href = 'index.html'",refresh_termino*1000);
	});
	
	

});



