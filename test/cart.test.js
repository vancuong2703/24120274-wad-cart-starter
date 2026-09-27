import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

test('the example from the slides returns 467400', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

test('the return value is strictly a primitive number, not a string', () => {
  const items = [{ name: 'Áo thun', price: 180000, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(typeof cartTotal(items, options), 'number')
})

test('empty cart returns 0 without shipping or VAT', () => {
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal([], options), 0)
})

test('shipping fee is applied when subtotal is below the threshold', () => {
  const items = [{ name: 'Mũ', price: 200000, qty: 1 }]
  const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 230000)
})

test('shipping is free when subtotal is exactly at the threshold', () => {
  const items = [{ name: 'Balo', price: 500000, qty: 1 }]
  const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 500000)
})

test('shipping is free when subtotal is strictly above the threshold', () => {
  const items = [{ name: 'Áo khoác', price: 600000, qty: 1 }]
  const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 600000)
})

test('throws RangeError when an item price is negative', () => {
  const items = [{ name: 'Hàng lỗi', price: -50000, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => {
      cartTotal(items, options)
    },
    {
      name: 'RangeError',
    },
  )
})

test('throws RangeError when quantity is a non-integer decimal', () => {
  const items = [{ name: 'Vải cắt', price: 100000, qty: 1.5 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => {
      cartTotal(items, options)
    },
    {
      name: 'RangeError',
    },
  )
})

test('throws RangeError when quantity is zero', () => {
  const items = [{ name: 'Sách', price: 100000, qty: 0 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => {
      cartTotal(items, options)
    },
    {
      name: 'RangeError',
    },
  )
})

test('throws RangeError when quantity is negative', () => {
  const items = [{ name: 'Sách', price: 100000, qty: -1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => {
      cartTotal(items, options)
    },
    {
      name: 'RangeError',
    },
  )
})

test('rounds result to the nearest whole đồng', () => {
  const items = [{ name: 'Sản phẩm lẻ', price: 33333, qty: 1 }]
  const options = { vatRate: 0.07, freeShipFrom: 500000, shipFee: 0 }
  // 33333 * 1.07 = 35666.31 -> Math.round is 35666
  assert.equal(cartTotal(items, options), 35666)
})
