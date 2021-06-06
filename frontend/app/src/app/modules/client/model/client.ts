import { Plan } from './plan';
export interface Client {

  birth_day: string;
  city: { id: number, name: string };
  id: number;
  name: string;
  plans: Plan[];
  email: string;
  phone: string;
  state: string;
}
