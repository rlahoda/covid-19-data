import wget
import os


def world_data_fetch():
    os.remove("world-countries.csv")
    print("File Removed!")
    print("Beginning file download with wget module")

    url = "http://opendata.ecdc.europa.eu/covid19/casedistribution/csv"
    wget.download(url, "world-countries.csv")
    print("ECDC data fetched")


world_data_fetch()
