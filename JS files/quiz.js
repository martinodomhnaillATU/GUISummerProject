let img = [
  '<img src="/images/quiz images/avocado.jpg" class="quiz-img">',
  '<img src="/images/quiz images/compass.jpg" class="quiz-img">',
  '<img src="/images/quiz images/feather.jpg" class="quiz-img">',
  '<img src="/images/quiz images/hourglass.jpg" class="quiz-img">',
  '<img src="/images/quiz images/microscope.jpg" class="quiz-img">',
  '<img src="/images/quiz images/shoes.jpg" class="quiz-img">',
  '<img src="/images/quiz images/stapler.jpg" class="quiz-img">',
  '<img src="/images/quiz images/telescope.jpg" class="quiz-img">',
  '<img src="/images/quiz images/tower.webp" class="quiz-img">',
  '<img src="/images/quiz images/typewriter.jpg" class="quiz-img">',
];
let answers = [
  ['avocado'],
  ['compass'],
  ['feather'],
  ['hourglass', 'sand timer'],
  ['microscope'],
  ['shoes', 'sneakers', 'trainers'],
  ['stapler'],
  ['telescope'],
  ['tower', 'eiffel tower'],
  ['typewriter'],
];
let index = 0;
let correct = 0;
let incorrect = 0;
let score = 0;
function playAgain()
{
    //resetting everything
    index = 0;
    correct = 0;
    incorrect = 0;
    score = 0;
    document.getElementById("img").innerHTML = img[0];
    document.getElementById("result").innerHTML = "";
    document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    document.getElementById("score").innerHTML=score;
}

document.getElementById("img").innerHTML = img[0];

//checks if answer is correct

function checkAnswer()
{
    let inputField = document.getElementById("answer1").value;
    let answer = inputField.toLowerCase().trim();

    //tells user the answer is correct or wrong and giving them a score
    if (answers[index].includes(answer)){
        document.getElementById("result").innerHTML = "CORRECT!!";
        correct++;
        score+=10;
    }
    else{
        document.getElementById("result").innerHTML = "FAIL!";
        incorrect++;
    }

    //moving to the next picture
    index++;

    //checking if the user has reached the end of the quiz
    if(index<img.length){
        document.getElementById("img").innerHTML = img[index];
    }
    else{
        document.getElementById("result").innerHTML = "Quiz Finished.";
    }

    inputField.value = "";//clearing the input field
    answer.value = "";
    showScore();
}
//showing scores
function showScore()
{
    document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    document.getElementById("score").innerHTML=score;
}




