---
layout: post
comments: true
thumbnail: '/images/algorithmbigrect.png'
title: 'Determine if N given rectangles are an exact cover of a rectangle'
date: 2016-08-14T17:24:56+01:00
---

I saw a nice question on [leetcode](https://discuss.leetcode.com/topic/53781/plane-sweep-to-solve-a-hard-google-onsite-problem-08-10) today, apparently asked recently at a Google on-site interview.

**Given N rectangles with integer coordinates, check whether they are an exact
cover of a rectangular region**

If you don't know already, Google's on-site interview process involves 5
independent interviews in one day. In each one a Google Software Engineer poses
a problem that should be solved in 45 min to 1 hr. The interviewee can code on a
white board or in Google Docs (check with your recruiter for details) in a
language of their choice, but not pseudo-code.

By itself, the question is not all that intimidating, but the time-limit can
make it quite challenging. That's why I'm practising!

As usual, there is a fairly straightforward "brute force" solution, and some
better solutions. I'll give hints and solutions immediately after the jump so
avoid spoilers by not looking past the example inputs yet.

{% include image.html
img="images/isbigrect.png"
title="Sample N rectangle inputs"
caption="Example inputs"
width="600px"
%}

### Hint 1 ###

Try to find a brute-force solution by looking at the total area of the rectangles.

### Hint 2 ###

After computing the area, can you avoid comparing every pair of rectangles?

### Hint 3 ###

The problem can be solved in O(N log N), both with and without computing areas.

### Hint 4 ###

What needs to occur at every left-hand segment of an input rectangle that is
interior to the smallest rectangle that bounds the input rectangles? At every
right-hand segment? At the vertical segments not interior?

### Solutions from area ###

One solution is to compute the area of the smallest bounding rectangle, and the
combined areas of the N input rectangles. The input data is unsorted, so you
need to do an O(N) scan of the input to find the minimum and maximum points,
both vertically and horizontally (up to 4 points). If the areas differ, output
False, and if they are the same, you need to check that no pair of input
rectangles intersect. To see why, look at the input below.


{% include image.html
img="/images/areaprobleminput.png"
title="Area problem input"
caption="Area problem input"
width="428px"
%}

Testing whether a pair of rectangles intersect is
[a simple, O(1) calculation](http://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
(though I would understand if you failed to get it onto the whiteboard in 5
minutes under pressure), so we know we can finish in O(N^2) time by comparing (N
choose 2) pairs of input rectangles.

Some light reading suggests that the intersections can be tested in O(N log N)
time in some cases, but the solutions seem far from simple. I didn't look at
this very deeply, but for further reading:

[R-trees on StackOverflow](http://stackoverflow.com/questions/5880558/intersection-of-n-rectangles)  
[R-trees on Wikipedia](https://en.wikipedia.org/wiki/R-tree)  
[Another answer on StackOverflow](http://stackoverflow.com/questions/3324880/axis-aligned-rectangles-intersection)  
[The Princeton lecture cited in the above StackOverflow answer](http://www.cs.princeton.edu/~rs/AlgsDS07/17GeometricSearch.pdf)

I'll now present a solution that does not require any 2D geometric tests.

### My Solution ###

Imagine, first, that the (smallest) rectangle bounding the inputs is a cylinder,
so that its leftmost edge coincides with its rightmost edge. Now we can state
the 'algorithm' in one sentence:

If **(P) every point interior to a right-hand edge of an input rectangle is unique,
and it coincides with a point of a left-hand edge of an input rectangle, and
*vise versa***, then we **(Q) output True**, and otherwise we output False.

Take a moment to let that sink in. We are claiming that P if and only if Q. Let
us make clear here that when we say rectangles intersect, we mean that their
interiors intersect. The explanation is a bit dense, but hopefully you'll come
to the same conclusions by making some drawings.

{% include image.html
img="/images/algorithmbigrect.png"
title="isBigRect uses the interfaces of vertical segments"
caption="isBigRect uses the interfaces of vertical segments"
width="600px"
%}

If P is false, then one of two things can happen. If points interior to the
right-hand edges of two distinct rectangles coincide, then the rectangles
intersect. Otherwise, without loss of generality, we may assume there is there
is some point `p` on a left-hand edge of an input rectangle, call it `A`, that
does not coincide with a point on a right-hand edge of an input rectangle. Thus,
`p` is interior to a small open disc that both contains points interior to `A`
and points exterior to `A`. The same disc is either entirely inside a rectangle
distinct from `A`, which will necessarily intersect with `A`, or it contains
points exterior to all rectangles distinct from `A`, and thus contains a hole in
the bounding cylinder. Thus we output False, so Q is false.

If Q is false, on the other hand, then either two distinct rectangles intersect,
or a point in the bounding cylinder falls outside of all input rectangles. If
rectangles intersect and they have intersecting vertical segments, then P is
false, so we may assume that is not the case. But then, the vertical segment of
one rectangle must be interior to another rectangle, which again falsifies P.
Finally, if a point falls outside of all rectangles, then there are vertical
segments to its left and right that falsify P.

Thus, we have shown that P is a necessary and sufficient condition for the N
rectangles to be an exact cover of a rectangle, *q.e.d*.

Now we need to code the solution. The short of it is, we sort a copy of the
input rectangles by left-edge x-coordinates, and we sort another copy by
right-edge x-coordinates. The first left edge and last right edge are special
cases, but are easily dealt with. We then process the vertical segments in the
sorted lists, at each x-coordinate, and simply compare the lists.

The bottleneck in time-complexity is in sorting the inputs, plus we need O(N)
space to make left-edge-sorted and right-edge-sorted copies of the inputs.

I am assuming that an input rectangle is given as a bottom-left point and a
top-right point; for example, a unit square is `[[1,1],[2,2]]`.

A final word of warning before you delve into my Python code. I am primarily a
C-programmer leveraging some features of Python, so my code is not very
"Pythonic". Suggestions, improvements, and more test cases welcome.


``` python
def isBigRect(rectangles):
    if rectangles==[]:
        return True
    L=processBoundaries(rectangles,leftOrRight='left')
    R=processBoundaries(rectangles,leftOrRight='right')
    if L==False or R==False or not len(L)==len(R):
        return False
    L[-1][0]=R[-1][0]
    R[0][0]=L[0][0]
    if not L==R:
        return False
    else:
        return True

def processBoundaries(B,leftOrRight='left'):
    x0orx1=0
    if leftOrRight=='right':
        x0orx1=1
        res=[[]]
    elif leftOrRight=='left':
        x0orx1=0
        res=[]
    else:
        print 'process boundaries input error'
        return False
    B=[ [x[x0orx1][0],[x[0][1],x[1][1]]] for x in B]
    B.sort(cmp=lambda x,y: x[0]-y[0])
    i=0
    while i<len(B):
        x=B[i][0]
        res.append( [x,[]] )
        while i<len(B) and B[i][0]==x:
            res[-1][1].append(B[i][1])
            i=i+1
        res[-1][1]=mergeSpecialIntervals(res[-1][1])
        if res[-1][1]==False:
            return False
    if leftOrRight=='right':
        res[0]=['first',res[-1][1]]
    else:
        res.append(['last',res[0][1]])
    return res

def mergeSpecialIntervals(L):
    if L==[]:
        return False
    if len(L)==1:
        return L
    L.sort(cmp=lambda x,y: x[0]-y[0])
    res=[L[0]]
    for i in range(len(L)-1):
        if L[i][1]>L[i+1][0]:
            return False
        elif L[i][1]==L[i+1][0]:
            res[-1][1]=L[i+1][1]
            i=i+2
        else:
            res.append(L[i])
            i=i+1
    if i == len(L)-1:
        res.append(L[i])
    return res


A=[[[[0,0],[4,1]],
    [[7,0],[8,2]],
    [[6,2],[8,3]],
    [[5,1],[6,3]],
    [[4,0],[5,1]],
    [[6,0],[7,2]],
    [[4,2],[5,3]],
    [[2,1],[4,3]],
    [[0,1],[2,2]],
    [[0,2],[2,3]],
    [[4,1],[5,2]],
    [[5,0],[6,1]]],

   #shuffled the above a little
   [[[0,0],[4,1]],
    [[7,0],[8,2]],
    [[5,1],[6,3]],
    [[6,0],[7,2]],
    [[4,0],[5,1]],
    [[4,2],[5,3]],
    [[2,1],[4,3]],
    [[0,2],[2,3]],
    [[0,1],[2,2]],
    [[6,2],[8,3]],
    [[5,0],[6,1]],
    [[4,1],[5,2]]],

   [[[0,0],[4,1]]],

   [],

   #vertical stack
   [[[0,0],[1,1]],
	[[0,1],[1,2]],
	[[0,2],[1,3]],
	[[0,3],[1,4]],],
   
   #horizontal stack
   [[[0,0],[1,1]],
	[[1,0],[2,1]],
    [[2,0],[3,1]],
    [[3,0],[4,1]],],

   ]

print 'should be True'
for a in A:
    print isBigRect(a)


B=[
    #missing a square
    [[[0,0],[4,1]],
     [[7,0],[8,2]],
     [[6,2],[8,3]],
     [[5,1],[6,3]],
     [[6,0],[7,2]],
     [[4,2],[5,3]],
     [[2,1],[4,3]],
     [[0,1],[2,2]],
     [[0,2],[2,3]],
     [[4,1],[5,2]],
     [[5,0],[6,1]]],
    
    #exceeds top boundary
    [[[0,0],[4,1]],
     [[7,0],[8,2]],
     [[5,1],[6,4]],
     [[6,0],[7,2]],
     [[4,0],[5,1]],
     [[4,2],[5,3]],
     [[2,1],[4,3]],
     [[0,2],[2,3]],
     [[0,1],[2,2]],
     [[6,2],[8,3]],
     [[5,0],[6,1]],
     [[4,1],[5,2]]],
    
    #two overlapping rectangles
    [[[0,0],[4,1]],
     [[0,0],[4,1]]],
    
    #exceeds right boundary
    [[[0,0],[4,1]],
     [[7,0],[8,3]],
     [[5,1],[6,3]],
     [[6,0],[7,2]],
     [[4,0],[5,1]],
     [[4,2],[5,3]],
     [[2,1],[4,3]],
     [[0,2],[2,3]],
     [[0,1],[2,2]],
     [[6,2],[8,3]],
     [[5,0],[6,1]],
     [[4,1],[5,2]]],

    # has an intersecting pair
    [[[0,0],[5,1]],
     [[7,0],[8,2]],
     [[5,1],[6,3]],
     [[6,0],[7,2]],
     [[4,0],[5,1]],
     [[4,2],[5,3]],
     [[2,1],[4,3]],
     [[0,2],[2,3]],
     [[0,1],[2,2]],
     [[6,2],[8,3]],
     [[5,0],[6,1]],
     [[4,1],[5,2]]],
    
    #skips column 4
    [[[0,0],[4,1]],
     [[7,0],[8,2]],
     [[5,1],[6,3]],
     [[6,0],[7,2]],
     [[2,1],[4,3]],
     [[0,2],[2,3]],
     [[0,1],[2,2]],
     [[6,2],[8,3]],
     [[5,0],[6,1]],],


    #exceed left boundary
    [[[0,0],[4,1]],
     [[7,0],[8,2]],
     [[5,1],[6,3]],
     [[6,0],[7,2]],
     [[4,0],[5,1]],
     [[4,2],[5,3]],
     [[2,1],[4,3]],
     [[-1,2],[2,3]],
     [[0,1],[2,2]],
     [[6,2],[8,3]],
     [[5,0],[6,1]],
     [[4,1],[5,2]]],


   #horizontal stack with overlapping left boundaries at x=1
    [[[0,0],[1,1]],
     [[1,0],[2,1]],
     [[1,0],[3,1]],
     [[3,0],[4,1]],],
]

print 'should be False'
for b in B:
    print isBigRect(b)
```

### Bonus: what if the input rectangles can be moved? ###

If you are a mathematician you might be inclined to view a rectangle as simply a
width and height, with no fixed location in the plane. This is exactly what
[Tony Huynh](https://twitter.com/TonyBourbaki), self-described Mathematical
Vagabond (and matroid theorist by trade), pointed out to me, so I asked him if
the alternate interpretation of the problem is NP-hard?

The new problem:

**Given N rectangles with integer dimensions, check whether they can be
translated and rotated to exactly cover a rectangular region.**

Indeed the answer is yes, and Tony came back to me a few minutes later with this
very nice reduction:

> Consider the following input of rectangles, where a rectangle is given by a pair
> (height, width): (1,a1), (1,a2), ..., (1,aN) and (S,S) where S is half the
> sum of all the ai. If you can solve the rectangle partitioning problem for this
> instance, then you can find a subset of a1, ..., aN whose sum is exactly half
> the total sum (which is NP-hard).

