---
layout: post
title: Command line find duplicate files on mac os x
joomla_id: 75
joomla_url: command-line-find-duplicate-files-on-mac-os-x
date: 2011-02-23 21:17:47.000000000 +00:00
comments: true
---
<p>I just discovered <a href="http://commandlinefu.com" title="Commandline Fu">commandlinefu.com</a>, and it is very helpful for learning command line stuff.</p>
<p>I wanted a command that would show me duplicate files on my computer and found this:</p>
<p><a href="http://www.commandlinefu.com/commands/view/3555/find-duplicate-files-based-on-size-first-then-md5-hash">http://www.commandlinefu.com/commands/view/3555/find-duplicate-files-based-on-size-first-then-md5-hash</a></p>
<p>For the lazy, the command given is:</p>
<p>find -not -empty -type f -printf "%s\n" | sort -rn | uniq -d | xargs -I{} -n1 find -type f -size {}c -print0 | \<br />xargs -0 md5sum | sort | uniq -w32 --all-repeated=separate</p>
<p>What does it do?  it finds things that are files and are not empty and prints their size in bytes.  It sorts the output from that in reverse numerical order, and then tosses anything that isn't duplicated.  So now, we just finished "uniq -d" and the output so far is a list of unique numbers representing file sizes that were found more than once.  We take that list and turn it into a list of arguments, and for each of these sizes we search the whole (goddamn) directory tree for files of that size.  We print the full path to each one.  Now we hash each one with md5sum and sort the resulting list so that files with the same hash will be consecutive.  Finally, we eliminate any files in the list with unique hash values and write the ones that are repeated to the standard output.</p>
<p>Veeeeery nice... But I have a mac, and these commands are implemented differently on my system (which is FreeBSD?).  So here is the modified command:</p>
<p>FDUPESIN=/Volumes/LaCie/testfindup; MINBYTES=8 ; MD5S=md5file1; MD5SNFILES=md5file2; DUPFILES=dupfiles; find $FDUPESIN -not -empty -type f -ls | awk '{print $7}' | grep -e "[0-9]\{$MINBYTES,\}$" | sort -rn | uniq -d | xargs -I{} -n1 find $FDUPESIN -type f -size {}c -print0 | xargs -0 md5sum | sort -rn &gt; $MD5SNFILES ; awk '{print $1}' $MD5SNFILES | uniq -d &gt; $MD5S ; grep -f $MD5S $MD5SNFILES &gt; $DUPFILES ; cat $DUPFILES</p>
<p>It does more or less the same thing.  Here is a bit of explanation for the uninitiated.</p>
<p>The ; separator is just a separator so you can run all these commands in one line.</p>
<p>The | separator takes output from the left and feeds it as stdin to the one on the right.</p>
<p>The &gt; symbol takes the stdout from the command to the left and writes it to the file on the right.</p>
<p>The $ symbol precedes a variable.</p>
<p>Ok, here goes the breakdown:   The first 5 commands there are variable assignments, then we look in the directory tree rooted at $FDUPESIN, listing all things that are non-empty files.</p>
<p>awk '{print $7}', prints the 7th block of non-white characters from each file listing, which happens to be the size of that file in bytes.</p>
<p>grep -e "[0-9]\{$MINBYTES,\}$", tosses all files whose size has less than $MINBYTES digits (10mb, in this case).</p>
<p>We sort them and find files with the duplicated sizes and check the md5sums as before.</p>
<p>Now uniq on FreeBSD doesn't have the -w32 option, so we can't compare the first 32 characters (just the MD5 sums).  The rest of the script is just jumping through hoops to get around this, and writing the names and md5 sums of all these files to a file.  That way you can do something with the files afterward.</p>
<p>One last note:  You can use sed to drop the file names from the list of dup files:</p>
<p>sed -e"s/^.\{34\}//g"</p>
