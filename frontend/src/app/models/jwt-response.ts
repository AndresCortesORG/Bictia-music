export interface JwtResponseI {
  dataUser: {
    id: number,
    name: string,
    email: string,
    avatar_url: string,
    accessToken: string,
    expiresIn: string
  };
}
