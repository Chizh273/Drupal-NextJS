<?php declare(strict_types=1);

namespace Drupal\demo_core\Services;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\Plugin\Field\FieldType\{BooleanItem,
  ChangedItem,
  CreatedItem,
  EntityReferenceItem,
  IntegerItem,
  StringItem,
  UuidItem};
use Drupal\field\Entity\FieldConfig;
use Drupal\language\DefaultLanguageItem;
use Drupal\text\Plugin\Field\FieldType\TextLongItem;
use Drupal\user\UserNameItem;

/**
 * EntityNormalizer service.
 */
class EntityNormalizer {

  protected const array FIELDS_TO_SKIP = [
    'vid',
    'revision_timestamp',
    'revision_uid',
    'revision_log',
    'metatag',
    'menu_link',
    'comment',
  ];

  protected const array SCALAR_FIELD_TYPES = [
    StringItem::class,
    TextLongItem::class,
    IntegerItem::class,
    CreatedItem::class,
    ChangedItem::class,
    UuidItem::class,
    DefaultLanguageItem::class,
    UserNameItem::class,
    BooleanItem::class,
  ];

  /**
   * Normalize entity for json response.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   Entity to normalize.
   * @param array $fields_to_include
   *
   * @return array
   *   Normalized entity.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  public function normalize(EntityInterface $entity, array $fields_to_include = []): array {
    $normalized_entity = [];
    $fields = $entity->getFields();

    foreach ($fields as $field_name => $field) {
      if (!in_array($field_name, self::FIELDS_TO_SKIP)) {
        // If we have fields to include we should have only these fields.
        if (!empty($fields_to_include) && !in_array($field_name, $fields_to_include)) {
          continue;
        }

        /** @var \Drupal\field\Entity\FieldConfig $definition */
        $definition = $field->getDataDefinition();

        if ($definition instanceof FieldConfig) {
          $definition = $definition->getFieldStorageDefinition();
        }

        if ($definition->isMultiple()) {
          /** @var \Drupal\Core\Field\FieldItemBase $item */
          foreach ($field->getIterator() as $item) {
            $normalized_entity[$field_name][] = $this->getFieldItemValue($item);
          }
        }
        else {
          $normalized_entity[$field_name] = $this->getFieldItemValue($field->first());
        }
      }
    }

    return $normalized_entity;
  }

  /**
   * Gets value of the field item.
   *
   * @param ?\Drupal\Core\Field\FieldItemBase $field_item
   *   Field item.
   *
   * @return array|string|null
   *   Field value.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  protected function getFieldItemValue(?FieldItemBase $field_item): array|string|null {
    // Populate entity reference field items.
    if ($field_item instanceof EntityReferenceItem) {
      /** @var \Drupal\Core\Entity\EntityInterface $entity */
      $entity = $field_item?->entity;

      switch ($entity?->getEntityTypeId()) {
        case 'node':
          return $this->normalize($entity, ['title', 'field_slug']);
        case 'taxonomy_term':
          return $this->normalize($entity, ['name', 'path']);
        case 'user':
          return $this->normalize($entity, ['name']);
        case 'media':
          return $this->normalize($entity, ['field_media_document']);
        case 'file':
          return $this->normalize($entity, ['uri']);
      }
    }

    // Handle specific fields values.
    $field_name = $field_item?->getParent()?->getName();
    switch ($field_name) {
      case 'path':
        return $field_item->getEntity()->toUrl()->toString();
      case 'uri':
        return $field_item->getEntity()->createFileUrl(FALSE);
    }

    // Handle scalar values.
    if ($field_item !== NULL && in_array(get_class($field_item), self::SCALAR_FIELD_TYPES)) {
      return $field_item->value;
    }

    return $field_item?->getValue();
  }

}
