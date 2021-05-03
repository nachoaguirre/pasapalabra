/* 
	
	Basado en el código de https://github.com/marioterron/pasapalabra
	
	Configuración:

	Cada linea se compone de 7 elementos.
	1: El ID de la pregunta. No se debe repetir, y debe ser consecutivo.
	2: La letra a la que corresponde. En mayúscula y entre comillas.
	3: La pregunta. Debe estar entre comillas.
	4. Opción A. Debe estar entre comillas.
	5. Opción B. Debe estar entre comillas.
	6. Opción C. Debe estar entre comillas.
	7. Respuesta correcta. Puede ser 1, 2 o 3, relativo a opción A, B o C. Debe estar entre comillas.

*/

var letras = [
	new Letra(0, "A", "¿Cómo se le llama a juntar plata todos los meses y no gastarla?", "Ahorrar", "Asegurar", "Acumular", "1"),
	new Letra(1, "A", "Comprar participación en una empresa es una forma de invertir ¿cómo se le llama?", "Participación", "Acción", "Acreditación", "2"),
	new Letra(2, "A", "¿Cuál es el nombre del préstamo que te permite sacar dinero en efectivo de una tarjeta?", "Adelanto", "Avance", "Acción", "2"),
	new Letra(3, "A", "¿Producto que te permite juntar plata para mejorar tu pensión?", "Ahorro Previsional Voluntario", "Ahorro para la Jubilación", "Ahorro Controlado", "1"),
	
	new Letra(4, "B", "¿Empresa que presta, guarda y hace crecer tu plata?", "Banco", "Bienes Raíces", "Bolsa", "1"),
	new Letra(5, "B", "Si yo me compro un auto, una casa o un terreno ¿A estas propiedades se les llama?", "Bien", "Bonanza", "Bono", "1"),
	
	new Letra(6, "C", "¿Tipo de cuenta que te permite guardar, gastar y recibir plata?", "Cuenta Corriente", "Cuenta Regresiva", "Cuenta Sencilla", "1"),
	new Letra(7, "C", "¿Nombre del producto que te ofrece el Banco para que guardes tus ahorros?", "Cuenta de Ahorro", "Cuenta Corriente", "Clasificador de Ahorro", "1"),
	
	new Letra(8, "D", "¿Forma de invertir tu plata a plazo en una institución financiera?", "Depósito a Plazo", "Cuenta Corriente", "Tarjeta de Crédito", "1"),
	new Letra(9, "D", "¿Cuándo un seguro no cubre ciertos gastos generados por un siniestro se le llama?", "Deducible", "Diferencia", "Discutible", "1"),
	new Letra(10, "D", "¿Cómo se le llama al pago mensual de un Crédito Hipotecario?", "Dividendo", "Diferencia", "Depósito", "1"),
	
	new Letra(11, "E", "¿Nombre de la investigación legal que se debe hacer a una propiedad antes de comprarla?", "Escritura", "Estudio de Título", "Historial crediticio", "2"),
	new Letra(12, "E", "Si compro muchas cosas y luego no puedo pagar ¿A esto se le llama estar…?", "Endeudado", "Estresado", "Estancado", "1"),
	new Letra(13, "E", "¿Nombre del documento que establece las obligaciones y derechos de una persona sobre una vivienda o terreno?", "Estructura", "Escritura", "Estado de título", "2"),
	
	new Letra(14, "F", "¿Forma de invertir en donde muchas personas aportan a un fondo común?", "Fondos monetarios", "Fondos Mutuos", "Fideicomiso", "2"),
	
	new Letra(15, "G", "¿Gasto que debes pagar por usar algunos productos financieros?", "Gastos Bancarios", "Gastos de Mantención", "Gastos por Uso", "2"),
	new Letra(16, "G", "¿Valor que debes pagar por realizar trámites en la notaría?", "Gastos Notariales", "Gastos por trámites", "Gastos de gestión", "1"),
	
	new Letra(17, "H", "¿Bienes que una persona fallecida transfiere a otros?", "Homenaje", "Herencia", "Halago", "2"),
	new Letra(18, "H", "¿Compromiso que firma una persona con una institución financiera en caso de no pagar su Crédito Hipotecario?", "Hipoteca", "Hípica", "Homenaje", "1"),
	
	new Letra(19, "I", "¿Forma de hacer crecer tu plata que comienza con I?", "Inscripción", "Inversión", "Inclusión", "2"),
	new Letra(20, "I", "¿Monto extra que me cobran cuando me atraso en el pago de mi cuenta?", "Interés", "Insumo", "Impuesto", "1"),
	new Letra(21, "I", "¿Monto que debe pagar una persona o empresa al Estado para cubrir los gastos públicos?", "Impuesto", "Interés", "Insumo", "1"),
	
	new Letra(22, "J", "¿Cuándo una persona deja de trabajar se le dice?", "Jubilado", "Juntado", "Juez", "1"),
	
	new Letra(23, "K", "¿Nombre de la bolsa de Tokio?", "Kabato Cho", "Dow Jones", "Chaw Sagun", "1"),
	
	new Letra(24, "L", "¿Contrato de arriendo con opción de compra al cumplir algún plazo u otra condición?", "Leasing", "Listening", "Arrendamiento", "1"),
	new Letra(25, "L", "¿Tipo de crédito asociado a una Cuenta Corriente?", "Línea de Crédito", "Crédito Corriente", "Crédito Consumo", "1"),
	
	new Letra(26, "M", "¿Opción de pago que evita que caigas en mora?", "Pago Mínimo", "Pago Retrasado", "Pago Miserio ", "1"),
	new Letra(27, "M", "¿Si no pagas tu tarjeta o crédito caes en…?", "Mora", "Mantención", "Miseria", "1"),
	
	new Letra(28, "N", "Existen cuatro formas de completar una cheque: al portador, a la orden, cruzado y…", "Nominativo", "A plazo", "Sin vencimiento", "1"),
	
	new Letra(29, "O", "¿Acción de bajarle el precio a algún producto o servicio?", "Oferta", "Liquidación", "Finiquito", "1"),
	
	new Letra(30, "P", "¿Cómo se le dice al plan que organiza la plata que recibes y puedes gastar?", "Presupuesto", "Predicción", "Prestación", "1"),
	new Letra(31, "P", "¿Tiempo que debe transcurrir para que se cumpla una acción financiera?", "Predicción", "Plazo", "Cuota", "2"),
	new Letra(32, "P", "¿Nombre del contrato que se firma con un seguro?", "Póliza", "Prenda", "Presupuesto", "1"),
	new Letra(33, "P", "¿Bien que se deja en garantía para asegura el pago total de un crédito?", "Prenda", "Préstamo", "Póliza", "1"),
	new Letra(34, "P", "¿Plata que recibe un trabajador cuando deja de trabajar por edad, antigüedad o invalidez?", "Pensión", "Provisión", "Póliza", "1"),
			
	new Letra(35, "R", "¿Cómo se le dice a las ganancias de un negocio?", "Rentabilidad", "Realidad", "Relatividad", "1"),
	
	new Letra(36, "S", "¿Estoy asegurado cuando contrato un…?", "Socio", "Seguro", "Solícito", "2"),
	new Letra(37, "S", "¿Nombre del seguro que indemniza a los beneficiarios en caso que el asegurado fallezca?", "Seguro de Vida", "Seguro de Desgravamen", "Seguro de Pérdida", "1"),
	new Letra(38, "S", "¿Seguro que protege las cosas de tu casa y las necesidades de reparaciones domésticas?", "Seguro de Hogar", "Seguro de Vida", "Seguro de Desgravamen", "1"),
	new Letra(39, "S", "¿Seguro que te protege contra enfermedades o accidentes?", "Seguro de Salud", "Seguro de Vida", "Seguro de Desgravamen", "1"),
	new Letra(40, "S", "¿Seguro que te protege contra cualquier inconveniente que pueda ocurrir durante un viaje?", "Seguro de Viajes Internacionales", "Seguro de Salud", "Seguro de Auto", "1"),
	new Letra(41, "S", "¿Seguro que cubre la deuda de una persona en caso de que esta muera y no haya terminado de pagar su crédito?", "Seguro de Salud", "Seguro de Vida", "Seguro de Desgravamen", "3"),
	new Letra(42, "S", "¿Seguro que protege tu auto contra el robo, pérdida y daños?", "Seguro Motor", "Seguro Automotriz", "Seguro de Desgravamen", "2"),
	new Letra(43, "S", "¿Cuál es el nombre del único seguro obligatorio de auto?", "Seguro motor", "SOAP", "Seguro de desgravamen", "2"),
	new Letra(44, "S", "¿Seguro que protege tu casa en caso de pérdida y daños por incendio o sismos?", "Soap", "Seguro Fraude", "Seguro de Incendio y de Sismo", "3"),
	
	new Letra(45, "T", "¿Tarjeta que te permite gastar solo el saldo que tienes en ella?", "Tarjeta de Débito", "Tarjeta de Crédito", "Tarjeta de Cuenta", "1"),
	new Letra(46, "T", "¿Tarjeta que te presta plata pero que debes pagar?", "Tarjeta de Débito", "Tarjeta de Crédito", "Tarjeta de Cuenta", "2"),
	new Letra(47, "T", "¿Estudio que se le hace a una propiedad para saber cuánto cuesta?", "Tasación", "Traslación", "Tecnicación", "1"),
	
	new Letra(48, "U", "¿Término financiero para nombrar al peso, dólar, sol, real, entre otras monedas?", "Unidad monetaria", "Unidad de fomento", "Unidad de pago", "1"),
	
	new Letra(49, "V", "¿Cómo se le dice a la fecha en la que termina un contrato?", "Vencimiento", "Vejez", "Viático", "1"),
	new Letra(50, "V", "Para comprar algo yo debo pagar su…", "Valor", "Vencimiento", "V", "1"),
	
	new Letra(51, "W", "¿Cuál es el nombre de la bolsa neoyorquina?", "Wall Street", "Dow Jones", "Center County", "1"),
	
	new Letra(52, "X", "¿Cómo se le dice a los accidentes o situaciones que no son cubiertas por un seguro?", "Exclusiones", "Expansiones", "Extinciones", "1"),
	
	new Letra(53, "Y", "¿Cuál es el nombre de la moneda de Japón?", "Yen", "Yuan", "Yin", "1"),
	
	new Letra(54, "Z", "¿Lugar donde los productos llegan desde el extranjero y tienen ciertos beneficios de impuesto que los hacen más baratos?", "Zona Franca", "Zonal", "Zona intermedia", "1")
];


// NO EDITAR...
function Letra(id, letra, pregunta, opcion1, opcion2, opcion3, correcta) {
	this.letraId   = id;
	this.letra     = letra;
	this.pregunta  = pregunta;
	this.opcion1   = opcion1;
	this.opcion2   = opcion2;
	this.opcion3   = opcion3;
	this.correcta  = correcta;
}