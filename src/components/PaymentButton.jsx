import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  urlIpn,
}) => {
  const dispatch = useDispatch();
  const { transactionId, orderNumber, token, status } = useSelector(
    (state) => state.order
  );

  // Generar transactionId y token cuando cambia algún valor del estado
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
          amount,
        },
      })
    );
  }, [
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
    urlIpn,
    dispatch,
  ]);

  const handlePayment = () => {
    const containerIframe = document.querySelector("#container-iframe");
    if (integrationMethod.embebed)
      containerIframe.style.backgroundColor = "white";

    const paymentMessage = document.querySelector("#payment-message");
    const objetConfig = document.querySelector("#objet-config");
    paymentMessage.innerHTML = "";

    const container = document.querySelector("#iframe-payment");
    if (!container) {
      console.error("El contenedor #iframe-payment no existe en el DOM.");
      return;
    }

    if (!token || !window.Izipay) {
      console.error("Izipay no está cargado o el token es inválido.");
      return;
    }

    const paymentConfig = {
      transactionId,
      action: actionForm.register
        ? window.Izipay.enums.payActions.REGISTER
        : actionForm.payRegister
        ? window.Izipay.enums.payActions.PAY_REGISTER
        : actionForm.payToken
        ? window.Izipay.enums.payActions.PAY_TOKEN
        : window.Izipay.enums.payActions.PAY,
      merchantCode: configCurrency.merchantCode,
      order: {
        orderNumber,
        currency: configCurrency.currency,
        amount,
        merchantBuyerId,
        dateTimeTransaction: getCurrentTransactionTime(),
        payMethod:
          arrayMethodPay.length > 1
            ? arrayMethodPay.join(", ")
            : arrayMethodPay[0] || "",
        processType,
      },
      token: {
        cardToken,
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
      language: {
        init: lenguageSelect.init,
        showControlMultiLang: lenguageSelect.control,
      },
      render: {
        typeForm: integrationMethod.embebed
          ? window.Izipay.enums.typeForm.EMBEDDED
          : integrationMethod.redirect
          ? window.Izipay.enums.typeForm.REDIRECT
          : window.Izipay.enums.typeForm.POP_UP,
        ...(integrationMethod.embebed && { container: "#iframe-payment" }),
        showButtonProcessForm: true,
        ...(integrationMethod.redirect && {
          redirectUrls: {
            onSuccess: "https://demodanielfront.onrender.com/",
            onError: "https://demodanielfront.onrender.com/",
            onCancel: "https://demodanielfront.onrender.com/",
          },
        }),
      },
      urlIPN: urlIpn,
      appearance: {
        logo: appearance.logo,
        theme: appearance.theme,
      },
      customFields: Object.entries(customData).map(([key, value]) => ({
        name: key,
        value,
      })),
    };

    console.log("🟢 Configuración enviada a Izipay:", paymentConfig);

    const checkout = new window.Izipay({ config: paymentConfig });

    const callbackResponsePayment = (response) => {
      console.log("🔹 Respuesta de Izipay:", response);

      if (paymentMessage) {
        let formattedResponse = removeKeyRecursive(response, "payloadHttp");
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
      className={`w-max ${appearance.hColor} py-1 px-4 text-base cursor-pointer hover:${appearance.hColor} rounded-sm hover:scale-95`}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? "Loading..."
        : amount === ""
        ? "Ingresar Monto"
        : `${configCurrency.currency} ${amount} →`}
    </button>
  );
};

export default PaymentButton;
