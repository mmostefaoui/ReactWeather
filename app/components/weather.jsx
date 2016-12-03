var React = require('react');
var WeatherForm = require('./weather-form');
var WeatherMessage = require('./weather-message');
var openWeatherMap = require('../api/open-weather-map');
var ErrorModal = require('./error-modal');

var Weather = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },
    handleSearch: function (location) {
        var that = this;
        this.setState({
                location: undefined,
                temp: undefined,
                isLoading: true,
                errorMessage: undefined
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
                    isLoading: false,
                    errorMessage: err.message
                });
            }
        )
    },
    componentDidMount: function () {
        var location = this.props.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            // reset the location
            window.location.hash = '#/';
        }
    },
    componentWillReceiveProps:function (newProps) {
        var location = newProps.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            // reset the location
            window.location.hash = '#/';
        }
    },
    render: function () {
        var {errorMessage, isLoading, temp, location} = this.state;

        function renderError() {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                );
            }
        }

        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMessage temp={temp} location={location}/>;
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Get Weater</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        )
    }
});

module.exports = Weather;