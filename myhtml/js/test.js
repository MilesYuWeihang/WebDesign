     


     var stage = new createjs.Stage("game");
     var Rect = new createjs.Shape();
     console.log(stage)
    Rect.graphics.beginFill("#ffffff");
    Rect.graphics.drawRect(5,5,50,50);
    stage.addChild(Rect);
    stage.update();
         console.log(stage)
