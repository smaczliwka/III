import csv
from copy import deepcopy
import datetime
from random import randrange, random

TIMESTAMP_FORMAT = '%Y-%m-%d %H:%M'

def randomtime(stime, etime):
    td = etime - stime
    return random() * td + stime

routes = [[['Gdańsk Główny', 0], ['Tczew', 16], ['Malbork', 29], ['Prabuty', 49], ['Susz', 55], ['Iława Główna', 68], ['Działdowo', 101], ['Mława', 111], ['Ciechanów', 127], ['Nowy Dwór Mazowiecki', 158], ['Legionowo', 168], ['Warszawa Wschodnia', 185], ['Warszawa Centralna', 196], ['Warszawa Zachodnia', 216], ['Grodzisk Mazowiecki', 242], ['Żyrardów', 251], ['Skierniewice', 264], ['Koluszki', 285], ['Tomaszów Mazowiecki', 305], ['Opoczno Południe', 335], ['Włoszczowa Północ', 367], ['Miechów', 401], ['Kraków Główny', 431]]]

return_routes = []
for route in routes:
    curr_return_route = deepcopy(route)
    curr_return_route.reverse()
    t = curr_return_route[0][1]
    curr_return_route[0][1] = 0
    for i in range(1, len(curr_return_route)):
        temp = curr_return_route[i][1]
        curr_return_route[i][1] = curr_return_route[i-1][1] + t - temp
        t = temp
    return_routes.append(curr_return_route)
routes.extend(return_routes)

with open('stacja.csv', 'w') as f:
    writer = csv.writer(f)
    for i in range(len(routes)):
        curr_route = routes[i]
        for j in range(len(curr_route)):
            writer.writerow([routes[i][j][0], i, j, routes[i][j][1]])

RIDES_PER_ROUTE = 20

with open('przejazd.csv', 'w') as f:
    writer = csv.writer(f)
    for i in range(len(routes)):
        for j in range(RIDES_PER_ROUTE):
            writer.writerow([i * RIDES_PER_ROUTE + j, i, randrange(1000), randomtime(datetime.datetime(2023, 1, 14, 0, 0), datetime.datetime(2023, 1, 16, 23, 59)).strftime(TIMESTAMP_FORMAT)])

SPACES_PER_RIDE = 10

with open('miejsce.csv', 'w') as f:
    writer = csv.writer(f)
    for i in range(len(routes)):
        for j in range(RIDES_PER_ROUTE):
            for k in range(SPACES_PER_RIDE):
                space_beg = randrange(len(routes[i]) - 1)
                space_end = randrange(space_beg, len(routes[i]))
                writer.writerow([i * RIDES_PER_ROUTE * SPACES_PER_RIDE + j * SPACES_PER_RIDE + k, i * RIDES_PER_ROUTE + j, space_beg, space_end])


