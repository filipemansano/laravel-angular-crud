export interface AppState {
  theme: string;
  notifications: any[];
};

export const initialAppState: AppState = {
  theme: 'light',
  notifications: [
    {
      title: 'Exemplo de notificação',
      description: 'conteudo resumido da notificação vai ser aqui',
      created_at: new Date(),
    },
    {
      title: 'Bem vindo ao sistema',
      description: 'ainda em construção',
      created_at: new Date(),
    }
  ]
}
