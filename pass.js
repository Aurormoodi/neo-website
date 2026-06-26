// =========================
// NEO PASS
// =========================

// -------- Einstellungen --------

let currentXP = 0;
let currentLevel = 1;

const maxLevel = 50;

// XP die pro Level benötigt werden

function xpForLevel(level){

    return level * 100;

}

// -------------------------------


// Spielername laden

window.onload = function(){

    loadName();

    createLevels();

    updateXP();

    monthlyReset();

}



// -------------------------------

function saveName(){

    const name =
        document.getElementById("playerName").value;

    if(name.trim()=="") return;

    localStorage.setItem("neo_name",name);

    loadName();

}



// -------------------------------

function loadName(){

    const name =
    localStorage.getItem("neo_name");

    if(name){

        document.getElementById("welcomeName").innerHTML =
        "Willkommen, "+name;

        document.getElementById("playerName").value =
        name;

    }

}



// -------------------------------

function createLevels(){

    const container =
    document.getElementById("levels");

    container.innerHTML="";

    for(let i=1;i<=maxLevel;i++){

        let reward;

        if(i%10==0){

            reward="🏆 Spezialbelohnung";

        }

        else{

            reward="+100 NeoGems";

        }

        container.innerHTML +=

        `
        <div class="level"
             id="level${i}">

            <h2>Level ${i}</h2>

            <p>${xpForLevel(i)} XP</p>

            <div class="reward">

            ${reward}

            </div>

        </div>
        `;

    }

}



// -------------------------------

function updateXP(){

    let needed =
    xpForLevel(currentLevel);

    let percent =
    (currentXP/needed)*100;

    if(percent>100)
        percent=100;

    document.getElementById("xpFill").style.width=
    percent+"%";

    document.getElementById("xpText").innerHTML=
    currentXP+" / "+needed+" XP";

}



// -------------------------------

// TEST BUTTONS

function addXP(amount){

    currentXP += amount;

    while(currentXP>=xpForLevel(currentLevel)
          && currentLevel<maxLevel){

        currentXP -= xpForLevel(currentLevel);

        currentLevel++;

    }

    updateXP();

}



// -------------------------------

// Monatsreset

function monthlyReset(){

    const month =
    new Date().getMonth();

    const last =
    localStorage.getItem("neo_month");

    if(last==null){

        localStorage.setItem("neo_month",month);

        return;

    }

    if(last!=month){

        currentXP=0;

        currentLevel=1;

        updateXP();

        localStorage.setItem("neo_month",month);

    }

}
