import DefaultSprite from '../../media/placeholder-image.png';

const BASE_URL = 'https://pokeapi.co/api/v2';

class Pokemon {
  constructor(name = '???', types = ['Type'], sprite = DefaultSprite, moves = [], abilities = [], stats = []) {
    this.name = name;
    this.types = types;
    this.sprite = sprite;
    this.moves = moves;
    this.abilities = abilities;
    this.stats = stats;
  }

  isDefault() {
    return this.name === '???';
  }

  static instanceFromApi(data) {
    const name = data.name;
    const types = this.getTypesArrayFromApi(data);
    const sprite = this.getSpriteFromApi(data);
    const moves = this.getMovesArrayFromApi(data);
    const abilities = this.getAbilitiesArrayFromApi(data);
    const stats = this.getStatsArrayFromApi(data);

    return new Pokemon(name, types, sprite, moves, abilities, stats);
  }

  static instanceFromObject(obj) {
    return new Pokemon(obj.name, obj.types, obj.sprite, obj.moves, obj.abilities, obj.stats);
  }

  static getTypesArrayFromApi(data) {
    return data.types.map(type => {
      return type.type.name;
    });
  }

  static getSpriteFromApi(data) {
    return data.sprites.other['official-artwork'].front_default;
  }

  static async fetchById(id) {
    const res = await fetch(`${BASE_URL}/pokemon/${id}`);
    const data = await res.json();
    return Pokemon.instanceFromApi(data);
  }

  static getMovesArrayFromApi(data) {
    return data.moves.map(move => move.move.name);
  }

  static getAbilitiesArrayFromApi(data) {
    return data.abilities.map(ability => ability.ability.name);
  }

  static getStatsArrayFromApi(data) {
    return data.stats.map(stat => {
      return {
        name: stat.stat.name,
        value: stat.base_stat,
      };
    });
  }
}

export default Pokemon;
