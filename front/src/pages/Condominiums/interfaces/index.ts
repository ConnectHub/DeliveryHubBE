export interface Condominium {
  id: string;
  name: string;
  remember?: boolean;
  label: string;
  value: string;
}

export interface CreateCondominium {
  name: string;
}
