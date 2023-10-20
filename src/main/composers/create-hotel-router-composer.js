import CreateHotelUseCase from "../../domain/usecase/create-hotel-usecase";
import CreateHotelRouter from "../../presentation/routers/create-hotel-router";
import CreateHotelRepository from "../../infra/repositories/create-hotel-repository";

class CreateHotelRouterComposer {
  static compose() {
    const createHotelUseCase = new CreateHotelUseCase({
      createHotelRepository: new CreateHotelRepository(),
    });
    return new CreateHotelRouter({ createHotelUseCase });
  }
}
export default CreateHotelRouterComposer;
