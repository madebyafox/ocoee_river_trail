#pragma strict

var xAdd : int;
var yAdd : int;
var additive : int;
var drag: int;

function OnTriggerEnter2D (hitInfo : Collider2D) 
{
	//hitInfo.collider2D.rigidbody2D.AddForce(new Vector2(xForce,yForce));
	Debug.Log(hitInfo.name + " entered me");
	if (additive == 1)
	{ 
		hitInfo.rigidbody2D.velocity.y = hitInfo.rigidbody2D.velocity.y + yAdd;
		hitInfo.rigidbody2D.velocity.x = hitInfo.rigidbody2D.velocity.x + xAdd;
	}
	else	
	{
		hitInfo.rigidbody2D.velocity.x = xAdd;
		hitInfo.rigidbody2D.velocity.y = yAdd;
	}
	hitInfo.rigidbody2D.drag = drag;	
}
	
	