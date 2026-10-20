process.env.JWT_SECRET = "SUPER_SECRET_TEST";

import { UserImpl } from "../domain/UserImpl";
import { IUserRepository } from "../infraestructure/Repository/IUserRepository";

describe("UserImpl - Pruebas Unitarias de Calidad", () => {
  it("CP-02: debe rechazar la autenticacion cuando la contrasena es incorrecta", async () => {
    const mockRepo = {
      findByCorreo: jest.fn().mockResolvedValue({
        correo: "juan@test.com",
        password: "$2b$10$eImiTXuWVxfM37uY4JANjO5E/fN/S10M93rN/W96/2N6J9E.y0t0a",
      }),
    } as unknown as IUserRepository;

    const userService = new UserImpl(mockRepo);

    await expect(userService.login("juan@test.com", "123456874")).rejects.toThrow(
      "Contraseña incorrecta"
    );
  });
});