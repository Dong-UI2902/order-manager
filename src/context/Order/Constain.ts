export const ORDER = {
    _id: "",
    name: "",
    address: "",
    phoneNumber: "",
    cod: 0,
    products: [] as any,
    page: "",
    type: "GHN",
    deliveredBy: null,
    status: "CREATED",
    createdBy: undefined,
    createdAt: undefined
}

export const TYPE = ["GRAB", "AHAMOVE", "SHIPPER", "GHN"];

export const PAGE = ["THƠM PARFUM", "PAGE 1", "PAGE 2"]

export const STATUS = ["CREATED", "TO SHIP", "SHIPPING", "SHIPPED", "CANCEL"];