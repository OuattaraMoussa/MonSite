<?php

// N'accepter que les envois via POST provenant du formulaire
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Récupération + nettoyage des champs (?? '' évite les warnings si un champ manque)
$nom     = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation minimale
if ($nom === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Veuillez remplir correctement tous les champs.";
    exit;
}

// Anti-injection d'en-têtes : on retire tout retour à la ligne des champs courts
$nom   = str_replace(array("\r", "\n"), ' ', $nom);
$email = str_replace(array("\r", "\n"), ' ', $email);

// Le corps est envoyé en HTML : on échappe le contenu utilisateur et on garde les sauts de ligne
$messager = "<strong>Nom :</strong> " . htmlspecialchars($nom, ENT_QUOTES, 'UTF-8') . "<br>"
          . "<strong>Email :</strong> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "<br>"
          . "<strong>Message :</strong><br>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'ouattware@gmail.com';                     //SMTP username
    $mail->Password   = 'eubb nzta kbqv wtau';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    // L'expéditeur doit être l'adresse authentifiée (Gmail réécrit sinon le From)
    $mail->setFrom('ouattware@gmail.com', 'Site Ouattware');
    $mail->addAddress('ouattware@gmail.com');            //Destinataire : vous
    $mail->addReplyTo($email, $nom);                     //Répondre directement au visiteur

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Nouveau message depuis le site — ' . $nom;
    $mail->Body    = $messager;
    $mail->AltBody = "Nom : $nom\nEmail : $email\nMessage :\n$message";

    $mail->send();
    echo '<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="3;url=contact.html">
        <title>Message envoyé</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f4f9ff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .box {
                background: white;
                padding: 25px 35px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                text-align: center;
            }
            h1 {
                color: #2d7a4b;
                margin-bottom: 10px;
            }
            p {
                color: #555;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>✅ Message envoyé</h1>
            <p>Merci, votre message a été envoyé avec succès.<br>
            Vous serez redirigé dans quelques secondes...</p>
        </div>
    </body>
    </html>';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>