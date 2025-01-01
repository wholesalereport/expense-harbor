import getSymbolFromCurrency from "currency-symbol-map";
import {isEmpty} from "lodash";

export const getCurrency = (currency = "") => !isEmpty(currency) ? getSymbolFromCurrency(currency) : getSymbolFromCurrency("USD");