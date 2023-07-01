import { api } from "../../../services/api";

export interface Resident {
  id: string;
  name: string;
  buildingApartment: string;
  phoneNumber: string;
  email: string;
}
export async function getResidents(): Promise<Resident[]> {
  return (await api.get("/resident/list")).data;
}

export async function createResident(resident: Resident): Promise<Resident> {
  return (
    await api.post('/resident/create', {
      ...resident,
      condominiumId: '511c3cff-49ca-40f6-ac5d-335a2ce81cff',
    })
  ).data;
}
