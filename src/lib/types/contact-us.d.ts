// Contact Us Form Response
declare type ContactUsResponse = {
  message?: string;
};

// Contact Us Page Data
declare type SeoSetting = {
  id: number;
  page_name: string;
  seo_title: string;
  seo_description: string;
  created_at: string | null;
  updated_at: string;
};

declare type Contact = {
  id: number;
  supporter_image: string;
  support_time: string | null;
  off_day: string | null;
  email: string;
  address: string;
  phone: string;
  map: string;
  created_at: string;
  updated_at: string;
};

declare type RecaptchaSetting = {
  id: number;
  site_key: string;
  secret_key: string;
  status: number;
  created_at: string | null;
  updated_at: string;
};

declare type MobileApp = {
  visibility: boolean;
  app_bg: string | null;
  full_title: string;
  description: string;
  play_store: string;
  app_store: string;
  image: string;
  apple_btn_text1: string;
  apple_btn_text2: string;
  google_btn_text1: string;
  google_btn_text2: string;
};

declare type ContactUsPageResponse = {
  seo_setting: SeoSetting;
  contact: Contact;
  recaptcha_setting: RecaptchaSetting;
  mobile_app: MobileApp;
};
