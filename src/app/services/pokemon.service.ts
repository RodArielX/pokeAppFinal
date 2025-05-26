import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  async getPokemon(name: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.API_URL}${name.toLowerCase()}`));
      return response;
    } catch (error) {
      throw new Error('Pokémon no encontrado');
    }
  }
}