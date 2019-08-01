---
path: "/gdarchive/7"
title: "The Python String Concatenation Shootout"
oldId: 7
---
Python is the language of one, and only one, obvious way to do
things. This isn't quite the case when it comes to concatenating
string though. There's three obvious choices. First, you can use the +
operator. Since strings are considered a sequence type, along with
lists and tuples, this works just like you would expect:

    >>> str1, str2, str3 = 'abc', 'def', 'ghi'
    >>> str1 + str2 + str3
    'abcdefghi'

String formatting is also an option. This comes with a host of
advantages, including type coercion when necessary. In this simple
case it looks like this:

    >>> "%s%s%s" % (str1, str2, str3)
    'abcdefghi'
    
Finally, there's the join method available on every string. This
method takes a list of strings and joins them together with the
calling string in between each element. If this method is called from
the empty string, the elements of the list are joined with nothing
between them. For example:

    >>> ''.join([str1, str2, str3])
    'abcdefghi'
    >>> ', '.join([str1, str2, str3])
    'abc, def, ghi'

If we want to write idiomatic python, we're
[advised against](http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html#building-strings-from-substrings)
using the addition method in favor of using join. String formatting is
not mentioned. Presumably, the flexibility of the formatting system is
overkill for such a simple application. This is easy enough to test
though, so let's see how the performance compares on a common
application, say building a url with a username and some kind of id
number.

    def join_test(s, i):
        return ''.join(['/user/', s, '/', str(i), '/'])
    
    def format_test(s, i):
        return "/user/%s/%i/" % (s, i)
    
    def plus_test(s, i):
        return '/user/' + s + '/' + str(i) + '/'
	
Now we just need to use Python's timeit module to build some
timers. When the timer's timeit method is called, it will run
its function 1,000,000 times and report how long it took.

    import timeit

    jointimer = timeit.Timer("string_test.join_test('test', 5)", "import string_test")
    print "Join method took %f seconds" % jointimer.timeit()

    formattimer = timeit.Timer("string_test.format_test('test', 5)", "import string_test")
    print "Format method took %f seconds" % formattimer.timeit()

    plustimer = timeit.Timer("string_test.plus_test('test', 5)", "import string_test")
    print "Plus method took %f seconds" % plustimer.timeit()
    
Simple enough, right? Let's look at the results.

    Join method took 1.115780 seconds
    Format method took 1.275534 seconds
    Plus method took 0.756690 seconds    
    
Whoa! Now here's where I got confused. It turns out the much-maligned
"plus" method of string concatenation is actually the fastest by a
pretty wide margin. Has it been improved considerably since the Python
idioms were determined or am I just doing something wrong? Occam's
razor would suggest that I'm doing something wrong. Let's look more
closely at the idiom and figure out what's different.

>Start with a list of strings:
colors = ['red', 'blue', 'green', 'yellow']
We want to join all the strings together into one large string. Especially when the number of substrings is large...
Don't do this:

    result = ''
    for s in colors:
        result += s
>This is very inefficient.
It has terrible memory usage and performance patterns. The "summation" will compute, store, and then throw away each intermediate step.
Instead, do this:

    result = ''.join(colors)
>The join() string method does all the copying in one pass.
    
Well, for one thing, the usage we're being warned about here is a list
of strings being summed by a loop. Let's add another test that matches
that scenario exactly and see how it performs.

    def loop_test(s, i):
        l = ['/user/', s, '/', str(i), '/']
        result = ''
        for s in l:
            result += s
        return result
	
    looptimer = timeit.Timer("string_test.loop_test('test', 5)", "import string_test")
    print "Loop method took %f seconds" % looptimer.timeit()
    
And the result:

    Loop method took 1.427076 seconds    
    
Now, that makes more sense. The overhead of the loop adds to the time
considerably. In fact, if we modify the plus_test function to add the
overhead of making a list, this alone accounts for a large portion of
the difference in performance.

    def plus_test(s, i):
        l = ['/user/', s, '/', str(i), '/']
        return '/user/' + s + '/' + str(i) + '/'    
	
    Plus method took 1.259691 seconds
    
So, if you can avoid building a list and just sum the strings together
directly, this is the fastest way to concatenate them. However,
if they're already in a list, using join is your best bet. The format
method is pretty slow even without the overhead of making a list, but
it's probably going to be a bit more readable when there's multiple
substitutions with different types involved.

Of course, you should always profile your code to see where the
bottlenecks are before making any changes. If you're starting from
scratch though, it doesn't hurt to use the fastest method available.


*Originally published 2010-03-01 10:42:41*