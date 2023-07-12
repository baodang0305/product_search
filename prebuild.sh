#!/bin/bash

# Install Python dependencies
# pip install -r requirements.txt

pip install urllib3==1.26.6 

python -m venv .env
source .env/bin/activate
pip install -U pip setuptools wheel
pip install -U spacy

# Download spaCy model
# python3 -m spacy download en_core_web_lg
python3 -m spacy download ja_core_news_lg

# Download pytextrank
python3 -m pip install pytextrank

# Exit with success status code
exit 0