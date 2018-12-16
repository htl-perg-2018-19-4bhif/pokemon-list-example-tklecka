import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PokeApiService } from '../poke-api.service';
import { Pokemon } from '../pokemon';
import { PokeDetailsComponent } from '../poke-details/poke-details.component';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'details'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pokeapi: PokeApiService, public dialog: MatDialog) {
    this.getPokemon();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPokemon() {
    this.pokeapi.get("pokemon/").subscribe(
      resultArray => {
        let obj = JSON.stringify(resultArray);
        let names: string[] = this.getNames(obj,"name");

        let counter = 0;
        let pokemonArray: Pokemon[] = [];
        names.forEach(i => {
          var pokemon = <Pokemon>{};
          pokemon.id = counter;
          pokemon.name = i;
          pokemonArray.push(pokemon);
          counter++;
        });

        this.dataSource = new MatTableDataSource(<Pokemon[]>pokemonArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.connect();
        return true;
      },
      error => console.log("GET Error :: " + error)
    )
  }

  getNames(msg: string, filter: string) {
    console.log(filter);
    let pokemonNamesArray: string[] = []
    var obj = JSON.parse(msg, function (key, value) {
      if (key == filter) {
        pokemonNamesArray.push(value);
      } else {
      }
    });
    return pokemonNamesArray;
  }

  showDetails(pokemonSelected: Pokemon){
    this.pokeapi.get("pokemon/"+pokemonSelected.name+"/").subscribe(
      resultArray => {
        let pokemon: Pokemon = {} as Pokemon;
        let abilites: string[] = [];

        let jsonString = resultArray;
        
        let abilityObjects = jsonString['abilities'];
        abilityObjects.forEach(ability => {
          abilites.push(ability['ability']['name'])
        })
        pokemon.abilities = abilites;
        pokemon.name = jsonString['name'];
        pokemon.weight = jsonString['weight'] / 10;
        pokemon.id = pokemonSelected.id;
        pokemon.url = this.pokeapi.baseURL+"pokemon/"+pokemon.name+"/";
        pokemon.pic = jsonString['sprites']['front_default'];

        this.openDialog(pokemon);

        console.log(pokemon);
      },
      error => console.log("GET Error :: " + error)
    )
  }

  openDialog( pok: Pokemon ) {
        let dialogRef = this.dialog.open( PokeDetailsComponent, {
            height: '450px',
            width: '450px',
            data: { pokemon: pok },
        } );
    }

}
