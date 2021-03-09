const cardArray = [ 
    {
        name:"chase",
        img: "chase.png",
        front:"paw-patrol.png",
    },
    {
        name:"eye",
        img: "eye.png",
        front:"MU.png",
    },
    {
        name:"james",
        img: "James.png",
        front:"MU.png",
    },
    {
        name:"marshall",
        img: "marshall.png",
        front:"paw-patrol.png",
    },
    {
        name:"mike",
        img: "mike.png",
        front:"MU.png",
    },
    {
        name:"purple",
        img: "purple.png",
        front:"MU.png",
    },
    {
        name:"rocky",
        img: "rocky.png",
        front:"paw-patrol.png",
    },
    {
        name:"skye",
        img: "skye.png",
        front:"paw-patrol.png",
    },
    {
        name:"strong",
        img: "strong.png",
        front:"MU.png",
    },{
        name:"twin",
        img: "twin.png",
        front:"MU.png",
    }
]

// shuffle cards from card array
const selectNumOfImgs = (cardArray, num) => {
    let shuffleCardArray = cardArray.sort(() => Math.random() - 0.5);
    // console.log(shuffleCardArray.slice(0, num));
    return shuffleCardArray.slice(0, num);
}

// duplicate the image chosen from shuffle card array
const getPairs = (shuffleCardArray) => {
    let getPairsArray = [];
    for (let i = 0; i< shuffleCardArray.length; ++i)
    {
        getPairsArray.push(shuffleCardArray[i]);
        getPairsArray.push(shuffleCardArray[i]);
    }
    // console.log(getPairsArray);
    return getPairsArray.sort(() => Math.random() - 0.5);
}

// go to next level after all cards are matched
// const nextLevel = () =>{
//     numOfCards = numOfCardsForEachLevel + 1;
// }

let numOfCardsForEachLevel = [3, 4, 5];
let numOfCards = 2;

let returnUnDuplicatedArray = selectNumOfImgs(cardArray, numOfCards);
let duplicateCurrArray = getPairs(returnUnDuplicatedArray);

let level=0;
// create a function that checks numofcards to set level and set number of cards
// $(function loading() {
//  if (numofcards====0) {
//      numofcards =2;
//  }
// })

//Using Jquery to create elements
$(function() {
    
    $("<section>", {
      class: "grid",
    }).appendTo("#game"); 
    duplicateCurrArray.forEach(item=>{
    $("<div>", {
        class: "card",
        dataName: item.name,
        "data-iscardmatch": "notmatch",
            // isCardMatch: false,
            // text: item.name,
    }).append(
    $("<div>", {
        class: "front",
        css: {
        "background-image": `url(../img/${item.front})`,
    }
    })
    ).append(
    $("<div>", {
        class: "back",
        css: {
        "background-image": `url(../img/${item.img}`,
    }
    })
    ).appendTo("section");
    })
})

let flippedCard = false; 
let firstCard = "";
let secondCard = "";
let score =0;

// add onclick listener to div with class="card"
$(()=> {
    $(".card").on("click", (event)=>{
      $(event.currentTarget).toggleClass("selected");

      // IF two cards selected
      if ($(".selected").length === 2) {
          if ($(".selected").first().attr("dataname") === 
          $(".selected").last().attr("dataname")) {
              console.log("match");
              $(".selected").first().attr("data-iscardmatch", "match");
              $(".selected").last().attr("data-iscardmatch", "match");
              $(".selected").first().off("click");
              $(".selected").last().off("click");
              $(".selected").first().addClass("match");
              $(".selected").last().addClass("match");
              $(".selected").first().removeClass("selected");
              $(".selected").last().removeClass("selected");
              
              // create score function and put here
              if (score === 0 ){
              $("#score").text(score + 100);
              } else 
                console.log("score increased!");
                $("#score").text(score += 100);
               

          } else
              console.log("not match");

          

      // if 1 card selected, do nothing
      } else if ($(".selected").length <2){
        //console.log($(".selected").last().attr("dataname"));

      // if more than two cards selected, we remove selected class
      }else {
        //   $('.card [data-i   cardmatch=notmatch]').removeClass("selected");
        let notmatching = $('.card').filter(function(){
                    return $(this).attr('data-iscardmatch') == "notmatch"
                });
        notmatching.removeClass("selected");
      }
    //   console.log($(".match").length);
    //console.log(duplicateCurrArray.length);

    if (duplicateCurrArray.length === $(".match").length) {
        
        console.log("all cards are matched");
        $("#complete").text("Congrats for clearing level 1!");
        // function called here

        
    } 
      
    })
})


//Timer Function setting seconds to mintues
let sec =0;
function pad (val){ return val > 9 ? val: "0" + val }
setInterval(function() {
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
    
}, 1000);




    


    //     if ('currentLevel') === 5){
    //         alert(`Congrats in clearing all levels!`)
    //         // resetToLevel1();
    //     } else{
    //         let currentleveldisplay = parseInt(localStorage.getItem('currentLevel'));
    //         alert(`Congrats in clearing level ${currentleveldisplay}`)
    //         goToNextLevel();// goToNextLevel(); After alert, we increase level += 1
    //         location.reload();
            
    //         // resetToLevel1();
    //     }
    //   }

    
    

    
  

          // $(event.currentTarget).attr("dataname");
        // $(event.currentTarget).attr("dataname");
        // $(`[dataname=${firstCard}]`).off("click");
        // $(`[dataname=${firstCard}]`).removeClass("selected")

