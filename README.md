# TODO

- keyboard navigation in search results

# v0 Chat

https://v0.dev/chat/Xe2A0ReIveW


Alternative images:
- https://library.ldraw.org/images/library/official/parts/<design-id>.png
- https://img.bricklink.com/ItemImage/PL/<design-id>.png
- https://images.brickset.com/parts/<instruction-part-id>.jpg

- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>
- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>
- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>

CREATE USER brickprint LOGIN PASSWORD 'xxx';
CREATE DATABASE brickprint OWNER brickprint;
\c brickprint
CREATE TABLE pages(id UUID PRIMARY KEY, title TEXT, stickers JSONB, owner TEXT);
ALTER TABLE pages OWNER TO brickprint;
