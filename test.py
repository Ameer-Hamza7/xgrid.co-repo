my_list = [1, 2, 3, 4, 5]
target = int(input("Enter Your Targeted Number: "))
flag_list = []

def evaluate_triplates():
    global my_list
    global target
    global flag_list
    
    for z in range(len(my_list)):
        r = my_list[:z] + my_list[z+1:]
        for y in r:
            s = r[:y] + r[y:]
            for x in s:
                try:
                    if my_list[z] + my_list[y] + my_list[x] == target:
                        print(f'Iteration :: {z} :: ', z, y, x)
                        print(f'Iteration :: {z} :: ', my_list[z] , my_list[y] , my_list[x])
                        flag_list.append(True)
                except Exception as e:
                    pass
                    
    if True in flag_list:
        return 'Yes, the input array is a triplet'
    else:
        return 'No, the input array is not a triplet'


print(evaluate_triplates())


target_num = int(input("Enter Target Value: "))

def finding_postion():
    global my_list
    global target_num
    
    found_on = []
    
    for x in range(len(my_list)):
        if my_list[x] == target_num:
            found_on.append(x)
            
    return found_on

print(finding_postion())