#pragma strict
 
var constantSpeed: float = 15;
 
private var myChar: CharacterController;
private var dir:Vector3;
private var targetDistance:float;
private var targetPosition:Vector3;
 
function Start() {
    myChar = GetComponent(CharacterController);
    targetPosition = transform.position;
    Debug.Log("I'm at "+targetPosition);
    
}
 
function Update () {
 
  targetDistance = Vector3.Distance(targetPosition, transform.position);
 
    if(Input.GetKey(KeyCode.Mouse0)) {
    
    
    var clickPoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    clickPoint.z = 0;
	Debug.Log("Mouse click on " + clickPoint);
  
    
    myChar.transform.position = clickPoint;
      
        
           }
    
    /*    var playerPlane = new Plane(Vector3.up, transform.position);
        var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
        var hitdist = 0.0;
 
        if (playerPlane.Raycast (ray, hitdist)) {
            targetPosition = ray.GetPoint(hitdist);
        }
    }
    
    dir = transform.TransformDirection(targetPosition - transform.position);
    
    if(targetDistance > 1) {
		character.Move(dir.normalized * Time.deltaTime * constantSpeed);
	}
	
    dir.y = 0;
    */
}

