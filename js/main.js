// MVC pattern
var model = (function() {
	var my = {};
	my.getLives = function () {
		var lives = parseInt(localStorage.getItem("lives"));
		if (lives == undefined) {
			lives = 3;
			localStorage.setItem("lives", 3);
		};
		return lives;
	};

	my.subtractLife = function (lives) {
		localStorage.setItem("lives", my.getLives()-1);
	};

	my.addLife = function (lives) {
		localStorage.setItem("lives", my.getLives()+1);
	};

	return my;
}());


// view
var view = (function() {
	var my = {};

	my.init = function() {
		myModule.init();
		myModule.addObjects();
		view.showLives();
		view.registerListeners();
	};

	my.registerListeners = function() {
		$("#weiter").click(function(event) {
			$(".hidden").removeClass("hidden");
			$(".stepone").addClass("hidden");
		});

		$("select[name=basisformeln]").change(function() {
			var eqs = [];
		    $("select[name=basisformeln] option:selected").each(function() {
		    	eqs.push($(this).text());
		    });
		    console.log("Hullo");

		    myModule.addEquations(eqs);
 		});
	};

	my.showLives = function() {
		var lives = model.getLives();
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
		model.addLife();
		view.showLives();
	};

	my.subtractLife = function(event) {
		model.subtractLife();
		view.showLives();
	};
	return my;
}());


// main
$(document).ready(function(){
	view.init();

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