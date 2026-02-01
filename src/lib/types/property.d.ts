declare type AllPropertiesResponse = {
  properties: PropertiesPagination;
  seo_setting: {
    id: number;
    page_name: string;
    seo_title: string;
    seo_description: string;
    created_at: string | null;
    updated_at: string;
  };
  locations: Array<{
    id: number;
    name: string;
    slug: string;
    totalProperty: number;
  }>;
  property_types: PropertyType[];
  slider_agents: Array<unknown>;
  max_bed_room: number;
  max_bath_room: number;
  max_area: number;
  max_price: number;
  countries: Array<{
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
  }>;
};

declare type WishlistResponse = {
  user: ApiUser;
  properties: PropertiesPagination;
};

declare type PropertiesPagination = {
  current_page: number;
  data: Property[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

declare type SinglePropertyResponse = {
  property: Property;
  sliders: PropertySlider[];
  aminities: PropertyAminity[];
  features: PropertyFeature[];
  customer_services: CustomerService[];
  nearest_locations: NearestLocation[];
  additional_informations: AdditionalInformation[];
  property_plans: PropertyPlan[];
  reviews: ReviewsPagination;
  property_agent: PropertyAgent;
};

declare type Property = {
  id: number;
  is_favorited?: boolean;
  agent_id: number | null;
  property_type_id: number;
  city_id: number;
  area_id: number | null;
  title: string;
  slug: string;
  purpose: string;
  rent_period: string;
  price: string;
  downpayment: string | null;
  thumbnail_image: string;
  description: string;
  video_description: string;
  video_thumbnail: string;
  video_id: string;
  address: string;
  address_description: string;
  google_map: string | null;
  total_area: string;
  total_unit: string;
  total_bedroom: string;
  total_bathroom: string;
  total_garage: string;
  total_kitchen: string;
  is_featured: string;
  is_top: string;
  is_urgent: string;
  status: string;
  expired_date: string | null;
  seo_title: string;
  seo_meta_description: string;
  serial: number;
  show_slider: string;
  approve_by_admin: string;
  created_at: string;
  updated_at: string;
  date_from: string | null;
  date_to: string | null;
  time_from: string | null;
  time_to: string | null;
  country_id: number;
  lat: string | number | null;
  lon: string | number | null;
  resale_or_primary: string | null;
  compound_id: number | null;
  developer_id: number | null;
  show_map: number;
  totalRating: number;
  ratingAvarage: number | null;
  property_type_name?: string;
  developer_name?: string;
  developer_image?: string | null;
  customer_services?: CustomerService[];
  sliders?: PropertySlider[];
  aminities?: PropertyAminity[];
  nearest_locations?: NearestLocation[];
  plans?: PropertyPlan[];
  compound?: Compound | null;
  area?: unknown | null;
  developer?: PropertyDeveloper | null;
  property_type?: PropertyType | null;
  agent?: Agent | null;
  distance_km?: number;
};

// Amenity types
declare type Aminity = {
  id: number;
  aminity: string;
  status?: number;
};

declare type PropertyAminity = {
  id: number;
  property_id: number;
  aminity_id: number;
  created_at: string;
  updated_at: string;
  aminity: Aminity;
};

// Feature types
declare type Feature = {
  id: number;
  name: string;
  status?: number;
};

declare type PropertyFeature = {
  id: number;
  property_id: number;
  feature_id: number;
  created_at: string;
  updated_at: string;
  feature: Feature;
};

declare type PropertySlider = {
  id: number;
  property_id: number;
  image: string;
  created_at: string;
  updated_at: string;
};

declare type NearestLocation = {
  id: number;
  property_id: number;
  nearest_location_id: number;
  distance: string;
  created_at: string;
  updated_at: string;
  location: PropertyNearestLocation;
};

declare type PropertyNearestLocation = {
  id: number;
  location: string;
  status: number;
};

declare type PropertyPlan = {
  id: number;
  property_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};

declare type AdditionalInformation = {
  id: number;
  property_id: number;
  add_key: string;
  add_value: string;
  created_at: string;
  updated_at: string;
};

declare type ReviewsPagination = {
  current_page: number;
  data: unknown[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

declare type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

declare type PropertyAgent = {
  agent_type: string;
  id: number;
  name: string;
  user_name: string;
  designation: string;
  email: string;
  image: string;
  kyc_status: number;
};

declare type Agent = {
  id: number;
  name: string;
  phone: string;
  email: string;
  designation: string;
  image: string;
  user_name: string;
};

declare type PropertyType = {
  id?: number;
  name: string;
  slug?: string;
  icon?: string;
  image?: string | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
  totalProperty?: number;
};

declare type PropertyDeveloper = {
  id: number;
  name: string;
  email?: string | null;
  logo_path?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

declare type Compound = {
  id: number;
  name: string;
  area_id: number;
  is_new_launch: boolean;
  masterplan_pdf_path: string;
  lat: string;
  long: string;
  map_url: string;
  about_html: string;
  created_at: string;
  updated_at: string;
  developer_id: number;
  resale_start_price: string;
  primary_start_price: string;
  is_top: number;
};

declare type PropertyStatusResponse = {
  success: boolean;
  data: {
    price: {
      min: number;
      max: number;
    };
    total_area: {
      min: number;
      max: number;
    };
  };
};

declare type IncrementCustomerRequest = {
  property_slug: string;
  customer_service_id: number;
  phone_id: number;
};

declare type IncrementCustomerResponse = {
  message?: string;
  id: number;
  property_id: number;
  customer_service_id: number;
  phone_id: number;
  count: number;
  created_at: string;
  updated_at: string;
};

declare type CustomerServicePhone = {
  id: number;
  customer_service_id: number;
  phone: string;
};

declare type CustomerServicePivot = {
  property_id: number;
  customer_service_id: number;
  created_at: string;
  updated_at: string;
};

declare type CustomerService = {
  id: number;
  name: string;
  email: string;
  title: string;
  pivot: CustomerServicePivot;
  phones: CustomerServicePhone[];
};

declare type NearbyPropertiesResponse = {
  center: {
    lat: number;
    lng: number;
  };
  radius_km: number;
  total: number;
  count: number;
  per_page: number;
  current: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  properties: Property[];
};

// Recommended Properties Response Types
declare type IntroContent = {
  visibility: boolean;
  home1_intro: {
    bg_image: string;
    title_1: string;
    title_2: string;
    title_3: string;
    list1: string;
    list2: string;
    list3: string;
    slider_properties: Property[];
  };
};

declare type RecommendedPropertiesResponse = {
  intro_content: IntroContent;
  seo_setting?: {
    id: number;
    page_name: string;
    seo_title: string;
    seo_description: string;
    created_at: string | null;
    updated_at: string;
  };
  location?: {
    visibility: boolean;
    title: string;
    description: string;
    location_for_filter: Array<{
      id: number;
      name: string;
      slug: string;
      totalProperty: number;
    }>;
    locations?: unknown[];
  };
  category?: {
    visibility: boolean;
    property_types: PropertyType[];
  };
  featured_property?: {
    visibility: boolean;
    title: string;
    description: string;
    properties: Property[];
  };
  urgent_property?: {
    visibility: boolean;
    title: string;
    description: string;
    properties: Property[];
  };
  latest_property?: Property[];
  [key: string]: unknown; // For any additional sections that might be present
};
