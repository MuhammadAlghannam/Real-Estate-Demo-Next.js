declare type ApiUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_name: string;
  status: number;
  image: string | null;
  address: string | null;
  designation: string | null;
  about_me: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  kyc_status: number;
  is_agency: number;
  owner_id: number;
  hc_inquiry_status: string | null;
  profile_image: string | null;
};

declare type RegisterResponse = {
  success?: true | false;
  message?: string;
  user: ApiUser;
  errors?:
    | string
    | {
        email?: string[];
      };
};

declare type LoginResponse = {
  message?: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_at: string;
  user: ApiUser;
};
