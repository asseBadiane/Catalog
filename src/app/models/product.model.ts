
export interface Product {
    id: string;
    name: string;
    price: number;
    promotion: boolean;
}


export interface Product_2 {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface PageProduct {
    products: Product[];
    page: number;
    size: number;
    totalPages: number;
}