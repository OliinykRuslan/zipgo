
<?php
	error_reporting( E_ERROR );
		
	if (isset($_POST['name']))		{$name		= $_POST['name'];		if ($name == '')		{unset($name);}}
	if (isset($_POST['email']))		{$email		= $_POST['email'];		if ($email == '')		{unset($email);}}
	if (isset($_POST['schedule']))	{$schedule	= $_POST['schedule'];	if ($schedule == '')	{unset($schedule);}}

	if (isset($name) ) {
	$name=stripslashes($name);
	$name=htmlspecialchars($name);
	}
	if (isset($email) ) {
	$email=stripslashes($email);
	$email=htmlspecialchars($email);
	}

	$address="oliinykruslan@gmail.com";

	$note_text="Name : $name \r\n Email : $email \r\n";

	if (isset($name)  &&  isset ($schedule) ) {
		mail($address,$note_text,"Content-type:text/plain; windows-1251"); 
		echo "Your message has been sent!";
	}
	else echo 'Something went wrong, go back and try again!';

?>