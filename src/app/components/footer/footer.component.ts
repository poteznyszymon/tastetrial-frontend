import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { GithubIcon } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  Github = GithubIcon;
}
