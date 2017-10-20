import { AddVariasNovilhasPage } from './../pages/add-varias-novilhas/add-varias-novilhas';
import { AddNovilhasPage } from './../pages/add-novilhas/add-novilhas';
import { AddRecemPage } from './../pages/add-recem/add-recem';
import { AddTourosPage } from './../pages/add-touros/add-touros';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { EditarNovilhaPage } from './../pages/editar-novilha/editar-novilha';
import { EditarRecemPage } from './../pages/editar-recem/editar-recem';
import { EditarTouroPage } from './../pages/editar-touro/editar-touro';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { NovilhasPage } from './../pages/novilhas/novilhas';
import { NovilhaProvider } from './../providers/novilha/novilha.provider';
import { RecemNascidosPage } from './../pages/recem-nascidos/recem-nascidos';
import { RecemNascidoProvider } from './../providers/recem-nascido/recem-nascido.provider';
import { TourosPage } from './../pages/touros/touros';
import { TouroProvider } from './../providers/touro/touro.provider';
import * as firebase from 'firebase';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { HttpModule } from "@angular/http";


export const firebaseConfig = {
    apiKey: "AIzaSyCpzd9g6GBc6eoOFJX-38FvvkEK97fC2sM",
    authDomain: "miranteapp.firebaseapp.com",
    databaseURL: "https://miranteapp.firebaseio.com",
    storageBucket: "miranteapp.appspot.com",
    messagingSenderId: "880025962213"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AddNovilhasPage,
    AddRecemPage,
    AddTourosPage,
    AddVariasNovilhasPage,
    EditarNovilhaPage,
    EditarRecemPage,
    EditarTouroPage,
    HomePage,
    MyApp,
    NovilhasPage,
    RecemNascidosPage,
    TourosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AddNovilhasPage,
    AddRecemPage,
    AddTourosPage,
    AddVariasNovilhasPage,
    EditarNovilhaPage,
    EditarRecemPage,
    EditarTouroPage,
    MyApp,
    HomePage,
    NovilhasPage,
    RecemNascidosPage,
    TourosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NovilhaProvider,
    TouroProvider,
    RecemNascidoProvider
  ]
})
export class AppModule {}
