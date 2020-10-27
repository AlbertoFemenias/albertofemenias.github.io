---
layout: post
title: Pokepuzzle generator
minidesc: Random generated puzzles to solve
thumbnail: icon_pokepuzzle.jpg
tags: [Games, Puzzle, Pokemon, Playable, Algorithm]
---

When I was a kid I used to play a GBA game called Pokemon Emerald. In this game, when you got to the 8th GYM you had
to solve a puzzle very similiar to this one I just made. The idea of creating this puzzle algorithm generator came to
me the other day when I downloaded a casual games App on my smartphone and the game was to solve puzzles like the 
ones I made here. This App had the puzzles already in it, they where handmade by a lousy programmer and even the
"difficult" ones where very easy for me. After wasting some time with this crappy puzzles I decided that I would make
a puzzle generator that would satisfy my need for difficult puzzles.

**Instructions:** Click EASY button to generate easy puzzles or HARD button for difficult ones. Use the arrow keys to 
move the player around the map, when all tiles have been stepped on you have won. 
All puzzles are solvable but some ones may require you to chose the right path, otherwise you will not be able to come
back to that step and complete the hole puzzle.

<br>
<script src="/assets/js/pokepuzzle.js"> </script>  

<div align="center">
<canvas id="gc" width="480" height="480"></canvas>
<br>
<br>
<button type="submit"  onClick="refreshPage()">Easy</button>
<button type="submit"  onClick="hard()">Hard</button>
</div>
