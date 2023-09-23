export class FormatMonth {
  public static monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  static getMonthName(monthNumber: number): string {
    return FormatMonth.monthNames[monthNumber - 1];
  }
}
