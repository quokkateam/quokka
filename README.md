# Quokka

Home of the Quokka web app

## Getting Started

1. Clone the repo:

    ```
    $ git clone https://github.com/quokkateam/quokka && cd quokka
    ```

2. To manage environment variables, create a new `.env` file in the project's root directory with an `ENV` var set to `development`:

    ```
    $ touch .env && echo 'export ENV="development"' >> .env
    ```

3. Activate your environment variables:

    ```
    $ wget https://s3-us-west-1.amazonaws.com/quokkadev/activate.sh
    ```
    ```
    $ sudo mv activate.sh /usr/local/bin/activate.sh
    ```
    ```
    $ echo 'source /usr/local/bin/activate.sh' >> ~/.bashrc
    ```
    ```
    $ source ~/.bashrc
    ```
    ```
    $ cd .. && cd quokka
    ```
4. Copy the example config vars file to a locally, git-ignored file to manage config vars with for each environment:

    ```
    $ cp quokka/helpers/configs/example_vars.py quokka/helpers/configs/vars.py
    ```

5. Install virtualenv if you don't have it:

    ```
    $ pip install virtualenv
    ```

6. Create a new virtual environment and install python dependencies:

    ```
    $ virtualenv venv
    ```
    ```
    $ source venv/bin/activate
    ```
    ```
    $ pip install -r requirements.txt -r dev-requirements.txt
    ```

7. Install npm dependencies:

    ```
    $ npm install
    ```

## Starting the App

1. Start Flask (not necessary right now):

    ```
    $ python app.py
    ```

2. In a new tab, start a watch process for sass:

    ```
    $ npm run sass
    ```

3. In a new tab, start your node server:

    ```
    $ npm start
    ```

## License

All Rights Reserved, Quokka, LLC
