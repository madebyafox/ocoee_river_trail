#pragma strict
 

private var myChar : Rigidbody2D;

 
function Start() {
   myChar = GetComponent(Rigidbody2D);
}
 
function Update () 
{

    if(Input.GetKey(KeyCode.Mouse0)) 
    {
			
			var clickPoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    		clickPoint.z = 0;
			//Debug.Log("Mouse click on " + clickPoint);
			
		 	//myChar.transform.position = clickPoint;
		 	
		 	// Determine the vector from your desired (ending) position and the game objects current position.
			var relativePos = clickPoint - transform.position ;

			// Move your game object using a rigid body force to get it moving in the right direction. 
			myChar.transform.rigidbody2D.AddForce(relativePos.normalized * 10f);
	}
}

