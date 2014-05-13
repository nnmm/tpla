function init() {
  var canvas = document.getElementById("demoCanvas");
  var context = canvas.getContext("2d");
  context.lineWidth = 5;


  var stage = new createjs.Stage("demoCanvas");
  // this lets our drag continue to track the mouse even when it leaves the canvas:
  // play with commenting this out to see the difference.
  stage.mouseMoveOutside = true;

  bg = new createjs.Shape();
  stage.addChild(bg);
  bg.graphics.beginFill("rgb(240, 240, 240)").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  // TODO: read http://stackoverflow.com/questions/907225/object-oriented-javascript-best-practices
  // and http://www.codeproject.com/Articles/687093/Understanding-JavaScript-Object-Creation-Patterns

  var container1 = new createjs.Container();
  var circle1 = new createjs.Shape();
  circle1.name = "circle1";
  circle1.graphics.beginFill("rgb(130, 130, 255)").drawCircle(0, 0, 20);
  container1.addChild(circle1);
  container1.name = "c1";
  container1.x = 100;
  container1.y = 100;

  var container2 = new createjs.Container();
  var circle2 = new createjs.Shape();
  circle2.name = "circle2";
  circle2.graphics.beginFill("rgb(130, 130, 255)").drawCircle(0, 0, 20);
  container2.addChild(circle2);
  container2.name = "c2";
  container2.x = 200;
  container2.y = 100;

  function handleClick(evt) {
    evt.currentTarget.offset = {x: evt.currentTarget.x - evt.stageX, y: evt.currentTarget.y - evt.stageY};
  }

  function handleClickLocal(evt) {
    var global = container1.localToGlobal(evt.currentTarget.x, evt.currentTarget.y);
    console.log("global " + global.x + ", " + global.y + ", evt.currentTarget " + evt.currentTarget.x + ", " + evt.currentTarget.y);
    evt.currentTarget.offset = {x: global.x - evt.stageX, y: global.y - evt.stageY};
  }


  function handleMove(evt) {
    evt.currentTarget.x = evt.stageX + evt.currentTarget.offset.x;
    evt.currentTarget.y = evt.stageY + evt.currentTarget.offset.y;
    // make sure to redraw the stage to show the change:
    stage.update();   
  }

  function handleMoveLocal(evt) {
    var local = container1.globalToLocal(evt.stageX + evt.currentTarget.offset.x, evt.stageY + evt.currentTarget.offset.y);
    evt.currentTarget.x = local.x;
    evt.currentTarget.y = local.y;
  }

  function nullHandler(evt) {}


  container2.mouseEnabled = false;

  container1.on("mousedown", handleClick);
  container1.on("pressmove", handleMove);
  container2.on("mousedown", handleClick);
  container2.on("pressmove", handleMove);
  
  container1.addChild(container2);
  stage.addChild(container1);
  stage.update();
}





