import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.scss'],
  providers:[DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  constructor(public clipService: ClipService) {}

  clips: any[] = [];
  sort = new BehaviorSubject<string>('1');
  ngOnInit(): void {
    //fetchClips();

    this.clipService.getClips();

    window.addEventListener('scroll', this.handelScroll);
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handelScroll);
  }
  handelScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
      this.clipService.getClips();
    }
  };
}

