export class OrderAdapterMapper {

  static toResponse(data: any): object {
    return {
      usuario: data.usuario,
      producto: data.producto
    };
  }

}