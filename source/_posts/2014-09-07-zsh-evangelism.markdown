---
layout: post
title: "Zsh Evangelism"
date: 2014-09-07 14:29:24 -0700
comments: true
categories: ["zsh", "unix", "bash", "osx"]
---
After a decade of stubbornly sticking with `bash`, I've [changed shells](http://en.wikipedia.org/wiki/Chsh) to `zsh` and couldn't be happier with the decision. The only regret is in not having switched long before now.<!--more--> This was a `svn` => `git`[^1] sort of transition for me: *of course, I should've been using it all along!*

By way of evangelism, a few notes on my configuration:

### Prompt
It is much easier and cleaner to customize a `zsh` prompt than in `bash`. It also has a notion of an `RPROMPT` – the right-aligned prompt – which is excellent for supplementary directory information[^2].
{% img center /images/2014/zsh.png 700 'Zsh Prompt' %}

My prompt configuration can be found [here](https://github.com/dliggat/dotfiles/blob/master/zsh/05_prompt.zsh).

### Oh My Zsh!
Another advantage of switching to `zsh` is the ability to take advantage of [oh-my-zsh](http://ohmyz.sh), a set of plugins, helper functions, and themes for `zsh`. I'm not using any of the themes directly[^3], but the plugins are really nice, and provide, for example, tab completion for executables like `ruby`, `git`, etc.

### Dotfiles
I've structured my dotfile repository in a modular way: separating into various concern areas such as [aliases.zsh](https://github.com/dliggat/dotfiles/blob/master/zsh/03_aliases.zsh), [functions.zsh](https://github.com/dliggat/dotfiles/blob/master/zsh/04_functions.zsh), and so on. The top level `~/.zshrc` symlink-target consequently reduces down to a simple [script](https://github.com/dliggat/dotfiles/blob/master/zshrc); its only job is to set a few `zsh` options and then `source` the individual modules:

{% codeblock .zshrc: Shell Configuration lang:bash %}
#!/bin/zsh

setopt HIST_IGNORE_ALL_DUPS
setopt HIST_IGNORE_SPACE

export DOTFILES=$HOME/git/me/dotfiles
for zsh_config in `ls $DOTFILES/zsh/*.zsh | sort`  # Sort => source in order.
do
  source $zsh_config
done
{% endcodeblock %}

If, like me until recently, inertia still keeps you on `bash` – definitely give `zsh` a try. You won't regret it.

[^1]: Well, *any source control system* => `git`, really.
[^2]: In my case: `git` repository status and `ruby` version information as set by `rbenv`.
[^3]: My prompt is a custom version of the [gallois](https://github.com/robbyrussell/oh-my-zsh/blob/master/themes/gallois.zsh-theme) theme.
