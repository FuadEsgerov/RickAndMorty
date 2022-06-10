import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LocationService } from 'src/app/core/http';
import { CharactersDialogComponent } from 'src/app/shared/components/characters-dialog/characters-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  displayedColumns = ['id', 'name', 'type', 'dimension', 'residents'];

  locations = null;
  loading = false;
  pageEvent: PageEvent;
  request = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.loading = true;
    this.locations = null;
    this.locationService
      .locations(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.locations = response;
        this.loading = false;
      });
  }

  residents(location): void {
    this.dialog.open(CharactersDialogComponent, {
      data: {
        characters: location.residents,
        title: `${location.name} Residents`,
      },
    });
  }

  applyFilter(event: Event): void {
    this.request = event;
    if (this.pageEvent) {
      this.paginator.firstPage();
    }
    this.loadTable();
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
