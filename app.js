let gameseq=[];
let userseq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){console.log("game started");
    started=true;

    levelUp();}
});

function gameFlash(btn){ //button pressed by the game
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){ //button pressed by the user
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random button flash
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

function checkAns(idx){
    // console.log("curr level : ", level);
    // let idx=level-1;
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            // console.log("same value");
            setTimeout(levelUp, 1000);
            // levelUp();
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){  
    // console.log(this);
    let btn=this;

    userFlash(btn);  

    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    // console.log(usercolor);

    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

// Track highest score