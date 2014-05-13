$(document).ready(function(){
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
		};
	});
	$("#weiter").click(function(event) {
		$(".hidden").removeClass("hidden");
		$(".stepone").addClass("hidden");
	});
	$("#formel").click(function(event) {
		myModule.addEquation("P = E/Δt");
	});

	myModule.init();
	myModule.addObjects();
});