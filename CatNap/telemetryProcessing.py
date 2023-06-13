import matplotlib.pyplot as plt
from ast import literal_eval

with open('data/telemetry.txt') as f:
    data = f.readlines()

boostInfo = literal_eval(data[0])
screensInfo = literal_eval(data[1])
timesInfo = literal_eval(data[2])
cheesedoortimesInfo = literal_eval(data[3])
hsInfo = literal_eval(data[4])
#pathInfo = literal_eval(data[5]) javascript is singlethreaded so this would bork the game

total_plays = max(len(boostInfo), len(screensInfo), len(timesInfo), len(cheesedoortimesInfo), len(hsInfo))


## BOOSTERS ##
totalBoosters = 0
usedBoosters = 0
collectedBoosters = 0
shieldsTotal = 0
jellosTotal = 0
yarnsTotal = 0
shieldsUsed = 0
jellosUsed = 0
yarnsUsed = 0
for b in boostInfo:
    totalBoosters += b[0]
    usedBoosters += b[1]
    collectedBoosters += b[2]
    shieldsTotal += b[3]
    jellosTotal += b[4]
    yarnsTotal += b[5]
    shieldsUsed += b[6]
    jellosUsed += b[7]
    yarnsUsed += b[8]
booster_labels = ['Total Boosters', 'Collected Boosters', 'Used Boosters']
booster_data = [totalBoosters, collectedBoosters, usedBoosters]
plt.bar(booster_labels, booster_data)
plt.title("Boosters")
plt.show()
plt.bar(['Shields Total', 'Shields Used'], [shieldsTotal, shieldsUsed])
plt.title("Shields")
plt.show()
plt.bar(['Jellos Total', 'Jellos Used'], [jellosTotal, jellosUsed])
plt.title("Jellos")
plt.show()
plt.bar(['Yarns Total', 'Yarns Used'], [yarnsTotal, yarnsUsed])
plt.title("Yarns")
plt.show()

print("Boosters")
print(booster_data)
print()
print("Shields")
print([shieldsTotal, shieldsUsed])
print()
print("Jellos")
print([jellosTotal, jellosUsed])
print()
print("Yarns")
print([yarnsTotal, yarnsUsed])
print()

## SCREENS ##
helpsChecked = 0
scoresChecked = 0
creditsChecked = 0
for s in screensInfo:
    helpsChecked += s[0]
    scoresChecked += s[0]
    creditsChecked += s[0]
screens_label = ['Times Played', 'Help Screen', 'Score Screen', 'Credit Screen']
screens_data = [total_plays, helpsChecked, scoresChecked, creditsChecked]
plt.bar(screens_label, screens_data)
plt.title("Screen Usage")
plt.show()

print("Screen Usage")
print(screens_data)
print()

## HIGH SCORES ##
names = []
for h in hsInfo:
    names.append(h["name"])
plt.bar(['Times Played', 'Score Name Inserted'],[total_plays, len(names)])
plt.title("High Score Interaction")
plt.show()

print("High Score Interaction")
print([total_plays, len(names)])
print()

## TIMES ##
times = [0] * 10
for t in timesInfo:
    i = 0
    while(i < len(t)):
        times[i] += t[i]
        i += 1


avgTimes = []
for t in times:
    avgTimes.append(round(t / total_plays, 2))
# avgTimepSession = plt.figure(figsize = (10, 7))
# plt.boxplot(avgTimes)
# plt.title("Average Time per Session")      # This is not useful information
# plt.show()

#Divide times into levels
levelsArrArray = []
i = 0
while i < 10:
    levelArr = []
    for t in timesInfo:
        if(i < len(t)):
            levelArr.append(t[i])
    levelsArrArray.append(levelArr)
    i += 1

avgTimepLevel = plt.figure(figsize = (10, 7))
plt.boxplot(levelsArrArray)
plt.title("Time per Level")       
plt.show()

print("Time per Level")
print(levelsArrArray)
print()


## CHEESE-DOOR TIMES ##
cdTimes = [0] * 10
for t in cheesedoortimesInfo:
    i = 0
    while(i < len(t)):
        cdTimes[i] += t[i]
        i += 1

avgCDTimes = []
for t in cdTimes:
    avgCDTimes.append(round(t / total_plays, 2))

# avgCDTimepSession = plt.figure(figsize = (10, 7))
# plt.boxplot(avgCDTimes)
# plt.title("Average Time between Last Cheese and Door per Session")       # This is not useful information
# plt.show()

#Divide cheesedoortimes into levels
cdlevelsArrArray = []
i = 0
while i < 10:
    cdlevelArr = []
    for t in cheesedoortimesInfo:
        if(i < len(t)):
            cdlevelArr.append(t[i])
    cdlevelsArrArray.append(cdlevelArr)
    i += 1

avgCDTimepLevel = plt.figure(figsize = (10, 7))
plt.boxplot(cdlevelsArrArray)
plt.title("Time between Last Cheese and Door per Level")
plt.show()

print("Time between Last Cheese and Door per Level")
print(cdlevelsArrArray)
print()


## LEVELS ##
levels = [0] * 11
for l in timesInfo:
    levels[len(l)] += 1
plt.bar(["0","1","2","3","4","5","6","7","8","9","10"], levels)
plt.title("Max Level Reached")
plt.show()

print("Max Level Reached")
print(levels)
print()