// var c=document.getElementById("mycanvas");
// var cxt=c.getContext("2d");
// var img=new Image()
// // img.src="img/background.jpg"
// // img.onload = function(){
//     cxt.drawImage(img,0,0);
// cxt.strokeRect(0,125,250,350);
// cxt.moveTo(300,300);
// cxt.lineTo(900,300);
//     cxt.stroke();


// cxt.strokeRect(330,0,80,100);
//     cxt.strokeRect(420,0,80,100);
//     cxt.strokeRect(510,0,80,100);
//     cxt.strokeRect(600,0,80,100);
//     cxt.strokeRect(690,0,80,100);
//     cxt.strokeRect(800,0,80,100);


// cxt.strokeRect(330,500,80,100);
//     cxt.strokeRect(420,500,80,100);
//     cxt.strokeRect(510,500,80,100);
//     cxt.strokeRect(600,500,80,100);
//     cxt.strokeRect(690,500,80,100);
//     cxt.strokeRect(800,500,80,100);

//     var card=new Image()
//     card.src="img/no-name.jpg"
//     card.onload = function(){
//         cxt.drawImage(card,800,500,80,100);
//     }
// }

    

createjs.Ticker.addEventListener("tick", handleTicker);
function handleTicker(){
stage.update();
}



    var stage = new createjs.Stage("mycanvas");
    var container = new createjs.Container();
    stage.addChild(container);

    var bg = new createjs.Bitmap("img/back2.jpg");
        stage.addChild(bg);
    var Rect = new createjs.Shape();
    Rect.graphics.beginFill("#ffffff");
    Rect.graphics.drawRect(5,5,50,50);

     var lineShape = new createjs.Shape();
     lineShape.graphics.beginStroke("black");  
        lineShape.graphics.setStrokeStyle(1); 
        lineShape.graphics.moveTo(300,300);
        lineShape.graphics.lineTo(900,300)
        
// cxt.strokeRect(330,0,80,100);
//     cxt.strokeRect(420,0,80,100);
//     cxt.strokeRect(510,0,80,100);
//     cxt.strokeRect(600,0,80,100);
//     cxt.strokeRect(690,0,80,100);
//     cxt.strokeRect(800,0,80,100);


// cxt.strokeRect(330,500,80,100);
//     cxt.strokeRect(420,500,80,100);
//     cxt.strokeRect(510,500,80,100);
//     cxt.strokeRect(600,500,80,100);
//     cxt.strokeRect(690,500,80,100);
//     cxt.strokeRect(800,500,80,100);
 

    stage.addChild(Rect);
       stage.addChild(lineShape);