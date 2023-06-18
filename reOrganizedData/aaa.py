import os
k = open('aaa.txt', 'a')
for f in os.listdir('./reOrganizedData/'):
    k.write(f +'\n')
    