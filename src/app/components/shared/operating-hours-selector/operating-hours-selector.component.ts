import { Component, effect, Input, signal, ViewChild } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { AlarmClockPlus, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-operating-hours-selector',
  imports: [
    DropDownComponent,
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './operating-hours-selector.component.html',
  styleUrl: './operating-hours-selector.component.css',
})
export class OperatingHoursSelectorComponent {
  @ViewChild('openDropdown') openDropdown!: DropDownComponent;

  @Input() form!: FormGroup;

  openTime = signal<string | null>(null);
  closeTime = signal<string | null>(null);

  handleCloseSelect() {
    this.openTime.set(null);
    this.closeTime.set(null);
  }

  handleOpenTimeChange(time: string, type: 'open' | 'close') {
    if (type === 'open') {
      this.openTime.set(time);
      this.form.get('openTime')?.setValue(time);

      const openIndex = this.hours.indexOf(time);
      const close = this.closeTime();

      if (!close) {
        this.closeTime.set(time);
        this.form.get('closeTime')?.setValue(time);
      }

      if (close && this.hours.indexOf(close) < openIndex) {
        const nextClose = this.hours[openIndex] || null;
        this.closeTime.set(nextClose);
        this.form.get('closeTime')?.setValue(nextClose);
      }
    } else {
      this.closeTime.set(time);
      this.form.get('closeTime')?.setValue(time);

      const closeIndex = this.hours.indexOf(time);
      const open = this.openTime();

      if (!open) {
        this.openTime.set(time);
        this.form.get('openTime')?.setValue(time);
      }

      if (open && this.hours.indexOf(open) > closeIndex) {
        const nextOpen = this.hours[closeIndex] || null;
        this.openTime.set(nextOpen);
        this.form.get('openTime')?.setValue(nextOpen);
      }
    }
  }

  /*
  constructor() {
    effect(() => {
      const open = this.openTime();
      const close = this.closeTime();
      console.log('[effect] openTime:', open, 'closeTime:', close);
    });
  }
  */

  hours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  clock = AlarmClockPlus;
}
