import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity';
import device from '../responsive/Device';
import Result from './Result';
import NotFound from './NotFound';

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: black;

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

class App extends React.Component {
  state = {
    value: "",
    weatherInfo: null,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      if (this.state.value.trim() === "") {
        this.setState({
          weatherInfo: null,
          error: false,
        });
      }
    }
  }

  componentDidMount() {
    this.getLocationAndWeather();
  }

  getLocationAndWeather = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 5000, // Timeout in milliseconds (adjust as needed)
        maximumAge: 0 // Don't use cached location
      };

      navigator.geolocation.getCurrentPosition(
        this.handleLocationSuccess,
        this.handleLocationError,
        options
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  handleLocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`;

    fetch(weather)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((data) => {
        const currentDateTimes = new Date((data.dt + data.timezone) * 1000)
        const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000)
        const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000)

        // const currentDate = currentDateTimes.toLocaleString('en-US', {
        //   weekday: 'long',
        //   month: 'long',
        //   day: 'numeric',
        //   timeZone: 'UTC',
        // })
        const currentDate = `${currentDateTimes.toLocaleString('en-US', { weekday: 'long' })}, ${currentDateTimes.getDate()} ${currentDateTimes.toLocaleString('en-US', { month: 'long' })}`
        const currentTime = currentDateTimes.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })
        const sunrise = sunriseTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })
        const sunset = sunsetTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })
          const weatherInfo = {
            city: data.name,
            country: data.sys.country,
            currentDate,
            currentTime,
            description: data.weather[0].description,
            main: data.weather[0].main,
            temp: data.main.temp,
            highestTemp: data.main.temp_max,
            lowestTemp: data.main.temp_min,
            sunrise,
            sunset,
            clouds: data.clouds.all,
            humidity: data.main.humidity,
            wind: data.wind.speed
          };
        this.setState({
          weatherInfo,
          error: false,
          value: data.name
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  handleLocationError = (error) => {
    console.log("Error getting location:", error);
    // Handle location error, set error state, etc.
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = this.state;
    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`;
    // const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`;

    if(value.length >= 2) {
      fetch(weather)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((data) => {
        const currentDateTimes = new Date((data.dt + data.timezone) * 1000)
        const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000)
        const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000)

        // const currentDate = currentDateTimes.toLocaleString('en-US', {
        //   weekday: 'long',
        //   month: 'long',
        //   day: 'numeric',
        //   timeZone: 'UTC',
        // })
        const currentDate = `${currentDateTimes.toLocaleString('en-US', { weekday: 'long' })}, ${currentDateTimes.getDate()} ${currentDateTimes.toLocaleString('en-US', { month: 'long' })}`
        const currentTime = currentDateTimes.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })
        const sunrise = sunriseTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })
        const sunset = sunsetTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        })

        const weatherInfo = {
          city: data.name,
          country: data.sys.country,
          currentDate,
          currentTime,
          description: data.weather[0].description,
          main: data.weather[0].main,
          temp: data.main.temp,
          highestTemp: data.main.temp_max,
          lowestTemp: data.main.temp_min,
          sunrise,
          sunset,
          clouds: data.clouds.all,
          humidity: data.main.humidity,
          wind: data.wind.speed
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
    } else {
      alert('Please enter valid characters more than or equal to 2')
    }
  };

  render() {
    const { value, weatherInfo, error } = this.state;
        return (
      <>
        <AppTitle showLabel={(weatherInfo || error) && true}>
          Weather app
        </AppTitle>
        <WeatherWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            Weather app
          </AppTitle>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound />}
        </WeatherWrapper>
      </>
    );
  }
}

export default App;
