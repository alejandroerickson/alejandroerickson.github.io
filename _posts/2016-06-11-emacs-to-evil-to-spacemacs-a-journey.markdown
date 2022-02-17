---
layout: post
comments: true
title: Emacs to Evil to Spacemacs, A Journey
date: 2016-06-11T22:36:00+01:00
---

# Try Spacemacs.

If you only take one thing away from this post, that's it.  No matter whether
you are Emacs, Vim, or you hate these old fashioned editors with terrible
defaults, you must try Spacemacs.

Spacemacs is a curated initialisation directory for Emacs.
[Get Emacs](https://www.gnu.org/software/emacs/ "GNU / Emacs") at least version
24.4, and then [get Spacemacs](http://spacemacs.org/). Back up your `~/.emacs.d`
directory if you have one, and rename the Spacemacs directory to `~/.emacs.d`.
Open Emacs and follow the prompts. Choose between Emacs and Vim bindings when it
asks you and Spacemacs will bootstrap itself and download the packages necessary
to complete the installation. **You can always change back to regular Emacs by
swapping Spacemacs `~/.emacs.d` with the one you backed up**.

## Why am I so excited about Spacemacs?

In short, Spacemacs is Emacs with not only a good set of default packages and
key bindings, including Vim-like modal editing, its integrated "command centre"
(my own term) continuously shows you the key bindings you need to see. When I
press the space bar, a dialog instantly appears below and offers some command
categories, like windows, files, or buffers. If I press "b" for buffers, the
choices are narrowed to that category, as in the picture below.

![Spacemacs Command Centre]({{site.baseurl}}/images/spacemacs-command-centre.png
"Spacemacs Command Centre") 

In just a few days of using Spacemacs I feel like I have benefited from
intensive Spacemacs training, without even the pain of doing a tutorial
(granted, I have a working knowledge of Emacs and Vim). Each time I open the
Command Centre I feel like I discover little gems. It has improved my work-flow
so much that I have time to write this blog post!

Instead of spending hours sifting through GitHub pages and Elpa packages, trying
to discern whether I'm (a) looking at the best Emacs package for the job, (b)
whether the package is actively maintained, (c) whether or not I'm building my
customisations around a package that will die soon; and, (d) how to set good
defaults for the package, the Spacemacs expert hive-mind has done all that for
the vast majority of packages that I use.

Veteran Emacsers and Vimmers alike are all but tossing
[years worth of customisations](https://www.reddit.com/r/emacs/comments/4niswu/migrating_from_emacs_to_spacemacs/d44n64q)
in favour of Spacemacs' defaults, plus you can still
[integrate them in a "layer"](http://spacemacs.org/doc/QUICK_START.html
"Spacemacs Quickstar").

The success of Spacemacs is founded upon three packages:
[Evil-mode](https://bitbucket.org/lyro/evil/wiki/Home "Evil mode homepage"),
[Helm](https://github.com/emacs-helm/helm "Helm homepage"), and
[Company](http://company-mode.github.io/ "Company homepage"). For the
uninitiated, that's Vim emulation, fuzzy searching, and an auto-completion
engine. These are the modes that begin to turn a basic text editor into a modern
and powerful programmer's light-sabre.

Seriously go try Spacemacs.

## My journey to Spacemacs

My degrees are in Computer Science and Mathematics, for which I wrote theses in
LaTeX, and as a postdoc at [Durham University](https://www.dur.ac.uk/ecs/
"Durham University") I do a lot of programming in C and Python as well. I
started with Emacs and [AUCTeX](https://www.gnu.org/software/auctex/ "AUCTeX")
about 5 years ago, slowly building up my configuration file and environment for
LaTeX, Maple, PHP, Sage, Python, C, and so on, a few lines at a time.

With all the programming I have been doing I got
[Emacs pinky](http://ergoemacs.org/emacs/emacs_pinky.html); an RSI caused by the
awkward reaching my fingers did to hit Emacs' famously complex key commands. I
solved this problem in April 2016 by installing Evil-mode, which simulates Vim
modal-editing (i.e., a mode for commands, a mode for movements, a mode for
inserting text, etc., which minimises hand-contortions and finger-stretching)
and I bought a [TypeMatrix Keyboard](http://www.typematrix.com/) and a trackball
mouse. Truly life-changing kit, all of this.

But with all the packages I had installed, Emacs eventually became unuseably
laggy. I had just filled my init file with every package I fancied, **like a
noob**, and Emacs was stuck rendering whole pages just to display line numbers,
and parsing entire C-projects just to provide auto-completion. Being near a
deadline I temporarily jumped ship to [Atom](https://atom.io/ "Atom editor") (a
good backup plan) but soon I found the time to eliminate the packages that were
slowing Emacs down.

As I sifted around for the latest and best packages, plus a way of bootstrapping
my Emacs installation in order to port it to my other computers and have it
download packages automatically, I decided to try Spacemacs. Not only was I
astounded to find Spacemacs does **exactly** this, I realised I was just doing
an amateur job putting together many of the same packages that Spacemacs
assembles perfectly!

### And so, here I am, very happy with Spacemacs

