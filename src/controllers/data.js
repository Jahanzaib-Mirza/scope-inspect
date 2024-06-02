const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes


// https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=7cdb55f6eb1689e80726b8a97808cec5
const getData = async (req, res) => {
  try {
    const cachedData = cache.get('weatherData');
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=${process.env.API_KEY}`);
    const data = response.data;
    const processedData = {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };

    cache.set('weatherData', processedData);
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};



module.exports = { getData };
