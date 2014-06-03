// MVC pattern
// controller
var controller = (function() {
	'use strict';
 	var my = {};

 	var allownextSection = false;

	// is called only on pageload
 	my.init = function() {

 		model.initSubtask(0);
 		
 		// persistent data
 		localStorage.clear("lives");
 		var lives = model.getLives();
 		// TODO: initialize/load timer and subtask

 		view.showLives(lives);
 		view.renderProblem();
 		view.registerListeners();
		view.updateTable(0);
		view.updateCenterStage(0);
 	};

 	my.pruefenWeiter = function(event) {
 		var index = model.getCurSection();
 		if (!allownextSection) {
 			// prüfen
 			var userInput = view.getUserInput(model.section[index-1].type);
 			var correct = model.section[index - 1].verify(userInput);
 			if (!correct) {
 				controller.subtractLife();
 				view.showLives(model.getLives());
 			};
 			view.updateTable(index);
 		} else if (index < 5) {
 			view.updateCenterStage(index);
 			model.nextSection();
 		} else {
 			view.renderProblem();
 			model.initSubtask(0);
 			view.updateTable(0);
 			view.updateCenterStage(0);
 		};
 		allownextSection = !allownextSection;
		view.toggleWeiter(allownextSection);
	};

	my.addLife = function() {
		model.addLife();
		view.showLives();
	};

	my.subtractLife = function() {
		model.subtractLife();
		view.showLives();
	};

	return my;
}());




