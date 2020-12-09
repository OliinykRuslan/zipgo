
<?php
error_reporting( E_ERROR );
	
if (isset($_POST['name']))		{$name		= $_POST['name'];		if ($name == '')	{unset($name);}}
if (isset($_POST['email']))		{$email		= $_POST['email'];		if ($email == '')	{unset($email);}}
if (isset($_POST['schedule']))	{$schedule	= $_POST['schedule'];	if ($schedule == '')		{unset($schedule);}}

if (isset($name) ) {
$name=stripslashes($name);
$name=htmlspecialchars($name);
}
if (isset($email) ) {
$email=stripslashes($email);
$email=htmlspecialchars($email);
}

$address="oliinykruslan@gmail.com";

$note_text="Тема : \r\nИмя : $name \r\n Email : $email \r\n";

if (isset($name)  &&  isset ($schedule) ) {
mail($address,$note_text,"Content-type:text/plain; windows-1251"); 

echo "Уважаемый(ая) <b>$name</b> Ваше письмо отправленно успешно. <br> Спасибо. <br>Вам скоро ответят на почту  $email.";
}

?>