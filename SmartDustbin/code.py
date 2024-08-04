 import RPi.GPIO as GPIO
from time import time, sleep

def show_distance():
    GPIO.output(TRIG, False)
    sleep(0.05)

    GPIO.output(TRIG, True)
    sleep(0.00001)
    GPIO.output(TRIG, False)

    while GPIO.input(ECHO) == 0:
        pulse_start = time()

    while GPIO.input(ECHO) == 1:
        pulse_end = time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    distance = round(distance, 2)

    return distance

def calculate_percentage(distance, max_distance):
    if distance <= max_distance:
        percentage = (max_distance - distance) / max_distance * 100
    else:
        percentage = 0
    return percentage

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

TRIG = 23
ECHO = 18

red = 17
green = 4

GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

GPIO.setup(red, GPIO.OUT)
GPIO.setup(green, GPIO.OUT)

max_distance = 30  # Maximum distance in centimeters

try:
    while True:
        distance = show_distance()
        percentage = calculate_percentage(distance, max_distance)
        print("--> Distance: {} cm, Depth: {:.2f}%".format(distance, percentage))

        if distance < 9:
            GPIO.output(green, False)
            GPIO.output(red, True)
        else:
            GPIO.output(red, False)
            GPIO.output(green, True)

        sleep(0.5)

except KeyboardInterrupt:
    print("\nExiting the program.")
    GPIO.cleanup()
