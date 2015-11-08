#pragma strict
 

private var myChar : Rigidbody2D; 	//the current character
private var boat : GameObject;		//this character's parent game object
private var nodes: Vector3[];		//the array of path points
private var pathLength : int = 0;	//the number of points on the path
private var current : int=0;		//the index of the current path point
private var currPos : Vector2;		//the current vector2 position
private var nextPos : Vector2;		//the next vector2 position
private var upstream : float;
var speed : float = 1;
private var rotationSpeed : float = 1;

function Start() {
	
	//set the rotation speed for the boat
	if (speed > 0 && speed < 1) {rotationSpeed = speed * 2;}
	else if (speed >= 1 ) {rotationSpeed = speed * 0.25;}
	else if (speed == 0) {rotationSpeed = 1;}
 	//Debug.Log("speed " + rotationSpeed);
 	myChar = GetComponent(Rigidbody2D);		//get the current rigidBody
   	nodes = iTweenPath.GetPath("navPath");	//get the array of path points
  	pathLength = nodes.Length; 				//get the number of path points
  	
  	
  	//ALTERNATIVE 2: 
  	//Set the initial angle of the boat to be the vector difference to the second point [1], and put the boat on the first point
  	var targetDeg = Mathf.Atan2(Mathf.Abs((nodes[1].y-nodes[0].y)), Mathf.Abs((nodes[1].x-nodes[0].x))) * Mathf.Rad2Deg;
  	var targetVec = new Vector3(0,0,targetDeg);
  	//Debug.Log("the target Euler" + targetVec);
  	
  	//OVER four seconds, move the boat to the first node and first angle
  	iTween.MoveTo(gameObject,nodes[0],4);
  	iTween.RotateTo(gameObject, targetVec ,4);
	//Debug.Log("My position at node " + current + " is " + nodes[0]);

	current = 0; //we're now at point 0
}
  	
function Update(){

	if (current < pathLength-1){
	
	
		var dist : float = ( nodes[current+1] - transform.position ).sqrMagnitude;
		//Debug.Log(dist + " from "+nodes[current+1]);
		
		//ALTERNATIVE2: while the current position is upstream of the target, apply the vector in that position. When it is passed, apply the next vector
		currPos = myChar.transform.position;
		nextPos.x= nodes[current+1].x;
  		//nextPos.y= nodes[current+1].y;
  	
  		upstream = currPos.x - nextPos.x;	//get how far upstream the boat is
 		//Debug.Log("the difference between me and target is " + upstream);
 	
 		var changeVector : Vector2;
  	
 		if (upstream <= 0)
  		{
  			//Debug.Log("I'm UPSTREAM ");
   			changeVector = nodes[current+1] - transform.position;
			//Debug.Log("change Vector: "+changeVector);
			transform.rigidbody2D.AddForce(changeVector * speed);		
  		}   
  		else{
  		
  			//if (dist > 0.1){
  			//		Debug.Log("I'M ALMOST THERE");
  	   		//		changeVector = nodes[current+1] - transform.position;
			//		transform.rigidbody2D.AddForce(changeVector * speed);		
  				
  			//	} 
  			
  		//	else {
  				Debug.Log("I'm DOWNSTREAM ");
				current++;
		 		changeVector = nodes[current+1] - transform.position;
		 		var targetDeg = Mathf.Atan2(changeVector.y, changeVector.x) * Mathf.Rad2Deg;
  		 		var targetVec = new Vector3(0,0,targetDeg);
				iTween.RotateTo(gameObject, {"rotation":targetVec,"time":rotationSpeed, "easetype":"easeInSine"});
		//	}
  	 	}	
  	 }		
}
   		   		   		

 
 
 



