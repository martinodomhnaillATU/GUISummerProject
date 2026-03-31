let img = ['<img src="images/runners.png">','<img src="images/shoes.jpg">','<img src="images/socks.jpg">'];

let index = 0;

document.getElementById("img").innerHTML = img[2];
function showImg()
{
    document.getElementById("img").innerHTML = img[index];
    if (index === img.length-1){
        index = 0;
    }
    else{
        index++;
    }
}