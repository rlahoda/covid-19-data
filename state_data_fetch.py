import os


def state_data_fetch():
    print("Fetching NY Times data")
    os.system("git pull upstream master --no-edit")
    print("NY Times data fetched")


state_data_fetch()
