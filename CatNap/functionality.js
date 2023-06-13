function collectCheese (mouse, cheese) {
    cheese.disableBody(true, true);
    cheeseCount--;
}

function hitBell (mouse, bell) {
    caught = true;
    endLevel();
}

/*
 * Checks the list of objects the mouse can hide behind to see
 * if the mouse is currently hiding.
 */
function isHiding(mouse, game) {
    var found = false;
    hideables.forEach(function(thing) { 
        if(game.physics.overlap(mouse, thing)) found = true; 
    });
    return(found);
}

function clearLevel() {
    platforms.getChildren().forEach(function(child) { child.destroy(); });
    platforms.clear(true);
    movableTrains.getChildren().forEach(function(child) { child.destroy(); });
    movableTrains.clear(true);
    movablePlatforms.getChildren().forEach(function(child) { child.destroy(); });
    movablePlatforms.clear(true);
    cheeses.getChildren().forEach(function(child) { child.destroy(); });
    cheeses.clear(true);
    bells.getChildren().forEach(function(child) { child.destroy(); });
    bells.clear(true);
    boxes.getChildren().forEach(function(child) { child.destroy(); });
    boxes.clear(true);
    shields.getChildren().forEach(function(child) { child.destroy(); });
    shields.clear(true);
    jellos.getChildren().forEach(function(child) { child.destroy(); });
    jellos.clear(true);
    yarns.getChildren().forEach(function(child) { child.destroy(); });
    yarns.clear(true);
    bell_hitboxes.getChildren().forEach(function(child) { child.destroy(); });
    bell_hitboxes.clear(true);

    activated_items.forEach(function(item) { item.destroy(); });
    timeText.destroy();
    levelText.destroy();
    shieldText.destroy();
    jelloText.destroy();
    yarnText.destroy();

    if(doorSpawned) door.destroy();
    doorSpawned = false;

    trainOrigins = [];
    trainMoves = [];
    movePoint = [];
    originPoint = [];
    objective = [];
    numMovingTrains = 0;
    platformOrigins = [];
    platformMoves = [];
    platMovePoint = [];
    platOrigPoint = [];
    platObjective = [];
    numMovingPlatforms = 0;
}

function clearScreen() {
    clearLevel();
    mouse.destroy();
    cat.destroy();
    scoreText.destroy();
    runtimeText.destroy();
    shieldText.destroy();
    yarnText.destroy();
    jelloText.destroy();
    if(awake) awake = false;

    inv_shields.getChildren().forEach(function(child) { child.destroy(); });
    inv_jellos.getChildren().forEach(function(child) { child.destroy(); });
    inv_yarns.getChildren().forEach(function(child) { child.destroy(); });
}

