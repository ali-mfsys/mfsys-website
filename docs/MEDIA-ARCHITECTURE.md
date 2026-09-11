# MFSYS Media Architecture

Admin upload -> object storage -> validation -> metadata -> CDN -> responsive public delivery.

Images prefer AVIF/WebP, responsive sizes, explicit dimensions and lazy loading for non-critical assets.

Hero and sector videos use short compressed loops with poster images. Autoplay is muted/inline; initial rendering must not depend on video.

Validate MIME type and extension server-side, enforce upload limits, generate safe object keys, keep storage credentials server-side, and never execute uploaded content.

Meaningful images require alt text. Decorative assets are explicitly marked decorative.

Public assets should use versioned immutable URLs and long-lived CDN caching.
