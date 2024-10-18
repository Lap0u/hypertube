import { useState } from 'react';

function App() {
  const [toLogin, setToLogin] = useState<boolean>(true);
  return (
    <div
      className="w-100 bg-[url('/public/bg-1.jpg')] h-screen bg-cover
     text-white flex justify-center items-center text-3xl bg-bottom">
      <div className="flex justify-center items-center border-2 border-white rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        {toLogin ? (
          <div className="flex justify-center items-center flex-col gap-8">
            <h1 className="text-5xl">Hypertube Login</h1>
            <p>Watch movies and TV shows online</p>
            <p onClick={() => setToLogin((prev) => !prev)}>
              No account yet? Sign-in.
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-8">
            <h1 className="text-5xl">Hypertube Sign-in</h1>
            <p>Watch movies and TV shows online</p>
            <p onClick={() => setToLogin((prev) => !prev)}>
              Already have an account? Login.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
