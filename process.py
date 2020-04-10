import json

from states_csv_parse import states_parse
from counties_csv_parse import counties_parse
from world_data import countries_parse

#  this is a small function that will take the json files, put them into two objects, and put the objects into a javascript file.


def move_convert():
    states_parse()
    counties_parse()
    with open("us-states.json", "r") as statesJSON:
        statesData = json.load(statesJSON)
        statesJSON.close()
        statesStr = json.dumps(statesData)
        with open("us-counties.json", "r") as countiesJSON:
            countiesData = json.load(countiesJSON)
            countiesJSON.close()
            countyStr = json.dumps(countiesData)
        with open("world-countries.json", "r") as countriesJSON:
            countriesData = json.load(countriesJSON)
            countriesJSON.close()
            countriesStr = json.dumps(countriesData)

            fileData = (
                "export const states ="
                + statesStr
                + "; export const counties = "
                + countyStr
                + "; export const countries = "
                + countriesStr
            )

            with open("./app/js/data.js", "w") as dataFile:
                dataFile.write(fileData)
                dataFile.close()


move_convert()
