export class FormatPhoneNumber {
  static format(phoneNumber: string): string {
    const onlyNumbers = phoneNumber.replace(/\D/g, '');
    const numberFormatted = onlyNumbers.replace(/^(\+?55)?0?(\d+)$/, '55$2');
    return `${numberFormatted}@c.us`;
  }
}
