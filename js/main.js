// MVC pattern
var model = (function() {
	'use strict';
	var my = {};

	my.init = function() {
		my.problemData = jsonObject;
		model.prepareData();
		// the user gets an extra life if no mistake is made
		model.extraLife = true;
		my.allownextSection = false;
		localStorage.setItem("section", 0);
	};


	my.prepareData = function() {
		my.section = [];
		my.section.push({
			// Größen finden
			"title": "Größen",
			"identifier": "groessen",
			"optionsGiven": my.problemData.given,
			"optionsUnknown": { "letter": my.problemData.solution.letter, "index": my.problemData.solution.index},
			verify: function() {},

		});
		my.section.push({
			// Basis- und Lösungsformel finden
			"title": "Basis- und Lösungsformel",
			"identifier": "formeln",
			verify: function() {},
		});
		my.section.push({
			// Einheiten vereinfachen
			"title": "Einheitenrechnung",
			"identifier": "einheiten",
			"options": my.problemData.units,
			"solution": "P = m⋅g⋅h/Δt",
			verify: function() {},
		});
		my.section.push({
			// Das Ergebnis errechnen
			"title": "Ergebnis",
			"identifier": "ergebnis",
			"solution": my.problemData.solution,
			verify: function() {},
		});
		my.section.push({
			// Den besten Antwortsatz finden
			"title": "Antwortsatz",
			"identifier": "antwortsatz",
			"options": my.problemData.alternative_solution_phrases,
			"solution": my.problemData.solution,
			verify: function() {},
		});

		my.data = my.problemData;


		// render the table contents and store them in model
		for (var i = 0; i < my.section.length; i++) {
			var tmplId = '#tmpl-table-' + my.section[i].identifier;
			var template = $(tmplId).html();
			my.section[i].tableContent = Mustache.render(Mustache.render(template, model.data), model.data);
		};

		// could be more elegant
		my.data.table = my.section;
	};

	my.updateTableData = function(index) {
		model.data.table = [];
		for (var i = 0; i < model.section.length; i++) {
			var content = model.section[i].tableContent;
			if (index <= i) {
				content = "";
			};
			model.data.table.push({
				"title": model.section[i].title,
				"tableContent": content
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
		model.extraLife = false;
	};

	my.addLife = function (lives) {
		localStorage.setItem("lives", my.getLives()+1);
	};

	my.getCurSection = function() {
		var section = parseInt(localStorage.getItem("section"));
		// if there is nothing stored, reset section to 0
		if (isNaN(section)) {
			section = 3;
			localStorage.setItem("section", 0);
		};
		return section;
	};

	my.nextSection = function() {
		localStorage.setItem("section", my.getCurSection()+1);
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
		//
		view.updateTable(0);
		view.updateCenterStage(0);
		model.nextSection();
	};

	my.registerListeners = function() {
		$("#pruefen").click(controller.pruefenWeiter);
	};

	my.updateTable = function(index) {
		console.log("updateTable " + index);
		if (index > model.section.length) {
			return;
		};

		// render table
		model.updateTableData(index);
		var template = $('#tmpl-table').html();
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, model.data);
		$("#table-container").html(rendered);
	};

	my.updateCenterStage = function(index) {
		console.log("updateCenterStage " + index);

		// render main view
		var tmplId = '#tmpl-' + model.section[index].identifier;
		var template = $(tmplId).html();
		var rendered = Mustache.render(Mustache.render(template, model.section[index]), model.section[index]);
		$('#center-stage').html(rendered);
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

	my.toggleWeiter = function() {
		if ($('#pruefen').html() == "Prüfen") {
			$('#pruefen').html("Weiter");
		} else {
			$('#pruefen').html("Prüfen");
		};
	}


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

 	my.pruefenWeiter = function(event) {
 		var index = model.getCurSection();
 		if (!model.allownextSection) {
 			// prüfen
 			var correct = true;
 			view.updateTable(index);

 			if (!correct) {
 				model.subtractLife();
 			};
 			model.allownextSection = true;
 		} else if (index < 5) {
 			view.updateCenterStage(index);
 			model.nextSection();
 			model.allownextSection = false;
 		} else {
 			console.log("Continue to next block");
 		};
		view.toggleWeiter();
	};

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
});