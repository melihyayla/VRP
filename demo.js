var palette = [ "#b64a00","#d65700", "#ff791e"];

function createBox(parentId, boxId, position, rotation, width, height, depth, color, opacity){
  d3.select(parentId)
    .append("a-box")
    .attr("position",position)
    .attr("rotation",rotation)
    .attr("width",width)
    .attr("height",height)
    .attr("color",color)
    .attr("depth",depth)
    .attr("opacity",opacity)
    .attr("id",boxId);
}

function createText(parentId,position,width,text,color,align,id){

            d3.select(parentId)
            .append("a-text")
            .attr("position", position)
            .attr("width", width)
            .attr("value", text)
            .attr("color", color)
            .attr("align", align).attr("id",id);
}


function callTable(dataSet,position,rotation,maxHeight,maxWidth){


    var planeId = "tablePlane";

    var boxWidth = (maxWidth)/3;

    var boxHeight = (maxHeight+2)/(dataSet.length);

    var distance = boxHeight;

    var xPos = (-maxWidth/2)+0.5+(boxWidth/2);

    var yPos = (maxHeight/2)+(boxHeight/2)-1;


    createBox("#mainBox",planeId,position,rotation,maxWidth,maxHeight,0.2,"darkgoldenrod",0);


    var colorCounter = 0 ;


    for(var i = 1 ; i<dataSet.length+1; i++){

         colorCounter = (i-1)%palette.length;

         createBox("#"+planeId,"tableBox"+i, (xPos-0.75)+" "+yPos+" "+0,"0 0 0",boxWidth,boxHeight,0.5,palette[colorCounter],1);

         createText("#tableBox"+i,"0 0 0.3",6,dataSet[i-1],"white","center");
  
          if(i%3 ==0){
          yPos -= boxHeight+distance;
          xPos = (-maxWidth/2)+0.5+(boxWidth/2);
          console.log(palette[colorCounter]);
          }

          else
          xPos += boxWidth+0.25;
          animate("tableBox"+i);
        }

  }


var yPos = 0;
var i = 0;


function rotateBox () {
  // Select the box
  var box = d3.select("#mainBox");
  // Setup a transition
  box.transition()
  .duration(1000)
  // attrTween is needed for smooth transitions (IDK why)
  .attrTween("rotation", function() {
  // Get current position
  var currentRotation = box.attr("rotation");
  console.log(currentRotation);

  yPos+=90;  // {"x": 0, "y": 1, "z": 0}
  // Return an interpolater from current to next position
  return d3.interpolate(currentRotation, {"x": 0, "y": yPos, "z": 0});
  });
}

function rotateBackBox () {
  // Select the box
  var box = d3.select("#mainBox");
  // Setup a transition
  box.transition()
  .duration(1000)
  // attrTween is needed for smooth transitions (IDK why)
  .attrTween("rotation", function() {
  // Get current position
  var currentRotation = box.attr("rotation");
  console.log(currentRotation);

  yPos-=90;  // {"x": 0, "y": 1, "z": 0}
  // Return an interpolater from current to next position
  return d3.interpolate(currentRotation, {"x": 0, "y": yPos, "z": 0});
  });
}


function appendAnimation(boxId){

  var width = d3.select(boxId).attr("width");
  var height = d3.select(boxId).attr("height");

    d3.select(boxId).append("a-entity")
        .attr("obj-model","obj: #right-hand-obj; mtl: #right-hand-mtl")
        .attr("id","id","rightHand"+i)
      .attr("position",(width/2+1) +" 0 0")
        .attr("scale","0.0075 0.0075 0.0075").on("click", rotateBox); 

    d3.select(boxId).append("a-entity")
        .attr("obj-model","obj: #left-hand-obj; mtl:#left-hand-mtl")
        .attr("id","id","leftHand"+i)
      .attr("position",(-width/2-1) +" 0 0")
        .attr("scale","0.0075 0.0075 0.0075").on("click", rotateBackBox);
  i++;
}



