const words = [
  "apple","banana","orange","grape","cherry","mango","peach","apricot","coconut","papaya",
  "vehicle","bicycle","scooter","subway","rocket","airplane","helicopter","tramway","sailboat","spaceship",
  "furniture","cabinet","bookshelf","drawer","mirror","carpet","cushion","wardrobe","nightstand","tabletop",
  "elephant","giraffe","kangaroo","alligator","chimpanzee","dolphin","penguin","rhinoceros","salamander","porcupine",
  "crimson","turquoise","magenta","indigo","emerald","violet","scarlet","charcoal","lavender","maroon",
  "joyful","melancholy","furious","delighted","anxious","confident","fearless","graceful","curious","restless",
  "melody","harmony","rhythm","guitarist","pianist","violinist","percussion","symphony","orchestra","composer",
  "waterfall","mountain","volcano","rainforest","desert","island","valley","glacier","canyon","plateau",
  "education","knowledge","assignment","notebook","curriculum","lecture","homework","examination","research","scholar"];
localStorage.gamesPlayed = 0;
localStorage.pointsObtained = 0;
localStorage.maxPoints = 0;
  let n1,n=0,i,word1,letters = "",sum=0,maximumScore=0,j;
function rounds()
{
    n++;
    
    
    
    
        document.getElementById("guessBtn").disabled = false;
        n1 = Math.floor(Math.random()*100);
        word1 = words[n1];
        letters = word1.charAt(0)+" ";
        maximumScore += word1.length*5;
        document.getElementById("RoundNo").innerHTML = "Round "+i;
        for(let k = 1; k <= word1.length - 1; k++)
        {
            letters += "_ ";
        }
        document.getElementById("word").innerHTML = letters;
        document.getElementById("placeholder").innerHTML = "";
        document.getElementById("img").innerHTML = "<img src='hangmanStart.jpg' width='200px' height='200px'>";
        j = 1;
    
    
    
}

        
        
            function hangman()
            {
                
                let word2 = document.getElementById("guess").value.toLowerCase();
                if(word1 === word2)
                {
                    document.getElementById("edit").innerHTML="Well done! You guessed it correctly!";
                    sum = maximumScore;
                    j = 6;
                    document.getElementById("button").innerHTML = "<p id='buttons2'><button onclick='clearAll()' id='refresh'>Play Again</button><a href='Hangman3.html'><button id='b2'>Display Results</button></a></p>";
                    document.getElementById("b2").style.color = "blue";
                    document.getElementById("b2").style.backgroundColor = "white";
                    document.getElementById("b2").style.textAlign = "center";
                    document.getElementById("refresh").style.color = "white";
                    document.getElementById("refresh").style.backgroundColor = "green";
                    document.getElementById("refresh").style.textAlign = "center";
                    document.getElementById("buttons2").style.textAlign = "center";

                }
                else
                {

                    j++;
                    letters = word1.charAt(0)+" ";
                    for(let k = 1;  k < word1.length; k++)
                    {
                        
                        
                            if(word2.includes(word1.charAt(k)))
                            {

                                sum += 5;
                                letters += word1.charAt(k);
                            }
                            else
                                letters += "_ ";
                        
                    }
                    document.getElementById("word").innerHTML = letters;
                    switch(j)
                    {
                        case 1:
                        document.getElementById("img").innerHTML = "<img src='hangman1.jpg' width='200px' height='200px'>";
                        break;
                        case 2:
                        document.getElementById("img").innerHTML = "<img src='hangman2.jpg' width='200px' height='200px'>";
                        break;
                        case 3:
                        document.getElementById("img").innerHTML = "<img src='hangman3.jpg' width='200px' height='200px'>";
                        break;
                        case 4:
                        document.getElementById("img").innerHTML = "<img src='hangman4.jpg' width='200px' height='200px'>";
                        break;
                        case 5:
                        document.getElementById("img").innerHTML = "<img src='hangman5.jpg' width='200px' height='200px'>";
                        break;
                        case 6:
                        document.getElementById("img").innerHTML = "<img src='hangman6.jpg' width='200px' height='200px'>";
                        document.getElementById("edit").innerHTML = "You're out of guesses!! The correct answer was: "+word1;
                        document.getElementById("button").innerHTML = "<button onclick='clearAll()' id='refresh'>Play Again</button><a href='Hangman3.html'><button id='b2' onclick='finalStorage()'>Display Results</button></a>";
                        document.getElementById("b2").style.color = "blue";
                        document.getElementById("b2").style.backgroundColor = "white";
                        document.getElementById("b2").style.textAlign = "center";
                        document.getElementById("refresh").style.color = "white";
                        document.getElementById("refresh").style.backgroundColor = "green";
                        document.getElementById("refresh").style.textAlign = "center";
                        break;

                    }
                }
            }
            function clearAll()
            {
                document.getElementById("RoundNo").innerHTML = "";
                document.getElementById("word").innerHTML = "";
                document.getElementById("img").innerHTML = "";
                document.getElementById("edit").innerHTML = "";
                document.getElementById("button").innerHTML = "";
            }
            function finalStorage()
            {
                localStorage.gamesPlayed = n;
                localStorage.pointsObtained = sum;
                localStorage.maxPoints = maximumScore;
            }




        
        
    
