import { Component, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AsyncPipe } from '@angular/common';
import { finalize, map, takeUntil, timer } from 'rxjs';

const OFFER_TIME = 30; // seconds
@Component({
  selector: 'app-ad-banner',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.css',
})
export class AdBannerComponent {
  offerExpired = signal(false);
  timer = timer(0, 1000).pipe(
    map((val) => {
      if (!val) {
        return 100;
      }
      return ((OFFER_TIME - val) / OFFER_TIME) * 100;
    }),
    takeUntil(timer((OFFER_TIME + 1) * 1000)),
    finalize(() => {
      this.offerExpired.set(true);
    })
  );
  remainingTime = this.timer.pipe(
    map((val) => Math.round((val / 100) * OFFER_TIME))
  );
}
