var myModule = (function() {
  // module pattern
  var my = {},
    equations = [],
    eqOffset = 150,
    stage;

  my.init = function() {
    // see easelJS documentation
    stage = new createjs.Stage("demoCanvas");
    stage.mouseMoveOutside = true;

    var bg = new createjs.Shape();
    stage.addChild(bg);
    bg.graphics.beginFill("rgb(240, 240, 240)").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.update();
  };


  function DraggableContainer (shape, label, xpos, ypos) {
    var container = new createjs.Container();
    container.addChild(shape, label);
    container.x = xpos;
    container.y = ypos;
    stage.addChild(container);
    container.on("pressmove", handleMove);
    container.on("mousedown", handleMouseDown);

    return container;
  };


  function Quantity(text, xpos, ypos, prnt) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(130, 130, 255)").drawCircle(0, 0, 20);
    var label = new createjs.Text(text, "14px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -7;
    var self = this;
    this.container = DraggableContainer(circle, label, xpos, ypos);
    this.container.on("pressmove", function(evt) {
      if (prnt != null) {
        prnt.moveLine(evt, self);
      };
    });
  }

  Quantity.prototype.setColor = function(color) {
    var circle = this.container.children[0];
    circle.graphics.clear();
    circle.graphics.beginFill(color).drawCircle(0, 0, 20);
  };

  function Equation(text, xpos, ypos) {
    // Variablen
    var vars = text.replace(/\s+/g, '').split(/=|\*|\/|\+|\-/);
    var radius = 100, angle = Math.PI;
    this.variablen = new Array();
    for (var i = 0; i < vars.length; i++) {
      var xpos_ = radius*Math.cos(angle) + xpos;
      var ypos_ = radius*Math.sin(angle) + ypos;
      this.variablen.push(new Quantity(vars[i], xpos_, ypos_, this));
      angle = angle + 2 * Math.PI/vars.length;
    };

    var label = new createjs.Text(text, "14px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -7;
    var centerShape = new createjs.Shape();
    centerShape.graphics.beginFill("rgb(130, 130, 255)").drawCircle(0, 0, 40);
    var self = this;
    this.container = DraggableContainer(centerShape, label, xpos, ypos);
    this.container.on("pressmove", function(evt) {
      self.moveAllLines();
    });

    this.lines = new Array();
    for (var i = 0; i < this.variablen.length; i++) {
      var line = new createjs.Shape();
      var x = this.variablen[i].container.x;
      var y = this.variablen[i].container.y;
      line.graphics.setStrokeStyle(5).beginStroke("rgb(130, 130, 255)");
      line.graphics.moveTo(xpos, ypos).lineTo(x,y);
      this.lines.push(line);
      stage.addChildAt(line, 1);
    };
  };

  Equation.prototype.moveLine = function(evt, child) {
    var index = this.variablen.indexOf(child);
    if (index >= 0) {
      var x = evt.currentTarget.x;
      var y = evt.currentTarget.y;
      this.lines[index].graphics.clear();
      this.lines[index].graphics.setStrokeStyle(5).beginStroke("rgb(130, 130, 255)");
      this.lines[index].graphics.moveTo(this.container.x, this.container.y).lineTo(x,y);
    };
    stage.update();
  };

  Equation.prototype.moveAllLines = function() {
    for (var i = 0; i < this.variablen.length; i++) {
      var x = this.variablen[i].container.x;
      var y = this.variablen[i].container.y;
      this.lines[i].graphics.clear();
      this.lines[i].graphics.setStrokeStyle(5).beginStroke("rgb(130, 130, 255)");
      this.lines[i].graphics.moveTo(this.container.x, this.container.y).lineTo(x,y);
    };
    stage.update();
  };

  my.addObjects = function () {    
    var dt = new Quantity("Δt", 750, 50, null);
    stage.addChild(dt.container);
    dt.setColor("rgb(100, 200, 100)");
    var m = new Quantity("m", 750, 100, null);
    stage.addChild(m.container);
    m.setColor("rgb(100, 200, 100)");
    var g = new Quantity("g", 750, 150, null);
    stage.addChild(g.container);
    g.setColor("rgb(100, 200, 100)");
    var h = new Quantity("h", 750, 200, null);
    stage.addChild(h.container);
    h.setColor("rgb(100, 200, 100)");
    var P = new Quantity("P", 750, 350, null);
    stage.addChild(P.container);
    P.setColor("rgb(200, 100, 100)");
    stage.update();

  };

  my.addEquation = function(text) {
    equations.push(new Equation(text, eqOffset, 150));
    eqOffset = (eqOffset + 200) % 600;
    stage.update();
  };


  function handleMouseDown(evt) {
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