import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
export default class ProfileController {
  public async show(request: Request, response: Response) {
    const listUser = new ShowProfileService();
    const user_id = request.user.id;
    const user = await listUser.execute({ user_id });

    response.json(instanceToInstance(user));
    return;
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const UpdateUser = new UpdateProfileService();

    const user = await UpdateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    response.json(instanceToInstance(UpdateUser));
    return;
  }
}
