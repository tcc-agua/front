interface UserAttributes {
    sub: string;
    ver: string;
    aio: string;
    roles: string[];
    iss: string;
    oid: string;
    preferred_username: string;
    uti: string;
    given_name: string;
    nonce: string;
    picture: string;
    tid: string;
    aud: string[];
    login_hint: string;
    upn: string;
    nbf: string;
    ctry: string;
    rh: string;
    name: string;
    exp: string;
    family_name: string;
    iat: string;
    email: string;
    acct: number;
  }
  
export interface GlobalState {
    sub: string;
    aio: string;
    roles: string[];
    iss: string;
    user_attributes: UserAttributes;
    oid: string;
    preferred_username: string;
    tid: string;
    login_hint: string;
    ctry: string;
    exp: string;
    iat: string;
    client_name: string;
    email: string;
    ver: string;
    id_token: string;
    uti: string;
    given_name: string;
    nonce: string;
    picture: string;
    access_token: string;
  }
  