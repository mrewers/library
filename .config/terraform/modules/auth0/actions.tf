locals {
  # Convert the list of emails into a string of substrings.
  emails = join("', '", var.email_whitelist)
}

resource "auth0_action" "email_whitelist" {
  name    = "Email Whitelist"
  runtime = "node18"
  deploy  = true

  code = <<-EOT
    /**
     * Handler that will be called during the execution of a PostLogin flow.
     *
     * @param {Event} event - Details about the user and the context in which they are logging in.
     * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
     */
    exports.onExecutePostLogin = async (event, api) => {
      if(!event.user.email || !event.user.email_verified){
        api.access.deny('invalid_request');
      }

      const whitelist = ['${local.emails}'];

      const userHasAccess = (email) => whitelist.includes(email);

      if (!userHasAccess(event.user.email)) {
        const redirect = event?.transaction?.redirect_uri || '${local.client_uri}';

        // api.access.deny('access_denied');
        api.redirect.sendUserTo(`$${redirect}#login-error`);
      }
    };
  EOT

  supported_triggers {
    id      = "post-login"
    version = "v3"
  }
}

resource "auth0_trigger_action" "email_whitelist_trigger" {
  trigger   = "post-login"
  action_id = auth0_action.email_whitelist.id
}

resource "auth0_action" "user_registration" {
  name    = "User Registration Whitelist"
  runtime = "node18"
  deploy  = true

  code = <<-EOT
    /**
     * Handler that will be called during the execution of a PreRegistration flow.
     *
     * @param {Event} event - DDetails about registration event..
     * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the registration.
     */
    exports.onExecutePreUserRegistration = async (event, api) => {
      if(!event.user.email){
        api.access.deny('invalid_request', 'Invalid e-mail.');
      }

      const whitelist = ['${local.emails}'];

      const userHasAccess = (email) => whitelist.includes(email);

      if (!userHasAccess(event.user.email)) {
        api.access.deny('access_denied', 'Access denied');
      }
    };
  EOT

  supported_triggers {
    id      = "pre-user-registration"
    version = "v2"
  }
}

resource "auth0_trigger_action" "user_registration_trigger" {
  trigger   = "pre-user-registration"
  action_id = auth0_action.user_registration.id
}
