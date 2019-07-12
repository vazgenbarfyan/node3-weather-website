const request = require('request')
const geocode= (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmJhcmZ5YW4iLCJhIjoiY2p4ODBhaDUwMGc1NzN6bnkxdm81dnI1MCJ9.rDCgl_wKWkLJ7qug2zDiww&limit=1`

    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect location services",undefined)
        }else if (!response.body.features.length){
            callback("Unable to find location,Try another search",undefined)
        }else{
            callback(undefined,{
            latitude:response.body.features[0].center[0],
            longitude:response.body.features[0].center[1],
            location :response.body.features[0].place_name
            })
        }
    })
}


module.exports=geocode;