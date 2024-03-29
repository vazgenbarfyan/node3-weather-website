const request = require('request')

const forecast= (latitude,longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/6f6981b883b31050a7014e973a455fa5/${latitude},${longitude}?units=si`;

    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather service!",undefined);
         }else if(response.body.error){
            callback("Unable to find location",undefined);
         }else{
            const {precipProbability,temperature}=response.body.currently;

            const {temperatureHigh, temperatureLow,summery} = response.body.daily.data[0];
             callback(undefined,`
            It is currently ${temperature} degrees out. 
            This high today is a ${temperatureHigh}, with a low of ${temperatureLow}. 
            There is a ${precipProbability}% chance of rain.`)
         }
    })
}

module.exports=forecast;