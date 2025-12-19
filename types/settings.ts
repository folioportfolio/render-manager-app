export interface SettingInput {
    label: string,
    key: string,
    type: "text" | "number",
    process?: (v: string) => void
}