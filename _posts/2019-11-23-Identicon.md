---
layout: post
title: Identicon
minidesc: Write a word and get your own icon
thumbnail: icon_identicon.png
tags: [Misc, Hash, Downloadable, Icon generator]
---

After a year without coding in Javascript I spent my afternoon developing my own version of an identicon generator.
This is a small script that generates an icon from the hash of the input word. Just write your name and look what happens.
You can get a cool icon by clicking a bunch of times the "random" button. When you have the one you like, you can download it 
in .png with the "download" button

<script src="/assets/js/identicon.js">
</script>  
&nbsp &nbsp &nbsp &nbsp<canvas id="mcanvas" width="200" height="200" style="border:0px solid #000000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"></canvas>
<br><br><br>
<button onclick="generateRandom()">Random</button>
<input type="text" id="inputText" value="Albert" oninput="generateFromWord()">
<button onclick="download_image()">Download</button>

