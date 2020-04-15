import wget
import csv
import json
import re

# print("Beginning file download with wget module")

# url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/csv"
# wget.download(url, "world-countries.csv")


def stringClean(s):

    # Remove all non-word characters (everything except numbers and letters)
    s = re.sub(r"[^\w\s]", "", s)
    string = s.replace("_", " ")
    return string


def countries_parse():
    print("Starting world data")
    # Open file
    with open("world-countries.csv") as csvfile:
        csvData = csv.reader(csvfile, delimiter=",", quotechar='"')
        jsonData = {
            "countries": {},
        }
        # iterate through csv
        for row in reversed(list(csvData)):  # iterate through the rows of the csv
            d = row[0]
            if d != "dateRep":  # check to make sure it's not the first row
                day = row[1]
                if int(row[1]) < 10:
                    day = "0" + day
                month = row[2]
                if int(row[2]) < 10:
                    month = "0" + month
                year = row[3]
                state = stringClean(row[6])
                dateStr = year + "-" + month + "-" + day + "T12:00:00Z"
                newCases = int(row[4])
                newDeaths = int(row[5])
                population = 0
                if row[9] != "":
                    population = int(row[9])

                if (
                    state in jsonData["countries"]
                ):  # if the item already exists in the dict
                    dataLength = len(jsonData["countries"][state]["data"])
                    previousData = jsonData["countries"][state]["data"][dataLength - 1]
                    cases = newCases + previousData["cases"]
                    deaths = newDeaths + previousData["deaths"]
                    jsonData["countries"][state]["casesPop"] = (
                        float((cases / population) * 100)
                        if population > 0 and cases > 0
                        else 0
                    )
                    jsonData["countries"][state]["deathsPop"] = (
                        float((deaths / population) * 100)
                        if population > 0 and deaths > 0
                        else 0
                    )
                    jsonData["countries"][state]["mortality"] = (
                        float((deaths / cases) * 100) if cases > 0 and deaths > 0 else 0
                    )
                    jsonData["countries"][state]["data"].append(
                        {
                            "date": dateStr,
                            "cases": cases,
                            "deaths": deaths,
                            "newCases": newCases,
                            "newDeaths": newDeaths,
                            "mortality": float((deaths / cases) * 100)
                            if cases > 0 and deaths > 0
                            else 0,
                            "casesPop": float((cases / population)) * 100
                            if population > 0 and cases > 0
                            else 0,
                            "deathsPop": float((deaths / population)) * 100
                            if population > 0 and deaths > 0
                            else 0,
                        }
                    )
                    jsonData["countries"][state]["deaths"] = deaths
                    jsonData["countries"][state]["cases"] = cases
                    if (
                        "firstDeath" not in jsonData["countries"][state].keys()
                        and deaths != 0
                    ):
                        jsonData["countries"][state]["firstDeath"] = dateStr

                else:  # if the item doesn't exist
                    if newDeaths != 0:  # if there are deaths in the first record
                        jsonData["countries"][state] = {
                            "name": state,
                            "firstCase": dateStr,
                            "cases": newCases,
                            "firstDeath": dateStr,
                            "deaths": newDeaths,
                            "population": population,
                            "casesPop": float((newCases / population) * 100)
                            if population > 0 and newCases > 0
                            else 0,
                            "deathsPop": float((newDeaths / population) * 100)
                            if population > 0 and newDeaths > 0
                            else 0,
                            "mortality": float((deaths / cases) * 100),
                            "data": [
                                {
                                    "date": dateStr,
                                    "cases": newCases,
                                    "deaths": newDeaths,
                                    "newCases": newCases,
                                    "newDeaths": newDeaths,
                                    "mortality": float((deaths / cases) * 100),
                                    "casesPop": float((newCases / population) * 100)
                                    if population > 0 and newCases > 0
                                    else 0,
                                    "deathsPop": float((newDeaths / population) * 100)
                                    if population > 0 and newDeaths > 0
                                    else 0,
                                }
                            ],
                        }

                    else:  # if there are no deaths in the first record
                        jsonData["countries"][state] = {
                            "name": state,
                            "firstCase": dateStr,
                            "cases": newCases,
                            "deaths": 0,
                            "population": population if population > 0 else 0,
                            "casesPop": float((newCases / population) * 100)
                            if population > 0 and newCases > 0
                            else 0,
                            "deathsPop": 0,
                            "mortality": 0,
                            "data": [
                                {
                                    "date": dateStr,
                                    "cases": newCases,
                                    "deaths": newDeaths,
                                    "newCases": newCases,
                                    "mortality": 0,
                                    "newDeaths": 0,
                                    "casesPop": float((newCases / population) * 100)
                                    if population > 0 and newCases > 0
                                    else 0,
                                    "deathsPop": 0,
                                }
                            ],
                        }
        print("data parsed")
        with open("world-countries.json", "r+") as jsonfile:
            json.dump(jsonData, jsonfile)
            print("World data json created")


countries_parse()
