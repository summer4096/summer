#!/bin/bash

URL="https://summer.dev/#terminal"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$URL"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "$URL"
elif [[ "$OSTYPE" == "cygwin" ]]; then
    cygstart "$URL"
elif [[ "$OSTYPE" == "msys" ]]; then
    start "$URL"
elif [[ "$OSTYPE" == "win32" ]]; then
    start "$URL"
else
    echo "Unsupported OS"
fi
