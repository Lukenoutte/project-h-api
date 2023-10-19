import HotelEntity from "../entities/hotel-entity";

export default class CreateHotelUseCase {
  constructor({ hotelRepository }) {
    this.hotelRepository = hotelRepository;
  }

  execute(params) {
    const hotelEntity = new HotelEntity(params);
    return hotelEntity;
  }
}
