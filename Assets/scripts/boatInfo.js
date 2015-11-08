//------------------------------------------------------------------------------------------------
//boatInfo.js
//ARF	4.16.14
//Primary logic controller for collision decisions
//------------------------------------------------------------------------------------------------

//TODO: add logic to account for increased chance of swim after multiple flips in same rapid


#pragma strict

var health : int;
var stability : int;
var skill: int;
var rollability : int;
var roll: int;

//input values for boat animation
var upside : Sprite;
var sideside: Sprite;
var downside: Sprite;

//input values for gampeplay timing
var hitDelayInterval : float ; //subsequent collisions within interval (seconds) are ignored
var flipDelayInterval : float ; //delay interval (seconds) before roll/swim decision is made

//initialize variables for use in hit timing
private var hits : int = 0;
private var handledHits: int = 0;
private var numRolls: int = 0;
private var lastHit : float = 0;
private var interval : float = 0;
private var numFlips : float = 0;
private var isSwimming : int = 0;
private var isFlipped : boolean = false;


//--------------------------------------------------------------------------------------------------------------------
//[game object].OnCollisionEnter2D(coll: Collision2D) 
//ARF 4.21.14
//
//Automatically triggered when the actor collides with a 2D rigidbody. Logic determines if the collision is detected
//or ignored, and the consequences of the collision on the actor 
//
//INPUT: Collision2D object being collided with
//RETURN: empty true/false --> execution of functions demonstrate feedback
//FEEDBACK:  
// >Multiple hits in less than [1.5s] interval are ignored, indicating collision events are not always discrete
// >When client collides with object, they may flip or bounce off
// >When client flips, they may roll or swim
//--------------------------------------------------------------------------------------------------------------------
function OnCollisionEnter2D(coll: Collision2D) 
{
	hits = hits + 1;
	interval = Time.time - lastHit;
	//Debug.Log(hits + " hit at " + interval + "since last");
	
	//IGNORE HIT
	//IF this is not our first hit and our last hit was less than 1.5 seconds ago 
	//OR if we are already swimming
	//ignore this hit (improves gameplay)
	if ( (hits > 1) && (interval < hitDelayInterval) || (isSwimming == 1) || (isFlipped == true) ) {
	}
	
	//HANDLE HIT
	else {
		lastHit = Time.time; //set the time for this hit
		handledHits ++;
		//var pointTrigger = coll.gameObject.AddComponent(Point); //Add UI component to display results of hit
		var pointTrigger = gameObject.AddComponent(Point); //Add UI component to display results of hit
	
		//TODO: TRY TO UPDATE THE NUM OF HITS
				
		var score = GameObject.Find("GUIcontroller/SideBarLayer/SideBar/1ClientScore/riverHits");
		score.GetComponent(blindGUIText).m_text = handledHits.ToString();
		
		var bounce : boolean = flipOrBounce(coll);
		
		
		if ( bounce == false ) {	 
			//If the client has flipped, update the UI
			numFlips = numFlips + 1;
			
			pointTrigger.Point = "flip";
			GetComponent(SpriteRenderer).sprite = downside;
			isFlipped = true; 
			//Debug.Log("I flipped");
			
			var roll : boolean = swimOrRoll(coll);
			
			//now see if they swim
			if (roll == false){
				yield makeSwim(coll);  //the client has swam ... boo :-(
				isSwimming = 1; //set the swimming var so the boat can't be affected by collision again
			}
			
			else if (roll == true){
				yield makeRoll(coll); //the client has rolled ... WOOT WOOT :-D
			}
		}			
		else if (bounce == true) {								
			//They did not flip, update the UI
			pointTrigger.Point = "bounce";
			//Debug.Log("I bounced!");
		}
	}																										
}


function makeSwim (coll: Collision2D) {
	// suspend execution for 5 seconds
	yield WaitForSeconds (flipDelayInterval);
	var pointTrigger = gameObject.AddComponent(Point); //Add UI component to display results of hit
	pointTrigger.Point = "SWIMMER!";
}


function makeRoll (coll: Collision2D) {
	// suspend execution for 5 seconds
	yield WaitForSeconds (flipDelayInterval);
	var pointTrigger = gameObject.AddComponent(Point); //Add UI component to display results of hit
	pointTrigger.Point = "ROLL!";
	GetComponent(SpriteRenderer).sprite = upside;
	isFlipped = false; 
	numRolls ++;
	var score = GameObject.Find("GUIcontroller/SideBarLayer/SideBar/1ClientScore/riverRolls");
	score.GetComponent(blindGUIText).m_text = numRolls.ToString();
}


