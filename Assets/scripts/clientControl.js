#pragma strict

function Start () {

}

function Update () {

}


//var target : string;

function OnCollisionEnter2D (colInfo: Collision2D) 
{
	
	
	if (colInfo.collider.tag == "rock")
	{
		Debug.Log("I hit a rock!");
		var target = rigidbody2D.collider2D.gameObject;
	//	iTweenEvent.GetEvent(target, "flash").Play();	
	}
}
