export const setWeatherIcon = code => {
  switch (code) {
    case 1: // Clear sky
      return "wi wi-day-sunny";
    case 2: // Nearly clear sky
      return "wi wi-day-sunny-overcast";
    case 3: // Variable cloudiness
      return "wi wi-day-cloudy";
    case 4: // Halfclear sky
      return "wi wi-day-cloudy";
    case 5: // Cloudy sky
      return "wi wi-cloudy";
    case 6: // Overcast
      return "wi wi-cloudy";
    case 7: // Fog
      return "wi wi-fog";
    case 8: // Light rain showers
      return "wi wi-showers";
    case 9: // Moderate rain showers
      return "wi wi-rain";
    case 10: // Heavy rain showers
      return "wi wi-rain";
    case 11: // Thunderstorm
      return "wi wi-thunderstorm";
    case 12: // Light sleet showers
      return "wi wi-sleet";
    case 13: // Moderate sleet showers
      return "wi wi-rain-mix";
    case 14: // Heavy sleet showers
      return "wi wi-rain-wind";
    case 15: // Light snow showers
      return "wi wi-snow";
    case 16: // Moderate snow showers
      return "wi wi-snow";
    case 17: // Heavy snow showers
      return "wi wi-snow";
    case 18: // Light rain
      return "wi wi-showers";
    case 19: // Moderate rain
      return "wi wi-rain";
    case 20: // Heavy rain
      return "wi wi-rain";
    case 21: // Thunder
      return "wi wi-lightning";
    case 22: // Light sleet showers
      return "wi wi-sleet";
    case 23: // Moderate sleet showers
      return "wi wi-rain-mix";
    case 24: // Heavy sleet showers
      return "wi wi-rain-wind";
    case 25: // Light snow showers
      return "wi wi-snow";
    case 26: // Moderate snow showers
      return "wi wi-snow";
    case 27: // Heavy snow showers
      return "wi wi-snow";
    default:
      return "wi wi-na";
  }
};

export const setWindIcon = code => {
  return "9";
};
