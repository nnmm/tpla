// MVC pattern
var model = (function() {
	'use strict';
	var my = {},
	step;

	my.init = function() {
		my.data = jsonObject;
		model.prepareData();
		step = 0;
	};

	my.getStep = function() {
		return step;
	};

	my.addStep = function() {
		step = step + 1;
	};

	my.prepareData = function() {
		// augment the loaded js object with additional items and shuffle
		my.data.givenAll = my.data.given;
		my.data.unknown = [
			{ "letter": my.data.solution.letter, "index": my.data.solution.index },
			{ "letter": "t", "index": "Uhr"},
			{ "letter": "E", "index": "1"}
		];

		var template = $('#tmpl-table-given').html();
		var groessen = Mustache.render(template, model.data);
		template = $('#tmpl-table-equations').html();
		var formeln = Mustache.render(template, model.data);
		template = $('#tmpl-table-solution').html();
		var loesung = Mustache.render(template, model.data);

		my.data.tableAll = [
			{"title": "Größen", "content": groessen},
			{"title": "Basis- und Lösungsformel", "content": formeln},
			{"title": "Einheitenrechnung", "content":  "[P] = (kg⋅m/s²⋅m)/s = N⋅m/s = W"},
			{"title": "Lösung", "content": "Lösungsformel: " + loesung},
			{"title": "Antwortsatz", "content": "Zeile 5"},
		];
		my.data.table = my.data.tableAll;
	};

	my.updateTableData = function(index) {
		model.data.table = [];
		for (var i = 0; i < model.data.tableAll.length; i++) {
			var content = model.data.tableAll[i].content;
			if (index <= i) {
				content = "";
			};
			model.data.table.push({
				"title": model.data.tableAll[i].title,
				"content": content
			});
		};
	};

	my.getLives = function () {
		// retrieve lives from localStorage
		var lives = parseInt(localStorage.getItem("lives"));
		// if there is nothing stored, reset lives to 3
		if (isNaN(lives)) {
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
		view.updateTable(0);
	};

	my.registerListeners = function() {

	};

	my.updateTable = function(index) {
		model.updateTableData(index);
		var template = $('#tmpl-table').html();
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, model.data);
		$("#table-container").html(rendered);

		switch(index) {
			case 0:
				var template = $('#tmpl-groessen').html();
				// TODO
				var selectRow = $('.select-row-gegeben').html();
				selectRow = '<div class="select-row-gegeben">' + selectRow + '</div>';
				for (var i = 1; i < 4; i++) {
					$('.select-row-gegeben:last').after(selectRow);
				};
				break;
			case 1:
				var template = $('#tmpl-formulae').html();
				break;
			case 2:
				var template = $('#tmpl-einheitenrechnung').html();
				break;
			case 3:
				// render twice because the solution phrases contain templates
				var template = Mustache.render($('#tmpl-antwortsatz').html(), model.data);
				break;
			case 4:
				var template = "";
				break;
		};
		var rendered = Mustache.render(template, model.data);
		$('#workingarea').html(rendered);
		switch(index) {
			case 0:
				var selectRow = $('.select-row-gegeben').html();
				selectRow = '<div class="select-row-gegeben">' + selectRow + '</div>';
				for (var i = 1; i < 4; i++) {
					$('.select-row-gegeben:last').after(selectRow);
				};
				break;
			case 1:
				$("select[name=basisformeln]").change(function() {
					var eqs = [];
				    $("select[name=basisformeln] option:selected").each(function() {
				    	eqs.push($(this).text());
				    });
				    eqCanvas.addEquations(eqs);
		 		});
				eqCanvas.init();
				eqCanvas.addGivenQuantities();
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
		};
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


	my.getDropdownSelection = function() {
		var selectedGegeben = [],
			selectedGesucht = {};
		$(".select-row-gegeben").each(function(index) {
			var selected = {};
			$(this).find("select").each(function() {
				selected[$(this).attr("name")] = $(this).val();
			});
			selectedGegeben.push(selected);
		});
		$(".select-row-gesucht select").each(function(index) {
			selectedGesucht[$(this).attr("name")] = $(this).val();
		});
		return {"selectedGegeben": selectedGegeben, "selectedGesucht": selectedGesucht};
	};

	return my;
}());


// controller
var controller = (function() {
	'use strict';
 	var my = {};

 	my.nextStep = function() {
 		model.addStep();
 		var index = model.getStep();
 		view.updateTable(index);
 	}

	my.addLife = function() {
		model.addLife();
		view.showLives();
	};

	my.subtractLife = function() {
		model.subtractLife();
		view.showLives();
	};

	my.verifySolution = function() {
		var selection = view.getDropdownSelection();
		// TODO
	};

	return my;
}());


// main
$(document).ready(function(){
	'use strict';

	model.init();
	view.init();




	$("#groessen").click(view.showStepOne);
	$("#formeln").click(view.showStepTwo);
	$("#einheitenrechnung").click(view.showStepThree);
	$("#loesung").click(view.showStepFour);
	$("#antwortsatz").click(function(event) {
		$('#target-4').html("P = 0.000096 W");

		var template = $('#tmpl-antwortsatz').html();
		Mustache.parse(template);   // optional, speeds up future uses
		// call twice so the {{solution.value}} gets substituted
		var rendered = Mustache.render(Mustache.render(template, model.data), model.data);
		$('#workingarea').html(rendered);
	});

	$("#pruefen").click(function(event) {
		controller.subtractLife();
		console.log(view.getDropdownSelection());
	});

	$("#weiter").click(controller.nextStep);


});