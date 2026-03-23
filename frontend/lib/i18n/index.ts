// Translation utility for accessing Vietnamese translations
import { vi } from "./vi";

export function useTranslation() {
  return {
    t: vi,
    get: (key: string, defaultValue: string = key) => {
      return key.split(".").reduce((obj: any, k) => obj?.[k], vi) || defaultValue;
    },
  };
}

export default vi;
