export interface City {
    name: string,
    code: string
}

export interface WeatherDetails {
    name: string,
    temperature: string,
    sunrise: Date,
    sunset: Date
}

export interface dailyReport {
    weekday: string,
    temperature: string,
    sealevel: number
}
