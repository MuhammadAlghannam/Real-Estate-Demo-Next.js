declare type CompoundResponse = {
  data: Compound[];
  meta: PaginationMeta;
};

declare type SingleCompoundResponse = {
  data: Compound;
};

declare type Compound = {
  id: number;
  name: string;
  area: Area | null;
  isNewLaunch: boolean;
  aboutHtml: string | null;
  masterplanPdf: string | null;
  masterplanImage: string | null;
  resaleStartPrice: number | null;
  primaryStartPrice: number | null;
  googleMap: GoogleMap;
  paymentPlans: PaymentPlan[];
  developer: Developer | null;
  images: CompoundImage[];
};

declare type Area = {
  id: number;
  name: string;
  parent_id: number | null;
};

declare type GoogleMap = {
  lat: number;
  lng: number;
  mapUrl: string;
};

declare type PaymentPlan = {
  id: number;
  title: string;
  description: string | null;
};

declare type Developer = {
  id: number;
  name: string;
  email: string | null;
  logo_url?: string | null;
  logoUrl?: string | null;
};

declare type CompoundImage = {
  id: number;
  url: string;
  caption: string | null;
};

declare type PaginationMeta = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};

declare type CompoundPropertiesResponse = {
  data: CompoundProperty[];
  meta: PaginationMeta;
};

declare type CompoundProperty = {
  id: number;
  compoundId: number;
  title: string;
  slug: string;
  saleType: string;
  purpose: string;
  price: number;
  thumbnailImage: string;
  description: string;
  video: {
    description: string;
    thumbnail: string;
    videoId: string;
  } | null;
  address: {
    text: string;
    description: string;
    googleMap: string | null;
    lat: number | null;
    lng: number | null;
  };
  details: {
    totalArea: string;
    totalUnit: string;
    totalBedroom: string;
    totalBathroom: string;
    totalGarage: string;
    totalKitchen: string;
  };
  flags: {
    isFeatured: boolean;
    isTop: boolean;
    isUrgent: boolean;
    status: string;
  };
  expiredDate: string;
  seo: {
    title: string;
    metaDescription: string;
  };
  images: string[];
  plans: {
    id: number;
    title: string;
    descriptionHtml: string;
    fileUrl: string;
    fileType: string;
  }[];
  nearestPlaces: {
    id: number;
    name: string;
    type: string | null;
    distanceKm: number;
  }[];
  features: unknown[];
  aminities: {
    id: number;
    name: string;
  }[];
  agent: {
    id: number;
    name: string;
    phone: string;
    email: string;
    designation: string;
    image: string;
    user_name: string;
  } | null;
  propertyType: {
    id: number;
    name: string;
  } | null;
  area: unknown | null;
  developer: {
    id: number;
    name: string;
  } | null;
  compound: {
    id: number;
    name: string;
  } | null;
  reviews: unknown[];
  customerServices: unknown[];
  createdAt: string;
  updatedAt: string;
};
