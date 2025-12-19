export interface SettingsInput {
    label: string,
    key: SettingsKeys,
    default?: string;
    type: "text" | "number",
    process?: (v: string) => void
}

export type SettingsKeys = "schema" | "hostname" | "port";