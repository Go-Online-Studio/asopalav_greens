import test from 'node:test';
import assert from 'node:assert';
import { VENUES, GALLERY_ITEMS } from '../src/data/estateData.js';

test('Estate Data: Venues Integrity', () => {
  assert.strictEqual(VENUES.length, 2, 'Must have exactly two primary spaces');

  const expectedSlugs = ['banquet', 'lawn'];
  const actualSlugs = VENUES.map((v) => v.slug);
  assert.deepStrictEqual(actualSlugs, expectedSlugs, 'Venues must match expected slugs');

  for (const venue of VENUES) {
    assert.ok(venue.name, 'Venue must have a name');
    assert.ok(venue.areaSqFt > 0, 'Area must be greater than zero');
    assert.ok(venue.capacityFloating > 0, 'Floating capacity must be greater than zero');
    assert.ok(venue.capacitySeated > 0, 'Seated capacity must be greater than zero');
    assert.ok(venue.heroImage.startsWith('https://'), 'Hero image must be secure URL');
    assert.strictEqual(venue.diptych.length, 2, 'Diptych must have exactly two photo views');
    assert.ok(venue.specs.length >= 5, 'Venue must have at least 5 technical specifications');
  }
});

test('Estate Data: Gallery Curations Integrity', () => {
  assert.ok(GALLERY_ITEMS.length >= 6, 'Gallery must have at least 6 curations');

  const allowedCategories = ['lawn', 'banquet'];
  for (const item of GALLERY_ITEMS) {
    assert.ok(allowedCategories.includes(item.category), `Category ${item.category} must be valid`);
    assert.ok(item.image.startsWith('/images/GalleryImages/'), 'Image must be local gallery image');
    assert.ok(item.thumb.startsWith('/images/GalleryImages/Thumb/'), 'Thumb must be local thumbnail');
    assert.ok(item.title, 'Item must have a title');
    assert.ok(['Lawn', 'Banquet'].includes(item.venue), 'Item venue must be Lawn or Banquet');
  }
});

test('Slug Normalization Logic', () => {
  const normalizeSlug = (slug: string) => {
    if (slug === 'royal-lawn') return 'lawn';
    if (slug === 'crystal-banquet' || slug === 'crystal-hall') return 'banquet';
    return slug;
  };

  assert.strictEqual(normalizeSlug('royal-lawn'), 'lawn');
  assert.strictEqual(normalizeSlug('crystal-hall'), 'banquet');
  assert.strictEqual(normalizeSlug('crystal-banquet'), 'banquet');
  assert.strictEqual(normalizeSlug('banquet'), 'banquet');
  assert.strictEqual(normalizeSlug('lawn'), 'lawn');
});

