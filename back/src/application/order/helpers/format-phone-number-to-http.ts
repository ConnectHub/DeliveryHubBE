export class FormatPhoneNumber {
  static format(phoneNumber: string): string {
    if (!phoneNumber) return undefined;
    const phoneNumberFormatted = phoneNumber.replace(/\D/g, '');
    return phoneNumberFormatted;
  }
}
