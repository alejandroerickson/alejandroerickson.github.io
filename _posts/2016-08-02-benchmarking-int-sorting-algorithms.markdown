---
layout: post
comments: true
title: Benchmarking int sorting algorithms
date: 2016-08-02T21:32:01+01:00
---

In doing a simple programming exercise while preparing for a job interview, I
decided to sort the input. I wrote a solution for the exercise in 10 minutes,
and then spent the next two days implementing "all of the basic sorting
algorithms". When I finally had bubble sort, insertion sort, selection sort,
quicksort (with various types of pivots), shell sort, heap sort, radix sort
(base 16, no mod operator or division), merge sort, and bogo sort implemented, I
wrote some code to test and time the different sorts with various inputs.

### Benchmark inputs ###

"What is the best sorting algorithm?" I have seen this question a dozen times,
and the best answer is, invariably: it depends what you are sorting. Not only
does it depend on the length of the input array, it also depends on how sorted
you expect it to be in the first place, and whether or not the array values are
bounded. For example, insertion sort is worst case quadratic, but it's still
extremely fast for long arrays that are already nearly sorted. It's also faster
than it's asymptotically better counterparts on very short input arrays. For
arrays with only small values, radix sort (with counting sort as a subroutine)
provides near-linear sort-time. What if you have many small values and a few
large ones?

Choosing the best sorting algorithm is as much about knowing what you sorting as
it is about the relative performance of the algorithms.

What, then, are some good benchmarks? A lot of data "in the wild" is already
sorted, either mostly or completely, so (mostly) pre-sorted inputs are a must. The sort
order of the data might also be opposite the sort order of the sorting
algorithm, and in many cases this is the difference between best and worst case
performance. We already have five benchmark properties to try:

  * Unsorted
  * Sorted
  * Mostly sorted
  * Reverse sorted
  * Reverse mostly sorted

We might have a large amount of data that is keyed on just a few unique values,
or that is keyed only on small values (think radix or counting sort). Perhaps we
have a lot of small keys and a few large keys. Here are a few properties that can be combined with the above:

  * Few unique keys
  * Many unique keys
  * Only small keys
  * Mostly small keys

And finally, we may be sorting very short arrays frequently:
    
  * One long array
  * Many short arrays

My sorting algorithms are all offline and they work only in memory, so measuring
CPU cycles should give a realistic comparison.

### Experiment setup ###

I generated a table for each sorting algorithm, with key-related properties and
array-size in the rows, and pre-sorting properties in the columns. The details of the properties are as follows:

  * **Few unique keys:**  
    Values in range [0,49] are generated at random (see notes on
    randomness below), and then multiplied by 100,000,000.
  * **Many unique keys:**  
    Values in range [0, 1000 000 000] are generated at random.
  * **Only small keys:**  
    Values in range [0,49] are generated at random.
  * **Mostly small keys:**  
    I did not run this experiment.
  
The presorting combinations are the ones mentioned in Benchmark inputs, above, and the
details of *mostly sorted* are as follows: sort the array and divide into
consecutive bins of size 10. Shuffle the elements in each bin, and reverse if
needed.

For each ( key, pre-sorting )-pair I computed the cumulative time to do 1000
small arrays, and the mean times to do 100 medium arrays and 10 large arrays. I
had to adjust the size of the large array for some of the slow (in the worst
case) algorithms. Both input size, n, and trials, t, are given in the tables.

