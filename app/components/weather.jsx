var React = require('react');
var WeatherForm = require('./weather-form');
var WeatherMessage = require('./weather-message');
var openWeatherMap = require('../api/open-weather-map');

var Weather = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },
    handleSearch: function (location) {
        var that = this;
        this.setState({
                location: '',
                temp: '',
                isLoading: true
            }
        );

        openWeatherMap.getTemp(location).then(
            function (temp) {
                that.setState({
                    location: location,
                    temp: temp,
                    isLoading: false
                })
            },
            function (err) {
                that.setState({
                    isLoading: false
                });
                alert(err);
            }
        )
    },
    render: function () {
        var {isLoading, temp, location} = this.state;

        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMessage temp={temp} location={location}/>;
            }
        }

        return (
            <div>
                <h1 className="text-center">Get Weater</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
            </div>
        )
    }
});

module.exports = Weather;