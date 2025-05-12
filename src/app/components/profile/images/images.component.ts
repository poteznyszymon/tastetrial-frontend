import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import {
  Image,
  LucideAngularModule,
  SquarePen,
  Upload,
  X,
} from 'lucide-angular';
import { User } from '../../../models/user';
import { LoadingButtonComponent } from '../../loading-button/loading-button.component';
import { UsersService } from '../../../service/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-images',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
})
export class ImagesComponent {
  constructor(public userService: UsersService) {
    this.$isUploading = userService.getIsUploading();
    this.$uploadProgress = userService.getUploadProgress();
  }

  @Input() isOwner: boolean = false;
  @Input() user!: User;

  coverImage = signal<File | null>(null);
  profileImage = signal<File | null>(null);

  previewUrls = {
    cover: signal<string | null>(null),
    profile: signal<string | null>(null),
  };

  editImageDialogOpen = signal(false);
  editImageDialogType = signal<'cover' | 'profile' | null>(null);

  $uploadProgress!: Observable<number>;
  $isUploading!: Observable<boolean>;

  tempIsUploading = true;

  async handleImageUpload() {
    const type = this.editImageDialogType();
    if (!type) return;

    const file = type === 'cover' ? this.coverImage() : this.profileImage();
    if (!file) return;

    await this.userService.uploadImage(file, type);
    this.editImageDialogOpen.set(false);
    this.coverImage.set(null);
    this.profileImage.set(null);
  }

  openDialog(type: 'cover' | 'profile') {
    this.editImageDialogOpen.set(true);
    this.editImageDialogType.set(type);
  }

  closeDialog() {
    this.editImageDialogOpen.set(false);
    this.editImageDialogType.set(null);
    this.coverImage.set(null);
    this.profileImage.set(null);
  }

  onFileSelect(event: Event, type: 'cover' | 'profile'): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const objectUrl = URL.createObjectURL(file);

      if (type === 'cover') {
        this.coverImage.set(file);
      } else {
        this.profileImage.set(file);
      }

      this.previewUrls[type].set(objectUrl);
    }
  }

  fileUrl(type: 'cover' | 'profile'): string | null {
    const file = type === 'cover' ? this.coverImage() : this.profileImage();
    return file ? URL.createObjectURL(file) : null;
  }

  SquarePen = SquarePen;
  X = X;
  ImageIcon = Image;
  UploadIcon = Upload;
}
