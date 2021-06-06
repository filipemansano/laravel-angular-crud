import { NavItem } from './../models/nav-item';

export const MENU_ITENS: NavItem[] = [
  {
    displayName: 'Clients',
    iconName: 'group',
    route: '/client',
    children: [
      {
        displayName: 'List',
        iconName: '',
        route: '/client/',
      }
    ]
  },
];
