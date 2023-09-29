export class RandomStringGenerator {
  generate(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      randomString += chars.charAt(index);
    }
    return randomString;
  }
}
