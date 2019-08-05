---
path: "/gdarchive/4"
title: "So you want to autolink urls..."
oldId: 4
date: 2010-02-08
section: "gdarchive"
---
Finding a url inside a chunk of text is no easy task.
[Coding Horror](http://www.codinghorror.com/blog/archives/001181.html)
and [Daring Fireball](http://daringfireball.net/2009/11/liberal_regex_for_matching_urls)
have covered regular expressions for matching urls in a variety of
circumstances. I went with the Coding Horror regular expression, mainly because the Daring Fireball version
wasn't around when I was working on this. Using Python's regular expression library, the code to get all the urls in a block of text looks like this:

    urlre = re.compile("(\(?https?://[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])(\">|</a>)?")
    urls = urlre.findall(html)

That pulls out all of the urls in a text and puts them in a list. From
there you can iterate through the list and replace the url in the
source text with the appropriate html.

But that only works if you're only allowing plain text as
input. What if you're using markdown for formatting? In this case
there might be urls in the text that are already a part of a link. You don't want to add additional html around these or you'll break the user's formatting. There's two ways you could go, I suppose. You could either process the text before you send it to the markdown processor and add markdown formatting around the urls, or you could look at the html output you get and find the bare urls in that. I went with the latter option. This way the function isn't tied to markdown specifically, and it's useful in more applications.

The obvious case you want to avoid is where the user has entered a
normal link as markdown. In that case, the markdown formatting will take care of adding the appropriate html.

    <a href="http://example.com">link</a>

But maybe some helpful user has used markdown to link a url for us.
That will output some html like this:

    <a href="http://example.com">http://example.com</a>
    
In this case we want to ignore both instances of the url.   

Finally, you have to account for the sadistic case. This is the
possibility that someone will make a regular markdown link with a
given url, then paste in that *same* url elsewhere in the text. You
have to ignore the instance where it's linked legitimately, but catch
the instance where it's a bare url and turn it into a link. The
resulting html will look like this:

    <a href="http://example.com">http://example.com</a>
    ...
    ...
    http://example.com
    
There are two steps to solve this. The first part is the regular expression
shown above. This actually has two groups. The first group

    (\(?https?://[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])
    
matches the url while the second group

    (\">|</a>)?
    
matches either "> or &lt;/a&gt; after the url, if they're
present. When your regular expression has multiple groups urlre.findall returns a list of tuples. The first element of the tuple contains the matched url. There will be an entry in the list for every occurrence of a url in the text, with duplicates included. The second element in the tuple will be either "> or &lt;/a&gt; if they are present immediately after the url. If the second element is not an empty string, we know the url is already part of a link, so we
can ignore it.

Then there's the sadistic case to contend with. You want to replace a url with a link *only* when it's not preceded by =" or ">. Instead of using the simple string replace function, the substitute function from the regular expressions library will allow us to only replace certain instances of the url. A negative lookbehind will ensure that the url is replaced only when it's not already part of a link.

The complete autolink function is shown below.

    def autolink(html):
        # match all the urls
        # this returns a tuple with two groups
        # if the url is part of an existing link, the second element
        # in the tuple will be "> or </a>
        # if not, the second element will be an empty string
        urlre = re.compile("(\(?https?://[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|])(\">|</a>)?")
        urls = urlre.findall(html)
        clean_urls = []
    
        # remove the duplicate matches
        # and replace urls with a link
        for url in urls:
            # ignore urls that are part of a link already
            if url[1]: continue
            c_url = url[0]
            # ignore parens if they enclose the entire url
            if c_url[0] == '(' and c_url[-1] == ')':
                c_url = c_url[1:-1]
        
            if c_url in clean_urls: continue # We've already linked this url
    
            clean_urls.append(c_url)
            # substitute only where the url is not already part of a
            # link element.
            html = re.sub("(?<!(=\"|\">))" + re.escape(c_url), 
                          "<a rel=\"nofollow\" href=\"" + c_url + "\">" + c_url + "</a>",
                          html)
        return html

Hopefully, a later version of markdown will have autolinking baked right in. If you're using [GitHub Flavored Markdown](http://github.github.com/github-flavored-markdown/), you've already got it. I haven't seen a Python implementation for that yet, though.


*Originally published 2010-02-08 08:07:17*