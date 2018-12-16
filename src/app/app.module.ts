import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatInputModule, 
  MatPaginatorModule, 
  MatProgressSpinnerModule, 
  MatSortModule, 
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatPaginator,
  MatExpansionModule,
  MatListModule} from "@angular/material";
import { AppComponent } from './app.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeDetailsComponent } from './poke-details/poke-details.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    PokeListComponent,
    PokeDetailsComponent
  ],
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],entryComponents: [PokeDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
