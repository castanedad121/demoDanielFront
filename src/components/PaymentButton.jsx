import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, fetchSignature, setOrder, clearSignature } from "../store/orderSlice";
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
  cardSelectorData,
  billingData,
  appSettings,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const dispatch = useDispatch();
  const { transactionId, orderNumber, token, signature, status } = useSelector(
    (state) => state.order
  );

  // Function to fetch a fresh token
  const fetchNewToken = (txId, reqOrderStr) => {
    const activeCreds = 
      configCurrency.currency === "PEN" 
        ? appSettings?.credentials?.PEN 
        : appSettings?.credentials?.USD;

    dispatch(
      fetchToken({
        transactionId: txId,
        orderData: {
          requestSource: "ECOMMERCE",
          merchantCode: configCurrency.merchantCode,
          orderNumber: reqOrderStr,
          publicKey: activeCreds?.publicKey || "VErethUtraQuxas57wuMuquprADrAHAb",
          amount,
          environment: appSettings?.environment || "sandbox",
        },
      })
    );
  };

  // Generar transactionId y token SOLO cuando cambian los campos que afectan al token
  useEffect(() => {
    setIsRendered(false); // Reiniciar el estado renderizado al cambiar params
    const { transactionId, orderNumber } = generateOrder();
    dispatch(setOrder({ transactionId, orderNumber }));
    fetchNewToken(transactionId, orderNumber);
  }, [amount, configCurrency, appSettings, dispatch]);

  // Determinar el valor de action para el SDK
  const getAction = () => {
    if (actionForm.register) return window.Izipay.enums.payActions.REGISTER;
    if (actionForm.payRegister) return window.Izipay.enums.payActions.PAY_REGISTER;
    if (actionForm.payToken) return window.Izipay.enums.payActions.PAY_TOKEN;
    if (actionForm.payCardSelector) return "pay_card_selector";
    return window.Izipay.enums.payActions.PAY;
  };

  const handlePayment = async () => {
    if (isRendered) {
      // El usuario quiere recargar el formulario
      const containerDOM = document.querySelector("#iframe-payment");
      if (containerDOM) containerDOM.innerHTML = ""; // Limpiar iframe anterior

      const { transactionId: newTxId, orderNumber: newOrderNumber } = generateOrder();
      dispatch(setOrder({ transactionId: newTxId, orderNumber: newOrderNumber }));
      fetchNewToken(newTxId, newOrderNumber);
      
      setIsRendered(false); // Volver al estado interactivo
      return; // Detenemos aquí, Izipay se enlazará solo la próxima vez que den Clic al terminar de cargar el Token
    }

    const paymentMessage = document.querySelector("#payment-message");
    const objetConfig = document.querySelector("#objet-config");
    paymentMessage.innerHTML = "";

    const container = document.querySelector("#iframe-payment");
    if (!container) {
      console.error("El contenedor #iframe-payment no existe en el DOM.");
      return;
    }

    if (integrationMethod.embebed) {
      container.style.backgroundColor = "white";
    }

    if (!token || !window.Izipay) {
      console.error("Izipay no está cargado o el token es inválido.");
      return;
    }

    const dateTimeTransaction = getCurrentTransactionTime();

    // Si es pay_card_selector, generar la firma
    let cardSelectorSignature = signature;
    if (actionForm.payCardSelector) {
      const activeCreds = 
        configCurrency.currency === "PEN" 
          ? appSettings?.credentials?.PEN 
          : appSettings?.credentials?.USD;

      const signatureResult = await dispatch(
        fetchSignature({
          dateTimeTransaction,
          transactionId,
          amount,
          currency: configCurrency.currency,
          merchantBuyerId,
          documentType: billingData.documentType,
          document: billingData.document,
          hashKey: activeCreds?.hashKey || "Xom5Hlt9eSWoylYuBrenIbOsTljEdefR",
        })
      ).unwrap();
      cardSelectorSignature = signatureResult.response.signature;
    }

    const paymentConfig = {
      transactionId,
      action: getAction(),
      merchantCode: configCurrency.merchantCode,
      order: {
        orderNumber,
        currency: configCurrency.currency,
        amount,
        merchantBuyerId,
        dateTimeTransaction,
        payMethod:
          arrayMethodPay.length > 1
            ? arrayMethodPay.join(", ")
            : arrayMethodPay[0] || "",
        processType,
      },
      token: {
        cardToken,
      },
      billing: billingData,
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
      ...(actionForm.payCardSelector && {
        cardSelector: {
          signature: cardSelectorSignature || "",
        },
      }),
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
    
    // Marcar como renderizado
    setIsRendered(true);
  };

  // Dynamic button color based on theme
  const getButtonBg = () => {
    const hColor = appearance.hColor || "";
    const match = hColor.match(/bg-\[([^\]]+)\]/);
    return match ? match[1] : "#FF4240";
  };

  const getCurrencySymbol = () => {
    return configCurrency.currency === "USD" ? "$" : "S/";
  };

  return (
    <button
      onClick={handlePayment}
      className={`pay-button ${isRendered ? 'animate-pulse bg-emerald-500' : ''}`}
      style={{ backgroundColor: isRendered ? '#10b981' : getButtonBg() }}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? "⏳ Generando token..."
        : isRendered
        ? "🔄 Generar nuevo token de sesión"
        : amount === ""
        ? "Ingresar Monto"
        : `${getCurrencySymbol()} ${amount} →`}
    </button>
  );
};

export default PaymentButton;
