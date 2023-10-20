import HotelEntity from "../entities/hotel-entity";

export default class CreateHotelUseCase {
  constructor({ createHotelRepository }) {
    this.createHotelRepository = createHotelRepository;
  }

  execute(params) {
    const hotelEntity = new HotelEntity(params);
    return hotelEntity;
  }
}
