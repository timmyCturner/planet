# Converting lat/long to cartesian
import numpy as np
import json


def get_cartesian(lat=None,lon=None):
    lat, lon = np.deg2rad(lat), np.deg2rad(lon)
    R = 50 # radius of the earth
    x = R * np.cos(lat) * np.cos(lon)
    y = R * np.cos(lat) * np.sin(lon)
    z = R *np.sin(lat)
    return x,y,z

def run():
    dictionary =[]

    with open('static/cities.json') as json_file:
        data = json.load(json_file)
        #print(data[0])
        count=0;
        for i in data:
            #print(i);
            city = i['city']
            state = i['state']
            long = i['longitude']
            lat = i['latitude']
            x,y,z = get_cartesian(lat,long)
            dictionary.append({
                "city" : city,
                "state" : state,
                "x" : x,
                "y" : y,
                "z" : z,
                "population": '36877'
            })
            if (count>100):
                break;

    # Serializing json
    json_object = json.dumps(dictionary, indent = 4)

    # Writing to sample.json
    with open("/sample.json", "w") as outfile:
        outfile.write(json_object)

run()
