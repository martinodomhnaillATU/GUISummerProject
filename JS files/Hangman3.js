//whole code written by Rio Luis
document.getElementById("RoundsPlayed").innerHTML = localStorage.gamesPlayed;
document.getElementById("sum").innerHTML = localStorage.pointsObtained;
document.getElementById("maxScore").innerHTML = localStorage.maxPoints;
function clearance()
{
    localStorage.clear();
}