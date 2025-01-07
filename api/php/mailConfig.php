<?php 

define('MAIL_HOST', 'smtp.gmail.com');
define('USERNAME', 'morpverse@gmail.com');
define('PASSWORD', 'cvmc nbko giaj yira'); // (maybe put to dotenv later)
define('SEND_FROM', 'morpverse@gmail.com');
define('SEND_FROM_NAME', 'Team MORP');
define('REPLY_TO', 'morpverse@gmail.com');
define('REPLY_TO_NAME', 'Team MORP');


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/../vendor/autoload.php'; 

function sendMail($to, $subject, $body) {

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->SMTPAuth = true;

    $mail->Host = MAIL_HOST;
    $mail->Username = USERNAME;
    $mail->Password = PASSWORD;

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(SEND_FROM, SEND_FROM_NAME);

    $mail->addAddress($to);
    $mail->addReplyTo(REPLY_TO, REPLY_TO_NAME);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AltBody = strip_tags($body);

    try {
        $mail->send();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        throw new Exception("Email could not be sent.");
    }

}

