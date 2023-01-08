var wH, wW = 0
var T = [[], [], []]
var LEN = 0
towerHeight = -(T[0].length*40)
ringNumber = 15
colors = []
sleepNow = true
maxSpeed = document.getElementById('speedSlider').max

for(i=0; i<ringNumber; i++) {
    T[0].push(i)
    colors.push(getRandomColor())
}

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function setup() {
    canv = createCanvas(windowWidth*0.975, windowHeight*0.8);
    canvas = document.getElementById('defaultCanvas0')
    canvas.style.border = "solid"
    canvas.style.position = "absolute"
    canvas.style.padding = "0"
    wH, wW = windowHeight, windowWidth

    TowerBaseWidth = (canv.width/3) -10
    towerHeight = -(ringNumber*20) -20

    const bin = document.getElementById('bin')
    bin.textContent = "0".repeat(ringNumber)

    msSleepingTime = document.getElementById('speedSlider').value

    Hanoi(ringNumber)
}

async function draw() {
    onresize()
    drawRing()
}

function drawRing() {
    fill("rgb(100, 100, 100)")
    for(i=0; i<3; i++){
        towerHeight = -(T[i].length*20) - 40
        rect(5+(TowerBaseWidth+5)*i+TowerBaseWidth/2 -10, canv.height-10, 20, towerHeight, 0, 0, 20, 20)
    }
    for(i in T) {
        m = []
        k2 = (1/ringNumber)
        for(k=1; k<ringNumber+1; k++) {
            ww = 1-k2*k + k2
            w2 = ((canv.width/1.8) * ww)/2 > 20 ? ww : 75.6/canv.width
            m.push(w2)
        }
        for(u=0; u < T[i].length; u++) {
            num = T[i][u]
            y = canv.height-(30 + 20*u)
            w = ((canv.width/1.8) * m[num])/2
            x = (5 + (TowerBaseWidth*i)/2 + (TowerBaseWidth/2+5)*i) + (TowerBaseWidth-w)/2
            h = 20
            fill(colors[num])
            rect(x, y, w, h, 20, 20, 20, 20)
        }
    }
}

function moveDisk(from, to) {
    TowerFrom = T[from]
    TowerTo = T[to]
    T[to].push(T[from][T[from].length -1])
    T[from].pop()
    drawRing()
}

async function Hanoi(n, from=0, to=2 , via=1) {
    if (n==0) return;
    if(T[0].length == 0 && T[2].length == ringNumber) return
    await Hanoi(n-1, from, via , to);
    updateSleepingTime()
    await delay(msSleepingTime);
    bin.textContent = (dec2bin(parseInt(bin.textContent, 2)+1)).padStart(ringNumber,'0')
    moveDisk(from,to);
    await Hanoi(n-1, via, to , from);
}

function onresize() {
    resizeCanvas(windowWidth*0.975, windowHeight*0.8);
    wW = windowWidth
    wH = windowHeight
    TowerBaseWidth = (canv.width/3) -10
    towerHeight = -(ringNumber*20) -20
    fill("rgb(100, 100, 100)")
    for(i=0; i<3; i++){
        rect(5+(TowerBaseWidth+5)*i,canv.height-10,TowerBaseWidth,10, 20, 20, 0, 0)
    }
}

const delay = async (ms) => new Promise(res => setTimeout(res, ms));

const dec2bin = (dec) => (dec >>> 0).toString(2);

function updateSleepingTime() {
    //document.getElementById("speedSlider").value = Math.round(Math.exp(document.getElementById("speedSlider").value)) % document.getElementById("speedSlider").max;
    msSleepingTime = maxSpeed - document.getElementById('speedSlider').value;//Math.exp(document.getElementById('speedSlider').value);
}