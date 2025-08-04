#!/bin/sh

. "$(dirname "$0")/_utils.sh"

log ddev drush si --existing-config --account-name=admin --account-pass=admin -y

log ddev drush devel-generate:terms 30 --kill --bundles=tags --max-depth=1

log ddev drush devel-generate:content 50 0 --kill --bundles=article

log ddev drush uli
