// Demo: simple loader component reading global loader state.
// Enterprise: add ARIA support and animation-friendly, scoped loading.
import {
  Component,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent {
  readonly loader = inject(LoaderService);
}