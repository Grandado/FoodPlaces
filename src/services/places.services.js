import places from '../../store/places.json';

export default class PlacesServices {
  getAll() {
    return places;
  }

  getOne(item) {
    places.filter((i) => {});
  }

  insertOne(item) {
    places.push(item);
    return 'Item inserido com sucesso!';
  }

  insertMoreThanOne(itens) {
    itens.forEach((i) => places.push(i));
    return 'Todos os itens inseridos com sucesso!';
  }
}
