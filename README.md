This project is based on StarLogs by artemave: https://github.com/artemave/StarLogs

StarLogsLocal allows to display commit messages from local repositiries in local environment (no need for github repo).

### Want to use it?

Go to your HTTP server root directory.

Clone project:

    $ git clone git://github.com/sebast26/StarLogsLocal.git && cd StarLogsLocal

Execute command:

	$ cd <YOUR_GIT_REPO> && git log --reverse --format=%s > <HTTP_SERVER_ROOT>/StarLogsLocal/<FILENAME>.txt

Visit StarLogsLocal on your localhost (i.e. http://localhost/StarLogsLocal/starlogs.html)

Enter FILENAME.txt in input field.

### Want to hack on it?

No problem. But first, it is not just Javascript and CSS. It is [pogoscript](http://pogoscript.org/) and [sass](http://sass-lang.com/). Oh, and they require node.js and ruby respectively.

If that does not put you off, I give up! Clone the project:

    $ git clone git://github.com/sebast26/StarLogsLocal.git && cd StarLogsLocal

Get pogo:

    $ npm install -g pogo

Leave it autocompile:

    $ pogo -cw javascripts/*.pogo

Get sass:

    $ gem install sass # with sudo unless on rvm, rbenv, etc.

Leave it autocompile:

    $ sass --watch stylesheets:stylesheets

Serve project folder:

    $ npm install -g serve
    $ serve

Navigate to http://localhost:3000/starlogs.html and take it from there!
