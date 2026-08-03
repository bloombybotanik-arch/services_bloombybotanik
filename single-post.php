<?php
/**
 * Template Name: BotaniK - Single Post Asymmetric
 * Template Post Type: post
 * 
 * Instructions :
 * Copiez ce fichier (single-post.php) dans votre répertoire WordPress.
 * (ex: /wp-content/themes/votre-theme/single-post.php)
 */

// 1. JSON-LD (SEO)
function botanik_generate_json_ld() {
    if (!is_single()) return;
    $schema = [
        "@context" => "https://schema.org",
        "@type" => "Article",
        "headline" => get_the_title(),
        "image" => [get_the_post_thumbnail_url() ?: site_url('/assets/images/default.jpg')],
        "datePublished" => get_the_date('c'),
        "publisher" => ["@type" => "Organization", "name" => "Bloom by BotaniK"]
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>' . "\n";
}
add_action('wp_head', 'botanik_generate_json_ld');

// 2. RENOMMAGE ALTS D'IMAGES (SEO)
function botanik_dynamic_image_alts($content) {
    $title = get_the_title();
    $pattern = '/<img([^>]*?)alt=["\'](.*?)["\']([^>]*?)>/i';
    $replacement = '<img$1alt="Extraction de ' . esc_attr($title) . ' avec BloomLab"$3>';
    return preg_replace($pattern, $replacement, $content);
}
add_filter('the_content', 'botanik_dynamic_image_alts');

get_header(); ?>

<div class="flex flex-col lg:flex-row min-h-screen bg-[#F9F9F7] text-[#1B3022]" style="font-family: 'Poppins', sans-serif;">
    <!-- Voir le reste de la structure dans le code source de l'interface React / App.tsx -->
    <!-- Le code est calqué sur le comportement de la preview -->
</div>

<?php get_footer(); ?>
