
import {CustomSynthManager, EnvelopeVisualiser} from './customSynth.js';
import Knob from "./knob.js";

let playbutton = document.getElementById("play-button");


let synthManager;
let envelopeVisualiser;

let keyMap = {

}

let attackKnob = new Knob("attack-knob", 0, 2, 0.05);
let decayKnob = new Knob("decay-knob", 0, 2, 0.05);
let sustainKnob = new Knob("sustain-knob", 0, 1, 0.05);
let releaseKnob = new Knob("release-knob", 0, 5, 0.05);




function updateEnvelope(){
    let attack = attackKnob.value;
    let decay = decayKnob.value;
    let sustain = sustainKnob.value;
    let release = releaseKnob.value;

    synthManager.setEnvelope(attack, decay, sustain, release);
    draw();
}


let attack_value = document.getElementById("attack-value");
let decay_value = document.getElementById("decay-value");
let sustain_value = document.getElementById("sustain-value");
let release_value = document.getElementById("release-value");

attackKnob.onchange.push(() => {
    attack_value.innerHTML = attackKnob.value.toFixed(2);
});
decayKnob.onchange.push(() => {
    decay_value.innerHTML = decayKnob.value.toFixed(2);
});
sustainKnob.onchange.push(() => {
    sustain_value.innerHTML = sustainKnob.value.toFixed(2);
});
releaseKnob.onchange.push(() => {
    release_value.innerHTML = releaseKnob.value.toFixed(2);
});




attackKnob.onchange.push(updateEnvelope);
decayKnob.onchange.push(updateEnvelope);
sustainKnob.onchange.push(updateEnvelope);
releaseKnob.onchange.push(updateEnvelope);






function draw(){
    envelopeVisualiser.draw(synthManager.envelope.attack, synthManager.envelope.decay, synthManager.envelope.sustain, synthManager.envelope.release);
}

function setup (){
    Tone.start();
    synthManager = new CustomSynthManager();
    synthManager.setEnvelope(0.5, 0.5, 0.1, 0.8);
    envelopeVisualiser = new EnvelopeVisualiser(document.getElementById("envelopeCanvas"));
    console.log("setup");
    updateEnvelope();
    playbutton.onclick = () => {};
    //disable play button
    playbutton.classList.add("disabled");

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

let sineButton = document.getElementById("sin");
let squareButton = document.getElementById("square");
let sawButton = document.getElementById("saw");

sineButton.onclick = () => {
    synthManager.setSynthType("sine");
    sineButton.classList.add("selected");
    squareButton.classList.remove("selected");
    sawButton.classList.remove("selected");
}
squareButton.onclick = () => {
    synthManager.setSynthType("square");
    sineButton.classList.remove("selected");
    squareButton.classList.add("selected");
    sawButton.classList.remove("selected");
}
sawButton.onclick = () => {
    synthManager.setSynthType("sawtooth");
    sineButton.classList.remove("selected");
    squareButton.classList.remove("selected");
    sawButton.classList.add("selected");
}


