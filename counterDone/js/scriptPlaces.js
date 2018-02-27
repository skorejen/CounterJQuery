var places = 29;
var placeLoops = 0; // number at which
var numberOfPlaceLoops = 2;
var pBoxes = document.querySelectorAll(".numberPlaceBox");
var placeBoxIndex = 0;
var milisecondsOfPlaceLoop = 113;
$(document).ready()
{
    initializePlaceBoxes();
}

$(document).click(function()
{
    initializePlaceBoxes();
    movePlaceBoxes(pBoxes);
});

function initializePlaceBox(pBox)
{
   $(pBox).offset({top: 200, left: 850});
}

function initializePlaceBoxes()
{
        placeLoops = 0;
        placeBoxIndex = 0;
        initializePlaceBox(".numberPlaceBox");
}

function movePlaceBox(pBox)
{
    
    $(pBox).animate({top: '+=300'}, function()
{
    initializePlaceBox(pBox);
});
}

function movePlaceBoxes(pBoxes)
{
    setTimeout(function(){
        if(placeBoxIndex<places && placeLoops<numberOfPlaceLoops)
        {                  
        movePlaceBox(pBoxes[placeBoxIndex]);
        placeBoxIndex++;
        
        movePlaceBoxes(pBoxes);
        if(placeBoxIndex == places)
        {
            placeLoops++;
            placeBoxIndex=0;
        }
    } else if (placeLoops >= numberOfPlaceLoops)
    {
        console.log("Stop loop initalization")
        placeLoops = 0;
        placeBoxIndex =0;
        stopPlaceAtNumber(chooseRandomRow(), pBoxes)
    }
        
        
    },milisecondsOfPlaceLoop)
}

function chooseRandomRow()
{
    var number = Math.floor(Math.random() * (places))+1;
    console.log("Random place: "+number);
    return number;
}

function stopPlaceAtNumber(breakNumber, pBoxes)
{
    setTimeout(function(){
        if(placeBoxIndex<(breakNumber+1)) // +1 because of animation needs to stop in the middle
        {                  
        movePlaceBox(pBoxes[placeBoxIndex]);
        placeBoxIndex++;
        console.log(placeBoxIndex);
        stopPlaceAtNumber(breakNumber,pBoxes);
        
    } else if(placeBoxIndex === breakNumber+1)
    {
        console.log("shoould stop")
        $(pBoxes).stop();
    }
        
        
    },milisecondsOfPlaceLoop)
}