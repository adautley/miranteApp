import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Touro } from './../../models/touro.model';


@Injectable()
export class TouroProvider {

  touros: FirebaseListObservable<Touro[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    this.touros = this.af.database.list("/touros");
  }

  create(touro: Touro): firebase.Promise<void> {
    return this.touros
    .push(touro);
  }

  editar(touro: Touro, key): firebase.Promise<void> {
    return this.af.database.object('/touros/' + key)
    .update(touro);
  }

}
