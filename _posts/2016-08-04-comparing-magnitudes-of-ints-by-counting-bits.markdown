---
layout: post
comments: true
title: Comparing magnitudes of ints by counting bits
date: 2016-08-04T23:23:20+01:00
---

Suppose you have two unsigned 16-bit integers,  
`X=0000 0000 0111 1111 1000 1010 0010 0100`  
and  
`Y=0000 0000 0000 0000 0011 0000 1010 1111`.  
How can you tell if `Y` is more than half as long as `X`? I came across this
because I wanted some code to branch on whether or not `Y` was a lot bigger or
smaller than the square root of a large positive integer `X` (behaviour when `Y`
was around the square root was arbitrary). The square root of `X` has half as
many bits as `X` does, and I figured that I could get the lengths of these
numbers super fast to make a fairly coarse comparison.

I was right about that, but the efficiency of the answer depends on the CPU the
code is running on. Even so, the portable answers should be quite fast, and they
are interesting, so let's look at them.

As usual, I did some research on the internet for this, and the bit twiddling I
did is from
[Stackoverflow](http://stackoverflow.com/questions/23856596/counting-leading-zeros-in-a-32-bit-unsigned-integer-with-best-algorithm-in-c-pro)
and [Haacker's Delight](http://www.hackersdelight.org/hdcodetxt/pop.c.txt) (it's
a book, of course, but I linked to some snippets on their website).

I wrote some code that explains the steps of a smearing function and a
population count. In fact, that's the spoiler: I will smear the bits of `X` to
the right, and then count the population of 1-bits.

``` c++
//smear
x = x | x>>1;
x = x | x>>2;
x = x | x>>4;
x = x | x>>8;
x = x | x>>16;

//population count
x = ( x & 0x55555555 ) + ( (x >> 1 ) & 0x55555555 );
x = ( x & 0x33333333 ) + ( (x >> 2 ) & 0x33333333 );
x = ( x & 0x0F0F0F0F ) + ( (x >> 4 ) & 0x0F0F0F0F );
x = ( x & 0x00FF00FF ) + ( (x >> 8 ) & 0x00FF00FF );
x = ( x & 0x0000FFFF ) + ( (x >> 16) & 0x0000FFFF );
```

The idea behind the population count is to divide and conquer. For example with
`01 11`, I first count the 1-bits in `01`: there is 1 1-bit on the right, and
there are 0 1-bits on the left, so I record that as `01` (in place). Similarly,
`11` becomes `10`, so the updated bit-string is `01 10`, and now I will add the
numbers in buckets of size 2, and replace the pair of them with the result;
1+2=3, so the bit string becomes `0011`, and we are done. The original
bit-string is replaced with the population count.

There are faster ways to do the pop count given in Hacker's Delight, but this
one is easier to explain, and seems to be the basis for most of the others. You
can get my code as a
[Gist here.](https://gist.github.com/alejandroerickson/3b2173957a809277d3bdcbb1148c13b3).

`X=0000 0000 0111 1111 1000 1010 0010 0100`  
Set every bit that is 1 place to the right of a 1  
`0000 0000 0111 1111 1100 1111 0011 0110`  
Set every bit that is 2 places to the right of a 1  
`0000 0000 0111 1111 1111 1111 1111 1111`  
Set every bit that is 4 places to the right of a 1  
`0000 0000 0111 1111 1111 1111 1111 1111`  
Set every bit that is 8 places to the right of a 1  
`0000 0000 0111 1111 1111 1111 1111 1111`  
Set every bit that is 16 places to the right of a 1  
`0000 0000 0111 1111 1111 1111 1111 1111`  
Accumulate pop counts of bit buckets size 2  
`0000 0000 0110 1010 1010 1010 1010 1010`  
Accumulate pop counts of bit buckets size 4  
`0000 0000 0011 0100 0100 0100 0100 0100`  
Accumulate pop counts of bit buckets size 8  
`0000 0000 0000 0111 0000 1000 0000 1000`  
Accumulate pop counts of bit buckets size 16  
`0000 0000 0000 0111 0000 0000 0001 0000`  
Accumulate pop counts of bit buckets size 32  
`0000 0000 0000 0000 0000 0000 0001 0111`  

The length of 8358436 is 23 bits

`Y=0000 0000 0000 0000 0011 0000 1010 1111`  
Set every bit that is 1 place to the right of a 1  
`0000 0000 0000 0000 0011 1000 1111 1111`  
Set every bit that is 2 places to the right of a 1  
`0000 0000 0000 0000 0011 1110 1111 1111`  
Set every bit that is 4 places to the right of a 1  
`0000 0000 0000 0000 0011 1111 1111 1111`  
Set every bit that is 8 places to the right of a 1  
`0000 0000 0000 0000 0011 1111 1111 1111`  
Set every bit that is 16 places to the right of a 1  
`0000 0000 0000 0000 0011 1111 1111 1111`  
Accumulate pop counts of bit buckets size 2  
`0000 0000 0000 0000 0010 1010 1010 1010`  
Accumulate pop counts of bit buckets size 4  
`0000 0000 0000 0000 0010 0100 0100 0100`  
Accumulate pop counts of bit buckets size 8  
`0000 0000 0000 0000 0000 0110 0000 1000`  
Accumulate pop counts of bit buckets size 16  
`0000 0000 0000 0000 0000 0000 0000 1110`  
Accumulate pop counts of bit buckets size 32  
`0000 0000 0000 0000 0000 0000 0000 1110`  

The length of 12463 is 14 bits

So now I know that 12463 is significantly larger than the square root of
8358436, without taking square roots, or casting to floats, or dividing or
multiplying.

It needs to be said that there are built-in functions that get the number of
leading or trailing 0s. They are `__builtin_clz()` and `__builtin_ctz()`
(*i.e.*, clz = count leading zeros), and I read that most modern CPUs will do
this computation in 1 instruction. So, alternatively, the length of `uint32_t x` is

``` c++
32-__builtin_clz(x);
```

