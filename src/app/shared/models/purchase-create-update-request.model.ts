export interface PurchaseCreateUpdateRequest {
  total: number;
  customerId: number;
  items: PurchaseItemCreateUpdateRequest[];
}

export interface PurchaseItemCreateUpdateRequest {
  eventId: number;
  eventName: string;
  quantity: number;
  price: number;
}
