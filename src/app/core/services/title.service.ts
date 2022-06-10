import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    @Inject('systemConfig') public systemConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  boot(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return this.systemConfig.siteTitle;
        })
      )
      .subscribe((currentTitle) => this.title.setTitle(currentTitle));
  }

  setTitle(title: string): void {
    if (title) {
      this.title.setTitle(title);
    }
  }
}
