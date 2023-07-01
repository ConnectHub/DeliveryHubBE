import { api } from "../../../services/api";

interface Resident {
  id: string;
  name: string;
  buildingApartment: string;
  phoneNumber: string;
  email: string;
}
export async function getResidents(): Promise<Resident[]> {
  return (await api.get("/resident/list")).data;
}
