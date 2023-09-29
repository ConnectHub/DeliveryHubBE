export class FormatPhoneNumber {
  static format(phoneNumber: string): string {
    if (!phoneNumber) return '';
    const onlyNumbers = phoneNumber.replace(/\D/g, '');
    const numberFormatted = onlyNumbers.replace(/^(\+?55)?0?(\d+)$/, '55$2');
    return `${numberFormatted}@c.us`;
  }

  static unFormat(phoneNumber: string): string {
    if (!phoneNumber) return '';
    const numberWithoutSuffix = phoneNumber.replace(/@c\.us$/, '');
    const onlyNumbers = numberWithoutSuffix.replace(/\D/g, '');
    return onlyNumbers.replace(/^(\+?55)?(\d{2})(\d+)$/, '+$1($2)$3');
  }
}
