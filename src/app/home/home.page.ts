import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonName = '';
  pokemonData: any;
  opinion = '';
  errorMsg = '';

  tiposPokemon: string = '';
  movesPokemon: { move: { name: string } }[] = [];
  habilidadesPokemon: { ability: { name: string } }[] = [];
  statsPokemon: { stat: { name: string }, base_stat: number }[] = [];

  constructor(
    private pokeService: PokemonService,
    private fbService: FirebaseService
  ) {}

  async buscarPokemon() {
    this.errorMsg = '';
    this.pokemonData = null;
    this.tiposPokemon = '';
    this.movesPokemon = [];
    this.habilidadesPokemon = [];
    this.statsPokemon = [];

    if (!this.pokemonName.trim()) {
      this.errorMsg = 'Por favor, ingresa un nombre de Pokémon.';
      return;
    }

    try {
      const data = await this.pokeService.getPokemon(this.pokemonName.toLowerCase());
      this.pokemonData = data;
      this.tiposPokemon = data.types?.map((t: { type: { name: string } }) => t.type.name).join(', ') || '';
      this.movesPokemon = data.moves?.slice(0, 5) || []; // solo 5 movimientos por simplicidad visual
      this.habilidadesPokemon = data.abilities || [];
      this.statsPokemon = data.stats || [];
    } catch (error: any) {
      this.errorMsg = error?.message || 'Error al buscar el Pokémon.';
    }
  }

  async guardarEnFirebase() {
    if (!this.pokemonData) return;

    const data = {
      id: this.pokemonData.id,
      nombre: this.pokemonData.name,
      imagen: this.pokemonData.sprites?.front_default || '',
      tipo: this.pokemonData.types?.map((t: any) => t.type.name) || [],
      peso: this.pokemonData.weight,
      altura: this.pokemonData.height,
      experiencia_base: this.pokemonData.base_experience,
      habilidades: this.habilidadesPokemon.map(a => a.ability.name),
      stats: this.statsPokemon.map(s => ({
        nombre: s.stat.name,
        valor: s.base_stat
      })),
      movimientos: this.movesPokemon.map(m => m.move.name),
      opinion: this.opinion.trim(),
    };

    try {
      await this.fbService.savePokemon(data);
      alert('Guardado en Firebase con éxito');
      this.opinion = '';
    } catch (error: any) {
      alert('Error al guardar en Firebase: ' + (error?.message || 'desconocido'));
    }
  }
}

