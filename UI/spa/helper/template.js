/* eslint-disable import/extensions */
import SiteAction from '../store/store.js';

export const sideBarLinks = () => {
  const { isadmin } = SiteAction.getUserDetails();
  const links = {
    client: {
      childTag: 'links',
      childComponent: { type: 'literal', data: '<a href="{{href}}" class="router" data-path="{{path}}" data-view="{{view}}">{{text}}</a>' },
      childNodes: [
        {
          text: 'Loans',
          href: './loans.html',
          path: '/loans',
          view: 'loans'
        },
        {
          text: 'Apply',
          href: './application.html',
          path: '/apply',
          view: 'application'
        }
      ]
    },
    admin: {
      childTag: 'links',
      childComponent: { type: 'literal', data: '<a href="{{href}}" class="router" data-path="{{path}}" data-view="{{view}}">{{text}}</a>' },
      childNodes: [
        {
          text: 'Dashboard',
          href: './dashboard.html',
          class: 'active',
          path: '/dashboard',
          view: 'dashboard'
        },
        {
          text: 'Loans',
          href: './admin-loans.html',
          path: '/loans',
          view: 'loans'
        },
        {
          text: 'Clients',
          href: './admin-clients.html',
          path: '/clients',
          view: 'clients'
        }
      ]
    }
  };
  return isadmin ? links.admin : links.client;
};

export const topMenuLinks = {
  childTag: 'links',
  childComponent: { type: 'literal', data: '<a href="{{href}}">{{text}}</a>' },
  childNodes: [
    {
      text: 'Logout',
      href: './index.html',
    }
  ]
};
