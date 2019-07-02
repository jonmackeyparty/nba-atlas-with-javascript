//Index Pages//

Button for "View Leagues" >> shows index of leagues via js on player show page

      --need to nest some html in the logic so jquery can find the dom element to attach the info to
        (or append to parent element)
        each element in the list should be be a link; once clicked, it can show the league detail

        ** be aware may need an explicit serializer for trimming data **

      --this will be an onclick --> get to the leagues controller
      --


//refactor event listeners to iterate over buttons//

refresh buttons for the 2 sections

make js load smoother (find some other way to load other than eampty() and .append?)

  --is it ok to stick a bunch of stuff in the ajax:success?

fix duplicate of list recent invites on submitInvitation() success
