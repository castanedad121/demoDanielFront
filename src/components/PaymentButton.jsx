import React, { useEffect, useState } from "react";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { fetchToken, setOrder } from "../store/orderSlice";
import generateOrder from "../utils/generateOrder";
import removeKeyRecursive from "../utils/removeKeyRecursive";
import getCurrentTransactionTime from "../utils/getCurrentTransactionTime";

const PaymentButton = ({
  integrationMethod,
  amount,
  actionForm,
  arrayMethodPay,
  lenguageSelect,
  appearance,
  customData,
  configCurrency,
  processType,
  cardToken,
  merchantBuyerId,
}) => {
  const { currency, merchantCode } = configCurrency;
  const {
    field1,
    field2,
    field3,
    field4,
    field5,
    field6,
    field7,
    field8,
    field9,
    field10,
  } = customData;
  const { logo, theme, hColor } = appearance;
  const { init, control } = lenguageSelect;
  const { pay, register, payRegister, payToken } = actionForm;
  const { popUp, embebed, redirect } = integrationMethod;
  const dispatch = useDispatch();
  const { transactionId, orderNumber, token, status } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const { transactionId, orderNumber } = generateOrder();
    dispatch(setOrder({ transactionId, orderNumber }));

    dispatch(
      fetchToken({
        transactionId,
        orderData: {
          requestSource: "ECOMMERCE",
          merchantCode: configCurrency.merchantCode,
          orderNumber,
          publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
          amount: amount,
        },
      })
    );
  }, [
    dispatch,
    integrationMethod,
    amount,
    actionForm,
    arrayMethodPay,
    lenguageSelect,
    appearance,
    customData,
    merchantCode,
    configCurrency,
    processType,
    cardToken,
    merchantBuyerId,
  ]);

  const handlePayment = () => {
    const containerIframe = document.querySelector("#container-iframe");
    if (embebed) containerIframe.style.backgroundColor = "white";
    const paymentMessage = document.querySelector("#payment-message");
    const objetConfig = document.querySelector("#objet-config");
    // Limpiar mensaje de pago
    paymentMessage.innerHTML = "";

    // Verifica que el contenedor existe antes de ejecutar LoadForm
    const container = document.querySelector("#iframe-payment");
    if (!container) {
      console.error("El contenedor #iframe-payment no existe en el DOM.");
      return;
    }

    // Verifica que el SDK esté cargado antes de continuar
    if (!token || !window.Izipay) {
      console.error("Izipay no está cargado o el token es inválido.");
      return;
    }

    const paymentConfig = {
      transactionId,

      action: register
        ? window.Izipay.enums.payActions.REGISTER
        : payRegister
        ? window.Izipay.enums.payActions.PAY_REGISTER
        : payToken
        ? window.Izipay.enums.payActions.PAY_TOKEN
        : window.Izipay.enums.payActions.PAY,
      merchantCode: merchantCode,
      order: {
        orderNumber,
        currency: currency,
        amount: amount,
        merchantBuyerId: merchantBuyerId,
        dateTimeTransaction: getCurrentTransactionTime(),
        payMethod:
          arrayMethodPay.length > 1
            ? arrayMethodPay.join(", ")
            : arrayMethodPay[0] || "",
        processType: processType,
      },

      token: {
        cardToken: cardToken,
      },
      billing: {
        firstName: "Daniel",
        lastName: "Castañeda",
        email: "jwick@izipay.pe",
        phoneNumber: "989339999",
        street: "calle el demo",
        city: "lima",
        state: "lima",
        country: "PE",
        postalCode: "00001",
        document: "12345678",
        documentType: window.Izipay.enums.documentType.DNI,
      },
      language: { init: init, showControlMultiLang: control },
      render: {
        typeForm: embebed
          ? window.Izipay.enums.typeForm.EMBEDDED
          : redirect
          ? window.Izipay.enums.typeForm.REDIRECT
          : window.Izipay.enums.typeForm.POP_UP,
        container: "#iframe-payment",
        showButtonProcessForm: true,
        redirectUrls: {
          onSuccess: "http://localhost:5173/",
          onError: "http://localhost:5173/",
          onCancel: "http://localhost:5173/",
        },
      },

      appearance: {
        logo: logo,
        theme: theme,
      },

      customFields: [
        { name: "field1", value: field1 },
        { name: "field2", value: field2 },
        { name: "field3", value: field3 },
        { name: "field4", value: field4 },
        { name: "field5", value: field5 },
        { name: "field6", value: field6 },
        { name: "field7", value: field7 },
        { name: "field8", value: field8 },
        { name: "field9", value: field9 },
        { name: "field10", value: field10 },
      ],
    };

    console.log("🟢 Configuración enviada a Izipay:", paymentConfig);

    const checkout = new window.Izipay({ config: paymentConfig });

    console.log("🔹 Contenedor de pago detectado:", container);
    console.log("🟢 Configuración enviada a Izipay:", paymentConfig);
    const callbackResponsePayment = (response) => {
      console.log("🔹 Respuesta de Izipay:", response); // ✅ Ver en la consola

      if (paymentMessage) {
        let formattedResponse = removeKeyRecursive(response, "payloadHttp");

        // Mostrar el JSON formateado en el frontend
        paymentMessage.innerHTML = JSON.stringify(formattedResponse, null, 2);
        objetConfig.innerHTML = JSON.stringify(paymentConfig, null, 2);
        containerIframe.style.display = "none";
      }
    };
    checkout.LoadForm({
      authorization: token,
      keyRSA: "RSA",
      callbackResponse: callbackResponsePayment,
    });
  };

  return (
    <button
      onClick={handlePayment}
      className={`w-max ${hColor}  py-1 px-4 text-base cursor-pointer hover:${hColor} rounded-sm hover:scale-95`}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? "Loading..."
        : amount === ""
        ? "Ingresar Monto"
        : `${currency} ${amount} →`}
    </button>
  );
};

export default PaymentButton;
