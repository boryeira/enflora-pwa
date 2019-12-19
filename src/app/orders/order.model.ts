export class Order {
    constructor(
        public items: Array<Item>,
    ) {}
}

export class Item  {
    constructor(
        public  id: string,
        public  quantity: any,
    ) {}

}

