#!/bin/bash
sleep 1

echo “starting load simulation”

fulload() {
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null |
    dd if=/dev/zero of=/dev/null &
};

fulload;

sleep 120

killall dd

sleep 240

fulload

sleep 120

killall dd
