<?php
} else {
 //показываем форму
 $name = $_POST['name'];
 $email = $_POST['email'];
 $name = htmlspecialchars($name);
 $email = htmlspecialchars($email);
 $name = urldecode($name);
 $email = urldecode($email);
 $name = trim($name);
 $email = trim($email);
 if (mail("oliinykruslan@gmail.com", "Заявка с сайта", "Name:".$name.". E-mail: ".$email ,"From: example2@gmail.com \r\n")){
 echo "Your message has been sent!";
 } else {
 echo "Something went wrong, go back and try again!";
 }
}
?>