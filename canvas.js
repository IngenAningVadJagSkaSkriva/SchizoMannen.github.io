const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 100;
canvas.width = canvas.height * 2;

var death = new Audio("death.mp3");
var fear = new Audio("fear.mp3");
var spawn = new Audio("spawn.mp3");
var s = 0;
var s2 = 0;
var dead = 0;
var maxlevels = 5;
var currentlevel = RB(0,maxlevels);
var kills = 0;
var maxkills = 10;
var speed = 1;
var difficulty = 0;
var done = 0;
while(done == 0) {
    if(confirm("do you want easy mode?")) {
        difficulty = 0;
        done = 1;
    } else if(confirm("do you want hard mode?")) {
        difficulty = 0.3;
        done = 1;
    } else if(confirm("do you want impossible mode?")) {
        difficulty = 0.6;
        done = 1;
    }
}

var distance = (x0,y0,x2,y2) => {
    //d=√((x_2-x_0)²+(y_2-y_0)²)
    return Math.sqrt((x2-x0)**2+(y2-y0)**2);
}
var test = (x,y,x2,y2,XorY) => {
    let aX = x - x2;
    let aY = y - y2;
    let sumX = 0 - aX;
    let sumY = 0 - aY;
    let division = (Math.abs(aX) + Math.abs(aY));
    if(XorY == "X") {
        return sumX / division;
    } else if(XorY == "Y") {
        return sumY / division;
    }
}
function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
var colision = (x,xSize,y,ySize,x2,x2Size,y2,y2Size,Type1ForColisionCheck) => {
    //X0
    //00
    if(x <= x2 && y <= y2) if(((x2 >= x && x2 <= (x + xSize)) && (y2 >= y && y2 <= (y + ySize)))) {
        return 1;
    }
    //0X
    //00
    if(x >= x2 && y <= y2) if((((x2 + x2Size) >= x && (x2 + x2Size) <= (x + xSize)) && (y2 >= y && y2 <= (y + ySize)))) {
        return 1
    }
    //00
    //X0
    if(x <= x2 && y >= y2) if(((x2 >= x && x2 <= (x + xSize)) && ((y2 + y2Size) >= y && (y2 + y2Size) <= (y + ySize)))) {
        return 1;
    }
    //00
    //0X
    if(x >= x2 && y >= y2) if((((x2 + x2Size) >= x && (x2 + x2Size) <= (x + xSize)) && ((y2 + y2Size) >= y && (y2 + y2Size) <= (y + ySize)))) {
        return 1;
    }
    if(Type1ForColisionCheck == 1) if(colision(x2,x2Size,y2,y2Size,x,xSize,y,ySize,0)) {
        return 1;
    }
    return null;
    }
