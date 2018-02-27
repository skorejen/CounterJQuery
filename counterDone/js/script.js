var rows = 16;
var rowLoops = 0; // number at which
var numberOfRowLoops = 1;
var boxes = document.querySelectorAll(".numberBox");
var rowBoxIndex = 0;
var milisecondsOfRowLoop = 113;
var places = 29;
var placeLoops = 0; // number at which
var numberOfPlaceLoops = 1;
var pBoxes = document.querySelectorAll(".numberPlaceBox");
var placeBoxIndex = 0;
var milisecondsOfPlaceLoop = 113;
var topPositionOfStop = 360;
var initializeTopRowBox = 140;
var clickCount = 0;
var milisecondsOfRowBoxMove = 400;
var rowPower = 0.1;
var milisecondsOfPlaceBoxMove = 400;
var placePower = 0.1;
var countRow = 0;
var countPlace = 0;
var clickFlagPlace = true;
var clickFlagRow = true;
$(document).ready(function () {
    initializeRowBoxes();

    initializePlaceBoxes();

})


$(document).click(function () {
    if (clickFlagPlace === true && clickFlagRow === true) {
        clickCount++;
    }

    if (clickCount === 1) {
        restartValues();
        initializeRowBoxes();
        infiniteMovementOfRowBoxes(boxes);
        initializePlaceBoxes();
        infiniteMovementOfPlaceBoxes(pBoxes);
    } else if (clickCount === 2) {

        initializeRowBoxes();
        slowingDownRows();
        finalMovementOfRowBoxes(boxes);
        
        console.log("Final count: " + clickCount);
    } else if (clickCount === 3) {
        initializePlaceBoxes();
        slowingDownPlaces();
        finalMovementOfPlaceBoxes(pBoxes);
        clickCount = 0;
        clickFlagPlace = false;
        clickFlagRow = false;
        
    }


});

function slowingDownRows() {

    setTimeout(function () {
        if (countRow < 32) {
            rowPower += 0.065;
            milisecondsOfRowLoop += Math.pow(5, rowPower);
            console.log("Slowing Down rowPower: " + rowPower + " / Miliseconds of row loop: " + milisecondsOfRowLoop);
            milisecondsOfRowBoxMove = milisecondsOfRowBoxMove + Math.pow(9.8, rowPower);
            countRow++;
            slowingDownRows();
        }

    }
        , milisecondsOfRowLoop * 0.47)

}

function restartValues() {
    milisecondsOfRowBoxMove = 400;
    milisecondsOfRowLoop = 113;
    milisecondsOfPlaceLoop = 113;
    rowPower = 0.1;
    milisecondsOfPlaceBoxMove = 400;
    placePower = 0.1;
    countRow = 0;
    countPlace= 0;
}

function initializeRowBox(box) {
    $(box).offset({ top: initializeTopRowBox });
    $(box).addClass("leftRow");
}

function initializeRowBoxes() {
    rowLoops = 0;
    rowBoxIndex = 0;

    initializeRowBox(".numberBox");
}

function moveRowBox(box) {

    $(box).animate({ top: '+=400' }, milisecondsOfRowBoxMove, "linear", function () {
        initializeRowBox(box);
    });
}

function infiniteMovementOfRowBoxes(boxes) {
    if (clickCount === 1) {
        setTimeout(function () {
            if (rowBoxIndex < rows) {
                moveRowBox(boxes[rowBoxIndex]);
                rowBoxIndex++;

                infiniteMovementOfRowBoxes(boxes);
                if (rowBoxIndex == rows) {
                    rowLoops++;
                    rowBoxIndex = 0;
                }
            }
        }, milisecondsOfRowLoop)
    }

}

function finalMovementOfRowBoxes(boxes) {
    setTimeout(function () {
        if (rowBoxIndex < rows && rowLoops < numberOfRowLoops) {
            moveRowBox(boxes[rowBoxIndex]);
            rowBoxIndex++;


            console.log("Miliseconds of Row Box move: " + milisecondsOfRowBoxMove + " / rowPower: " + rowPower);

            finalMovementOfRowBoxes(boxes);
            if (rowBoxIndex == rows) {
                rowLoops++;
                rowBoxIndex = 0;
            }
        } else if (rowLoops >= numberOfRowLoops) {
            console.log("Stop loop initalization")
            rowLoops = 0;
            rowBoxIndex = 0;
            moveRowBox(boxes[rowBoxIndex]);
            rowBoxIndex++;
            stopRowAtNumber(chooseRandomRow(), boxes);
        }


    }, milisecondsOfRowLoop)
}

function chooseRandomRow() {
    var number = Math.floor(Math.random() * (rows)) + 1;
    console.log("Random row: " + number);
    return number;
}

function stopRowAtNumber(breakNumber, boxes) {
    setTimeout(function () {
        if (rowBoxIndex < (breakNumber + 1)) // +1 because of animation needs to stop in the middle
        {
            moveRowBox(boxes[rowBoxIndex]);
            rowBoxIndex++;


            console.log("Row box Index: " + rowBoxIndex);
            stopRowAtNumber(breakNumber, boxes);

        } else if (rowBoxIndex === breakNumber + 1) {
            console.log("shoould stop / rows")
            $(boxes).stop();
            fixPositionOfRowBoxes(breakNumber, boxes);
        }


    }, milisecondsOfRowLoop)
}



