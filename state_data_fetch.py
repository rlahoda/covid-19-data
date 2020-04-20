import os


def state_data_fetch():
    print("Fetching NY Times data")
    os.system("git fetch upstream master")
    os.system("git checkout upstream/master us-counties.csv us-states.csv")
    os.system("git add .")
    os.system('git commit -m "updated USA data"')
    print("NY Times data fetched")


state_data_fetch()
