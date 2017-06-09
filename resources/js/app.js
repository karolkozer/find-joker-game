var gameDataController = (function(){
        
    // Pick random number
    var pickedNumber = function(){
        var random = Math.floor(Math.random() * 6);
        return random;
    }
    
    return {
        
        getPickedNumber: function(){
            return pickedNumber();
        }
        
    }
    
})();

var gameUI = (function(){
   
    var DOMstring = {
        homePage: ".section-home-page",
        gamePage: ".section-game",
        gameEndPage: ".section-game-end",
        btnStart: ".btn-start",
        cardContainer: ".card-container",
        gameElements: ".game-elements",
        cardBox: ".card-box",
        card: ".card",
        frontFace: "#front-face",
        joker: ".joker",
        post: ".post",
        backFace: "#back",
        audioGameEnd: "#video"
    }
    
    return {
        
        display: function(element, name){
            document.querySelector(element).style.display = name;
        },
        
        addCards: function(){
            var html;
            
            for(var i = 0; i < 6; i++){
                html = '<div class="card-box"><div class="card"><div class="front face"><img src="resources/img/face-cover.png" alt="Face" id="front-' + i +'"></div><div class="back face"><img src="resources/img/back-face.png" alt="" id="back"></div></div></div>'
                
                document.querySelector(DOMstring.cardContainer).insertAdjacentHTML("beforeend", html);
            }
        },
        
        displyAnimation: function(element, anim){
            document.querySelector(element).style.webkitAnimationName = anim;
        },
        
        jokerCover: function(id){
            document.querySelectorAll(DOMstring.backFace)[id].src = "resources/img/joker-back-face.png";
        },
        
        getDOM: function(){
            return DOMstring;
        }

    }
})();

var audioController = (function(){
    var audioSound = {
        audioHomePage: "#audio-home-page",
        audioClickSound: "#click-sound",
        audioEndGame: "https://www.youtube.com/embed/8jutkNkVgXQ?autoplay=1"
    }
    
    return {
        getMusic: function(){
            return {
                backgroundMusic: document.querySelector(audioSound.audioHomePage),
                clickSound: document.querySelector(audioSound.audioClickSound),
            }
        },
        
        getAudioSound: function(){
                return audioSound;
            }
    }
})();

var appController = (function(gameDataCrtl, UICtrl, audioCrtl){
    var DOM, cards, magicNumber, card, audioSound, gameOver, postTexts, itemID, spliID, ID;
    
    // Get Audio
    audioSound = audioCrtl.getAudioSound();
    
    // Get DOM
    DOM = UICtrl.getDOM();
    
    // Get Picked number
    magicNumber = gameDataCrtl.getPickedNumber();
    
    gameOver = false;
    
    // Set timer blueprint
     var timer = function(el, name, time){
        setTimeout(function(){
            UICtrl.display(el, name);
        }, time);
    }
    
    var winner = function(id){
        console.log("Great!!!");
        UICtrl.jokerCover(id);
        timer(DOM.gamePage, "none", 1500)
        timer(DOM.gameEndPage, "block", 1500);
        document.querySelector(DOM.audioGameEnd).src = audioSound.audioEndGame;
    }
    
    var frontFaceBack = function(el){
        card = document.querySelectorAll(DOM.card);
        setTimeout(function(){
            card[el].classList.toggle("flipped");
        }, 800);
    }
    
    // Flip the cube
    var flip = function(el){
        card = document.querySelectorAll(DOM.card);
        card[el].classList.toggle("flipped");
    }
    
    var check = function(el){
        
        // Check if number is equal to the picked number
        if(el === magicNumber){
               winner(el);
                gameOver = true;
            }else{
                frontFaceBack(el);
                UICtrl.displyAnimation(DOM.joker, "display");
            }
    }
        
    var gameController = function(event){
        
        // Play sound 
        audioCrtl.getMusic().clickSound.play();
        
        itemID = event.target.id;
        
        // Chek if it is not gameover
        if(!gameOver){
            if(itemID){
                spliID = itemID.split("-");
                ID = parseInt(spliID[1]);
                console.log(ID);
                flip(ID);
                check(ID);
            }
        }
    };
    
    var start = function(){
        audioCrtl.getMusic().clickSound.play();
        UICtrl.display(DOM.homePage, "none");
        UICtrl.display(DOM.gamePage, "block");
        UICtrl.addCards();
        UICtrl.displyAnimation(DOM.cardContainer, "display");
        console.log("this is picked number " + magicNumber);
        console.log("Clicked");
    };
    
    var setUpButtons = function(){
        document.querySelector(DOM.btnStart).addEventListener("click", function(){
            start();
        });
        
        document.querySelector(DOM.cardContainer).addEventListener("click", gameController);  
      
    }
    
    return {
        init: function(){
            console.log("App is working");
            setUpButtons();
        }
    }
})(gameDataController, gameUI, audioController);

appController.init();







