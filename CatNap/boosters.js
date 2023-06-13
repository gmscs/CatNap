function collectJello(mouse, jello) {
    jello.disableBody(true, true);
    jello_count += 1;
    jelloText.setText(jello_count);
    score += 10;
    scoreText.setText('Score: ' + score);
    collectedBoosters++;
}

function collectShield (mouse, shield) {
    shield.disableBody(true, true);
    shield_count += 1;
    shieldText.setText(shield_count);
    score += 10;
    scoreText.setText('Score: ' + score);
    collectedBoosters++;
}

function collectYarn (mouse, yarn) {
    yarn.disableBody(true, true);
    yarn_count++;
    yarnText.setText(yarn_count);
    score += 10;
    scoreText.setText('Score: ' + score);
    collectedBoosters++;
}

/*
 * If the mouse has at least 1 shield then an object the player can hide behind is spawned on the mouse's position.
 * The objects are pushed into the list of hideable objects.
 * Currently activated by pressing the S key.
 * 
 */
function setShield(mouse, game) {
    if (shield_count > 0) {
        smallBox = game.physics.add.sprite(mouse.x, mouse.y, 'smallBox');
        game.physics.add.collider(smallBox, platforms);
        game.physics.add.collider(smallBox, movablePlatforms);
        game.physics.add.overlap(mouse, smallBox);
        activated_items.push(smallBox);
        hideables.push(smallBox);
        shield_count -= 1;
        shieldText.setText(shield_count);
        usedBoosters++;
        shieldsUsed++;
    }
}

/*
 * If the mouse has at least 1 jello then it replaces the closest bell with a jello.
 * Loops through each bell in the level and finds the closest bell using the 
 * Chebyshev distance formula, allowing for calculating vertically and horizontally.
 * If the distance is less than or equal to 80 then a jello can be set.
 * 
 * After setting down a jello, the bell object is destroyed and the jello counter decreases.
 * 
 * Currently activated when the player press the J key. 
 */
function setJello(mouse, game) {
    if(jello_count > 0) {
        bells.getChildren().forEach(function(bell) {
            if(Phaser.Math.Distance.Chebyshev(mouse.x, mouse.y, bell.x, bell.y) <= 80) {
                bell_hitboxes.getChildren().forEach(function(hitbox) {
                    if (hitbox.x == bell.x && bell.y - game.Grid.cell_height / 2 <= hitbox.y <= bell.y + game.Grid.cell_height / 2) {hitbox.destroy()};
                });
                jello_active = game.physics.add.sprite(bell.x, (bell.y-1), 'jello');
                game.physics.add.collider(jello_active, platforms);
                game.physics.add.collider(jello_active, movablePlatforms);
                game.physics.add.overlap(jello_active, mouse);
                activated_items.push(jello_active);
                bell.disableBody(true, true);
                bell.destroy();
                jello_active.setCollideWorldBounds(true);
                jello_count--;
                jelloText.setText(jello_count);
                usedBoosters++;
                jellosUsed++;
            }
        }, game);
    }
}

function throwYarn(mouse, game) {
    if(yarn_count > 0) {
        let adj = hitbox.x - mouse.x;
        let opp = hitbox.y - mouse.y;
        let angle = Math.atan2(opp, adj);
        if(awake && !playing) {
            yarn = game.physics.add.sprite(mouse.x + (Math.cos(angle) * game.Grid.cell_width), mouse.y + (Math.sin(angle) * game.Grid.cell_height), 'yarn');
            yarn.setCollideWorldBounds(true);
            yarnThrown = true;
            game.physics.add.overlap(yarn, hitbox, function(){ cat.play('playing'); yarn.destroy(); playing = true;});
            activated_items.push(yarn);
            yarn.setVelocity(Math.cos(angle) * 900, Math.sin(angle) * 900);
            yarn_count--;
            yarnText.setText(yarn_count);
            usedBoosters++;
            yarnsUsed++;
        }
    }
}