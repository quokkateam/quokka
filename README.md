# Quokka

Home of the Quokka web app

## Getting Started

1. Clone the repo:

    ```
    $ git clone https://github.com/quokkateam/quokka && cd quokka
    ```


2. Install virtualenv if you don't have it:

    ```
    $ pip install virtualenv
    ```

3. Create a new virtual environment and install python dependencies:

    ```
    $ virtualenv venv
    ```
    ```
    $ source venv/bin/activate
    ```
    ```
    $ pip install -r requirements.txt -r dev-requirements.txt
    ```

4. Check if you have ruby, sass, and node installed. If not, go to the Installing Dependencies section below and install them as necessary.

    ```
    $ ruby -v
    ```
    ```
    sass -v
    ```
    ```
    node -v
    ```

5. Still within the quokka directory, install npm dependencies:

    ```
    $ npm install
    ```

## Starting the App

1. In a new tab, start a watch process for sass:

    ```
    $ npm run sass
    ```

2. In a new tab, start your node server:

    ```
    $ npm start
    ```

## Installing dependencies

### Ruby

    ```
    $ https://www.ruby-lang.org/en/documentation/installation/
    ```

### Sass

    ```
    $ gem install sass
    ```

### NPM/Node

<https://github.com/creationix/nvm#installation>

## Recommended editor

[vscode](https://code.visualstudio.com/download)

## License

All Rights Reserved, Quokka, LLC
