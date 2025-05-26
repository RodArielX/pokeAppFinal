import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async savePokemon(data: any) {
    const dbInstance = collection(this.firestore, 'Pokedex_EGuachamin_JRamirez_AAshqui');
    await addDoc(dbInstance, data);
  }
}
