-- Replace legacy MFSYS logo media records with the canonical brand asset.
-- The approved artwork is versioned at public/mfsys-logo.svg.

DELETE FROM media
WHERE lower(filename) LIKE '%mfsys%logo%'
   OR lower(filename) LIKE '%mfsys%mark%'
   OR lower(url) LIKE '%mfsys-logo%'
   OR lower(url) LIKE '%mfsys-mark%';

INSERT INTO media (filename, url, alt, type)
VALUES (
  'mfsys-logo.svg',
  '/mfsys-logo.svg',
  'MFSYS Technologies Limited official logo',
  'IMAGE'
);
