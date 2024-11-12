const game_cont = document.querySelector("#game_container");
const table = document.querySelector("#game_area");
const menu = document.querySelector("#menu");
const bEasy = document.querySelector("#b_easy");
const bHard = document.querySelector("#b_hard");
const bStart = document.querySelector("#b_start");
const bInstr = document.querySelector("#b_instr");
const bOk = document.querySelector("#b_ok");
const msg = document.querySelector("#error");
const fName = document.querySelector("#name");
const pName = document.querySelector("#pname");
const timerView = document.querySelector("#timer");
const instructions = document.querySelector("#instructions");

let diff = 0;
let dim;
let name;
let seconds;
let minutes;
let hours;
let timer;
let oasis = 0;
let steps;

game_cont.style.visibility = "collapse";
game_cont.style.height = "0px";
menu.style.visibility = "visible";
msg.style.visibility = "collapse";

bInstr.addEventListener("click", ()=> {
    instructions.style.visibility = "visible";
})

bOk.addEventListener("click", () => {
    instructions.style.visibility = "collapse";
})

bEasy.addEventListener("click", ()=> {
    diff = 1
    msg.style.visibility = "collapse";
    bStart.classList.remove("inactive");
    bStart.classList.add("active");
    bHard.classList.remove("active");
    bEasy.classList.add("active");
});

bHard.addEventListener("click", ()=> {
    diff = 2
    msg.style.visibility = "collapse";
    bStart.classList.remove("inactive");
    bStart.classList.add("active");
    bEasy.classList.remove("active");
    bHard.classList.add("active");
});

bStart.addEventListener("click", ()=> {
    msg.style.visibility = "visible";
    if (diff === 0) {
        msg.innerHTML = "Choose difficulty first!"
        console.log("Choose difficutly first!");
    }
    else if (fName.value.length === 0) msg.innerHTML = "Name not set!";
    else if (fName.value.length > 12) msg.innerHTML = "Name too long!";
    else startGame();
})

function getLevel(diff) {
    let lvl;
    let num = Math.floor(5*Math.random())+1;
    if (diff === 1) lvl = "e" + num;
    else lvl = "d" + num;

    return window[lvl];
}

function getTile(cell, int) {
    switch (int) {
        case 0:
            cell.style.backgroundImage = "url('pics/tiles/empty.png')";
            cell.setAttribute("tile", 0);
            break;
        case 1:
            cell.style.backgroundImage = "url('pics/tiles/oasis.png')";
            cell.setAttribute("tile", 1);
            oasis++;
            break;
        case 21:
            cell.style.backgroundImage = "url('pics/tiles/mountain.png')";
            cell.setAttribute("tile", 2);
            break;
        case 22:
            cell.style.backgroundImage = "url('pics/tiles/mountain.png')";
            cell.style.transform = "rotate(90deg)";
            cell.setAttribute("tile", 2);
            break;
        case 23:
            cell.style.backgroundImage = "url('pics/tiles/mountain.png')";
            cell.style.transform = "rotate(180deg)";
            cell.setAttribute("tile", 2);
            break;
        case 24:
            cell.style.backgroundImage = "url('pics/tiles/mountain.png')";
            cell.style.transform = "rotate(270deg)";
            cell.setAttribute("tile", 2);
            break;
        case 3:
            cell.style.backgroundImage = "url('pics/tiles/bridge.png')";
            cell.setAttribute("tile", 3);
            break;
        case 4:
            cell.style.backgroundImage = "url('pics/tiles/bridge.png')";
            cell.style.transform = "rotate(90deg)";
            cell.setAttribute("tile", 3);
            break;
    }
}

function updateTimer() {
    let timerText;
    seconds++
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    if (hours === 0) timerText = minutes + ":" + seconds;
    else timerText = hours + ":" + minutes + ":" + seconds;

    timerView.innerHTML = timerText;
}

function getRot(cell) {
    return cell.style.transform.charAt(7);
}

function getDir(dir, cell) {
    let tile = cell.getAttribute("tile");
    switch(tile) {
        case "80":
            if (dir == "up") return "up";
            if (dir == "do") return "do";
            break;
        case "81":
            if (dir == "le") return "le";
            if (dir == "ri") return "ri";
            break;
        case "30":
            if (dir == "up") return "up";
            if (dir == "do") return "do";
            if (dir == "le") return "le";
            if (dir == "ri") return "ri";
            break;
        case "20":
            let rot = getRot(cell);
            if (dir == "up") {
                if (rot == 0) return "ri";
                if (rot == 9) return "le";
            }
            if (dir == "do") {
                if (rot == 1) return "le";
                if (rot == 2) return "ri";
            }
            if (dir == "le") {
                if (rot == 0) return "do";
                if (rot == 2) return "up";
            }
            if (dir == "ri") {
                if (rot == 9) return "do";
                if (rot == 1) return "up";
            }
            break;
        case "82":
            if (dir == "up") return "ri";
            if (dir == "le") return "do";
            break;
        case "83":
            if (dir == "ri") return "do";
            if (dir == "up") return "le";
            break;
        case "84":
            if (dir == "do") return "le";
            if (dir == "ri") return "up";
            break;
        case "85":
            if (dir == "do") return "ri";
            if (dir == "le") return "up";
            break;
    }
    console.log("invalid cords");
    return "x";
}

function getCell(cell, dir) {
    let x = cell.cellIndex;
    let y = cell.parentNode.rowIndex;

    switch (dir) {
        case "up":
            y--;
            break;
        case "do":
            y++;
            break;
        case "le":
            x--;
            break;
        case "ri":
            x++;
            break;
    }

    if (x >= 0 && x < dim) {
        if (y >= 0 && y < dim) {
            return table.rows[y].cells[x];
        }
    }
    console.log("ERROR");
    return "err";
}

