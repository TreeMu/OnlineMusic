import pandas as pd
import pymongo
import csv
import random

username = "123456"

# 创建mongoclient连接mongodb数据库
client = pymongo.MongoClient("mongodb://localhost:27017/")

# 创建mydb数据库
db = client["mydb"]

# 创建mycol集合
music_col = db["music_collection"]
favor_col = db["Favor"]

music = pd.DataFrame(list(music_col.find()))
favor = pd.DataFrame(list(favor_col.find()))

songlists = list(favor[favor['username']=='123456']['fname'])[0]

artists = {}
albums = {}
for song in songlists:
    for i in range(len(music)):
        if music['name'][i]==song:
            artist = music['artist'][i]
            artists[artist] = artists.get(artist,0) + 1
            album = music['album'][i]
            albums[album] = albums.get(album,0) + 1

artists = sorted(artists.items(), key=lambda x: x[1], reverse=True)
albums = sorted(albums.items(), key=lambda x: x[1], reverse=True)

columns = ['name', 'artist','album','duration']
recom = pd.DataFrame(columns=columns)

def getbyart(art):
    rand = random.randint(1, 2)
    cnt = 0
    for i in range(len(music)):
        if cnt==10:
            break
        if music['artist'][i]==art:
            if i % rand ==0 :
                row = {
                    'name': music['name'][i],
                    'artist': music['artist'][i],
                    'album':music['album'][i],
                    'duration': music['duration'][i]
                }
                recom.loc[len(recom)+cnt] = row     
                cnt+=1
                
def getbyalb(alb):
    rand = random.randint(1, 2)
    cnt = 0
    for i in range(len(music)):
        if cnt==10:
            break
        if music['album'][i]==alb :
            if i % rand==0:
                row = {
                    'name': music['name'][i],
                    'artist': music['artist'][i],
                    'album':music['album'][i],
                    'duration': music['duration'][i]
                }
                recom.loc[len(recom)+cnt] = row
                cnt+=1

for i in range(3):
    if(len(recom)==30):
        break
    getbyart(artists[i][0])
    getbyalb(albums[i][0])

recom = recom.drop_duplicates(subset='name')

import mysql.connector

# create a connection to the database
cnx = mysql.connector.connect(user='root', password='root',
                              host='localhost', database='mydb')

# create a cursor object to execute SQL queries
cursor = cnx.cursor()

# execute a SELECT query
query = "SELECT * FROM music"
cursor.execute(query)

# fetch the results and print them
results = cursor.fetchall()

for result in results:
    recom.loc[recom["name"] == result[1], "path"] = result[2]
# close the cursor and connection
cursor.close()
cnx.close()

recom.to_csv('./public/recom.csv')
print("finished!!!")