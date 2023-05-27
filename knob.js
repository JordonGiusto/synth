
class Knob{
    constructor(knob, min = -1, max = 1, sense = .05){
        this.container = knob;
        this.min = min;
        this.max = max;
        this.value = (max + min)/2;
        this.sense = sense;
        this.clicked = false;
        this.knob = this.container.getElementsByClassName("knob-outer")[0];
        this.knob.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.knob.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.knob.addEventListener("mouseleave", this.onMouseUp.bind(this));
        this.knob.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.onchange = [];
    }

    getRotation(){
        return  -((this.value - this.min)/(this.max - this.min) * 270 - 135);
    }

    onMouseDown(event){
        this.clicked = true;
    }
    onMouseUp(event){
        this.clicked = false;
    }
    onMouseMove(event){
        if(this.clicked){
            this.value -= event.movementY * this.sense;
            if(this.value > this.max){
                this.value = this.max;
            }
            if(this.value < this.min){
                this.value = this.min;
            }
            if(this.onchange.length > 0){
            this.onchange.forEach(f => {
                f();
            });
        }
        }
        let rotation = this.getRotation();
        this.knob.style.transform = "rotate(" + -rotation + "deg)";
    }

}

export default Knob;