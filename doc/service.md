Kids Care Service API
=================

## Overview

* Author: Roger Xu <roger.xu@sap.com>
* Created: 2014-02-13
* Last Modified: 2014-02-13


## 1. Home

## 2. Diet

### 2.1. List brands

    GET /brands

#### Parameters

* type
> _Required_ __string__ - The brand type. Can be one of "milk", "supplyment", "water" or "nourishment".

* order
> _Optional_ __integer__ - The sorting order. `1` means order by best, `-1` means order by worst. Default: `1`.

* top
> _Optional_ __integer__ - top N results.

#### Response

> Status: 200 OK

```
{
    "results": [
        {
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "name": "牛栏",
            "rank": 1,
            "vote_up": 1000,
            "vote_down": 123
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "name": "亨氏",
            "rank": 2,
            "vote_up": 999,
            "vote_down": 234
        }
    ]
}
```

#### Example

```
var params = {
    'type': 'milk',
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
    "vote_up": 1000,
    "vote_down": 123,
    "description ": "this is a dummy text"
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
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "title": "post 1"
        },
        {
            "id": "047D7BADBC7E1ED389A3AC631909D505",
            "title": "post 2"
        }
    ]
}
```

#### Example

```
var params = {
    'brand_id': '047D7BADBC7E1ED389A3AC631909D505'
};
dataService.getRelatedPosts(params, function(data) {
    channel.publish('brand_related_posts', 'loaded', data);
});
```

### 2.4. Get a single post

    GET /posts/:post_id

#### Response

> Status: 200 OK

```
{
    "id": "047D7BADBC7E1ED389A3AC631909D505",
    "title": "post 1",
    "content ": "this is a dummy text"
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
