/*
 * Copyright 2019 Algolia Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

new Crawler({
    appId: "YOUR APP ID HERE",
    apiKey: "YOUR API KEY HERE",
    rateLimit: 8,
    sitemaps: ["https://www.algolia.com/blog/sitemap.xml"],
    ignoreQueryParams: ["source", "utm_*"],
    renderJavaScript: true,
    actions: [
      {
        indexName: "YOUR INDEX NAME HERE",
        pathsToMatch: [
          "https://www.algolia.com/blog/**",
          "https://algolia.com/blog/**",
        ],
        recordExtractor: ({ url, $, contentLength, fileType }) => {
          return [
            {
              objectID: url.href,
              url: url.href,
              title: $("h1.entry-title").text(),
              description: $("meta[name=description]").attr("content"),
              image: $('meta[property="og:image"]').attr("content"),
              category: url.pathname.split("/")[2],
              author: $("p.author-name").text(),
            },
          ];
        },
      },
    ],
  });
