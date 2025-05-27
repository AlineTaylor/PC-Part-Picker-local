import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../../../search/search.component';

@Component({
  selector: 'app-hero',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  // injecting MatDialog to open search dialog
  readonly dialog = inject(MatDialog);
  SearchComponent = SearchComponent;
  // emojis to be displayed
  emojis: string[] = ['💻', '🖥️', '🖱️', '⌨️', '🎧', '💾', '🔋'];
  currentEmojiIndex: number = 0;
  currentEmoji: string = this.emojis[0];
  intervalId: any;
  isFading: boolean = false;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.isFading = true; // Start fading out
      setTimeout(() => {
        this.currentEmojiIndex =
          (this.currentEmojiIndex + 1) % this.emojis.length;
        this.currentEmoji = this.emojis[this.currentEmojiIndex];
        this.isFading = false; // Fade back in
      }, 500); // 500ms fade duration
    }, 2000); // Every 2 seconds
  }

  openDialog(component: ComponentType<any>) {
    this.dialog.open(component);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