function buildLevel(currentLevel, game) {
    numMovingTrains = 0;
    numMovingPlatforms = 0;
    for (var i = 0; i < currentLevel.length; i++) {
        for (var j = 0; j < currentLevel[i].length; j++) {
            let x_coord = j * game.Grid.cell_width + game.Grid.cell_width / 2;
            let y_coord = i * game.Grid.cell_height + game.Grid.cell_height / 2;

            if(currentLevel[i][j] == '1') {
                shield_count = 0;
                shieldText = game.add.text(x_coord, y_coord, '0', { fontSize: '32px', fill: '#000000' });
                inv_shields.create(x_coord + (2.5 * game.Grid.cell_width), y_coord + (1 * game.Grid.cell_height), 'inv_shields');
                shieldText.setDepth(1);
                inv_shields.setDepth(1);
                shieldText.setText(shield_count);
            }
            if(currentLevel[i][j] == '2') {
                jello_count = 0;
                jelloText = game.add.text(x_coord, y_coord, '0', { fontSize: '32px', fill: '#000000' });
                inv_jellos.create(x_coord + (2.5 * game.Grid.cell_width), y_coord + (1 * game.Grid.cell_height), 'inv_jellos');
                jelloText.setDepth(1);
                inv_jellos.setDepth(1);
                jelloText.setText(jello_count);
            }
            if(currentLevel[i][j] == '3') {
                yarn_count = 0;
                yarnText = game.add.text(x_coord, y_coord, '0', { fontSize: '32px', fill: '#000000' });
                inv_yarns.create(x_coord + (2.5 * game.Grid.cell_width), y_coord + (1 * game.Grid.cell_height), 'inv_yarns');
                yarnText.setDepth(1);
                inv_yarns.setDepth(1);
                yarnText.setText(yarn_count);
            }
            if(currentLevel[i][j] == 'M') {
                game.Grid.placeObject(j, i, mouse);
            }
            if(currentLevel[i][j] == 'C') {
                game.Grid.placeObject(j, i, cat);
                cat.play('snooze');
                hitbox = game.physics.add.sprite(cat.x, cat.y, 'hitbox');
                hitbox.body.allowGravity = false;
                hitbox.setPushable(false);
                hitbox.visible = false;
            }
            if(currentLevel[i][j] == 'c') {
                cheeses.create(x_coord, y_coord, 'cheese');
                cheeseCount++;
            }
            if(currentLevel[i][j] == 'P') {
                platforms.create(x_coord, y_coord, 'platform');
            }
            if(currentLevel[i][j] == 'G') {
                platforms.create((x_coord-14), y_coord, 'ground');
                levelText = game.add.text(640, 665, 'Level: ' + (level+1), { fontSize: '32px', fill: '#999' });
                if(level == 0) {
                    runtimeText = game.add.text(640,630, 'Time:', { fontSize: '32px', fill: '#999' });
                    scoreText = game.add.text(840, 647, 'Score: 0', { fontSize: '32px', fill: '#999' });
                    runtimeText.setDepth(2);
                    scoreText.setDepth(2);
                }
            }
            if(currentLevel[i][j] == 'p') {
                platforms.create(x_coord, y_coord, 'smallPlatform');
            }
            if(currentLevel[i][j] == 'b') {
                bells.create(x_coord, y_coord, 'bell');
                bell_hitboxes.create(x_coord, y_coord, 'bell_hitbox');
            }
            if(currentLevel[i][j] == 'B') {
                boxes.create(x_coord, (y_coord-2), 'box');
            }
            if(currentLevel[i][j] == 'j') {
                totalBoosters++;
                jellosTotal++;
                jellos.create(x_coord, y_coord, 'jelloCoin');
            }
            if(currentLevel[i][j] == 's') {
                shieldsTotal++;
                totalBoosters++;
                shields.create(x_coord, y_coord, 'boxCoin');
            }
            if(currentLevel[i][j] == 't') {
                timeText = game.add.text(x_coord, y_coord, 'time', { fontSize: '32px', fill: '#FF0000' });
            }
            if(currentLevel[i][j] == 'y') {
                yarnsTotal++;
                totalBoosters++;
                yarns.create(x_coord, y_coord, 'yarnCoin');
            }
            if(currentLevel[i][j] == 'T') {
                numMovingTrains++
                originPoint = [x_coord, y_coord, false];
                trainOrigins.push(originPoint);
                movableTrains.create(x_coord, y_coord, 'box');
            }
            if(currentLevel[i][j] == '%') {
                movePoint = [x_coord, y_coord, false];
                trainMoves.push(movePoint);
            }
            if(currentLevel[i][j] == '9') {
                numMovingPlatforms++
                platOrigPoint = [x_coord, y_coord, false];
                platformOrigins.push(platOrigPoint);
                movablePlatforms.create(x_coord, y_coord, 'movablePlatform');
            }
            if(currentLevel[i][j] == '$') {
                platMovePoint = [x_coord, y_coord];
                platformMoves.push(platMovePoint);
            }
        }
    }
    movablePlatforms.getChildren().forEach(function(platform) { platform.setPushable(false); });
    movableTrains.getChildren().forEach(function(train) { hideables.push(train); });
    bell_hitboxes.getChildren().forEach(function(hitbox) { hitbox.visible = false; });
}

