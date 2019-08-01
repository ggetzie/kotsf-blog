---
path: "/gdarchive/9"
title: "Your most hated code"
oldId: 9
---
I think every programmer must have some bit of code they wrote that
they absolutely hate. Maybe it's something that's brute force where it
doesn't need to be. Maybe it's a block of code that's been copied and
pasted a few more times than is advisable. Sure, it works. It's
perfectly *functional*.  But you know it's in your codebase,
lurking. It's waiting for the perfect time to strike, when it can rear
up and bite you in the ass at the worst possible moment. Of course,
you didn't *want* to write it that way. You'd rather have spent a few
days pondering over the most elegant way to express yourself. There
wasn't time, though. Anyway, this is good enough. For now. You'll come
back to it later.

I think this would make a great interview question (though I've never
heard of anyone asking it): "What's the worst piece of code you ever
wrote?" First, you'd get to see their ability to spot shortcomings in
their own work, which is always a valuable skill. Second, it will give
you some insight into what aspects of good code they value most. Is
the source of their discomfort something like poor modularization?
Maybe they can't abide code that isn't properly indented. If something
trivial is their biggest grief, perhaps they're not worth hiring. If
they can't think of *any* of their own code that they hate, they're
either a phenomenal programmer, or they just haven't given it much
thought, probably the latter.

My own current source of shame is a particularly atrocious rats' nest
of conditionals that determine what gets displayed when someone views
an debate on GreaterDebater. The debate itself doesn't change of
course, but the options available to act on it depend highly on who's
looking at it. The rules go like this:

1. If the user isn't logged in, and the debate is still ongoing tell them they should log in if they want to vote.
2. If the user is logged in, and isn't one of the people in the debate, and the debate hasn't ended, and this user hasn't voted yet, give them the option to vote.
3. If all of the above is true except the user has already voted, showthem the current tally of votes with the option to change their vote.
4. If the debate is over, always show the outcome and the vote tally.
5. If the debate is ongoing and the user viewing it is the user whose turn it is, show them their options for replying.
6. If 5 is true but they haven't yet accepted the challenge to the debate, then show them the options to accept or decline.
7. If 5 is true but their opponent has offered a draw, then show the options to accept or decline the draw
8. If the user is a participant in the debate and it's **not** their turn, just show the debate so far without any actions.

Phew. All that is realized as the following code.

    if arg.status in range(0,3):
        # The argument hasn't ended
        current = True

    if current and (request.user.is_authenticated() == False or request.user == arg.whos_up(invert=1)):
        # The viewer is either not logged in or a participant and it's not his turn
        # Don't show any controls
        show_arg_actions = False
    else:
        show_arg_actions = True

    if request.user == arg.defendant and arg.status == 0:
        # defendant hasn't accepted or declined the challenge yet
        # and is viewing the argument, show the options
        # to accept or decline the argument
        new_arg = True

    if current and request.user == arg.whos_up() and arg.draw_set.all():
        # A draw has been proposed and the recipient is viewing the argument
        # show the option to decline or accept the draw
        show_draw = True
        
    if current and new_arg == False and not arg.draw_set.all() and request.user == arg.whos_up():
        # No draw is pending, the person viewing the argument 
        # is a participant and it's his turn show the options
        # to respond
        show_actions = True

    if current and request.user.is_authenticated() and not request.user in [arg.plaintiff, arg.defendant]:
        # The person viewing the argument is a registered user
        # and not a participant, show the voting box
        show_votes = True

    return render_to_response("items/arg_detail.html",
                              {'object': arg,
                               'incite': arg.incite,
                               'comments': arg.argcomment_set.order_by('pub_date'),
                               'new_arg': new_arg,
                               'voted_for': voted_for, 
                               'last_c': last_c,
                               'current': current,
                               'pvotes': votes.filter(voted_for="P").count(),
                               'dvotes': votes.filter(voted_for="D").count(), 
                               'show_actions': show_actions,
                               'show_votes': show_votes,
                               'show_arg_actions': show_arg_actions,
                               'show_draw': show_draw
                               },
                              context_instance=RequestContext(request))

