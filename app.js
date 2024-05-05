let userseq=[];
let gameseq=[];
let btns=["yellow","red","green","purple"];
let highestscore=getHighestScore();//0

let started=false;
let level=0;
function getHighestScore() {
    const storedScore = localStorage.getItem("highestscore");
    return storedScore ? parseInt(storedScore) : 0;
}
//game start
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelup();
    }
});

function flashbtn(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randidx=Math.floor(Math.random()*3);
    let randcol=btns[randidx];
    let randbtn=document.querySelector(`.${randcol}`);
    //console.log(randidx);
    //console.log(randcol);
    //console.log(randbtn);
    gameseq.push(randcol);
    console.log(gameseq);
    flashbtn(randbtn);
}

function checkAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup, 1000);
        }
    }
    else{
        alert(`Game over Your Score was ${level} Press any to start the game !`);
         h2.innerHTML=`Game over Your Score was <b>${level}</b> <br>Press any to start the game !`;
         document.querySelector("body").style.backgroundColor="red";
         setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
         },750);
         if(level>highestscore){
            highestscore=level;
            localStorage.setItem("highestscore", highestscore.toString());
            updatehighestscore();
        }
         reset();
    }
}
function btnpress(){
   let  btn=this;
    flashbtn(btn);
    usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    
    checkAns(userseq.length-1);
}

let alBtns=document.querySelectorAll(".btn");
for( btn of alBtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
    updatehighestscore();
}

function updatehighestscore(){
    document.getElementById("highestscore").innerText=`Highest Score = ${highestscore}`;
}
updatehighestscore();