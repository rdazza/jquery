var API_BASE_URL = "http://localhost:8080/myapp/game";


$("#button_pagination").click(function(e){
	e.preventDefault();
	
	var url = API_BASE_URL + '/pagination?page=1';
	getgames(url);
});

function GameCollection(gameCollection){
	this.games = gameCollection;

	var instance = this;

	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.games, function(i, v) {
			var game = v;
			html = html.concat('<br>');
			html = html.concat('<strong> CreationDate: </strong>' + game.creationdate + '<br>');
			html = html.concat('<strong> Description: </strong>' + game.description + '<br>');
			html = html.concat('<strong> Id: </strong>'  + game.id + '<br>');
			html = html.concat('<strong> Url: </strong>' + game.url + '<br>');
			html = html.concat('<strong> UserList: </strong>' + game.userlist + '<br>');
			html = html.concat('<br>');
			
		
			
		});
		
		//html = html.concat(' <br> ');

        var prev = this.getLink('prev');
		console.log(prev);
		if (prev.length == 1) {
			html = html.concat(' <a onClick="getgames(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Anterior]</a> ');
			
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getgames(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Siguiente]</a> ');
		}
		

 		return html;	
	}
}

function getgames(url){

	$("#result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.games;
				var gameCollection = new GameCollection(response);
				var linkHeader = jqxhr.getResponseHeader('Link');
                gameCollection.buildLinks(linkHeader);
				var html = gameCollection.toHTML();
				$("#result").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});
}
$("#button_list").click(function(e) {
	e.preventDefault();
	getGames();
});


function getGames() {

	var url = API_BASE_URL + '/list';
	$("result").text('');

	$.ajax({
		
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		
	}).done(function(data, status, jqxhr) {
				var games = data.games;
				$.each(games, function(i, v) {
					var game = v;

					$('<br><strong> CreationDate: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
					$('<strong> Id: </strong> ' + game.id + '<br>').appendTo($('#result'));
					$('<strong> Url: </strong> ' + game.url + '<br>').appendTo($('#result'));
					$('<strong> UserList: </strong> ' + game.userlist + '<br>').appendTo($('#result'));
					
					
				});
			}).fail(function() {
		$("#result").text("No hay ficheros.");
	});
}

$("#button_get").click(function(e) {
	e.preventDefault();
	if($('#id').val() == ""){
		
		$('<div class="alert alert-info">Debes rellenar el campo id</div>').appendTo($("#result"));
	}
	else if (isNaN($('#id').val())){
        $(
								'<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en Id</div>')
								.appendTo($("#result"));
    }
	else{
		getGame($("#id").val());
	}
	
});

function getGame(id) {
	var url = API_BASE_URL + '/' + id;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				console.log (data);
				var game = data;
					$('<br><strong> CreationDate: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
					$('<strong> Id: </strong> ' + game.id + '<br>').appendTo($('#result'));
					$('<strong> Url: </strong> ' + game.url + '<br>').appendTo($('#result'));
					$('<strong> UserList: </strong> ' + game.userlist + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Error!</strong> File not found </div>').appendTo($("#result"));
	});

}

$("#button_delete").click(function(e) {
	e.preventDefault();
	if($('#id').val() == ""){
		
		$('<div class="alert alert-info">Debes rellenar el campo id</div>').appendTo($("#result"));
	}
	else if (isNaN($('#id').val())){
        $(
								'<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en Id</div>')
								.appendTo($("#result"));
    }
	else{
		deleteGame($("#id").val());
	}
	
});

function deleteGame(id) {


	var url = API_BASE_URL + '/' + id;
	console.log (url);
	$("#result").text('');

	$
			.ajax(
					{
						url : url,
						type : 'DELETE',
						crossDomain : true,
						dataType : 'json',
						statusCode: {
    		202: function() {$('<div class="alert alert-danger"> <strong>Ok!</strong> File deleted </div>').appendTo($("#result"));},
			404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));}
    	}
					})
			.done(
					function(data, status, jqxhr) {
						$(
								'<div class="alert alert-success"> <strong>Ok!</strong> Game deleted</div>')
								.appendTo($("#result"));
					})

}

