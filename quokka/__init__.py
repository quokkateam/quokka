import logging
from flask import Flask

# Init app
app = Flask(__name__)

# Add app logger
app.logger.addHandler(logging.FileHandler('main.log'))
app.logger.setLevel(logging.INFO)
logger = app.logger