export class User {
    constructor(
        public id: string,
        public email: string,
        public full_name: string,
        public token_type: string,
        public expires_in: string,
        public access_token: string,
        public refresh_token: string,
    ){}
    
}