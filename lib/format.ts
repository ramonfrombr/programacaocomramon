let currency = "USD";
let languageFormat = "en-US";

switch (process.env.NEXT_PUBLIC_LANGUAGE) {
  case "portuguese":
    currency = "BRL";
    languageFormat = "pt-BR";
    break;
  case "spanish":
    currency = "USD";
    languageFormat = "es-ES";
    break;
  case "french":
    currency = "EUR";
    languageFormat = "fr-FR";
    break;
  case "english":
    currency = "USD";
    languageFormat = "en-US";
    break;
  default:
    currency = "USD";
    languageFormat = "en-US";
    break;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat(languageFormat, {
    style: "currency",
    currency: currency,
  }).format(price);
};
