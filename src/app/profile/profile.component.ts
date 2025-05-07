import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  Award,
  Calendar,
  Heart,
  LucideAngularModule,
  SquarePen,
  Utensils,
} from 'lucide-angular';
import { UsersService } from '../service/users/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$;
  isLoading$;

  constructor(public userService: UsersService, public route: ActivatedRoute) {
    this.user$ = userService.getUser();
    this.isLoading$ = userService.getIsLoading();
  }

  /// Icons
  SquarePen = SquarePen;
  Calendar = Calendar;
  Utensils = Utensils;
  Award = Award;
  Heart = Heart;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param) => {
      const username = param.get('username');
      if (username) {
        this.userService.findUserByUsername(username);
      }
    });
  }
}
