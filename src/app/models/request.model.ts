import { Address } from "./address.model";
import { Item } from "./item.model";
import { Restaurant } from "./restaurant.model";

export class Request {
    constructor(
        public address: Address,
        public restaurant: Restaurant,
        public restaurant_id: string,
        public request: Item[],
        public total: number,
        public grandTotal: number,
        public deliveryCharge: number,
        public status: string,
        public time: string,
        public paid: string,
        public id?: string,
        public user_id?: string,
        public instruction?: string,
    ) {}
}