#pragma strict

var xForce : int;
var yForce : int;

function OnTriggerEnter2D (hitInfo : Collider2D) 
{
	
	//hitInfo.collider2D.rigidbody2D.AddForce(new Vector2(xForce,yForce));
	Debug.Log(hitInfo.name + "entered me");
	//hitInfo.rigidbody2D.velocity.y = hitInfo.rigidbody2D.velocity.y + yAdd;
	//hitInfo.rigidbody2D.velocity.x = hitInfo.rigidbody2D.velocity.x + xAdd;
	Physics2D.gravity = new Vector2(xForce,yForce);
}
	
function OnTriggerExit2D (hitInfo: Collider2D)
{
	Physics2D.gravity = new Vector2(2,0);
}