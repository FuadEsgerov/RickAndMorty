import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IReqLocations } from 'src/app/core/http/location/location.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Output() filterChanged = new EventEmitter();

  typeOptions = {
    planet: 'Planet',
    cluster: 'Cluster',
    spacestation: 'Space station',
    microverse: 'Microverse',
    tv: 'TV',
    resort: 'Resort',
    fantasytown: 'Fantasy town',
    dream: 'Dream',
    dimension: 'Dimension',
    unknown: 'Unknown',
    menagerie: 'Menagerie',
    game: 'Game',
    customs: 'Customs',
    daycare: 'Daycare',
    dwarf: 'Dwarf planet (Celestial Dwarf)',
    miniverse: 'Miniverse',
  };

  dimensionOptions = {
    planet: 'Planet',
    dead: 'Dead',
    unknown: 'Unknown',
  };

  options = {
    name: '',
    type: '',
    dimension: '',
  };

  formParams = {
    ...this.options,
  };

  applyFilter(): void {
    const params: IReqLocations = {};

    if (this.formParams.name) {
      params.name = this.formParams.name;
    }

    if (this.formParams.type) {
      params.type = this.formParams.type;
    }

    if (this.formParams.dimension) {
      params.dimension = this.formParams.dimension;
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
