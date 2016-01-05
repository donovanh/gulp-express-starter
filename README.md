# Gulp / Express

Based on the Express Generator version of Express. I've added a gulp file to add browser sync, Sass and Nodemon to make it easier to build an Express app.

## Installing

First make sure you have [npm]() available (available after installing Node). With this repo cloned, run:

    npm install

Then the gulp process is run with `gulp`.

## Images

There's a task in place to run images through the TinyPNG api. You'll need to register for an [API key](https://tinypng.com/developers) and put it in the gulp file.

Any images placed in the `src/images` directory will then be processed.

## Sass

Sass (`.scss`) files will be processed from the `src/sass` directory and placed in the `public/stylesheets` directory.

## License

MIT
