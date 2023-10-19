<?php

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

return [
  'debug' => false,
  'languages' => true,
  'languages.detect' => true,
  'date.handler' => 'strftime',

  'thumbs' => [
    'presets' => [
      'default' => ['width' => 1024, 'quality' => 80],
      'blurred' => ['blur' => true],
      'logo' => [
        'height' => 100,
        'grayscale' => true,
      ],
      'logo-small' => [
        'height' => 80,
        'width' => 80,
      ]
    ],
    'srcsets' => [
      'default' => [640, 768, 1024, 1280],
      'cover' => [800, 1024, 2048]
    ],
  ],

  'medienbaecker.autoresize.maxWidth' => 2000,

  // Robots TXT
  'bnomei.robots-txt.groups' => [ // array or callback
    '*' => [ // user-agent
      'disallow' => [
        '/',
      ],
      'allow' => [
        // '/media/',
      ]
    ]
  ],
  'bnomei.robots-txt.sitemap' => null,
  'bnomei.robots-txt.content' => null,

  // XML Sitmap
  'omz13.xmlsitemap' => [
    'cacheTTL' => 60,
    'includeUnlistedWhenSlugIs' => ['impressum'],
    'includeUnlistedWhenTemplateIs' => [],
    'excludePageWhenTemplateIs' => [],
    'excludePageWhenSlugIs' => ['error'],
    'excludeChildrenWhenTemplateIs' => [],
    'disableImages' => false,
  ],

  // Protozoon Donations
  'protozoon.donations' => [
    'config' => [
      'stripe_secret_test_key' => 'sk_test_0jNhPyuMICZbAfoU25Drswmj',
      'stripe_publishable_test_key' => 'pk_test_5zarpdBmAH1zq2s1TIZMtxzF',
      'stripe_secret_live_key' => 'sk_live_PpASaipY3S13FdTD1x2HGXDB',
      'stripe_publishable_live_key' => 'pk_live_UKCFcQD2SEjB4JnacsXt3EpS',
    ]
    ],
  'routes' => [
    [
      'pattern' => '(:all)',
      'action'  => function ($slug) {
        if(empty(kirby()->request()->query()->data())) {
          return $this->next();
        } else {
          $page = kirby()->request()->query()->data()['page'];
          $ln = kirby()->request()->query()->data()['cat'];

          if($ln == '10_Deutsch') {
            $ln = '';
          } elseif($ln == '11_English') {
            $ln = 'en/';
          } elseif($ln == '12_Fran-ccedil~ais') {
            $ln = 'fr/';
          } else {
            $ln = '';
          }

          if($page == '09_-Uuml~ber-nbsp~uns' || $page == '01_Qui-nbsp~sommes-nous-ques~' || $page == '01_About-nbsp~Us') {
            $page = 'ueber-uns';
          } elseif ($page == '10_Vorstand' || $page == '02_Direction' || $page == '02_Board') {
            $page = 'ueber-uns';
          } elseif ($page == '11_Spenden' || $page == '03_Donations' || $page == '03_Dons') {
            $page = 'kontakt';
          } elseif ($page == '12_Partner' || $page == '04_Partners' || $page == '04_Partenaires') {
            $page = 'partner';
          } elseif ($page == '13_Mitwirkung' || $page == '05_Get-nbsp~Involved' || $page == '05_Participation') {
            $page = 'mitwirken';
          } elseif ($page == '20_Kontakt' || $page == '06_Contact' || $page == '06_Contact') {
            $page = 'kontakt';
          }
          go('/' . $ln  . $page, 301);

        }

      },
      'method' => 'GET'
    ],
  ]
];
