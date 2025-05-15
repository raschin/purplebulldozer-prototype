import { useState, useCallback } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Frame, TopBar, Navigation } from '@shopify/polaris';
import {
  HomeFilledIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  PersonFilledIcon,
  ContentFilledIcon,
  BankFilledIcon,
  ChartVerticalFilledIcon,
  TargetFilledIcon,
  DiscountFilledIcon,
  GlobeFilledIcon,
} from '@shopify/polaris-icons';

import HomePage from './app/HomePage';
import MainPage from './app/MainPage';
import SubPage1 from './app/SubPage1';
import SubPage2 from './app/SubPage2';

function App() {
  const location =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location={location}>
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeFilledIcon,
            selected: location === '/',
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: OrderFilledIcon,
          },
          {
            url: '/products',
            label: 'Products',
            icon: ProductFilledIcon,
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: PersonFilledIcon,
          },
          {
            url: '/content',
            label: 'Content',
            icon: ContentFilledIcon,
          },
          {
            url: '/finance',
            label: 'Finance',
            icon: BankFilledIcon,
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: ChartVerticalFilledIcon,
          },
          {
            url: '/marketing',
            label: 'Marketing',
            icon: TargetFilledIcon,
          },
          {
            url: '/discounts',
            label: 'Discounts',
            icon: DiscountFilledIcon,
          },
        ]}
      />
      <Navigation.Section
        title="Sales Channels"
        items={[
          {
            url: '/my-app',
            selected: location.startsWith('/my-app'),
            label: 'Generic App',
            icon: ChartVerticalFilledIcon,
            subNavigationItems: [
              {
                url: '/my-app/page-1',
                label: 'Page 1',
              },
              {
                url: '/my-app/page-2',
                label: 'Page 2',
              },
            ],
          },
          {
            url: '/online-store',
            label: 'Online Store',
            icon: GlobeFilledIcon,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Router>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-app" element={<MainPage />} />
          <Route path="/my-app/page-1" element={<SubPage1 />} />
          <Route path="/my-app/page-2" element={<SubPage2 />} />
        </Routes>
      </Frame>
    </Router>
  );
}

export default App;
