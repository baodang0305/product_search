#!/bin/bash

# Install Python dependencies
# pip install -r requirements.txt

python -m venv .env
source .env/bin/activate
pip install -U pip setuptools wheel
pip install -U spacy

# Download spaCy model
python3 -m spacy download en_core_web_sm

# Download pytextrank
python3 -m pip install pytextrank

# Exit with success status code
exit 0