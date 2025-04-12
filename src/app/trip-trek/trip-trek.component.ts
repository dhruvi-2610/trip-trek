import { Component } from '@angular/core';
import { Trip } from './trip.model';

@Component({
  selector: 'app-trip-trek',
  templateUrl: './trip-trek.component.html',
  styleUrls: ['./trip-trek.component.scss'],
})
export class TripTrekComponent {
  trips: Trip[] = [];
  startTrip = '';
  endTrip = '';
  continueFlag : boolean = true;

  addTrip() {
    if (this.startTrip && this.endTrip) {
      this.trips.push({
        start: this.startTrip.trim(),
        end: this.endTrip.trim()
      });
      this.startTrip = '';
      this.endTrip = '';
    }
  }

  getLevel(index: number): number {
    if (index === 0) return 1;

    const prev = this.trips[index - 1];
    const current = this.trips[index];
    const next = this.trips[index + 1];

    if (prev.start === current.start && prev.end === current.end) {
      return 2;
    }
    else if ((next != null || next != undefined) && next.start === current.start && next.end === current.end) {
        return 2;
      }

    return 1;
  }

  isContinued(index: number): boolean {
    if (index === 0) return true;

    const prev = this.trips[index - 1];
    const current = this.trips[index];
    this.continueFlag = prev.end === current.end && prev.start != current.start ? false : true;

    return this.continueFlag;
  }
  clearTrips(){
    this.startTrip = '';
    this.endTrip = '';
    this.trips = [];

  }
}
