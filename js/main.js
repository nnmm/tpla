// MVC pattern
var model = (function() {
	var my = {};
	my.getLives = function () {
		var lives = localStorage.getItem("lives");
		if (lives == undefined) {
			lives = 3;
			localStorage.setItem("lives", 3);
		};
		return lives;
	};

	my.subtractLife = function (lives) {
		console.log("model.substractLife");
		localStorage.setItem("lives", my.getLives()-1);
	};

	my.addLife = function (lives) {
		console.log("model.addLife");
		localStorage.setItem("lives", my.getLives()+1);
	};

	return my;
}());

// view
var view = (function() {
	var my = {};

	my.init = function() {
		$("#weiter").click(function(event) {
			$(".hidden").removeClass("hidden");
			$(".stepone").addClass("hidden");
		});

		$("#formel").click(function(event) {
			myModule.addEquation("P = E/Δt");
		});

		myModule.init();
		myModule.addObjects();

		$("#addlife").click(controller.addLife(event));
		$("#substractlife").click(controller.substractLife(event));
	}

	// evtl. Model als Argument
	my.showLives = function() {
		var lives = model.getLives();
		console.log("showLives: lives = " + lives);
		$("#lives").children().each(function (index) {
			if (lives >= index + 1) {
				$(this).removeClass().addClass("glyphicon glyphicon-heart");
			} else{
				$(this).removeClass().addClass("glyphicon glyphicon-heart-empty");
			};
		});
	};
	return my;
}());


// controller
var controller = (function() {
	var my = {};

	my.addLife = function(event) {
		console.log("controller.addLife");
		model.addLife();
		view.showLives();
	};

	my.subtractLife = function(event) {
		console.log("controller.substractLife");
		model.subtractLife();
		view.showLives();
	};
	return my;
}());


// main
$(document).ready(function(){
	view.init();
	// maybe put this in view and callbacks here?
/*	$("#mvctest").click(controller.mvctest(event));
	$("#pruefen").click(function(event) {
		var correct = true;
		$("#first :selected").each(function() {
			if ($(this).data("correct") == undefined) {
				correct = false;
			}
		});
		
		if (correct) {
			$("#result").removeClass().addClass("glyphicon glyphicon-ok");
		} else {
			$("#result").removeClass().addClass("glyphicon glyphicon-remove");
			$("#tmp").removeClass().addClass("glyphicon glyphicon-heart-empty");
		};*/
	
	// JS templating
	var template = $('#template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, jsonObject);
	$('#target').html(rendered);
});