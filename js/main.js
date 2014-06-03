// for debugging
var startAt = 0;

// MVC pattern
var model = (function() {
	'use strict';
	var my = {};

	my.init = function() {
		model.prepareData(0);
		// the user gets an extra life if no mistake is made
		model.extraLife = true;
		my.allownextSection = false;
		// debugging
		localStorage.setItem("section", startAt);
	};


	my.prepareData = function(index) {
		var verifyMultipleChoice = function() {
			var userSelection = view.getMultipleChoiceSelection();
			var correct = false;
			if (userSelection === this.solution) {
				correct = true;
			};
			view.showMultipleChoiceCorrection(correct);
			return correct;
		};
		console.log(d.subtasks);
		var sd = d.subtasks[index];

		// contains *all* the data required for one section
		my.section = [];
		my.section.push({
			// Größen finden
			"title": "Größen",
			"identifier": "groessen",
			"optionsGiven": sd.given,
			"solutionGiven": sd.given,
			"optionsUnknown": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			"solutionUnknown": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			verify: function() {
				var userInput = view.getDropdownSelection();
				var correction = [];

				// store if the input occurs in solution and vice versa
				var inputMatched = [];
				var numInputs = userInput.selectedGegeben.length;
				while(numInputs--) inputMatched.push("false");
				var solutionMatched = [];
				var numSolutions = this.solutionGiven.length;
				while(numSolutions--) solutionMatched.push("false");

				// ignore empty rows in input
				for (var i = 0; i < userInput.selectedGegeben.length; i++) {
					var curInput = userInput.selectedGegeben[i];
					var empty = true;
					for (var p in curInput) {
						if ("" !== curInput[p]) {
							empty = false;
						};
					};
					if (empty) {
						inputMatched[i] = "empty";
					};
				};

				// for all solutions
				for (var i = 0; i < this.solutionGiven.length; i++) {
					var curSolution = this.solutionGiven[i];
					// for all input rows
					for (var j = 0; j < userInput.selectedGegeben.length; j++) {
						var curInput = userInput.selectedGegeben[j];
 						var equal = true;
						for (var p in curSolution) {
							if (curSolution[p] == curInput[p]) {
								continue;
							} else {
								equal = false;
							};
						};
						if (equal) {
							solutionMatched[i] = "true";
							inputMatched[j] = "true";
						};
					};
				};

				// now all elements of inputMatched have to be true or empty
				var allInputs = true;
				for (var i = 0; i < inputMatched.length; i++) {
 					if (inputMatched[i] !== "true" && inputMatched[i] !== "empty") {
						allInputs = false;
					};
				};
				// and all elements of solutionMatched have to be true
				var allSolutions = true;
				for (var i = 0; i < solutionMatched.length; i++) {
					if (solutionMatched[i] !== "true") {
						allSolutions = false;
					};
				};

				// unknown
				var unknownCorrect = "false";
				var inputGesucht = userInput.selectedGesucht;
				if (inputGesucht.letter === this.solutionUnknown.letter && inputGesucht.index === this.solutionUnknown.index && inputGesucht.unit === this.solutionUnknown.unit) {
					unknownCorrect = "true";
				};
				view.showDropdownCorrection(inputMatched, allSolutions, unknownCorrect);
				return (allInputs && allSolutions && unknownCorrect);
			},

		});
		my.section.push({
			// Basis- und Lösungsformel finden – multiple choice
			"title": "Basis- und Lösungsformel",
			"identifier": "formeln",
			"solutionEquations": sd.equations,
			"solution": sd.solution.equation,
			"options": util.shuffle([].concat(sd.alternative_solution_equations, sd.solution.equation)),
			"verify": verifyMultipleChoice,
		});
		my.section.push({
			// Einheiten vereinfachen – multiple choice
			"title": "Einheitenrechnung",
			"identifier": "einheiten",
			"options": util.shuffle([].concat(sd.units.correct, sd.units.wrong)),
			"solution": sd.units.correct,
			"letter": sd.solution.letter,
			"unit": sd.solution.unit,
			"verify": verifyMultipleChoice,

		});
		my.section.push({
			// Das Ergebnis errechnen
			"title": "Ergebnis",
			"identifier": "ergebnis",
			"solution": sd.solution,
			"solutionVariations": function() {
				var options = [];
				options.push(sd.solution.value + " " + sd.solution.unit);
				options.push(sd.solution.value + " " + sd.solution.unit_long);
				return options;
			},
			verify: function() {
				var userInput = $('input').val();
				var correct = false;
				if (this.solutionVariations().indexOf(userInput) >= 0) {
					correct = true;
				};
				view.showInputCorrection(correct);
				return correct;
			},
		});
		my.section.push({
			// Den besten Antwortsatz finden – multiple choice
			"title": "Antwortsatz",
			"identifier": "antwortsatz",
			"solution": Mustache.render(sd.correct_solution_phrase, sd),
			"options": function() {
				var options = [];
				for (var i = 0; i < sd.alternative_solution_phrases.length; i++) {
					var tmpl = sd.alternative_solution_phrases[i];
					options.push(Mustache.render(tmpl, sd));
				};
				options.push(this.solution);
				return util.shuffle(options);
			},
			"verify": verifyMultipleChoice,

		});

		my.data = d;

		// render the table contents and store them in model
		for (var i = 0; i < my.section.length; i++) {
			var tmplId = '#tmpl-table-' + my.section[i].identifier;
			var template = $(tmplId).html();
			my.section[i].tableContent = Mustache.render(Mustache.render(template, model.section[i]), model.section[i]);
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
			section = 0;
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
		// for debugging
		view.updateTable(startAt);
		view.updateCenterStage(startAt);

		model.nextSection();

		renderProblem();
	};

	var renderProblem = function() {
		var template = $('#tmpl-problem').html();
		var rendered = Mustache.render(template, model.data);
		$("#problem-container").html(rendered);
	};

	my.registerListeners = function() {
		$("#pruefen").click(controller.pruefenWeiter);
	};

	my.updateTable = function(index) {
		// console.log("updateTable " + index);
		if (index > model.section.length) {
			return;
		};

		// render table
		model.updateTableData(index);
		var template = $('#tmpl-table').html();
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, model.data);
		$("#table-container").html(rendered);
		$("#table-container tbody tr").each(function(rowIndex) {
			if (rowIndex < index) {
				$(this).addClass('success');
			};
		});
	};

	my.updateCenterStage = function(index) {
		// console.log("updateCenterStage " + index);

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
		$("#lives span").each(function (index) {
			if (lives >= index + 1) {
				$(this).removeClass().addClass("glyphicon glyphicon-heart");
			} else{
				$(this).removeClass().addClass("glyphicon glyphicon-heart-empty");
			};
		});
	};

	my.toggleWeiter = function() {
		if ($('#pruefen').html() == "Prüfen") {
			$('#pruefen').html('Weiter <span class="glyphicon glyphicon-arrow-right"></span>');
		} else {
			$('#pruefen').html("Prüfen");
		};
	};

	my.getMultipleChoiceSelection = function() {
		return $("input:radio:checked").val();
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

	my.showDropdownCorrection = function(given, allSolutions, unknown) {
		$(".select-row-gegeben").each(function(index) {
			var $iconSpan = $(this).find("span")
			if (given[index] === "true") {
				$iconSpan.addClass("glyphicon glyphicon-ok green");
			} else if (given[index] === "false") {
				$iconSpan.addClass("glyphicon glyphicon-remove red");
			};
		});
		var $iconSpan = $(".select-row-gesucht").find("span");
			if (unknown === "true") {
				$iconSpan.addClass("glyphicon glyphicon-ok green");
			} else if (unknown === "false") {
				$iconSpan.addClass("glyphicon glyphicon-remove red");
			};
	};

	my.showMultipleChoiceCorrection = function(correct) {
		if (correct) {
			//$('input:radio:checked').parent().next('span').addClass("glyphicon glyphicon-ok green");
			$('input:radio:checked').parent().removeClass().addClass("btn btn-success active");
		} else {
			//$('input:radio:checked').parent().next('span').addClass("glyphicon glyphicon-remove red");
			$('input:radio:checked').parent().removeClass().addClass("btn btn-warning active");

		};
	};

	my.showInputCorrection = function(correct) {
		if (correct) {
			$('input').next('span').addClass('glyphicon glyphicon-ok');
			$('input').parent().addClass('has-success');
 		} else {
			$('input').next('span').addClass('glyphicon glyphicon-remove');
			$('input').parent().addClass('has-error');
 		};
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
 			var correct = model.section[index - 1].verify();
 			if (!correct) {
 				controller.subtractLife();
 			};
 			view.updateTable(index);
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


var util = (function() {
    var my = {};

    my.shuffle = function(array) {
		var counter = array.length, temp, index;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }

	    return array;
    };

    my.renderFraction = function(data) {
    	var fraction = data;
    	var splittext;
    	var result = '';
    	if (fraction.indexOf('=') >= 0){
    		var fractionwo;
    		splittext = fraction.split('=');
    		fractionwo = splittext[1].split('/');

    		if(fractionwo.length == 1){
    			result = result + '<div class ="fraction"><span class="operator">' + splittext[0] + ' = ' + fractionwo[0]+'</span></div>';
    		}
    		else{
    			result = result + '<div class ="fraction"><span class="operator">' + splittext[0] + ' = </span></div><div class="fraction"><span class="top">'+ fractionwo[0]+'</span><span class="bottom">'+fractionwo[1]+'</span></div>';
    		}    

    	} else {
    		if (fraction.indexOf('/')>=0){
    			splittext = fraction.split('/');
    			result = result + '<div class="fraction"><span class="top">'+splittext[0]+'</span><span class="bottom">'+splittext[1]+'</span></div>';
    		}
    		else {
    			result = result + '<div class="fraction"><span class="operator">'+fraction+'</span></div>';
    		}
    	}  
    	return result; 
    };

    return my;
}());