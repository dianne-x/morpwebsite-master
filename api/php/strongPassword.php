<?php

// Function to check if the password is strong
function isStrongPassword($password) {
    // Check if the password is at least 8 characters long
    if (strlen($password) < 8) {
        return false;
    }
    // Check if the password contains both uppercase and lowercase letters
    if (!preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password)) {
        return false;
    }
    // Check if the password contains at least one number
    if (!preg_match('/[0-9]/', $password)) {
        return false;
    }
    // Check if the password contains at least one special character
    if (!preg_match('/[\W]/', $password)) {
        return false;
    }
    // If all checks passed, the password is strong
    return true;
}

?>