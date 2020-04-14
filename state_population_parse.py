import json
import csv

# This file is only needed to parse through the US State population data and should not need to be used more than once
def states_population_parse():
    # Open file

    with open("states_population.csv") as csvfile:
        csvData = csv.reader(csvfile, delimiter=",", quotechar="|")

        jsonData = {}
        # iterate through csv
        for row in csvData:  # iterate through the rows of the csv
            fips = int(row[0])
            state = row[1]
            census = int(row[2])
            estimated = int(row[3])
            jsonData[state] = {"name": state, "census": census, "estimated": estimated}

    with open("state-population.json", "w") as jsonfile:
        json.dump(jsonData, jsonfile)


states_population_parse()
