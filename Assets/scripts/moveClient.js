#pragma strict



function Start () {
}

function Update () {

}



function OnMouseDrag()
    {

    var point : Vector3  = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    point.z = gameObject.transform.position.z;
    gameObject.transform.position.x = point.x;

        Screen.showCursor = false;

    }

    
function OnMouseUp ()
{
	Screen.showCursor = true;
	}











