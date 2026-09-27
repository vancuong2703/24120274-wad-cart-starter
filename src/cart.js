// Implement cartTotal here. See README.md for the specification.
export function cartTotal(items, options) {
  if (!items || items.length === 0) {
    return 0
  }

  let subtotal = 0

  for (const item of items) {
    if (typeof item.price !== 'number' || item.price < 0) {
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

  const vat = subtotal * (options.vatRate || 0)
  const shipping =
    options.freeShipFrom !== undefined && subtotal >= options.freeShipFrom
      ? 0
      : options.shipFee || 0

  return Math.round(subtotal + vat + shipping)
}
