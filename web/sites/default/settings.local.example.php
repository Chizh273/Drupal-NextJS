<?php

// Enable the Next module and set debug mode.
$config['next.settings']['debug'] = TRUE;

// Disable shield module locally.
$config['shield.settings']['shield_enable'] = FALSE;
$config['rename_admin_paths.settings']['admin_path'] = FALSE;
$config['rename_admin_paths.settings']['user_path'] = FALSE;

// Disable autologout module locally.
$config['autologout.settings']['enabled'] = FALSE;

// Disable CSS and JS caching.
$config['advagg.settings']['enabled'] = FALSE;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

// Enable views query showing.
$config['views.settings']['ui']['show']['sql_query']['enabled'] = TRUE;

// Disable Drupal caches.
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';

$settings['trusted_host_patterns'] = [];
$settings['extension_discovery_scan_tests'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.local.yml';
