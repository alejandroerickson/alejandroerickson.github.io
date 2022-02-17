---
layout: post
title: A tatamibari solvability question
joomla_id: 50
joomla_url: a-tatamibari-solvability-question
date: 2010-09-16 16:33:42.000000000 +01:00
comments: true
---

Tatamibari is a game published by Japanese game company, Nikoli.  We are given a
grid and some of the squares contain a symbol; either + or - or |.  The player
must partition the grid with line segments drawn on grid lines so that

*   Each partition contains exactly one symbol.
*   Every partition is rectangular.
*   ## update: I left this condition out.  No four rectangular regions may meet
    (this is the tatami condition!)

*   Partitions with a + are square shaped.
*   Partitions with a - are wider than they are tall.
*   Partitions with a | are taller than they are wide.

Here is an example puzzle and solution:

![]({{ site.baseurl }}/images/images/stories/tatamibaripuzzle1.png)![]({{ site.baseurl }}/images/images/stories/tatamibarisolution1.png)

Fun puzzle, right?

## Here is the real question: How do you generate puzzles with solutions?

Take this one, for example, which obviously has no solution.

![]({{ site.baseurl }}/images/images/stories/tatamibarinosolution.png)

So we can't just scatter the symbols onto the grid randomly.  As far as I know
this problem is open:

## What are the necessary and sufficient conditions for solvability of one of these puzzles?

And this one might be open too:

## What is the hardness of finding a solution?

update:  I should point out that one can always construct a puzzle by partitioning
into rectangles and inserting the appropriate symbols.
