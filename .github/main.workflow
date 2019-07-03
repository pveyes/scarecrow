workflow "scrape every 15 mins" {
  on = "schedule(*/15 * * * *)"
  resolves = ["send notification"]
}

workflow "scrape on push" {
  on = "push"
  resolves = ["send notification"]
}

action "install deps" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
}

action "send notification" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "start"
  needs = ["install deps"]
  secrets = [
    "GITHUB_TOKEN",
    "SLACK_WEBHOOK_URL"
  ]
}
