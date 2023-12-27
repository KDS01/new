let canvas;
let ctx;
canvas= document.createElement("canvas");
ctx=canvas.getContext("2d");
canvas.width=1400;
canvas.height=800;
document.body.appendChild(canvas);
let backgroundimg,enemy,bullet,spaceship,GameoverImg;
let spaceshipX=canvas.width/2-32;
let spaceshipY=canvas.height-100;
let keysDown={};
let bullets=[];
let enemies=[];
let gameOver=false;

function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] =true;
    })
    document.addEventListener("keyup",function(event){
        if(event.keyCode==32){
            createBullet();
        }
        delete keysDown[event.keyCode];
    })
}
function Bullet(){
    this.x=0;
    this.y=0;
    this.exist=true;
    this.init=function(){
        this.x=spaceshipX;
        this.y=spaceshipY;
        bullets.push(this);
    }
    this.update =function(){
        this.y-=8;
    }
    this.check=function(){
        for(let i=0; i<enemies.length;i++){
        if(this.y<=enemies[i].y&& this.x>=enemies[i].x&&this.x<=enemies[i].x+48){
            this.exist=false;
            enemies.splice(i,1)
            }
        }
    }
}
function createBullet(){
    let newBullet= new Bullet();
    newBullet.init();
}
function update(){
    if(39 in keysDown){
        spaceshipX+= 5;
    }
    if(37 in keysDown){
        spaceshipX-= 5;
    }
    if(spaceshipX<=0){
        spaceshipX=0;
    }
    if(spaceshipX>=canvas.width-100){
        spaceshipX=canvas.width-100;
    }
    for(let i =0; i<bullets.length;i++){
        bullets[i].update();
        bullets[i].check();
    }
    for(let i=0; i<enemies.length;i++){
        enemies[i].update();
    }
}
function Enemy(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.y=0;
        this.x=randomize(0,canvas.width-98)
        enemies.push(this);
        };
        this.update= function(){
        this.y += 3;
        if(this.y>=canvas.height-96){
            gameOver=true;
        }
    }
    }

function randomize(min,max){
    let randomNum= Math.floor(Math.random()*(max-min+1))+min
    return randomNum;
}

function createEnemy(){
    const interval= setInterval(function(){
        let E=new Enemy();
        E.init();
    },2000)
}

function loadimg(){
    backgroundimg = new Image();
    backgroundimg.src="images/background.jpg";
    enemy=new Image();
    enemy.src="images/enemy.png";
    spaceship =new Image();
    spaceship.src="images/spaceship.png";
    bullet=new Image();
    bullet.src="images/bullet.png";
    GameoverImg=new Image();
    GameoverImg.src="images/game over.png"
}

function render(){
    ctx.drawImage(backgroundimg,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceship,spaceshipX,spaceshipY);
    for(let i =0; i<bullets.length; i++){
        if(bullets[i].exist)
        ctx.drawImage(bullet,bullets[i].x,bullets[i].y);
    }
    for(let i=0; i<enemies.length;i++){
        ctx.drawImage(enemy,enemies[i].x,enemies[i].y);
    }
}

function main(){
    if(!gameOver){
    update();
    render();
    requestAnimationFrame(main);
    }
    else{
        ctx.drawImage(GameoverImg,canvas.width/2-250,canvas.height-712)
    }
}
createEnemy();
loadimg();
setupKeyboardListener();
main();

