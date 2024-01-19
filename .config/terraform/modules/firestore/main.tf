resource "google_firestore_database" "database" {
  provider                          = google
  app_engine_integration_mode       = "DISABLED"
  concurrency_mode                  = "PESSIMISTIC"
  delete_protection_state           = "DELETE_PROTECTION_ENABLED"
  location_id                       = var.region
  name                              = "library"
  point_in_time_recovery_enablement = "POINT_IN_TIME_RECOVERY_DISABLED"
  type                              = "FIRESTORE_NATIVE"
}
