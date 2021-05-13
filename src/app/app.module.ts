import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AffiliateEffects, CityEffects, InterestEffects, ItineraryEffects, PasswordEffects, ProfileEffects, PutProfileEffects, SessionEffects } from './store/effects';
import { ItineraryReducer, ProfileReducer, PutProfileReducer, AuthReducer, CityReducer, InterestReducer, AffiliateReducer } from './store/reducers';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { AuthEffects } from './store/effects/auth.effect';
import { PasswordReducer } from './store/reducers/password.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      itinerary: ItineraryReducer,
      profile: ProfileReducer,
      putProfile: PutProfileReducer,
      auth: AuthReducer,
      city: CityReducer,
      interest: InterestReducer,
      password: PasswordReducer,
      affiliate: AffiliateReducer
    }),
    EffectsModule.forRoot([
      ItineraryEffects,
      ProfileEffects,
      SessionEffects,
      PutProfileEffects,
      AuthEffects,
      CityEffects,
      InterestEffects,
      PasswordEffects,
      AffiliateEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatNativeDateModule,
    MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
