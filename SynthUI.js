
import {CustomSynthManager, CustomOcillator, EnvelopeVisualiser} from './customSynth.js';
import Knob from "./knob.js";
 

class SynthUIManager{
    constructor(attack, decay, sustain, release, canvas, oscillatorTemplate, oscillatorContainer, addOscillatorButton, removeOscillatorButton){
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        this.canvas = canvas;
        this.oscillatorTemplate = oscillatorTemplate;
        this.oscillatorContainer = oscillatorContainer;
        this.addOscillatorButton = addOscillatorButton;


        this.synthManager = new CustomSynthManager();
        this.envelopeVisualiser = new EnvelopeVisualiser(canvas);
        this.oscillators = [];
        this.oscillatorCount = 0;
        this.addOscillatorButton.onclick = this.addOscillator.bind(this);
        this.attack.onchange.push(this.updateEnvelope.bind(this));
        this.decay.onchange.push(this.updateEnvelope.bind(this));
        this.sustain.onchange.push(this.updateEnvelope.bind(this));
        this.release.onchange.push(this.updateEnvelope.bind(this));


        this.attack_value = document.getElementById("attack-value");
        this.decay_value = document.getElementById("decay-value");
        this.sustain_value = document.getElementById("sustain-value");
        this.release_value = document.getElementById("release-value");


        this.updateEnvelope();



    }
    addOscillator(){

        let elementfromhtml = document.createElement("div");
        elementfromhtml.innerHTML = this.oscillatorTemplate;

        this.oscillatorContainer.appendChild(elementfromhtml)
        let oscillatorElement = this.oscillatorContainer.lastElementChild;
        this.oscillators.push(oscillatorElement);
        let newOsc = new CustomOcillator();
        this.synthManager.addOscillator(newOsc);

        console.log(oscillatorElement);

        let detuneEl = oscillatorElement.querySelector("#oscillator-detune")
        let warmthDetuneEl = oscillatorElement.querySelector("#oscillator-warmth-detune")
        let volumeEl = oscillatorElement.querySelector("#oscillator-volume")
        let octaveEl = oscillatorElement.querySelector("#oscillator-octave")
        let warmthEl = oscillatorElement.querySelector("#oscillator-warmth")
        
        let waveformEl = oscillatorElement.querySelector(".oscillator-waveform")
        let sineEl = waveformEl.querySelector("#sin")
        let squareEl = waveformEl.querySelector("#square")
        let sawtoothEl = waveformEl.querySelector("#saw")
        let triangleEl = waveformEl.querySelector("#triangle")

        let detuneKnob = new Knob(detuneEl, -100, 100, 1);
        let warmthDetuneKnob = new Knob(warmthDetuneEl, -10, 10, .1);
        let volumeKnob = new Knob(volumeEl, -100, 1, 1);

        newOsc.setUICallbacks(sineEl, squareEl, sawtoothEl, triangleEl, detuneKnob, warmthDetuneKnob, volumeKnob, warmthEl, octaveEl);
    }
    updateEnvelope(){
        this.envelopeVisualiser.draw(this.attack.value, this.decay.value, this.sustain.value, this.release.value);
        this.synthManager.setEnvelope(this.attack.value, this.decay.value, this.sustain.value, this.release.value);
        this.attack_value.innerHTML = this.attack.value.toFixed(2);
        this.decay_value.innerHTML = this.decay.value.toFixed(2);
        this.sustain_value.innerHTML = this.sustain.value.toFixed(2);
        this.release_value.innerHTML = this.release.value.toFixed(2);
    }

    play(note){
        this.synthManager.play(note);
    }
    releaseNote(note){
        this.synthManager.release(note);
    }
    
}

export default SynthUIManager;