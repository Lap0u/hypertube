import { Outlet } from 'react-router-dom';
import Header from './Header';
const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* This is where child routes will be rendered */}
    </div>
  );
};

export default RootLayout;
