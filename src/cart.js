// Implement cartTotal here. See README.md for the specification.
export function cartTotal(items, options = {}) {
  if (!items || items.length === 0) {
    return 0
  }

  let subtotal = 0

  for (const item of items) {
    if (
      typeof item.price !== 'number' ||
      Number.isNaN(item.price) ||
      item.price < 0
    ) {
      throw new RangeError(
        `Invalid price: ${item.price}. Price must be non-negative.`,
      )
    }

    if (
      typeof item.qty !== 'number' ||
      !Number.isInteger(item.qty) ||
      item.qty <= 0
    ) {
      throw new RangeError(
        `Invalid quantity: ${item.qty}. Quantity must be a positive integer.`,
      )
    }

    subtotal += item.price * item.qty
  }

  const opts = options || {}
  const vat = subtotal * (opts.vatRate || 0)
  const shipping =
    opts.freeShipFrom !== undefined && subtotal >= opts.freeShipFrom
      ? 0
      : opts.shipFee || 0

  return Math.round(subtotal + vat + shipping)
}
