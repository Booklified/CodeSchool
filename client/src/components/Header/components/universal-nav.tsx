import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, SkeletonSprite } from '../../helpers';
import NavLinks, { type NavLinksProps } from './nav-links';
import NavLogo from './nav-logo';
import './universal-nav.css';
import AuthOrProfile from './auth-or-profile';

type UniversalNavProps = Omit<
  NavLinksProps,
  'toggleNightMode' | 'openSignoutModal'
> & {
  fetchState: { pending: boolean };
  searchBarRef?: React.RefObject<HTMLDivElement>;
};
const UniversalNav = ({
  displayMenu,
  showMenu,
  hideMenu,
  menuButtonRef,
  // searchBarRef,
  user,
  fetchState
}: UniversalNavProps): JSX.Element => {
  const { pending } = fetchState;
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('aria.primary-nav')}
      className='universal-nav'
      id='universal-nav'
      data-playwright-test-label='header-universal-nav'
    >
      {/* {isSearchExposedWidth && (
        <div className='universal-nav-left'>{search}</div>
      )} */}
      <Link
        className='universal-nav-logo'
        id='universal-nav-logo'
        to='/learn'
        data-playwright-test-label='header-universal-nav-logo'
      >
        <NavLogo />
      </Link>
      <div className='universal-nav-right main-nav'>
        {pending ? (
          <div className='nav-skeleton'>
            <SkeletonSprite />
          </div>
        ) : (
          <>
            {/* <LanguageList /> */}
            {/* <MenuButton
              displayMenu={displayMenu}
              hideMenu={hideMenu}
              innerRef={menuButtonRef}
              showMenu={showMenu}
              user={user}
            /> */}
            {/* {!isSearchExposedWidth && search} */}
            <NavLinks
              displayMenu={displayMenu}
              hideMenu={hideMenu}
              menuButtonRef={menuButtonRef}
              showMenu={showMenu}
              user={user}
            />
            <AuthOrProfile user={user} />
          </>
        )}
      </div>
    </nav>
  );
};

UniversalNav.displayName = 'UniversalNav';
export default UniversalNav;
