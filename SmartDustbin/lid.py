import RPi.GPIO as GPIO
from time import time, sleep

def show_distance(trig_pin, echo_pin):
    GPIO.output(trig_pin, False)
    sleep(0.05)

    GPIO.output(trig_pin, True)
    sleep(0.00001)
    GPIO.output(trig_pin, False)

    while GPIO.input(echo_pin) == 0:
        pulse_start = time()

    while GPIO.input(echo_pin) == 1:
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

def rotate_servo(angle, duration):
    duty_cycle = angle / 18 + 2
    GPIO.output(servo_pin, True)
    pwm.ChangeDutyCycle(duty_cycle)
    sleep(duration)
    GPIO.output(servo_pin, False)
    pwm.ChangeDutyCycle(0)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Ultrasonic Sensor 1
TRIG1 = 23
ECHO1 = 18

# Ultrasonic Sensor 2
TRIG2 = 24
ECHO2 = 25

# Servo Motor
servo_pin = 22

red = 17
green = 4

GPIO.setup(TRIG1, GPIO.OUT)
GPIO.setup(ECHO1, GPIO.IN)

GPIO.setup(TRIG2, GPIO.OUT)
GPIO.setup(ECHO2, GPIO.IN)

GPIO.setup(red, GPIO.OUT)
GPIO.setup(green, GPIO.OUT)

GPIO.setup(servo_pin, GPIO.OUT)
pwm = GPIO.PWM(servo_pin, 50)
pwm.start(0)

max_distance = 30  # Maximum distance in centimeters
rotation_duration = 5  # Rotation duration in seconds

try:
    for rotation in range(6):
        print("\nRotation", rotation + 1)
        for angle in range(0, 181, 10):
            pwm.ChangeDutyCycle(2 + (angle / 18))
            sleep(0.1)
            distance1 = show_distance(TRIG1, ECHO1)
            distance2 = show_distance(TRIG2, ECHO2)
            percentage1 = calculate_percentage(distance1, max_distance)
            percentage2 = calculate_percentage(distance2, max_distance)
            print("Angle: {}°, Distance 1: {} cm, Depth 1: {:.2f}%, Distance 2: {} cm, Depth 2: {:.2f}%".format(
                angle, distance1, percentage1, distance2, percentage2))

        # Check distance with Ultrasonic Sensor 2
        distance2 = show_distance(TRIG2, ECHO2)

        if distance2 <= 15:
            print("Object detected within 15 cm. Rotating servo forward.")
            rotate_servo(90, 2)  # Rotate the servo forward for 2 seconds
        else:
            print("No object within 15 cm. Rotating servo in reverse.")
            rotate_servo(-90, 2)  # Rotate the servo in reverse for 2 seconds

        sleep(rotation_duration - 2)  # Wait for 5 seconds minus the servo rotation duration

except KeyboardInterrupt:
    print("\nExiting the program.")
    pwm.stop()
    GPIO.cleanup()
