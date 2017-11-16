#!/usr/bin/env python2
import sys,time,random

str=open(sys.argv[1])
typing_speed = 100 #wpm
def slow_type(t):
    for l in t:
        sys.stdout.write(l)
        sys.stdout.flush()
        time.sleep(random.random()*10.0/typing_speed)
    print ''

for l in str:
	slow_type(l)
