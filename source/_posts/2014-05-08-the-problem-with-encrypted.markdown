---
layout: post
title: "The Problem with 'encrypted'"
date: 2014-05-08 10:04:40 -0400
comments: true
published: false
categories:
---
It seems to me there is a problem, among software professionals generally, and especially so among the wider public and in the media, with the term '*encrypted*'. What is precisely meant when a connection, piece of data, etc is described as *encrypted*? I posit that the typical use of this word has a tendency to obfuscate the issues surrounding **actual privacy and secrecy**.

Consider a statement like '

*Disclaimer: I'm not an infosec professional[^1], so it's entirely possible my premises/conclusions/language are incorrect in places. It's also possible that this whole thing is a known issue in the infosec community, in which case it will already have received far better treatment elsewhere. A verison of this has existed in my brain for some time now, and if nothing else, writing it down may provide greater clarity (to me).*

### Encryption Scenarios
It seems to me that the adjective is applied to at least the following scenarios:

1. An encryption algorithm was applied (with no further details given)
2. Symmetric encryption was applied and both Alice and Bob possess the key
3. Symmetric encryption was applied; only Alice possesses the key and Bob is just an intermediary for the enciphered data
4. Public-key cryptography was used in order that Alice could securely send a message to Bob without a pre-existing shared key
5. Public-key infrastructure was used alongside public-key cryptography in order that Alice could securely send a message to Bob without a pre-existing shared key, and furthermore have a large degree of confidence that only the actual human Bob could decipher that message

### Implementations Details Matter, Incredibly So
As if the vagueness here wasn't bad enough - to say something was *encrypted* tell us nothing about the **expected consequent privacy**, because that depends in large part on the technical decisions that underlie the encryption, including, but by no means solely the following:

* How was the encryption key derived?
* How is it stored?
* How easy would it be to brute-force this key, assuming access to the ciphertext?
* What encryption algorithm was used?
* Who signed the public key (in the case of asymmetric encryption)?
* What is the source of entropy for the algorithm and is it cryptographically secure?

A bad decision made at any of these or other steps may mean that the encryption is functionally useless at *prohibiting access by an unauthorized party* – which is of course ultimately the thing we care about.

By way of example: I can choose to [symmetrically] *encrypt* the sentence[^2]:

    THE ESSENCE OF THE INDEPENDENT MIND LIES NOT IN WHAT IT THINKS, BUT IN HOW IT THINKS

Resulting in the following ciphertext:

    GUR RFFRAPR BS GUR VAQRCRAQRAG ZVAQ YVRF ABG VA JUNG VG GUVAXF, OHG VA UBJ VG GUVAXF

But in what meaningful sense is this *encrypted*? Yes, an encryption algorithm was applied. However, I used an ultra-naive algorithm – the Caesar cipher, and the space of possible keys is tiny. Generating all possibilities is an absolutely trivial task.



[^1]: I believe I have the adequate infosec foundational knowledge as a software engineer to do two things: (1) detect bullshit, and (2) know how to ask the right questions of actual infosec professionals. Infosec is a vast, complex field and its practitioners engage in a vocation of sorts. If you have actual infosec needs - you absolutely **need** these dedicated professionals involved.
[^2]: A Hitchens quote - one of my [late] heroes.
