---
layout: post
title: "Simulating the Birthday Paradox"
date: 2013-10-13 10:59
comments: true
categories: math ruby software
---
Probability theory is a pretty special branch of mathematics in the sense that it is (1) highly applicable to daily life; (2) many of its results are easily comprehensible to most people; and yet despite this (3) it remains a profoundly complex area of mathematical inquiry[^1].<!--more-->

An example which perfectly encapsulates this is the [birthday paradox](http://en.wikipedia.org/wiki/Birthday_paradox). In short, it can be represented by the question:

> With a group of `N` randomly chosen people, how large does `N` need to be so that there's a 50% chance of a shared birthday within the group?

The birthday paradox is a great opportunity to use some basic computation as an exploratory tool. I think more people should have the ability to use this.

### Finding N

The group size is clearly less than or equal to 365. Above 365, we know with 100% certainty that there's a shared birthday somewhere[^2]. Intuition (or at least my intuition before I knew the answer) usually suggests that the 50% probability threshold value for N is probably at or around the 100-150 mark. In other words, we might guess that you need 100-150 people in the group before the probability of a shared birthday is equal to a coin flip.

It turns out that's a gross overestimate. The actual value is **staggeringly lower** than people tend to guess:

> With a group size of 23 people, the probability that two people share a birthday is ~= 50.36%.

This is a pretty astonishing result. It is, of course, provably true by an [analytical argument](http://en.wikipedia.org/wiki/Birthday_paradox#Calculating_the_probability), but it is actually far easier to convince oneself of its trueness with a simple computational exercise (full version on [GitHub](https://gist.github.com/dliggat/6963840)):

{% codeblock birthday.rb: Simulate the birthday paradox lang:rb %}
#!/usr/bin/env ruby

def shared_birthday?(group_size)
  # Generate an array with size `group_size`, and randomly assign every member a birthday.
  # Return true if two members share a birthday; else return false.
  counter   = Hash.new 0
  birthdays = group_size.times.map { rand 365 }
  birthdays.each do |birthday|
    counter[birthday] += 1
    return true if counter[birthday] > 1
  end
  false
end

def run_birthday_trials(group_size, trial_count)
  # Run the shared_birthday? experiment `trial_count` times.
  # Return the number of experiments which resulted in a shared birthday.
  successes = 0
  trial_count.times { successes += 1 if shared_birthday? group_size }
  successes
end

run_birthday_trials 23, 1000
{% endcodeblock %}

This very simple code runs a series of birthday-paradox experiments - within each trial, it generates a group of people, and tests for the presence of a shared birthday. By doing this repeatedly, a thousand times in this case, we can approximate the actual probability of a shared birthday with a particular group size.

### Why Bother Sharing This?

To any mildly-capable programmer[^3], none of this is particularly interesting or novel. Many of us in this line of work have a pretty decent mathematical background, and have done all sorts of these little simulation exercises in the past, both academically and professionally.

However, it is my firm belief that a great many people could stand to benefit if the ability to use basic computational principles and tools were more widely disseminated. Windows and OS X machines ship with browsers with full JavaScript runtimes; Ruby and Python runtimes *ship* with OS X, and can easily be added to Windows. The tools of exploratory computation are everywhere - but very few people were ever given the knowledge to use them. This could be easily remedied by offering basic Computer Science in high school, either on its own, or as part of a math or science class. This might be the case today for all I know, but my own experience on that front was not encouraging[^4].

To anyone even moderately interested in the vast possibilities that are unlocked with a bit of computational knowledge, I strongly encourage you to check out [Code Academy](http://www.codecademy.com/) or [Project Euler](http://projecteuler.net). Of all of Steve Jobs' various witty and insightful aphorisms, the notion that a computer is a *bicycle for the mind* has always struck me as especially apt.

[^1]: Unlike, say, [real analysis](http://en.wikipedia.org/wiki/Real_analysis), which has zero applicability to daily life and is not comprehensible by most people, including myself.
[^2]: By the [pigeonhole principle](http://en.wikipedia.org/wiki/Pigeonhole_principle): If we have 365 pigeonholes into which we place 366 objects, at least one pigeonhole must contain more than one object.
[^3]: [FizzBuzz](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html), as ever, remains a cautionary tale about our industry.
[^4]: Around the time I was in grade 11 and 12, Computer Science was *dropped* as an offering at my high school. Yes, *dropped*. Lack of demand; lack of staff to teach it. University was thus my first opportunity to gain exposure to computation as an academic/professional field.