function routeChecker(dir, cell) {
    
    console.log(steps);
    if (dir != "x" && steps != 0 && getCell(cell, getDir(dir, cell)) != "err") {
        steps--;
        routeChecker(getDir(dir, cell), getCell(cell, getDir(dir, cell)));
    }
    if (steps <= 0) return true;
    else return false;
}

function checkState() {
    
    steps = dim*dim - oasis;
    let end = true;
    for (let i = 0; i < dim; i++) {
        const row = table.rows[i];
        for (let j = 0; j < dim; j++) {
            const cell = row.cells[j];
            let tile = cell.getAttribute("tile");
            if (tile == 0 || tile == 3 || tile == 4) end = false;
        }
    }

    if (end) {

        //finds the first cell that has rail on it (starting from upper-left cortner)
        let r = 0;
        let i = 0;
        while (r < (dim-1) && i < dim && table.rows[r].cells[i].getAttribute("tile") == 1) {
            i++;
            if (i == dim) r++;
        }
        //this tile must be connected with a rail to it's right-side neighbour

        if (routeChecker("ri", table.rows[r].cells[i+1])) gameOver();
        else console.log("mégmindignemjó");


    }
    else console.log("nemnyertmég")
}

function startGame() {
    name = fName.value;
    pName.innerHTML = name;
    msg.style.visibility = "collapse";
    menu.style.visibility = "collapse";
    menu.style.height = "0px";
    game_cont.style.visibility = "visible";
    game_cont.style.height = "98vh";
    seconds = 0;
    minutes = 0;
    hours = 0;

    if (diff === 1) dim = 5;
    else dim = 7;

    lvl = getLevel(diff);

    for (let i = 0; i < dim; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < dim; j++) {
            const cell = row.insertCell(j);
            getTile(cell, lvl[i][j]);
            cell.style.backgroundSize = "cover";
        }
    }

    timer = setInterval(updateTimer, 1000);

    table.addEventListener("click", (e)=> {
        if (e.target.tagName === "TD") {
            switch (e.target.getAttribute("tile")) {
                case "0":
                    e.target.style.backgroundImage = "url('pics/tiles/straight_rail.png')";
                    e.target.setAttribute("tile", 80);
                    break;
                case "80":
                    e.target.style.transform = "rotate(90deg)";
                    e.target.setAttribute("tile", 81)
                    break;
                case "81":
                    e.target.style.backgroundImage = "url('pics/tiles/empty.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 0)
                    break;
                case "1":
                    console.log("Can't place rails on oasis tiles!");
                    break;
                case "2":
                    e.target.style.backgroundImage = "url('pics/tiles/mountain_rail.png')";
                    e.target.setAttribute("tile", 20);
                    break;
                case "20":
                    e.target.style.backgroundImage = "url('pics/tiles/mountain.png')";
                    e.target.setAttribute("tile", 2);
                    break;
                case "3":
                    e.target.style.backgroundImage = "url('pics/tiles/bridge_rail.png')";
                    e.target.setAttribute("tile", 30);
                    break;
                case "30":
                    e.target.style.backgroundImage = "url('pics/tiles/bridge.png')";
                    e.target.setAttribute("tile", 3);
                    break;
                case "82":
                    e.target.style.backgroundImage = "url('pics/tiles/empty.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 0);
                    break;
                case "83":
                    e.target.style.backgroundImage = "url('pics/tiles/empty.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 0);
                    break;
                case "84":
                    e.target.style.backgroundImage = "url('pics/tiles/empty.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 0);
                    break;
                case "85":
                    e.target.style.backgroundImage = "url('pics/tiles/empty.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 0);
                    break;
            }
            checkState();
        }
    })

    table.addEventListener("contextmenu", (e)=> {
        e.preventDefault();
        if (e.target.tagName === "TD") {
            switch (e.target.getAttribute("tile")) {
                case "0":
                    e.target.style.backgroundImage = "url('pics/tiles/curve_rail.png')";
                    e.target.setAttribute("tile", 82);
                    break;
                case "82":
                    e.target.style.transform = "rotate(90deg)";
                    e.target.setAttribute("tile", 83);
                    break;
                case "83":
                    e.target.style.transform = "rotate(180deg)";
                    e.target.setAttribute("tile", 84);
                    break;
                case "84":
                    e.target.style.transform = "rotate(270deg)";
                    e.target.setAttribute("tile", 85);
                    break;
                case "85":
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 82);
                    break;
                case "80":
                    e.target.style.backgroundImage = "url('pics/tiles/curve_rail.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 82);
                    break;
                case "81":
                    e.target.style.backgroundImage = "url('pics/tiles/curve_rail.png')";
                    e.target.style.transform = "rotate(0deg)";
                    e.target.setAttribute("tile", 82);
                    break;
                case "2":
                    e.target.style.backgroundImage = "url('pics/tiles/mountain_rail.png')";
                    e.target.setAttribute("tile", 20);
                    break;
                case "20":
                    e.target.style.backgroundImage = "url('pics/tiles/mountain.png')";
                    e.target.setAttribute("tile", 2);
                    break;
                case "3":
                    e.target.style.backgroundImage = "url('pics/tiles/bridge_rail.png')";
                    e.target.setAttribute("tile", 30);
                    break;
                case "30":
                    e.target.style.backgroundImage = "url('pics/tiles/bridge.png')";
                    e.target.setAttribute("tile", 3);
                    break;
            }
        }
        checkState();
    })
}

function gameOver() {
    game_cont.style.visibility = "collapse";
    game_cont.style.height = "0px";
    console.log("CONGRATS!!");
}