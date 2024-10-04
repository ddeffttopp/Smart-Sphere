export interface IUserState {
  id: string;
  name: string;
  role: string;
  email: string;
}

export const initialUserState: IUserState = {
  id: '',
  name: '',
  role: '',
  email: '',
}
