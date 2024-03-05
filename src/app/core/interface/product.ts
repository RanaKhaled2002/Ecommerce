export interface Product {
    sold?:            number;
    images?:          string[];
    subcategory?:     Brand[];
    ratingsQuantity?: number;
    _id?:             string;
    title?:           string;
    slug?:            string;
    description?:     string;
    quantity?:        number;
    price?:           number;
    imageCover?:      string;
    category?:        Brand;
    brand?:           Brand;
    ratingsAverage?:  number;
    createdAt?:       Date;
    updatedAt?:       Date;
    id?:              string;
    count?:           string;
    product?:         Product2,
    cartItems?:        CartItem[],
    totalOrderPrice?:  number,
}

export interface Product2 {
    subcategory?: Subcategory[]
    _id?: string
    title?: string
    quantity?: number
    imageCover?: string
    category?: Category
    brand?: Brand
    ratingsAverage?: number
    id?: string
}

export interface Subcategory {
    _id?: string
    name?: string
    slug?: string
    category?: string
}

export interface Category {
    _id?: string
    name?: string
    slug?: string
    image?: string
}

export interface Brand {
    _id?:       string;
    name?:      string;
    slug?:      string;
    image?:    string;
    category?: string;
}

export interface CartItem {
    count?: number
    _id?: string
    product?: Product2
    price?: number
}
