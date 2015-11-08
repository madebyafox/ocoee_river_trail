#pragma strict
 
var torque : int = 0;

function OnTriggerEnter2D (coll: Collider2D) {
	coll.attachedRigidbody.AddTorque(torque);
}

function OnTriggerExit2D (coll: Collider2D) {
	coll.attachedRigidbody.AddTorque(0);
}
