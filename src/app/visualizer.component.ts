import {
  Component, ElementRef, ViewChild, OnInit, Input
} from '@angular/core';

declare var AudioContext, webkitAudioContext: any; // ADDED

@Component({
  selector: 'visualizer',
  template: '<canvas #canvas id="visualizer_render"></canvas>',
  styleUrls: ['./radio.component.css']
})

export class VisualizerComponent implements OnInit {
  @Input() audio: any;
  @ViewChild('canvas') canvasRef: ElementRef;


  private _viewInitialized: boolean = false;
  private canvas: any;
  private context: AudioContext;
  analyser: AnalyserNode;
  private ctx: CanvasRenderingContext2D;
  private source: any;
  private fbc_array: any;
  private bars: number;
  private bar_height: number;
  private bar_width: number
  private bar_x: number;

  ngOnInit(): void {
    this.initAudioVisualizer();
  }

    initAudioVisualizer(): void {
        this.context = new AudioContext(); // AudioContext object instance
       
        this.analyser = this.context.createAnalyser(); // AnalyserNode method
        this.canvas = this.canvasRef.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        // Re-route audio playback into the processing graph of the AudioContext
        this.source = this.context.createMediaElementSource(this.audio); 
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
        this.frameLooper();
    }

    // frameLooper() animates any style of graphics you wish to the audio frequency
    // Looping at the default frame rate that the browser provides(approx. 60 FPS)
    frameLooper() : void {
        
        this.analyser.getByteFrequencyData(this.fbc_array);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.ctx.fillStyle = '#e5f8ff'; // Color of the bars
        this.bars = 100;
        for (var i = 0; i < this.bars; i++) {
            this.bar_x = i * 3;
            this.bar_width = 2;
            this.bar_height = -(this.fbc_array[i] / 2);
            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            this.ctx.fillRect(this.bar_x, this.canvas.height, this.bar_width, this.bar_height);
        }
        requestAnimationFrame(() => this.frameLooper());
    }


}
