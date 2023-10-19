import CreateHotelUseCase from "../../domain/usecase/create-hotel-usecase";
import CreateHotelRouter from "../../presentation/routers/create-hotel-router";

class CreateHotelRouterComposer {
  static compose() {
    const createHotelUseCase = new CreateHotelUseCase({ hotelRepository: {} });
    return new CreateHotelRouter({ createHotelUseCase });
  }
}
export default CreateHotelRouterComposer;
