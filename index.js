
import {CustomSynthManager, EnvelopeVisualiser} from './customSynth.js';
import SynthUIManager from './SynthUI.js';
import Knob from "./knob.js";

let playbutton = document.getElementById("play-button");

let synthManager;

let keyMap = {

}

let canvas = document.getElementById("envelopeCanvas");


let attackKnob = new Knob(document.getElementById("attack-knob"), 0, 2, 0.05);
let decayKnob = new Knob(document.getElementById("decay-knob"), 0, 2, 0.05);
let sustainKnob = new Knob(document.getElementById("sustain-knob"), 0, 1, 0.05);
let releaseKnob = new Knob(document.getElementById("release-knob"), 0, 5, 0.05);




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


attack_value.innerHTML = attackKnob.value.toFixed(2);
decay_value.innerHTML = decayKnob.value.toFixed(2);
sustain_value.innerHTML = sustainKnob.value.toFixed(2);
release_value.innerHTML = releaseKnob.value.toFixed(2);


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

//console.log(document.getElementById("oscillator-template-holder").innerHTML)

function setup (){
    Tone.start();
    synthManager = new SynthUIManager(attackKnob, decayKnob, sustainKnob, releaseKnob, canvas, document.getElementById("oscillator-template-holder").innerHTML,  document.getElementsByClassName("oscillators")[0], document.getElementById("add-occilator-button"), null);
    document.addEventListener("keydown", (event) => {
        if(!keyMap[event.key] && event.key == "a"){
            synthManager.play("c4");
        }
        keyMap[event.key] = true;
    
    });
    document.addEventListener("keyup", (event) => {
        keyMap[event.key] = false;
        if(!keyMap["a"]){
            synthManager.releaseNote("c4");
        }
    });

}






playbutton.onclick = setup;



