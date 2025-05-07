import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"skeleton " + customClass',
  },
})
export class SkeletonComponent {
  @Input() customClass = '';
}
