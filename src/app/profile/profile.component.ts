import { Component, signal } from '@angular/core';
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
import { ImagesComponent } from '../components/profile/images/images.component';
import { DialogMenuComponent } from '../components/shared/dialog-menu/dialog-menu.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    LucideAngularModule,
    SkeletonComponent,
    ResourceNotFoundPageComponent,
    ResourceErrorPageComponent,
    ImagesComponent,
    DialogMenuComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$;
  isLoading$;
  isError$;
  isDescriptionChanging$;

  isOwner = false;
  descriptionValue = signal<string | null>(null);

  constructor(
    public userService: UsersService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.user$ = userService.getUser();
    this.isLoading$ = userService.getIsLoading();
    this.isError$ = userService.getIsError();
    this.isDescriptionChanging$ = userService.getIsDescriptionUploading();
  }

  /// Icons
  SquarePen = SquarePen;
  Calendar = Calendar;
  Utensils = Utensils;
  Award = Award;
  Heart = Heart;

  async handleDescriptionSave(): Promise<void> {
    const description = this.descriptionValue();
    if (description) {
      await this.userService.changeDescription(description);
    }
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.descriptionValue.set(target.value);
  }

  handleReset() {
    this.setInitialDescription();
  }

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

  setInitialDescription() {
    this.user$.subscribe((user) => {
      if (user) {
        this.descriptionValue.set(user.profileDescription);
      }
    });
  }

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
    this.setInitialDescription();
  }
}