//--------------------------------------------------------------------------------------------------------------------
//boatInfo.calcSum (sumType: String):Vector2
//ARF 4.16.14
//
//Calcuates the client's situational status depending on the relevant factors (indicated by input
//string designating the decision type) and the values of the factors. 
//
//INPUT: Accepts a String object specifying the type of decision to be determined
//RETURN: Vector value representing the client's situational status at the time of flip, and 
//outlier indicator (1=always, 2 = never)
//FEEDBACK:  
// >Health, skill and stability are relevant for determining if the client flips on collision
// >Health, skill and roll are relevant for determining if the client rolls when the flip
//--------------------------------------------------------------------------------------------------------------------
function calcSum(decType: String):Vector2
{
	var total : int;
	var outlier : int = 0;

	if (decType == "flip"){
		total = health + skill + stability;
		
		if ((stability + skill) <10) {outlier = 1;} //always flip; guide has not sufficiently mitigated client weakness
		if ((stability <= 1) || (skill <= 1)) {outlier = 1;} //always swim ; edge case for testing boats
		if (skill == 10) {outlier = 2;} //never flip ; escape path for guides to never flip
		
	}
	else if(decType == "swim"){
		total = health + rollability + roll;
		
		if ((rollability + roll) <10) {outlier = 1;} //always swim; guide has not sufficiently mitigated client weakness
		if ((roll <= 1) || (rollability <= 1)) {outlier = 1;} //always swim; edge case for testing boats
		if (roll == 10) {outlier = 2;} //never swim ; escape path for guides to never roll

	}
	var status = new Vector2(total, outlier);
	return status;
}


//--------------------------------------------------------------------------------------------------------------------
//boatInfo.fliporBounce (coll: Collision2D
//ARF 4.16.14
//INPUT: Accepts a Collision2D object
//RETURN: TRUE if object flips; FALSE if object bounces
//FEEDBACK: 
// >Poorly skilled clients should not be assigned to low stability boats
// >Low values for client health, skill and boat stability result in higher rate of flip 
//--------------------------------------------------------------------------------------------------------------------
function flipOrBounce(coll: Collision2D)
{
	//TODO: Add additional logic to chance percentages based on collision with different object types
	//if (coll.gameObject.tag == "rock")
		
	//SET variables  
	var results = calcSum("flip");
	var sumTest =results.x;  		//the sum of all  factors for the flip decision [0-30]
	var outlier = results.y;		//indicator if there were outliers causing definite outcome 1= flip, 2= no flip)
		
	//IF - ELSE IF - ELSE
	//if(check for outliers always resulting in flip)
	//elseif(check for edge case allowing guide and safety boaters to never flip)
	//else(execute logic to determine probability of flip)
	//FEEDBACK: Poorly skilled clients should not be assigned to low stability boats
	if (outlier == 1){
		//Debug.Log("definitely flip");
		return false;
	}
	else if (outlier == 2) {
		//Debug.Log("definitely don't flip!");
		return true;
	}
	else {	
		var chance : int;
		var coin = Random.Range(0,100); //get a random number from 0-100
		//SET likelihood threshold for flipping
		if (sumTest < 10) {chance = 90;}
		else if (sumTest < 15) {chance = 50;}
		else if (sumTest < 22) {chance = 25;}
		else if (sumTest < 30) {chance = 05;}
		Debug.Log("handled hits: "+handledHits);
		chance = chance + handledHits; //increase the chance of flipping if the number of hits is higher
		
		Debug.Log("FLIP? sum: " + sumTest + " random: "+ coin + " "+chance+" % flip");
			
		//if the random number generated is greater than the threshold then the client does not flip
		if (coin > chance) {return true;} //client bounces, does not flip :-)
		else return false; //client flips :-(
	}			
}
	

//--------------------------------------------------------------------------------------------------------------------
//boatInfo.rollOrSwim (coll: Collision2D
//ARF 4.21.14
//INPUT: Accepts a Collision2D object
//RETURN: TRUE if object rolls; FALSE if object swims
//FEEDBACK: 
// > clients with poor rolls should not be assigned to boats with low rollability
// >
//--------------------------------------------------------------------------------------------------------------------
function swimOrRoll(coll: Collision2D)
{
	//return true;
	//SET variables  
	var results = calcSum("swim");
	var sumTest =results.x;  		//the sum of all  factors for the flip decision [0-30]
	var outlier = results.y;		//indicator if there were outliers causing definite outcome 1= flip, 2= no flip)
		
	//IF - ELSE IF - ELSE
	//if(check for outliers always resulting in flip)
	//elseif(check for edge case allowing guide and safety boaters to never flip)
	//else(execute logic to determine probability of flip)
	//FEEDBACK: Poorly skilled clients should not be assigned to low stability boats
	if (outlier == 1){
		//Debug.Log("definitely swim");
		return false;
	}
	else if (outlier == 2) {
		//Debug.Log("definitely don't swim!");
		return true;
	}
	else {	
		var chance : int;
		var coin = Random.Range(0,100); //get a random number from 0-100
		//SET likelihood threshold for flipping
		if (sumTest < 7) {chance = 95;}
		else if (sumTest < 14) {chance = 50;}
		else if (sumTest < 22) {chance = 20;}
		else if (sumTest < 30) {chance = 5;}

		chance = chance + (numFlips*10); //increase the chance of flipping if the number of previous flips is higher

	//	Debug.Log("SWIM? sum: " + sumTest + " random: "+ coin + " "+chance+" % swim");
			
		//if the random number generated is greater than the threshold then the client does not swim
		if (coin > chance) {return true;} //client rolls, does not swim :-)
		else return false; //client swims :-(
	}
}	

	





