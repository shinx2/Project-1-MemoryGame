const cardArray = [ 
    {
        name:"professor",
        img: "professor.png",
        front:"MU.png",
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
        name:"two",
        img: "two.png",
        front:"MU.png",
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
        name:"bird",
        img: "bird.png",
        front:"MU.png",
    },
    {
        name:"miketwo",
        img: "miketwo.png",
        front:"MU.png",
    },
    {
        name:"strong",
        img: "strong.png",
        front:"MU.png",
    },
    {
        name:"twin",
        img: "twin.png",
        front:"MU.png",
    }, 
    {
        name:"logo",
        img: "logo.png",
        front:"MU.png",
    }, 

]


$(()=> {  
    let sec = 0;
    let name = "";
    let level = 1;
    let score = 0;
    let numOfCards = 2;
    let returnUnDuplicatedArray =[];
    let duplicateCurrArray=[];

    
    //Shuffle cards from card array
    const selectNumOfImgs = (cardArray, num) => {
        let shuffleCardArray = cardArray.sort(() => Math.random() - 0.5);
        // console.log(shuffleCardArray.slice(0, num));
        return shuffleCardArray.slice(0, num);   
    }
  

    //Duplicate the image chosen from shuffle card array
    const getPairs = (shuffleCardArray) => {
        let getPairsArray = [];
        for (let i = 0; i< shuffleCardArray.length; ++i) {
            getPairsArray.push(shuffleCardArray[i]);
            getPairsArray.push(shuffleCardArray[i]);
        }
        // console.log(getPairsArray);
        return getPairsArray.sort(() => Math.random() - 0.5);
    }
  

    const loadGameSection = () => {
      //Assign array length based on levels
      returnUnDuplicatedArray = selectNumOfImgs(cardArray, numOfCards);
      duplicateCurrArray = getPairs(returnUnDuplicatedArray);
      

      // $("#nameinput").text("");
      //To display current level
      $("#level").text(level);
      

      //Create section with class 
      $("<section>", {
        class: "grid",
      }).appendTo("#game"); 
      duplicateCurrArray.forEach(item=>{
      $("<div>", {
          class: "card",
          dataName: item.name,
          "data-iscardmatch": "notmatch",
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
          "background-image": `url(../img/${item.img})`,
      }
      })
      ).appendTo("section");
      })


      $(".card").on("click", (event)=>{
        $(event.currentTarget).toggleClass("selected");

        //Set audio when flip card 
        let sound = new Audio("audio/flip-effect.mp3"); {
          $(".card").on("click", new Audio);
          sound.play();
        }

        //Set audio when level complete
        let levelUp = new Audio("audio/nextlevel-effect.mp3") 


       // If two cards selected
        if ($(".selected").length === 2) {
            if ($(".selected").first().attr("dataname") === 
            $(".selected").last().attr("dataname")) {
                // console.log("match");
                // $(".selected").first().attr("data-iscardmatch", "match");
                // $(".selected").last().attr("data-iscardmatch", "match");
                $(".selected").first().off("click");
                $(".selected").last().off("click");
                $(".selected").first().addClass("match");
                $(".selected").last().addClass("match");
                $(".selected").first().removeClass("selected");
                $(".selected").last().removeClass("selected");
                
                //Score +100 whenever two card matches
                $("#score").text(score+=100);
  
            } else{
                //  console.log("not match");
                //Cards to auto flip back if not match 
                setTimeout(() => {
                  $(".selected").removeClass("selected");
                }, 800);
            }
        //If 1 card selected, do nothing
        } else if ($(".selected").length <2) {
  
        
        //If more than two cards selected, remove selected class
        } else {
          let notMatching = $('.card').filter(function(){
              return $(this).attr('data-iscardmatch') == "notmatch"
            });
              notMatching.removeClass("selected");
          }

        //If all cards matches 
      if (duplicateCurrArray.length === $(".match").length) {
        levelUp.play();
        $("#complete").text("Congrats for clearing the level!");
        $(".next").show();


          //When game complete 
          if ( level === 6) {
            $("#complete").hide();
            $(".next").hide();
            // Display message with score and time taken to complete game after 1 secs 
            setTimeout(() => {
            $(".main").hide();
            $("#game").hide();
            $("#table").hide();
            $(".congrats").show().text(`Congrats for clearing the all the levels! Your score was ${score}! You took ${sec} seconds.`);
            $(".playagain").show()
            $(".playagain").click(() => {
              resetDefault();
              $(".playagain").hide();
              $(".congrats").hide();
            });
            }, 1000);
          }
          //  else{
          //   $("#complete").text("Congrats for clearing the level!");
          // }
      } 
      })
      }
    

      $(".next").on("click",() => {
        $(".next").hide();
          $("section").remove();
          // Empty text at every level
          $("#complete").text("");
          numOfCards += 1;   
          returnUnDuplicatedArray =[];
          duplicateCurrArray=[];
          level += 1;
          loadGameSection();
     });


    const resetDefault = () => {
            $("section").remove();
       
       //Set everything to default. Hide game section and show main section
       numOfCards = 2; 
       level = 1
       score = 0;
       sec = 0;
       returnUnDuplicatedArray =[];
       duplicateCurrArray = [];
       $("#complete").text("");
       $("#score").text("");
       $(".main").show();
       $("#game").hide();
       $("#table").hide();
       $(".next").hide();
       $(".playagain").hide();
       loadGameSection();
     }
    

       //On first page 
        $("#game").hide();
        $("#table").hide();
        $(".next").hide();
        $(".playagain").hide();
        $("#start").on("click", () => {
        //Set the input name to our name variable
          name = $("#nameinput").val();
        // console.log($("#nameinput").val())
          $(".main").hide();
          $("#game").show();
          $("#table").show();
          $(".next").hide();
          $("#name").text(name);
        })

        loadGameSection();
    

    // Timer function
    const time = (val) => { 
      if (val > 9) {
        return val
      } else
      return '0' + val}
    setInterval(() => {
      $("#seconds").html(time(++sec%60));
      $("#minutes").html(time(parseInt(sec/60,10)));
    }, 1000);
  })