Random ints are obtained with `random()` (which is more uniform than `rand()`),
using a technique I learnt on
[Stack Exchange](http://stackoverflow.com/questions/2509679/how-to-generate-a-random-number-from-within-a-range). I will make a separate post about this later.

``` c++
int rand_uniform(int min, int max){
  //computing random number in range [0,range)
  //using unsigned long to ensure no overflow of RAND_MAX+1
  unsigned long range=max-min+1;
  if(range<1){
    fprintf(stderr,"Invalid range to random number generator\n");
    exit(-1);
  }
  unsigned long bin_size=((unsigned long)RAND_MAX+1)/range;
  unsigned long limit=range*bin_size;
  unsigned long x;
  //this will execute an expected < 2 times
  do x=random(); while(x>=limit);
  return x/bin_size+min;
}
```

### Results ###

I benchmarked 9 sorting algorithms in 3 groups, according to the largest inputs they could handle in the worst cases. The choices of input lengths are somewhat *ad hoc*, but I tried to maintain some comparability between groups by making the medium length inputs of the first and second groups the same as the longest inputs of the next group, respectively, as well as making the smallest inputs all of length 100.

The first group comprises the worst case O(n log(n) ) algorithms, as well as radix sort and shell sort:

  * mergesort
  * radix sort
  * heap sort
  * shell sort

The second group is all quicksort, which has a worst case of O( n^2 ):

  * quicksort with random pivot
  * quicksort with sampled pivot (median of 11 random elements)
  * quicksort with A[0] pivot

And finally, the last group contains the quadratic sorts:

  * selection sort
  * insertion sort
  * bubble sort

I have written some observations for each sort. A recurring theme is that
swapping array elements costs a lot, and preventing trivial swaps (swap A[i]
with A[i]) can make a huge difference on certain types of input. I've shown this
with the quicksorts and shell sort.

Execution times are given in CPU seconds.

#### merge sort ####

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.008889 0.014349 0.021700 0.029357 0.036953 
n=    100000 mean t=  100 0.015408 0.026967 0.039481 0.052399 0.066335 
n=   1000000 mean t=   10 0.252024 0.418450 0.599300 0.774420 0.966373 
Many unique keys
n=       100 cum. t= 1000 0.013138 0.020501 0.030311 0.041623 0.054453 
n=    100000 mean t=  100 0.031481 0.049133 0.067820 0.087451 0.107525 
n=   1000000 mean t=   10 0.429134 0.647922 0.856734 1.072369 1.297901 
Only small keys
n=       100 cum. t= 1000 0.011003 0.017600 0.025798 0.034043 0.043056 
n=    100000 mean t=  100 0.023124 0.040034 0.055908 0.074428 0.091996 
n=   1000000 mean t=   10 0.282332 0.472215 0.653874 0.835970 1.023076 
```

Merge sort performs similarly for all types of input, though almost one
order of magnitude better on randomly sorted input than on mostly reversed
input. This is likely related to the performance of insertion sort. It also does
somewhat better with fewer keys (small keys also imply few), which might again
be due toinsertion sort's performance in these cases.


#### radix sort ####

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.023268 0.043492 0.061576 0.084187 0.113511 
n=    100000 mean t=  100 0.016567 0.032285 0.048259 0.063829 0.079416 
n=   1000000 mean t=   10 0.163286 0.322030 0.472653 0.640014 0.790950 
Many unique keys
n=       100 cum. t= 1000 0.022257 0.045786 0.067534 0.090238 0.112354 
n=    100000 mean t=  100 0.013822 0.028326 0.042444 0.057045 0.071284 
n=   1000000 mean t=   10 0.134505 0.274373 0.420898 0.564570 0.700151 
Only small keys
n=       100 cum. t= 1000 0.006753 0.013999 0.020990 0.027771 0.034105 
n=    100000 mean t=  100 0.004051 0.008360 0.012874 0.017107 0.021173 
n=   1000000 mean t=   10 0.040284 0.079419 0.121629 0.166073 0.202377 
```

Radix sort is performs very well in all cases, and often an order of magnitude
or more better than its competitors. Notice the big boost when sorting small
keys; this is exactly what we expect of radix sort.

#### heap sort ####

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.023102 0.051962 0.067207 0.090984 0.103930 
n=    100000 mean t=  100 0.049757 0.093175 0.133780 0.174991 0.214535 
n=   1000000 mean t=   10 0.564437 1.057507 1.535102 2.047978 2.528759 
Many unique keys
n=       100 cum. t= 1000 0.017535 0.038659 0.049879 0.075265 0.100087 
n=    100000 mean t=  100 0.053616 0.144015 0.186376 0.273189 0.318912 
n=   1000000 mean t=   10 0.724070 1.889440 2.405827 3.527297 4.060935 
Only small keys
n=       100 cum. t= 1000 0.024596 0.051553 0.064086 0.089849 0.104462 
n=    100000 mean t=  100 0.048604 0.090844 0.130350 0.172201 0.212220 
n=   1000000 mean t=   10 0.572826 1.056876 1.550843 2.042710 2.524612 
```

Heapsort benefits from having few unique keys, likely because it simplifies the
heap, reducing the number of times that something has to travel all the way up
or down the heap. It looks a bit weak compared to merge sort, but perhaps that's
because of the number of function calls my implementation does calling parent
and child (or perhaps not? maybe the compiler inlines those).

#### shell sort ####


```
shell sort
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.008306 0.011205 0.015687 0.020213 0.025957 
n=    100000 mean t=  100 0.023978 0.028662 0.061678 0.066258 0.103365 
n=   1000000 mean t=   10 2.243850 2.328500 8.383705 8.467235 13.933181 
Many unique keys
n=       100 cum. t= 1000 0.013244 0.017514 0.023101 0.029830 0.037646 
n=    100000 mean t=  100 0.050499 0.057159 0.107181 0.116864 0.169932 
n=   1000000 mean t=   10 2.922308 3.013901 9.482882 9.610873 15.535969 
Only small keys
n=       100 cum. t= 1000 0.012751 0.017415 0.025032 0.034392 0.044506 
n=    100000 mean t=  100 0.036788 0.043620 0.094942 0.101830 0.150294 
n=   1000000 mean t=   10 2.752856 2.845242 8.773390 8.869967 15.316640 
```

Reversed inputs are definitely a troublesome case for shell sort, and it's
noticeably slower than the previous 3 in this group, but notice that key size
and frequency doesn't matter much at all.


#### quicksort rand pivot ####

This is the first of the second group, where the input lengths are 100, 10 000,
100 000, so before you get excited about the running times, make sure you are
comparing the right things.

Does trivial swaps:

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.015292 0.025583 0.036488 0.046039 0.057148 
n=     10000 mean t=  100 0.012060 0.023865 0.035757 0.047574 0.059803 
n=    100000 mean t=   10 1.093409 2.141790 3.165854 4.217718 5.287483 
Many unique keys
n=       100 cum. t= 1000 0.007623 0.013983 0.022010 0.030425 0.038518 
n=     10000 mean t=  100 0.002210 0.003362 0.004629 0.006229 0.007504 
n=    100000 mean t=   10 0.025385 0.040178 0.057318 0.075402 0.095495 
Only small keys
n=       100 cum. t= 1000 0.008600 0.014387 0.024551 0.031904 0.038481 
n=     10000 mean t=  100 0.011888 0.023325 0.035688 0.047062 0.058339 
n=    100000 mean t=   10 1.086990 2.133844 3.200213 4.255836 5.281811 
```

No trivial swaps:

```
quicksort rand pivot
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.007597 0.012089 0.020315 0.026147 0.033506 
n=     10000 mean t=  100 0.003870 0.007311 0.010873 0.014267 0.017885 
n=    100000 mean t=   10 0.274893 0.550136 0.822602 1.092670 1.354651 
Many unique keys
n=       100 cum. t= 1000 0.007324 0.010833 0.016098 0.022465 0.029284 
n=     10000 mean t=  100 0.001527 0.002101 0.003146 0.003934 0.005039 
n=    100000 mean t=   10 0.019573 0.025388 0.037811 0.048063 0.059828 
Only small keys
n=       100 cum. t= 1000 0.007193 0.011651 0.017675 0.022824 0.029322 
n=     10000 mean t=  100 0.003565 0.007432 0.011178 0.014671 0.018928 
n=    100000 mean t=   10 0.305417 0.622128 0.931763 1.251941 1.585888 
```

Unlike radix sort, quicksort's best performance is on many unique keys, and it
is lightning fast.

There are other
[quicksorts that do a better job on fewer keys](https://www.toptal.com/developers/sorting-algorithms/few-unique-keys),
but I think the take home is that if the keys are unbounded (e.g., sorting
strings instead of ints), and the inputs are somewhat random, then quicksort
will overtake radix sort.

Quicksort has the best all-round performance for short arrays, of length 100 as
well (insertion sort kicks in at 10 anyway, see implementations below).

Notice that many trivial swaps are made when there are small or few unique keys,
so we make significant performance gains by avoiding trivial swap in those
cases.

#### quicksort sample pivots ####

Does trivial swaps:

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.011113 0.022533 0.050936 0.076597 0.097487 
n=     10000 mean t=  100 0.016849 0.033906 0.051184 0.068535 0.086613 
n=    100000 mean t=   10 1.139067 2.252892 3.391474 4.488898 5.619355 
Many unique keys
n=       100 cum. t= 1000 0.011991 0.023476 0.035319 0.048608 0.061077 
n=     10000 mean t=  100 0.001922 0.004049 0.005808 0.007694 0.009718 
n=    100000 mean t=   10 0.031631 0.053147 0.077470 0.101593 0.119885 
Only small keys
n=       100 cum. t= 1000 0.010924 0.023017 0.037136 0.048897 0.064815 
n=     10000 mean t=  100 0.017652 0.034697 0.052235 0.069108 0.086392 
n=    100000 mean t=   10 1.124645 2.270968 3.372665 4.496212 5.648460 
```

No trivial swaps:

```
quicksort sample pivots
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.012233 0.024042 0.036269 0.048778 0.061233 
n=     10000 mean t=  100 0.009999 0.019239 0.028932 0.039122 0.048028 
n=    100000 mean t=   10 0.409569 0.767142 1.160827 1.537898 1.930502 
Many unique keys
n=       100 cum. t= 1000 0.021888 0.039612 0.056072 0.071861 0.085046 
n=     10000 mean t=  100 0.002030 0.003950 0.005888 0.007761 0.009725 
n=    100000 mean t=   10 0.027172 0.051049 0.074264 0.100132 0.122430 
Only small keys
n=       100 cum. t= 1000 0.016623 0.031822 0.045721 0.059695 0.074518 
n=     10000 mean t=  100 0.011944 0.022877 0.033032 0.042883 0.052858 
n=    100000 mean t=   10 0.402972 0.790716 1.181511 1.590763 1.975614 
```

Unsurprisingly, randomly sampled pivots do not yield better performance than
a random pivot for the types of inputs I benchmarked.

#### quicksort ####

Does trivial swaps:

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.008412 0.019396 0.040898 0.047171 0.061713 
n=     10000 mean t=  100 0.010626 0.021840 0.162555 0.174314 0.300646 
n=    100000 mean t=   10 1.058832 2.152600 16.595871 17.645692 27.619864 
Many unique keys
n=       100 cum. t= 1000 0.016909 0.047902 0.096482 0.105939 0.121583 
n=     10000 mean t=  100 0.001500 0.183752 0.539544 0.586058 0.675808 
n=    100000 mean t=   10 0.025020 18.434709 53.367040 58.163498 66.914414 
Only small keys
n=       100 cum. t= 1000 0.007031 0.016319 0.040730 0.048951 0.060752 
n=     10000 mean t=  100 0.011752 0.022146 0.160856 0.173556 0.298355 
n=    100000 mean t=   10 1.062395 2.170551 15.381749 16.576828 33.978687 
```

No trivial swaps:

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.008386 0.017133 0.028175 0.034515 0.048920 
n=     10000 mean t=  100 0.005006 0.009382 0.058085 0.063350 0.103289 
n=    100000 mean t=   10 0.363506 0.706342 6.513671 6.880759 11.827864 
Many unique keys
n=       100 cum. t= 1000 0.010197 0.031478 0.052130 0.061410 0.071172 
n=     10000 mean t=  100 0.002337 0.191765 0.391462 0.445639 0.528083 
n=    100000 mean t=   10 0.024932 20.104292 39.919410 45.195053 53.560765 
Only small keys
n=       100 cum. t= 1000 0.010088 0.021882 0.035652 0.044448 0.058335 
n=     10000 mean t=  100 0.005418 0.010846 0.061258 0.065940 0.110825 
n=    100000 mean t=   10 0.366798 0.731917 4.784282 5.219642 9.861861 
```

Here we see what a catasrophic failure it can be to use the first element as a
pivot when the data has been presorted or reverse sorted. Compare the two
randomised pivot schemes above!

Once again, significant gains can be made by avoiding trivial swaps.

#### selection sort ####

I did two versions of selection sort. The first one calls the swap function even
if the swap is trivial, and the second one doesn't. The difference is
considerable, but nothing like what we saw in quicksort.

Does trivial swaps.

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.039077 0.065295 0.096381 0.117727 0.141555 
n=      1000 mean t=  100 0.002485 0.004212 0.006809 0.008507 0.010578 
n=     10000 mean t=   10 0.198644 0.383517 0.565173 0.758113 0.952356 
Many unique keys
n=       100 cum. t= 1000 0.030804 0.054383 0.076002 0.097099 0.117401 
n=      1000 mean t=  100 0.002482 0.004271 0.006185 0.007820 0.009402 
n=     10000 mean t=   10 0.187554 0.377594 0.555244 0.749135 0.981563 
Only small keys
n=       100 cum. t= 1000 0.019392 0.038758 0.061850 0.081514 0.107969 
n=      1000 mean t=  100 0.001678 0.004167 0.005825 0.007829 0.009853 
n=     10000 mean t=   10 0.185607 0.358608 0.555364 0.746996 0.923890 
```

Does not do trivial swaps.

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.019897 0.035554 0.056504 0.073038 0.090483 
n=      1000 mean t=  100 0.001518 0.002849 0.004628 0.006151 0.007803 
n=     10000 mean t=   10 0.143865 0.284060 0.424768 0.566863 0.706828 
Many unique keys
n=       100 cum. t= 1000 0.017861 0.031654 0.049689 0.065296 0.086167 
n=      1000 mean t=  100 0.001460 0.002861 0.004218 0.005868 0.007304 
n=     10000 mean t=   10 0.137928 0.280246 0.408686 0.545818 0.716902 
Only small keys
n=       100 cum. t= 1000 0.019534 0.033845 0.053782 0.071332 0.092680 
n=      1000 mean t=  100 0.001471 0.002844 0.004270 0.005606 0.007208 
n=     10000 mean t=   10 0.141999 0.281048 0.415701 0.553452 0.693397 
```

#### insertion sort ####

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.009309 0.010388 0.031511 0.034575 0.053558 
n=      1000 mean t=  100 0.001263 0.001274 0.003695 0.003704 0.006256 
n=     10000 mean t=   10 0.106185 0.106253 0.336115 0.336185 0.555283 
Many unique keys
n=       100 cum. t= 1000 0.012672 0.013854 0.036083 0.039154 0.059792 
n=      1000 mean t=  100 0.001038 0.001044 0.003939 0.003966 0.006330 
n=     10000 mean t=   10 0.116284 0.116347 0.344594 0.344928 0.574738 
Only small keys
n=       100 cum. t= 1000 0.017111 0.018782 0.044102 0.047341 0.068438 
n=      1000 mean t=  100 0.000984 0.000995 0.003364 0.003375 0.006297 
n=     10000 mean t=   10 0.108734 0.108788 0.341410 0.341463 0.562227 
```

Insertion sort is clearly the best performer among my quadratic sort
implementations. As expected, it does better with sorted data than with reversed
data, and the sizes of the keys don't matter. What puzzles me, however, is that
unsorted and sorted are the same (I hope I have not made an error!).

#### bubble sort ####

```
                unsorted sorted reversed mostly_sorted mostly_reversed
Few unique keys
n=       100 cum. t= 1000 0.078510 0.114953 0.209767 0.258683 0.329370 
n=      1000 mean t=  100 0.005851 0.009843 0.017096 0.021669 0.029106 
n=     10000 mean t=   10 0.762319 1.161017 1.885205 2.284290 3.026368 
Many unique keys
n=       100 cum. t= 1000 0.054761 0.087367 0.213627 0.263277 0.334638 
n=      1000 mean t=  100 0.005857 0.009696 0.017421 0.021774 0.028827 
n=     10000 mean t=   10 0.718532 1.119410 1.875999 2.288199 3.039036 
Only small keys
n=       100 cum. t= 1000 0.070953 0.102099 0.200582 0.248663 0.317165 
n=      1000 mean t=  100 0.006718 0.010932 0.018969 0.022913 0.030559 
n=     10000 mean t=   10 0.766333 1.187963 1.953355 2.370041 3.151571 
```

It's the worst.  Don't bubble sort.


### Sorting Algorithms ###
  
I describe my implementation of each algorithm below. Each of these algorithms has been discussed to death already, so I won't really try to make this a lesson about asymptotic running time and space. If you are interested, my favourite quick reference right now is the [BIGOCHEATSHEET](http://bigocheatsheet.com/).

This is raw stuff that I just wrote to learn to implement the algorithms, so
your critiques are welcome.

First, here is my swapping utility:

``` c++
void swap(int *A, int i, int j){
  int tmp;
  tmp=A[i];
  A[i]=A[j];
  A[j]=tmp;
}
```

And here is my dynamic array data structure:

``` c++
int *m_array;
int m_array_size;//global initialises to 0
void m_array_resize(int n){
  if(n>m_array_size && m_array) free(m_array);
  if(n>m_array_size){
    m_array=malloc(2*n*sizeof(int));
    m_array_size=2*n;
  }
}
```

#### Bogo Sort  ####

I didn't benchmark bogo sort for obvious reasons...

``` c++
void shuffle(int *A, int n){
  int i;
  for(i=0;i<n-1;i++){
    swap(A,i,rand_uniform(i+1,n-1));
  }
}

void bogo_sort(int *A, int n){
  while(!is_sorted(A,n))
    shuffle(A,n);
}
```

#### Insertion Sort ####

I had originally implemented Gnome sort, which does swaps at each step of the
internal loop. Ooops! After that I made a second mistake, forgetting the
`break;` statement in the updated version, so that insertion sort would do
O(n^2) comparisons no matter what the input was.

Several of my sorting algorithms call insertion sort for inputs shorter than `SORT_THRESHOLD=10`.

``` c++
void insertion_sort(int *A, int n){
  int i,j,Aj;
  for(i=1;i<n;i++){
    Aj=A[i];
    for(j=i;j>=0;j--){
      if(j==0 || A[j-1]<=Aj){
        A[j]=Aj;
        break;
      } else{
        A[j]=A[j-1];
      }
    }
  }
}
```

#### Bubble sort ####

``` c++
void bubble_sort(int *A, int n){
  int i,j;
  if(n<2) return;
  for(i=0;i<n;i++){
    for(j=0;j<n-1;j++){
      if(A[j]>A[j+1]) swap(A,j,j+1);
    }
  }
}
```

#### Selection sort ####

``` c++
//returns index of a minimum value
//if n==0 returns error value -1
int min_val_index(int *A, int n){
  int i,min_index;
  if(n==0) return -1;
  min_index = 0;
  for(i=1;i<n;i++){
    if(A[i]<A[min_index]) min_index=i;
  }
  return min_index;
}

void selection_sort(int *A, int n){
  int i,k;
  if(n<2) return;
  for(i=0;i<n-1;i++){
    if(( k=i+min_val_index(A+i,n-i) )!=i)
      swap(A,i,k);
  }
}
```

#### Quicksort(s) ####

Quicksort was the first "serious" sort I implemented. I demonstrate three
distinct types of pivots: `A[0]`, random, and sampled. I make some fairly
arbitrary choices about pivots, like how many samples to use (`QS_NSAMPLES=11`),
but the different concepts are there.

Sampling random elements to find a good pivot has potential advantages, but they
will not be apparent against the fairly random inputs we are benchmarking with.
Exercise: come up with inputs where the sampled pivot would clearly be better
than the randomly chosen pivot.

Note how the partition function is called by incrementing the pointer, so it
returns an index of the sub-array. I forgot to add 1 to its output at first, and
it took me a while to find the bug.

``` c++
//partition A in place around pivot.
//return `partition`, smallest index with value
//larger than pivot
int partition(int *A, int n, int pivot){
  int partition=0,i;
  for(i=0;i<n;i++){
    if(A[i]<=pivot){
      if(partition<i)//avoid trivial swaps
        swap(A,partition,i);
      partition++;
    }
  }
  return partition;
}
```

``` c++
//uses first element as pivot
void quicksort_sort(int *A, int n){
  int ptn;
  if(n<2) return;
  if(n<SORT_THRESHOLD){
    insertion_sort(A,n);
    return;
  }
  ptn = 1 + partition(A+1,n-1,A[0]);
  if(ptn>1)//avoid trivial swaps
    swap(A,0,ptn-1);
  quicksort_sort(A,ptn-1);
  quicksort_sort(A+ptn,n-ptn);
}
```

``` c++
void quicksort_rand_pivot_sort(int *A, int n){
  int ptn,rnd;
  if(n<2) return;
  if(n<SORT_THRESHOLD){
    insertion_sort(A,n);
    return;
  }
  rnd=rand_uniform(0,n-1);
  if(rnd>0)
    swap(A,0,rnd);
  ptn = 1 + partition(A+1,n-1,A[0]);
  if(ptn>1)//avoid trivial swaps
    swap(A,0,ptn-1);
  quicksort_rand_pivot_sort(A,ptn-1);
  quicksort_rand_pivot_sort(A+ptn,n-ptn);
}
```

``` c++
void quicksort_sample_pivot_sort(int *A, int n){
  int i,ptn;
  if(n<2*SORT_THRESHOLD || n < 2*QS_NSAMPLES){
    quicksort_rand_pivot_sort(A,n);
    return;
  }
  //take the pivot to be the median of 11 samples
  for(i=0;i<QS_NSAMPLES;i++){
    swap(A,i,rand_uniform(i+1,n-1));
  }
  insertion_sort(A,QS_NSAMPLES);
  swap(A,0,QS_NSAMPLES/2+1);
  ptn = 1 + partition(A+1,n-1,A[0]);
  if(ptn>1)//avoid trivial swaps
    swap(A,0,ptn-1);
  quicksort_sample_pivot_sort(A,ptn-1);
  quicksort_sample_pivot_sort(A+ptn,n-ptn);
}
```

#### Merge sort ####

Not much to say about merge sort! Note that I use the `SORT_THRESHOLD`.

``` c++
//A fits both A and B
void merge_arrays(int *A, int n, int *B, int m){
  int a,b,i;
  m_array_resize(n+m);
  a=b=i=0;
  while(a<n & b<m){
    if(A[a]<=B[b]){
      m_array[i++]=A[a++];
    }else{
      m_array[i++]=B[b++];
    }
  }
  while(a<n)m_array[i++]=A[a++];
  while(b<m)m_array[i++]=B[b++];
  for(i=0;i<n+m;i++){
    A[i]=m_array[i];
  }
}
```

``` c++
void merge_sort(int *A, int n){
  if(n<SORT_THRESHOLD){
    insertion_sort(A,n);
    return;
  }
  merge_sort(A,n/2);
  merge_sort(A+n/2,n/2+n%2);
  merge_arrays(A,n/2,A+n/2,n/2+n%2);
}
```

#### Heap sort ####

``` c++
//heap sort
//max heap
int parent(int i){
  return (i-1)/2;
}

int l_child(int i){
  return 2*i+1;
}

int r_child(int i){
  return 2*i+2;
}


void heapify(int A[], int nA){
  int h,i;
  for(h=1;h<nA;h++){
    i=h;
    while(i>0){
      if(A[i]>A[parent(i)]){
        swap(A,i,parent(i));
        i=parent(i);
      }else{
        break;
      }
    }
  }
}

int remove_max(int A[], int h){
  int res,i,l,r,largest;
  if(h==0) exit(-1);
  res=A[0];
  A[0]=A[h-1];
  //reheap
  i=0;
  while((l=l_child(i))<h){
    largest=i;
    if(A[largest]<A[l]){
      largest=l;
    }
    if((r=r_child(i))<h && A[largest]<A[r]){
      largest=r;
    }
    if(largest!=i){
      swap(A,i,largest);
      i=largest;
    }else break;
  }
  return res;
}
```

``` c++
void heap_sort(int A[], int nA){
  int h=nA;
  heapify(A,nA);
  while(h>0){
    A[h-1]=remove_max(A,h);
    h--;
  }
}
```

#### Shell sort ####

Before I started this exercise I thought that *Shell* referred to Shell sort's
relationship with bubble sort (shells are hard bubbles?). But then wikipedia burst my
hardened bubble by informing me that a Mr. Shell invented the algorithm. Oh
well!


``` c++
int shell_gaps[]={701, 301, 132, 57, 23, 10, 4, 1};
int n_shell_gaps=8;

//sort the subarray A[0*h],A[1*h],...,A[k*h], where k*h<n
void insertion_h_sort(int *A, int n, int h){
  int i,j,Aj;
  for(i=h;i<n;i+=h){
    Aj=A[i];
    for(j=i;j>=0;j-=h){
      if(j==0 || A[j-h]<=Aj){
        A[j]=Aj;
        break;
      }else{
        A[j]=A[j-h];
      }
    }
  }
}

void shell_sort(int *A, int n){
  int i,j;
  for(i=0;i<n_shell_gaps;i++){
    for(j=0;j<shell_gaps[i];j++){
      if(j+shell_gaps[i]>=n) break;
      else insertion_h_sort(A+j,n-j,shell_gaps[i]);
    }
  }
}
```

#### Radix sort ####

Radix sort was the most interesting of the lot to implement. It's usually
described in base 10, but that has nothing to do with the way ints are stored in
memory. You need to use a base that is a power of 2, and that divides the number
of bits in an int to truly take advantage of it, otherwise your code will be
full of `%` and `/` operators, which are much slower than shifts `>>`.

I implemented a radix sort with a counting sort subroutine in base 16 (I have
also seen base 256) that doesn't use any divide operations. In order to take
advantage of the bit representations of the inputs I had to treat negative
numbers as a special case.

``` c++
//radix for radix sort, should divide 32
#define RADIX_BITS 4
//2^RADIX_BITS
#define RADIX 16
int radix_array[RADIX];

//this is a stable sort on the exp digit in base 2^RADIX_BITS of the input
//array.
void radix_count_sort_nonneg_subroutine(int *A, int n, int exp){
  exp*=RADIX_BITS;
  int i,mask=(RADIX-1)<<exp;
  m_array_resize(n);
  for(i=0;i<RADIX;i++){
    radix_array[i]=0;
  }
  for(i=0;i<n;i++){
    radix_array[( A[i]&mask )>>exp]++;
  }
  for(i=1;i<RADIX;i++){
    radix_array[i]+=radix_array[i-1];
  }
  for(i=n-1;i>=0;i--){
    m_array[--(radix_array[(A[i]&mask)>>exp])]=A[i];
  }
  for(i=0;i<n;i++){
    A[i]=m_array[i];
  }
}

void radix_sort_positive(int *A, int n, int maxval){
  int exp=0,position=RADIX;
  //maxval <<= RADIX_BITS;
  while(maxval>0){
    radix_count_sort_nonneg_subroutine(A,n,exp);
    maxval >>= RADIX_BITS;
    exp++;
  }
}

//input A array of negative int
//this is a stable sort on the exp digit in base 2^RADIX_BITS of the input
//array.
void radix_count_sort_neg_subroutine(int *A, int n, int exp){
  exp*=RADIX_BITS;
  int i,mask=(RADIX-1)<<exp;
  m_array_resize(n);
  for(i=0;i<RADIX;i++){
    radix_array[i]=0;
  }
  for(i=0;i<n;i++){
    //printf("radix index %d\n",( ( -A[i] )&mask )>>exp);
    radix_array[( ( -A[i] )&mask )>>exp]++;
  }
  for(i=RADIX-2;i>=0;i--){
    radix_array[i]+=radix_array[i+1];
  }
  for(i=n-1;i>=0;i--){
    m_array[--(radix_array[(-A[i]&mask)>>exp])]=A[i];
  }
  for(i=0;i<n;i++){
    A[i]=m_array[i];
  }
}

void radix_sort_negative(int *A, int n, int maxval){
  int exp=0,position=RADIX;
  while(maxval>0){
    radix_count_sort_neg_subroutine(A,n,exp);
    maxval >>= RADIX_BITS;
    exp++;
  }
}

void radix_sort(int *A, int n){
  //deal with negatives, get min and max
  int nnegatives=0,i,minval,maxval;
  if(n<2) return;
  minval=maxval=A[0];
  for(i=0;i<n;i++){
    if(A[i]<minval) minval=A[i];
    else if(A[i]>maxval) maxval=A[i];
    if(A[i]<0){
      if(nnegatives < i)//avoid trivial swaps
        swap(A,nnegatives,i);
      nnegatives++;
    }
  }
  radix_sort_negative(A,nnegatives,-minval);
  radix_sort_positive(A+nnegatives,n-nnegatives,maxval);
}
```
