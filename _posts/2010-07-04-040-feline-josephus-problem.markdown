---
layout: post
title: The Feline Josephus Problem
joomla_id: 40
joomla_url: feline-josephus-problem
date: 2010-07-04 14:46:46.000000000 +01:00
comments: true
---

<object width="100%" height="500px" data="{{ site.baseurl }}/images/images/swf/felinejosephus.swf"></object>

This is a flash app that I made for my advisor, Frank Ruskey and his former
student, [Aaron Williams](http://webhome.csc.uvic.ca/~haron/ "Aaron Williams"),
for their presentation of The Feline Josephus Problem at the
[FUN With Algorithms Conference 2010, Ischia Island, Italy.](http://fun2010.dia.unisa.it/
"FUN 2010")

From Wikipedia, the history of the original Josephus Problem is the following:

The problem is named after
[Flavius Josephus](http://en.wikipedia.org/wiki/Flavius_Josephus "Flavius
Josephus"), a Jewish historian living in the 1st century. According to Josephus'
account of the [siege of Yodfat](http://en.wikipedia.org/wiki/Siege_of_Yodfat
"Siege of Yodfat"), he and his 40 comrade soldiers were trapped in a cave, the
exit of which is blocked by Romans. They chose suicide over capture and decided
that they would form a circle and start killing themselves using a step of
three. Josephus states that by luck or maybe by the hand of God (modern scholars
point out that Josephus was a well educated scholar and predicted the outcome), he
and another man remained the last and gave up to the Romans.

The two parameters in the above problem are the number of soldiers and the "step"
size.  That is, instead of killing every third person left in the circle, every
kth one is killed.  In the Ruskey-Williams variation the soldiers have the super
powers of cats and may have more than one life.  The parameters of the problem are
(n,k,l).  These are for the number of soldiers, the skip count and the number of
lives.  The original problem is (40,3,1).

Ruskey and Williams published a paper on this.  Among their findings was that,
rather curiously, the surviving soldier is always the same if the soldiers have a
number of lives greater than the nth fibonacci number.  Even more interestingly,
if you fix the number of soldiers n and you declare the survivor before beginning,
you can find a skip count k that allows this to happen for any number of lives l. 
What's more, is that the same skip count k works for all values of l!  How cool is
that! :D.

Much of the paper is very accessible and would be a great read for undergraduate
computer science or math students and fun for the rest of us too :).  It can be
found on [Frank Ruskey's webpage](http://webhome.cs.uvic.ca/~ruskey/ "Frank
Ruskey") at
[this link](http://webhome.cs.uvic.ca/~ruskey/Publications/Josephus/FelineJosephus.html
"Feline Josephus").


