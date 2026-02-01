declare type DeveloperOfferPivot = {
  developer_id: number | null;
  offer_id: number;
};

declare type DeveloperOffer = {
  id: number;
  developer_id: number | null;
  offer_type_id: number | null;
  name: string;
  description: string | null;
  title: string;
  created_at: string;
  updated_at: string;
  pivot: DeveloperOfferPivot;
};

declare type Developer = {
  id: number;
  name: string;
  email: string | null;
  logo_path: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  logo_url: string | null;
  offers: DeveloperOffer[];
};

declare type DeveloperResponse = {
  success: boolean;
  data: Developer[];
};

//  Shared types
declare type SimpleArea = {
  id: number;
  name: string;
  parent_id: number | null;
};

declare type DeveloperCompoundImage = {
  id: number;
  compound_id: number;
  image_path: string;
  alt: string | null;
  sort: number;
  created_at: string;
  updated_at: string;
};

declare type DeveloperCompoundLite = {
  id: number;
  name: string;
  area: SimpleArea | null;
  images: DeveloperCompoundImage[];
};

declare type DeveloperPropertyLite = {
  id: number;
  title: string;
  area: SimpleArea | null;
  images: string[];
  cover_image: string;
};

//  single developer type
declare type SingleDeveloperData = {
  id: number;
  name: string;
  email: string | null;
  logo_path: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  logo_url: string;
  offers: DeveloperOffer[];
  compounds: DeveloperCompoundLite[];
  properties: DeveloperPropertyLite[];
};

declare type SingleDeveloperApiResponse = {
  success: boolean;
  data: SingleDeveloperData;
};