function animate(tableId){
      var currentPosition;

        // Attach click event
      d3.select("#"+tableId)
      .on("mouseenter", metalBox)
      .on("mouseleave",backBox)
      .on("click",chooseBox);

      function metalBox () {
        // Select the box
        var box = d3.select(this);
        console.log(box.attr("metalness"));
        if(box.attr("metalness")!=1)
        box.attr("metalness",0.5);
        // Setup a transition
        box.transition()
         .duration(2000)
      }

      function backBox () {
        // Select the box
        var box = d3.select(this);
        if(box.attr("metalness")!=1)
        box.attr("metalness",0);

        // Setup a transition
        box.transition()
         .duration(2000)
      }

      

      function chooseBox () {
        var box = d3.select(this);

        var parent = d3.select(this.parentNode);

        parent.selectAll("a-box").attr("metalness",0);

                var tableName =  box.select("a-text").attr("value");

                tableNameDescribe = tableName;

                console.log(tableNameDescribe);

                box.attr("metalness",1);
               
        
                if(document.getElementById('planetBox')){
                   d3.select("#planetBox").remove();
                   d3.select("#infoBox").remove();
                   
                    
                }

                createBox("#mainBox","planetBox","-8 2 0","0 90 0",8,4,0.2,"darkgoldenrod",0);
               d3.select("#planetBox").append("a-sphere").attr("radius", 4).attr("src","#" +tableName+ "img")
                .attr("position","0 0 0").attr("scale","0.5 0.5 0.5");      
                
                function animatePlanet () {
                  // Select the box
                  var box = d3.select(this);

                  box.transition()
                     .duration(5000)
                     // attrTween is needed for smooth transitions (IDK why)
                     .attrTween("rotation", function() {
                      var currentRotation = box.attr("rotation");
                       return d3.interpolate(currentRotation,{"x": 30 , "y": 540, "z": 50 });
                     });
                   }

                 d3.selectAll("a-sphere").on("mouseenter",animatePlanet);  

                d3.select("#planetBox").append("a-box").attr("position","0 3 0.2").attr("height",1).attr("opacity",0.25).attr("depth",0.2).attr("width",4).attr("color","purple")
                .append("a-text").attr("value",""+tableName.toUpperCase()).attr("color","white").attr("align","center").attr("position","0 0 0.1");


                d3.select("#planetBox").append("a-entity").attr("obj-model","obj: #arrow-obj; mtl: #arrow-mtl")
                .attr("color","darkgoldenrod").attr("scale","0.02 0.04 0.04").attr("position","5 0 0").on("click", rotateBox);

                d3.select("#planetBox").append("a-entity").attr("obj-model","obj: #arrow-obj; mtl: #arrow-mtl")
               .attr("rotation", "0 180 0").attr("color","darkgoldenrod").attr("scale","0.02 0.04 0.04").attr("position","-5 0 0").on("click", rotateBackBox);

                var str = window[tableName+"Info"];

                createBox("#mainBox","infoBox","8 2 0","0 -90 0",8,4,0.2,"purple",0.6);    
              d3.select("#infoBox").append("a-text").attr("value",str)
              .attr("position","-3.5 0 0.5").attr("color","white").attr("align","left").attr("width",6).attr("lineHeight",10).attr("letterSpacing",10);

               d3.select("#infoBox").append("a-box").attr("position","0 2.5 0.2").attr("depth",0.2).attr("height",1).attr("width",4).attr("color","purple").append("a-text")
               .attr("value",""+tableName.toUpperCase()).attr("color","white").attr("align","center").attr("position","0 0 0.1");

                d3.select("#infoBox").append("a-entity").attr("obj-model","obj: #arrow-obj; mtl: #arrow-mtl")
                .attr("color","darkgoldenrod").attr("scale","0.02 0.04 0.04").attr("position","5 0 0").on("click", rotateBox);

                d3.select("#infoBox").append("a-entity").attr("obj-model","obj: #arrow-obj; mtl: #arrow-mtl")
               .attr("rotation", "0 180 0").attr("color","darkgoldenrod").attr("scale","0.02 0.04 0.04").attr("position","-5 0 0").on("click", rotateBackBox);

        }

      }
