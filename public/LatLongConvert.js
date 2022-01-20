
    export function calcCrow(lat, lon)
    {

        const x = Math.cos(lat) * Math.cos(lon)

        const y = Math.cos(lat) * Math.sin(lon)

        const z = Math.sin(lat)
        console.log(x,y,z);
}
export function calcCrowReverse(x,y,z)
{

    const lat = Math.asin(z,1);
    const long = Math.atan2(y,x);
    console.log(z,lat,long);
}
