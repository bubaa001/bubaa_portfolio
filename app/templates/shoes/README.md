# STRYDE: manage your products from a Google Sheet

You can add, edit and remove products, prices, photos and stock from your phone,
with no developer and no login. The website re-reads the sheet about **once a minute**.

## One-time setup (about 5 minutes)

1. **Create the sheet.** Open Google Sheets, then *File → Import → Upload* and choose
   `products-template.csv` (download it from `/templates/shoes/products-template.csv`).
   You can also type the column names below into row 1 yourself.
2. **Share it.** Click *Share → General access → Anyone with the link → Viewer*, then *Copy link*.
3. **Connect it.** Paste the link into `productsSheet` in `data.ts`
   (or set the `STORE_SHEET_URL` environment variable on your host) and deploy once.

From then on, edit the sheet and refresh the website a minute later.

## Columns

| Column | Required | Example | Notes |
|---|---|---|---|
| `name` | yes | Aero Runner 01 · Ember | Rows without a name are skipped. |
| `price` | yes | 185000 | In TZS. Commas are fine (185,000). Rows without a price are skipped. |
| `category` | no | Sneakers | New categories show up in "Shop by category" automatically. |
| `old_price` | no | 205000 | Shows a crossed-out price and a "-20%" badge. |
| `sizes` | no | 39-44 *or* 39, 40, 41 | Default 39-44. |
| `photo` | no | Google Drive link or any image link | For Drive photos, set sharing to *Anyone with the link*. |
| `badge` | no | New, Bestseller | Small label on the product card. |
| `colour` | no | #fe5816 | Card background behind the photo. |
| `in_stock` | no | yes / no | `no` hides the product without deleting the row. |

Column names can also be in Swahili: `jina`, `aina`, `bei`, `bei ya zamani`, `saizi`, `picha`, `rangi`, `ipo`.
Row 1 must contain the column names, in any order.

## If something goes wrong

If the sheet can't be read for a moment (not shared, deleted, no valid rows, Google down),
the store keeps working with the last version of the sheet that loaded. Only if it has never
loaded does it show the sample products written in `data.ts`. The reason is printed in the server log,
starting with `[STRYDE]`.
