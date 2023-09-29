export abstract class Messaging {
  abstract sendMessage(message: string, recipient: string): Promise<void>;
  abstract sendImage(
    file: string,
    recipient: string,
    caption: string,
  ): Promise<void>;
}
