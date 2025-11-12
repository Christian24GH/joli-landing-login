<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
    <h2>Hello!</h2>
    <p>Thank you for registering. Use the code below to verify your email address:</p>

    <h1 style="letter-spacing: 4px;">{{ $code }}</h1>

    <p>Or click this link to verify manually:</p>
    <a href="{{ $link }}" 
       style="display:inline-block; background:#2563eb; color:white; padding:10px 20px; border-radius:6px; text-decoration:none;">
       Verify Email
    </a>

    <p style="margin-top:20px;">This code will expire in 30 minutes.</p>
</body>
</html>