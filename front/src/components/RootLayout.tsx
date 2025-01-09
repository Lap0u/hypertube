import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-mainBlack">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
