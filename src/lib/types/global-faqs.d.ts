declare type ApiGlobalFAQsResponse = {
  faq: {
    content: {
      short_title: string;
      long_title: string;
      support_image: string;
      support_time: string;
      support_title: string;
    };
    faqs: FaqItem[];
  };
  category: {
    visibility: boolean;
    property_types: PropertyType[];
  };
  counter: {
    visibility: boolean;
    content: {
      title: string;
      description: string;
      bg_image: string;
      list_1: string | null;
      list_2: string | null;
      list_3: string | null;
    };
    items: CounterItem[];
  };
  mobile_app: {
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
};

declare type FaqItem = {
  id: number;
  question: string;
  answer: string;
  status: number;
  created_at: string;
  updated_at: string;
};

declare type PropertyType = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: number;
  totalProperty: number;
};

declare type CounterItem = {
  id: number;
  title: string;
  icon: string;
  number: number;
  fun_title: string | null;
  fun_description: string | null;
  item_1: string | null;
  item_2: string | null;
  item_3: string | null;
};
