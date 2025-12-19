export interface Theme {
    accent: string;
    background: string;
    activeBackground: string;
    color: string;
    shadow: string,
    done: string;
    canceled: string;
    borderColor: string,
    borderThickness: number
}

export const theme: Theme = {
        accent: '#39DBFF',
        background: '#fff',
        activeBackground: '#e6fbffff',
        color: '#000',
        shadow: '#000',
        done: '#00FF75',
        canceled: '#FF5E5E',
        borderColor: '#000',
        borderThickness: 3
}
