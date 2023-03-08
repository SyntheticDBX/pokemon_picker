import DefaultSprite from '../../media/team-placeholder.jpg';

const BASE_URL = 'https://pokeapi.co/api/v2';

class Pokemon {
  constructor(name = '???', types = ['Type'], sprite = DefaultSprite) {
    this.name = name;
    this.types = types;
    this.sprite = sprite;
  }

  isDefault() {
    return this.name === '???';
  }

  static instanceFromApi(data) {
    const name = data.name;
    const types = this.getTypesArrayFromApi(data);
    const sprite = this.getSpriteFromApi(data);

    return new Pokemon(name, types, sprite);
  }

  static instanceFromObject(obj) {
    return new Pokemon(obj.name, obj.types, obj.sprite);
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
}

export default Pokemon;
