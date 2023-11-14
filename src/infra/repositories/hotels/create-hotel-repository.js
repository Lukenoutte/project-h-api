import PostgreHelper from "../../helpers/postgre-helper";

class CreateHotelRepository {
  async execute(hotelEntity) {
    PostgreHelper.executeQuery(
      `
      INSERT INTO hotels
        (name, address, city, country)
      VALUES
        ($1, $2, $3, $4);
      `,
      hotelEntity.getArray(),
    );
  }
}

export default CreateHotelRepository;
