// MVC pattern
// controller
var controller = (function() {
	'use strict';
 	var my = {},
 		allownextSection = false;


	// is called only on pageload
 	my.init = function() {

 		model.initSubtask();
 		
 		// persistent data
 		localStorage.clear("lives");
 		var lives = model.getLives();
 		// TODO: initialize/load timer and subtask

 		view.showLives(lives);
 		view.registerListeners();
		view.updateTable(0);
		view.updateCenterStage(0);

		model.initTimer();
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
 			// Are there further subtasks?
 			var success = model.initSubtask();
 			if (success) {
 			view.updateTable(0);
 			view.updateCenterStage(0);
 			} else {
 				// We're at the end of the exercise
 				var scoreData = model.saveAndGetScore();
 				view.showScore(scoreData);
 			};
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
	var my = {},
		WRONG_OPTIONS = 5;
	// is called at the beginning of each subtask
	my.initSubtask  = function() {
		// ugly?
		if (typeof my.curSubtask === 'undefined') {
			my.curSubtask = 0;
		};
		if (my.curSubtask == d.subtasks.length) {
			return false;
		};
		var sd = d.subtasks[my.curSubtask];
		my.curSubtask++;

		// contains *all* the data required for one section
		my.section = [];
		my.section.push({
			// Größen finden
			"title": "Größen",
			"identifier": "groessen",
			"type": "dropdown",
			"optionsGiven": function() {
				var options = {"letter": [], "index": [], "value": [], "unit": []};
				// add correct options
				for (var i = 0; i < sd.given.length; i++) {
					for (var p in options) {
						options[p].push(sd.given[i][p]);
					};
				};
				// add wrong letters and units
				var wrong = util.shuffle(shared.variables).slice(0, WRONG_OPTIONS);
				for (var i = 0; i < wrong.length; i++) {
					for (var p in wrong[0]) {
						options[p].push(wrong[i][p]);
					};
				};
				// TODO: add wrong indices
				// add wrong values
				options.value.push("0", "1");
				// remove duplicates
				for (var p in options) {
					options[p] = util.shuffle(util.unique(options[p]));
				};
				return options;
			},
			"solutionGiven": sd.given,
			"optionsUnknown": function() {
				// add correct options
				var options = {"letter": [sd.solution.letter], "index": [sd.solution.index], "unit": [sd.solution.unit]};
				// add wrong letters and units
				var wrong = util.shuffle(shared.variables).slice(0, WRONG_OPTIONS);
				for (var i = 0; i < wrong.length; i++) {
					for (var p in wrong[0]) {
						options[p].push(wrong[i][p]);
					};
				};
				// remove duplicates
				for (var p in options) {
					options[p] = util.shuffle(util.unique(options[p]));
				};
				return options;
			},
			"solutionUnknown": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			"verify": verifyDropdownSelection,
			"onRender": function() {
				// oh no view code in model!
				var selectRow = $('.select-row-gegeben')[0].outerHTML;
				for (var i = 1; i < 4; i++) {
					$('.select-row-gegeben:last').after(selectRow);
				};
				$('select').first().focus();
			},
		});

		my.section.push({
			// Basis- und Lösungsformel finden – multiple choice
			"title": "Basis- und Lösungsformel",
			"identifier": "formeln",
			"type": "multipleChoice",
			"width": function() {
				return ($('#center-stage').width() * 1) + "px"
			},
			"height": "400px",
			"optionsEquations": function() {
				var correct = sd.equations;
				// TODO: Only select equations that contain at least one of the variables
				var wrong = util.shuffle(shared.equations).slice(0, 8 - correct.length);
				return util.shuffle([].concat(wrong, correct));
			},
			"solutionEquations": sd.equations,
			"givenVariables": sd.given,
			"unknownVariable": { "letter": sd.solution.letter, "index": sd.solution.index, "unit": sd.solution.unit},
			"solution": sd.solution.equation,
			"eqs": [],
			"options": function() {
				var opts = [];
				var values = util.shuffle([].concat(sd.alternative_solution_equations, sd.solution.equation));
				for (var i = 0; i < values.length; i++) {
					opts.push({
						"val": values[i],
						"text": util.fractionize(values[i]),
					});
				};
				return opts;
			},
			"verify": verifyMultipleChoice,
			"onRender": function() {
				var eqs = this.eqs;
				$("#basisformeln button").click(function() {
				 	eqs.push($(this).text());
				    eqCanvas.addEquations(eqs);
		 		});
		 		$("#reset_basisformeln").click(function() {
		 			eqs = [];
		 			eqCanvas.addEquations(eqs);
		 		});
				eqCanvas.init(this.givenVariables, this.unknownVariable);
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
						"text": util.fractionize(values[i]),
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
				var valueDot = sd.solution.value.replace(/,/g, '.');
				options.push(sd.solution.value + " " + sd.solution.unit);
				options.push(sd.solution.value + " " + sd.solution.unit_long);
				options.push(valueDot + " " + sd.solution.unit);
				options.push(valueDot + " " + sd.solution.unit_long);
				return options;
			},
			"verify": verifyTextInput,
			"onRender": function() {
				$('input').focus();
			},
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
		view.renderProblem({
			"title": sd.title,
			"blocktext": d.blocktext,
			"problem": sd.problem
		});

		// the user gets an extra life if no mistake is made
		my.extraLife = true;

		return true;
	};

	my.getCurSubtask = function() {
		return my.curSubtask;
	};

	my.nextSubtask = function() {
		my.curSubtask++;
	}

	my.getCurSection = function() {
		return my.curSection;
	};

	my.initTimer = function() {
		if (my.intervalID !== undefined) {
			clearTimeout(my.intervalID);
		};
		my.timer = 0;
		my.intervalID = setInterval(function() {
				my.timer += 1;
				// TODO: separate
				view.updateTimer(my.timer);
				console.log("Uh?");
			}, 1000);
	}

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

	my.saveAndGetScore = function(score) {
		// get the name of the exercise
		var pathArray = window.location.pathname.split( '/' );
		var identifier = "time_" + pathArray[pathArray.length - 2];
		localStorage.setItem(identifier, my.time);
		identifier = "score_" + pathArray[pathArray.length - 2];
		var trophyOld = localStorage.getItem(identifier);
		var trophyNew = "bronze";
		// only save if it's better than the one before it
		if (my.time/my.section.length < 500) {
			trophyNew = "silver";
			if (my.time/my.section.length < 360) {
				trophyNew = "gold";
			};
		};
		if (trophyOld === null) {
			localStorage.setItem(identifier, score);
		} else {
			var medals = ["bronze", "silver", "gold"];
			if (medals.indexOf(trophyNew) > medals.indexOf(trophyOld)) {
				localStorage.setItem(identifier, score);
			};
		};
		return {"time": my.timer, "trophy": trophyNew};
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
		if (inputGesucht.letter === this.solutionUnknown.letter &&
			inputGesucht.index === this.solutionUnknown.index &&
			inputGesucht.unit === this.solutionUnknown.unit) {
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

	my.renderProblem = function(problemData) {
		var template = $('#tmpl-problem').html();
		var rendered = Mustache.render(template, problemData);
		$("#problem-container").html(rendered);
	};

	my.registerListeners = function() {
		$("#pruefen").click(controller.pruefenWeiter);

		$(document).keypress(function (e) {
		  if (e.which == 13) {
		    $('#pruefen').focus().click();
		    return false;
		  }
		});
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

	my.updateTimer = function(time) {
		var mins = Math.floor(time/60);
		if (mins < 10) {
			mins = "0" + mins;
		};
		var secs = time % 60;
		if (secs < 10) {
			secs = "0" + secs;
		};
		$("#timer").html(mins + ":" + secs);
	}

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

	my.showScore = function(scoreData) {
 		$("#problem-container, #table-container, #center-stage").addClass("fade");
		window.scrollTo(0, 0);
 		var template = $("#tmpl-score").html();
 		var rendered = Mustache.render(template, scoreData);
 		$("#result-container").html(rendered);
 		$("#pruefen").prop("disabled", "disabled");
 		// remove keypress handler
 		$(document).off();
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

    // use in combination with slice()
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

    my.unique = function(array) {
       var u = {}, a = [];
       for(var i = 0, l = array.length; i < l; ++i){
          if(u.hasOwnProperty(array[i])) {
             continue;
          }
          a.push(array[i]);
          u[array[i]] = 1;
       }
       return a;
    };

    my.generateOptions = function(correct, wrong) {
    	return util.shuffle([].concat(wrong, correct));
    };

    my.fractionize = function(string) {
    	// http://stackoverflow.com/questions/22142058/how-to-display-all-fractions-in-web-app

    	// var string = "E = k + [2⋅μ⋅r]/[g] ⋅ [Q]/[ΔT] + 2μ";
    	// captures a […]/[…] pattern and everything else
    	var re = /(\[[^\]]*\]\/\[[^\]]*\]|[^\[\]]+)/g
    	var array = string.match(re);
    	var result = "";
    	for (var i = 0; i < array.length; i++) {
    		array[i] = array[i].replace(/\[([^\]]*)\]\/\[([^\]]*)\]/g,'<span class="top">$1</span><span class="bottom">$2</span>');
    		array[i] = array[i].replace(/([^\[\]]+)/g, '<span class="operator">$1</span>');
    		array[i] = array[i] = '<div class="fraction">' + array[i] + '</div>';
    		result += array[i];
    	};
    	//$('#tmp').html(result);
    	return result;
    };

    return my;
}());