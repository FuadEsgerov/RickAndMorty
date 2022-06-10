import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IReqCharacters } from 'src/app/core/http/character/character.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Output() filterChanged = new EventEmitter();

  statusOptions = {
    alive: 'Alive',
    dead: 'Dead',
    unknown: 'Unknown',
  };

  genderOptions = {
    female: 'Female',
    male: 'Male',
    genderless: 'Genderless',
    unknown: 'Unknown',
  };

  speciesOptions = {
    humanoid: 'Humanoid',
    alien: 'Alien',
    unknown: 'unknown',
    human: 'Human',
    poopybutthole: 'Poopybutthole',
    mytholog: 'Mytholog',
    animal: 'Animal',
    vampire: 'Vampire',
    robot: 'Robot',
  };

  options = {
    name: '',
    status: '',
    gender: '',
    species: '',
  };

  formParams = {
    ...this.options,
  };

  applyFilter(): void {
    const params: IReqCharacters = {};

    if (this.formParams.name) {
      params.name = this.formParams.name;
    }

    if (this.formParams.status) {
      params.status = this.formParams.status;
    }

    if (this.formParams.gender) {
      params.gender = this.formParams.gender;
    }

    if (this.formParams.species) {
      params.species = this.formParams.species;
    }

    this.filterChanged.next(params);
  }

  clearFilter(): void {
    this.formParams = {
      ...this.options,
    };
    this.applyFilter();
  }

  ngOnInit(): void {}
}
