export const defaultFieldNames = [
    "ï»¿Website",
    "Order ID",
    "Order Date",
    "Purchase Order Number",
    "Currency",
    "Unit Price",
    "Unit Price Tax",
    "Shipping Charge",
    "Total Discounts",
    "Total Owed",
    "Shipment Item Subtotal",
    "Shipment Item Subtotal Tax",
    "ASIN",
    "Product Condition",
    "Quantity",
    "Payment Instrument Type",
    "Order Status",
    "Shipment Status",
    "Ship Date",
    "Shipping Option",
    "Shipping Address",
    "Billing Address",
    "Carrier Name & Tracking Number",
    "Product Name",
    "Gift Message",
    "Gift Sender Name",
    "Gift Recipient Contact Details",
    "Item Serial Number"
].map(field => ({id: field,name: field}))

export const AMAZON_TITLE_INDEX = defaultFieldNames.map(({id}) =>  id).findIndex(v => v === "Product Name");
export const AMAZON_TOTAL_PAYED_INDEX = defaultFieldNames.map(({id}) =>  id).findIndex(v => v === "Total Owed");
export const AMAZON_ORDER_ID_INDEX = defaultFieldNames.map(({id}) =>  id).findIndex(v => v === "Order ID");
export const AMAZON_ORDER_DATE_INDEX = defaultFieldNames.map(({id}) =>  id).findIndex(v => v ===  "Order Date");

