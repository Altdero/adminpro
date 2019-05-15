import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {
    this.getDataRoute().subscribe( data => {
      this.title = data.titulo;
      _title.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title
      };

      _meta.updateTag( metaTag );
    } );
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this._router.events.pipe(
      filter( (eventoa: Event) => eventoa instanceof ActivationEnd ),
      filter( (eventob: ActivationEnd) => eventob.snapshot.firstChild === null ),
      map( (eventoc: ActivationEnd) => eventoc.snapshot.data )
    );
  }

}
