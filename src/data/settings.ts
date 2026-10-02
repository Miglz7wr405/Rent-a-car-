export type Settings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hoursText: string;
};

const STORAGE_KEY = "kakeylka_settings";

const DEFAULTS: Settings = {
  phone: "+258 84 411 6974",
  whatsapp: "258844116974",
  email: "",
  address: "Avenida de Maputo, Quelimane, Moçambique",
  hoursText: "Segunda a Domingo · 07h00 — 18h00"
};

export function getSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

export function saveSettings(data: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}
