import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterService } from 'src/app/core/http';
import { from } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-characters-dialog',
  templateUrl: './characters-dialog.component.html',
  styleUrls: ['./characters-dialog.component.css'],
})
export class CharactersDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private characterService: CharacterService,
    private router: Router
  ) {}
  loading = true;
  characters = [];
  ngOnInit(): void {
    const residentIds: number[] = this.data.characters.map(
      (item: string) => item.split('character/')[1]
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
