import * as React from 'react';

import { Link } from 'react-router-dom';

import getTranslations from '../../Translations/index';

import customKey from './customKey';

import { addonPrefixDashboardMenu } from './addonPrefix';

/**
 * Default menu entries
 */
const translations: { [key: string]: any } = getTranslations();

let currentLanguage = localStorage.getItem('globalLanguage') ? localStorage.getItem('globalLanguage') : 'en';

currentLanguage = currentLanguage.toLowerCase();

const menuItems = [
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_chat,
    text: translations.menu_text_chat,
    icon: 'fas fa-comments',
    href: 'index.html#/chat',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_favourites,
    text: translations.menu_text_favourites,
    icon: 'fab fa-gratipay',
    href: 'index.html#/favourites',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_add_favourites,
    text: translations.menu_text_add_favourites,
    icon: 'fas fa-user-plus',
    href: 'index.html#/add-favourites',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_messages,
    text: translations.menu_text_messages,
    icon: 'far fa-envelope',
    href: 'index.html#/messages',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_notifications,
    text: translations.menu_text_notifications,
    icon: 'far fa-bell',
    href: 'index.html#/notifications',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_security,
    text: translations.menu_text_security,
    icon: 'fas fa-shield-alt',
    href: 'index.html#/security',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_security_settings,
    text: translations.menu_text_security_settings,
    icon: 'fas fa-user-shield',
    href: 'index.html#/security-settings',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_security_examples,
    text: translations.menu_text_security_examples,
    icon: 'fab fa-stack-exchange',
    href: 'index.html#/security-examples',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_download_images,
    text: translations.menu_text_download_images,
    icon: 'fas fa-images',
    href: 'images.html#/download-images',
  },
  {
    attributes: {
      title: translations.menu_title_security,
    },
    title: translations.menu_title_images_favourites,
    text: translations.menu_text_images_favourites,
    icon: 'fas fa-star',
    href: 'images.html#/favourites-images',
  }
];

const menuItemsPopup = [
  {
    title: translations.menu_title_home,
    text: translations.menu_text_home,
    icon: 'far fa-user',
    href: '/',
  },
  {
    title: translations.menu_title_cookies,
    text: translations.menu_text_cookies,
    icon: 'fas fa-cookie',
    href: '/cookies',
  },
  {
    title: translations.menu_title_iframes,
    text: translations.menu_text_iframes,
    icon: 'far fa-window-restore',
    href: '/iframes',
  },
  {
    title: translations.menu_title_security,
    text: translations.menu_text_security,
    icon: 'fas fa-shield-alt',
    href: '/security',
  },
  {
    title: translations.menu_title_download_images,
    text: translations.menu_text_download_images,
    icon: 'fas fa-images',
    href: '/download-images',
  }
];

const getMenu = (location: string) => {

  if('popup' == location){
    return (
      <ul className="main-menu" key={customKey()}>
        {
          menuItemsPopup.map((entry: any) => {
              return <li key={customKey()}>
                <Link to={entry.href} title={entry.title}>
                  {
                    entry.icon &&
                    (
                      <span className="icon">
                        <i className={entry.icon} />
                      </span>
                    )
                  }
                  <span className="text">
                    {
                      entry.text
                    }
                  </span>
                  {
                    undefined !== entry.childs && entry.childs.length !== 0 &&
                    (
                      <span className="arrow">
                        <i className="fas fa-chevron-down action-icon" />
                      </span>
                    )
                  }
                </Link>
              </li>
            })
        }
      </ul>
    );
  }

  return (
    <ul className="main-menu" key={customKey()}>
      {
          menuItems.map((entry: any) => {
            return <li key={customKey()}>
              <a href={`${addonPrefixDashboardMenu()}${entry.href}`} title={entry.title}>
                {
                  entry.icon &&
                  (
                    <span className="icon">
                      <i className={entry.icon} />
                    </span>
                  )
                }
                <span className="text">
                  {
                    entry.text
                  }
                </span>
                {
                  undefined !== entry.childs && entry.childs.length !== 0 &&
                  (
                    <span className="arrow">
                      <i className="fas fa-chevron-down action-icon" />
                    </span>
                  )
                }
              </a>
            </li>
          })
      }
    </ul>
  );
};

export default getMenu;

