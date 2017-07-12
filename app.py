from quokka import app
from quokka.helpers.configs import get_config
from flask import request
from flask_restplus import Resource, Api


api = Api(validate=True)


# When ready to implement API and add reverse proxy
# @api.route('/api/user')


if __name__ == '__main__':
  app.run(debug=get_config('DEBUG'))