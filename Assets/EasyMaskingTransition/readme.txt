----------------------------------------------

Easy Masking Transition - Version 0.9
Copyright 2013- Ages three and app
email: info@agesthreeandapp.com

----------------------------------------------
How to use it:
----------------------------------------------

1. drag and drop the "Presets/EMTransition - Color" or "Presets/EMTransition - Image" to your scene.
2. edit in inspector window.
3. add JS/C# script and write "OnTransitionComplete()" to launch at the end of the transition.

----------------------------------------------
API
----------------------------------------------

function OnTransitionStart() : void
launch at the beginning of the transition
(When Preview Mode is true, it doesn't call)

function OnTransitionComplete() : void
launch at the end of the transition
(When Preview Mode is true, it doesn't call)

function EMTransition.play() : void
if playOnAwake is false, you need to call play() to start transition.

----------------------------------------------
Tips
----------------------------------------------

If you would like to use multiple transitions, you should duplicate materials.
