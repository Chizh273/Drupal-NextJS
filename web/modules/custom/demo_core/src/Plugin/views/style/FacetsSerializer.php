<?php

namespace Drupal\demo_core\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\demo_core\Services\EntityNormalizer;
use Drupal\facets\FacetManager\DefaultFacetManager;
use Drupal\rest\Plugin\views\style\Serializer as BaseSerializer;
use Drupal\views\Attribute\ViewsStyle;
use Drupal\views\Plugin\views\pager\None;
use Drupal\views\Plugin\views\pager\Some;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * The style plugin for serialized output formats.
 *
 * @ingroup views_style_plugins
 */
#[ViewsStyle(
  id: 'demo_api_serializer',
  title: new TranslatableMarkup('Demo API: Facets serializer'),
  help: new TranslatableMarkup('Serializes views row data using the Serializer component.'),
  display_types: ['data'],
)]
class FacetsSerializer extends BaseSerializer {

  /**
   * Disable selecting row plugin.
   */
  protected $usesRowPlugin = FALSE;

  /**
   * Entity normalizer service.
   *
   * @var \Drupal\demo_core\Services\EntityNormalizer
   */
  protected EntityNormalizer $entityNormalizer;

  /**
   * Tha facet manager.
   *
   * @var \Drupal\facets\FacetManager\DefaultFacetManager
   */
  protected DefaultFacetManager $facetsManager;

  /**
   * @inheritDoc
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->entityNormalizer = $container->get('demo_core.entity_normalizer');
    $instance->facetsManager = $container->get('facets.manager');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state): void {
    parent::buildOptionsForm($form, $form_state);
    $form['uses_fields']['#access'] = FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function render(): array|string {
    $rows = [];
    /** @var \Drupal\search_api\Plugin\views\ResultRow $row */
    foreach ($this->view->result as $row_index => $row) {
      $this->view->row_index = $row_index;
      $rows[] = $this->entityNormalizer->normalize($row->_entity);
    }
    unset($this->view->row_index);

    $rows = [
      'data' => $rows,
      'facets' => $this->buildFacets(),
      'pager' => $this->buildPager(),
    ];

    if ((empty($this->view->live_preview))) {
      $content_type = $this->displayHandler->getContentType();
    }
    else {
      $content_type = !empty($this->options['formats']) ? reset($this->options['formats']) : 'json';
    }
    return $this->serializer->serialize($rows, $content_type, ['views_style_plugin' => $this]);
  }

  /**
   * Builds facets data.
   *
   * @return array
   *   Facets data.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   * @throws \Drupal\facets\Exception\InvalidProcessorException
   *
   * @see \Drupal\facets_rest\Plugin\views\style\FacetsSerializer::render
   */
  protected function buildFacets(): array {
    // Processing facets.
    $display = $this->view->getDisplay()->display;

    $facetsource_id = 'search_api:views_' . $display['display_plugin'] . '__' . $this->view->id() . '__' . $display['id'];
    $facets = $this->facetsManager->getFacetsByFacetSourceId($facetsource_id);
    $this->facetsManager->updateResults($facetsource_id);

    $processed_facets = [];
    foreach ($facets as $facet) {
      $processed_facets += $this->facetsManager->build($facet)[0] ?? [];
    }

    return $processed_facets;
  }

  /**
   * Builds pager data for views response.
   *
   * @return array
   *   The pager.
   *
   * @see https://www.drupal.org/project/facets/issues/3008615
   */
  protected function buildPager(): array {
    $pager = $this->view->pager;
    if (!$pager) {
      return [];
    }

    $class = get_class($pager);

    if (!in_array($class, [None::class, Some::class])) {
      $total_pages = $pager->getPagerTotal();
    }

    return [
      'current_page' => $pager->getCurrentPage(),
      'total_items' => $pager->getTotalItems(),
      'total_pages' => $total_pages ?? 0,
      'items_per_page' => $pager->getItemsPerPage(),
    ];
  }

}