var array2D = (y,x) => {
    var array = [];
    for(let i = 0 - y; i < y + y; i++) {
        array[i] = [];
        for(let j = 0 - x; j < x + x; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}
var map = array2D(canvas.height,canvas.width);
var map2 = array2D(canvas.height,canvas.width);
var sprites = {
   level: [
    {//level 0
        height: 20,
        width: 40,
        startX: 19,
        startY: 5,
        map: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
        ]
    },
    {//level 1
        height: 20,
        width: 40,
        startX: 1,
        startY: 4,
        map: [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
        ]
    },
    {//level 2
        height: 20,
        width: 40,
        startX: 20,
        startY: 13,
        map: [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,],
[1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
        ]
    },
    {//level 3
        height: 20,
        width: 40,
        startX: 3,
        startY: 1,
        map: [
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,],
[1,1,1,1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
[1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
        ]

    },
    {//level 4
        height: 20,
        width: 40,
        startX: 0,
        startY: 1,
        map: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,]
        ]
    },
    { //level 5
        height: 20,
        width: 40,
        startX: 20,
        startY: 1,
        map: [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
        ]
    }
],
    player: {
        height: 10,
        width: 5,
        map: [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [1,0,2,0,1],
            [1,0,0,0,1],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [1,1,1,1,1],
            [0,0,3,0,0],
            [0,3,0,3,0],
            [0,3,0,3,0]
        ]
    }
}
var mouse = {
    x: 0,
    y: 0
}
class player {
    constructor(y,x) {
        this.y = y;
        this.x = x;
        this.speedX = 0;
        this.speedY = 0;
        this.goalX = 0;
        this.goalY = 0;
        this.recoilX = 0;
        this.recoilY = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.fuel = 5;
        this.maxfuel = 10;
        this.insanity = 0;
        this.maxinsanity = 100;
    }
    update() {
        this.x += this.speedX + this.recoilX;
        this.y += this.speedY + this.recoilY;
        if(this.speedX < this.goalX) {
            this.speedX += 0.1;
        } else if(this.speedX > this.goalX) {
            this.speedX -= 0.1;
        }
        if((this.speedX < this.goalX + 0.1) && (this.speedX > this.goalX - 0.1)) this.speedX = 0;
        if(this.speedY < this.goalY) {
            this.speedY += 0.1;
        } else if(this.speedY > this.goalY) {
            this.speedY -= 0.1;
        }
        if((this.speedY < this.goalY + 0.1) && (this.speedY > this.goalY - 0.1)) this.speedY = 0;
        if(this.recoilX > 0) {
            this.recoilX -= 0.1;
        } else if(this.recoilX < 0) {
            this.recoilX += 0.1;
        }
        if(this.recoilY > 0) {
            this.recoilY -= 0.1;
        } else if(this.recoilY < 0) {
            this.recoilY += 0.1;
        }
        if(this.recoilX < 0.1 && this.recoilX > -0.1) {
            this.recoilX = 0;
        }
        if(this.recoilY < 0.1 && this.recoilY > -0.1) {
            this.recoilY = 0;
        }
        if(Math.abs(this.recoilX) + Math.abs(this.recoilY) >= 5) {
            this.recoilY = 0;
            this.recoilX = 0;
        }
        if(Math.abs(this.speedX) >= 5) {
            this.speedX = 5;
        }
        if(Math.abs(this.speedY) >= 5) {
            this.speedY = 5;
        }
    }
}
var maxbullets = 100;
var shootindex = 0;
class bullet {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.size = 1;
        this.live = 0;
        this.speed = 0;
    }
    update() {
        this.x += this.speedX * this.speed;
        this.y += this.speedY * this.speed;
    }
    new(x,y,speedX,speedY,size,speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.live = 1;
        this.speed = speed;
    }
    end() {
        this.live = 0;
    }
}
var maxenemys = 7;
var enemyindex = 0;
class enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 0;
        this.size = 10;
        this.live = 0;
        this.health = 3;
        this.map = [
            [2,0,0,1,1,1,1,0,0,2],
            [2,2,0,1,0,0,1,0,2,2],
            [2,2,2,1,1,1,1,2,2,2],
            [1,2,1,2,1,1,2,1,2,1],
            [0,1,2,2,1,1,2,2,1,0],
            [0,0,1,1,1,1,1,1,0,0],
            [0,0,0,0,1,1,0,0,0,0],
            [0,0,0,1,0,0,1,0,0,0],
            [0,0,1,0,0,0,0,1,0,0],
            [0,0,1,0,0,0,0,1,0,0]
        ]
    }
    update() {
        this.x += this.speedX * this.speed;
        this.y += this.speedY * this.speed;
    }
    new(x,y,speed,health) {
        spawn.currentTime = 0;
        spawn.play();
        this.live = 1;
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = speed;
    }
    end() {
        this.live = 0;
        death.currentTime = 0;
        death.play();
    }
}
var bullets = [];
var enemys = [];
for(let i = 0; i < maxbullets; i++) {
    bullets[i] = new bullet();
}
for(let i = 0; i < maxenemys; i++) {
    enemys[i] = new enemy();
}
var player1 = new player(10,canvas.width / 2);
drawing = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(player1.insanity > 50 && RB(1,3) == 1) {
        ctx.fillStyle = "rgb(50,0,0)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            map2[i][j] = map[i][j];
            let ii = Math.floor((i / canvas.height) * sprites.level[currentlevel].height);
            let jj = Math.floor((j / canvas.width) * sprites.level[currentlevel].width);
            if(sprites.level[currentlevel].map[ii][jj] == 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 2) {
                ctx.fillStyle = "green";
                ctx.fillRect(j,i,1,1);
                map[i][j] = 0;
            } else if(map[i][j] == 3) {
                ctx.fillStyle = "grey";
                ctx.fillRect(j,i,1,1);
                map[i][j] = 0;
            }
        }
    }
    ctx.fillStyle = "rgb("+RB(200,255)+",0,0)";
    if(difficulty < 0.3) {
        ctx.fillText("FUEL: "+player1.fuel+"/"+player1.maxfuel+"    INSANITY: "+Math.floor(player1.insanity)+"/"+player1.maxinsanity+"  EASY MODE",0,canvas.height / 10,canvas.width);
    } else if(difficulty == 0.3) {
        ctx.fillText("FUEL: "+player1.fuel+"/"+player1.maxfuel+"    INSANITY: "+Math.floor(player1.insanity)+"/"+player1.maxinsanity+"  HARD MODE",0,canvas.height / 10,canvas.width);
    } else if(difficulty == 0.6) {
        ctx.fillText("FUEL: "+player1.fuel+"/"+player1.maxfuel+"    INSANITY: "+Math.floor(player1.insanity)+"/"+player1.maxinsanity+"  IMPOSSIBLE!",0,canvas.height / 10,canvas.width);
    }
    ctx.fillStyle = "grey";
    ctx.fillRect(mouse.x,mouse.y,1,1);
}
var keys = [];
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
    if(player1.insanity < player1.maxinsanity && s == 1) {
        if(keys[68] || keys[39]) {//d and right arrow
            player1.speedX = 1;
            keys[68] = 0;
            keys[39] = 0;
        }
        if(keys[65] || keys[37]) {//a and left arrow
            player1.speedX = -1;
            keys[65] = 0;
            keys[37] = 0;
        }
        if(keys[87] || keys[38] || keys[32]) {//w and up arrrow and space
            if(player1.speedY == 0) {
                player1.speedY = -5;
                player1.update();
                keys[87] = 0;
                keys[38] = 0;
                if(keys[32]) {
                    changelevel(0);
                }
                keys[32] = 0;
            }
        }
    }
}
var where = (max,value,max2) => {
    return Math.floor((value / max) * max2);
}
addEventListener("mousemove", (e) => {
    if(s == 1) {
        mouse.y = Math.floor((e.y / window.innerHeight) * canvas.height);
        mouse.x = Math.floor((e.x / window.innerWidth) * canvas.width);
    }
})
addEventListener("contextmenu",(e) => {
    e.preventDefault();
    if(player1.fuel > 0 && (player1.insanity < player1.maxinsanity && s == 1)) {
        player1.recoilX = test(player1.x,player1.y,mouse.x,mouse.y,"X") * 5;
        player1.recoilY = test(player1.x,player1.y,mouse.x,mouse.y,"Y") * 5;
        for(let i = 0; i < 5; i++) {
            shoot(player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2,player1.recoilX * -1 + RB(-5,5) / 10,player1.recoilY * -1 + RB(-5,5) / 10,1,1.5);
        }
        player1.fuel--;
    }
    return false;
},false)
var shoot = (x,y,speedX,speedY,size,speed) => {
    shootindex++;
    if(shootindex >= maxbullets) shootindex = 0;
    bullets[shootindex].new(x,y,speedX,speedY,size,speed);
}
var handlebullet = () => {
    for(let i = 0; i < maxbullets; i++) {
        if(bullets[i].live == 1) {
            bullets[i].update();
            if((bullets[i].x >= canvas.width || bullets[i].y >= canvas.height) || (bullets[i].x <= 0 || bullets[i].y <= 0)) {
                bullets[i].end();
            }
            for(let y = 0; y < bullets[i].size; y++) {
                for(let x = 0; x < bullets[i].size; x++) {
                    if((bullets[i].x > bullets[i].size && bullets[i].x < canvas.width - bullets[i].size) && (bullets[i].y > bullets[i].size && bullets[i].y < canvas.height - bullets[i].size)) {
                        map[Math.floor(bullets[i].y + y)][Math.floor(bullets[i].x + x)] = 3;
                        if(sprites.level[currentlevel].map[where(canvas.height,bullets[i].y + y,sprites.level[currentlevel].height)][where(canvas.width,bullets[i].x + x,sprites.level[currentlevel].width)] == 1) {
                        bullets[i].end();
                    }
                    }
                }
            }
        }
    }
}
var handelenemys = () => {
    for(let i = 0; i < maxenemys; i++) {
        if(enemys[i].live == 1) {
            let speedX = test(enemys[i].x + enemys[i].size / 2,enemys[i].y + enemys[i].size / 2,player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2,"X");
            let speedY = test(enemys[i].x + enemys[i].size / 2,enemys[i].y + enemys[i].size / 2,player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2,"Y");
            enemys[i].speedX = speedX;
            enemys[i].speedY = speedY;
            for(let j = 0; j < maxenemys; j++) {
                if(enemys[j].live == 1 && i != j && distance(enemys[i].x,enemys[i].y,player1.x,player1.y) > 10) {
                    if(distance(enemys[i].x,enemys[i].y,enemys[j].x,enemys[j].y) <= 15) {
                        enemys[i].speedX = test(enemys[j].x,enemys[j].y,enemys[i].x,enemys[i].y,"X");
                        enemys[i].speedY = test(enemys[j].x,enemys[j].y,enemys[i].x,enemys[i].y,"Y");
                    }
                }
            }

            enemys[i].update();
            for(let y = 0; y < enemys[i].size; y++) {
                for(let x = 0; x < enemys[i].size; x++) {
                    if((enemys[i].x + x > 1 && enemys[i].x + x < canvas.width - 1) && (enemys[i].y + y > 1 && enemys[i].y + y < canvas.height - 1)) { 
                    if(enemys[i].map[y][x] != 0) {
                        ctx.fillStyle = "black";
                    if(enemys[i].map[y][x] == 1) {
                        ctx.fillStyle = "grey";
                    } else if(enemys[i].map[y][x] == 2) {
                        ctx.fillStyle = "red";
                    }
                    ctx.fillRect(Math.floor(enemys[i].x + x),Math.floor(enemys[i].y + y),1,1);
                    let xx = enemys[i].x + x;
                    let yy = enemys[i].y + y
                    if(map2[Math.floor(yy)][Math.floor(xx)] == 3) {
                        if(sprites.level[currentlevel].map[where(canvas.height,yy,sprites.level[currentlevel].height)][where(canvas.width,xx,sprites.level[currentlevel].width)] != 1) {
                            enemys[i].health--;
                            enemys[i].speedX *= -2;
                            enemys[i].speedY *= -2;
                            enemys[i].update();
                        }
                    }
                    }
                }
                }
            }
            if(enemys[i].health <= 0) {
                enemys[i].end();
                player1.insanity *= 0.9;
                kills++;
                if(kills >= maxkills) {
                    kills = 0;
                    changelevel(currentlevel + 1);
                }
            }
        } else if(RB(1,200 - player1.insanity * 2) <= 1) {
            let a = RB(1,4);
    if(player1.insanity > 50) {
        speed = 1.25 + difficulty;
    } else {
        speed = 1 + difficulty;
    }
    let health = 20;
    switch(a) {
        case 1: //up
            enemys[i].new(RB(10,canvas.width - 10),10,speed,health);
            break;
        case 2: //down
            enemys[i].new(RB(10,canvas.width - 10),canvas.height - 10,speed,health);
            break;
        case 3: //right
            enemys[i].new(canvas.width - 10,RB(10,canvas.height - 10),speed,health);
            break;
        case 4: //left
            enemys[i].new(10,RB(10,canvas.height - 10),speed,health);
            break;
    }
        }
        if(distance(player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2,enemys[i].x + enemys[i].size / 2,enemys[i].y + enemys[i].size / 2) <= 11 && enemys[i].live == 1) {
            fear.play();
            player1.insanity += (0.5 + difficulty) * (player1.insanity / player1.maxinsanity + 1);
        }
    }
}
var changelevel = (whatlevel) => {
    if(whatlevel > maxlevels) {
        whatlevel = 0;
    } else if(whatlevel < 0) {
        whatlevel = 0;
    }
    player1.insanity *= 0.7;
    for(let i = 0; i < maxenemys; i++) {
        enemys[i].end();
    }
    player1.recoilX = 0;
    player1.recoilY = 0;
    player1.speedX = 0;
    player1.speedY = 0;
    player1.x = where(sprites.level[whatlevel].width,sprites.level[whatlevel].startX,canvas.width);
    player1.y = where(sprites.level[whatlevel].height,sprites.level[whatlevel].startY,canvas.height);
    currentlevel = whatlevel;
}
var game = () => {
    if(s == 0) {
        menu();
        return 0;
    }
    if(player1.y + sprites.player.height < canvas.height) {
        if(player1.speedY < 1) {
            player1.speedY += 0.2;
        }
    }
    if((player1.y + sprites.player.height > canvas.height - (Math.abs(player1.speedY) + Math.abs(player1.recoilY))) || (sprites.level[currentlevel].map[where(canvas.height,player1.y + sprites.player.height + (Math.abs(player1.speedY) + Math.abs(player1.recoilY)),sprites.level[currentlevel].height)][where(canvas.width,player1.x,sprites.level[currentlevel].width)] == 1 || sprites.level[currentlevel].map[where(canvas.height,player1.y + sprites.player.height,sprites.level[currentlevel].height)][where(canvas.width,player1.x + sprites.player.width,sprites.level[currentlevel].width)] == 1)) {
        player1.speedY = 0;
        player1.recoilY = 0;
        if(RB(1,10) == 1) {
            if(player1.fuel < player1.maxfuel) player1.fuel++;
        }
    } else if(sprites.level[currentlevel].map[where(canvas.height,player1.y,sprites.level[currentlevel].height)][where(canvas.width,player1.x,sprites.level[currentlevel].width)] == 1 || sprites.level[currentlevel].map[where(canvas.height,player1.y,sprites.level[currentlevel].height)][where(canvas.width,player1.x + sprites.player.width,sprites.level[currentlevel].width)] == 1) {
        player1.speedY = 1;
        player1.recoilY = 0;
    }
    if((sprites.level[currentlevel].map[where(canvas.height,player1.y,sprites.level[currentlevel].height)][where(canvas.width,player1.x,sprites.level[currentlevel].width)] == 1 || sprites.level[currentlevel].map[where(canvas.height,player1.y,sprites.level[currentlevel].height)][where(canvas.width,player1.x + sprites.player.width,sprites.level[currentlevel].width)] == 1) || (sprites.level[currentlevel].map[where(canvas.height,player1.y + sprites.player.height - 2,sprites.level[currentlevel].height)][where(canvas.width,player1.x,sprites.level[currentlevel].width)] == 1 || sprites.level[currentlevel].map[where(canvas.height,player1.y + sprites.player.height - 2,sprites.level[currentlevel].height)][where(canvas.width,player1.x + sprites.player.width,sprites.level[currentlevel].width)] == 1)) { //very long line yes very nice
        player1.speedX *= -2.2;
        player1.recoilX *= -2.2;
    }
    if(player1.y > canvas.height) {
        player1.speedY = -1;
        player1.recoilY = 0;
    } else if(player1.y < (Math.abs(player1.speedY) + Math.abs(player1.recoilY))) {
        player1.speedY = 1;
        player1.recoilY = 0;
    }
    if(player1.x > canvas.width) {
        player1.speedX = -1;
        player1.recoilX = 0;
    } else if(player1.x < 0) {
        player1.speedX = 1;
        player1.recoilX = 0;
    }
    let x = player1.x + sprites.player.width / 2;
    let y = player1.y + sprites.player.height / 2;
    let speedX = test(x,y,mouse.x,mouse.y,"X");
    let speedY = test(x,y,mouse.x,mouse.y,"Y");
    player1.update();
    while(distance(x,y,player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2) < 10) {
        x += speedX;
        y += speedY;
        if(distance(x,y,player1.x + sprites.player.width / 2,player1.y + sprites.player.height / 2) > 7) map[Math.floor(y)][Math.floor(x)] = 2;
    }
    player1.x2 = x;
    player1.y2 = y;
    handlebullet();
    for(let y = 0; y < sprites.player.height; y++) {
        for(let x = 0; x < sprites.player.width; x++) {
            ctx.fillStyle = "black";
            if(sprites.player.map[y][x] == 1) {
                ctx.fillStyle = "white";
            } else if(sprites.player.map[y][x] == 2) {
                ctx.fillStyle = "rgb("+RB(0,255)+","+RB(0,255)+","+RB(0,255)+")"
            } else if(sprites.player.map[y][x] == 3) {
                ctx.fillStyle = "grey";
            }
            ctx.fillRect(Math.floor(player1.x + x),Math.floor(player1.y + y),1,1);
        }
    }
    if(player1.insanity > player1.maxinsanity) {
        document.getElementById("clap").play();
        fear.volume = 0;
        setInterval(() => {
            spawn.play();
        },500)
        if(dead == 0) setTimeout(() => {
            location.reload();
        },15000)
        dead = 1;
    }
    if(RB(1,25) == 1 && player1.insanity > 1) {
        player1.insanity--;
    }
    handelenemys();
    setTimeout(() => {
        drawing();
        game();
        return 0;
    },1000/30);
}
var menu = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
ctx.fillText("WASD OR ARROW KEYS TO MOVE!",canvas.width / 13,canvas.height / 2 - 20,canvas.width);
ctx.fillText("RIGHT CLICK TO USE ROCKET BOOST!",canvas.width / 17,canvas.height / 2,canvas.width);
ctx.fillText("CLICK TO START AND SHOOT!",canvas.width / 5,canvas.height / 2 + 20,canvas.width);
}
menu();
addEventListener("click",(e) => {
    if(s != 1) {
        s = 1;
        game();
        s2 = 0;
        alert("YOU HAVE TO KEEP THE INSANITY UNDER 100 OTHERWISE THE DEMONS WILL GET YOU!");
        setTimeout(() => {
            s2 = 1;
        },1000);
    }
    if(player1.insanity < player1.maxinsanity && s == 1) {
        let speedX = test(player1.x2,player1.y2,mouse.x,mouse.y,"X");
    let speedY = test(player1.x2,player1.y2,mouse.x,mouse.y,"Y");
    player1.recoilX = speedX * -1;
    player1.recoilY = speedY * -1;
    shoot(player1.x2,player1.y2,speedX,speedY,2,5);
    }
})
window.onblur = () => {
    if(s2 == 1) {
        s = 0;
    menu();
    }
}
