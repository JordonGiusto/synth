class CustomSynthManager{
    constructor(){
        this.envelope = new Tone.AmplitudeEnvelope();
        this.oscillator = new Tone.Oscillator("440", "sine");
        this.setSynth();
    }


    setSynthType(type){
        this.oscillator.type = type;
    }

    setSynth(synth){
        this.oscillator.connect(this.envelope);
        this.envelope.toDestination();
        this.oscillator.start();
    }

    getEnvelope(){
        return this.envelope;
    }
    getSynth(){
        return this.synth;
    }
    setEnvelope(attack, decay, sustain, release){
        this.envelope.attack = attack;
        this.envelope.decay = decay;
        this.envelope.sustain = sustain;
        this.envelope.release = release;
    }
    play(note){
        this.oscillator.frequency.value = Tone.Frequency(note);
        this.envelope.triggerAttack();
    }
    release(note){
        this.envelope.triggerRelease();
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

export {CustomSynthManager, EnvelopeVisualiser};