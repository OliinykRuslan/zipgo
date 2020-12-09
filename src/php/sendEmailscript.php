<?php
	ini_set("SMTP", "localhost");
	ini_set("smtp_port", "25");
	ini_set("sendmail_from", "");
	$to = "gaurav@zipgo.in";
	$subject = "New reques";
	$name = $_POST['nameBody'];
	$body = $_POST['emailBody'];
	$headers = "From: Zipgo\r\n";
	// $headers = "Content-Type: text/html;charset=utf-8\r\n";
	if( mail($to, $subject, $name, $body, $headers) )
		echo "Your message has been sent!";
	else
		echo "Something went wrong, go back and try again!";
?>