import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { finalize, from, concatMap } from 'rxjs';
import { CharacterService, EpisodeService } from 'src/app/core/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  characters = null;
  loading = false;
  pageEvent: PageEvent;
  request = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.loading = true;
    this.characters = null;
    this.characterService
      .characters(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        const firstEpisodes = [];
        response.results.forEach((item, index, arr) => {
          if (item.location.url) {
            const locationId = item.location.url.split('location/')[1];
            const firstEpisode = item.episode[0].split('episode/')[1];
            arr[index].locationId = locationId;
            arr[index].firstEpisode = firstEpisode;
            firstEpisodes.push(firstEpisode);
          }
        });

        let reqCount = 0;
        from(firstEpisodes)
          .pipe(concatMap((i) => this.episodeService.episode(i)))
          .subscribe((episode) => {
            response.results[reqCount].firstSeenIn = episode.name;
            reqCount++;
            if (reqCount === firstEpisodes.length) {
              this.loading = false;
              this.characters = response;
            }
          });
      });
  }

  detail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }

  applyFilter(event: Event): void {
    this.request = event;
    if (this.pageEvent) {
      this.paginator.firstPage();
    }
    this.loadTable();
  }

}
