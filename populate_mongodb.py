#populate_mongodb.py
print("test")
import time
import paho.mqtt.client as mqtt
import random


broker_address="localhost" 

client = mqtt.Client("P1")
client.connect(broker_address)


for x in xrange(1,20):
	rd = random.randrange(0, 200, 2)
	msg = "{ \"id\": \"test1\", \"temp\": %d }" % rd 
	client.publish("/iot/home/2", msg)
	print(" Sent the meessage %s \n " % msg )
	time.sleep(60)
	pass

