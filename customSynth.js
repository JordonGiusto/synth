class CustomSynthManager{
    constructor(){
        this.envelope = new Tone.AmplitudeEnvelope();
        this.oscillators = [];
        this.envelope.toDestination();
    }
    getEnvelope(){
        return this.envelope;
    }
    addOscillator(osc){
        this.oscillators.push(osc);
        osc.setDestination(this.envelope);
    }
    setEnvelope(attack, decay, sustain, release){
        this.envelope.attack = attack;
        this.envelope.decay = decay;
        this.envelope.sustain = sustain;
        this.envelope.release = release;
    }
    play(note){
        this.oscillators.forEach(element => {
            element.play(note);
        });
        this.envelope.triggerAttack();
        
    }
    release(note){
        this.envelope.triggerRelease();
    }
}



class CustomOcillator{
    constructor(){
        this.mainOscilator = new Tone.Oscillator("440", "sine");
        this.wavform = "sine";
        this.warmthDetune = 2;
        this.warmthOscilator = new Tone.Oscillator("440", "sine");
        this.warmthOscilator.volume.value = -10;
        this.ocataveOscilator = new Tone.Oscillator("880", "sine");
        this.destination = new Tone.Gain(1);
        this.detune = 0;

        this.mainOscilator.start();
        this.warmthOscilator.start();
        this.ocataveOscilator.start();

        this.sineButton = null;
        this.squareButton = null;
        this.triangleButton = null;
        this.sawButton = null;

        this.detuneKnob = null;
        this.warmthDetuneKnob = null;
        this.volumeKnob = null;

        this.warmthButton = null;
        this.octaveButton = null;

    }
    setDestination(destination){
        this.destination = destination;
        this.mainOscilator.connect(this.destination);
        this.warmthOscilator.connect(this.destination);
        this.ocataveOscilator.connect(this.destination);
    }
    getDestination(){
        return this.destination;
    }
    play(note){
        this.mainOscilator.frequency.value = Tone.Frequency(note) + this.detune;
        this.warmthOscilator.frequency.value = Tone.Frequency(note) + this.detune + this.warmthDetune;
        this.ocataveOscilator.frequency.value = (Tone.Frequency(note) + this.detune) * 2;
    }
    setOctaveOcilator(on){
        if(on){
            this.ocataveOscilator.connect(this.destination);
        }else{
            this.ocataveOscilator.disconnect(this.destination);
        }
    }
    setWarmthOscilator(on){
        if(on){
            this.warmthOscilator.connect(this.destination);
        }else{
            this.warmthOscilator.disconnect(this.destination);
        }
    }
    setVolume(volume){
        this.mainOscilator.volume.value = volume;
        this.warmthOscilator.volume.value = volume - 10;
        this.ocataveOscilator.volume.value = volume;

        this.setDestination(this.destination);
    }
    setDetune(detune){
        this.detune = detune;
    }
    setWarmthDetune(detune){
        this.warmthDetune = detune;
    }
    setWavform(wavform){
        this.wavform = wavform;
        this.mainOscilator.type = wavform;
        this.warmthOscilator.type = wavform;
        this.ocataveOscilator.type = wavform;
    }


    setUICallbacks(sineButton, squareButton, triangleButton, sawButton, detuneKnob, warmthDetuneKnob, volumeKnob, warmthButton, octaveButton){
 
        this.sineButton = sineButton;
        this.squareButton = squareButton;
        this.triangleButton = triangleButton;
        this.sawButton = sawButton;

        this.detuneKnob = detuneKnob;
        this.warmthDetuneKnob = warmthDetuneKnob;
        this.volumeKnob = volumeKnob;

        this.warmthButton = warmthButton;
        this.octaveButton = octaveButton;


        this.sineButton.onclick = () => {
            sineButton.classList.add("selected");
            squareButton.classList.remove("selected");
            triangleButton.classList.remove("selected");
            sawButton.classList.remove("selected");
            this.setWavform("sine");
        }
        this.squareButton.onclick = () => {
            sineButton.classList.remove("selected");
            squareButton.classList.add("selected");
            triangleButton.classList.remove("selected");
            sawButton.classList.remove("selected");
            this.setWavform("square");
        }
        this.triangleButton.onclick = () => {
            sineButton.classList.remove("selected");
            squareButton.classList.remove("selected");
            triangleButton.classList.add("selected");
            sawButton.classList.remove("selected");
            this.setWavform("triangle");
        }
        this.sawButton.onclick = () => {
            sineButton.classList.remove("selected");
            squareButton.classList.remove("selected");
            triangleButton.classList.remove("selected");
            sawButton.classList.add("selected");
            this.setWavform("sawtooth");
        }

        this.detuneKnob.onchange.push(() => {
            this.setDetune(this.detuneKnob.value);
        }
        );
        this.warmthDetuneKnob.onchange.push(() => {
            this.setWarmthDetune(this.warmthDetuneKnob.value);
        }
        );
        this.volumeKnob.onchange.push(() => {
            this.setVolume(this.volumeKnob.value);
        }
        );

        this.warmthButton.onclick = () => {
            if(this.warmthButton.classList.contains("selected")){
                this.warmthButton.classList.remove("selected");
                this.setWarmthOscilator(false);
            }else{
                this.warmthButton.classList.add("selected");
                this.setWarmthOscilator(true);
            }
        }

        this.octaveButton.onclick = () => {
            if(this.octaveButton.classList.contains("selected")){
                this.octaveButton.classList.remove("selected");
                this.setOctaveOcilator(false);
            }else{
                this.octaveButton.classList.add("selected");
                this.setOctaveOcilator(true);
            }
        }



    }





}


class EnvelopeVisualiser{
    constructor(canvas){
        this.canvas = canvas;
    }
    draw(attack, decay, sustain, release){
        let width = this.canvas.width;
        let height = this.canvas.height;

        let factor = attack + decay + release;
        factor *= 4 / 3;

        let ctx = this.canvas.getContext("2d");


        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(attack / factor * width, 0);
        ctx.lineTo((attack+decay)*width/factor, (1 - sustain)*height);
        ctx.lineTo(((attack + decay)/factor + 1/4) * width, (1 - sustain)*height);
        ctx.lineTo(width, height);
        ctx.stroke();
    }
}





export {CustomSynthManager, CustomOcillator, EnvelopeVisualiser};

