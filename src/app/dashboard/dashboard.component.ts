import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeroComponent } from '../shared/layout/hero/hero.component';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, HeroComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
