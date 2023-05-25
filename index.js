import {CustomSynthManager, EnvelopeVisualiser} from './customSynth.js';


let playbutton = document.getElementById("play-button");


let synthManager;
let envelopeVisualiser;

let keyMap = {

}



function updateEnvelope(){
    let attack = document.getElementById("attack").value/50;
    let decay = document.getElementById("decay").value/50;
    let sustain = document.getElementById("sustain").value/100;
    let release = document.getElementById("release").value/20;
    synthManager.setEnvelope(attack, decay, sustain, release);
    draw();
}



document.getElementById("attack").oninput = updateEnvelope;
document.getElementById("decay").oninput = updateEnvelope;
document.getElementById("sustain").oninput = updateEnvelope;
document.getElementById("release").oninput = updateEnvelope;



function draw(){
    envelopeVisualiser.draw(synthManager.envelope.attack, synthManager.envelope.decay, synthManager.envelope.sustain, synthManager.envelope.release);
}

function setup (){
    Tone.start();
    synthManager = new CustomSynthManager();
    synthManager.setEnvelope(0.5, 0.5, 0.1, 0.8);
    envelopeVisualiser = new EnvelopeVisualiser(document.getElementById("envelopeCanvas"));
    console.log("setup");
    draw();
}


document.addEventListener("keydown", (event) => {
    if(!keyMap[event.key] && event.key == "a"){
        synthManager.play("c4");
    }
    keyMap[event.key] = true;

});
document.addEventListener("keyup", (event) => {
    keyMap[event.key] = false;
    if(!keyMap["a"]){
        synthManager.release();
    }
});



playbutton.onclick = setup;

