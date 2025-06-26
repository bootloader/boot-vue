import { usePushNotificationStore } from "@app-pushapp/views/admin/push-notification/usePushNotificationStore";

export const usePushNotification = () => {
  const route = useRoute();
  const router = useRouter();

  const pushNotificationStore = usePushNotificationStore();

  const DEFAULT_IMAGE_URL = ``;
  const DEFAULT_LOGO_URL = `https://cdn.jsdelivr.net/gh/mehery-soccom/mehery-content@main/static/app/logo/bg-x-icon.png`;
  const FONT_SIZES = [
    { title: "10px", value: 10 },
    { title: "12px", value: 12 },
    { title: "14px", value: 14 },
    { title: "16px", value: 16 },
    { title: "18px", value: 18 },
  ];
  const GRADIENT_DIRS = ["to right", "to bottom", "to top", "to left"];
  const TEMPLATE_ALIGN = [
    { title: "left to right", value: "left" },
    { title: "right to left", value: "right" },
  ];
  const TEMPLATES_CONFIG = {
    simple: {
      default: {
        logo_url: DEFAULT_LOGO_URL,
        image_url: "",
      },
    },
    styled: {
      delivery: {
        logo_url: DEFAULT_LOGO_URL,
        image_url:
          "https://play-lh.googleusercontent.com/s0JLCfh27w6kxCd81YnGGZeGIc8KdKx_7d2QEZSlMdXPBYFsN8mAUzW9p1s47QCVGb4",
      },
    },
  };

  return {
    DEFAULT_IMAGE_URL,
    DEFAULT_LOGO_URL,
    FONT_SIZES,
    GRADIENT_DIRS,
    TEMPLATE_ALIGN,
    TEMPLATES_CONFIG,
  };
};