$("#button_post").click(function(e){
	
	e.preventDefault();
	$("#result").text('');
	
	var Game ;
	if($('#id').val() == "" || $('#url').val()=="") {
		console.log ("hola");
		$('<div class="alert alert-info">Debes rellenar los campos Id y URL</div>').appendTo($("#result"));
	
	}
	else if($('#jugador1').val() == "" && $('#jugador2').val()=="" || $('#jugador3').val()=="" && $('#jugador4').val()=="") {
		console.log ("hola");
		$('<div class="alert alert-info">Debes rellenar los campos de Jugadores</div>').appendTo($("#result"));
	}
	else if (isNaN($('#id').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en Id</div>').appendTo($("#result"));
    }
	
    else{
		var jugadores = new Array(4);

			jugadores[0]= $('#jugador1').val();
			jugadores[1]= $('#jugador2').val();
			jugadores[2]= $('#jugador3').val();
			jugadores[3]= $('#jugador4').val();
		
	
		Game = {
			"creationdate" : $('#fecha').val(),
			"description" : $('#descripcion').val(),
			"id" : $('#id').val(),
			"url" : $('#url').val(),
			"userlist": jugadores,
					
		}
		console.log (Game);
		createGame(Game);
	}

});

function createGame(Game) {
	var url = API_BASE_URL;
	var data = JSON.stringify(Game);
	
	$("#result").text('');

	$.ajax({
		
        url : url,
		contentType: 'application/json',
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad Request </div>').appendTo($("#result"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Conflict </div>').appendTo($("#result"));}
    	}
		
	}).done(function(data, status, jqxhr) {
	console.log(data);
		$('<div class="alert alert-success"> <strong>Ok!</strong> Juego Creado</div>').appendTo($("#result"));	
        $("#creationdate").val("");
		$("#descripcion").val("");	
		$("#id").val("");
		$("#url").val("");
		$("#fecha").val("");			
		$("#jugador1").val("");
		$("#jugador2").val("");
		$("#jugador3").val("");	
		$("#jugador4").val("");		
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error!</strong> Crear Juego</div>').appendTo($("#result"));
	});

}

$("#button_put").click(function(e) {
	e.preventDefault();

    var editgame;
	if($('#id').val() == "" || $('#url').val()=="") {
		
		$('<div class="alert alert-info">Debes rellenar los campos Id y URL</div>').appendTo($("#result"));
	
	}
	else if($('#jugador1').val() == "" && $('#jugador2').val()=="" || $('#jugador3').val()=="" && $('#jugador4').val()=="") {
		
		$('<div class="alert alert-info">Debes rellenar los campos de Jugadores</div>').appendTo($("#result"));
	}
	else if (isNaN($('#id').val())){
        $(
								'<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en Id</div>')
								.appendTo($("#result"));
    }
	
    else{
	var idgame = $('#id').val();
	var jugador1= $('#jugador1').val();
	var jugador2= $('#jugador2').val();
	var jugador3= $('#jugador3').val();
	var jugador4= $('#jugador4').val();
	var jugadores = [jugador1, jugador2, jugador3, jugador4];
	
	 editgame = {
			"creationdate": $("#fecha").val(),
			"description": $("#descripcion").val(),
			"id": $("#id").val(),
			"url": $("#url").val(),
			"userlist": jugadores,
			
}

	updategame(editgame, idgame);
	}
});


function updategame(editgame, idgame) {
	var url = API_BASE_URL + '/' + idgame;
	
	var data = JSON.stringify(editgame);

	$("#result").text('');
	
	$.ajax({
		url : url,
		contentType: 'application/json',
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#result"));},
			400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad request </div>').appendTo($("#result"));}
    	}
	}).done(function(data, status, jqxhr) {
				var game = data;
					
					$('<br><strong> CreationDate: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
					$('<strong> Id: </strong> ' + game.id + '<br>').appendTo($('#result'));
					$('<strong> Url: </strong> ' + game.url + '<br>').appendTo($('#result'));
					$('<strong> UserList: </strong> ' + game.userlist + '<br>').appendTo($('#result'));
					$('</p>').appendTo($('#result'));
	
				console.log(data);
		$("#creationdate").val("");
		$("#descripcion").val("");	
		$("#id").val("");
		$("#url").val("");	
		$("#fecha").val("");
		$("#jugador1").val("");
		$("#jugador2").val("");
		$("#jugador3").val("");	
		$("#jugador4").val("");	
		$('<div class="alert alert-success"> <strong>Ok!</strong> Game Updated</div>').appendTo($("#result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error!</strong> El juego no ha podido crearse</div>').appendTo($("#result"));
	});

}

