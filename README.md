# This is 🍜 🍕 Nibblr 🌮 🍔


I am "Tinder for Take-Out"

## How to use

TO BE DEPLOYED SOON

## Configuration on local machine

Create a GitHub repo and clone it. After you have a repo on your machine:

```sh
npm install

create a secrets directory with a file that contains your own Google Places and Clarifai API keys

npm dev-start
```

App will be running on localhost:3000

And then you'll have me! If I change – which I probably will – you can get the most recent
version by doing this again:

```sh
git fetch attune
git merge attune/master
```

## My anatomy

`/app` has the React setup. `main.jsx` is the entry point.

`/bin` has scripts.

`/public` has all visual assets

## Conventions

I use `require` and `module.exports` in `.js` files.

I use `import` and `export` in `.jsx` files, unless `require` makes for cleaner code.

I use two spaces, no semi-colons, and generally prefer a less strict version of
[NPM's funny coding style](https://docs.npmjs.com/misc/coding-style).

## Licensing
This software is protected under the standard MIT License.
