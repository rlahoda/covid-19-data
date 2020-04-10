import wget

print("Beginning file download with wget module")

url = "http://opendata.ecdc.europa.eu/covid19/casedistribution/csv"
wget.download(url, "world-countries.csv")
