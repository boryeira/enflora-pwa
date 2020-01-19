export class Order {
    constructor(
        public id: string,
        public amount: string,
        public quantity: string,
        public deliveryDate: string,
        public payDate: string,
        
       // public items: Array<Item>,
    ) {}
}

export class Item  {
    constructor(
        public  id: string,
        public  quantity: any,
    ) {}

}

