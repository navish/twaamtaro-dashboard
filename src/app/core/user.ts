export interface IsAdmin { admin: boolean; }
export interface Street { street_id: number; }
export interface Role { roles: any; }

export class NeedHelpUrlParam {
  column: string;
  key: string;
}



export class User{
    constructor(
        public id: string,
        public address: string,
        public name: string,
        public admin: boolean,
        public first_name: string,
        public last_name: string,
        public street_id: number,
        public roles: any
    ) {};

}
