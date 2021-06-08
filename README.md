# space_invaders

A classic space invaders game created by following Ania Kubow's video tutorial.

After completing the tutorial, there was a horrible `uncaught TypeError` that was occuring
when the shooters laser left the top of the playgrid. This has been fixed in this version :)

Another mod we made was to wrap the entire code in an IIFE that contained a

```document.onreadystatechange``` 

method, which waits for all assets to be loaded including stylesheets, before starting the
the game. The entir app code is wrapped in an `if` statement:

```
if ( document.readyState === 'complete' ) {
    app code here....
}
```

needless to say, if the `readyState` is never `complete` the game will never start. But,
since the style sheets _must_ be loaded for the game to even display this is ok! :->

Now that we have this working smoothly we are now considering other adaptions & additions:

- responsive and useable on mobile
- styling
- addition of levels
- alien mother ship
- alien bombs!
- player sheilds to hide behind
- reproduce the game on an HTML `canvas` element

If you are interested in where the inspiration came from, please dig deep into the grey cells
of the younger me back in the late 1970's :)

....and a big thanks to Ania who taught me how to get started on this project.

Thank you Ania ; )

#Video Tutorial by Ania Kubow
https://www.youtube.com/watch?v=lhNdUVh3qCc&t=2590s

#Ania Kubow Space Invaders GitHub repository:
https://github.com/kubowania/space-invaders
