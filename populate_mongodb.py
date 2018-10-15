#populate_mongodb.py
print("test")
import time
import paho.mqtt.client as mqtt
import random


broker_address="localhost" 

client = mqtt.Client("P1")
client.connect(broker_address)


for x in xrange(1,10):
	rd = random.randrange(0, 101, 2)
	client.publish("/iot/home/2","{ \"id\": \"test1\", \"temp\": %d }" % rd )
	print(" Sent the meessage %d \n " % rd )
	time.sleep(60)
	pass

