function initiateCanvas(width, height) {
    //create HTML element
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    //fill with black
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //send data
    return canvas
}

function drawLightning(canvas) {
    ctx = canvas.getContext("2d");
    //set brush color
    ctx.fillStyle = "white";
    //start at 50% height
    ypos = canvas.height / 2;
    point_up = true;
    branches = []; //initiate branch list
    for (xpos = 0; xpos < canvas.width; xpos++) {
        if (Math.floor(Math.random() * 11) < 3) {
            point_up = !(point_up); //change direction if random number. Random number is unlikely so that varitation is not too harsh.
        }
        //brush
        ypos += point_up?1:-1;
        ctx.fillRect(xpos, ypos, 1, 1);
        //add branch if random number. Very unlikely.
        if (Math.floor(Math.random() * 101) < 1) {
            //add branch object to array
            branches.push({x:xpos,y:ypos,point_up:!(point_up),length:Math.floor(Math.random() * 175)});
        }
    }
    //generate branches similarly to main lightning
    for (branch of branches) {
        ypos = branch.y;
        for (xpos = branch.x; xpos < branch.x + branch.length; xpos++) {
            if (Math.floor(Math.random() * 26) < 8) {
                point_up = !(branch.point_up);
            }
            else {
                point_up = branch.point_up;
            }
            ypos += point_up?1:-1;
            ctx.fillRect(xpos, ypos, 1, 1);
        }
    }
    //add glow
}

function animation() {
    //remove previous animation
    if (document.getElementsByTagName("canvas").length > 0) {
        document.getElementsByTagName("canvas")[0].remove();
    }
    //create drawing
    drawLightning(initiateCanvas(640, 360));
    setTimeout(animation, 100);
}

////main
//animation();

//main (fr)
drawLightning(initiateCanvas(640, 360));