---
layout: post
title: Connecting tatami tilings with other areas of math
date: 2012-07-31 18:13:52.000000000 +01:00
comments: true
---
I recently asked a question on <a href="http://mathoverflow.net/questions/103165/monomer-dimer-tatami-tilings-need-better-relationships-with-other-math-summary">Math Overflow</a>, to see if other mathematicians and students could think of possible connections to tatami tilings.  I have reposted the text of it here, but if you like the question, please go and see it <a href="http://mathoverflow.net/questions/103165/monomer-dimer-tatami-tilings-need-better-relationships-with-other-math-summary">here</a>.


                <p>A monomer-dimer tiling of a rectangular grid with $r$ rows and $c$ columns satisfies the $tatami$ condition if no four tiles meet at any point.  (or you can think of it as the removal of a matching from a grid graph that breaks all $4$-cycles).</p>

<p>This simple restriction, brought to my attention by Don Knuth in Vol 4 of TAOCP, became my PhD thesis topic, when my research group and I discovered that it imposes a aesthetically pleasing structure with a nice description, and opened up lots of fun questions.  </p>

<p>Here is my favourite example, which has all of the possible "features".  First it is shown uncoloured</p>

<p><img src="http://geoburst.ca/eggs/tatami/bare_tatami_example.png" alt="A tatami tiling showing all possible features, up to rotation"></p>

<p>And here it is coloured</p>

<p><img src="http://geoburst.ca/eggs/tatami/coloured_tatami_example.png" alt="A tatami tiling showing all possible features, up to rotation"></p>

<p>The magenta tiles show the types of features it can have, and here they are on their own:</p>

<p><img src="http://geoburst.ca/eggs/tatami/loner_vee.png" alt="Loner and Vee features"></p>

<p><img src="http://geoburst.ca/eggs/tatami/bidimer_vortex.png" alt="Bidimer and vortex features"></p>

<p>I'll introduce my question here, and then summarize some more results later.  <strong>I want to find more and better ties between tatami tilings and other less esoteric math problems.</strong>  If you think of a paper or subject I might want to look into, don't hesitate to answer.</p>

<p>In our <a href="http://www.combinatorics.org/Volume_18/PDF/v18i1p109.pdf" rel="nofollow">first paper</a>, we proved the above structure and showed that:</p>

<ol>
<li>A tiling is described by the tiles on its boundary, and hence has a description that is linear in the dimensions of the grid.</li>
<li>The maximum number of monomers is at most $\max(r+1,c+1)$, and this is achievable.</li>
<li>We found an algorithm for finding the rational generating polynomial of the numbers of tilings of height r (which I think can also be calculated with the transfer matrix method).</li>
</ol>

<p>We posed a couple of complexity questions (which I am working on), for example, is it NP-hard to reconstruct a tatami tiling given its row and column projections?</p>

<p><img src="http://geoburst.ca/eggs/tatami/tomoku.png" alt="Tomoku game.  Is it NP-hard?"></p>

<p>Or tile a given orthogonal region with no monomers?</p>

<p><img src="http://geoburst.ca/eggs/tatami/strider.png" alt="Water striders.  Is it NP-hard?"></p>

<p>Next we focused on <a href="http://www.sciencedirect.com/science/article/pii/S1570866712000561" rel="nofollow">enumerating tilings of the $n\times n$ grid</a>, and found a partition of $n\times n$ tiles with the maximum number of monomers into $n$ parts of size $2^{n-1}$.  We also counted the number tilings with $k$ monomers, and this curious consequence:</p>

<blockquote>
  <p>The number of $n \times n$ tatami tilings is equal to the sum of the squares of all parts in all compositions of $n$.  That is, $2^{n-1}(3n-4)+2$.</p>
</blockquote>

<p>We also found an algorithm to generate the ones with $n$ monomers, and a Gray code of sorts.</p>

<p>Nice numbers, and a cute problem, but another paper that is self contained with elementary (albeit, somewhat complicated) reasoning.</p>

<p>Our third paper in this story (in preparation), looks at the generating polynomial for $n\times n$ tilings with $n$ monomers whose coefficients are the number of tilings with exactly $v$ vertical dimers (or $h$ horizontal dimers).  It turns out this generating polynomials is a product of cyclotomic polynomials, and a somewhat mysterious and seemingly irreducible polynomial, who's complex roots look like this:
<img src="http://geoburst.ca/eggs/tatami/pn_roots.png" alt="Complex roots of mysterious polynomial"></p>

<p>We've found a bunch of neat stuff about it, for example the evaluation of this polynomial at $-1$ is $\binom{2n}{n}$, for $2(n+1)\times 2(n+1)$ tilings, and we found our generating polynomial gives an algorithm to generate the tilings in constant amortized time.  Here is some output of the implementation:</p>

<p><img src="http://geoburst.ca/eggs/tatami/genvh8_7.png" alt="Output of cat algorithm generating tilings.  This is genVH(8,7), for $8\times 8$ tilings with $8$ monomers and $7$ vertical dimers."></p>

<p>That's the most of the published (and almost published) story.  There is a loose connection with other monomer-dimer problems, and things I can look into, like Aztec tatami tilings, but <strong>I'm looking for direct applications of other results to these, or vice versa, especially with this last paper in preparation.  I'm not asking you to do research for me, but just your thoughts as they are now, so I can go learn new stuff.</strong>  </p>

<p>Feel free to comment about what you think is interesting, or not, about tatami tilings too!</p>, , , 
