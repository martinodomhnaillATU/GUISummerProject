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
  let n1,n,i,word1,length = "";
function rounds()
{
    n = document.getElementById("n").value;
    
    n1 = Math.floor(Math.random()*100);
    word1 = words[n1];
    length += word1.charAt(0)+" ";
    
    document.getElementById("RoundNo").innerHTML = "Round 1";
    for(let j = 1; j <= word1.length - 1; j++)
    {
        length += "_ ";
    }
    document.getElementById("word").innerHTML = length;
    document.getElementById("placeholder").innerHTML = "";

}

    
    function hangman()
    {
        
        let word2 = document.getElementById("guess").value.toLowerCase();
        if(word1 === word2)
        {
            document.getElementById("edit").innerHTML="Well done you guessed it correctly.Refresh the web page to play again";
        }
        else
        {

            i++;
            if(i == 6)
                document.getElementById("edit").innerHTML = "You lose. Game Over. The number was "+n1;
            else if(n1 > n2)
                document.getElementById("edit").innerHTML = "Too low. Try again";
            else
                document.getElementById("edit").innerHTML = "Too high. Try again";
            switch(i)
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