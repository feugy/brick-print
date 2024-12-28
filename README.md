# TODO

- fix styling issues for image size

# Prompt

Brick print is a web application to create printable stickers for lego boxes.
It allows user to select Lego bricks by they id, and and print their image so they could tb sticked to storage boxes.

User can create a new sticker, by selecting a sticker size amongst several pre-defined sizes (there will be an option to select custom size as well).

Then they can add some lego bricks by selecting them by ids.
Lego brick images are layed out in the sticker to maximize space. Images a displayed along with the brick id and name.

Once done, the sticker could be printed.

This will be a next.js application with shadcn components.
Each lego brick image is available at `https://img.bricklink.com/ItemImage/PL/<id>.png`
Each lego brick name is available as `strItemName` in the JSON reponse of `https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>`

Alternative images:
- https://library.ldraw.org/images/library/official/parts/<design-id>.png
- https://img.bricklink.com/ItemImage/PL/<design-id>.png
- https://images.brickset.com/parts/<instruction-part-id>.jpg

- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>
- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>
- https://www.bricklink.com/ajax/renovate/catalog/getItemImageList.ajax?idItem=<id>
