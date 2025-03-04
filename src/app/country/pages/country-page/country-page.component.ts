import { Country } from './../../interfaces/country.interface';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  imports: [ReactiveFormsModule, JsonPipe],
})
export class CountryPageComponent {

  countryService = inject(CountryService);

  regions = signal( this.countryService.regions );

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);


  fb = inject(FormBuilder);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  onFormChanged = effect( (onCleanup) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanup( () => {
      regionSubscription?.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('ao sair/mudar rota, ele limpou a subscricao');
    })
  })

  onRegionChange() {
    return this.myForm.get('region')!.valueChanges
    .pipe( // tranformar dados.... tap, dispara efeitos segundario desejado (posso ter varios tap)
      tap( () => {} ), // nao faz absolutamente nada, so pra demonstrar....
      tap( (region) => console.log( { region }) ),
      tap( () => this.myForm.get('country')!.setValue('') ), // ao mudar regiao aqui... limpando o valor de formControlName 'country'
      tap( () => this.myForm.get('border')!.setValue('') ),
      tap( () => {  // mais uma forma genial, 'tap' com varias coisas secundaria (limpando varoaveos dessa classe, simplemente)
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      // aqui ele trocou o que era antes region, agora eh countries
      switchMap( region => this.countryService.getCountriesByRegion(region ?? ''))
    )
    .subscribe( countries => { //o switchMap trocou 'region'  agora por 'countries' do tipo Country[]
      console.log({countries}); // mesma coisa da region do "tap" acima
      this.countriesByRegion.set(countries);
      /*
      // isso eh uma outra forma de fazer o que o switchMap fez!?
      this.countryService.getCountriesByRegion(region!)
        .subscribe(countries => console.log({countries}));
      */
    });
  }

  onCountryChange() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('border')?.setValue('')),
        filter( value => value!.length >0 ), // foi adicionado isso pq ao carregar pagina, value estava vazio?
        switchMap( (countryCode) => this.countryService.getCountryByAlphaCode(countryCode ?? '')), // depois disso, passar ser do tipo Country
        switchMap( country => this.countryService.getCountryBorderByCode(country.borders) ) // o subscribe abaixo agora espera um Country[]
      )
      .subscribe( borders =>{ //depois de passar pelo switchMap, agora temos um objeto do tipo Country e depois mudou para Country[]
        this.borders.set(borders);
      })

  }

  // desvantagem dessa abordagem eh que subscribe deve-se tratar a limpeza em memoria
  // nesse caso, deve tratar no ciclo de vida desse objeto para que se limpe ao destruir esse obj
  /*
  regionChangedForm = this.myForm.get('region')?.valueChanges
    .subscribe( value => {
      console.log('valor atual', value);
    });
  */

 }
