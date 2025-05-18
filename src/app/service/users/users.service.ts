import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../shared/toast.service';
import {
  BehaviorSubject,
  catchError,
  finalize,
  firstValueFrom,
  last,
  Observable,
  of,
  tap,
} from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private isLoading = new BehaviorSubject<Boolean>(false);
  private isError = new BehaviorSubject<Boolean>(false);

  /// images
  private uploadProgress = new BehaviorSubject<number>(0);
  private isUploading = new BehaviorSubject<boolean>(false);
  private uploadError = new BehaviorSubject<boolean>(false);

  /// description
  private isDescriptionLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public httpClient: HttpClient,
    public toastService: ToastService,
    public authService: AuthService
  ) {}

  public async findUserByUsername(username: string): Promise<void> {
    this.isError.next(false);
    this.isLoading.next(true);
    try {
      const user = await firstValueFrom(
        this.httpClient.get<User>(`/api/user/${username}`)
      );
      this.currentUser.next(user);
    } catch (error: any) {
      if (error.status === 404) {
        return;
      }
      console.log(error);
      this.isError.next(true);
    } finally {
      this.isLoading.next(false);
    }
  }

  public async uploadImage(
    file: File,
    type: 'cover' | 'profile'
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    this.uploadProgress.next(0);
    this.uploadError.next(false);
    this.isUploading.next(true);

    try {
      await firstValueFrom(
        this.httpClient
          .post<{ id: number; url: string }>(
            `/api/user/${type}-image`,
            formData,
            {
              reportProgress: true,
              observe: 'events',
            }
          )
          .pipe(
            tap((event) => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                const percentDone = Math.round(
                  (100 * event.loaded) / event.total
                );
                this.uploadProgress.next(Math.min(percentDone, 90));
              } else if (event.type === HttpEventType.Response) {
                this.uploadProgress.next(100);
                const body = event.body;
                if (body?.url) {
                  if (type === 'profile')
                    this.authService.authorizeUser('revalidate');
                  const current = this.currentUser.getValue();
                  if (current) {
                    const updatedUser: User = {
                      ...current,
                      [type + 'Image']: { url: body.url },
                    };
                    this.currentUser.next(updatedUser);
                  }
                }
              }
            }),
            finalize(() => {
              this.isUploading.next(false);
              this.toastService.show(
                `New ${type} image has been successfully uploaded`,
                'primary'
              );
            }),
            last()
          )
      );
    } catch (err) {
      this.uploadError.next(true);
      console.error('Upload error:', err);
    }
  }

  public async changeDescription(description: string): Promise<void> {
    this.isDescriptionLoading.next(true);
    try {
      const response = this.httpClient.post<User>('/api/user', {
        profileDescription: description,
      });
      const current = this.currentUser.getValue();
      if (current) {
        const updatedUser: User = {
          ...current,
          profileDescription: (await firstValueFrom(response))
            .profileDescription,
        };
        this.currentUser.next(updatedUser);
      }
    } catch (error) {
    } finally {
      this.isDescriptionLoading.next(false);
    }
  }

  public getUser = (): Observable<User | null> => {
    return this.currentUser.asObservable();
  };

  public getIsLoading = (): Observable<Boolean> => {
    return this.isLoading.asObservable();
  };

  public getIsError = (): Observable<Boolean> => {
    return this.isError.asObservable();
  };

  public getUploadProgress = (): Observable<number> =>
    this.uploadProgress.asObservable();

  public getIsUploading = (): Observable<boolean> =>
    this.isUploading.asObservable();

  public getUploadError = (): Observable<boolean> =>
    this.uploadError.asObservable();

  public getIsDescriptionUploading = (): Observable<boolean> =>
    this.isDescriptionLoading;
}
