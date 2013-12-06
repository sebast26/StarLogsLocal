$
  animation end    = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd'
  transition end   = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'
  visibilitychange = 'visibilitychange webkitvisibilitychange'

  document hidden () =
    document.hidden || document.webkitHidden

  crawl (messages) =
    counter = 0
    delay () =
      last message div height = $ '.content:last'.height()
      1000 + 500 * last message div height / 18

    if (messages.length > 0)
      if (document hidden ())
        set timeout
          crawl (messages)
        (delay())
      else
        $ '.plane'.append ($('<div>', class: 'content').text (messages.0))
        set timeout
          crawl (messages.slice(counter))
        (delay())
        ++counter
    else
      counter := 0

  play commit (messages) =
    document.get element by id 'theme'.play()
    crawl (messages)

  play error () =
    document.get element by id 'imperial_march'.play()
    crawl (["Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!"])

  show response () =
    $ '.plane'.show()
    commits fetch.done @(response)
      if (response :: Array)
        messages = [record.message, where: record <- response]
        play commit (messages)
      else
        console.log(response)
        play error()
    .fail @(problem)
      console.log(problem)
      play error()

  create audio tag (looped: true) for (file name) =
    source prefix = if (window.location.hostname == 'localhost')
      ''
    else
      'https://dl.dropboxusercontent.com/u/362737/starlogs.net/'

    tag = $ '<audio>' (id: file name, loop: looped)

    mp3 source = $ '<source>' (src: "#(source prefix)assets/#(file name).mp3", type: 'audio/mp3')
    ogg source = $ '<source>' (src: "#(source prefix)assets/#(file name).ogg", type: 'audio/ogg')

    tag.append(mp3 source).append(ogg source).appendTo($ 'body')

  $(document).on (animation end) '.content'
    $(this).remove()

  create audio tag for "theme"
  create audio tag for "imperial_march"
  create audio tag (looped: false) for "falcon_fly"

  commits fetch = nil

  $ '.input'.on (transition end)
    show response()

  $ 'input'.keyup @(event)
    if (event.key code == 13)
      repo_url = "http://localhost:3000/#($(this).val())"
      commits fetch := $.ajax (repo_url) 

      document.get element by id 'falcon_fly'.play()
      $(this).parent().add class 'zoomed'

  $ '.input'.show()
  

  $(document).on (visibilitychange)
    if (document hidden ())
      $ '.content'.add class 'paused'
    else
      $ '.content'.remove class 'paused'
