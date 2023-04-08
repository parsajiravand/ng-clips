import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit {
  id = '';
  player?: any;
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
