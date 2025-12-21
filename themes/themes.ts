export interface Theme {
    accent: string;
    accentDark: string;
    accentLight: string;
    background: string;
    activeBackground: string;
    color: string;
    shadow: string,
    done: string;
    canceled: string;
    inProgress: string;
    borderColor: string,
    borderThickness: number
}

export const theme: Theme = {
        accent: '#ffd900',
        accentDark: '#efbc14ff',
        accentLight: '#ffe23b',
        background: '#fff',
        activeBackground: '#e6fbffff',
        color: '#000',
        shadow: '#000',
        done: '#00FF75',
        canceled: '#FF5E5E',
        inProgress: '#39DBFF',
        borderColor: '#000',
        borderThickness: 3
}
