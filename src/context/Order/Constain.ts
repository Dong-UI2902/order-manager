export const ORDER = {
    _id: "",
    name: "",
    address: "",
    phoneNumber: "",
    cod: {
        paid: false,
        total: 0,
        deposit: 0,
        transCost: 0
    },
    paid: false,
    products: [] as any,
    page: "",
    type: "GHN",
    deliveredBy: null,
    status: "CREATED",
    createdBy: undefined,
    desc: "",
    createdAt: undefined
}

export const TYPE = ["GRAB", "AHAMOVE", "SHIPPER", "GHN"];

export const PAGE = ["THƠM PARFUM", "PAGE 1", "PAGE 2", "THƠM PARFUM 2"]

export const STATUS = ["CREATED", "TO SHIP", "SHIPPING", "SHIPPED", "CANCEL"];