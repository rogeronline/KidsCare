Kids Care Service API
=================

## Overview

* Author: Roger Xu <roger.xu@sap.com>
* Created: 2014-02-13
* Last Modified: 2014-02-19

## 1. Home

## 2. Diet

### 2.1. List brands

    GET /brands?type=formula&sort=taste&order=1&top=10

#### Parameters

* type
> _Required_ __string__ - The brand type. Can be one of "formula", "solid", "organic" or "nutrition".

* sort
> _Required_ __string__ - The sorting field ID.

* order
> _Optional_ __integer__ - The sorting order. `1` means order by best, `-1` means order by worst. Default: `1`.

* top
> _Optional_ __integer__ - top N results. Default: `10`.

#### Response

> Status: 200 OK

```
{
    "results": [
        {
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "name": "牛栏",
            "rank": 1,
            "vote_up": 70.4,
            "vote_down": 21.4,
            "keywords": ["keyword 1", "keyword 2", "keyword 3"]
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "name": "亨氏",
            "rank": 2,
            "vote_up": 70.4,
            "vote_down": 21.4,
            "keywords": ["keyword 1", "keyword 2", "keyword 3"]
        }
    ]
}
```

#### Example

```
var params = {
    'type': 'formula',
    'sort': 'taste',
    'order': 1,
    'top': 10
};
dataService.getBrands(params, function(data) {
    channel.publish('brands', 'loaded', data);
});
```

### 2.2. Get a single brand

    GET /brands/:brand_id

#### Response

> Status: 200 OK

```
{
    "id": "047D7BADBC7E1ED389A3AC631909D505",
    "name": "牛栏",
    "rank": 1,
    "description ": "this is a dummy text",
    "vote_up": 70.4,
    "vote_down": 21.4,
    "keywords": ["keyword 1", "keyword 2", "keyword 3"],
    "pros": [
        {
            "name": "keyword 1",
            "value": 89
        },
        {
            "name": "keyword 2",
            "value": 67
        }
    ],
    "cons": [
        {
            "name": "keyword 1",
            "value": 89
        },
        {
            "name": "keyword 2",
            "value": 67
        }
    ]
}
```

#### Example

```
var params = {
    'id': '047D7BADBC7E1ED389A3AC631909D505'
};
dataService.getBrand(params, function(data) {
    channel.publish('brand', 'loaded', data);
});
```

### 2.3. Get related posts of a brand

    GET /brands/:brand_id/related_posts

#### Response

> Status: 200 OK

```
{
    "results": [
        {
            "id": "047D7BADBC7E1ED389A3AC631909D501",
            "title": "post 1",
            "image_url": "images/logo.gif"
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D502",
            "title": "post 2",
            "image_url": "images/logo.gif"
        }
    ]
}
```

#### Example

```
var params = {
    'brand_id': '047D7BADBC7E1ED389A3AC631909D505'
};
dataService.getBrandRelatedPosts(params, function(data) {
    channel.publish('brand_related_posts', 'loaded', data);
});
```

### 2.4. Get posts

    GET /posts?type=formula&sort=taste&top=10&skip=10

#### Parameters

* type
> _Required_ __string__ - The brand type. Can be one of "formula", "solid", "organic" or "nutrition".

* sort
> _Required_ __string__ - The sorting field ID.

* top
> _Optional_ __integer__ - top N results.

* skip
> _Optional_ __integer__ - Skip N results.


#### Response

> Status: 200 OK

```
{
    "results": [
        {
            "id": "047D7BADBC7E1ED389A3AC631909D501",
            "title": "post 1",
            "rank": 1,
            "value": 34
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D502",
            "title": "post 2",
            "rank": 2,
            "value": 34
        }
    ]
}
```

#### Example

```
var params = {
    'type': 'formula',
    'sort': 'taste',
    'top': 10,
    'skip': 10
};
dataService.getPosts(params, function(data) {
    channel.publish('posts', 'loaded', data);
});
```

### 2.5. Get a single post

    GET /posts/:post_id

#### Response

> Status: 200 OK

```
{
    "id": "047D7BADBC7E1ED389A3AC631909D505",
    "title": "post 1",
    "replies": [
        {
            id: "047D7BADBC7E1ED389A3AC631909D501",
            content: "answer 1"
        },
        {
            id: "047D7BADBC7E1ED389A3AC631909D502",
            content: "answer 2"
        }
    ],
    reply_count: 10
}
```

#### Example

```
var params = {
    'id': '047D7BADBC7E1ED389A3AC631909D505'
};
dataService.getPost(params, function(data) {
    channel.publish('post', 'loaded', data);
});
```

### 2.6. Get related posts of a post

    GET /posts/:post_id/related_posts

#### Response

> Status: 200 OK

```
{
    "results": [
        {
            "id": "047D7BADBC7E1ED389A3AC631909D501",
            "title": "post 1",
            "image_url": "images/logo.gif"
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D502",
            "title": "post 2",
            "image_url": "images/logo.gif"
        }
    ]
}
```

#### Example

```
var params = {
    'post_id': '047D7BADBC7E1ED389A3AC631909D505'
};
dataService.getRelatedPosts(params, function(data) {
    channel.publish('related_posts', 'loaded', data);
});
```