function fixPositionOfRowBoxes(breakNumber, boxes) {
    var threeBoxes = [boxes[(breakNumber - 1)], boxes[breakNumber], boxes[(breakNumber - 2)]];
    var positionOfChosenBox = $(threeBoxes[0]).position();
    console.log("Position start: " + positionOfChosenBox.top);
    var difference = positionOfChosenBox.top - topPositionOfStop;
    var speedOfRowBoxFix = milisecondsOfRowBoxMove / 2;
    console.log("DIfference: " + difference);


   

    
        $(threeBoxes[0]).animate({ top: topPositionOfStop }, speedOfRowBoxFix);

        $(threeBoxes[1]).animate({ top: '-=' + difference }, speedOfRowBoxFix);
        $(threeBoxes[2]).animate({ top: '-=' + difference }, speedOfRowBoxFix,function()
        {
            console.log("SET ROW CLICK FLAG TO TRUE");
            clickFlagRow = true;
        });
    

}


// PLACE BOXES



function initializePlaceBox(pBox) {
    $(pBox).offset({ top: initializeTopRowBox });
    $(pBox).addClass("leftPlace");
}

function initializePlaceBoxes() {
    placeLoops = 0;
    placeBoxIndex = 0;
    initializePlaceBox(".numberPlaceBox");
}

function movePlaceBox(pBox) {

    $(pBox).animate({ top: '+=400' }, milisecondsOfPlaceBoxMove, 'linear', function () {
        initializePlaceBox(pBox);
    });
}

function infiniteMovementOfPlaceBoxes(pBoxes) {
    if (clickCount === 2 || clickCount === 1) {


        setTimeout(function () {
            if (placeBoxIndex < places) {
                movePlaceBox(pBoxes[placeBoxIndex]);
                placeBoxIndex++;

                infiniteMovementOfPlaceBoxes(pBoxes);
                if (placeBoxIndex == places) {
                    placeLoops++;
                    placeBoxIndex = 0;
                }
            }


        }, milisecondsOfPlaceLoop)
    }
}

function slowingDownPlaces() {

    setTimeout(function () {
        if (countPlace < 37) {
            placePower += 0.055;
            milisecondsOfPlaceLoop += Math.pow(5, placePower);
            console.log("Slowing Down rowPower: " + placePower + " / Miliseconds of row loop: " + milisecondsOfPlaceLoop);
            milisecondsOfPlaceBoxMove = milisecondsOfPlaceBoxMove + Math.pow(9.8, placePower);
            countPlace++;
            slowingDownPlaces();
        }

    }
        , milisecondsOfPlaceLoop * 0.72)

}

function finalMovementOfPlaceBoxes(pBoxes) {
    setTimeout(function () {
        if (placeBoxIndex < places && placeLoops < numberOfPlaceLoops) {
            movePlaceBox(pBoxes[placeBoxIndex]);
            placeBoxIndex++;

            finalMovementOfPlaceBoxes(pBoxes);
            if (placeBoxIndex == places) {
                placeLoops++;
                placeBoxIndex = 0;
            }
        } else if (placeLoops >= numberOfPlaceLoops) {
            console.log("Stop loop initalization")
            placeLoops = 0;
            placeBoxIndex = 0;
            movePlaceBox(pBoxes[placeBoxIndex]);
            placeBoxIndex++;
            stopPlaceAtNumber(chooseRandomPlace(), pBoxes)
        }


    }, milisecondsOfPlaceLoop)
}

function chooseRandomPlace() {
    var number = Math.floor(Math.random() * (places)) + 1;
    console.log("Random place: " + number);
    return number;
}

function stopPlaceAtNumber(breakNumber, pBoxes) {
    setTimeout(function () {
        if (placeBoxIndex < (breakNumber + 1)) // +1 because of animation needs to stop in the middle
        {
            movePlaceBox(pBoxes[placeBoxIndex]);
            placeBoxIndex++;

            stopPlaceAtNumber(breakNumber, pBoxes);

        } else if (placeBoxIndex === breakNumber + 1) {
            console.log("shoould stop / place")
            $(pBoxes).stop();
            fixPositionOfPlaceBoxes(breakNumber, pBoxes);
        }


    }, milisecondsOfPlaceLoop)
}

function fixPositionOfPlaceBoxes(breakNumber, boxes) {
    var threeBoxes = [boxes[(breakNumber - 1)], boxes[breakNumber], boxes[(breakNumber - 2)]];
    var positionOfChosenBox = $(threeBoxes[0]).position();
    console.log("Position start: " + positionOfChosenBox.top);
    var difference = positionOfChosenBox.top - topPositionOfStop;
    var speedOfPlaceBoxFix = milisecondsOfPlaceBoxMove / 2;
    console.log("DIfference: " + difference);

   

    if(breakNumber===1)
    {
        $(threeBoxes[0]).animate({ top: topPositionOfStop }, speedOfPlaceBoxFix);

        $(threeBoxes[1]).animate({ top: '-=' + difference }, speedOfPlaceBoxFix);
        $(threeBoxes[2]).animate({ top: '-=' + difference }, speedOfPlaceBoxFix);
        $(boxes[28]).animate({ top: '+=60' }, 950,"linear", function()
        {
            console.log("SET PLACE CLICK FLAG TO TRUE");
            clickFlagPlace = true;
        });
    } else
    {
        $(threeBoxes[0]).animate({ top: topPositionOfStop }, speedOfPlaceBoxFix);

        $(threeBoxes[1]).animate({ top: '-=' + difference }, speedOfPlaceBoxFix);
        $(threeBoxes[2]).animate({ top: '-=' + difference }, speedOfPlaceBoxFix,  function()
        {
            console.log("SET PLACE CLICK FLAG TO TRUE");
            clickFlagPlace = true;
        });
    }
    

}