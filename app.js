let DOMscore=document.querySelector('#score');
let DOMnewgame=document.querySelector('#newgame')
let DOMallCards=document.querySelectorAll('.sq')
let DOMwinMessage=document.querySelector('#winmessage')
const cardArray=[
    {
        name:'cheeseburger',
        img:'images/cheeseburger.png'
    },
    {
        name:'fries',
        img:'images/fries.png'
    },
    {
        name:'fries',
        img:'images/fries.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    },
    {
        name:'cheeseburger',
        img:'images/cheeseburger.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    }
]
//global variables initialization
let cardstorage=[] //stores details of cards chosen currently by user
let cardsWon=[] //stores all cards won
let counter=0 //counts number of times user makes a wrong match
//flips the card
const changeBackground=async(img_address)=>{
    let f0=cardstorage[0].cardnum
    let f1=cardstorage[1].cardnum
    await new Promise((res)=>{
        setTimeout(function(){
        document.querySelectorAll('.sq')[f0].style.backgroundImage=img_address
        document.querySelectorAll('.sq')[f1].style.backgroundImage=img_address
        res('')
    },1000)
    })
}
//checks win
const checkWin=(score)=>{
    if(score==(cardArray.length)/2){
        DOMwinMessage.style.display="block"
        DOMwinMessage.textContent="GAME OVER!!"
    }
}
const changeScore=()=>{
    let k
    if((cardsWon.length/2)>=3){
        k=30
    }
    else{
        k=20
    }
    if(((cardsWon.length/2)*50)-(counter*k)<0){
        DOMscore.textContent=0
    }
    else{
        DOMscore.textContent=((cardsWon.length/2)*50)-(counter*k)
    }
}

//controls game working
const operate=(n)=>{
  //changes background of clicked image
  document.querySelectorAll('.sq')[n].style.backgroundImage = `url('${cardArray[n].img}')`
    cardstorage.push({name: cardArray[n].name,
                    cardnum: n})
    if(cardstorage.length===2){
        let f0=cardstorage[0].cardnum
        let f1=cardstorage[1].cardnum
        if(cardstorage[0].name===cardstorage[1].name && f0!=f1){  
            changeBackground(`url('images/white.png')`).then(()=>{
                cardsWon.push(f0)
                cardsWon.push(f1)
                changeScore()
                checkWin(cardsWon.length/2)
            }) 
        }
        else{
            counter+=1
            if(cardstorage[0].cardnum==cardstorage[1].cardnum){
                alert(`You have clicked the same image twice!`)
            }                                           
            changeBackground(`url('images/blank.png')`).then(()=>{
                changeScore()
            })
        }
        cardstorage.length=0
    }
}

//resets everyting to default
const newgame=()=>{
cardArray.sort(()=>0.5-Math.random())
DOMwinMessage.style.display="none"
//score=0;
counter=0
cardstorage.length=0
cardsWon.length=0
DOMscore.textContent=cardsWon.length/2;
//makes all cards face backwards 
for(let i=0;i<DOMallCards.length;i++){
    DOMallCards[i].style.backgroundImage=`url('images/blank.png')`
}
}
newgame() 

//listens the click event 
for(let i=0;i<DOMallCards.length;i++){
    DOMallCards[i].addEventListener('click',()=>{
        if(!cardsWon.includes(i)){
            operate(i)
        }
    })
}
