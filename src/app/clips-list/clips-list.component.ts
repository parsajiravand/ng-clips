import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClipService } from '../services/clip.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.scss'],
  providers: [DatePipe],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true;
  constructor(public clipService: ClipService) {}

  clips: unknown[] = [];
  sort = new BehaviorSubject<string>('1');
  ngOnInit(): void {
    this.clipService.getClips();

    if (this.scrollable) window.addEventListener('scroll', this.handelScroll);
  }
  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handelScroll);
    }

    this.clipService.pageClips = [];
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
