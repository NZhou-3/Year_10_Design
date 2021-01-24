number1 = 16
number2 = 8


answer = number1 / numbeer2
print (answer)
print (math.floor(answer))
print (math.ceil(answer))
print (math.trunc (answer))

if number1 % number2 == 0:
print (str(number1) + 'is a multiple of ' + str (number2))

else:
	print (str(number1) + 'is not a multiple of ' + str (number2))

elif number2 % number1 == 0:
	print (str(number2) + 'is a multiple of ' + str(number1))

else:
	print ("Neither of these is a multiple of the other")


