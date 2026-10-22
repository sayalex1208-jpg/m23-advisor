/**
 * Centralized localStorage and sessionStorage keys to eliminate magic strings across the codebase.
 */

export const STORAGE_KEYS = {
  APP_LANG: "m23_app_lang",
  FIELD_DATA: "m23_field_data",
  PROFILE_DATA: "m23_profile_data",
  FARM_LOCATION: "m23_farm_location",
  PREFERENCES_DATA: "m23_preferences_data",
  USER_PROFILE_PREFIX: "m23_profile_data_",
  WELCOMED_PREFIX: "m23_welcomed_",
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
