import { FormControl } from '@angular/forms';
import { take, map, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { CityService } from '@shared/services/city.service';
import { City } from '@shared/model/city';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() placeholder!: string;

  cities!: any[];

  emptyFilterMessage = '';
  selectedCity!: City;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.cities = [
      {
        label: 'Cidade', items: [{
          label: this.placeholder,
          value: this.control.value,
        }]
      }
    ];
  }

  filter(term: string): void {
    this.cityService.search(term).pipe(
      take(1),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.emptyFilterMessage = 'Pesquisando'),
      map(cities => this.handleCities(cities)),
    ).subscribe(cities => {
      if (cities.length === 0) {
        this.emptyFilterMessage = 'Nenhum resultado encontrado';
      }
      this.cities = cities;
    });
  }

  private handleCities(cities: City[]): any {

    const states: {
      [s: string]: { label: string, items: { label: string, value: number }[] }
    } = {};

    cities.forEach((city) => {
      if (states[city.state] === undefined) {
        states[city.state] = { label: city.state, items: [] };
      }

      states[city.state].items.push({ label: city.name, value: city.id });
    });

    return Object.keys(states).map((k) => states[k]);
  }

}
