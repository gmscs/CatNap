/*
 *
 * We save the telemetry data in local storage as well for backup.
 * This way we have files + local storage.
 * 
 */
function exportLocalStorage() {

    const link = document.createElement("a");
    link.style.display = "none";

    var hsInfo = localStorage.getItem('highscores'); //change to specific info on high scores
    var boostInfo = localStorage.getItem('boosters');
    if(collectPathData) var pathing = localStorage.getItem('pathing'); //dont know if this will be used
    var screens = localStorage.getItem('screens');
    var times = localStorage.getItem('times');
    var cheesedoortimes = localStorage.getItem('cheesedoortimes');

    var blob = new Blob([boostInfo, screens, times, cheesedoortimes, hsInfo], {type: "text/txt"});
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "file.txt";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}

function setCheeseDoorTimes() {
    cheesedoorTimes.push(cheesedoorTimesSession);
    localStorage.setItem('cheesedoortimes', JSON.stringify(cheesedoorTimes));
}

function setTimeInfo() {
    levelTimes.push(levelTimesInfoSession);
    localStorage.setItem('times', JSON.stringify(levelTimes));
}

function setScreensChecked() {
    screensChecked.push([helpChecked, scoresChecked, creditsChecked]);
    localStorage.setItem('screens', JSON.stringify(screensChecked));
}

function setBoosterInfo() {
    boosterInfo.push([totalBoosters, usedBoosters, collectedBoosters, shieldsTotal, jellosTotal, yarnsTotal, shieldsUsed, jellosUsed, yarnsUsed]);
    localStorage.setItem('boosters', JSON.stringify(boosterInfo));
}

function savePosition(positionX, positionY) {
    let cell_positionX = (positionX - 13.75) / 27.5;
    let cell_positionY = (positionY - 8.75) / 17.5;
    let cell = [cell_positionX, cell_positionY];

    path.push(cell);
}

function exportTotalPath() {
    localStorage.setItem('pathing', JSON.stringify(pathsLevels));
}

function roundTime(time) {
    return Math.ceil(time * 10) / 10;
}

function saveToLocalStorage() {
    console.log("Saving...");
    setBoosterInfo();
    setScreensChecked();
    setTimeInfo();
    setCheeseDoorTimes();
    if(collectPathData) exportTotalPath();
    console.log("Saved!");
}