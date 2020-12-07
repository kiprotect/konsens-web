# Konsens! Powerful, privacy-friendly website & app analytics


## Building Konsens from scratch

If you want to customize Konsens or extend it, you can build it from scratch using the following commands:
```sh
npm install
npm run-script make-dev #will run a development server
npm run-script make #will build the production version
```

If you have an environment where `make` is available, you can also run

    make build 

## Maintainers

To publish a new version of Konsens to NPM, simply run

    make publish

To generate a new tagged release, simply run

    make release [RT=patch|minor|major]

If no argument is given, a 'patch' release will be created. The release mechanism will not run if
the working directory isn't clean. If it is, a Python script will increase the version number in
the `package.json` file, rebuild the `dist` files, create a new commit and tag it with the version.

## Contributing

Want to contribute? We'd love that!

If you have a feature request or bug to report, please fill out [a GitHub Issue](https://github.com/KIProtect/konsens/issues) to begin the conversation.

If you want to help out, but don't know where to begin, check out [the open issues tagged "help wanted"](https://github.com/KIProtect/konsens/labels/help%20wanted).

If you are multilingual, consider contributing a translation we don't have yet.

## License & third-party libraries

This project is licensed under a BSD-3 license. A list of third-party libraries can be found in the [package.json](package.json) file.

## Troubleshooting

Do you have problems using Konsens? If so, we want to know it! Just open an issue here and if possible provide the following information to us:

* The website on which Konsens is installed (if possible)
* The config file you're using (a link is sufficient)
* The version of Konsens that you're using (you can get this by opening the developer tools of your browser, going to the "Console" tab and typing `konsens.version()` in the JS console.)
