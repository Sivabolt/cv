var buttonColors=["red","blue","green","yellow"];
var userPattern=[];
var gamePattern=[];
var started=false;
var level=0;

$(document).keypress(function(event){
  console.log(event.key);
  if(!started){
    if(event.key.toLowerCase()=="a"){
      $("#level-title").text("level"+" "+level);
      nextSequence();
      started=true;
    }
  }
});

function nextSequence(){
  setTimeout(function(){
    userPattern=[];
    level++;
    $("#level-title").text("level"+" "+level);
    var r= Math.floor(Math.random()*4);
    var chosenColor=buttonColors[r];
    gamePattern.push(chosenColor);
    console.log("gamePattern:"+" "+gamePattern);
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
  },1000);
}

$(".btn").click(function(){
  var chosen=$(this).attr("id");
  userPattern.push(chosen);
  animatePress(chosen);
  playSound(chosen);
  console.log("userPattern:"+" "+userPattern);
  check((userPattern.length)- 1);
});

function playSound(name){
  var a= new Audio("sounds/"+name+".mp3");
  a.play();
}
function animatePress(chosen){
  $("#"+chosen).addClass("pressed");
  setTimeout(function(){
    $("#"+chosen).removeClass("pressed");
  },100);
}
function check(currentelement){
  if(userPattern[currentelement] === gamePattern[currentelement]){
    if(userPattern.length === gamePattern.length){
      nextSequence();
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Wrong , Please try again!!!");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Press A Key to Start");
    },1000);
    startOver();
  }
}
function startOver(){
  userPattern=[];
  gamePattern=[];
  started=false;
  level=0;
}
