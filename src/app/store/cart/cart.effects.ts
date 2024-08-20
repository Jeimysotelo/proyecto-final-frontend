import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions) {}

  // Aquí puedes añadir efectos si los necesitas
}