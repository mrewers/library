resource "auth0_branding" "brand" {
  logo_url = "https://books.marek.dev/logo.png"

  colors {
    primary         = "#000e4d"
    page_background = "#7ac0ff"
  }
}

resource "auth0_prompt" "prompt" {
  universal_login_experience = "new"
}


resource "auth0_prompt_custom_text" "prompt_text" {
  body = jsonencode({
    "login" : {
      "alertListTitle" : "Alerts",
      "authentication-failure" : "We are sorry, something went wrong when attempting to log in",
      "description" : "Log in using your Google account to continue.",
      "federatedConnectionButtonText" : "Continue with $${connectionName}",
      "invalid-connection" : "Invalid connection",
      "ip-blocked" : "We have detected suspicious login behavior and further attempts will be blocked. Please contact the administrator.",
      "logoAltText" : "$${companyName}",
      "pageTitle" : "Log in | $${clientName}",
      "password-breached" : "We have detected a potential security issue with this account. To protect your account, we have prevented this login. Please reset your password to proceed.",
      "same-user-login" : "Too many login attempts for this user. Please wait, and try again later.",
      "title" : "Welcome to Our Library",
      "user-blocked" : "Your account has been blocked after multiple consecutive login attempts.",
    }
  })
  language = "en"
  prompt   = "login"
}