var model = (function() {
	'use strict';
	var my = {};

	// is called at the beginning of each subtask
	my.initSubtask  = function(index) {
		
		var sd = d.subtasks[index];

		// contains *all* the data required for one section
		my.section = [];
		my.section.push({
			// Größen finden
			"title": "Größen",
			"identifier": "groessen",
			"type": "dropdown",
			"optionsGiven": sd.given,
			"solutionGiven": sd.given,
			"optionsUnknown": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			"solutionUnknown": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			"verify": verifyDropdownSelection,
			"onRender": function() {
				// oh no view code in model!
				var selectRow = $('.select-row-gegeben').html();
				selectRow = '<div class="select-row-gegeben">' + selectRow + '</div>';
				for (var i = 1; i < 4; i++) {
					$('.select-row-gegeben:last').after(selectRow);
				};
			}
		});

		my.section.push({
			// Basis- und Lösungsformel finden – multiple choice
			"title": "Basis- und Lösungsformel",
			"identifier": "formeln",
			"type": "multipleChoice",
			"width": "900px",
			"height": "400px",
			"optionsEquations": sd.equations,
			"solutionEquations": sd.equations,
			"solution": sd.solution.equation,
			"options": function() {
				var opts = [];
				var values = util.shuffle([].concat(sd.alternative_solution_equations, sd.solution.equation));
				for (var i = 0; i < values.length; i++) {
					opts.push({
						"val": values[i],
						"text": util.renderFraction(values[i]),
					});
				};
				return opts;
			},
			"verify": verifyMultipleChoice,
			"onRender": function() {
				$("select[name=basisformeln]").change(function() {
					var eqs = [];
				    $("select[name=basisformeln] option:selected").each(function() {
				    	eqs.push($(this).text());
				    });
				    eqCanvas.addEquations(eqs);
		 		});
				eqCanvas.init();
				eqCanvas.addGivenQuantities();
			}
		});

		my.section.push({
			// Einheiten vereinfachen – multiple choice
			"title": "Einheitenrechnung",
			"identifier": "einheiten",
			"type": "multipleChoice",
			"options": function() {
				var opts = [];
				var values = util.shuffle([].concat(sd.units.correct, sd.units.wrong));
				for (var i = 0; i < values.length; i++) {
					opts.push({
						"val": values[i],
						"text": util.renderFraction(values[i]),
					});
				};
				return opts;
			},
			"solution": sd.units.correct,
			"letter": sd.solution.letter,
			"unit": sd.solution.unit,
			"verify": verifyMultipleChoice,
		});

		my.section.push({
			// Das Ergebnis errechnen
			"title": "Ergebnis",
			"identifier": "ergebnis",
			"type": "textInput",
			"solution": sd.solution,
			"solutionVariations": function() {
				var options = [];
				options.push(sd.solution.value + " " + sd.solution.unit);
				options.push(sd.solution.value + " " + sd.solution.unit_long);
				return options;
			},
			verify: verifyTextInput,
		});

		my.section.push({
			// Den besten Antwortsatz finden – multiple choice
			"title": "Antwortsatz",
			"identifier": "antwortsatz",
			"type": "multipleChoice",
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

		// render the table contents and store them in model.section
		for (var i = 0; i < my.section.length; i++) {
			var tmplId = '#tmpl-table-' + my.section[i].identifier;
			var template = $(tmplId).html();
			my.section[i].tableContent = Mustache.render(Mustache.render(template, model.section[i]), model.section[i]);
		};

		// also store the result
		for (var i = 0; i < my.section.length; i++) {
			my.section[i].correct = "";
		};

		// could be more elegant
		my.data.table = my.section;
		my.curSection = 1;

		// the user gets an extra life if no mistake is made
		my.extraLife = true;
	};

	my.getCurSection = function() {
		return my.curSection;
	};

	my.nextSection = function() {
		my.curSection = my.curSection + 1;
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
		localStorage.setItem("lives", Math.max(my.getLives()-1, 0));
		model.extraLife = false;
	};

	my.addLife = function (lives) {
		localStorage.setItem("lives", my.getLives()+1);
	};

	var verifyDropdownSelection = function(userInput) {
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
		this.correct = allInputs && allSolutions && unknownCorrect;
		return this.correct;
	};

	var verifyMultipleChoice = function(userInput) {
		var correct = false;
		if (userInput === this.solution) {
			correct = true;
		};
		view.showMultipleChoiceCorrection(correct);
		this.correct = correct;
		return correct;
	};

	var verifyTextInput = function(userInput) {
		var correct = false;
		if (this.solutionVariations().indexOf(userInput) >= 0) {
			correct = true;
		};
		view.showInputCorrection(correct);
		this.correct = correct;
		return correct;
	};

	return my;
}());


// view
var view = (function() {
	'use strict';
	var my = {};

	my.renderProblem = function() {
		var template = $('#tmpl-problem').html();
		var rendered = Mustache.render(template, model.data);
		$("#problem-container").html(rendered);
	};

	my.registerListeners = function() {
		$("#pruefen").click(controller.pruefenWeiter);
	};

	my.updateTable = function(index) {
		if (index > model.section.length) {
			return;
		};

		// only render part of the table
		var table = [];
		for (var i = 0; i < model.section.length; i++) {
			var content = model.section[i].tableContent;
			if (index <= i) {
				content = "";
			};
			table.push({
				"title": model.section[i].title,
				"tableContent": content
			});
		};

		// render table
		var template = $('#tmpl-table').html();
		Mustache.parse(template);   // optional, speeds up future uses
		var rendered = Mustache.render(template, {"table": table});
		$("#table-container").html(rendered);
		$("#table-container tbody tr").each(function(rowIndex) {
			if (rowIndex < index) {
				if (model.section[rowIndex].correct) {
					$(this).addClass('success');
				} else{
					$(this).addClass('danger');
				};
			};
		});
	};

	my.updateCenterStage = function(index) {

		// render main view
		var tmplId = '#tmpl-' + model.section[index].identifier;
		var template = $(tmplId).html();
		var rendered = Mustache.render(Mustache.render(template, model.section[index]), model.section[index]);
		$('#center-stage').html(rendered);

		// ugly
		if (typeof model.section[index].onRender !== 'undefined') {
			model.section[index].onRender();
		};
	};

	my.showLives = function(lives) {
		$("#lives span").each(function (index) {
			if (lives >= index + 1) {
				$(this).removeClass().addClass("glyphicon glyphicon-heart");
			} else{
				$(this).removeClass().addClass("glyphicon glyphicon-heart-empty");
			};
		});
	};

	my.toggleWeiter = function(toggle) {
		if (toggle) {
			$('#pruefen').html('Weiter <span class="glyphicon glyphicon-arrow-right"></span>');
		} else {
			$('#pruefen').html("Prüfen");
		};
	};

	my.getUserInput = function(type) {
		switch(type) {
			case "dropdown":
				return getDropdownSelection();
				break;
			case "multipleChoice":
				return getMultipleChoiceSelection();
				break;
			case "textInput":
				return getTextInputSelection();
				break;
			default:
				console.log("Error in getUserInput");
		};
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

	var getDropdownSelection = function() {
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

	var getMultipleChoiceSelection = function() {
		return $("input:radio:checked").val();
	};

	var getTextInputSelection = function() {
		return $('input').val();
	};

	return my;
}());





// main
$(document).ready(function(){
	'use strict';

	controller.init();
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

    my.renderFractions = function(data){
    	var result = [];
    	for (var i = 0; i < data.length ; i++) {
    		result.push(util.renderFraction(data[i]));
    	};
    	return result;
    };

    return my;
}());