---
path: "/gdarchive/12"
title: "A Django Unit Testing Primer"
oldId: 12
date: 2010-04-05
section: "gdarchive"
---
One thing I really slacked on while developing GreaterDebater was
testing. Maybe that's not the right way to put it. It's not like I
*didn't* test. In fact, I did a lot of testing. A lot of painstaking
manual testing. For every change. So, in a way it was really the
opposite of slacking. It was working a whole lot harder than I really
needed to. It was also dumb. What I did slack on, was figuring out how
Django's unit testing framework worked. Well, no more! In fact, it's
really easy to set up. Writing tests can also be somewhat painstaking
when it comes to ensuring you've covered every possible input, but at
least that pain is an investment that repays itself every time you make
a change to the program and you can know right away if you've broken
something that used to work.  

As usual the
[Django documentation](http://docs.djangoproject.com/en/dev/topics/testing/#topics-testing)
is excellent. I highly recommend it for learning everything there is
to know about testing with Django. What I hope to do here is give a
brief overview of what you need to do some basic testing. Partly as a
reminder for myself on future projects, and hopefully to help out
anyone in the same position I was before I started.

## Getting Started 

If your Django app is relatively new, the startapp command already
created a tests.py file when you ran it to set up your app. This file includes some
helpful examples, like so:

    """
    This file demonstrates two different styles of tests (one doctest and one
    unittest). These will both pass when you run "manage.py test".
    
    Replace these with more appropriate tests for your application.
    """
    
    from django.test import TestCase
    
    class SimpleTest(TestCase):
        def test_basic_addition(self):
            """
            Tests that 1 + 1 always equals 2.
            """
            self.failUnlessEqual(1 + 1, 2)
    
    __test__ = {"doctest": """
    Another way to test that 1 + 1 is equal to 2.
    
    >>> 1 + 1 == 2
    True
    """}    
    
If you don't already have a tests.py file, the important things to
note are that you have to import the **TestCase** class from
django.test and create a new class which subclasses it. Each method
defined in this class will correspond to one test, usually the test of
a corresponding function in your **views.py** file. To test a
particular function from **views.py**, define a method with the name
**test_functionname**.

## Test data 

Now, I'm guessing your application probably manipulates some sort of
data. The Django test runner is kind enough to setup and destroy a
complete test database for the purposes of running your tests. There's
two important consequences to this. First, the database user specified
in your settings.py file has to have the necessary permissions to
create and destroy databases. So, make sure that's the case.  Second,
if you already have a test database set up on your development machine
(or wherever), with data you've inserted during your manual tests, the
test runner won't have access to any of it.

To get some data for your tests, you can try exporting the data
already in your test database with Django's dumpdata command. The test
runner can then load it as a
[fixture](http://docs.djangoproject.com/en/dev/topics/testing/#fixture-loading).
Honestly, I just couldn't get this to work. Some googling about the
errors I was getting seemed to indicate that I wasn't the only one
having problems with it. The update to
[natural keys](http://djangoadvent.com/1.2/natural-keys/) announced
for Django 1.2 seemed like it would help, but I've still been
unsuccessful, so far. In any event, I plan on keeping an eye on future
developments to see if there's any improvements in this area.

In the meantime, I went ahead and did it the hard way. I created a
separate file called **testsetup.py**. I imported all the models for
my project and defined a function also called **testsetup**. All this
function does is create a few instances for each model with all their
various possible configurations. By defining a method called **setUp**
in the new class I created in **tests.py** and calling this function
there, all of the necessary data will be added to the test database
before the tests are run.

    class ViewTest(TestCase):
    
        def setUp(self):
            testsetup()


## GET Requests

The easiest of your views to test are the ones that only handle GET
requests. All you have to do is retrieve the correct item from the
database and display the information. Let's use the canonical
book/author/publisher example. Suppose we're testing a view that
displays the details for a particular book.

    def test_book_detail(self):
        testbook = Book.objects.all()[0]
        url = '/books/id/' + str(testbook.id)
        response = self.client.get(url)
        self.assertContains(response, testbook.title)

The first thing I want to stress, is that I think it's important that
no specific test data is used in the tests. Always try to select
objects you're going to use for your tests in a generic way. This way
it won't matter how your test data gets moved around or changed over
time. In this example I just picked the first book returned in the
queryset for all books. What you *don't* want to do is something like this:

    testbook = Book.objects.get(title="The Test Book")

That assumes your test database has a book with that title in it,
which it may or may not. Over time it's bound to get mighty confusing
trying to keep the data in your test database synchronized with the
data in your tests, so it's best to save yourself the headache.

The Django **TestCase** class comes with a built in client to make all
your requests. For a GET request all you have to do is pass it a URL
and it will return the response generated by that request. The
**TestCase** class also defines some new
[assertions](http://docs.djangoproject.com/en/1.1/topics/testing/#assertions)
in addition to the standard ones Python provides. **assertContains**,
used in this example, takes a response object and verifies that it has
a particular piece of text in it; in this case, the book's
title. Optionally, you can specify a particular response code, and
number of repititions for the piece of text. If you're expecting a
particular url to not be found you might test:

    badurl = '/books/id/notabookid'
    response = self.client.get(badurl)
    self.assertContains(response, "Book not found", status_code=404)

## POST requests

Of course all of this data has to get into your database somehow. You
know you don't want to put it all there yourself, so you're probably
going to have your users do it. This likely means you'll have some
forms on your site that you want them to submit. For our example,
let's pretend authors are submitting their own books to the
site. Let's assume a few things about how this function works, so we
know what we're testing.

* The user must be logged in to submit a book
* A book requires a title, an author, and an ISBN field
* Upon successfully submitting a book, we want to redirect the user to
  the detail page for that book.
* The ID field for the **Book** model is auto-incremented (Django's default)
  
Simple enough, right? Django provides all the tools you need to test
every aspect of this function.

    def test_addbook(self):
        url = '/books/add/'

        author = Author.objects.all()[0]    
        user = author.user

        # User not logged in
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

        self.client.login(username=user.username, password='password')

        # Valid user
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


        # Invalid Form
        response = self.client.post(url, {'title': "Book Title",
                                          'author_id': author.id,
                                          'ISBN': "invalid ISBN"})
        self.assertFormError(response, 
                             "BookSubmitForm", 
                             'ISBN',
                             "ISBN field must contain a number")

        # Valid submission
        newid = Book.objects.aggregate(Max('id'))['id__max'] + 1
        redirect = '/books/id/%d' % newid
        response = self.client.post(url, {'title': "Test book",
                                          'author_id': author.id,
                                          'ISBN': 123456},
                                          follow=True)

        self.assertRedirects(response, redirect)
        self.assertContains(response, "Test book")

First you'll want to test a GET request for the url, to make sure the
user can see the form properly to fill it in. Also check that the form
is not visible to users who aren't logged in. In this case, that means
simply making sure the response returns a 403 Forbidden status
code. To log in as a user, simply use the **self.client.login**
function with the appropriate name and password. It's easy enough to
pull a random user from the ones you set up in the **testsetup**
function, but I've violated my own rule a little by specifying a value
for the user's password. In fact, I'm not sure there's any other way
to do this. For the sake of simplicity, I'm just giving all of the
users created in **testsetup** the same password.  For POST requests,
simply add a dictionary with all the required form fields and
values. You can make sure the form validation is catching errors
properly by submitting an invalid form and using the
**assertFormError** assertion to verify that the appropriate form
validation error occurs. This assertion takes 4 arguments: the
response, the name the template uses for the form, the form field in
question, and the error text (or a list of strings for multiple
errors) that is expected. Finally, since the id for new books is just
autoincremented, we can assume the id for the book we create will be
one more than highest one in the database yet. By plugging this into
the book detail url, we have the address of the page we'll be
redirected to when the book is successfully submitted. If you want to
use **assertContains** or anything else to check the contents of the
final page you get redirected to, be sure to add **follow=True** in
the post function. This way it will return the final response, not the
intermediate redirect response.

I suppose now is a good time to mention that the Django test runner
will return the database to its original state (after populated by the
**setUp** method) after each test. That means that any
books you add during the **test__addbook** method will be deleted when
that test is over. You won't have access to them in, for example,
**test_deletebook** that you might write afterwards, so keep that in mind.

I hope this has been a helpful introduction to Django's testing
facilities. I've only scratched the surface of what it can do, but I
think it's a good place to start. Like I said, the
[documentation](http://docs.djangoproject.com/en/dev/topics/testing/#topics-testing)
is up to Django's usual high standards, so definitely make the most of
it.

Happy Testing!


*Originally published 2010-04-05 06:50:17*