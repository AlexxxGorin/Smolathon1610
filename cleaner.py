with open('museums.txt') as f:
    a = f.readlines()

new_a = []
for i in a:
    if i not in new_a:
        new_a.append(i)

for i in new_a:
    print(i, end='')
print(len(new_a))