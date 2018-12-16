import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatExpansionModule, MatListModule} from '@angular/material';

@Component( {
    selector: 'app-poke-details',
    styleUrls: ['./poke-details.component.css'],
    templateUrl: 'poke-details.component.html',
} )
export class PokeDetailsComponent {
    
    constructor(
        public dialogRef: MatDialogRef<PokeDetailsComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: any) { }


}

