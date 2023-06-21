export class FormatDate {
  static format(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
}