function createDoor(currentLevel, game) {
    for (var i = 0; i < currentLevel.length; i++) {
        for (var j = 0; j < currentLevel[i].length; j++) {
            if(currentLevel[i][j] == 'D') {
                let x_coord = j * game.Grid.cell_width + game.Grid.cell_width / 2;
                let y_coord = i * game.Grid.cell_height + game.Grid.cell_height / 2;
                door = game.physics.add.sprite(x_coord, y_coord, 'door');
                game.physics.add.collider(door, platforms);
                game.physics.add.collider(mouse, door, endLevel);
            }
        }
    }
}

function endLevel() {
    if (levelComplete == true && level != levels.length - 1 && caught == false) {
        doorTime = Date.now();
        cheesedoorTimesSession.push((doorTime - cheeseTime) * 0.001);
        levelTimesInfoSession.push(roundTime(runtime));
        if(collectPathData) pathsLevels.push(path);
        score += Math.floor((level+1)*100 - runtime);
        scoreText.setText('Score: ' + score);
        levelCreated = false;
        level ++;
        clearLevel();
    }
    else if (levelComplete == true && level == levels.length - 1 && caught == false){
        doorTime = Date.now();
        cheesedoorTimesSession.push((doorTime - cheeseTime) * 0.001);
        levelTimesInfoSession.push(roundTime(runtime));
        if(collectPathData) pathsLevels.push(path);
        score += Math.floor((level+1)*100 - runtime);
        scoreText.setText('Score: ' + score);
        playerWon = true;  
        gameOver = true;  
    }
    else if (caught == true){
        mouse.setTint(0xff0000);
        timedEvent.remove();
        gameOver = true;
    }
}

function resetVariables() {
    gameOver = false;
    levelCreated = false;
    levelComplete = false;
    doorSpawned = false;
    cheeseCount = 0;
    caught = false;
    enableKey = true;
    hiding = false;
    catLooking = false;
    awake = false;
    playing = false;
    activated_items = [];
}

function moveTrains() {
    let i = 0;
    movableTrains.getChildren().forEach(function(train) {
        trainNumber = i % numMovingTrains;

        if (trainMoves[trainNumber][2] == true) objective = trainOrigins;
        else objective = trainMoves;
        let adj = objective[trainNumber][0] - train.x;
        let opp = objective[trainNumber][1] - train.y;
        let angle = Math.atan2(opp, adj);
        if (train.x >= trainMoves[trainNumber][0] && train.y >= trainMoves[trainNumber][1]){ trainMoves[trainNumber][2] = true; } //train.scaleX = -1; } borks collisions
        else if (train.x <= trainOrigins[trainNumber][0] && train.y <= trainOrigins[trainNumber][1]) { trainMoves[trainNumber][2] = false; } //train.scaleX = 1; }

        train.setVelocity(Math.cos(angle) * 60, Math.sin(angle) * 60);
        i++;
    });
}

function movePlatforms() {
    let i = 0;
    let dollarSign = [];
    movablePlatforms.getChildren().forEach(function(platform) {
        platformNumber = i % numMovingPlatforms;

        platformMoves.forEach(function(endpoint) { if(endpoint[0] == platform.x) dollarSign = endpoint });
        if (platformOrigins[platformNumber][2] == true) platObjective = platformOrigins[platformNumber];
        else platObjective = dollarSign;

        let adj = platObjective[0] - platform.x;
        let opp = platObjective[1] - platform.y;
        let angle = Math.atan2(opp, adj);
        if (platform.y >= dollarSign[1] ){ platformOrigins[platformNumber][2] = true; }
        else if (platform.y <= platformOrigins[platformNumber][1]) { platformOrigins[platformNumber][2] = false; }

        direction = Math.sign(Math.sin(angle));

        platform.setVelocityY(direction *100);
        i++;
    });
}