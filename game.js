var level = 0 ;

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false ;

$(document).keypress(function(){
    if (!started) {
       nextSequence(); 
       started = true ;
       $("#level-title").text("Level " + level);
    }
});

function nextSequence () {
    level++ ;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    var userChosenColour = this.id ;
    userClickedPattern.push(userChosenColour);

    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
      }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        var count = 0;
        for (i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] === userClickedPattern[i]) {
                count++;
            }
        }

        if (count === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
              }, 1000);
        } 
          
    } else {
            var wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
              }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false ;
}
