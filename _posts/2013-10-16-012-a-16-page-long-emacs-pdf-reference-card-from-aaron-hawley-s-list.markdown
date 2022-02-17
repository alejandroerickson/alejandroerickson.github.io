---
layout: post
title: A 16-page long emacs pdf reference card from Aaron Hawley's list
date: 2013-10-16 05:07:54.000000000 +01:00
comments: true
---
Here is a 16-page long emacs pdf reference card from Aaron Hawley's list.  It is my first elisp program and undoubtedly full of hacks and such, but the result is useful to me.

I have converted the source of Aaron Hawley's reference sheet from http://www.emacswiki.org/emacs/Reference_Sheet_by_Aaron_Hawley_source and used it in the reference card that ships with emacs, by Stephen Gildea.

It is possible that the elisp I wrote will help someone expand this card, so I have included it here.  It is my first elisp script ever, and clearly shows the limits of my abilities in elisp and is probably full of ugly hacks.  Nonetheless, it can be modified and run again to create new versions of the Long Reference Card.  To use it, copy and paste Aaron Hawley's source from the above link into a buffer called aaronref.tex.  Copy the elisp code below (after removing the TeX comment % symbols) into an interactive lisp buffer and execute it (C-x C-e).

The TeX document compiled on my mac with 
   tex longrefcard
   dvips -t landscape longrefcard
   ps2pdf longrefcard.ps

Here are the downloads
<a href="{{ site.baseurl }}/images/im/longrefcard.pdf">Long Reference Card pdf</a>
<a href="{{ site.baseurl }}/images/im/longrefcard.tex">Long Reference Card Plain TeX source</a>
<a href="{{ site.baseurl }}/images/im/regexps_to_make_refcard.el">Elisp to convert Aaron Hawley's source into the TeX source</a>1013longrefcard.pdf, 1013longrefcard.tex, , 
