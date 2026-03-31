let i = 0;
    let n1 = Math.floor(Math.random()*100)+1;
    function hangman()
    {
        
        let n2 = Number(document.getElementById("val").value);
        if(n1 == n2)
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