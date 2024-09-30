<?php
    /*
    $to      = 'bevizlaci@gmail.com';
    $subject = 'Teszteles';
    $message = 'hello';
    $headers = 'Morp register Test';
    
    mail($to, $subject, $message, $headers);
    */

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        echo $name . ' ' . $email . ' ' . $password;
    }
?>