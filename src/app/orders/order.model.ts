export class Order {
    constructor(
        public id: string,
        public amount: string,
        public quantity: string,
        public payDate: string,
        public deliveryDate: string,
        public status: Status,
        // public items: [Array<Item>],
    ) {}
}

export class Item  {
    constructor(
        public  id: string,
        public  name: string,
        public  amount: string,
        public  quantity: string,
        public  img: string,
    ) {}

}

export class Status  {
    constructor(
        public  id: string,
        public  css: string,
        public  client: string,
    ) {}

}

