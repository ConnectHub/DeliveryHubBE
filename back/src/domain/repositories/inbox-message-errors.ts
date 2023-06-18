export interface InboxMessageErrorsInterface {
  create(message: string, orderId: string, error: Error): Promise<void>;
}
