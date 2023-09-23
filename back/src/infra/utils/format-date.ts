export class FormatDate {
  static format(date: Date): string {
    if (!date) return undefined;
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
}
