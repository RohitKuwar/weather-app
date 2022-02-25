import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from '../responsive/Device';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './BigLabel';
import SmallLabel from './SmallLabel';
import Text from './Text';

type ResultProps = {
  weather: {
    city: string
    country: string
    currentDate: string
    currentTime: string
    description: string
    main: string
    temp: number
    sunset: string
    sunrise: string
    humidity: string
    wind: string
    highestTemp: number
    lowestTemp: number
  };
};

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: black;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const Result = ({ weather }: ResultProps) => {

  let weatherIcon: any = null;

  if (weather.main === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weather.main === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weather.main === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weather.main === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weather.main === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weather.main === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <Results>
      <LocationWrapper>
        <BigLabel>
          {weather.city}, {weather.country}
        </BigLabel>
        <SmallLabel weight='400'>{weather.currentDate}</SmallLabel>
        <SmallLabel weight='400'>{weather.currentTime}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(weather.temp)}&#176;</Temperature>
          <SmallLabel weight='400' firstToUpperCase>
            {weather.description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {Math.floor(weather.highestTemp)}&#176;
          </SmallLabel>
          <Text align='center'>Highest Temp</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {weather.wind}mph
          </SmallLabel>
          <Text align='center'>Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {weather.sunrise}
          </SmallLabel>
          <Text align='center'>Sunrise</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {Math.floor(weather.lowestTemp)}&#176;
          </SmallLabel>
          <Text align='center'>Lowest Temp</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {weather.humidity}%
          </SmallLabel>
          <Text align='center'>Humidity</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align='center' weight='400'>
            {weather.sunset}
          </SmallLabel>
          <Text align='center'>Sunset</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
