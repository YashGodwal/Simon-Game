// alert("Hello");

// $("h1");

var buttonColor=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickPattern=[];

var started=false;

var level=1;

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){

    var userChoosenColor=$(this).attr("id");

    userClickPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    animatePress(userChoosenColor);

    checkAnswer(userClickPattern.length-1);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]=== userClickPattern[currentLevel]){
        console.log("success");

        if(userClickPattern.length=== gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over, press any key to restart game");
        startOver();
    }
}
function nextSequence() {
    userClickPattern=[];
    level++;

    $("#level-title").text("level "+ level);

    var randomNumber=Math.floor(Math.random()*(4- 0) + 0);
    console.log(randomNumber);
    var randomChosenColor=buttonColor[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    // animatePress(randomChosenColor);
    
}    
function playSound(name) {
    var audio=new Audio("sounds/" + name+ ".mp3");
    audio.play();
    
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
};
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}