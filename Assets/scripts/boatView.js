#pragma strict

var upside : Sprite ;
var sideone: Sprite;
var downside: Sprite;
var sidetwo : Sprite;

public var current : String;


function Start () {
	current = "upside";
}

function Update () {
}

function OnMouseDown(){
	if (current == "upside"){
   		GetComponent(SpriteRenderer).sprite = sideone;
		current = "sideone";
		}
	else if (current == "sideone"){
		GetComponent(SpriteRenderer).sprite = downside;
		current = "downside";
		}
	else if (current == "downside"){
		GetComponent(SpriteRenderer).sprite = sidetwo;
		current = "sidetwo";}
	
	else if (current == "sidetwo"){
		GetComponent(SpriteRenderer).sprite = upside;
		current = "upside";
		}
}

