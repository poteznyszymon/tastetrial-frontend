import { Component, Input } from '@angular/core';
import {
  Clock,
  Heart,
  LucideAngularModule,
  MapPin,
  Medal,
  Star,
  UtensilsIcon,
} from 'lucide-angular';
import { User } from '../../../models/user';
import { getAccountAgeInMonths } from '../../../utils/activeSince';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css',
})
export class TilesComponent {
  @Input() user: User | null = null;

  /// Icons
  Star = Star;
  Utensils = UtensilsIcon;
  Location = MapPin;
  Clock = Clock;
  Heart = Heart;
  Medal = Medal;

  get activeSince(): number | null {
    if (!this.user?.createdAt) return null;
    return getAccountAgeInMonths(this.user.createdAt);
  }
}
