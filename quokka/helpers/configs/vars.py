class Config(object):
  DEBUG = 'TRUE'


class TestConfig(Config):
  ENVIRONMENT = 'test'
  DATABASE_URL = 'postgresql://username:password@localhost/test_db_name?user=test_user'


class DevelopmentConfig(Config):
  ENVIRONMENT = 'development'
  DATABASE_URL = 'postgresql://username:password@localhost/dev_db_name?user=dev_user'


class ProductionConfig(Config):
  ENVIRONMENT = 'production'
  DATABASE_URL = 'postgresql://username:password@localhost/prod_db_name?user=prod_user'
  DEBUG = 'FALSE'