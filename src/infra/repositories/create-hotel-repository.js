import PostgreHelper from "../helpers/postgre-helper";

class CreateHotelRepository {
  async execute(query) {
    const postgreHelper = new PostgreHelper();
    postgreHelper.connect("");
  }
}

export default CreateHotelRepository;
