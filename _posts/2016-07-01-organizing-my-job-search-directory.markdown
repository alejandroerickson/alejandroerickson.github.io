---
layout: post
comments: true
title: 'Organizing my Job Search Directory'
date: 2016-07-01T16:05:07+01:00
---


As I prepare for the most important job-search of my career thus far, I am faced
with the problem of organising all the directories and files that will factor
into it. There are versioned copies of my CV and cover letters, old
applications, reference letters and student evaluations, advice and leads from
other people, and even shell scripts to help set-up new application directories.

With all this stuff floating in disarray around my Job Search directory, I am in
danger of being bogged down and distracted with managing it when the time comes
to build specific applications.

#### Organisation and automation lets me focus on the job applications ####

My technical requirements are as follows:

  * Versioned CV, résumé, cover letter.
  * New job prospects can be added and categorised efficiently.
  * Records of my work and reference letters are readily accessible.
  
The directory structure shown below suits my needs.

```
   - prospects (job prospects and applications. 
       dir name format for each job 
       <deadline in iso date format>-<title> or open-<title>)
     - interested
       - 2016-12-21-example-title
         - file: readme.org
         - submitted-materials
     - submitted
     - in-progress
     - not-interested
   - sandbox
   - file: readme.org
     - leads, notes, todos, etc
   - meta-resources (such as scripts and CV styles I'm trying out)
   - cv-git (résumé, CV, publication list and other long-term curated
     documents.)
     - cl (cover letters for each position.)
       - file: EricksonCL-example-title.tex
   - records (records and reviews of my work and impact)
     - reference letters
     - student evaluations
   - archive
     - prospects-pre-2016 (and similarly named directories)
       - uncategorised
       - interested
       - submitted
       - in-progress
       - not-interested
```

Most of this only needs to be created once, or once in a while, but I would like
to automate the creation of a new directory ready to start editing résumé when I
come across an interesting job. **The barrier to starting a job application
needs to be as low as possible.** I want to pass the job's deadline and title to
a script and immediately add a new directory structure to `prospect/`.

Here is a bash script that does that for me when I call it from the root
job-search directory.

```
#!/bin/bash
ARGUMENTS="<application deadline> <job prospect title>"
if [ $# -ne 2 ] || [ $1 = "help" ] || [ $1 = "h" ] || \
       [ $1 = "-h" ] || [ $1 = "--help" ]
then
    echo ""
    cat <<EOF
Help!
Arguments: ${ARGUMENTS}
This script:
Creates the directory './prospects/<application deadline>-<job prospect title>'
Creates the directory './prospects/<application deadline>-<job prospect title>/resources'
Creates the directory './prospects/<application deadline>-<job prospect title>/submitted-materials'
Creates './prospects/<application deadline>-<job prospect title>/README.org'
Creates './cv-git/cl/EricksonCL-<job prospect title>.tex'
Date format example 2016-12-31
<job prospect title> should contain only alpha-numeric characters or '-'
EOF
    exit
fi

# Check for illegal characters
re='^[a-zA-Z0-9\-]*$'
if ! [[ ${1}-${2} =~ $re ]] ; then
    echo Arguments given: ${1}-${2}
    echo "Invalid characters in arguments.  See ${0} help"
fi

echo ${1}-${2}

if [ -d prospects/${1}-${2} ]; then
    echo "Directory exists, exiting"
    exit 1
fi


if [ -f cv-git/cl/EricksonCL-${2}.tex ]; then
    echo "Cover letter file exists, exiting"
    exit 1
fi

mkdir -pv prospects/${1}-${2}/resources
mkdir -pv prospects/${1}-${2}/submitted-materials
touch prospects/${1}-${2}/README.org
touch cv-git/cl/EricksonCL-${2}.tex

echo Completed successfully
if hash tree 2>/dev/null; then
    echo "Created:"
    tree prospects/${1}-${2}
fi
```

So how do I organise `cv-git` itself? That will have to wait for another post,
but I'll give a hint: My [résumé]({{site.baseurl}}/cv/EricksonResume.html) is
composed in markdown.

#### Update: I no longer branch my git repository for each job. The post has been updated ####
