#pragma strict
 
var x : float = 0;
var y : float = 0;

function OnTriggerEnter2D (coll: Collider2D) {
	
}

function OnTriggerStay2D (coll: Collider2D) {
	var pos = new Vector2(x,y);
	coll.attachedRigidbody.AddForce(pos);
}

