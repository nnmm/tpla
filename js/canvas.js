var eqCanvas = (function() {
  'use strict';
  // module pattern
  var my = {},
    equations = [],
    quantities = [],
    WIDTH,
    HEIGTH,
    rawVariables,
    bg,
    stage;

  my.init = function(givenVariables, unknownVariables) {
    // see easelJS documentation
    stage = new createjs.Stage('demoCanvas');
    stage.mouseMoveOutside = true;

    var canvas = document.getElementById('demoCanvas');
    WIDTH = canvas.width;

    // background
    bg = new createjs.Shape();
    stage.addChildAt(bg, 0);
    bg.graphics.beginFill('rgb(250, 250, 250)').drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    // given variables
    rawVariables = [].concat(unknownVariables, givenVariables);
    my.resetVariables();
    stage.update();
  };


  my.resetVariables = function () {
    quantities.push(new Variable(rawVariables[0].letter, rawVariables[0].index, WIDTH-50, 350, "unknown", null));
    for (var i = 1; i < rawVariables.length; i++) {
      quantities.push(new Variable(rawVariables[i].letter, rawVariables[i].index, WIDTH-50, i*50, "given", null));
    };
    stage.update();
  };

  my.addEquations = function(textarray) {
    // avoid adding the same equation twice
    // remove existing equations
    stage.removeAllChildren();
    equations = [];
    quantities = [];

    var eqOffset = 150;
    stage.addChildAt(bg, 0);
    for (var i = Math.min(textarray.length - 1, 3); i >= 0; i--) {
      equations.push(new Equation(textarray[i], eqOffset, 150));
      eqOffset = (eqOffset + 250) % (WIDTH-100);
    };
    my.resetVariables();
    stage.update();
  };

  my.checkCompleteness = function () {
    var allComplete = true;
    for (var i = 0; i < equations.length; i++) {
      if(!equations[i].isComplete()) {
        allComplete = false;
      };
    };
    for (var i = 0; i < quantities.length; i++) {
      if(quantities[i].joined == null) {
        allComplete = false;
      };
    };
    // TODO: maybe have a cleaner separation between canvas and stage
    if (allComplete) {
      $('.hidden').removeClass('hidden');
    };
    return allComplete;
  }



  // ------------------------------------------------------------------------------------------------


  function Equation(text, xpos, ypos) {
    this.initialize();

    this.text = text;
    this.x = xpos;
    this.y = ypos;

    // circle and label
    this.label = new createjs.Text(text, '14px Arial', '#FFFFFF');
    var radiusInner = this.label.getMeasuredWidth()/2 + 10;
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(COLOR_DEFAULT).drawCircle(0, 0, radiusInner);
    this.label.textAlign = 'center';
    this.label.y = -7;
    this.addChild(this.shape, this.label);

    // add self to stage
    stage.addChild(this);

    // dragging
    this.on('mousedown', handleMouseDown);
    this.on('pressmove', handleMove);

    // TODO: factor out all the boilerplate above into own class
    this.variablesAsStrings = textToVariables(text);
    for (var i = 0; i < this.variablesAsStrings.length; i++) {
    	var vas = this.variablesAsStrings[i];
    	// TODO
    };
    
    // arrange the variables in a circle around the center
    var radius = 120, angle = Math.PI;
    this.variablen = [];
    for (var i = 0; i < this.variablesAsStrings.length; i++) {
      var xrel = radius*Math.cos(angle) + xpos;
      var yrel = radius*Math.sin(angle) + ypos;
      this.variablen.push(new Variable(this.variablesAsStrings[i], null, xrel, yrel, "equation", this));
      angle = angle + 2 * Math.PI/this.variablesAsStrings.length;
    };

    // create lines to the corresponding variables
    this.lines = [];
    for (var i = 0; i < this.variablen.length; i++) {
      var line = new createjs.Shape();
      var x = this.variablen[i].x;
      var y = this.variablen[i].y;
      line.color = COLOR_EQUATION;
      line.color_active = COLOR_EQUATION_ACTIVE;
      line.color_current = line.color;
      line.graphics.setStrokeStyle(5).beginStroke(COLOR_DEFAULT);
      line.graphics.moveTo(xpos, ypos).lineTo(x,y);
      this.lines.push(line);
      stage.addChildAt(line, 1);
    };

    // move lines
    var self = this;
    this.on('pressmove', function(evt) {
      self.moveAllLines();
    });

  };

  var ep = Equation.prototype = new createjs.Container();


  ep.moveLine = function(evt, child) {
    this.drawLine(child);
  };

  ep.drawLine = function(child) {
    var index = this.variablen.indexOf(child);
    if (index >= 0) {
      this.lines[index].graphics.clear();
      this.lines[index].graphics.setStrokeStyle(5).beginStroke(this.lines[index].color_current);
      this.lines[index].graphics.moveTo(this.x, this.y).lineTo(child.x, child.y);
    };
    stage.update();
  };

  ep.setLineColor = function(child, color) {
    var index = this.variablen.indexOf(child);
    this.lines[index].color_current = color;
    this.drawLine(child);
  };

  ep.moveAllLines = function() {
    for (var i = 0; i < this.variablen.length; i++) {
      var x = this.variablen[i].x;
      var y = this.variablen[i].y;
      this.lines[i].graphics.clear();
      this.lines[i].graphics.setStrokeStyle(5).beginStroke(this.lines[i].color_current);
      this.lines[i].graphics.moveTo(this.x, this.y).lineTo(x,y);
    };
    stage.update();
  };

  ep.isComplete = function() {
    var complete = true;
    for (var i = 0; i < this.variablen.length; i++) {
      if (this.variablen[i].joined == null) {
        complete = false;
      };
    };
    if (complete) {
      this.setColor(COLOR_EQUATION_ACTIVE);
    } else{
      this.setColor(COLOR_EQUATION);
    };
    return complete;
  };

  ep.setColor = function(color) {
    this.shape.graphics.clear();
    this.shape.graphics.beginFill(color).drawCircle(0, 0, 2*RADIUS);
  };


  var textToVariables = function(text) {
    // e. g. E = m⋅g⋅h becomes ['E', 'm', 'g', 'h']
    // replace() removes whitespace and other characters
    var variableArray = text.replace(/\s+|²|½|⅓|¼|⅔|\(|\)|\d/g, '').split(/=|\*|\⋅|\/|\+|\-/);
    for (var i = 0; i < variableArray.length; i++) {
      if (variableArray[i] == "") {         
        variableArray.splice(i, 1);
        i--;
      };
    };
    return variableArray;
  }



  // ------------------------------------------------------------------------------------------------

  var RADIUS = 22,
    COLOR_DEFAULT = 'rgb(130, 130, 255)',
    COLOR_GIVEN = 'rgb(150, 200, 150)',
    COLOR_EQUATION = 'rgb(130, 130, 255)',
    COLOR_UNKNOWN = 'rgb(200, 150, 150)',
    COLOR_GIVEN_ACTIVE = 'rgb(100, 200, 100)',
    COLOR_EQUATION_ACTIVE = 'rgb(100, 200, 100)',
    COLOR_UNKNOWN_ACTIVE = 'rgb(200, 100, 100)'

  function Variable(text, index, xpos, ypos, type, prnt) {
    this.initialize();

    this.text = text;
    this.unit = text.replace(/Δ|₀|₁|₂|_\w+/g, '');
    switch(this.unit) {
      case "u":
        this.unit = "v";
        break;
      case "W":
        this.unit = "E";
        break;
    };
    this.x = xpos;
    this.y = ypos;
    this.prnt = prnt;
    this.joined = null;
    this.type = type;
    switch (type) {
      case "equation":
        this.color = COLOR_DEFAULT;
        this.color_active = COLOR_GIVEN_ACTIVE;
        break;
      case "given":
        this.color = COLOR_GIVEN;
        this.color_active = COLOR_GIVEN_ACTIVE;
        break;
      case "unknown":
        this.color = COLOR_UNKNOWN;
        this.color_active = COLOR_UNKNOWN_ACTIVE;
        break;
    };

    // circle and label
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(COLOR_DEFAULT).drawCircle(0, 0, RADIUS);
    this.label = new createjs.Text(text, '14px Arial', '#FFFFFF');
	this.label.y = -7;
    this.label.textAlign = 'center';

    //this.labelIndex.y = - 10;
    this.addChild(this.shape, this.label);
    if (index !== null && index != "") {
    	//this.label.x = -3;
    	this.label.y = -9;
    	this.label.textAlign = 'right';
    	this.labelIndex = new createjs.Text(index, '9px Arial', '#FFFFFF');
    	this.labelIndex.textAlign = 'left';
    	this.addChild(this.labelIndex);
    };
    this.setColor(this.color);

    // add self to stage
    stage.addChild(this);

    // dragging
    this.on('mousedown', handleMouseDown);
    this.on('pressmove', handleMove);

    // is there a better way to do this? this changes in the callback handlers
    var self = this;

    // update lines when dragging
    this.on('pressmove', function(evt) {
      if (prnt != null) {
        prnt.moveLine(evt, self);
      };
      if (this.joined != null) {
        self.unjoin();
      };
    });

    // gets called on mouse release
    // check if this has been dropped on another variable
    this.on('pressup', function(evt) {
     for (var i = 0; i < equations.length; i++) {
        for (var j = 0; j < equations[i].variablen.length; j++) {
          var obj = equations[i].variablen[j].shape;
          var localCoords = obj.globalToLocal(evt.stageX, evt.stageY);
          if (obj.hitTest(localCoords.x, localCoords.y) && self !== equations[i].variablen[j]) {
            self.joinWith(equations[i].variablen[j]);
            return;
          };
        };
      };
    });
  };

  var vp = Variable.prototype = new createjs.Container();

  vp.setColor = function(color) {
    this.shape.graphics.clear();
    this.shape.graphics.beginFill(color).drawCircle(0, 0, RADIUS);
  };

  vp.joinWith = function(otherVar) {
    // otherVar is an equation variable
    if (this.unit !== otherVar.unit) {
      return;
    };

    // otherVar may not already have a joined variable
    if (otherVar.joined !== null) {
      return;
    };

    // if this has a parent, its other qantities may not be joined to other children of the parent of otherQty
    if (this.prnt != null) {
      // TODO: proper graph checking
      if (this.prnt === otherVar.prnt) {
      	return;
      };
      var myChildren = this.prnt.variablen;
      var otherChildren = otherVar.prnt.variablen;
      for (var i = 0; i < myChildren.length; i++) {
        for (var j = 0; j < otherChildren.length; j++) {
          // TODO: Is this how you do object comparisons?
          if (otherChildren[j] !== otherVar && myChildren[i] !== this) {
            // we don't need to test the other way since it's symmetric
            if (otherChildren[j].joined === myChildren[i]) {
              return;
            };
          };
        };
      };
    }

    // console.log('Joining ' + this.text + ' with ' + otherVar.text);
    // symmetric joining
    this.joined = otherVar;
    otherVar.joined = this;
    // change color
    this.setColor(this.color_active);
    this.joined.setColor(this.color_active);

    // align with otherVar - doesn't work yet with 
    this.setTransform(otherVar.x, otherVar.y);
    if (this.type == "equation") {
      this.prnt.setLineColor(this, COLOR_EQUATION_ACTIVE);
      this.prnt.drawLine(this);
    };
    otherVar.prnt.setLineColor(otherVar, COLOR_EQUATION_ACTIVE);

    // are we done?
    my.checkCompleteness();
    stage.update();

  };

  vp.unjoin = function() {
    // change color
    this.setColor(this.color);
    this.joined.setColor(this.joined.color);
    if (this.type == "equation") {
      this.prnt.setLineColor(this, COLOR_EQUATION);
    };
    this.joined.prnt.setLineColor(this.joined, COLOR_EQUATION);

    this.joined.joined = null;
    this.joined = null;

    my.checkCompleteness();
    stage.update();
  };

  // ------------------------------------------------------------------------------------------------

  function handleMouseDown(evt) {
    // remember the offset of the cursor from the object's origin when dragging
    evt.currentTarget.offset = {x: evt.currentTarget.x - evt.stageX, y: evt.currentTarget.y - evt.stageY};
  }

  function handleMove(evt) {
    evt.currentTarget.x = evt.stageX + evt.currentTarget.offset.x;
    evt.currentTarget.y = evt.stageY + evt.currentTarget.offset.y;
    // make sure to redraw the stage to show the change:
    stage.update();
  }


  return my;
}());