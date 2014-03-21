---
layout: post
title: "A Robust Photo Workflow"
date: 2014-03-20 21:11:09 -0400
comments: true
categories: [ "OS X", "iOS", "iPhoto", "photos", "exiftool", "ruby", "Dropbox", "Google Drive" ]
description: My post-iPhoto camera and photograph workflow.
---
With the proliferation of smartphones, most people now have an excellent camera with them at all times, and are taking many more photographs per year than ever before.<!--more-->

However, the current state of photo management on contemporary desktop and mobile operating systems is, frankly, abysmal. Apple, previously the standards-bearer in this arena through the mid-2000s with their [digital hub](http://www.youtube.com/watch?v=9046oXrm7f8) strategy, seems to have lost interest in maintaining iPhoto and Aperture as serious photo asset management tools[^1]. Adobe Lightroom is expensive, complex and unnecessary for most non-professional purposes. Everpix, sadly, [failed](http://www.theverge.com/2013/11/5/5039216/everpix-life-and-death-inside-the-worlds-best-photo-startup) to build a business around photo management.

### Requirements
So what's the answer? I wanted a way to manage my past and future photos with the following characteristics:

1. Every photo in my collection (over 10,000 and counting since 2003), and every photo I take from now on, should be preserved by default in an archive with its [metadata](http://en.wikipedia.org/wiki/Metadata) intact.
2. This archive should have a robust local and offsite backup strategy - photographs are irreplaceable, and their value to the creator increases with time.
3. This archive should be as futureproof as possible - I want to be able to view my photos at any point in the future regardless of device, machine migration, etc.
4. I should have the ability to view any photo in my collection from a mobile device, i.e. my iPhone or iPad, without having it cached locally.
5. It should be painless and hassle-free to add new photos into the archive, and thus the backup process.

Inspired by [Federico Viticci](http://www.macstories.net/tutorials/my-photo-management-workflow-early-2014/), I've migrated my photo library to a new system and ongoing process that works really well for me.

### iPhoto => Files & Directories
Requirement 3, at a stroke, entirely disqualifies database-based applications[^2] like iPhoto. As my accumulated photo library was sitting in the increasingly-creaky iPhoto, the first step was to export the original `.jpg` files. The archive is therefore maintained as a set of files and directories going forward, and is thus highly future-proof.

The single most critical piece of metadata about a photograph is its creation date. Without this, it is inordinately difficult to find a particular photo, or preserve a sense of the original chronology of a series.

Unfortunately, file system metadata is insufficient as a repository for this signal. Machine migrations, underlying file system changes, and general [bit rot](http://en.wikipedia.org/wiki/Software_rot) conspire to render this inadequate and fragile. Therefore, it makes sense to encode a photograph's creation date, available in the exif data, right inside its filename.

[Exiftool](http://www.sno.phy.queensu.ca/~phil/exiftool/), available in [Homebrew for OS X](http://brew.sh/) is a great way to achieve this. After exporting from iPhoto, I was able to rename each file:

    exiftool "-FileName<CreateDate" -d "%Y-%m-%d_%H-%M-%S%%-c.%%le" export

### Binning the Files
The above operation resulted in a directory with 10,000 `.jpg` files with an [ISO8601](http://en.wikipedia.org/wiki/Iso8601#General_principles)-like filename, e.g.: `2011-02-03_16-12-11.jpg`. A bit unwieldy, but chronological and consistent. The next step was to separate these files by month, which I accomplished with a simple bit of Ruby (original on [GitHub][ruby]):

{% codeblock photo_bin.rb: A ruby script to bin photos by year-month directories lang:rb %}
Dir.glob "#{root_dir}/*.jpg" do |file|
  match = /.*?(\d\d\d\d)-(\d\d)-\d\d_\d\d-\d\d-\d\d.*\.jpg$/.match file
  raise ArgumentError.new "File did not match: #{file}" unless match

  year           = match[1]
  month          = match[2]
  month_abbr     = Date::MONTHNAMES[month.to_i][0..2]
  photo_dir_name = "#{year}-#{month}-#{month_abbr}"
  photo_abs_dir  = File.join root_dir, photo_dir_name
  abs_file       = File.expand_path file

  Dir.mkdir photo_abs_dir unless Dir.exist? photo_abs_dir
  FileUtils.mv abs_file, photo_abs_dir
end

{% endcodeblock %}

### Storage, Backup, Viewing
I decided that the best place to actually store this [so-far] 55GB archive was on Google Drive. This has a few benefits:

* __Cheap__: At $2 per month for 100GB of storage as of the [recent price drop](http://googleblog.blogspot.ca/2014/03/save-more-with-google-drive.html), it's hard to argue with the price.
* __Local and Offsite Backup__: These files live locally in `~/GoogleDrive` and therefore get subsumed into my wireless home network backups, but also have a disaster-mitigating copy on the cloud.
* __Mobile Viewing__: The iOS Google Drive app has quietly become a really high-quality piece of iOS software. It's a capable photo viewing app, and easily satisfies the mobile-viewing requirement (though I'd like to see [Unbound](http://unboundapp.com/) support it eventually also).

{% img center /images/2014/gd.png 600 'Google Drive' %}

### Dealing with New Photos
All of this so far covers requirements 1 through 4 splendidly. However, it's all a bit pointless if new photos aren't subsumed into this system on a hassle-free, ongoing basis. The final puzzle piece is also the most convoluted, but so far it seems to be holding up nicely:

1. Take advantage of Dropbox's Camera Upload[^4] functionality to send new photos over WiFi from my iPhone to the `~/Dropbox/Camera Uploads` directory on my Mac. This will happen in the background occasionally without any intervention from me, or I can trigger it manually whenever I want. Of course, `.jpg` files from other cameras can be placed here also[^3].
2. Use [Hazel](http://www.noodlesoft.com/hazel) to watch that directory and segregate iOS screenshots (no need to archive those) and videos (I'm still deciding how they should be handled), and then rename all `.jpg` files to the ISO8601-style format above. In this case, given the recency, it is reasonable to rely on the file metadata to encode the creation date in the filename.
3. Again with Hazel watching that directory, send those renamed files to `~/GoogleDrive/Photos`.
4. Another Hazel rule watching `~/GoogleDrive/Photos` will "sort into subfolders" and place each file into its appropriate year-month directory (e.g. `2014-03-Mar`), creating that directory if necessary.

{% img center /images/2014/hazel.png 600 'Hazel' %}

That's it! The archive is consistent, future-proof, viewable and has a strong backup-strategy - and all new photos from now on have a frictionless pathway into it.

While I'm happy with this system for me (and eventually I'll roll it out to my family) Apple, Google, Microsoft, et al really need to solve this problem for their customers. Photos are precious, and people, as a rule, are far worse at ensuring the longevity of bits than paper.

[ruby]: https://gist.github.com/dliggat/9677631

[^1]: They were never very good, anyway.
[^2]: It is generally a bad idea to rely on these type of programs if you care about accessing your data in the distant future. It will likely be difficult, or at best inconvenient, to read a circa-2014 iPhoto library in 2024. I make an [exception](http://liggat.org/2013/07/21/paperless/) in the case of Evernote.
[^3]: So far this doesn't really apply, as the only camera I use is my iPhone 5s. I hung up my SLR a few years ago.
[^4]: Ideally I wouldn't be relying on two separate cloud-storage providers, but the combination of Google Drive pricing and Dropbox functionality is compelling. Future changes will be easy, anyhow, depending on how the storage market evolves.
