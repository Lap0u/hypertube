import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const RootLayout = () => {
  return (
    <div className="w-full min-h-screen bg-mainBlack relative">
      <Header />
      <Outlet /> {/* This is where child routes will be rendered */}
      <Footer />
    </div>
  );
};

export default RootLayout;
