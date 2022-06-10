import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, concatMap } from 'rxjs';
import { CharacterService, LocationService } from 'src/app/core/http';
import { TitleService } from 'src/app/core/services';

@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private locationService: LocationService,
    private router: Router,
    private titleService: TitleService
  ) {}

  locationId = +this.route.snapshot.paramMap.get('locationId');
  loading = true;
  location = null;
  characters = [];

  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode(): void {
    this.locationService
      .location(this.locationId)
      .subscribe((location) => {
        this.location = location;
        this.titleService.setTitle(location.name);
        if (location.residents.length > 0) {
          this.getResidents(location.residents);
        } else {
          this.loading = false;
        }
      });
  }

  getResidents(residents): void {
    const residentIds: number[] = residents.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(residentIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .subscribe((resident) => {
        reqCount++;
        this.characters.push(resident);
        if (reqCount === residentIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }
}
