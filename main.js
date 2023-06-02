let screen1 = document.querySelector('#screen1');
let screen2 = document.querySelector('#screen2');
let screen3 = document.querySelector('#screen3');
let gamescreen = document.querySelector('#gamescreen');
let gameoverScreen = gamescreen.querySelector('.gameover');
let playButton = document.querySelector("#play-button");
let cat = gamescreen.querySelector(".jimjam");

let interval;
let playing = false;
let lives = 3;
let score = 0;

let livesbox = gamescreen.querySelector(".lives-box");
let scoreValue = gamescreen.querySelector(".score-value");

// Cat needs to be between 0 and 500px
// Step needs to be between 1 and 6 every 10ms

screen1.querySelector("#help-btn").addEventListener("click",()=>{
    screen1.classList.add("hide");
    screen2.classList.remove("hide");
})

screen2.querySelector(".prev").addEventListener("click",()=>{
    screen2.classList.add("hide");
    screen1.classList.remove("hide");
})

screen2.querySelector("#about-btn").addEventListener("click",()=>{
    screen2.classList.add("hide");
    screen3.classList.remove("hide");
})

screen3.querySelector(".prev").addEventListener("click",()=>{
    screen3.classList.add("hide");
    screen2.classList.remove("hide");
})

playButton.addEventListener("click", ()=>{
    screen1.classList.add("hide");
    gamescreen.classList.remove("hide");


    if(!playing){
        
        // Setup Lives
        for(let i = 0; i < lives; i++){
            livesbox.appendChild(createLifeElement());
        }

        // Display Score
        scoreValue.innerHTML = score;

        sendCat();

    }
})

gamescreen.querySelector(".reset-button").addEventListener("click",()=>{
    location.reload();
})



function createLifeElement(){
    let life = document.createElement("i");
    life.setAttribute("class","fa-solid fa-heart");
    return life;
}

function removeLifeElement(parent){
    parent.removeChild(parent.lastElementChild);
}

function sendCat(){

    let step = Math.floor((Math.random() * 6)) + 5;
    let left = Math.floor((Math.random() * 501));
    let top = -50;
    cat.style.left=`${left}px`;
            interval = setInterval(()=>{
                cat.style.top = `${top+=step}px`;
    
                if(top > gamescreen.offsetHeight){
                    removeLifeElement(livesbox);
                    lives-=1;
                    clearInterval(interval);

                    if(lives > 0)
                        sendCat();
                    else{
                        gameoverScreen.classList.remove("hide");
                    }
                }
            }, 10);
}

cat.addEventListener("mouseenter",()=>{
    clearInterval(interval);
    score += 1;
    scoreValue.innerHTML=score;
    sendCat();
    
})