This is actually an improvement from the first attempt. The show_\*
variables are in turn evaluted in **another** conglomeration of *IF*
tags in the template. Suffice to say, the template is not very
designer-friendly.

    {% if show_arg_actions %}
    <div id="arg_actions">
      {% if current %}
    
      {% if new_arg %}
      <!--   The argument has been proposed but not accepted or declined, the defendant is viewing the page -->
      <div class="arg_query arg_responses" id="arg_responses">
        Begin this debate?<br />
        <ul class="flat-list">
          <li><a href="#" onclick="respond_challenge({{ object.id}}, {{ request.user.id }}, 0); return false;">Accept</a></li>
          <li><a href="#" onclick="respond_challenge({{ object.id}}, {{ request.user.id }}, 1); return false;">Decline</a></li>
        </ul>
      </div>
      {% endif %}
    
      {% if show_draw %}
      <!-- A draw has been proposed, the user viewing the page is currently up in the argument -->
      <div class="arg_responses arg_query" id="draw_query">
        <p>
          A draw has been offered
        </p>
        <a class="menu" href="#" onclick="respond_draw({{ object.id }}, {{ request.user.id }}, 0); return false;">Accept</a> |
        <a class="menu" href="#" onclick="respond_draw({{ object.id }}, {{ request.user.id }}, 1); return false;">Decline</a>
      </div>
      {% endif %}
      
      {% if show_actions %}
      {% include "items/turn_actions.html" %}  
      {% endif %}
    
      {% if show_votes %}
      <div id="vote" class="arg_responses">
        {% if voted_for %}
    
        {% include "items/vote_div.html" %} 
        {% else %}    
        <p>
          Who's winning? Cast your vote below.
        </p>
        <a class="menu" href='#' onclick="vote({{ object.id }}, {{ request.user.id }}, 'P'); return false;">Vote for {{ object.plaintiff.username}}</a> |
        <a class="menu" href='#' onclick="vote({{ object.id }}, {{ request.user.id }}, 'D'); return false;">Vote for {{ object.defendant.username}}</a>
        {% endif %}
      </div>
      {% endif %}
    
      {% else %}
      <div id="vote" class="arg_responses">
        {% include "items/vote_div.html" %}
      </div>
      {% endif %}
    </div>
    
    {% else %}
    {% if not request.user.is_authenticated %}
    <div id="arg_actions">
      <div class="arg_responses">
        <a href="/users/login?next={{ request.path }}">Log in or register</a> to cast your vote for the greater debater!
      </div>
    </div>
    {% endif %}
    {% endif %}

What bothers me the most about this strategy is how the logic is split
up between the view and the template. It should really be in one or
the other, ideally it will be in the view in keeping with the Django
practice of having as little logic in the template as possible. I can
remove all of the conditionals from the template by breaking out each
endpoint into a small template of its own. By choosing the appropriate
template in the view, we can pass the rendered HTML to the main debate
template directly, thus removing all of the conditionals from the
template. This greatly simplifies the template. In fact, the entire
mess of template conditionals above can be replaced with a single
line:

    {{ arg_actions }}
    
The view will pass on the rendered HTML as the arg_actions variable.

Of course, all of this complexity has to go somewhere. In this case
it's being shoved into the view. At least Python is better equipped to
handle it than the Django templating language. I'm still not entirely
sure this is the best way to handle this situation, but I am glad the
template is cleaned up. The code in the view now looks like this:

    if arg.status in range(0,3):
        if request.user.is_authenticated():
            if request.user == arg.whos_up():
                if arg.status == 0:
                    # The challenge has been proposed but not accepted
                    argt=loader.get_template("items/arg_new_respond.html")
                    argc = Context({'object': arg,
                                    'request': request})
                    arg_actions = argt.render(argc)
                elif arg.draw_set.all():
                    # A draw has been offered
                    argt=loader.get_template("items/draw_actions.html")
                    argc = Context({'object': arg,
                                    'request': request})
                    arg_actions = argt.render(argc)
                else:
                    # normal turn
                    argt=loader.get_template("items/turn_actions.html")
                    argc = Context({'object': arg,
                                    'last_c': last_c,
                                    'user': request.user})
                    arg_actions = argt.render(argc)
            elif request.user == arg.whos_up(invert=1):
                # The user is a participant, but it's not his turn
                arg_actions = ''
            else:
                # The user is not a participant in this debate
                if voted_for:
		# The user has already cast a vote
                    argt = loader.get_template("items/vote_tally.html")
                    argc = Context({'pvotes': votes.filter(voted_for='P').count(),
                                    'dvotes': votes.filter(voted_for='D').count(),
                                    'object': arg,
                                    'current': True,
                                    'voted_for': voted_for
                                    })
                    arg_actions = argt.render(argc)    
                else:
		# The user hasn't voted yet
                    argt = loader.get_template("items/vote_div.html")
                    argc = Context({'object': arg,
                                    'request': request})
                    arg_actions = argt.render(argc)
        else:
            # debate is in progress, tell user to log in to vote
            argt = loader.get_template("items/arg_login.html")
            argc = Context({'request': request})
            arg_actions = argt.render(argc)    
    else: 
        # debate has ended, show the final vote tally
        argt = loader.get_template("items/vote_tally.html")
        argc = Context({'pvotes': votes.filter(voted_for='P').count(),
                        'dvotes': votes.filter(voted_for='D').count(),
                        'object': arg,
                        'current': False,
                        'voted_for': voted_for
                        })
        arg_actions = argt.render(argc)    
	
    return render_to_response("items/arg_detail.html",
                              {'object': arg,
                               'incite': arg.incite,
                               'comments': arg.argcomment_set.order_by('pub_date'),
                               'last_c': last_c,
                               'arg_actions': arg_actions
                               },
                              context_instance=RequestContext(request))
			      
So, that's how my most hated code got transformed into perhaps my
second-most hated code. I still feel like the deeply nested if
statements here are a <a
href="http://www.amazon.com/gp/product/0201485672?ie=UTF8&tag=greater0c-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201485672">code
smell</a><img
src="http://www.assoc-amazon.com/e/ir?t=greater0c-20&l=as2&o=1&a=0201485672"
width="1" height="1" border="0" alt="" style="border:none !important;
margin:0px !important;" /> that indicate there's a better way to
handle this. I'm just not quite sure what it is yet.


*Originally published 2010-03-15 06:33:39*