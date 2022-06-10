import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, concatMap } from 'rxjs';
import { CharacterService, EpisodeService } from 'src/app/core/http';
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
    private episodeService: EpisodeService,
    private router: Router,
    private titleService: TitleService
  ) {}

  episodeId = +this.route.snapshot.paramMap.get('episodeId');
  loading = true;
  episode = null;
  characters = [];

  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode(): void {
    this.episodeService
      .episode(this.episodeId)
      .subscribe((episode) => {
        this.episode = episode;
        this.titleService.setTitle(episode.name);
        this.getCharacters(episode.characters);
      });
  }

  getCharacters(characters): void {
    const characterIds: number[] = characters.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(characterIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .subscribe((resident) => {
        reqCount++;
        this.characters.push(resident);
        if (reqCount === characterIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }
}
