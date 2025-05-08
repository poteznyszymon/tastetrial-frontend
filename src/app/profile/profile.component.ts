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
import { SkeletonComponent } from '../components/skeleton/skeleton.component';
import { ResourceNotFoundPageComponent } from '../components/shared/resource-not-found-page/resource-not-found-page.component';
import { ResourceErrorPageComponent } from '../components/shared/resource-error-page/resource-error-page.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    LucideAngularModule,
    SkeletonComponent,
    ResourceNotFoundPageComponent,
    ResourceErrorPageComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$;
  isLoading$;
  isError$;

  isOwner = false;

  constructor(
    public userService: UsersService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.user$ = userService.getUser();
    this.isLoading$ = userService.getIsLoading();
    this.isError$ = userService.getIsError();
  }

  /// Icons
  SquarePen = SquarePen;
  Calendar = Calendar;
  Utensils = Utensils;
  Award = Award;
  Heart = Heart;

  handleReload = () => {
    this.route.paramMap.subscribe((param) => {
      const username = param.get('username');
      if (username) {
        this.userService.findUserByUsername(username);

        this.authService.getCurrentUser().subscribe((authUser) => {
          this.isOwner = authUser?.username === username;
        });
      }
    });
  };

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param) => {
      const username = param.get('username');
      if (username) {
        this.userService.findUserByUsername(username);

        this.authService.getCurrentUser().subscribe((authUser) => {
          this.isOwner = authUser?.username === username;
        });
      }
    });
  }
}
