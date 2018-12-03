import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from './app.component';
import { DndComponent } from './dnd/dnd.component';
import { TestComponent } from './test/test.component';
import { DndStrictComponent } from './dnd-strict/dnd-strict.component';
import { ComponentCreationComponent } from './component-creation/component-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    DndComponent,
    TestComponent,
    DndStrictComponent,
    ComponentCreationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    TestComponent
  ]
})
export class AppModule { }