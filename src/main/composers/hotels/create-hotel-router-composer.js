import CreateHotelUseCase from "../../../domain/usecase/hotels/create-hotel-usecase";
import CreateHotelRouter from "../../../presentation/routers/hotels/create-hotel-router";
import CreateHotelRepository from "../../../infra/repositories/hotels/create-hotel-repository";

class CreateHotelRouterComposer {
  static compose() {
    const createHotelUseCase = new CreateHotelUseCase({
      createHotelRepository: new CreateHotelRepository(),
    });
    return new CreateHotelRouter({ createHotelUseCase });
  }
}
export default CreateHotelRouterComposer;
