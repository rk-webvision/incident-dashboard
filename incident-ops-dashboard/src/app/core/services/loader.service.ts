// Demo: simple global loader with show()/hide().
// Enterprise: implement reference-counting or scoped loaders.
import {
  Injectable,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  readonly loading = signal(false);

  show(): void {
    this.loading.set(true);
  }

  hide(): void {
    this.loading.set(false);
  }
}