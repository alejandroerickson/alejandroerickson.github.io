---
layout: post
comments: true
thumbnail: '/images/ficonn-proxy.png'
title: 'TL;DR Improved Routing in DCell and FiConn'
date: 2016-08-25T18:07:08+02:00
---

Datacenters provide low-cost, efficient and flexible computing resources, so
that users and applications (*e.g.*, Google Search, Pokemon Go) share a pool of
resources, and can expand into that pool as needed. Being such a critical
building block of our digital world, every aspect of datacenters undergoes
constant research and development both by industrial and academic communities.

At the physical level, all datacenters are built upon a network of servers, but
there are many variations on exactly which hardware is used, and the topology
(or graph) of the interconnections. A particularly interesting design is the
*server-centric datacenter network* (SCDCN), for several reasons: it encourages
the use of very cheap, and even legacy, components; many network topologies are
possible; it allows the incorporation of existing, and extensive, research on
high-performance interconnection network topologies; communication within the
datacenter is fully programmable within the servers, making it an excellent
platform for independent and academic research and development. Our work is
precisely on algorithms for such communication, called *routing algorithms*.

Before I go on, let me describe how we model SCDCNs as a graph. An SCDCN with N
servers and N/n switches, each with n ports, is represented by a graph on N
server-nodes and N/n switch-nodes, connected by links. Each server-node,
switch-node, and link represents the corresponding physical component of the
topology. I'll avoid excessive formality here by dropping the "-node" part. For
reasons detailed in the paper, there are no switch-to-switch connections.

Many DCN topologies can be defined recursively, where a level k network is built
from a number of level k-1 networks that are connected to one another with a
number of bridge links. In our research we use the recursive structure and the
bridge links to yield efficient routing algorithms for recursively defined
networks. We apply them to two well-known SCDCNs that were proposed by Microsoft
Research, DCell and FiConn,

We show, via an extensive experimental evaluation using our
[flow-level simulator](https://bitbucket.org/alejandroerickson/inrflow), that
our newly-proposed routing algorithms can yield significant improvements in
terms of hop-length, fault-tolerance, load-balance, network-throughput,
end-to-end latency, and workload completion time when we compare our algorithms
with the existing routing algorithms for (Generalized) DCell and FiConn.

DCell, FiConn, and many other recursively-defined networks ship with a natural
*Dimensional* routing algorithm, which is described for DCell below. Given a
source server *src* and a destination server *dst*:

  * Identify the smallest *m* so that a level *m* DCell contains both *src* and *dst*,
  * Compute the bridge-link *(dst',src')* between the level *(m-1)* DCell
    containing *src* and the level *(m-1)* DCell containing *dst*,
  * Recursively compute paths from *src* to *dst'* and from *src'* to *dst*;
    and,
  * Piece together the recursively computed paths with the bridge-link.

It may be the case, however, that an alternative, *proxy*, level *(m-1)* DCell
can be used such that a shorter path can be constructed from two bridge links
and three recursively computed paths. An algorithm that searches for the proxy
substructure is called a *Proxy* routing algorithm. This is precisely the
situation depicted the the Figure below, for a level 2 FiConn that uses switches
with 4 ports, where the proxy route is 2 server-server hops shorter than the
dimensional route.


{% include image.html
    img="images/ficonn-proxy.png"  
    title="Proxy Routing in FiConn"  
    caption="Dimensional route (dashed black-grey), with 7 hops, and proxy route
    (thick black), with 5 hops, highlighted on a FiConn(2,4)."  
    %}

In our paper we identify and evaluate efficient ways of searching for and
identifying proxy substructures which yield short paths. It's a bit technical,
and the details are in the paper, but the basic idea is depicted schematically
in the figure below. We restrict the length of at least one of the recursively
computed paths by looking at the bridge links incident to nodes near *src* or
*dst*, and considering only the proxies that those bridge links are connected
to. We compute the length of the proxy path through each such proxy, as well as
link-states (*e.g.*, traffic congestion) along the path, and then output the
best path.

{% include image.html
    img="images/rri-abstract.png"  
    title="Intelligent search for proxies"  
    caption="Strategy for reducing size of proxy search: exploit the structure of the network to choose proxy substructures X_{k-1}^c that are inherently close to src or dst. Substructures are depicted as rounded rectangles, where GP_I and GP_0 are two possible schemes."  
    %}


The details are in our paper:

A. Erickson, J. Pascual Saiz, J. Navaridas, and I. A. Stewart.  
[**Routing Algorithms for Recursively-Defined Datacenter Networks**](http://alejandroerickson.com/j/downloads/Erickson-Routing-RD-DCNs-2016.pdf).
Submitted to a journal. Previous version in Proc. of
Trustcom/BigDataSE/ISPA, 2015 IEEE, 3, 84--91, 2015.
