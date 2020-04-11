import wget
import os

os.remove("world-countries.csv")
print("File Removed!")
print("Beginning file download with wget module")

url = "http://opendata.ecdc.europa.eu/covid19/casedistribution/csv"
wget.download(url, "world-countries.csv")
