export class FormatPhoneNumber {
  static format(phoneNumber: string): string {
    const phoneNumberFormatted = phoneNumber.replace(/\D/g, '');
    return phoneNumberFormatted;
  }
}
