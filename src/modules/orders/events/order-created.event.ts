export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,

    public readonly customerId: string,

    public readonly totalPrice: number,
  ) {}
}
