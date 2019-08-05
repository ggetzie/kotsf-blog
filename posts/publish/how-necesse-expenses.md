---
path: "/how-necesse-expenses/"
date: 2016-01-03
title: "How Necessary Are Those Expenses?"
oldId: 106
section: "publish"
---
One of the key elements of personal finance is separating "needs" from
"wants". Every guide to controlling your budget usually starts with
this. However, there's not a lot of guidance in deciding between one and the
other. A lot of the reason there's not is probably that this is a very personal
process. What one person considers a frivolity, another person might consider a
necessity. It's up to each of us to decide what things we value and then shift
our budgets accordingly to prioritize spending where it counts and avoid things
we can do without.

In the new year, I'm going to try implementing a new system. In reviewing my
expenses from the last year, I've decided to assign them each a priority level
of 1-5 based on the criteria below. I don't expect everyone would have the same
values as I do in regards of how to prioritize spending, but I think simply
labelling things neccessary or unnecessary is too coarse to be useful. Instead,
I'm going to try to be more mindful of what purpose I'm trying to achieve with
each purchase.

1. Survive - Necessary for survival: This includes things like rent, utilities,
groceries that I need to stay alive. I'm also including Internet access and
mobile phone service. While I technically could live without them, it's pretty
tough to have any sort of normal, modern life without these.

2. Prosper - Not strictly necessary, but beneficial: Honestly, this is probably
the most ill-defined category. Here I'm including things that I don't really
*need*, but which provide a practical benefit that I deem greater than the
cost. Things like furniture, new clothes, my car and all its related expenses,
and soon a cleaning service. These expenses make life easier and provide me more
time to do things I like, but if I absolutely had to, I could get rid of them.

3. Connect - Fun with friends: These expenses are, in a sense, unnecessary, but they
involve building relationships with friends and family and for that reason I
value them higher than things which only entertain myself. This includes things
like eating at restaurants, having drinks with friends, gifts, and travel to
visit friends and family.

4. Enjoy - Fun alone: These are things that I enjoy, but don't really need. This
includes entertainment that I only use by myself or conveniences that I could
have avoided with better planning. Examples are tv services (netflix, etc.),
books to read for pleasure, eating out for lunch or getting coffee at work,
take-out food. I really don't need to buy these things, but at least I got some
enjoyment out of them.

5. Avoid - Waste, Mistakes: These are things I didn't want to spend money on and
that could have been avoided. This includes things like speeding tickets,
parking tickets, repairs to things damaged by negligence or carelessness,
etc. This category *should* be zero. That will be the goal for 2016.

So how did I do last year? I went through and ranked every purchase I made by
adding a number one through five as a note in Mint. I then exported the data
from mint and used a little [pandas](http://pandas.pydata.org/) magic to tally
up the totals for each priority and draw a little pie chart with
[matplotlib](http://matplotlib.org/). This would be pretty easy to do in Excel
too, but I like using any chance to practice data munging with python. Anyway,
the results came out like this.

<img src="/img/priorities.png" />

Overall, I think not too bad. Things are probably a *little* higher and the
"Connect" side of things, but that can be remedied by relying less on having to
go out to eat or get drinks as an excuse to hang out with friends (or maybe
ordering cheaper drinks when I do). I really thought "Enjoy" would be a bigger
problem than it was. It seems like I give in a lot to the urge to just go out
for lunch at work, or pay $2-$3 for that afternoon cup of coffee rather than
grabbing one from the office machine. Still, this number could probably be cut
at least in half. Maybe I'll immediately transfer money to savings instead of
buying that cup of afternoon coffee as an incentive to save the money rather
than spend it.

Of course, this isn't intended to be the end-all/be-all method of prioritizing
spending. Within each priority there are opportunities to save money. You need
somewhere to live to survive, but that can be a studio apartment or a mansion,
with accordingly different impacts on the budget. There are also multiple ways
to achieve each goal without spending any money. This was a helpful exercise for
me to think about what I value, and to make sure I'm spending money in line with
those values.
