import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[DatePipe]
})
export class ClipComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player?: any;
  clip?: IClip;
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.route.data.subscribe((data) => {
      this.clip = data['clip'] as IClip;

      this.player?.src({
        src: this.clip.url,
        type:'video/mp4'
      });
    });
  }
}
