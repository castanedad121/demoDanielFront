import React from "react";
import Checkout from "./components/Checkout";
import "./index.css";
const App = () => {
  return (
    <div
      id="root"
      className="flex flex-col items-center justify-start w-screen min-h-screen gap-4  bg-[#030712] text-neutral-300"
    >
      <header className="flex w-full py-4 border-b-[1px] border-[#FF4240] justify-center items-center  ">
        <div className="flex justify-center w-1/4">
          <a href="/">
            <img
              src="https://developers.izipay.pe/logo/dark.svg"
              alt=""
              className="h-8"
            />
          </a>
        </div>
        <div className="w-2/4 flex justify-center">
          <h1 className="font-semibold text-lg">
            Demo - Formulario de Pago - Punto Web 2.0
          </h1>
        </div>

        <a
          href="https://developers.izipay.pe/web-core/"
          className="w-1/4 flex justify-center items-center gap-3"
        >
          <h2>SDK</h2>
          <img
            src="https://developers.izipay.pe/img/landing-page/sdk-icons/js.png"
            alt=""
            className="h-8"
          />
          <h2>JavaScript</h2>
        </a>
      </header>
      <Checkout />
    </div>
  );
};

export default App;
