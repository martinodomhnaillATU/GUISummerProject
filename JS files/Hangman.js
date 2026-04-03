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
  let n1,n,i,word1,letters = "",sum=0,maximumScore=0;
function rounds()
{
    n = document.getElementById("n").value;
    
    
    for(let i = 1 ; j <= n ; i++)
    {
        
        n1 = Math.floor(Math.random()*100);
        word1 = words[n1];
        letters += word1.charAt(0)+" ";
        maximumScore += word1.length*5;
        document.getElementById("RoundNo").innerHTML = "Round "+i;
        for(let j = 1; j <= word1.length - 1; j++)
        {
            letters += "_ ";
        }
        document.getElementById("word").innerHTML = letters;
        document.getElementById("placeholder").innerHTML = "";
        document.getElementById("img").innerHTML = "<img src='hangmanStart.jpg' width='200px' height='200px'>"

        let j = 1;
        while(j <= 6)
        {
            function hangman()
            {
                
                let word2 = document.getElementById("guess").value.toLowerCase();
                if(word1 === word2)
                {
                    document.getElementById("edit").innerHTML="Well done! You guessed it correctly!";
                    sum = maximumScore;
                    j = 6;

                }
                else
                {

                    j++;
                    letters = word1.charAt(0)+" ";
                    for(let k = 1;  k < word1.length; k++)
                    {
                        
                        
                            if(word2.contains(word1.charAt(k)))
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
                        break;

                    }
                }
            }




        }
        localStorage.gamesPlayed = n;
        localStorage.pointsObtained = sum;
        localStorage.maxPoints = maximumScore;
        document.getElementById("button").innerHTML = "<a href='Hangman3.html'><button id='b2'>Display Results</button></a>";
        document.getElementById("b2").style.color = "blue";
        document.getElementById("b2").style.backgroundColor = "white";
        document.getElementById("b2").style.textAlign = "center";
    }
}