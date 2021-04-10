score=0;
cross=true;
over=true;
// backMusic=new Audio('background-music.mp3');
audiogo=new Audio('gameover.wav');
audiojump=new Audio('jump-super.wav');
backMusic=new Audio('background-music.mp3');
setInterval(()=>{
    backMusic.play();
  },1000);
document.onkeydown=function(event){
    var key=event.keyCode;
    console.log("Key code is: ",key);
    if(key==38 && over==true){
        mario=document.querySelector('.mario');
        mario.classList.add('animatemario');
        setTimeout(()=>{
              mario.classList.remove('animatemario')
        },700);
        audiojump.play();
        setTimeout(()=>{
            audiogo.pause();
       },2000);
    }
    if(key==39&& over==true){
        mario=document.querySelector('.mario');
       marioX=parseInt(window.getComputedStyle(mario,null).getPropertyValue('left')); 
       if(marioX+112>1500)mario.style.left=1500+"px";
       else
       mario.style.left=marioX+112+"px";
    }
    if(key==37&& over==true){
        mario=document.querySelector('.mario');
        marioX=parseInt(window.getComputedStyle(mario,null).getPropertyValue('left'));
        if(marioX-112<0)mario.style.left=2+"px";
        else{
        mario.style.left=(marioX-112)+"px";
    }   
}
}
setInterval(() => {
    mario=document.querySelector('.mario');
    gameOver=document.querySelector('.gameOver');
    play_again=document.querySelector('.play-again');
    exit=document.querySelector('.exit');
    let score1=document.getElementById("score1");
    let your_score=document.getElementById("scoreCont");
    obstacle=document.querySelector('.obstacle');
    dx=parseInt(window.getComputedStyle(mario,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(mario,null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
    if(offsetX<73&&offsetY<130)
    {
        gameOver.style.visibility='visible';
        play_again.style.visibility='visible';
        exit.style.visibility='visible';
        score1.style.visibility='visible';
        your_score.style.visibility='hidden';
        obstacle.classList.remove('obstacleAni');
        setTimeout(()=>{
            backMusic.pause();
       },100);
        setInterval(()=>{
             audiogo.play();
        });
        if(score>0)
        score-=100;
        UpgradeScore(score);
        over=false;
        mario.style.left=245 +"px";  
    }else if(offsetX<145 && cross){
        score+=100;  
        UpgradeScore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
        }
}, 10); 
function UpgradeScore(score){
    scoreCont.innerHTML= "Your Score :"+score;
    score1.innerHTML= "Score: "+score;
}
