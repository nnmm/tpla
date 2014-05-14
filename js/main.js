// MVC pattern
var model = (function() {
	'use strict';
	var my = {};

	my.init = function() {
		my.data = jsonObject;
		my.data.givenAll = my.data.given;
		my.data.unknown = {
			"letter": my.data.solution.letter,
        	"index": my.data.solution.index,
		}
	};

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
	'use strict';
	var my = {};

	my.init = function() {
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
		    eqCanvas.addEquations(eqs);
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
	'use strict';
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
	'use strict';

	model.init();
	view.init();

	$("#groessen").click(function(event) {
		var template = $('#tmpl-option-given').html();
		// Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, model.data);
		$('#workingarea').html(rendered);
	});

	$("#formeln").click(function(event) {
		var template = $('#tmpl-formulae').html();
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, model.data);
		$('#workingarea').html(rendered);
		eqCanvas.init();
		eqCanvas.addGivenQuantities();
	});

	$("#antwort").click(function(event) {
		var template = $('#tmpl-solution-phrases').html();
		Mustache.parse(template);   // optional, speeds up future uses
		// call twice so the {{solution.value}} gets substituted
		var rendered = Mustache.render(Mustache.render(template, model.data), model.data);
		$('#workingarea').html(rendered);
	});

	// JS templating
	var template = $('#tmpl-given').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, model.data);
	$('#target').html(rendered);
});

String.prototype.repeat = function(count) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 0) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result;
};