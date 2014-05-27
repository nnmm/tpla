var eqCanvas = (function() {
  'use strict';
  // module pattern
  var my = {},
    equations = [],
    quantities = [],
    bg,
    stage;

  my.init = function() {
    // see easelJS documentation
    stage = new createjs.Stage('demoCanvas');
    stage.mouseMoveOutside = true;

    // background
    bg = new createjs.Shape();
    stage.addChildAt(bg, 0);
    bg.graphics.beginFill('rgb(240, 240, 240)').drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.update();
  };


  my.addGivenQuantities = function () {
    quantities.push(new Variable('Δt', 850, 50, null));
    quantities.push(new Variable('m', 850, 100, null));
    quantities.push(new Variable('g', 850, 150, null));
    quantities.push(new Variable('h', 850, 200, null));
    quantities.push(new Variable('P', 850, 350, null));
    for (var i = quantities.length - 2; i >= 0; i--) {
      quantities[i].setColor('rgb(100, 200, 100)');
    };
    quantities[quantities.length-1].setColor('rgb(200, 100, 100)');
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
    for (var i = textarray.length - 1; i >= 0; i--) {
      equations.push(new Equation(textarray[i], eqOffset, 150));
      eqOffset = (eqOffset + 250) % 800;
    };
    stage.update();
    my.addGivenQuantities();
  };



  // ------------------------------------------------------------------------------------------------


  function Equation(text, xpos, ypos) {
    this.initialize();

    this.text = text;
    this.x = xpos;
    this.y = ypos;

    // circle and label
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('rgb(130, 130, 255)').drawCircle(0, 0, 2*RADIUS);
    this.label = new createjs.Text(text, '14px Arial', '#FFFFFF');
    this.label.textAlign = 'center';
    this.label.y = -7;
    this.addChild(this.shape, this.label);

    // add self to stage
    stage.addChild(this);

    // dragging
    this.on('mousedown', handleMouseDown);
    this.on('pressmove', handleMove);

    // TODO: factor out all the boilerplate above into own class

    // e. g. E = m⋅g⋅h becomes ['E', 'm', 'g', 'h']
    this.variablesAsStrings = text.replace(/\s+/g, '').split(/=|\*|\⋅|\/|\+|\-/);

    // arrange the variables in a circle around the center
    var radius = 100, angle = Math.PI;
    this.variablen = [];
    for (var i = 0; i < this.variablesAsStrings.length; i++) {
      var xrel = radius*Math.cos(angle) + xpos;
      var yrel = radius*Math.sin(angle) + ypos;
      this.variablen.push(new Variable(this.variablesAsStrings[i], xrel, yrel, this));
      angle = angle + 2 * Math.PI/this.variablesAsStrings.length;
    };

    // create lines to the corresponding variables
    this.lines = [];
    for (var i = 0; i < this.variablen.length; i++) {
      var line = new createjs.Shape();
      var x = this.variablen[i].x;
      var y = this.variablen[i].y;
      line.graphics.setStrokeStyle(5).beginStroke('rgb(130, 130, 255)');
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
    var index = this.variablen.indexOf(child);
    if (index >= 0) {
      var x = evt.currentTarget.x;
      var y = evt.currentTarget.y;
      this.lines[index].graphics.clear();
      this.lines[index].graphics.setStrokeStyle(5).beginStroke('rgb(130, 130, 255)');
      this.lines[index].graphics.moveTo(this.x, this.y).lineTo(x,y);
    };
    stage.update();
  };

  ep.moveAllLines = function() {
    for (var i = 0; i < this.variablen.length; i++) {
      var x = this.variablen[i].x;
      var y = this.variablen[i].y;
      this.lines[i].graphics.clear();
      this.lines[i].graphics.setStrokeStyle(5).beginStroke('rgb(130, 130, 255)');
      this.lines[i].graphics.moveTo(this.x, this.y).lineTo(x,y);
    };
    stage.update();
  };



  // ------------------------------------------------------------------------------------------------

  var RADIUS = 20,
    DEFAULTCOLOR = 'rgb(130, 130, 255)';

  function Variable(text, xpos, ypos, prnt) {
    this.initialize();

    this.text = text;
    this.x = xpos;
    this.y = ypos;
    this.prnt = prnt;
    this.joined = null;

    // circle and label
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(DEFAULTCOLOR).drawCircle(0, 0, RADIUS);
    this.label = new createjs.Text(text, '14px Arial', '#FFFFFF');
    this.label.textAlign = 'center';
    this.label.y = -7;
    this.addChild(this.shape, this.label);

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
    // TODO: check for equal units, not equal variables
    if (this.text !== otherVar.text) {
      return;
    };
    // otherVar may not already have a joined variable
    // TODO: read about == and === with null
    if (otherVar.joined != null) {
      return;
    };

    // if this has a parent, its other qantities may not be joined to other children of the parent of otherQty
    if (this.prnt != null) {
      var myChildren = this.prnt.variablen;
      var otherChildren = otherVar.prnt.variablen;
      for (var i = 0; i < myChildren.length; i++) {
        for (var j = 0; j < otherChildren.length; j++) {
          // TODO: Is this how you do object comparisons?
          if (otherChildren[j] !== otherVar && myChildren[i] !== this) {
            // we don't need to test the other way since it's symmetric
            if (otherChildren[j].joined === myChildren[i]) {
              console.log("Parents already joined");
              return;
            };
          };
        };
      };
    }

    console.log('Joining ' + this.text + ' with ' + otherVar.text);
    // symmetric joining
    this.joined = otherVar;
    otherVar.joined = this;

    // TODO: call function to check if the equation is solved
    // align with otherVar - doesn't work yet with 
    this.setTransform(otherVar.x, otherVar.y);
    stage.update();

    // TODO: redraw lines
  };

  vp.unjoin = function() {
    this.joined.joined = null;
    this.joined = null;
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